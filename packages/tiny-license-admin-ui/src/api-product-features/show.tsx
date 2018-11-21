import { StatelessComponent } from "react";
import * as React from "react";

const Show: StatelessComponent<{ value: string }> = ({ value }) => (
  <span>{value}</span>
);
export default Show;
