// src/redux/features/discountsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/app/utils/axios-config";

interface StateInt {
  countryDiscount: any;
  businessDiscount: any;
  loading: boolean;
  error: any;
}
// Thunks for fetching discounts
export const fetchCountryDiscount = createAsyncThunk(
  "discounts/fetchCountryDiscount",
  async ({ type, country }: { type: string; country: string }) => {
    const response = await axiosInstance.get(
      `/${type}-country-pricing?country=${country}`
    );
    const resData = response.data.data[0];
    return resData;
  }
);

export const fetchBusinessDiscount = createAsyncThunk(
  "discounts/fetchBusinessDiscount",
  async ({ type, businessId }: { type: string; businessId: string }) => {
    const response = await axiosInstance.get(
      `/${type}-business-pricing?businessId=${businessId}`
    );

    const resData = response.data.data[0];
    return resData;
  }
);

const initialState: StateInt = {
  countryDiscount: null,
  businessDiscount: null,
  loading: false,
  error: null,
};

const discountsSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountryDiscount.fulfilled, (state, action) => {
        state.loading = false;
        state.countryDiscount = action.payload;
      })
      .addCase(fetchCountryDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBusinessDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBusinessDiscount.fulfilled, (state, action) => {
        state.loading = false;
        state.businessDiscount = action.payload;
      })
      .addCase(fetchBusinessDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default discountsSlice.reducer;
