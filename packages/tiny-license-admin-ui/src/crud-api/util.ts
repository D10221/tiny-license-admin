export const isDev = process.env.NODE_ENV !== "production";
export const log = isDev ? console.log.bind(console) : () => { };
export const delay = (n: number) => new Promise(resolve => setTimeout(resolve, n));
