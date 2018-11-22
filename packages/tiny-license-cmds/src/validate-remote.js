import fetch from "node-fetch";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
/**
 *
 * @param {import("minimist").ParsedArgs} argsMap
 */
export default async function(argsMap) {
  const isFile = /.*(\.json|\.lic)/.test(argsMap.token);

  /**
   *
   * @param {string} token
   * @return {*}
   */
  function tryDecode(token) {
    try {
      const decoded = jwt.decode(token);
      console.log("decoded: ", decoded);
      return decoded;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  /**
   * @param {string} filePath
   * @return {{ token: string|undefined, validator: string|undefined}}
   */
  function getToken(filePath) {
    const lic = JSON.parse(readFileSync(filePath, "utf8"));
    console.log("lic: ", lic);
    const { validator } = tryDecode(lic.token);
    const { token } = lic;
    return {
      token,
      validator,
    };
  }

  try {
    
    const { token, validator } = isFile
      ? getToken(argsMap.token)
      : { token: argsMap.token, validator: undefined };

    if (!token) {
      return Promise.reject(new Error("Token required"));
    }

    console.log("Token: '%s'", token || "?");
    const validatorUrl = argsMap.validator || validator;
    if (!validatorUrl) {
      return Promise.reject("validator url required");
    }

    let url;
    switch (argsMap.mode) {
      case "params": {
        url = `${validatorUrl}/${token}`;
        break;
      }
      case "headers": {
        url = `${validatorUrl}`;
        break;
      }
      case "query": {
        url = `${validatorUrl}?token=${token}`;
        break;
      }
      default: {
        url = `${validatorUrl}?token=${token}`;
      }
    }

    const r = await fetch(url, {
      method: "GET",
      headers: (argsMap.mode === "headers" && { Token: token }) || undefined,
    });

    console.log("url: '%s'", url);
    const text = await r.text();

    return `OK: ${r.ok}, Message: ${text || r.statusText || "?"}`;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}
