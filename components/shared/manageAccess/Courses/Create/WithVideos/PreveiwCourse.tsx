"use client";
import React, { Fragment, useState, useEffect } from "react";
// next
import NextLink from "next/link";
// antd and Icon components
import {
  Col,
  Row,
  Rate,
  Avatar,
  Typography,
  Breadcrumb,
  Button,
  Card,
  Collapse,
  List,
  Tag,
  Divider,
  Modal,
} from "antd";
import {
  GlobalOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
  CalendarOutlined,
  DownloadOutlined,
  FileTextOutlined,
  MobileOutlined,
  SafetyCertificateOutlined,
  TranslationOutlined,
  VideoCameraOutlined,
  BookOutlined,
  PlayCircleFilled,
  QuestionCircleFilled,
  QuestionOutlined,
  PlayCircleOutlined,
  CommentOutlined,
  StarOutlined,
  BankOutlined,
  UserOutlined,
  HeartOutlined,
} from "@ant-design/icons";
// app components
import Container from "@/components/shared/container";
import { CourseInt } from "@/app/utils/interface";
import VideoJs from "@/components/shared/video/VideoJs";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getCookie } from "cookies-next";

interface PropsInt {
  course: CourseInt | undefined;
  closePreview: any;
}

const PreviewCourse = ({ course, closePreview }: any) => {
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const userCountry = info && info.data.country;
  const locationCurrency = info && info.data.currency;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;
  const [videoDuration, setVideoDuration] = useState<any>(null);
  const courseImage =
    course && course.image ? course.image : JSON.parse(course.meta).image;
  const videoUrl =
    course && course.video ? course.video : JSON.parse(course.meta).video;
  const skillType = typeof course?.skills;
  const Skills =
    course && skillType === "string"
      ? JSON.parse(course?.skills)
      : course?.skills;
  const currencyRate = useAppSelector(
    (state: RootState) => state.currency.currencyRate
  );
  const amount = course?.pricing?.amount;
  const discount = course?.pricing?.discount;
  const salesPrice =
    amount && discount ? amount - amount * (discount / 100) : 0.0;
  const convertedPrice = currencyRate && salesPrice * currencyRate;

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: `${convertedPrice ? currency : "USD"}`,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const numberOfLectures =
    course?.sections &&
    course.sections.map((section: any) => {
      return section.lectures.length;
    });

  // console.log("Here is the course", course);

  const totalLectures = numberOfLectures?.reduce(
    (accumulator: any, currentValue: any) => {
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

  const formattedDate = new Date(course?.updatedAt);

  return (
    <Fragment>
      <section className="content-hero border-b mb-6">
        <Container fluid className="px-6 pb-6 bg-blue-100">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16} xxl={18}>
              <Typography.Title level={1} className="mt-4">
                {course?.title}
              </Typography.Title>
              <Typography.Paragraph className="mb-6  text-lg opacity-90">
                <CourseDescription content={course?.description} />
              </Typography.Paragraph>
              <div className="flex gap-3 flex-wrap items-center mb-4">
                <Typography.Text className="flex items-center gap-1 flex-nowrap">
                  <UsergroupAddOutlined type="secondary" />{" "}
                  {course?.students || 0} Enrolled
                </Typography.Text>
                <Typography.Text className="flex items-center gap-1 flex-nowrap capitalize">
                  <GlobalOutlined type="secondary" /> {course?.level}
                </Typography.Text>
                <div className="flex items-center gap-1 flex-nowrap">
                  <Rate
                    disabled
                    value={course?.averageRating || 0}
                    className="[&>li]:mr-1"
                  />
                  {/* <Typography.Text type="warning" className="pt-1">
                    {course?.ratings || courseProps?.rating || 0}
                  </Typography.Text> */}
                  {course && (
                    <Typography.Text className="pt-1">
                      ( {course?.coursesreviews.length || 0} Reviews )
                    </Typography.Text>
                  )}
                </div>
              </div>
              <div className="flex justify-start items-center gap-3">
                <BankOutlined className="text-xl text-blue-600 font-bold" />
                <Typography.Link className="text-base block text-grey-800 opacity-80">
                  {course?.organizationName}
                </Typography.Link>
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
                {course && (
                  <div>
                    <Typography.Title level={4}>
                      Course Overview
                    </Typography.Title>
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
                            course?.sections.map((eachSection: any) => (
                              <Collapse.Panel
                                key={`${eachSection.id}`}
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
                                <Collapse ghost expandIconPosition="right">
                                  {eachSection?.lectures &&
                                    eachSection?.lectures.map(
                                      (eachLecture: any) => {
                                        const lectureContents =
                                          eachLecture.lecturecontents;
                                        const videoDuration: any =
                                          lectureContents.map((item: any) => {
                                            const media = item.mediaUri;
                                            const duration = media.duration;
                                            return duration;
                                          });
                                        return (
                                          <Collapse.Panel
                                            key={eachLecture.id}
                                            header={
                                              <Typography.Paragraph className="mb-0 ">
                                                {videoDuration ? (
                                                  <PlayCircleFilled className="text-gray-400" />
                                                ) : (
                                                  <BookOutlined />
                                                )}{" "}
                                                {eachLecture.title}
                                              </Typography.Paragraph>
                                            }
                                            extra={
                                              <Typography.Text className="ml-auto block">
                                                {videoDuration
                                                  ? formatVideoDuration(
                                                      videoDuration
                                                    )
                                                  : "Loading..."}
                                              </Typography.Text>
                                            }
                                          >
                                            <Typography.Paragraph
                                              ellipsis={{ rows: 3 }}
                                              className="italic pl-4 text-gray-400 m-0"
                                            >
                                              {eachLecture.description}
                                            </Typography.Paragraph>
                                          </Collapse.Panel>
                                        );
                                      }
                                    )}
                                </Collapse>
                                {eachSection?.quizzes &&
                                  eachSection?.quizzes.map((eachQuiz: any) => (
                                    <div
                                      key={eachQuiz.id}
                                      className="pl-4 py-1 pb-4"
                                    >
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
                      <Typography.Title level={4}>
                        Skills to Acquire
                      </Typography.Title>
                      <Typography.Text>
                        Skills this program needs
                      </Typography.Text>
                      <div className="mt-4 max-w-md flex gap-2 flex-wrap">
                        {Skills &&
                          Skills.map((eachSkill: any, index: any) => (
                            <Button
                              key={index}
                              type="primary"
                              shape="round"
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
                    {course?.scope ? (
                      <CourseDescription content={course?.scope} />
                    ) : (
                      "No learning objectives specified."
                    )}
                  </Typography.Paragraph>
                </div>
                {course && (
                  <div className="mb-8">
                    <Typography.Title level={4} className="">
                      About the instructor:
                    </Typography.Title>
                    {course?.instructors &&
                      course?.instructors.length > 0 &&
                      course?.instructors.map(
                        (instructor: any, index: number) => (
                          <Row key={index} gutter={[16, 16]}>
                            <Col lg={8}>
                              <div className="mb-4">
                                <Avatar
                                  size={70}
                                  src={instructor.image || <UserOutlined />}
                                />
                              </div>
                            </Col>
                            <Col lg={16}>
                              <Typography.Title level={4} className="mb-1">
                                {instructor.name}
                              </Typography.Title>

                              <Typography.Paragraph className="leading-6">
                                {instructor.bio}
                              </Typography.Paragraph>
                            </Col>
                            <Divider />
                          </Row>
                        )
                      )}
                  </div>
                )}
                <div className="mb-8">
                  <Typography.Title level={4}>
                    About Organisation
                  </Typography.Title>
                  <Typography.Paragraph className="leading-6">
                    <CourseDescription content={course?.aboutOrganization} />
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
                  <div>
                    {videoUrl ? (
                      <VideoJs options={videoJsOptions} />
                    ) : (
                      <div className="flex justify-center items-center">
                        {course && course.image && (
                          <Image
                            src={courseImage}
                            alt="courseImage"
                            width={230}
                            height={230}
                            objectPosition="center"
                          />
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="mt-6">
                      {course?.pricing?.type == "paid" ? (
                        <Typography.Title level={2} className="mb-0">
                          {formatCurrency(salesPrice)}
                          <Typography.Text type="secondary" delete>
                            {formatCurrency(amount)}
                          </Typography.Text>
                        </Typography.Title>
                      ) : (
                        <Typography.Title level={2} className="mb-0">
                          Free
                        </Typography.Title>
                      )}
                    </div>
                    {course && (
                      <div className="flex flex-col gap-4 mt-6">
                        <div className="flex flex-row justify-between gap-4 ">
                          <Button
                            block
                            type="primary"
                            size="large"
                            className="flex justify-center items-center bg-inherit text-black h-[50px] border-purple-500 border-2 hover:bg-purple-500 hover:text-white hover:border-none"
                          >
                            Add to Cart
                          </Button>

                          <HeartOutlined className="text-2xl cursor-pointer hover:text-red-800 hover:font-extrabold" />
                        </div>

                        <Button
                          // block
                          type="primary"
                          size="large"
                          className="flex justify-center items-center h-[50px]"
                        >
                          Buy Now
                        </Button>
                      </div>
                    )}
                  </div>

                  <div></div>
                  <div className="mt-6">
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
                    <Typography.Paragraph className="flex items-center gap-2 flex-nowrap capitalize">
                      <GlobalOutlined /> Language - {course?.lang}
                    </Typography.Paragraph>
                    <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
                      <TranslationOutlined /> Subtitles -{" "}
                      {course?.subtitleLanguage || "No subtitle"}
                    </Typography.Paragraph>
                    <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
                      <CalendarOutlined /> Last Updated -{" "}
                      {formattedDate.toLocaleDateString()}
                    </Typography.Paragraph>
                  </div>
                  <div className="mt-4">
                    <Typography.Paragraph className="italic text-base font-semibold ">
                      Scholarship Availability:{" "}
                      {course?.isScholarship ? "Yes" : "No"}
                    </Typography.Paragraph>
                    {course && course?.isScholarship && (
                      <Button
                        block
                        type="primary"
                        size="large"
                        className="flex bg-transparent border-2 border-purple-600 text-black hover:bg-purple-600 hover:text-white font-semibold text-base justify-center items-center h-[50px]"
                      >
                        Click to Apply
                      </Button>
                    )}
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
