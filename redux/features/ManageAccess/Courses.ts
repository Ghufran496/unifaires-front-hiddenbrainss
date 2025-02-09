import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/app/utils/axios-config";
import { CourseInt } from "@/app/utils/interface";

interface StateInt {
  course: any;
  courses: CourseInt[];
  courseProgress: any[];
  myCourses: any;
  cart: any;
  find: any;
  loading: boolean;
  error: boolean;
}
// Fetch all courses
export const fetchCourses = createAsyncThunk(
  "course/fetchCourses",
  async () => {
    const response = await axiosInstance.get("/course");

    console.log(response.data.data);
    return response.data.data;
  }
);

// Fetch a single course
export const fetchSingleCourse = createAsyncThunk(
  "course/fetchSingleCourse",
  async (courseId: any) => {
    const response = await axiosInstance.get(`/course/${courseId}`);
    // console.log(response.data);
    return response.data.data;
  }
);

// Fetch my courses
export const fetchMyCourse = createAsyncThunk(
  "course/fetchMyCourse",
  async () => {
    const response = await axiosInstance.get("/enrol-course/my-course");

    return response.data.data;
  }
);

// Delete My course
export const deleteMyCourse = createAsyncThunk(
  "course/deleteMyCourse",
  async (enrolId: any) => {
    await axiosInstance.delete(`/enrol-course/${enrolId}`);
    return enrolId; // Return the deleted course's ID for reference
  }
);

// Update a course
export const updateCourse = createAsyncThunk(
  "course/updateCourse",
  async (courseData: any) => {
    const response = await axiosInstance.put(
      `/course/${courseData.id}`,
      courseData
    );
    return response.data.data;
  }
);

// Delete a course
export const deleteCourse = createAsyncThunk(
  "course/deleteCourse",
  async (courseId) => {
    await axiosInstance.delete(`/course/${courseId}`);
    return courseId; // Return the deleted course's ID for reference
  }
);

// Add to Cart
export const addCart = createAsyncThunk(
  "course/addCart",
  async (courseId: any) => {
    const response = await axiosInstance.post("/cart", {
      courseId: courseId,
    });

    console.log(response.data.data);
    return response.data.data;
  }
);

// Fetch Cart Course
export const cartCourses = createAsyncThunk("course/cartCourses", async () => {
  const response = await axiosInstance.get("/cart/my-cart");

  // console.log(response.data.data);
  return response.data.data;
});

// Remove a cart
export const removeCart = createAsyncThunk(
  "course/removeCart",
  async (cartId: any) => {
    await axiosInstance.delete(`/cart/${cartId}`);
    return cartId; // Return the deleted cart's ID for reference
  }
);

export const fetchCourseProgress = createAsyncThunk(
  "course/courseProgress",
  async () => {
    const response = await axiosInstance.get("/course-progress");
    return response.data.data;
  }
);

const initialState: StateInt = {
  course: {},
  courses: [],
  myCourses: [],
  courseProgress: [],
  cart: [],
  find: {},
  loading: false,
  error: false,
};

export const course = createSlice({
  name: "course",
  // initialState: {
  //   course: {},
  //   courses: [],
  //   cart: [],
  //   find: {},
  //   loading: false,
  //   error: false,
  // },
  initialState,
  reducers: {
    destroy: (state, action) => {
      return {
        course: {},
        courses: [],
        myCourses: [],
        courseProgress: [],
        cart: [],
        find: {},
        loading: false,
        error: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload.courses;
        console.log(state.courses);
        state.loading = false;
      })
      .addCase(fetchCourses.pending, (state) => {})
      .addCase(fetchCourses.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchSingleCourse.fulfilled, (state, action) => {
        state.course = action.payload;
        state.loading = false;
      })
      .addCase(fetchSingleCourse.pending, (state) => {})
      .addCase(fetchSingleCourse.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        // Update the course in the state after a successful update
        state.find = action.payload;
        state.loading = false;
      })
      .addCase(updateCourse.pending, (state) => {})
      .addCase(updateCourse.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        // Remove the deleted course from the courses array
        state.courses = state.courses.filter(
          (course: any) => course.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteCourse.pending, (state) => {})
      .addCase(deleteCourse.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        const newCourse = action.payload;
        if (!state.cart.find((course: any) => course.id === newCourse.id)) {
          // Append the new course to the existing cart
          state.cart = [...state.cart, newCourse];
        }
        state.loading = false;
        state.error = false;
      })
      .addCase(addCart.pending, (state) => {})
      .addCase(addCart.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(cartCourses.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(cartCourses.pending, (state) => {})
      .addCase(cartCourses.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        // Remove the deleted course from the courses array
        state.cart = state.cart.filter(
          (course: any) => course.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(removeCart.pending, (state) => {})
      .addCase(removeCart.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchMyCourse.fulfilled, (state, action) => {
        state.myCourses = action.payload;
        // console.log(state.courses);
        state.loading = false;
      })
      .addCase(fetchMyCourse.pending, (state) => {})
      .addCase(fetchMyCourse.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(deleteMyCourse.fulfilled, (state, action) => {
        // Remove the deleted course from the courses array
        state.myCourses = state.myCourses.filter(
          (enrol: any) => enrol.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteMyCourse.pending, (state) => {})
      .addCase(deleteMyCourse.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchCourseProgress.fulfilled, (state, action) => {
        state.courseProgress = action.payload;
        // console.log(state.courses);
        state.loading = false;
      })
      .addCase(fetchCourseProgress.pending, (state) => {})
      .addCase(fetchCourseProgress.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default course.reducer;
