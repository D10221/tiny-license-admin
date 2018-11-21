import fetch from "node-fetch";
import minimist from "minimist";
import { readFileSync } from "fs";
const args = minimist(process.argv.slice(2));
/**
 * @param {string} token
 * @return {string} 
 */
function getToken(token) {
    try {
        return token && /.*(\.json|\.lic)/.test(token) ? JSON.parse(readFileSync(token, "utf8")).token : token;
    } catch (error) {
        console.error(error);
        return "";
    }
}
async function run() {
    try {
        const token = getToken(args.token);
        if (!token) {
            return Promise.reject(new Error("Token required"))
        }
        console.log("Token: '%s'", token || "?");
        if (!args.host) {
            return Promise.reject("Host required");
        }
        let url;
        switch (args.mode) {
            case "params": {
                url = `${args.host}/${token}`;
                break
            }
            case "headers": {
                url = `${args.host}`;
                break
            }
            case "query": {
                url = `${args.host}?token=${token}`;
                break;
            }
            default: {
                url = `${args.host}?token=${token}`;
            }
        }
        
        const r = await fetch(url, {
            method: "GET",
            headers: args.mode === "headers" && { "Token": token } || undefined
        });
        console.log("url: '%s'", url);
        const text = await r.text();
        return `OK: ${r.ok}, Message: ${text || r.statusText || "?"}`
    } catch (error) {
        return Promise.reject(error);
    }
}

run().then(x => {
    console.log("Result: %s", x);
}).catch(error => {
    console.error(error);
    process.exit(-1);
});