/**
 * The Client options
 */
export interface TwitterOptions {
    api_key: string;
    api_secret_key: string;
    access_token: string;
    access_token_secret: string;
}
/**
 * The options for creating a request
 */
export interface RequestOptions {
    path: string;
    method: string;
    headers?: Record<string, string>;
    data?: Record<string, string>;
    query?: Record<string, string>;
}
/**
 * The client for interacting with the Twitter API
 */
export declare class Client {
    readonly options: TwitterOptions;
    /**
     * The base API url
     */
    protected readonly baseURL = "https://api.twitter.com/1.1";
    private readonly _oauth;
    private readonly _token;
    constructor(options: TwitterOptions);
    private _make;
    get<T = unknown>(path: string, query?: Record<string, string>): Promise<T>;
    patch<T = unknown>(path: string, query?: Record<string, string>): Promise<T>;
    delete<T = unknown>(path: string, query?: Record<string, string>): Promise<T>;
    put<T = unknown>(path: string, query?: Record<string, string>): Promise<T>;
    head<T = unknown>(path: string, query?: Record<string, string>): Promise<T>;
    post<T = unknown>(path: string, data: Record<string, string>, query?: Record<string, string>): Promise<T>;
}
//# sourceMappingURL=Client.d.ts.map