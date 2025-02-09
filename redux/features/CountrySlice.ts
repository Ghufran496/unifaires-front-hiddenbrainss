import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/app/utils/axios-config";
import { CourseInt } from "@/app/utils/interface";

interface StateInt {
  countries: any;
  states: any;
  cities: any;
  find: any;
  loading: boolean;
  error: boolean;
}
// Fetch all country
export const fetchCountries = createAsyncThunk(
  "country/fetchCountries",
  async () => {
    const response = await axiosInstance.get("/csc");
    return response.data.data;
  }
);

// Fetch country states
export const fetchCountryStates = createAsyncThunk(
  "country/fetchCountryState",
  async (countryCode: any) => {
    const response = await axiosInstance.get(`/csc/states/${countryCode}`);
    return response.data.data;
  }
);

// Fetch State cities
export const fetchStateCities = createAsyncThunk(
  "country/fetchStateCities",
  async (stateCode: any) => {
    const response = await axiosInstance.get(`/csc/cities/${stateCode}`);
    return response.data.data;
  }
);

const initialState: StateInt = {
  countries: [],
  states: [],
  cities: [],
  find: {},
  loading: false,
  error: false,
};

export const country = createSlice({
  name: "country",
  initialState,
  reducers: {
    destroy: (state, action) => {
      return {
        countries: [],
        states: [],
        cities: [],
        find: {},
        loading: false,
        error: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.loading = false;
      })
      .addCase(fetchCountries.pending, (state) => {})
      .addCase(fetchCountries.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchCountryStates.fulfilled, (state, action) => {
        state.states = action.payload;
        state.loading = false;
      })
      .addCase(fetchCountryStates.pending, (state) => {})
      .addCase(fetchCountryStates.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchStateCities.fulfilled, (state, action) => {
        state.cities = action.payload;
        state.loading = false;
      })
      .addCase(fetchStateCities.pending, (state) => {})
      .addCase(fetchStateCities.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default country.reducer;
