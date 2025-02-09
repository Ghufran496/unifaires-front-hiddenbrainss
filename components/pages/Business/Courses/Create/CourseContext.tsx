/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { createContext, useEffect, useState } from "react";
import config from "@/app/utils/config";
import { Spin, message } from "antd";
import { useSession } from "next-auth/react";
import CourseCreationDetails from "@/components/pages/Business/Courses/Create/WithVideos/courseId";
import { CourseInt } from "../course.interface";
import axios from "axios";
import { error } from "console";
import axiosInstance from "@/app/utils/axios-config";
import { LoadingOutlined } from "@ant-design/icons";

export interface CourseContextType {
  courseData: CourseInt | any;
  fetchCourseData: Function;
}

export const CourseContext = createContext({} as CourseContextType);

export const CourseProvider = ({ courseId }: any) => {
  const [courseData, setCourseData] = useState<CourseInt | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCourseData = async function () {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/course/${courseId}`);
      if (res.status) {
        setCourseData(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  return (
    <CourseContext.Provider value={{ courseData, fetchCourseData }}>
      <Spin
        spinning={loading}
        indicator={
          <LoadingOutlined className="flex items-center justify-center text-5xl" />
        }
      >
        <CourseCreationDetails />
      </Spin>
    </CourseContext.Provider>
  );
};
