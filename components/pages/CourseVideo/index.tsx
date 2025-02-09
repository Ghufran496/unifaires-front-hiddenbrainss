/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import LecturePlayer from "./LecturePlayer";
import axiosInstance from "@/app/utils/axios-config";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchUserRole } from "@/redux/features/UserSlice";

const CourseVideoPage = ({ lectureVideo }: any) => {
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch: any = useAppDispatch();
  const [courseId, setCourseId] = useState("");

  /**
   * initialize course id value
   */
  const initCourseId = () => {
    if (typeof window !== "undefined") {
      const pathParts = window.location.pathname.split("/");
      const uuidFromUrl = pathParts[pathParts.length - 1];
      setCourseId(uuidFromUrl);
    }
  };

  useEffect(() => {
    initCourseId();
    dispatch(fetchUserRole());
  }, []);

  const userType = useAppSelector((state: any) => state.user.userRole);

  const fetchCourseDetails = async () => {
    try {
      const url = userType == "business" ? "/course" : "/enrol-course";
      setLoading(true);
      const courseResponse = await axiosInstance.get(`${url}/${courseId}`);
      if (courseResponse.status) {
        const resData = courseResponse.data.data;
        setCourse(userType == "business" ? resData : resData.course);
      } else {
        console.log("Encountered an error", courseResponse);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userType) {
      fetchCourseDetails();
    }
  }, [courseId, userType]);
  return (
    <div>
      <Spin
        spinning={loading}
        indicator={
          <LoadingOutlined className="flex items-center justify-center text-6xl" />
        }
        className="min-h-[400px]"
      >
        <LecturePlayer
          course={course}
          fetchCourseDetails={fetchCourseDetails}
        />
      </Spin>
    </div>
  );
};

export default CourseVideoPage;
