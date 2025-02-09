import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/app/utils/axios-config";

// State interface
interface JobCategoryState {
  jobCategories: any[];
  defaultCategory: any;
  loading: boolean;
  error: boolean;
}

// Fetch all job categories
export const fetchAllJobCategories = createAsyncThunk(
  "jobCategory/fetchAllJobCategories",
  async () => {
    const response = await axiosInstance.get(`/job-category`);
    return response.data.data;
  }
);

// Initial state
const initialState: JobCategoryState = {
  jobCategories: [],
  defaultCategory: null,
  loading: false,
  error: false,
};

// Job categories slice
const jobCategoriesSlice = createSlice({
  name: "jobCategory",
  initialState,
  reducers: {
    resetState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobCategories.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAllJobCategories.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.jobCategories = action.payload;
        state.defaultCategory = action.payload.find((category) => category.default === true);
        state.loading = false;
      })
      .addCase(fetchAllJobCategories.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

// Export the reducer and actions
export const { resetState } = jobCategoriesSlice.actions;
export default jobCategoriesSlice.reducer;
