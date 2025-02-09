import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/app/utils/axios-config";
import { CourseInt } from "@/app/utils/interface";

interface StateInt {
  airtimeBillers: any;
  dataBillers: any;
  cableBillers: any;
  find: any;
  loading: boolean;
  error: boolean;
}
// Fetch all country
export const fetchAirtimeBillers = createAsyncThunk(
  "country/fetchAirtimeBillers",
  async () => {
    const response = await axiosInstance.get("/ng-payment/airtime-billers");
    console.log("here is airtime", response);
    return response.data.data;
  }
);

// Fetch country states
export const fetchDataBillers = createAsyncThunk(
  "country/fetchCountryState",
  async (countryCode: any) => {
    const response = await axiosInstance.get(`/csc/states/${countryCode}`);
    return response.data.data;
  }
);

// Fetch State cities
export const fetchCableBillers = createAsyncThunk(
  "country/fetchCableBillers",
  async (stateCode: any) => {
    const response = await axiosInstance.get(`/csc/cities/${stateCode}`);
    return response.data.data;
  }
);

const initialState: StateInt = {
  airtimeBillers: [],
  dataBillers: [],
  cableBillers: [],
  find: {},
  loading: false,
  error: false,
};

export const bills = createSlice({
  name: "bills",
  initialState,
  reducers: {
    destroy: (state, action) => {
      return {
        airtimeBillers: [],
        dataBillers: [],
        cableBillers: [],
        find: {},
        loading: false,
        error: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAirtimeBillers.fulfilled, (state, action) => {
        state.airtimeBillers = action.payload;
        state.loading = false;
      })
      .addCase(fetchAirtimeBillers.pending, (state) => {})
      .addCase(fetchAirtimeBillers.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchDataBillers.fulfilled, (state, action) => {
        state.dataBillers = action.payload;
        state.loading = false;
      })
      .addCase(fetchDataBillers.pending, (state) => {})
      .addCase(fetchDataBillers.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchCableBillers.fulfilled, (state, action) => {
        state.cableBillers = action.payload;
        state.loading = false;
      })
      .addCase(fetchCableBillers.pending, (state) => {})
      .addCase(fetchCableBillers.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default bills.reducer;
