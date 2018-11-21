/** */
import { ViewProps } from "./view";
import { CrudApiRequest } from "../crud-api";
/** */
export default function propsToRequest(props: ViewProps): CrudApiRequest {
    const { formData,  } = props;
    const {
        customer,
        description,
        displayName,
        enabled,
        featureValues,
        notes,
        product,
        exp
    } = formData;
    const features = featureValues; // JSON.stringify(featureValues);
    const body = {
        customer,
        description,
        displayName,
        enabled,
        features,
        notes,
        product,
        exp
    };
    return {
        method: "PUT",
        body
    }
}