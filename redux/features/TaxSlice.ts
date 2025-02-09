import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/app/utils/axios-config";
import { CourseInt } from "@/app/utils/interface";

interface StateInt {
  taxes: any[];
  find: any;
  loading: boolean;
  error: boolean;
}
// Fetch all tax
export const fetchAllTax = createAsyncThunk("tax/fetchAllTax", async () => {
  const response = await axiosInstance.get("/tax");
  return response.data.data;
});

const initialState: StateInt = {
  taxes: [],
  find: {},
  loading: false,
  error: false,
};

export const tax = createSlice({
  name: "tax",
  initialState,
  reducers: {
    destroy: (state, action) => {
      return {
        taxes: [],
        find: {},
        loading: false,
        error: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTax.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.taxes = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllTax.pending, (state) => {})
      .addCase(fetchAllTax.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default tax.reducer;
