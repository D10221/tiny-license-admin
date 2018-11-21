import { connect } from "react-redux";
import { selector as auth } from "@australis/tiny-auth-redux";
import Download, { DownloadParams } from "./download";
import { ComponentType } from "react";
/** */
const Connected: ComponentType<DownloadParams> = connect(auth)(Download);
/** */
export default Connected;
