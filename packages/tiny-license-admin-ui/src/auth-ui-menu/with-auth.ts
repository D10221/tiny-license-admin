import { default as Connected } from "./connected";
import { withAuth } from "@australis/tiny-auth-react";
import { ComponentType } from "react";
export default withAuth(Connected) as ComponentType<{ onRequestChangePassword: () => any }>;