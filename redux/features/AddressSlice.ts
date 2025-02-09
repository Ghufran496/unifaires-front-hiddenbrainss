import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/app/utils/axios-config";
import { CourseInt } from "@/app/utils/interface";

interface StateInt {
  addresses: any[];
  defaultAddress: any;
  find: any;
  loading: boolean;
  error: boolean;
}

// Fetch all address
export const fetchAllAddress = createAsyncThunk(
  "address/fetchAllAddress",
  async (userId: any) => {
    const response = await axiosInstance.get(`/address/user/${userId}`);
    return response.data.data;
  }
);

export const removeAddress = createAsyncThunk(
  "address/removeAddress",
  async (addressId: any) => {
    await axiosInstance.delete(`/address/${addressId}`);
    return addressId; // Return the deleted cart's ID for reference
  }
);

const initialState: StateInt = {
  addresses: [],
  defaultAddress: {},
  find: {},
  loading: false,
  error: false,
};

export const address = createSlice({
  name: "address",
  initialState,
  reducers: {
    destroy: (state, action) => {
      return {
        addresses: [],
        defaultAddress: {},
        find: {},
        loading: false,
        error: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.addresses = action.payload;
        const defaultAddress = action.payload.find(
          (a: any) => a.default === true
        );
        state.defaultAddress = defaultAddress;
        state.loading = false;
      })
      .addCase(fetchAllAddress.pending, (state) => {})
      .addCase(fetchAllAddress.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(removeAddress.fulfilled, (state, action) => {
        // Remove the deleted course from the courses array
        state.addresses = state.addresses.filter(
          (course: any) => course.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(removeAddress.pending, (state) => {})
      .addCase(removeAddress.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default address.reducer;
