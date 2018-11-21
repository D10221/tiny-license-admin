import { CrudApiRequest } from "../crud-api";
import { ViewProps } from "./view";

export default function(props: ViewProps): CrudApiRequest{
    const { formData } = props;
    const {
        address,
        contact,
        description,
        displayName,
        email,
        enabled,
        name,
        phone,
        notes
      } = formData;
      const body = {
        address,
        contact,
        description,
        displayName,
        email,
        enabled,
        name,
        notes,
        phone
      };
      return {
        method: "PUT",
        body
      }
}