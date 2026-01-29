import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        perf_hooks: false,
        async_hooks: false,
        child_process: false,
        canvas: false,
        encoding: false,
        repl: false,
        readline: false,

        "@nestjs/microservices": false,
        "@nestjs/microservices/microservices-module": false,
        "@nestjs/websockets/socket-module": false,
        "class-transformer/storage": false,
        "class-validator": false,
        "class-transformer": false,
      };
    }

    // Це змушує Webpack ігнорувати "динамічні" імпорту, які NestJS робить через loadPackage
    config.module = {
      ...config.module,
      exprContextCritical: false,
    };

    return config;
  },
};

export default nextConfig;