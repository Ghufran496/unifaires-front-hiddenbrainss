import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/app/utils/axios-config";

interface StateInt {
  job: any;
  jobs: any[];
  myJobs: any;
  savedJobs: any[];
  acceptedJobs: any[];
  interviewedJobs: any[];
  rejectedJobs: any[];
  archivedJobs: any[];
  unassignedApplicants: any[];
  acceptedApplicants: any[];
  interviewingApplicants: any[];
  rejectedApplicants: any[];
  find: any;
  loading: boolean;
  error: boolean;
}
// Fetch all courses
export const fetchJobs = createAsyncThunk("job/fetchJobs", async () => {
  const response = await axiosInstance.get("/jobs");

  return response.data.data;
});

// Fetch a single job
export const fetchSinglejob = createAsyncThunk(
  "job/fetchSinglejob",
  async (slug: any) => {
    const response = await axiosInstance.get(`/jobs/slug/${slug}`);
    // console.log(response.data);
    return response.data.data;
  }
);

// Fetch my jobs
export const fetchMyJob = createAsyncThunk("job/fetchMyjob", async () => {
  const response = await axiosInstance.get("/enrol-job/user-enrol");

  return response.data.data;
});

// Fetch Job with Status
export const fetchJobWithStatus = createAsyncThunk(
  "job/fetchJobWithStatus",
  async (status: any) => {
    const response = await axiosInstance.get(
      `/enrol-job/user-enrol?jobUserStatus=${status}`
    );
    const res = {
      status: status,
      response: response.data.data,
    };
    return res;
  }
);

// Fetch Job Applicants with Status
export const fetchJobApplicantWithStatus = createAsyncThunk(
  "job/fetchJobApplicantWithStatus",
  async (requestParam: any) => {
    const response = await axiosInstance.get(
      `/jobs/business-job-applicants/${requestParam[0]}?jobUserStatus=${requestParam[1]}`
    );

    const dataRes = response.data.data.jobs;
    const jobEnrols = dataRes[0].jobenrols;

    // console.log("this is the job applicant", response);
    const res = {
      status: requestParam[1],
      response: jobEnrols,
    };
    return res;
  }
);

// Fetch Saved Jobs
export const fetchSavedJobs = createAsyncThunk(
  "job/fetchSavedJobs",
  async () => {
    const response = await axiosInstance.get("/job-wish/user");
    return response.data.data;
  }
);

// Delete My job
export const deleteMyJob = createAsyncThunk(
  "job/deleteMyJob",
  async (enrolId: any) => {
    await axiosInstance.delete(`/enrol-job/${enrolId}`);
    return enrolId; // Return the deleted job's ID for reference
  }
);

// Delete a job
export const deleteJob = createAsyncThunk("job/deletejob", async (jobId) => {
  await axiosInstance.delete(`/job/${jobId}`);
  return jobId; // Return the deleted job's ID for reference
});

const initialState: StateInt = {
  job: {},
  jobs: [],
  myJobs: [],
  savedJobs: [],
  acceptedJobs: [],
  interviewedJobs: [],
  rejectedJobs: [],
  archivedJobs: [],
  unassignedApplicants: [],
  acceptedApplicants: [],
  interviewingApplicants: [],
  rejectedApplicants: [],
  find: {},
  loading: false,
  error: false,
};

export const job = createSlice({
  name: "job",
  initialState,
  reducers: {
    destroy: (state, action) => {
      return {
        job: {},
        jobs: [],
        myJobs: [],
        savedJobs: [],
        acceptedJobs: [],
        interviewedJobs: [],
        rejectedJobs: [],
        archivedJobs: [],
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
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload.jobs;
        state.loading = false;
      })
      .addCase(fetchJobs.pending, (state) => {})
      .addCase(fetchJobs.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchSavedJobs.fulfilled, (state, action) => {
        state.savedJobs = action.payload.wishes;
        state.loading = false;
      })
      .addCase(fetchSavedJobs.pending, (state) => {})
      .addCase(fetchSavedJobs.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchJobWithStatus.fulfilled, (state, action) => {
        if (action.payload.status === "accepted") {
          state.acceptedJobs = action.payload.response.enrols;
        } else if (action.payload.status === "interviewing") {
          state.interviewedJobs = action.payload.response.enrols;
        } else if (action.payload.status === "rejected") {
          state.rejectedJobs = action.payload.response.enrols;
        } else if (action.payload.status === "archive") {
          state.archivedJobs = action.payload.response.enrols;
        }

        state.loading = false;
      })
      .addCase(fetchJobWithStatus.pending, (state) => {})
      .addCase(fetchJobWithStatus.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchJobApplicantWithStatus.fulfilled, (state, action) => {
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
      .addCase(fetchJobApplicantWithStatus.pending, (state) => {})
      .addCase(fetchJobApplicantWithStatus.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchSinglejob.fulfilled, (state, action) => {
        state.job = action.payload;
        state.loading = false;
      })
      .addCase(fetchSinglejob.pending, (state) => {})
      .addCase(fetchSinglejob.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        // Remove the deleted job from the jobs array
        state.jobs = state.jobs.filter((job: any) => job.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteJob.pending, (state) => {})
      .addCase(deleteJob.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchMyJob.fulfilled, (state, action) => {
        state.myJobs = action.payload.enrols;
        // console.log(state.jobs);
        state.loading = false;
      })
      .addCase(fetchMyJob.pending, (state) => {})
      .addCase(fetchMyJob.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(deleteMyJob.fulfilled, (state, action) => {
        // Remove the deleted job from the jobs array
        state.myJobs = state.myJobs.filter(
          (enrol: any) => enrol.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteMyJob.pending, (state) => {})
      .addCase(deleteMyJob.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default job.reducer;
