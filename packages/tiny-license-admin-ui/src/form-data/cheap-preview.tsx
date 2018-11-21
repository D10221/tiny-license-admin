import { StatelessComponent } from "react";
import * as React from "react";
/**
 *
 */
const CheapPreview: StatelessComponent<{ data: {} }> = ({ data }) => {
  return (
    <pre>{JSON.stringify(data, null, 2).replace(/(\{|\}|"|,)/gi, "")}</pre>
  );
};
export default CheapPreview;
