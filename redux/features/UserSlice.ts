import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/app/utils/axios-config";
import { CourseInt } from "@/app/utils/interface";
import { getSession } from "next-auth/react";

interface StateInt {
  userRole: any;
  myProfile: any[];
  walletBalance: any;
  myCards: any[];
  mySkills: any[];
  skillsOption: [];
  sectorOptions: [];
  allSkills: [];
  allSectors: [];
  find: any;
  loading: boolean;
  error: boolean;
}

// Fetch User Role
export const fetchUserRole = createAsyncThunk(
  "user/fetchUserRole",
  async () => {
    const session = await getSession();
    const response = await axiosInstance.get(`/roles/${session?.user.roleId}`);

    return response.data.data;
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (userType: any) => {
    let endPoint;
    if (userType === "user") {
      endPoint = "users";
    } else if (userType === "business") {
      endPoint = "business";
    }
    const response = await axiosInstance.get(`/${endPoint}/my-profile`);
    return response.data.data;
  }
);

// Fetch User Skills
export const fetchUserSkills = createAsyncThunk(
  "user/fetchUserSkills",
  async () => {
    const response = await axiosInstance.get("/users-skills/my-skills");

    // console.log(skillsOption);
    return response.data.data;
  }
);
// Fetch SKills and Expertise
export const fetchSkills = createAsyncThunk("user/fetchSkills", async () => {
  const response = await axiosInstance.get("/skills");

  // console.log("here is all skills", response);
  return response.data.data;
});

// Fetch SKills and Expertise
export const fetchSectors = createAsyncThunk("user/fetchSectors", async () => {
  const response = await axiosInstance.get("/industry");

  // console.log(skillsOption);
  return response.data.data;
});

// Fetch user Card
export const fetchUserCard = createAsyncThunk(
  "user/fetchUserCard",
  async () => {
    const response = await axiosInstance.get("/payment/customer-card");
    return response.data.data;
  }
);
export const fetchWalletBalance = createAsyncThunk(
  "user/fetchWalletBalance",
  async () => {
    const response = await axiosInstance.get("/virtual-account/balance");

    console.log("here is the balance", response);
    return response.data.data;
  }
);

const initialState: StateInt = {
  userRole: "",
  myProfile: [],
  walletBalance: "",
  myCards: [],
  mySkills: [],
  skillsOption: [],
  sectorOptions: [],
  allSkills: [],
  allSectors: [],
  find: {},
  loading: false,
  error: false,
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    destroy: (state, action) => {
      return {
        userRole: "",
        myProfile: [],
        walletBalance: "",
        myCards: [],
        mySkills: [],
        skillsOption: [],
        sectorOptions: [],
        allSkills: [],
        allSectors: [],
        find: {},
        loading: false,
        error: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRole.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.userRole = action.payload.title;
        state.loading = false;
      })
      .addCase(fetchUserRole.pending, (state) => {})
      .addCase(fetchUserRole.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.myProfile = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.pending, (state) => {})
      .addCase(fetchUserProfile.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchUserSkills.fulfilled, (state, action) => {
        state.mySkills = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserSkills.pending, (state) => {})
      .addCase(fetchUserSkills.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        const subSkills = action.payload.reduce(
          (accumulator: any, skill: any) => {
            if (skill.children && skill.children.length > 0) {
              accumulator.push(...skill.children);
            }
            return accumulator;
          },
          []
        );
        const skillsOption = subSkills.map((value: any) => {
          return {
            label: value.name,
            value: value.id,
          };
        });
        state.skillsOption = skillsOption;
        state.allSkills = action.payload;
        state.loading = false;
      })
      .addCase(fetchSkills.pending, (state) => {})
      .addCase(fetchSkills.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchSectors.fulfilled, (state, action) => {
        const subSectors = action.payload.reduce(
          (accumulator: any, sector: any) => {
            if (sector.children && sector.children.length > 0) {
              accumulator.push(...sector.children);
            }
            return accumulator;
          },
          []
        );
        const sectorOptions = subSectors.map((value: any) => {
          return {
            label: value.name,
            value: value.id,
          };
        });
        state.sectorOptions = sectorOptions;
        state.allSectors = action.payload;
        state.loading = false;
      })
      .addCase(fetchSectors.pending, (state) => {})
      .addCase(fetchSectors.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchUserCard.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.myCards = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserCard.pending, (state) => {})
      .addCase(fetchUserCard.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchWalletBalance.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.walletBalance = action.payload;
        state.loading = false;
      })
      .addCase(fetchWalletBalance.pending, (state) => {})
      .addCase(fetchWalletBalance.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default user.reducer;
