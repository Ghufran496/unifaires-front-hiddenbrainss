"use client";
import React, { useEffect, useState } from "react";
// next
import { useSearchParams } from "next/navigation";
// antd and Icon components
import { Tag, List, Collapse, Typography, Button } from "antd";
import {
  BookOutlined,
  QuestionCircleFilled,
} from "@ant-design/icons";
// app components
import AuthorCard from "./AuthorCard";
import { CourseInt } from "@/app/utils/interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchUserSkills } from "@/redux/features/UserSlice";

interface PropsInt {
  course: CourseInt | undefined;
  courseProps: any;
}
const DetailsContent = ({ course, courseProps }: PropsInt) => {
  const dispatch: any = useAppDispatch();
  // const videoUrl = course ? JSON.parse(course.meta).video : null;
  const skillType = typeof course?.skills;
  const router = useSearchParams();

  useEffect(() => {
    dispatch(fetchUserSkills());
  }, [router]);
  const allMySkills = useAppSelector((state: any) => state.user.mySkills);
  const mySkills = allMySkills.map((skill: any) => {
    return skill.skill;
  });

  // console.log(mySkills);
  const hasSkill = (skillId: any) =>
    mySkills.some((skill: any) => skill.id === skillId);

  const Skills =
    course && skillType === "string"
      ? JSON.parse(course?.skills)
      : course?.skills;

  const CourseDescription = ({ content }: any) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  const numberOfLectures =
    course?.sections &&
    course.sections.map((section) => {
      return section.lectures.length;
    });

  // console.log("Here is the course", course);

  const totalLectures = numberOfLectures?.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0
  );
  const formatVideoDuration = (durationInSeconds: any) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    const formattedHours =
      hours > 0 ? `${hours.toString().padStart(2, "0")}:` : "";
    const formattedMinutes = `${minutes.toString().padStart(2, "0")}:`;
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
  };


  return (
    <div className="mb-8">
      {course && (
        <div>
          <Typography.Title level={4}>Course Overview</Typography.Title>
          <Typography.Paragraph className="leading-6">
            <CourseDescription content={course?.description} />
          </Typography.Paragraph>

          <div className="mb-8">
            <div className="flex lg:flex-row gap-4 items-center mb-6">
              <Typography.Title level={4} className="mb-0">
                Course curriculum
              </Typography.Title>
              <Typography.Text className="ml-auto">
                {totalLectures || 0} lectures{" "}
              </Typography.Text>
              {/* <Typography.Text>24:10:28</Typography.Text> */}
            </div>
            <div>
              <Collapse
                accordion
                defaultActiveKey={["0"]}
                expandIconPosition="start"
              >
                {course?.sections &&
                  course?.sections.map((eachSection, index) => (
                    <Collapse.Panel
                      key={`${index}`}
                      header={
                        <div className="">
                          <Typography.Paragraph className="mb-0 font-bold">
                            {eachSection.title}
                          </Typography.Paragraph>
                          {/* <Typography.Paragraph className="m-0 ">
                           {eachSection.objective}
                         </Typography.Paragraph> */}
                        </div>
                      }
                      className="[&>div.ant-collapse-content>div.ant-collapse-content-box]:p-0"
                      extra={
                        <div className="flex gap-3 items-center">
                          <Typography.Text type="secondary" className="ml-auto">
                            {eachSection.lectures.length} lectures
                          </Typography.Text>
                        </div>
                      }
                    >
                      <Collapse ghost expandIconPosition="right">
                        {eachSection?.lectures &&
                          eachSection?.lectures.map((eachLecture: any) => {
                            const lectureContents = eachLecture.lecturecontents;
                            // const videoDuration: any = lectureContents.map(
                            //   (item: any) => {
                            //     const media = JSON.parse(item.mediaUri);
                            //     const duration = media.duration;
                            //     return duration;
                            //   }
                            // );
                            return (
                              <Collapse.Panel
                                key={eachLecture.id}
                                header={
                                  <Typography.Paragraph className="flex gap-2 mb-0 ">
                                    {/* {videoDuration ? (
                                      <PlayCircleFilled className="text-gray-400" />
                                    ) : ( */}
                                    <BookOutlined />
                                    {/* )}{" "} */}
                                    {eachLecture.title}
                                  </Typography.Paragraph>
                                }
                                // extra={
                                //   <Typography.Text className="ml-auto block">
                                //     {videoDuration
                                //       ? formatVideoDuration(videoDuration)
                                //       : "Loading..."}
                                //   </Typography.Text>
                                // }
                              >
                                <Typography.Paragraph className="m-0">
                                  {eachLecture.description}
                                </Typography.Paragraph>
                              </Collapse.Panel>
                            );
                          })}
                      </Collapse>
                      {eachSection?.quizzes &&
                        eachSection?.quizzes.map((eachQuiz: any) => (
                          <div key={eachQuiz.id} className="pl-4 py-1 pb-4">
                            <Typography.Link className="flex items-center gap-1 w-full">
                              <QuestionCircleFilled />
                              <Typography.Text className="font-medium flex-grow hover:underline">
                                {eachQuiz.title}
                              </Typography.Text>
                            </Typography.Link>
                          </div>
                        ))}
                    </Collapse.Panel>
                  ))}
              </Collapse>
            </div>
          </div>

          <div className="mb-8">
            <Typography.Title level={4}>Skills to Acquire</Typography.Title>
            <Typography.Text>Skills this program needs</Typography.Text>
            <div className="mt-4 max-w-md flex gap-2 flex-wrap">
              {Skills &&
                Skills.map((eachSkill: any, index: any) => (
                  <Button
                    key={index}
                    type="primary"
                    shape="round"
                    className={`${
                      hasSkill(eachSkill.id)
                        ? null
                        : "text-purple-50 bg-[#E3E2F4]"
                    }`}
                    color="#5832DA"
                  >
                    {eachSkill.name}
                  </Button>
                ))}
            </div>
          </div>
          <div className="mb-8">
            <Typography.Title level={4} className="">
              Who is this course for:
            </Typography.Title>
            <Typography.Paragraph>
              <CourseDescription content={course?.target} />
            </Typography.Paragraph>
          </div>
          <div className="mb-8">
            <Typography.Title level={4} className="">
              Requirements:
            </Typography.Title>
            <Typography.Paragraph>
              <CourseDescription content={course?.requirement} />
            </Typography.Paragraph>
          </div>
        </div>
      )}
      <div className="mb-8">
        <Typography.Title level={4} className="">
          What will you learn:
        </Typography.Title>
        <Typography.Paragraph>
          {course?.scope || courseProps?.target ? (
            <CourseDescription content={course?.scope || courseProps?.target} />
          ) : (
            "No learning objectives specified."
          )}
        </Typography.Paragraph>
      </div>
      {course && (
        <div className="mb-8">
          <AuthorCard course={course} />
        </div>
      )}
      <div className="mb-8">
        <Typography.Title level={4}>About Organisation</Typography.Title>
        <Typography.Paragraph className="leading-6">
          <CourseDescription
            content={
              course?.aboutOrganization || courseProps?.aboutOrganization
            }
          />
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default DetailsContent;
