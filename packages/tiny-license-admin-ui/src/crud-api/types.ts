/** */
export type CrudApiState<T> = { [key: string]: any } & {
  busy: boolean;
  error: string | undefined;
  data: T;
};
/** */
export type CrudAPiVerb = "GET" | "PUT" | "POST" | "DELETE";
/** */
export const verbs: CrudAPiVerb[] = ["GET", "PUT", "POST", "DELETE"];
/** */
export interface CrudApiRequest {
  params?: string[];
  query?: {};
  body?: {};
  method: CrudAPiVerb;
}
/** */
export type CrudApiCall = (args: CrudApiRequest) => Promise<any>;
/** */
export interface CrudApiOptions {
  resultKey: string;
  endpoint?: string;
  prefix?: string;
}
/** */
export interface CrudApiActions {
  fetch(payload: CrudApiRequest): any;
  setResult(data: any): any;
  clearError(): any;
  clearResult(): any;
  clearSuccess(): any;
  setBusy(busy: boolean): any;
  setError(error: string | Error): any;
  setState(payload: {}): any;
  /**
   * clear error, success, result
   */
  reset():any
}
