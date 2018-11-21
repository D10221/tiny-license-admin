import { store as customersView } from "../api-customers";
import { formStore as customresAddForm, store as customersAddView } from "../api-customers-add";
import { store as licenseView } from "../api-licenses";
import { formStore as licenseAddFormView, store as licenseAddView } from "../api-licenses-add";
import { store as productsView } from "../api-products";
import { formStore as apiProductsAddForm, store as apiProductsAdd } from "../api-products-add";
import { adapter as rootAdapter } from "../app";
import { adapter as home } from "../home";
/**
 *
 */
export default {
  [rootAdapter.storeKey]: rootAdapter.reducer,
  [home.storeKey]: home.reducer,
  [customersView.storeKey]: customersView.reducer,
  [customersAddView.storeKey]: customersAddView.reducer,
  [customresAddForm.storeKey]: customresAddForm.reducer,
  // ...
  [productsView.storeKey]: productsView.reducer,
  // ...
  [apiProductsAdd.storeKey]: apiProductsAdd.reducer,
  [apiProductsAddForm.storeKey]: apiProductsAddForm.reducer,
  // ...
  [licenseAddView.storeKey]: licenseAddView.reducer,
  [licenseAddFormView.storeKey]: licenseAddFormView.reducer,
  [licenseView.storeKey]: licenseView.reducer,
};
