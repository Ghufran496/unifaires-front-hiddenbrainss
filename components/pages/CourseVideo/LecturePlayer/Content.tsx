"use client";
import React from "react";
// next
import NextLink from "next/link";
// antd component
import {
  Typography,
  Tag,
  Grid,
  Collapse,
  List,
  Dropdown,
  Button,
  Progress,
} from "antd";
// app component
import Container from "@/components/shared/container";
import LectureList from "./LectureList";
import {
  BookOutlined,
  DownOutlined,
  FileOutlined,
  PlayCircleFilled,
  QuestionCircleFilled,
  QuestionOutlined,
} from "@ant-design/icons";
import { CourseInt } from "@/app/utils/interface";
import { MenuProps } from "antd/lib";

interface IProp {
  course: CourseInt;
  setLectureType: any;
  setSelectedLecture: any;
  setCurrentLectureIndex: any;
}

const Content = ({
  course,
  setLectureType,
  setSelectedLecture,
  setCurrentLectureIndex,
}: IProp) => {
  const screens = Grid.useBreakpoint();

  const numberOfLectures =
    course?.sections &&
    course.sections.map((section) => {
      return section.lectures.length;
    });

  const totalLectures = numberOfLectures?.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0
  );

  const skillType = typeof course?.skills;
  const Skills =
    course && skillType === "string"
      ? JSON.parse(course.skills)
      : course?.skills;
  const CourseDescription = ({ content }: any) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

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
    <div className="p-4">
      <div>
        <Typography.Title level={3}>Lecture Content</Typography.Title>
        <Typography.Paragraph className="leading-6">
          <CourseDescription content={course?.aboutOrganization} />
        </Typography.Paragraph>
        <div>
          {screens.xs && (
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
                    course?.sections.map((eachSection, index) => {
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
                              <Typography.Text
                                type="secondary"
                                className="ml-auto"
                              >
                                {eachSection.lectures.length} lectures
                              </Typography.Text>
                            </div>
                          }
                        >
                          {allOrderedLectures &&
                            allOrderedLectures.map(
                              (item: any, index: number) => {
                                const progress =
                                  item &&
                                  ((item.lectureContentProgress &&
                                    item.lectureContentProgress[0]?.progress) ||
                                    (item.lectureArticleProgress &&
                                      item.lectureArticleProgress[0]
                                        ?.progress) ||
                                    0);
                                // const media = JSON.parse(item.mediaUri);
                                const lectureResources = item.lectureresources;
                                const media = item.mediaUri;
                                // const videoDuration = media.duration;

                                const allResources: MenuProps["items"] =
                                  lectureResources.map((resource: any) => {
                                    return {
                                      label: (
                                        <a
                                          href={resource.mediaUri}
                                          target="_blank"
                                        >
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
                                            <Dropdown
                                              menu={{ items: allResources }}
                                            >
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
                              }
                            )}
                          {eachSection?.quizzes &&
                            eachSection?.quizzes.map(
                              (eachQuiz: any, index: number) => (
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
                              )
                            )}
                        </Collapse.Panel>
                      );
                    })}
                </Collapse>
              </div>
            </div>
          )}
        </div>
        <div className="mb-8">
          <Typography.Title level={4}>Skills to Acquire</Typography.Title>
          <Typography.Text>Skills this program needs</Typography.Text>
          <div className="mt-4 max-w-md flex gap-2 flex-wrap">
            {Skills &&
              Skills.map((eachSkill: any, index: any) => (
                <Tag
                  key={index}
                  className="px-4 py-2 rounded-full text-sm"
                  color="#5832DA"
                >
                  <NextLink href="#">{eachSkill.name}</NextLink>
                </Tag>
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
        <div className="mb-8">
          <Typography.Title level={4} className="">
            What will you learn:
          </Typography.Title>
          <Typography.Paragraph>
            {course?.scope ? (
              <CourseDescription content={course?.scope} />
            ) : (
              "No learning objectives specified."
            )}
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  );
};

export default Content;
