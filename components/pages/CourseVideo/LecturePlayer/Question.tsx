"use client";
import {
  ArrowLeftOutlined,
  LikeOutlined,
  MessageOutlined,
  PlusOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import {
  Avatar,
  Button,
  Form,
  Input,
  List,
  Skeleton,
  Space,
  Spin,
  Typography,
} from "antd";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const QuestionAndAnswers = ({ course }: any) => {
  const router = useRouter();
  const params = useParams();
  // const courseId = params.courseId;
  const courseId = course && course.id;
  const [form] = Form.useForm();
  const [answerForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [fetchingQuestions, setFetchingQuestions] = useState(false);
  const [courseQuestions, setCourseQuestions] = useState<any>();
  const [questionClick, setQuestionClick] = useState(false);
  const [viewReplies, setViewReplies] = useState<any>(null);

  const fetchAllQuestions = async () => {
    try {
      setFetchingQuestions(true);
      await axiosInstance
        .get(`/course-qa/${courseId}`)
        .then((res) => {
          const resData = res.data.data;
          setCourseQuestions(res.data.data);
          if (viewReplies) {
            const updateQuestion = resData.find(
              (question: any) => question.id === viewReplies.id
            );
            setViewReplies(updateQuestion);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
    } finally {
      setFetchingQuestions(false);
    }
  };

  const handleAskQuestion = async () => {
    setLoading(true);
    const formData = form.getFieldsValue();
    await axiosInstance
      .post("/course-qa", {
        courseId: courseId,
        ...formData,
      })
      .then((res) => {
        showSuccess("Question Submitted");
        fetchAllQuestions();
        form.resetFields();
      })
      .catch((error) => {
        handleAxiosError(error);
        console.log(error);
      });
    setLoading(false);
  };

  const handleAnswerQuestion = async (id: any) => {
    setAnswerLoading(true);
    const formData = answerForm.getFieldsValue();
    try {
      const res = await axiosInstance.post("/course-qa/answer", {
        ...formData,
        questionId: id,
      });

      if (res.status) {
        showSuccess("Reply sent successfully");
        fetchAllQuestions();
        answerForm.resetFields();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      // setViewReplies(updateQuestion)
      setAnswerLoading(false);
    }
  };

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const handleUpvotes = async (id: any) => {
    try {
      await axiosInstance.put(`/course-qa/upvote/${id}`).then((res) => {
        fetchAllQuestions();
        toast.success("Upvote Submitted");
      });
    } catch (error) {
      handleAxiosError(error);
      console.log(error);
    }
  };

  const QuestionFormat = ({ content }: any) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  const handleViewReplies = async (question: any) => {
    setViewReplies(question);
    setQuestionClick(!questionClick);
  };

  return (
    <div className="p-4">
      {!questionClick ? (
        <div>
          <Form layout="vertical" size="large" form={form}>
            <Form.Item name="title">
              <Input placeholder="Question Title" className="rounded-sm" />
            </Form.Item>
            <Form.Item name="body" className="h-[150px]">
              <ReactQuill
                theme="snow"
                className="font-normal h-[100px]"
                placeholder="Ask your Question..."
              />
            </Form.Item>
            <div>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                size="large"
                className="flex ml-auto items-center "
                loading={loading}
                onClick={handleAskQuestion}
              >
                Ask
              </Button>
            </div>
          </Form>
          <Spin spinning={fetchingQuestions} size="large">
            <div>
              <Typography.Paragraph className="text-lg font-semibold">
                All Question in this Course (
                {courseQuestions && courseQuestions.length})
              </Typography.Paragraph>
              <div className="max-h-[500px] overflow-y-scroll custom-scrollbar p-2">
                <List
                  className="w-full"
                  dataSource={courseQuestions}
                  renderItem={(question: any) => {
                    return (
                      <List.Item
                        className="hover:bg-gray-50 p-6 rounded-lg"
                        actions={[
                          <Space
                            key="list-vertical-like-o"
                            className="m-0 text-gray-500 hover:cursor-pointer hover:text-blue-600"
                            onClick={() => handleUpvotes(question.id)}
                          >
                            <LikeOutlined />
                            {question?.upvotes}
                          </Space>,
                          <Space
                            key="list-vertical-like-o"
                            className="m-0 text-gray-500  hover:cursor-pointer hover:text-blue-600"
                            onClick={() => {
                              handleViewReplies(question);
                            }}
                          >
                            <MessageOutlined />
                            {question.answers.length}
                          </Space>,
                        ]}
                      >
                        <div className="flex gap-4 w-full">
                          <div>
                            <Avatar size={"large"} icon={<UserOutlined />} />
                          </div>
                          <div className="w-full">
                            <Typography.Paragraph className="text-base font-bold">
                              {question.user.firstname} {question.user.lastname}
                            </Typography.Paragraph>
                            <Typography.Paragraph
                              className=" font-semibold hover:cursor-pointer m-0"
                              onClick={() => {
                                handleViewReplies(question);
                              }}
                            >
                              {question?.title}
                            </Typography.Paragraph>
                            <Typography.Paragraph className="m-0">
                              <QuestionFormat content={question?.body} />
                            </Typography.Paragraph>
                          </div>
                        </div>
                      </List.Item>
                    );
                  }}
                />
              </div>
            </div>
          </Spin>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <Typography.Paragraph
              className="flex gap-4 items-center m-0 hover:cursor-pointer"
              onClick={() => {
                setQuestionClick(!questionClick);
                setViewReplies(null);
              }}
            >
              <ArrowLeftOutlined className="text-lg hover:text-blue-500" />
              Back to all Questions
            </Typography.Paragraph>
          </div>
          <div className="flex gap-4 w-full">
            <div>
              <Avatar size={"large"} icon={<UserOutlined />} />
            </div>
            <div className="w-full">
              <Typography.Paragraph className="text-base font-bold">
                {viewReplies.user.firstname} {viewReplies.user.lastname}
              </Typography.Paragraph>
              <Typography.Paragraph className="m-0 font-semibold">
                {viewReplies?.title}
              </Typography.Paragraph>
              <Typography.Paragraph className="m-0">
                <QuestionFormat content={viewReplies?.body} />
              </Typography.Paragraph>
            </div>
            <div className=" flex justify-center items-center">
              <Space
                key="list-vertical-like-o"
                className="m-0 text-gray-500 hover:cursor-pointer hover:text-blue-600"
                onClick={() => handleUpvotes(viewReplies.id)}
              >
                <LikeOutlined className="text-lg" />
                {viewReplies?.upvotes}
              </Space>
            </div>
          </div>
          <div>
            <Typography.Paragraph className="font-bold text-base">
              {viewReplies.answers.length} Replies
            </Typography.Paragraph>
          </div>
          <div className="ml-10 mb-6 max-h-[500px] overflow-y-scroll custom-scrollbar p-2">
            <List
              className="w-full"
              dataSource={viewReplies.answers}
              renderItem={(answer: any) => {
                console.log(answer);
                return (
                  <List.Item
                    className="hover:bg-gray-50 p-6 rounded-lg"
                    actions={[
                      <Space
                        key="list-vertical-like-o"
                        className="m-0 text-gray-500 hover:cursor-pointer hover:text-blue-600"
                        // onClick={() => handleUpvotes(answer.id)}
                      >
                        <LikeOutlined />
                        {answer?.upvotes}
                      </Space>,
                    ]}
                  >
                    <div className="flex gap-4 w-full">
                      <div>
                        <Avatar size={"large"} icon={<UserOutlined />} />
                      </div>
                      <div className="w-full">
                        <Typography.Paragraph>
                          <QuestionFormat content={answer?.body} />
                        </Typography.Paragraph>
                      </div>
                    </div>
                  </List.Item>
                );
              }}
            />
          </div>
          <Form layout="vertical" form={answerForm}>
            <Form.Item name="body" className="h-[150px]">
              <ReactQuill
                theme="snow"
                className="font-normal h-[100px]"
                placeholder="Ask your Question..."
              />
            </Form.Item>
            <div>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                size="large"
                className="flex ml-auto items-center rounded-[4px]"
                loading={answerLoading}
                onClick={() => handleAnswerQuestion(viewReplies.id)}
              >
                Add an answer
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default QuestionAndAnswers;
