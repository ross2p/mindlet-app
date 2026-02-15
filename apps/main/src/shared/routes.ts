class Routes {
    private readonly root = '/';
    public readonly auth = `${this.root}/auth`;
    public readonly login = `${this.auth}/login`;
    public readonly registration = `${this.auth}/registration`;
}

export const routes = new Routes();