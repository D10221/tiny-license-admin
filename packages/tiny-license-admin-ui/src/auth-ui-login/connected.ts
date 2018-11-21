import { connect } from "react-redux";
import selector from "./selector";
import View, { LoginViewProps } from "./login-view";

const Connected: React.ComponentType<Pick<LoginViewProps, "auth" | "image">> = 
connect(selector)(View);
/** */
export default Connected;