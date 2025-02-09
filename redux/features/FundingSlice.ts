import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/app/utils/axios-config";

interface StateInt {
  funding: any;
  fundings: any[];
  myFundings: any;
  savedFundings: any[];
  acceptedFundings: any[];
  interviewedFundings: any[];
  rejectedFundings: any[];
  archivedFundings: any[];
  unassignedApplicants: any[];
  acceptedApplicants: any[];
  interviewingApplicants: any[];
  rejectedApplicants: any[];
  find: any;
  loading: boolean;
  error: boolean;
}
// Fetch all courses
export const fetchFundings = createAsyncThunk(
  "funding/fetchFunsdings",
  async () => {
    const response = await axiosInstance.get("/funding");

    return response.data.data;
  }
);

// Fetch a single funding
export const fetchSinglefunding = createAsyncThunk(
  "funding/fetchSinglefunding",
  async (slug: any) => {
    const response = await axiosInstance.get(`/funding/slug/${slug}`);
    // console.log(response.data);
    return response.data.data;
  }
);

// Fetch my fundings
export const fetchMyFunding = createAsyncThunk(
  "funding/fetchMyFunding",
  async () => {
    const response = await axiosInstance.get("/enrol-funding/user-enrol");

    return response.data.data;
  }
);

// Fetch Funding with Status
export const fetchFundingWithStatus = createAsyncThunk(
  "funding/fetchFundingWithStatus",
  async (status: any) => {
    const response = await axiosInstance.get(
      `/enrol-funding/user-enrol?fundingUserStatus=${status}`
    );
    const res = {
      status: status,
      response: response.data.data,
    };
    return res;
  }
);

// Fetch Funding Applicants with Status
export const fetchFundingApplicantWithStatus = createAsyncThunk(
  "funding/fetchFundingApplicantWithStatus",
  async (requestParam: any) => {
    const response = await axiosInstance.get(
      `/funding/business-funding-applicants/${requestParam[0]}?fundingUserStatus=${requestParam[1]}`
    );

    const dataRes = response.data.data.fundings;
    const fundingEnrols = dataRes[0].fundingenrols;

    // console.log("this is the funding applicant", response);
    const res = {
      status: requestParam[1],
      response: fundingEnrols,
    };
    return res;
  }
);

// Fetch Saved Funding
export const fetchSavedFundings = createAsyncThunk(
  "funding/fetchSavedFundings",
  async () => {
    const response = await axiosInstance.get("/funding-wish/user");
    return response.data.data;
  }
);

// Delete My funding
export const deleteMyFunding = createAsyncThunk(
  "funding/deleteMyFunding",
  async (enrolId: any) => {
    await axiosInstance.delete(`/enrol-funding/${enrolId}`);
    return enrolId; // Return the deleted funding's ID for reference
  }
);

// Delete a funding
export const deleteFunding = createAsyncThunk(
  "funding/deletefunding",
  async (fundingId) => {
    await axiosInstance.delete(`/funding/${fundingId}`);
    return fundingId; // Return the deleted funding's ID for reference
  }
);

const initialState: StateInt = {
  funding: {},
  fundings: [],
  myFundings: [],
  savedFundings: [],
  acceptedFundings: [],
  interviewedFundings: [],
  rejectedFundings: [],
  archivedFundings: [],
  unassignedApplicants: [],
  acceptedApplicants: [],
  interviewingApplicants: [],
  rejectedApplicants: [],
  find: {},
  loading: false,
  error: false,
};

export const funding = createSlice({
  name: "funding",
  initialState,
  reducers: {
    destroy: (state, action) => {
      return {
        funding: {},
        fundings: [],
        myFundings: [],
        savedFundings: [],
        acceptedFundings: [],
        interviewedFundings: [],
        rejectedFundings: [],
        archivedFundings: [],
        unassignedApplicants: [],
        acceptedApplicants: [],
        interviewingApplicants: [],
        rejectedApplicants: [],
        find: {},
        loading: false,
        error: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFundings.fulfilled, (state, action) => {
        state.fundings = action.payload.fundings;
        state.loading = false;
      })
      .addCase(fetchFundings.pending, (state) => {})
      .addCase(fetchFundings.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchSavedFundings.fulfilled, (state, action) => {
        state.savedFundings = action.payload.wishes;
        state.loading = false;
      })
      .addCase(fetchSavedFundings.pending, (state) => {})
      .addCase(fetchSavedFundings.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchFundingWithStatus.fulfilled, (state, action) => {
        if (action.payload.status === "accepted") {
          state.acceptedFundings = action.payload.response.enrols;
        } else if (action.payload.status === "interviewing") {
          state.interviewedFundings = action.payload.response.enrols;
        } else if (action.payload.status === "rejected") {
          state.rejectedFundings = action.payload.response.enrols;
        } else if (action.payload.status === "archive") {
          state.archivedFundings = action.payload.response.enrols;
        }

        state.loading = false;
      })
      .addCase(fetchFundingWithStatus.pending, (state) => {})
      .addCase(fetchFundingWithStatus.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchFundingApplicantWithStatus.fulfilled, (state, action) => {
        if (action.payload.status === "pending") {
          state.unassignedApplicants = action.payload.response;
        } else if (action.payload.status === "accepted") {
          state.acceptedApplicants = action.payload.response;
        } else if (action.payload.status === "interviewing") {
          state.interviewingApplicants = action.payload.response;
        } else if (action.payload.status === "rejected") {
          state.rejectedApplicants = action.payload.response;
        }

        state.loading = false;
      })
      .addCase(fetchFundingApplicantWithStatus.pending, (state) => {})
      .addCase(fetchFundingApplicantWithStatus.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchSinglefunding.fulfilled, (state, action) => {
        state.funding = action.payload;
        state.loading = false;
      })
      .addCase(fetchSinglefunding.pending, (state) => {})
      .addCase(fetchSinglefunding.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(deleteFunding.fulfilled, (state, action) => {
        // Remove the deleted funding from the fundings array
        state.fundings = state.fundings.filter(
          (funding: any) => funding.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteFunding.pending, (state) => {})
      .addCase(deleteFunding.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchMyFunding.fulfilled, (state, action) => {
        state.myFundings = action.payload.enrols;
        // console.log(state.fundings);
        state.loading = false;
      })
      .addCase(fetchMyFunding.pending, (state) => {})
      .addCase(fetchMyFunding.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(deleteMyFunding.fulfilled, (state, action) => {
        // Remove the deleted funding from the fundings array
        state.myFundings = state.myFundings.filter(
          (enrol: any) => enrol.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteMyFunding.pending, (state) => {})
      .addCase(deleteMyFunding.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default funding.reducer;
