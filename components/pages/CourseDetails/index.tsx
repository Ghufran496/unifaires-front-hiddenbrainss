"use client";

import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Steps, Button, Skeleton } from "antd";
import Reviews from "./Reviews";
import Container from "@/components/shared/container";
import { useParams } from "next/navigation";
import axios from "axios";
import config from "@/app/utils/config";
import { CourseInt } from "@/app/utils/interface";
import CourseDetails from "./CourseDetatils";
import { useSession } from "next-auth/react";
import axiosInstance from "@/app/utils/axios-config";
import { getUserType } from "@/app/utils/globalStates";
import Image from "next/image";
import contactImage from "@/public/images/contactUsClock.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { cartCourses, fetchSingleCourse } from "@/redux/features/CoursesSlice";

const CourseDetailPage = () => {
  const { data: session } = useSession();
  const { Title } = Typography;
  const [category, setCategory] = useState<any>();
  const [courseProps, setCourseProps] = useState(null);
  const params = useParams();
  const [userType, setUserType] = useState();
  const courseSlug = params.slug;
  const [courseLoading, setCourseLoading] = useState(true);
  const dispatch: any = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSingleCourse(courseSlug)).then((res: any) => {
      // console.log("here is the res", res);
      if (res.type === "course/fetchSingleCourse/fulfilled") {
        setCourseLoading(false);
      }
    });
    // fetchCourseDetails();
  }, [courseSlug]);

  const course = useAppSelector((state: any) => state.course.course);

  useEffect(() => {
    const propsString: any = params?.props;
    if (propsString) {
      const parsedProps = JSON.parse(decodeURIComponent(propsString));
      // setCourse(parsedProps);
      setCourseProps(parsedProps);
    }
  }, [params?.props]);

  useEffect(() => {
    getUserType().then((res: any) => {
      setUserType(res);
    });
  }, [courseSlug, course.id]);

  // console.log(course);

  return (
    <div>
      <section className="pt-2">
        <Row
          gutter={[16, 16]}
          className="py-3 px-10 rounded-md bg-white border-b-2 border-[#F6F6F6]"
        >
          {course &&
            course.category &&
            course.category.ancestors.map((eachCategory: any) => {
              return (
                <Col key={eachCategory.id} xl={6}>
                  <Title level={5}>{eachCategory.name} </Title>
                </Col>
              );
            })}
          <Col xl={6}>
            <Title level={5}>{course?.category?.name} </Title>
          </Col>
        </Row>
      </section>

      <Skeleton active loading={courseLoading} className="m-4 min-h-[400px]">
        <Container className="mt-4">
          <CourseDetails
            userType={userType}
            course={course}
            courseProps={courseProps}
          />
        </Container>

        <Container className="mt-4">
          <div className="flex flex-col justify-center items-center bg-[#5932da2a] py-10 px-4 rounded-sm ">
            <Typography.Paragraph className="text-base">
              Are you{" "}
              <span className="text-[#5832DA] font-bold">Qualified</span> for an
              education voucher? You need professional development
              opportunities?
            </Typography.Paragraph>
            <Typography.Paragraph className="text-[#5832DA] font-bold">
              Well, follow this steps below:
            </Typography.Paragraph>
            <div className="w-full px-6">
              <div className="flex lg:flex-row md:flex-col flex-col gap-4 justify-center ">
                {/* First Step */}
                <div className="flex flex-col items-center">
                  <div className="flex lg:flex-row md:flex-col flex-col gap-2 justify-center items-center ">
                    <Typography.Paragraph className="text-center bg-[#5832DA] text-white font-bold p-2 rounded-[100%] w-[37px] m-0">
                      1
                    </Typography.Paragraph>
                    <Typography.Paragraph className="m-0 font-semibold text-base">
                      Free Consulatation
                    </Typography.Paragraph>
                    <hr className="border-[1px] border-[#5932da73] w-16 m-0" />
                  </div>
                  <Typography.Paragraph className="w-[170px] text-center">
                    Get to know Unifaires and our educational offer without
                    obligation.
                  </Typography.Paragraph>
                </div>
                {/* Second Step */}
                <div className="flex flex-col items-center">
                  <div className="flex lg:flex-row md:flex-col flex-col gap-2 justify-center items-center ">
                    <Typography.Paragraph className="text-center bg-[#5832DA] text-white font-bold p-2 rounded-[100%] w-[37px] m-0">
                      2
                    </Typography.Paragraph>
                    <Typography.Paragraph className="m-0 font-semibold text-base">
                      Skill Assessment
                    </Typography.Paragraph>
                    <hr className="border-[1px] border-[#5932da73] w-16 m-0" />
                  </div>
                  <Typography.Paragraph className="w-[170px] text-center">
                    We determine you individual needs and recommend which
                    training courses are best suited.
                  </Typography.Paragraph>
                </div>
                {/* Third Step */}
                <div className="flex flex-col items-center">
                  <div className="flex lg:flex-row md:flex-col flex-col gap-2 justify-center items-center ">
                    <Typography.Paragraph className="text-center bg-[#5832DA] text-white font-bold p-2 rounded-[100%] w-[37px] m-0">
                      3
                    </Typography.Paragraph>
                    <Typography.Paragraph className="m-0 font-semibold text-base">
                      Education Voucher
                    </Typography.Paragraph>
                    <hr className="border-[1px] border-[#5932da73] w-16 m-0" />
                  </div>
                  <Typography.Paragraph className="w-[170px] text-center">
                    You apply for an education voucher at the responsible
                    employment agency or job center.
                  </Typography.Paragraph>
                </div>
                {/* Last Step */}
                <div className="flex flex-col items-center">
                  <div className="flex lg:flex-row md:flex-col flex-col gap-2 justify-center items-center ">
                    <Typography.Paragraph className="text-center bg-[#5832DA] text-white font-bold p-2 rounded-[100%] w-[37px] m-0">
                      4
                    </Typography.Paragraph>
                    <Typography.Paragraph className="m-0 font-semibold text-base">
                      Start of the Course
                    </Typography.Paragraph>
                  </div>
                  <Typography.Paragraph className="w-[170px] text-center">
                    Now you can start your online training and acquire essential
                    IT skills.
                  </Typography.Paragraph>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Container className="my-4">
          <div className="flex gap-4 lg:flex-row flex-col relative bg-[#5932da2a] py-14 px-8 rounded-sm ">
            <div className="flex flex-col lg:justify-start justify-center">
              <Typography.Title level={2}>
                Book you personal{" "}
                <span className="text-[#5832DA]">consultation</span> now.
              </Typography.Title>
              <Typography.Paragraph className="text-base">
                Find the best online training for you in just 15 minutes.
              </Typography.Paragraph>
              <Button
                href="/contact"
                type="primary"
                size="large"
                className="rounded-[4px]"
              >
                Book a free consulation
              </Button>
            </div>
            <div className="lg:absolute flex justify-center -top-20 right-0">
              <Image src={contactImage} alt="image" width={500} height={500} />
            </div>
          </div>
        </Container>

        {course && (
          <Container>
            <Reviews course={course} />
          </Container>
        )}
      </Skeleton>
    </div>
  );
};

export default CourseDetailPage;
