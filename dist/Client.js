"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const oauth_1_0a_1 = __importDefault(require("oauth-1.0a"));
const crypto_1 = require("crypto");
const querystring_1 = __importDefault(require("querystring"));
/**
 * The client for interacting with the Twitter API
 */
class Client {
    constructor(options) {
        this.options = options;
        /**
         * The base API url
         */
        this.baseURL = "https://api.twitter.com/1.1";
        this._token = {
            key: options.access_token,
            secret: options.access_token_secret,
        };
        this._oauth = new oauth_1_0a_1.default({
            consumer: {
                key: options.api_key,
                secret: options.api_secret_key,
            },
            signature_method: "HMAC-SHA1",
            hash_function: (base_string, key) => crypto_1.createHmac("sha1", key).update(base_string).digest("base64"),
        });
    }
    async _make(options) {
        const { path, method, query, headers, data } = options;
        const base = `${this.baseURL}${path.replace(".json", "")}.json`;
        const paramsStr = query ? `?${querystring_1.default.stringify(query)}` : "";
        const url = `${base}${paramsStr}`;
        console.debug(url);
        const auth = this._oauth.toHeader(this._oauth.authorize({
            url,
            method,
            data,
        }, this._token));
        return (await node_fetch_1.default(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "@fyko/twitter",
                ...headers,
                ...auth,
            },
        })).json();
    }
    get(path, query) {
        return this._make({ path, query, method: "GET" });
    }
    patch(path, query) {
        return this._make({ path, query, method: "PATCH" });
    }
    delete(path, query) {
        return this._make({ path, query, method: "DELETE" });
    }
    put(path, query) {
        return this._make({ path, query, method: "PUT" });
    }
    head(path, query) {
        return this._make({ path, query, method: "HEAD" });
    }
    post(path, data, query) {
        return this._make({ path, query, data, method: "POST" });
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map