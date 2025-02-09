"use client";
import { Button, Carousel, Col, Grid, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import Container from "../container";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCourses } from "@/redux/features/CoursesSlice";
import CourseCard from "@/components/pages/Courses/CourseCard";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import { fetchUserRole } from "@/redux/features/UserSlice";
import HomeCourseCard from "@/components/pages/Home/HomeCourseCard";

const CardCarousel = ({ skillGaps }: any) => {
  const [courses, setCourses] = useState<any>([]);
  const dispatch: any = useAppDispatch();
  const screens = Grid.useBreakpoint();

  const fetchRecommendedCourses = async () => {
    const skillsID = skillGaps && skillGaps.map((skill: any) => skill.id);
    if (skillGaps.length > 0) {
      try {
        const res = await axiosInstance.post("/course/skills-courses", {
          skills: skillsID,
        });

        if (res.status) {
          // console.log(res);
          const resData = res.data.data;
          setCourses(resData.courses);
        }
      } catch (error) {
        dispatch(fetchCourses());

        // console.log("error from here", error);

        return null;
        // handleAxiosError(error);
      }
    } else {
      dispatch(fetchCourses());
    }
  };

  useEffect(() => {
    fetchRecommendedCourses();
  }, [skillGaps]);

  const course = useAppSelector((state: any) => state.course.courses);

  return (
    <div className="p-4 bg-[#F8F9FA]">
      <section className="lg:px-20 px-5 py-4 ">
        <div className="flex justify-between">
          <Typography.Title level={3}>Recommended Courses</Typography.Title>
          <Button
            href="/courses"
            type="text"
            className="text-blue-600 font-bold "
          >
            See More
          </Button>
        </div>
        {screens.xs ? (
          <Carousel autoplay arrows>
            {courses !== undefined && courses.length > 0
              ? courses.slice(0, 4).map((eachCourse: any) => {
                  return (
                    <div
                      key={`course-item-${eachCourse.id}`}
                      className="lg:w-fit md:w-fit w-full"
                    >
                      <HomeCourseCard {...eachCourse} />
                    </div>
                  );
                })
              : course.slice(0, 4).map((eachCourse: any) => {
                  return (
                    <div
                      key={`course-item-${eachCourse.id}`}
                      className="lg:w-fit md:w-fit w-full"
                    >
                      <HomeCourseCard {...eachCourse} />
                    </div>
                  );
                })}
          </Carousel>
        ) : (
          <Container>
            <div className="flex justify-center items-center flex-wrap w-full gap-2">
              {courses !== undefined && courses.length > 0
                ? courses.slice(0, 4).map((eachCourse: any) => {
                    return (
                      <div
                        key={`course-item-${eachCourse.id}`}
                        className="lg:w-fit md:w-fit w-full"
                      >
                        <HomeCourseCard {...eachCourse} />
                      </div>
                    );
                  })
                : course.slice(0, 4).map((eachCourse: any) => {
                    return (
                      <div
                        key={`course-item-${eachCourse.id}`}
                        className="lg:w-fit md:w-fit w-full"
                      >
                        <HomeCourseCard {...eachCourse} />
                      </div>
                    );
                  })}
            </div>
          </Container>
        )}
      </section>
    </div>
  );
};
export default CardCarousel;
