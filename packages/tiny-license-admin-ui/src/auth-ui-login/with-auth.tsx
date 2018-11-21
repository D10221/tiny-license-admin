import { withAuth } from "@australis/tiny-auth-react";
import { default as Connected } from "./connected";
import { ComponentType } from "react";
export default withAuth(Connected) as ComponentType<{image?: any}>;
