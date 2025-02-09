"use client";
import React, { useEffect, useState } from "react";
// next
import { useRouter } from "next/navigation";
// antd component
import {
  List,
  Button,
  Divider,
  Collapse,
  Typography,
  Checkbox,
  Dropdown,
  Progress,
} from "antd";
import {
  BookOutlined,
  CloseOutlined,
  DownOutlined,
  FileOutlined,
  PlayCircleFilled,
  QuestionCircleFilled,
} from "@ant-design/icons";
import { CourseInt } from "@/app/utils/interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCourseProgress } from "@/redux/features/CoursesSlice";
import { MenuProps } from "antd/lib";
import { Label } from "recharts";
import Link from "next/link";

interface LectureListProps {
  closeSider: () => void;
  course: CourseInt;
  setSelectedLecture: any;
  setLectureType: any;
  setCurrentLectureIndex: any;
}

const LectureList = ({
  closeSider,
  course,
  setSelectedLecture,
  setLectureType,
  setCurrentLectureIndex,
}: LectureListProps) => {
  const router = useRouter();
  const dispatch: any = useAppDispatch();

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

  const handleLectureClick = (content: any, type: string) => {
    setSelectedLecture(content);
    setLectureType(type);
  };

  return (
    <div className="">
      <div className="border-b py-1 px-6 flex justify-between items-center">
        <Typography.Title level={4} className="mb-0">
          Content
        </Typography.Title>
        <Button
          type="text"
          size="large"
          onClick={closeSider}
          className="grid place-items-center"
        >
          <CloseOutlined />
        </Button>
      </div>
      <div className="">
        <Collapse
          accordion
          bordered={false}
          defaultActiveKey={["0"]}
          expandIconPosition="start"
        >
          {course?.sections && course?.sections.length > 0 ? (
            course?.sections.map((eachSection, index: number) => {
              const lectures = course.sections[index].lectures;
              const lectureContents = [
                ...lectures.flatMap((content: any) =>
                  content.lecturecontents.map((item: any) => ({
                    ...item,
                    lectureresources: content.lectureresources,
                    lectureTitle: content.title,
                    type: "lecture",
                  }))
                ),
                ...lectures.flatMap((content: any) =>
                  content.lecturearticles.map((item: any) => ({
                    ...item,
                    lectureresources: content.lectureresources,
                    lectureTitle: content.title,
                    type: "article",
                  }))
                ),
              ];
              const allOrderedLectures = lectureContents.sort(
                (a: any, b: any) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
              );

              return (
                <Collapse.Panel
                  key={`${eachSection.id}`}
                  header={
                    <div className="">
                      <Typography.Paragraph className="mb-0 font-medium">
                        {eachSection.title}
                      </Typography.Paragraph>

                      <div className="flex flex-row gap-3">
                        <Typography.Text type="secondary">
                          {eachSection.lectures.length} lectures
                        </Typography.Text>
                        {/* <Typography.Text type="secondary">40:00</Typography.Text> */}
                      </div>
                    </div>
                  }
                  className={`[&>div.ant-collapse-content>div.ant-collapse-content-box]:p-0 
                [&>div.ant-collapse-content>div.ant-collapse-content-box:first-child]:border-t 
                bg-white`}
                >
                  {allOrderedLectures &&
                    allOrderedLectures.map((item: any, index: number) => {
                      const progress =
                        item &&
                        ((item.lectureContentProgress &&
                          item.lectureContentProgress[0]?.progress) ||
                          (item.lectureArticleProgress &&
                            item.lectureArticleProgress[0]?.progress) ||
                          0);
                      // const media = JSON.parse(item.mediaUri);
                      const lectureResources = item.lectureresources;
                      const media = item.mediaUri;
                      // const videoDuration = media.duration;

                      const allResources: MenuProps["items"] =
                        lectureResources.map((resource: any) => {
                          return {
                            label: (
                              <a href={resource.mediaUri} target="_blank">
                                {resource.title}
                              </a>
                            ),
                            key: `${resource.id}`,
                          };
                        });
                      return (
                        <div className="px-2 pl-4 py-1" key={index}>
                          <div className="flex gap-2 items-center">
                            <Progress
                              type="circle"
                              trailColor="#e6f4ff"
                              percent={progress}
                              strokeWidth={20}
                              size={18}
                              // format={(number) => `lectureProgress${number}%`}
                            />
                            <Typography.Link
                              onClick={() => {
                                handleLectureClick(item, item.type);
                                setCurrentLectureIndex(index);
                              }}
                              className="flex items-center gap-4 w-full"
                            >
                              {item.type == "lecture" ? (
                                <PlayCircleFilled className="text-gray-400" />
                              ) : (
                                <BookOutlined />
                              )}
                              <Typography.Text className="font-medium flex-grow hover:underline">
                                {item.lectureTitle}
                              </Typography.Text>
                              {/* <Typography.Text className="ml-auto block">
                                  {videoDuration
                                    ? formatVideoDuration(videoDuration)
                                    : "Loading..."}
                                </Typography.Text> */}
                            </Typography.Link>
                            <div className=" ">
                              {lectureResources.length > 0 && (
                                <div>
                                  <Dropdown menu={{ items: allResources }}>
                                    <Button
                                      icon={<FileOutlined />}
                                      size="small"
                                      className="flex ml-auto rounded-[2px] items-center"
                                    >
                                      Resources
                                      <DownOutlined />
                                    </Button>
                                  </Dropdown>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {eachSection?.quizzes &&
                    eachSection?.quizzes.map((eachQuiz: any, index: number) => (
                      <div key={eachQuiz.id} className="pl-4 py-1">
                        <Typography.Link
                          onClick={() => {
                            handleLectureClick(eachQuiz, "quiz");
                            setCurrentLectureIndex(index);
                          }}
                          className="flex items-center gap-4 w-full"
                        >
                          <QuestionCircleFilled />
                          <Typography.Text className="font-medium flex-grow hover:underline">
                            {eachQuiz.title}
                          </Typography.Text>
                        </Typography.Link>
                      </div>
                    ))}
                </Collapse.Panel>
              );
            })
          ) : (
            <div className="flex justify-center items-center mt-10 bg-white">
              <Typography.Title level={4}>
                Loading Course Content
              </Typography.Title>
            </div>
          )}
        </Collapse>
        <Divider />
      </div>
    </div>
  );
};

export default LectureList;
