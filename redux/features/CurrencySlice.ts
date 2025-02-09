import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie } from "cookies-next";

// const API_URL = "https://api.currencyapi.com/v3"; //currencyapi.com
const API_URL = "https:///openexchangerates.org/api"; //openexchangerates.org
const API_KEY = "29f25338425b4c008951855e633e7e28"; // Replace with your actual API key
// const API_KEY = "cur_live_0Hr9SfSFCMAIVDYyGgGrEvc7hAOFro6cZl0J5aqn"; // currencyapi.com

interface StateInt {
  currencies: any;
  currencyRate: any;
  loading: boolean;
  error: any;
}

// Thunk for fetching currencies
export const fetchCurrencies = createAsyncThunk(
  "currencies/fetchCurrencies",
  async () => {
    // const response = await axios.get(`${API_URL}/currencies?apikey=${API_KEY}`);
    const response = await axios.get(
      `${API_URL}/currencies.json?app_id=${API_KEY}`
    );
    // console.log("here is currency in slice ", response.data);
    return response.data;
    // return response.data.data;
  }
);

export const fetchCurrencyConvertionRate = createAsyncThunk(
  "currencies/fetchCurrencyConvertionRate",
  async ({ currency }: any) => {
    // const response = await axios.get(
    //   `${API_URL}/latest?currencies=${currency}&&apikey=${API_KEY}`
    // );
    const response = await axios.get(
      `${API_URL}/latest.json?symbols=${currency}&&app_id=${API_KEY}`
    );
    // console.log("here is currency conversion rate", response.data);
    // return response.data.data[currency].value;
    return response.data.rates[currency];
  }
);
const initialState: StateInt = {
  currencies: {},
  currencyRate: null,
  loading: false,
  error: null,
};

const currency = createSlice({
  name: "currencies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.loading = false;
        state.currencies = action.payload;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCurrencyConvertionRate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrencyConvertionRate.fulfilled, (state, action) => {
        state.loading = false;
        state.currencyRate = action.payload;
      })
      .addCase(fetchCurrencyConvertionRate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default currency.reducer;
