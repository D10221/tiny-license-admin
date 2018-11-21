export function isPromise(x: any): x is Promise<any> {
  return typeof x === "function" && typeof x.then === "function";
}

export function isFunction(x: any): x is Function {
  return typeof x === "function";
}

export function isRegExp(x: any): x is RegExp {
  return x instanceof RegExp;
}

export function isString(x: any): x is string {
  return typeof x === "string";
}

export function isStringNotEmpty(x: any): x is string {
  return isString(x) && x.trim() !== "";
}

export function isStringArray(x: any): x is string[] {
  return Array.isArray(x) && !x.find(y => !isString(y));
}

export function isBoolean(x: any): x is boolean {
  return typeof x === "boolean";
}

export function isMap(x: any): x is Map<any, any> {
  return x instanceof Map || (x && isFunction(x.get) && isFunction(x.has));
}

export function isValidationEmpty(validation: {}) {
  const ok = Object.keys(validation)
    .map(key => isFalsyOrEmpty(validation[key]))
    .reduce((out, empty) => {
      out = out && empty;
      return out;
    }, true);
  return ok;
}

export function isFalsyOrEmpty(x: any) {
  return !x || (typeof x === "string" && x.trim() === "");
}

export const warn =
  process.env.NODE_ENV !== "production"
    ? console.error.bind(console)
    : () => {};
    
export const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
