export const delay = (n: number) => new Promise(resolve => setTimeout(resolve, n));
export const log =
  process.env.NODE_ENV !== "production" ? console.log.bind(console) : () => { };