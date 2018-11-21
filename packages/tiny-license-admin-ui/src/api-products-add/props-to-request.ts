import { CrudApiRequest } from "../crud-api";
import { ViewProps } from "./view";
/** */
export default function(props: ViewProps): CrudApiRequest {
  const { formData } = props;
  const { description, displayName, enabled, features, name, notes } = formData;
  const body = {
    description,
    displayName,
    enabled,
    features,
    name,
    notes
  };
  return {
    method: "PUT",
    body
  };
}
