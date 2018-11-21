import { api as apiCustomerLookupFieldApi } from "../api-customer-lookup-field";
import { api as apiCustomersAdd } from "../api-customers-add";
import { api as apiCustomersList } from "../api-customers-list";
import { api as apiLicenseAdd } from "../api-licenses-add";
import { api as apiCustomerDelete } from "../api-customer-delete";
import { api as apiCustomerEdit } from "../api-customer-edit";
import { api as apiLicenseList } from "../api-license-list";
import { api as productsListApi } from "../api-product-list";
import { api as apiProductEdit } from "../api-product-edit";
import { api as apiProductDelete } from "../api-product-delete";
import { api as apiProductLookupField } from "../api-product-lookup-field";
import { api as apiProductsAdd } from "../api-products-add";
import { api as apiLicDeliver } from "../api-license-deliver";
import { api as apiLicDelete } from "../api-license-delete";
import { api as apiLicEdit } from "../api-license-edit";

export default {
    // ...
    [apiCustomersList.storeKey]: apiCustomersList.reducer,
    [apiCustomersAdd.storeKey]: apiCustomersAdd.reducer,
    [apiCustomerLookupFieldApi.storeKey]: apiCustomerLookupFieldApi.reducer,
    [apiCustomerDelete.storeKey]: apiCustomerDelete.reducer,
    [apiCustomerEdit.storeKey]: apiCustomerEdit.reducer,
    // ...
    [productsListApi.storeKey]: productsListApi.reducer,
    [apiProductsAdd.storeKey]: apiProductsAdd.reducer,
    [apiProductLookupField.storeKey]: apiProductLookupField.reducer,
    [apiProductEdit.storeKey]: apiProductEdit.reducer,
    [apiProductDelete.storeKey]: apiProductDelete.reducer,
    // ...
    [apiLicenseAdd.storeKey]: apiLicenseAdd.reducer,
    [apiLicenseList.storeKey]: apiLicenseList.reducer,
    [apiLicDeliver.storeKey]: apiLicDeliver.reducer,
    [apiLicDelete.storeKey]: apiLicDelete.reducer,
    [apiLicEdit.storeKey]: apiLicEdit.reducer
};
