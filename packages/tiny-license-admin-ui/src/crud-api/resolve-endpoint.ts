export default function resolveEndPoint(storeKey: string) {
    const apiBase = process.env.REACT_APP_API_BASE || "";
    const e = process.env[`REACT_APP_API_${storeKey.toUpperCase()}`] || storeKey
    return [ apiBase, e].join("/");
};