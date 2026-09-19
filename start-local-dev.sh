#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Function to print colored messages
log() {
    echo -e "${GREEN}[mindlet]${NC} $1"
}

error() {
    echo -e "${RED}[error]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[warning]${NC} $1"
}

# Check if apps exist
check_apps() {
    local missing=0
    for app in dashboard auth profile study decks; do
        if [ ! -d "$PROJECT_ROOT/apps/$app" ]; then
            error "Додаток '$app' не знайдено: $PROJECT_ROOT/apps/$app"
            missing=$((missing + 1))
        fi
    done

    if [ $missing -gt 0 ]; then
        error "Перевірте, чи клоновані всі субмодулі:"
        echo "  git submodule update --init --recursive"
        exit 1
    fi
}

# Check dependencies
check_deps() {
    if ! command -v npm &> /dev/null; then
        error "npm не знайдено. Установіть Node.js"
        exit 1
    fi

    if ! command -v nginx &> /dev/null; then
        warning "nginx не встановлено. Установіть його або використовуйте Docker Compose"
        exit 1
    fi
}

# Main
main() {
    log "Запуск Mindlet локально (без Docker)"
    log "========================================"
    log ""

    check_apps
    check_deps

    # Kill any existing processes on these ports
    log "Очищення портів..."
    for port in 3001 3002 3003 3004 3005 8080; do
        if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
            warning "Порт $port вже використовується. Спробуйте завершити його вручну."
        fi
    done

    log ""
    log "Інструкції для запуску:"
    log "========================================"
    log ""
    log "${YELLOW}1. Запустіть кожен додаток у окремому терміналі:${NC}"
    log ""
    log "   # Terminal 1 - Dashboard (port 3001)"
    log "   cd $PROJECT_ROOT/apps/dashboard && npm install && npm run dev"
    log ""
    log "   # Terminal 2 - Auth (port 3002)"
    log "   cd $PROJECT_ROOT/apps/auth && npm install && npm run dev"
    log ""
    log "   # Terminal 3 - Profile (port 3003)"
    log "   cd $PROJECT_ROOT/apps/profile && npm install && npm run dev"
    log ""
    log "   # Terminal 4 - Study (port 3004)"
    log "   cd $PROJECT_ROOT/apps/study && npm install && npm run dev"
    log ""
    log "   # Terminal 5 - Decks (port 3005)"
    log "   cd $PROJECT_ROOT/apps/decks && npm install && npm run dev"
    log ""
    log "${YELLOW}2. Запустіть nginx у окремому терміналі:${NC}"
    log ""
    log "   nginx -c $(cd $PROJECT_ROOT && pwd)/infra/nginx/nginx.conf.local"
    log ""
    log "   Або (якщо nginx установлено через Homebrew):"
    log "   sudo nginx -c $(cd $PROJECT_ROOT && pwd)/infra/nginx/nginx.conf.local"
    log ""
    log "${YELLOW}3. Відкрийте браузер:${NC}"
    log ""
    log "   http://localhost:8080"
    log ""
    log "========================================"
    log ""
    log "Щоб зупинити nginx:"
    log "   nginx -s stop"
    log "   # або: sudo nginx -s stop"
    log ""
}

main
