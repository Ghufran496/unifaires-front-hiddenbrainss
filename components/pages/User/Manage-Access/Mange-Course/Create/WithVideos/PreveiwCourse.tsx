"use client";
import React, { Fragment, useState, useEffect } from "react";
import NextLink from "next/link";
import {
  Col,
  Row,
  Rate,
  Avatar,
  Typography,
  Button,
  Card,
  Collapse,
  List,
  Tag,
  Divider,
} from "antd";
import {
  GlobalOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
  CalendarOutlined,
  MobileOutlined,
  SafetyCertificateOutlined,
  TranslationOutlined,
  VideoCameraOutlined,
  BookOutlined,
  PlayCircleFilled,
  QuestionCircleFilled,
  QuestionOutlined,
  BankOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Container from "@/components/shared/container";
import { CourseInt } from "@/app/utils/interface";
import VideoJs from "@/components/shared/video/VideoJs";
import Link from "next/link";

interface PropsInt {
  course: CourseInt | undefined;
  closePreview: any;
}

const PreviewCourse = ({ course, closePreview }: PropsInt) => {
  const [videoDuration, setVideoDuration] = useState<any>(null);
  const videoUrl = getJSONParse(course?.meta)?.video;
  const Skills = getJSONParse(course?.skills);
  let amount: any = course?.pricing?.amount;
  amount = !Number.isNaN(parseFloat(amount)) ? parseFloat(amount) : 0;
  let discount: any = course?.pricing?.discount;
  discount = !Number.isNaN(parseFloat(discount)) ? parseFloat(discount) : 0;
  const salesPrice =
    amount && discount ? amount - amount * (discount / 100) : 0.0;

  const numberOfLectures =
    course?.sections &&
    course.sections.map((section) => {
      return section.lectures.length;
    });

  /**
   * Get JSON parse output
   */
  function getJSONParse(inputStr: any) {
    try {
      return JSON.parse(inputStr);
    } catch (error) {
      return undefined;
    }
  }

  const totalLectures = numberOfLectures?.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0
  );

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: `${videoUrl ? videoUrl : "//vjs.zencdn.net/v/oceans.mp4"}`,
        type: "video/mp4",
      },
    ],
  };
  const CourseDescription = ({ content }: any) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  useEffect(() => {
    if (videoUrl) {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.addEventListener("loadedmetadata", () => {
        const duration = video.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        setVideoDuration(`${minutes}:${seconds}`);
      });
    }
  }, [videoUrl]);

  return (
    <Fragment>
      <section className="content-hero border-b mb-6">
        <Container fluid className="px-6 pb-6 bg-blue-100">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16} xxl={18}>
              <Typography.Title level={2} className="mt-4">
                {course?.title}
              </Typography.Title>
              <Typography.Paragraph className="mb-6 max-w-xl text-base opacity-90">
                <CourseDescription content={course?.description} />
              </Typography.Paragraph>
              <Divider />
              <div className="flex gap-3 flex-wrap items-center mb-4">
                <Typography.Text className="flex items-center gap-1 flex-nowrap">
                  <ClockCircleOutlined className="" /> Bookmark
                </Typography.Text>
                <Typography.Text className="flex items-center gap-1 flex-nowrap">
                  <UsergroupAddOutlined type="secondary" /> {0} Enrolled
                </Typography.Text>
                <Typography.Text className="flex items-center gap-1 flex-nowrap">
                  <GlobalOutlined type="secondary" /> {course?.level}
                </Typography.Text>
                <div className="flex items-start gap-1 flex-nowrap">
                  <Rate disabled defaultValue={0} className="[&>li]:mr-1" />
                  <Typography.Text type="warning" className="pt-1">
                    {0}
                  </Typography.Text>
                  <Typography.Text className="pt-1">
                    ( 344 Reviews )
                  </Typography.Text>
                </div>
              </div>
              <div className="flex justify-start items-center gap-3">
                <BankOutlined className="text-xl text-blue-600 font-bold" />
                {/* <NextLink href="/business/users/" passHref> */}
                <Typography.Link className="text-base block text-grey-800 opacity-80">
                  {course?.organizationName}
                </Typography.Link>
                {/* </NextLink> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="content-body">
        <Container fluid className="px-6">
          {/* Course Detail Content */}
          <Row gutter={[16, 16]}>
            <Col
              xs={{ span: 24, order: 2 }}
              lg={{ span: 16, order: 1 }}
              xxl={{ span: 18, order: 1 }}
            >
              <div className="mb-8">
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
                              <Collapse ghost expandIconPosition="right">
                                {eachSection?.lectures &&
                                  eachSection?.lectures.map(
                                    (eachLecture: any) => (
                                      <Collapse.Panel
                                        key={eachLecture.id}
                                        header={
                                          <Typography.Paragraph className="mb-0 ">
                                            <BookOutlined /> {eachLecture.title}
                                          </Typography.Paragraph>
                                        }
                                      >
                                        <Typography.Paragraph className="m-0">
                                          {eachLecture.description}
                                        </Typography.Paragraph>
                                        <div>
                                          <List
                                            dataSource={
                                              eachLecture.lecturecontents
                                            }
                                            renderItem={(item: any, index) => (
                                              <List.Item className="px-2">
                                                <Typography.Link className="flex items-center gap-4 w-full">
                                                  {item.mediaUri && (
                                                    <PlayCircleFilled className="text-gray-400" />
                                                  )}
                                                  <Typography.Text className="font-bold flex-grow">
                                                    {item.title}
                                                  </Typography.Text>
                                                  <Typography.Text className="ml-auto block">
                                                    {videoDuration
                                                      ? videoDuration
                                                      : "Loading..."}
                                                  </Typography.Text>
                                                </Typography.Link>
                                                {/* </NextLink> */}
                                              </List.Item>
                                            )}
                                          />
                                        </div>
                                      </Collapse.Panel>
                                    )
                                  )}
                              </Collapse>
                              <Collapse ghost expandIconPosition="right">
                                {eachSection?.quizzes &&
                                  eachSection?.quizzes.map((eachQuiz: any) => (
                                    <Collapse.Panel
                                      key={eachQuiz.id}
                                      header={
                                        <Typography.Paragraph className="mb-0 ">
                                          <QuestionCircleFilled />{" "}
                                          {eachQuiz.title}
                                        </Typography.Paragraph>
                                      }
                                    >
                                      <List
                                        dataSource={eachQuiz.quizquestions}
                                        renderItem={(item: any, index) => (
                                          <List.Item className="px-2">
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
                    <Typography.Title level={4}>
                      Skills to Acquire
                    </Typography.Title>
                    <Typography.Text>Skills this program needs</Typography.Text>
                    <div className="mt-4 max-w-md flex gap-2 flex-wrap">
                      {Skills &&
                        Skills.map((eachSkill: any, index: any) => (
                          <Tag
                            key={index}
                            className="px-4 py-2 rounded-full text-sm"
                            color="#5832DA"
                          >
                            <NextLink href="#">{eachSkill}</NextLink>
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
                {/* Intructor */}
                <div className="mb-8">
                  <Typography.Title level={4} className="">
                    About the instructor:
                  </Typography.Title>
                  {course?.instructors &&
                    course?.instructors.length > 0 &&
                    course?.instructors.map((instructor, index) => (
                      <Row key={index} gutter={[16, 16]}>
                        <Col lg={8}>
                          <div className="mb-4">
                            <Avatar
                              size={70}
                              src={instructor.image || <UserOutlined />}
                            />
                          </div>
                          {/* <div className="mb-6">
                           <Typography.Paragraph className="flex items-center gap-2 flex-nowrap mb-1">
                             <StarOutlined /> 4.87 Instructor rating
                           </Typography.Paragraph>
                           <Typography.Paragraph className="flex items-center gap-2 flex-nowrap mb-1">
                             <CommentOutlined /> 1,533 reviews
                           </Typography.Paragraph>
                           <Typography.Paragraph className="flex items-center gap-2 flex-nowrap mb-1">
                             <UsergroupAddOutlined /> 23,912 students
                           </Typography.Paragraph>
                           <Typography.Paragraph className="flex items-center gap-2 flex-nowrap mb-1">
                             <PlayCircleOutlined /> 29 courses
                           </Typography.Paragraph>
                         </div> */}
                        </Col>
                        <Col lg={16}>
                          <Typography.Title level={4} className="mb-1">
                            {instructor.name}
                          </Typography.Title>
                          {/* <Typography.Title
                            level={5}
                            type="secondary"
                            className="mt-0"
                          >
                            Head of Data Science, Pierian Data Inc.
                          </Typography.Title> */}
                          <Typography.Paragraph className="leading-6">
                            {instructor.bio}
                          </Typography.Paragraph>
                        </Col>
                        <Divider />
                      </Row>
                    ))}
                </div>

                <div className="mb-8">
                  <Typography.Title level={4}>
                    About Organisation
                  </Typography.Title>
                  <Typography.Paragraph className="leading-6">
                    {course?.aboutOrganization}
                  </Typography.Paragraph>
                </div>
              </div>
            </Col>
            {/* Card */}
            <Col
              xs={{ span: 24, order: 1 }}
              lg={{ span: 8, order: 2 }}
              xxl={{ span: 6, order: 2 }}
            >
              <div>
                <Card className="lg:-mt-64 shadow-sm sticky mb-6 top-0">
                  <VideoJs options={videoJsOptions} />
                  <div className="mt-6">
                    <Typography.Title level={2} className="mb-0">
                      ${salesPrice.toFixed(2)}
                      {course?.pricing?.amount == 0.0 && (
                        <Typography.Text type="secondary">Free</Typography.Text>
                      )}
                      <Typography.Text type="secondary" delete>
                        ${course?.pricing?.amount}
                      </Typography.Text>
                    </Typography.Title>
                  </div>
                  <div className="flex flex-col gap-4 mt-6">
                    <Link href="#" passHref>
                      <Button block type="primary" size="large">
                        Buy Now
                      </Button>
                    </Link>
                    {/* <Button block type="default" size="large">
          Start free month
        </Button> */}
                  </div>
                  <div className="mt-6">
                    <Typography.Title level={4}>
                      This course includes:
                    </Typography.Title>
                    <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
                      <VideoCameraOutlined /> Hours on-demand video
                    </Typography.Paragraph>
                    {/* <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
                      <FileTextOutlined /> 77 articles
                    </Typography.Paragraph>
                    <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
                      <DownloadOutlined /> 85 downloadable resources
                    </Typography.Paragraph> */}
                    <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
                      <ClockCircleOutlined className="" /> Full time access
                    </Typography.Paragraph>
                    <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
                      <MobileOutlined /> Access on mobile and Tablet
                    </Typography.Paragraph>
                    <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
                      <SafetyCertificateOutlined /> Certificate of Completion
                    </Typography.Paragraph>

                    <Typography.Title level={5}>Meta Data:</Typography.Title>
                    <Typography.Paragraph className="capitalize flex items-center gap-2 flex-nowrap">
                      <GlobalOutlined /> Language - {course?.lang}
                    </Typography.Paragraph>
                    <Typography.Paragraph className="capitalize flex items-center gap-2 flex-nowrap">
                      <TranslationOutlined /> Subtitles -{" "}
                      {course?.subtitleLanguage || "No Subtitle"}
                    </Typography.Paragraph>
                    <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
                      <CalendarOutlined /> Last Updated - 09/06/2022
                    </Typography.Paragraph>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div>
        <Button
          type="primary"
          size="large"
          className="flex ml-auto"
          onClick={closePreview}
        >
          Close Preview
        </Button>
      </div>
    </Fragment>
  );
};

export default PreviewCourse;
