import { CrudApiCall } from "./types";
import { log } from "./util";
log("crud-api");

function join(strings?: string[]) {
    if (!strings || !strings.length) {
        return "";
    }
    return strings.join("/");
}

function encode(query?: {}) {
    if (!query) return "";
    const keys = Object.keys(query);
    if (!keys || !keys.length) {
        return "";
    }
    return "?" + keys.map(key => `${key}=${query[key]}`).join("&");
}
/**
 * @param endpoint @description fully resolved
 */
export default function crudApi(endpoint: string): CrudApiCall {
    /**
     * 
     */
    return async function send(args) {
        const { params, query, method, body } = args;
        const request: RequestInit = {
            method,
            headers: {
                //FIXME
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        };
        if (method !== "GET") {
            Object.assign(request, {
                body: JSON.stringify(body),
                headers: Object.assign(request.headers, {
                    "Content-Type": "application/json"
                })
            });
        }
        try {
            const url = `${endpoint}${join(params)}${encode(query)}`;
            log("url: %s", url);
            const r = await fetch(url, request);
            if (!r.ok) {
                return Promise.reject(Object.assign(new Error(r.statusText), { code: r.status }));
            }
            // ...
            const contentType = r.headers.get("Content-Type");
            if (contentType && /application\/json.*/.test(contentType)) {
                return Promise.resolve(await r.json());
            }
            return Promise.reject(new Error(`Content-Type: ${contentType}, NOT IMPLEMENTED`))

        } catch (error) {
            return Promise.reject(error)
        }
    }
}