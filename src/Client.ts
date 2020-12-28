import fetch from "node-fetch";
import OAuth, { Token } from "oauth-1.0a";
import { createHmac } from "crypto";
import querystring from "querystring";

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
export class Client {
  /**
   * The base API url
   */
  protected readonly baseURL = "https://api.twitter.com/1.1";

  private readonly _oauth;

  private readonly _token: Token;

  public constructor(public readonly options: TwitterOptions) {
    this._token = {
      key: options.access_token,
      secret: options.access_token_secret,
    };
    this._oauth = new OAuth({
      consumer: {
        key: options.api_key,
        secret: options.api_secret_key,
      },
      signature_method: "HMAC-SHA1",
      hash_function: (base_string, key) =>
        createHmac("sha1", key).update(base_string).digest("base64"),
    });
  }

  private async _make<T>(options: RequestOptions): Promise<T> {
    const { path, method, query, headers, data } = options;

    const base = `${this.baseURL}${path.replace(".json", "")}.json`;

    const paramsStr = query ? `?${querystring.stringify(query)}` : "";
    const url = `${base}${paramsStr}`;
    console.debug(url);

    const auth = this._oauth.toHeader(
      this._oauth.authorize(
        {
          url,
          method,
          data,
        },
        this._token
      )
    );

    return (
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "@fyko/twitter",
          ...headers,
          ...auth,
        },
      })
    ).json();
  }

  public get<T = unknown>(
    path: string,
    query?: Record<string, string>
  ): Promise<T> {
    return this._make<T>({ path, query, method: "GET" });
  }

  public patch<T = unknown>(
    path: string,
    query?: Record<string, string>
  ): Promise<T> {
    return this._make<T>({ path, query, method: "PATCH" });
  }

  public delete<T = unknown>(
    path: string,
    query?: Record<string, string>
  ): Promise<T> {
    return this._make<T>({ path, query, method: "DELETE" });
  }

  public put<T = unknown>(
    path: string,
    query?: Record<string, string>
  ): Promise<T> {
    return this._make<T>({ path, query, method: "PUT" });
  }

  public head<T = unknown>(
    path: string,
    query?: Record<string, string>
  ): Promise<T> {
    return this._make<T>({ path, query, method: "HEAD" });
  }

  public post<T = unknown>(
    path: string,
    data: Record<string, string>,
    query?: Record<string, string>
  ): Promise<T> {
    return this._make<T>({ path, query, data, method: "POST" });
  }
}
