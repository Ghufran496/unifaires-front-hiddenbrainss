"use client";
import React from "react";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
// antd and Icon components
import { Tag, List, Collapse, Typography } from "antd";
import {
  AudioOutlined,
  BookOutlined,
  FilePdfOutlined,
  PlayCircleFilled,
  QuestionCircleFilled,
  QuestionOutlined,
} from "@ant-design/icons";
// app components
import AuthorCard from "./AuthorCard";
import { CourseInt } from "@/app/utils/interface";

interface PropsInt {
  course: CourseInt | undefined;
  courseProps: any;
}
const DetailsContent = ({ course, courseProps }: PropsInt) => {
  const router = useRouter();
  const { slug } = router.query;

  const CourseDescription = ({ content }: any) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
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
                186 lectures{" "}
              </Typography.Text>
              <Typography.Text>24:10:28</Typography.Text>
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
                        <Typography.Paragraph className="mb-0 font-medium">
                          {eachSection.title}
                        </Typography.Paragraph>
                      }
                      className="[&>div.ant-collapse-content>div.ant-collapse-content-box]:p-0"
                      extra={
                        <div className="flex gap-3 items-center">
                          <Typography.Text type="secondary" className="ml-auto">
                            {eachSection.lectures.length} lectures
                          </Typography.Text>
                          <Typography.Text type="secondary">
                            24:10
                          </Typography.Text>
                        </div>
                      }
                    >
                      <Collapse ghost expandIconPosition="right">
                        {eachSection?.lectures &&
                          eachSection?.lectures.map((eachLecture: any) => (
                            <Collapse.Panel
                              key={eachLecture.id}
                              header={
                                <Typography.Paragraph className="mb-0 ">
                                  <BookOutlined /> {eachLecture.title}
                                </Typography.Paragraph>
                              }
                            >
                              <List
                                dataSource={eachLecture.lecturecontents}
                                renderItem={(item: any, index) => (
                                  <List.Item className="px-2">
                                    {/* <NextLink
                                // href={`/admin/courses/${slug}/lecture/${index}`}
                                href={"#"}
                                passHref
                              > */}
                                    <Typography.Link className="flex items-center gap-4 w-full">
                                      {item.mediaUri && (
                                        <PlayCircleFilled className="text-gray-400" />
                                      )}
                                      {/* {item.type === "audio" && (
                                    <AudioOutlined className="text-gray-400" />
                                  )}
                                  {item.type === "pdf" && (
                                    <FilePdfOutlined className="text-gray-400" />
                                  )} */}
                                      <Typography.Text className="font-bold flex-grow">
                                        {item.title}
                                      </Typography.Text>
                                      <Typography.Text className="ml-auto block">
                                        7:50
                                      </Typography.Text>
                                    </Typography.Link>
                                    {/* </NextLink> */}
                                  </List.Item>
                                )}
                              />
                            </Collapse.Panel>
                          ))}
                      </Collapse>
                      <Collapse ghost expandIconPosition="right">
                        {eachSection?.quizzes &&
                          eachSection?.quizzes.map((eachQuiz: any) => (
                            <Collapse.Panel
                              key={eachQuiz.id}
                              header={
                                <Typography.Paragraph className="mb-0 ">
                                  <QuestionCircleFilled /> {eachQuiz.title}
                                </Typography.Paragraph>
                              }
                            >
                              <List
                                dataSource={eachQuiz.quizquestions}
                                renderItem={(item: any, index) => (
                                  <List.Item className="px-2">
                                    {/* <NextLink
                                // href={`/admin/courses/${slug}/lecture/${index}`}
                                href={"#"}
                                passHref
                              > */}
                                    <Typography.Link className="flex items-center gap-4 w-full">
                                      <QuestionOutlined />
                                      <Typography.Text className="font-bold flex-grow">
                                        {item.question}
                                      </Typography.Text>
                                    </Typography.Link>
                                    {/* </NextLink> */}
                                  </List.Item>
                                )}
                              />
                            </Collapse.Panel>
                          ))}
                      </Collapse>
                    </Collapse.Panel>
                  ))}
              </Collapse>
            </div>
          </div>

          <div className="mb-8">
            <Typography.Title level={4}>Skills to Acquire</Typography.Title>
            <Typography.Text>Skills this program needs</Typography.Text>
            {/* <div className="mt-4 max-w-md flex gap-2 flex-wrap">
              {course?.skills &&
                course?.skills.map((eachSkill, index) => (
                  <Tag
                    key={index}
                    className="px-4 py-2 rounded-full text-sm"
                    color="#5832DA"
                  >
                    <NextLink href="#">{eachSkill}</NextLink>
                  </Tag>
                ))}
            </div> */}
          </div>
          <div className="mb-8">
            <Typography.Title level={4} className="">
              Who is this course for:
            </Typography.Title>
            <Typography.Paragraph>{course?.target}</Typography.Paragraph>
            {/* <ul className="list-disc">
         <li className="ml-4 mb-2">
           Anyone who is interested in learning Javascript from Scratch
         </li>
         <li className="ml-4 mb-2">
           Anyone who is interested in learning Advanced Level Javascript
           concepts
         </li>
         <li className="ml-4 mb-2">
           Anyone who is interested in learning to make Advanced Level
           Applications in Javascript
         </li>
       </ul> */}
          </div>
          <div className="mb-8">
            <Typography.Title level={4} className="">
              Requirements:
            </Typography.Title>
            <Typography.Paragraph>{course?.requirement}</Typography.Paragraph>
            {/* <ul className="list-disc">
         <li className="ml-4 mb-2">
           Macintosh (OSX)/ Windows(Vista and higher) Machine
         </li>
         <li className="ml-4 mb-2">Internet connection</li>
       </ul> */}
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
          <AuthorCard />
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
