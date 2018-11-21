import { withAuth } from "@australis/tiny-auth-react";
import { default as Connected } from "./connected";
import { ComponentType } from "react";
const WithAuth = withAuth(Connected);
export default WithAuth as ComponentType<{ image?: any}>;