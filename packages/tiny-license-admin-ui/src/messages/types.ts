import { MessageStatus } from "../snackbar-content-with-satus/snackbar-content-with-satus";

export interface MessagesState {
  message?: string;
  status?: MessageStatus;
}
export interface Message {
  message?: string;
  status?: MessageStatus;
}
export interface MessageActions {
  clearMessage(): any;
  setError(error: Error | string | undefined): any;
  setInfo(message: string): any;
  setMessage(message: Message): any;
  setSuccess(message: string): any;
  setWarning(message: string): any;
}
