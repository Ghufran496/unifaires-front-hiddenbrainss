"use client";
import React, { Fragment, useEffect, useState } from "react";
// ant components
import {
  Grid,
  Menu,
  Button,
  Layout,
  Drawer,
  Progress,
  MenuProps,
  Typography,
  Radio,
  Modal,
  Rate,
  Form,
  Input,
  message,
} from "antd";
import {
  StarOutlined,
  DownOutlined,
  TrophyOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
// app components
// import VideoPlayer from "./VideoPlayer";
import LectureList from "./LectureList";
import LectureDetails from "./LectureDetails";
import Container from "@/components/shared/container";
import VideoPlayer from "@/components/shared/VideoPlayer";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import axiosInstance from "@/app/utils/axios-config";
import {
  handleAxiosError,
  showError,
  showSuccess,
} from "@/app/utils/axiosError";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCourseProgress } from "@/redux/features/CoursesSlice";
import { fetchCountryStates } from "@/redux/features/CountrySlice";
import CourseCertificate from "../CourseCertificate";
import { fetchAllAddress } from "@/redux/features/AddressSlice";
import { useSession } from "next-auth/react";

const LecturePlayer = ({ course, fetchCourseDetails }: any) => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const screens = Grid.useBreakpoint();
  const [form] = Form.useForm();
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [selectedLecture, setSelectedLecture] = useState<any>();
  const [lectureType, setLectureType] = useState("lecture");
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<any>();
  const [completedQuiz, setCompletedQuiz] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [review, setReview] = useState(false);
  const [rating, setRating] = useState(false);
  const meta = course && JSON.parse(course.meta);
  const router = useRouter();

  const dispatch: any = useAppDispatch();
  const [certificateInfo, setCertificateInfo] = useState<any>();
  const [getCertificate, setGetCertificate] = useState(false);
  const [templateType, setTemplateType] = useState<any>();
  const courseVideo =
    course && course.video ? course.video : meta && meta.video;
  const courseImage =
    course && course.image ? course.image : meta && meta.image;
  const courseProgress =
    (course &&
      course.courseProgress &&
      course.courseProgress.length > 0 &&
      course.courseProgress[0].progress) ||
    0;

  const { question, options } =
    lectureType === "quiz" && selectedLecture.quizquestions[activeQuestion]
      ? selectedLecture.quizquestions[activeQuestion]
      : { question: null, options: [] };

  const videoUrl =
    lectureType === "lecture" &&
    selectedLecture?.mediaUri &&
    selectedLecture.mediaUri;
  // JSON.parse(selectedLecture.mediaUri);

  const mediaUri = selectedLecture?.mediaUri
    ? videoUrl
    : // videoUrl.mediaUri
      null;

  const FormatedText = ({ content }: any) => {
    return (
      <div className="prose mx-auto w-full max-w-none p-4">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  };

  const articleText = lectureType === "article" && selectedLecture?.article;

  const handleRating = async (value: any) => {
    setRatingValue(value);
  };

  const handleSubmitReview = async () => {
    const formData = form.getFieldsValue();
    setLoading(true);
    await axiosInstance
      .post("/courses-reviews", {
        courseId: course.id,
        rating: ratingValue,
        ...formData,
      })
      .then((res) => {
        toast.success("Review and Rating submitted successfully");
        setRating(false);
        form.resetFields();
      })
      .catch((error) => {
        handleAxiosError(error);

        console.log("Here is the error", error);
      });
    setLoading(false);
  };

  const openRatingModal = (id: any) => {
    setRating(true);
  };

  const closeRating = () => {
    setRating(false);
    setReview(false);
  };

  const handleCertificate = () => {
    if (courseProgress == 100) {
      setGetCertificate(true);
    } else {
      showError("Complete the Course");
    }
  };

  const fetchCertificate = async () => {
    try {
      const res = await axiosInstance.get(
        `/course-certificate/course/${course.id}`
      );
      if (res.status) {
        const resData = res.data.data;
        setCertificateInfo(resData);
        setTemplateType(resData.certificateType);
        // console.log("here is certificate res", res);
      }
    } catch (error) {
      // handleAxiosError(error);
      console.log("unable to fetch templates", error);
    }
  };

  useEffect(() => {
    fetchCertificate();
    dispatch(fetchAllAddress(userId));
  }, [course]);

  const items: MenuProps["items"] = [
    {
      label: "Your Progress",
      key: "progress",
      icon: (
        <Progress
          type="circle"
          showInfo
          percent={courseProgress}
          success={{ strokeColor: "green" }}
          strokeWidth={12}
          size={40}
        />
      ),
      expandIcon: <DownOutlined />,
      // children: [{ label: "Introduction", key: "lecture-1" }],
    },
    {
      label: "Leave a rating",
      key: "rating",
      icon: <StarOutlined />,
      onClick: openRatingModal,
    },
    {
      label: "Get Certificate",
      key: "certificate",
      icon: <TrophyOutlined />,
      children: [
        {
          label: "Certificate",
          key: "certificate-1",
          onClick: handleCertificate,
        },
      ],
    },
  ];

  const handleOptionChange = (option: any) => {
    setSelectedOption(option);
  };

  const markQuizCompleted = async () => {
    // Check if it is quizId or id
    const quizId = selectedLecture?.quizId;
    try {
      const sendProgress = await axiosInstance.post("/course-progress", {
        quizId: quizId,
      });

      if (sendProgress.status) {
        toast.success("Quiz Completed");
        dispatch(fetchCourseProgress(course?.id));
        console.log("here is response from the progess", sendProgress);
      }
    } catch (error) {
      console.log("Error saving progress", error);
    }
  };

  const markArticleCompleted = async () => {
    // Check if it is quizId or id
    const articleId = selectedLecture?.id;
    try {
      const sendProgress = await axiosInstance.post("/course-progress", {
        lectureArticleId: articleId,
        progress: 100,
      });

      if (sendProgress.status) {
        // showSuccess("Article Completed");
        fetchCourseDetails();
        console.log("here is response from the progess", sendProgress);
      }
    } catch (error) {
      // handleAxiosError(error);
      console.log("Error saving progress", error);
    }
  };

  // Quiz Next Button
  const onClickNext = () => {
    if (
      selectedLecture.quizquestions.length > 1 &&
      activeQuestion !== selectedLecture.quizquestions.length - 1
    ) {
      setActiveQuestion((prev) => prev + 1);
      setSelectedOption(false);
    } else {
      setCompletedQuiz(true);
      markQuizCompleted();
    }
  };

  // Quiz Previous Button
  const handlePrevious = () => {
    setActiveQuestion((prev) => prev - 1);
    setCompletedQuiz(false);
  };

  //
  const closeLectureMenu = () => setMenuCollapsed(true);
  const toggleLectureMenu = () => setMenuCollapsed(!menuCollapsed);

  const handleNextLecture = () => {
    if (selectedLecture) {
      // Check if there are more lectures
      const lectures = course.sections.flatMap(
        (section: any) => section.lectures
      );

      if (lectureType == "article") {
        markArticleCompleted();
      }

      // Combining  all content types into a single array with type metadata
      const lectureContents = [
        ...lectures.flatMap((content: any) =>
          content.lecturecontents.map((item: any) => ({
            ...item,
            type: "lecture",
          }))
        ),
        ...lectures.flatMap((content: any) =>
          content.lecturearticles.map((item: any) => ({
            ...item,
            type: "article",
          }))
        ),
      ];

      const currentIndex = lectureContents.findIndex(
        (lecture: any) => lecture.id === selectedLecture.id
      );
      setCurrentLectureIndex(currentIndex + 1);

      if (currentLectureIndex < lectureContents.length - 1) {
        // Get the next lecture
        const nextLecture = lectureContents[currentLectureIndex + 1];
        setSelectedLecture(nextLecture);
        setLectureType(nextLecture.type); // Set the lecture type based on the actual content type
      } else {
        // If there are no more lectures, you can handle the end of the course here
        showSuccess("End of Section. Take Section Quiz");
      }
    } else if (selectedLecture && lectureType === "quiz") {
      const allQuiz = course.sections.flatMap(
        (section: any) => section.quizzes
      );

      const currentIndex = allQuiz.findIndex(
        (quiz: any) => quiz.id === selectedLecture.id
      );
      setCurrentLectureIndex(currentIndex + 1);

      if (currentLectureIndex < allQuiz.length - 1) {
        // Get the next quiz
        const nextQuiz = allQuiz[currentLectureIndex + 1];
        setSelectedLecture(nextQuiz);
        setLectureType("quiz");
      } else {
        // If there are no more quizzes, you can handle the end of the course here
        showSuccess("End of Quiz");
        console.log("End of course");
      }
    }
  };

  const handlePreviousLecture = () => {
    if (selectedLecture) {
      // Combine all content types into a single array with type metadata
      const lectures = course.sections.flatMap(
        (section: any) => section.lectures
      );

      const allLectures = [
        ...lectures.flatMap((content: any) =>
          content.lecturecontents.map((item: any) => ({
            ...item,
            type: "lecture",
          }))
        ),
        ...lectures.flatMap((content: any) =>
          content.lecturearticles.map((item: any) => ({
            ...item,
            type: "article",
          }))
        ),
      ];

      const lectureContents = allLectures.sort(
        (a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      const currentIndex = lectureContents.findIndex(
        (lecture: any) => lecture.id === selectedLecture.id
      );

      if (currentIndex > 0) {
        // Get the previous lecture
        const previousLecture = lectureContents[currentIndex - 1];
        setSelectedLecture(previousLecture);
        setCurrentLectureIndex(currentIndex - 1);
        setLectureType(previousLecture.type); // Set the lecture type based on the actual content type
      } else {
        showError("At the Start of the Course");
        // If there are no more previous lectures, handle the beginning of the course here
        console.log("Beginning of course");
      }
    } else if (selectedLecture && lectureType === "quiz") {
      const allQuiz = course.sections.flatMap(
        (section: any) => section.quizzes
      );

      const currentIndex =
        allQuiz &&
        allQuiz.findIndex((quiz: any) => quiz.id === selectedLecture.id);

      if (currentIndex > 0) {
        // Get the previous quiz
        const previousQuiz = allQuiz[currentIndex - 1];
        setCurrentLectureIndex(currentIndex - 1);
        setSelectedLecture(previousQuiz);
        setLectureType("quiz");
      } else {
        // If there are no more quizzes, you can handle the beginning of the course here
        console.log("Beginning of course");
      }
    }
  };

  const markLectureCompleted = async () => {
    // const lectureId = selectedLecture.lectureId;
    try {
      const sendProgress = await axiosInstance.post("/course-progress", {
        // lectureId: lectureId,
        lectureContentId: selectedLecture.id,
        progress: 100,
      });

      if (sendProgress.status) {
        // showSuccess("Lecture Completed");
        fetchCourseDetails();
        handleNextLecture();
      }
    } catch (error) {
      // handleAxiosError(error);
      console.log("Error saving progress", error);
    }
  };

  useEffect(() => {
    if (courseProgress && courseProgress == 100) {
      showSuccess("Course Completed");
      showSuccess("");
    }
  }, [courseProgress]);
  // console.log("here i sthe course", course);

  return (
    <Fragment>
      {screens.xs && (
        <Drawer
          closable={false}
          placement="right"
          open={!menuCollapsed}
          onClose={closeLectureMenu}
          width={320}
        >
          <LectureList
            setSelectedLecture={setSelectedLecture}
            setLectureType={setLectureType}
            course={course}
            closeSider={closeLectureMenu}
            setCurrentLectureIndex={setCurrentLectureIndex}
          />
        </Drawer>
      )}
      <section className="bg-white border-b p-2">
        <Container fluid className="px-6">
          <div className="flex justify-between items-center flex-col lg:flex-row">
            <Typography.Title level={5} className="mb-0 py-3">
              {course?.title}
            </Typography.Title>
            <Menu mode="horizontal" items={items} className="border-none" />
          </div>
        </Container>
      </section>
      <Layout>
        <Layout.Content className="h-auto">
          {!selectedLecture ? (
            <section className="bg-grey-900 relative">
              <Container fluid>
                {!screens.xs && (
                  <Button
                    size="large"
                    type="primary"
                    className="absolute top-4 right-0 grid place-items-center rounded-none bg-black bg-opacity-75 z-50"
                    onClick={toggleLectureMenu}
                    icon={
                      menuCollapsed ? (
                        <MenuFoldOutlined />
                      ) : (
                        <MenuUnfoldOutlined />
                      )
                    }
                  />
                )}

                {course && courseVideo ? (
                  <VideoPlayer
                    videoUrl={courseVideo}
                    handleNextLecture={handleNextLecture}
                    markLectureCompleted={markLectureCompleted}
                  />
                ) : (
                  <div>
                    <Image
                      src={courseImage}
                      width={100}
                      height={100}
                      alt="Promotional Image"
                    />
                  </div>
                )}

                {/* <VideoPlayer /> */}
              </Container>
            </section>
          ) : lectureType === "quiz" && question ? (
            <section className="relative">
              {!screens.xs && (
                <Button
                  size="large"
                  type="primary"
                  className="absolute top-4 right-0 grid place-items-center rounded-none bg-black bg-opacity-75 z-50"
                  onClick={toggleLectureMenu}
                  icon={
                    menuCollapsed ? (
                      <MenuFoldOutlined />
                    ) : (
                      <MenuUnfoldOutlined />
                    )
                  }
                />
              )}
              {selectedLecture && !completedQuiz ? (
                <div className="lg:p-10 md:p-10 p-6">
                  {selectedOption && !selectedOption.correct && (
                    <Typography.Paragraph>
                      <span className="text-red-700 font-bold text-base">
                        Wrong answer
                      </span>
                      . {selectedOption.why}
                    </Typography.Paragraph>
                  )}
                  {selectedOption && selectedOption.correct && (
                    <Typography.Paragraph>
                      <span className="text-green-700 font-bold text-base">
                        Correct
                      </span>
                      . {selectedOption.why}
                    </Typography.Paragraph>
                  )}

                  <Typography.Paragraph className="capitalize text-lg font-semibold">
                    <span className="font-bold">{activeQuestion + 1}.</span>{" "}
                    {question}
                  </Typography.Paragraph>
                  <Radio.Group>
                    {options &&
                      JSON.parse(options).map((option: any, index: number) => {
                        return (
                          <div key={index} className="pl-4">
                            <Radio
                              value={option.answer}
                              onChange={() => handleOptionChange(option)}
                            >
                              {option.answer}
                            </Radio>
                          </div>
                        );
                      })}
                  </Radio.Group>
                  {/* {selectedLecture && selectedLecture.length > 1 && ( */}
                  <div className="flex justify-between mt-6">
                    {activeQuestion !== 0 && (
                      <Button
                        type="default"
                        size="large"
                        className="flex rounded-sm items-center"
                        onClick={handlePrevious}
                      >
                        <ArrowLeftOutlined />
                        Previous
                      </Button>
                    )}
                    <Button
                      type="primary"
                      size="large"
                      className="flex ml-auto rounded-sm items-center"
                      onClick={onClickNext}
                    >
                      Next
                      <ArrowRightOutlined />
                    </Button>
                  </div>
                  {/* )} */}
                </div>
              ) : (
                <div className="py-[6em] px-2">
                  <div className="flex flex-col items-center justify-center">
                    <CheckCircleOutlined className="text-[4em] text-green-400 " />
                    <Typography.Title level={3} className="italic ">
                      You&apos;ve Completed the Quiz
                    </Typography.Title>
                    <Button
                      type="default"
                      size="large"
                      className="flex rounded-sm items-center"
                      onClick={handlePrevious}
                    >
                      <ArrowLeftOutlined />
                      Go Back
                    </Button>
                  </div>
                </div>
              )}
            </section>
          ) : lectureType === "quiz" && !question ? (
            <section className="flex justify-center items-center h-[300px]">
              <Typography.Title level={3} className="">
                No Quiz Questions
              </Typography.Title>
            </section>
          ) : lectureType === "lecture" ? (
            <section className=" relative ">
              <Container fluid>
                {!screens.xs && (
                  <Button
                    size="large"
                    type="primary"
                    className="absolute top-4 right-0 grid place-items-center rounded-none bg-black bg-opacity-75 z-50"
                    onClick={toggleLectureMenu}
                    icon={
                      menuCollapsed ? (
                        <MenuFoldOutlined />
                      ) : (
                        <MenuUnfoldOutlined />
                      )
                    }
                  />
                )}
                <div className="relative">
                  {mediaUri ? (
                    <VideoPlayer
                      videoUrl={mediaUri}
                      handleNextLecture={handleNextLecture}
                      markLectureCompleted={markLectureCompleted}
                    />
                  ) : (
                    <div className="flex justify-center items-center h-[300px]">
                      <Typography.Title level={3} className="">
                        No Lecture Content
                      </Typography.Title>
                    </div>
                  )}
                </div>
              </Container>
            </section>
          ) : (
            lectureType === "article" && (
              <section className=" relative h-[600px] overflow-y-scroll custom-scrollbar  ">
                <Container fluid>
                  {!screens.xs && (
                    <Button
                      size="large"
                      type="primary"
                      className="absolute top-4 right-0 grid place-items-center rounded-none bg-black bg-opacity-75 z-50"
                      onClick={toggleLectureMenu}
                      icon={
                        menuCollapsed ? (
                          <MenuFoldOutlined />
                        ) : (
                          <MenuUnfoldOutlined />
                        )
                      }
                    />
                  )}

                  <FormatedText content={articleText} />
                </Container>
              </section>
            )
          )}
          <div className="flex justify-between p-2 bg-blue-100">
            {currentLectureIndex !== 0 && (
              <Button
                type="text"
                className="flex items-center"
                onClick={handlePreviousLecture}
              >
                <ArrowLeftOutlined />
                Previous
              </Button>
            )}
            <Button
              type="text"
              className="flex items-center ml-auto"
              onClick={handleNextLecture}
            >
              Next
              <ArrowRightOutlined />
            </Button>
          </div>
          <section className="bg-white">
            <Container fluid className="px-0">
              <LectureDetails
                setLectureType={setLectureType}
                setSelectedLecture={setSelectedLecture}
                course={course}
                setCurrentLectureIndex={setCurrentLectureIndex}
              />
            </Container>
          </section>
        </Layout.Content>
        {(screens.md || screens.lg || screens.xxl || screens.xl) && (
          <Layout.Sider
            theme="light"
            width={360}
            breakpoint="lg"
            collapsed={menuCollapsed}
            collapsedWidth="0"
            className="overflow-x-hidden overflow-y-auto bg-white border-l"
          >
            <LectureList
              setSelectedLecture={setSelectedLecture}
              setLectureType={setLectureType}
              course={course}
              closeSider={closeLectureMenu}
              setCurrentLectureIndex={setCurrentLectureIndex}
            />
          </Layout.Sider>
        )}
      </Layout>
      <Modal
        open={rating}
        onCancel={closeRating}
        onOk={closeRating}
        footer={null}
      >
        <div className="mt-6">
          <Typography.Paragraph className="text-lg font-bold">
            What do you think about this course?
          </Typography.Paragraph>
          <div className="flex gap-2 items-center mb-2 ">
            <Typography.Paragraph className="m-0">
              Leave a Rating:
            </Typography.Paragraph>
            <Rate
              className="text-[20px] "
              value={ratingValue}
              onChange={(e) => handleRating(e)}
              style={{
                color: "#F59E0B",
              }}
            />
          </div>
          <Form
            form={form}
            layout="vertical"
            className="contact-form respondForm__form row y-gap-30 pt-30"
          >
            <Form.Item
              label="Review Content"
              name="review"
              className="tw-mt-0"
              required
              style={{ fontWeight: 600 }}
            >
              <Input.TextArea
                rows={4}
                placeholder="Message"
                className="font-normal"
              />
            </Form.Item>
            <div>
              <Button
                name="submit"
                type="primary"
                size="large"
                id="submit"
                className="flex ml-auto"
                onClick={handleSubmitReview}
                loading={loading}
              >
                Submit Review
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
      <CourseCertificate
        course={course}
        certificateInfo={certificateInfo}
        templateType={templateType}
        previewCertificate={getCertificate}
        setPreviewCertificate={setGetCertificate}
      />
    </Fragment>
  );
};

export default LecturePlayer;
