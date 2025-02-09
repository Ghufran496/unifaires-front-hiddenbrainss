import { configureStore, Tuple } from "@reduxjs/toolkit";

import userReducer from "./features/UserSlice";
import courseReducer from "./features/CoursesSlice";
import countryReducer from "./features/CountrySlice";
import addressReducer from "./features/AddressSlice";
import taxReducer from "./features/TaxSlice";
import jobReducer from "./features/JobSlice";
import fundingReducer from "./features/FundingSlice";
import fundingAccessReducer from "./features/ManageAccess/Funding";
import chatReducer from "./features/messages/chatsSlices";
import discountReducer from "./features/DiscountSlice";
import currencyReducer from "./features/CurrencySlice";
import billsReducer from "./features/BillsSlice";
import jobCategoriesReducer from "./features/JobCategorySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    country: countryReducer,
    course: courseReducer,
    address: addressReducer,
    tax: taxReducer,
    job: jobReducer,
    funding: fundingReducer,
    accessFnding: fundingAccessReducer,
    chat: chatReducer,
    discounts: discountReducer,
    currency: currencyReducer,
    bills: billsReducer,
    jobCategory: jobCategoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
