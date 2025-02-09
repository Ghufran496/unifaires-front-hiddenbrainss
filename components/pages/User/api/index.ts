import axiosInstance from "@/app/utils/axios-config";
import config from "@/app/utils/config";
import { api } from "@/app/utils/interceptor";
import axios from "axios";
import { title } from "process";

export const LoginUser = async (data: any) => {
  try {
    const res = await axios.post(`${config.API.API_URL}/auth/login`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const LoginBusiness = async (data: any) => {
  try {
    const res = await axios.post(
      `${config.API.API_URL}/auth/business/login`,
      data
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const GetJobs = async (searchBy?: string, status?: string) => {
  try {
    const res = await axiosInstance.get(
      `${config.API.API_URL}/jobs${searchBy ? `/?title=${searchBy}` : ""}${
        status ? `?status=${status}` : ""
      }`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const GetCourses = async (searchBy?: string, status?: string) => {
  try {
    const res = await axiosInstance.get(
      `/enrol-course/my-course${searchBy ? `/?title=${searchBy}` : ""}${
        status ? `?status=${status}` : ""
      }`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
//WISHLIST

export const GetWishCourses = async (searchBy?: string) => {
  try {
    const res = await axiosInstance.get(
      `${config.API.API_URL}/course-wish/user${
        searchBy ? `/?title=${searchBy}` : ""
      }`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const CreateWishCourse = async (data: any) => {
  try {
    const res = await axiosInstance.post(
      `${config.API.API_URL}/course-wish`,
      data
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
export const DeleteWishCourse = async (courseId: string) => {
  try {
    const res = await axiosInstance.delete(
      `${config.API.API_URL}/course-wish/${courseId}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
// ARCHIVE COURSE
export const CreateArchiveCourse = async (data: any) => {
  try {
    const res = await axiosInstance.post("/archieve-course", data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const GetArchiveCourses = async (searchBy?: string) => {
  try {
    const res = await api.get(
      `${config.API.API_URL}/archieve-course/user${
        searchBy ? `/?title=${searchBy}` : ""
      }`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const DeleteArchiveCourse = async (courseId: string) => {
  try {
    const res = await axiosInstance.delete(
      `${config.API.API_URL}/archieve-course/${courseId}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
// JOBS
export const GetWishJobs = async (searchBy?: string) => {
  try {
    const res = await api.get(
      `${config.API.API_URL}/job-wish/user${
        searchBy ? `/?title=${searchBy}` : ""
      }`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const GetLinkeInJobs = async () => {
  try {
    const res = await api.get(`${config.API.API_URL2}/jobs/linkedin`);
    return res.data;
  } catch (error) {
    return error;
  }
};
