"use client";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import {
  CloseOutlined,
  DeleteOutlined,
  LikeOutlined,
  MessageOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  List,
  Space,
  Spin,
  Typography,
} from "antd";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const CourseAssignment = ({ userType, course }: any) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const params = useParams();
  const courseId = course && course.id;
  const [fetchingAssignment, setFetchingAssignemnt] = useState(false);
  const [courseAssignments, setCourseAssignments] = useState<any>();
  const [questions, setQuestions] = useState<Array<any>>([]);

  const [loading, setLoading] = useState(false);

  // Fetching All Assignement
  const fetchCourseAssignment = async () => {
    try {
      setFetchingAssignemnt(true);
      const res = await axiosInstance.get(`/assignment/course/${courseId}`);
      if (res.status) {
        const resData = res.data.data;
        setCourseAssignments(resData);
        // console.log("here is the assignment ", res);
      }
    } catch (error) {
      console.log("unable to fetch assignment ", error);
    } finally {
      setFetchingAssignemnt(false);
    }
  };

  useEffect(() => {
    fetchCourseAssignment();
  }, []);

  const handlePostAssignment = async () => {
    setLoading(true);
    const formData = form.getFieldsValue();
    await axiosInstance
      .post("/assignment", {
        courseId: courseId,
        questions: questions,
        ...formData,
      })
      .then((res) => {
        console.log(res);
        showSuccess("Submitted");
        fetchCourseAssignment();
        setQuestions([]);
        form.resetFields();
      })
      .catch((error) => {
        handleAxiosError(error);
        // console.log(error);
      });
    setLoading(false);
  };

  const handleDeleteOption = (optionIndex: number) => {
    const updateQuestions = [...questions];
    updateQuestions.splice(optionIndex, 1);
    setQuestions(updateQuestions);
  };

  const handleDeleteAssignment = async (id: any) => {
    try {
      setFetchingAssignemnt(true);
      const res = await axiosInstance.delete(`/assignment/${id}`);
      if (res.status) {
        showSuccess("Assignment Deleted");
        fetchCourseAssignment();
        form.resetFields();
      }
    } catch (error) {
      handleAxiosError(error);
      console.log("Unable to fetch course assignment", error);
    } finally {
      setFetchingAssignemnt(false);
    }
  };

  return (
    <div className="p-4">
      <div>
        {userType && userType !== "user" && (
          <Card className="mb-4">
            <Form layout="vertical" size="large" form={form}>
              <Form.Item name="title">
                <Input placeholder="Assignment title" className="rounded-sm" />
              </Form.Item>
              {/* <Form.Item name="estimatedDuration">
                <Input
                  type="number"
                  placeholder="Duration in Months"
                  className="rounded-sm"
                />
              </Form.Item> */}
              <Form.Item name="description" className="h-[150px]">
                <ReactQuill
                  theme="snow"
                  className="font-normal h-[100px]"
                  placeholder="Assignment Description or Instructions..."
                />
              </Form.Item>
            </Form>
            <div className="flex flex-row gap-2">
              <Typography.Title level={5}>
                Add Multiple Questions
              </Typography.Title>
              <div className="flex">
                <Button
                  type="primary"
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setQuestions([...questions, ""]);
                  }}
                  className="rounded-md flex items-center justify-center ml-auto"
                />
              </div>
            </div>
            <div className="p-2 mb-2 max-h-[500px] overflow-y-scroll custom-scrollbar w-full">
              <Form layout="vertical">
                {questions.length > 0 &&
                  questions.map((quest: any, index: any) => (
                    <Fragment key={index}>
                      <Form layout="vertical" className="">
                        <div className="w-full">
                          <Form.Item
                            label={`Question ${index + 1}`}
                            name="question"
                            rules={[
                              {
                                required: true,
                                message: "Please set a question",
                              },
                            ]}
                            className="m-0"
                          >
                            <Input.TextArea
                              rows={2}
                              className="rounded-sm"
                              placeholder="Add a Question"
                              value={quest}
                              onChange={(e) => {
                                const updateQuestions = [...questions];
                                updateQuestions[index] = e.target.value;
                                setQuestions(updateQuestions);
                              }}
                            />
                            <Button
                              danger
                              type="text"
                              size="large"
                              shape="circle"
                              icon={<DeleteOutlined />}
                              className="flex ml-auto justify-center items-center m-0"
                              onClick={() => handleDeleteOption(index)}
                            />
                          </Form.Item>
                        </div>
                      </Form>
                    </Fragment>
                  ))}
              </Form>
            </div>
            <div>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                size="large"
                className="flex ml-auto items-center "
                loading={loading}
                onClick={handlePostAssignment}
              >
                Post
              </Button>
            </div>
          </Card>
        )}
        <Spin spinning={fetchingAssignment} size="large">
          <div>
            <Typography.Paragraph className="text-lg font-semibold">
              All Assignments on this Course (
              {(courseAssignments && courseAssignments.length) || 0})
            </Typography.Paragraph>
            <div>
              <List
                className="w-full"
                dataSource={courseAssignments}
                renderItem={(question: any) => {
                  const parsedQuestions = JSON.parse(question.questions);
                  return (
                    <List.Item className="hover:bg-gray-50 p-6">
                      <div className="flex gap-4 w-full">
                        {/* <div>
                          <Avatar size={"large"} icon={<UserOutlined />} />
                        </div> */}
                        <div className="w-full">
                          <div className="flex justify-between">
                            <Typography.Paragraph className="text-base font-bold">
                              {question?.title}
                            </Typography.Paragraph>
                            {userType && userType !== "user" && (
                              <Button
                                danger
                                type="text"
                                size="large"
                                shape="circle"
                                icon={<DeleteOutlined />}
                                className="flex ml-auto justify-center items-center m-0"
                                onClick={() =>
                                  handleDeleteAssignment(question.id)
                                }
                              />
                            )}
                          </div>
                          {parsedQuestions &&
                            parsedQuestions.map((quest: any, index: any) => {
                              return (
                                <Typography.Paragraph
                                  key={index}
                                  className=" font-semibold hover:cursor-pointer"
                                  // onClick={() => {
                                  //   handleViewReplies(question);
                                  // }}
                                >
                                  {quest}
                                </Typography.Paragraph>
                              );
                            })}
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
    </div>
  );
};

export default CourseAssignment;
