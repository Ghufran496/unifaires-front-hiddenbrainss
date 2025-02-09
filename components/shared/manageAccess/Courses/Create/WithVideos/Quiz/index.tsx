"use client";
import React, { Fragment, useState, useContext, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Collapse,
  Typography,
  message,
  Card,
} from "antd";
import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { CourseContext } from "../../CourseContext";
import { useSession } from "next-auth/react";
import config from "@/app/utils/config";
import { SectionInt } from "../../../course.interface";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import katex from "katex";
import "katex/dist/katex.min.css";
if (typeof window !== "undefined") {
  window.katex = katex;
}
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/monokai-sublime.css";
import quillModules from "@/components/shared/QuillTextEditor/QuillTextEditorModule";

interface Isection {
  section: SectionInt;
}

const Quiz = ({ section }: Isection) => {
  const [form] = Form.useForm();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const { courseData, fetchCourseData } = useContext(CourseContext);
  const [showQuizEdit, setShowQuizEdit] = useState("");
  const [editedQuiz, setEditedQuiz] = useState<{
    title: string;
    id?: string | number;
    description: string;
  }>({
    title: "",
    description: "",
  });
  const [questionForm, setQuestionForm] = useState(false);
  const [questionType, setQuestionType] = useState(false);
  const { Meta } = Card;
  const [answers, setAnswers] = useState<Array<string>>([]);
  const [reasons, setReasons] = useState<Array<string>>([]);
  const [checkedOptions, setCheckedOptions] = useState<Array<boolean>>([]);

  useEffect(() => {
    setCheckedOptions(new Array(answers.length).fill(false));
  }, [answers]);

  // const [quizTitle, setQuizTitle] = useState("");

  const handleEditQuiz = (quiz: {
    id: number | string;
    title: string;
    description: string;
  }) => {
    console.log(quiz);
    setShowQuizEdit(`${quiz.id}`);

    setEditedQuiz({
      title: quiz?.title,
      description: quiz?.description,
    });

    console.log("seet", editedQuiz.title);
  };

  const handleUpdateQuiz = async (id: number, sectionId: number) => {
    setLoading(true);
    if (status === "authenticated" && session?.user?.token) {
      try {
        const response = await fetch(`${config.API.API_URL}/quiz/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-token": session?.user?.token,
          },
          body: JSON.stringify({
            title: editedQuiz.title,
            description: editedQuiz.description,
            sectionId: sectionId,
          }),
        });
        if (response.ok) {
          message.success("Quiz Updated Successfully");
          fetchCourseData();
          setShowQuizEdit("");
        } else {
          message.error("Quiz Update Failed");
        }
      } catch (error) {
        message.error("Quiz Update Failed");
      }
    }
    setLoading(false);
  };

  const handleDeleteQuiz = async (id: number) => {
    if (status === "authenticated" && session?.user?.token) {
      try {
        const response = await fetch(`${config.API.API_URL}/quiz/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-token": session?.user?.token,
          },
        });
        if (response.ok) {
          message.success("Quiz Successfully Deleted");
          fetchCourseData();
        } else {
          message.error("Unable to Delete Quiz. Try again");
        }
      } catch (error) {
        message.error("Unable to Delete Quiz. Try again");
      }
    }
  };
  const handleShowQuestion = () => {
    setQuestionForm(true);
    setQuestionType(false);
    setAnswers([...answers, ""]);
    setReasons([...reasons, ""]);
  };

  const handleClose = () => {
    setQuestionForm(false);
    setQuestionType(false);
  };

  const handleDeleteOption = (quizId: number, optionIndex: number) => {
    const updatedAnswers = [...answers];
    const updatedReasons = [...reasons];

    updatedAnswers.splice(optionIndex, 1);
    updatedReasons.splice(optionIndex, 1);

    setAnswers(updatedAnswers);
    setReasons(updatedReasons);
  };

  const handleSaveQuestions = async (id: number) => {
    if (status === "authenticated" && session?.user?.token) {
      const formData = form.getFieldsValue();
      const options = answers.map((answer, index) => {
        return {
          answer: answer,
          correct: checkedOptions[index],
          why: reasons[index],
        };
      });
      try {
        const res = await fetch(`${config.API.API_URL}/question`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-token": session?.user?.token,
          },
          body: JSON.stringify({
            question: formData.question,
            type: "multiple",
            quizId: id,
            options: options,
          }),
        });
        if (res.ok) {
          message.success("Question Added Successfully");
          form.resetFields();
          setReasons([]);
          setAnswers([]);
          handleClose();
          fetchCourseData();
        } else {
          message.error("Unable to add question. Try again");
        }
      } catch (error) {
        message.error("Unable to add question. Try again");
      }
    }
  };

  const handleDeleteQuestion = async (id: number) => {
    if (status === "authenticated" && session?.user?.token) {
      try {
        const response = await fetch(`${config.API.API_URL}/question/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-token": session?.user?.token,
          },
        });
        if (response.ok) {
          message.success("Question Successfully Deleted");
          fetchCourseData();
        } else {
          message.error("Unable to Delete Question. Try again");
        }
      } catch (error) {
        message.error("Unable to Delete Question. Try again");
      }
    }
  };

  return (
    <Fragment>
      <div className="mt-4 mb-4">
        {section?.quizzes?.length > 0 &&
          section?.quizzes.map((quiz) => {
            return (
              <div key={quiz.id} className="flex flex-col gap-3 mb-3">
                <Collapse
                  accordion
                  collapsible="icon"
                  expandIconPosition="end"
                  defaultActiveKey={["00"]}
                  className="overflow-hidden [&>div.ant-collapse-item>div.ant-collapse-header]:bg-white"
                >
                  <Collapse.Panel
                    key={`${section.id}-${quiz.id}`}
                    header={
                      <div className="flex items-center justify-between">
                        {showQuizEdit === `${quiz.id}` ? (
                          <div className="w-full">
                            <Form layout="vertical" size="large">
                              <Button
                                size="small"
                                type="default"
                                icon={<CloseOutlined />}
                                className="border-none rounded-md my-4 flex ml-auto items-center justify-center"
                                onClick={() => setShowQuizEdit("")}
                              />
                              <div className="flex flex-row gap-2 w-full">
                                <div className="w-1/5 mt-2">
                                  <Typography.Title level={5}>
                                    Quiz:
                                  </Typography.Title>
                                </div>

                                <div className="w-full">
                                  <Form.Item required>
                                    <Input
                                      placeholder={editedQuiz.title}
                                      value={editedQuiz.title}
                                      onChange={(e) =>
                                        setEditedQuiz({
                                          ...editedQuiz,
                                          title: e.target.value,
                                        })
                                      }
                                    />
                                  </Form.Item>
                                  <div className="m-0">
                                    <Form.Item
                                      required
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please enter a description",
                                        },
                                      ]}
                                      tooltip="Write a description."
                                      className="mb-6"
                                    >
                                      <Input.TextArea
                                        rows={4}
                                        placeholder="Quiz Description"
                                        value={editedQuiz.description}
                                        onChange={(e) =>
                                          setEditedQuiz({
                                            ...editedQuiz,
                                            description: e.target.value,
                                          })
                                        }
                                      />
                                    </Form.Item>
                                  </div>
                                  <div className="flex flex-row gap-2 ">
                                    <Button
                                      className="flex justify-end items-center ml-auto mt-4"
                                      type="primary"
                                      size="large"
                                      icon={<PlusOutlined />}
                                      loading={loading}
                                      onClick={() =>
                                        handleUpdateQuiz(quiz.id, section.id)
                                      }
                                    >
                                      Update
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Form>
                          </div>
                        ) : (
                          <div className="flex flex-row">
                            <Typography.Paragraph className="mb-0 font-semibold">
                              {`Quiz ${section?.quizzes.indexOf(quiz) + 1}: ${
                                quiz.title
                              }`}
                            </Typography.Paragraph>
                            {showQuizEdit !== `${quiz.id}` && (
                              <div className="flex ml-2 items-center justify-start">
                                <Button
                                  type="text"
                                  size="small"
                                  shape="circle"
                                  icon={<EditOutlined />}
                                  onClick={() => handleEditQuiz(quiz)}
                                />
                                <Button
                                  danger
                                  type="text"
                                  size="small"
                                  shape="circle"
                                  icon={<DeleteOutlined />}
                                  className="flex items-center justify-center mr-2"
                                  onClick={() => handleDeleteQuiz(quiz.id)}
                                />
                              </div>
                            )}
                          </div>
                        )}
                        <div>
                          {showQuizEdit !== `${quiz.id}` && (
                            <div className="flex flex-row justify-between">
                              <Button
                                type="default"
                                size="small"
                                icon={<PlusOutlined />}
                                className="flex items-center p-4"
                                onClick={() => setQuestionType(true)}
                              >
                                Questions
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    }
                  >
                    {questionType && (
                      <div>
                        <Button
                          size="small"
                          type="default"
                          icon={<CloseOutlined />}
                          className="border-none rounded-md flex ml-auto items-center justify-center"
                          onClick={handleClose}
                        />
                        <div className="flex items-center justify-center">
                          <Card
                            hoverable
                            cover={
                              <QuestionCircleOutlined
                                className="py-8 p-4 bg-gray-200 rounded-t-md"
                                style={{
                                  fontSize: "2em",
                                }}
                                onClick={handleShowQuestion}
                              />
                            }
                          >
                            <Meta className="text-sm" title="Multiple Choice" />
                          </Card>
                        </div>
                      </div>
                    )}
                    {questionForm && (
                      <Card>
                        <div className="flex flex-row">
                          <Typography.Title level={5}>
                            Add Multiple Choice Question
                          </Typography.Title>
                          <Button
                            size="small"
                            type="default"
                            icon={<CloseOutlined />}
                            className="border-none rounded-md flex ml-auto items-center justify-center"
                            onClick={handleClose}
                          />
                        </div>
                        <div>
                          <Form layout="vertical" form={form}>
                            <Form.Item
                              name="question"
                              label="Question"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter a question",
                                },
                              ]}
                              className="mb-6 h-[250px]"
                            >
                              <ReactQuill
                                theme="snow"
                                className="font-normal h-[150px]"
                                placeholder="Basic Knowledge of..."
                                modules={quillModules}
                              />
                            </Form.Item>
                            <div className="flex flex-row">
                              <Typography.Title level={5}>
                                Answers
                              </Typography.Title>
                            </div>
                            {answers.map((answer, index) => (
                              <Fragment key={index}>
                                <Form
                                  layout="vertical"
                                  className="flex flex-row gap-4 p-4"
                                >
                                  <Checkbox
                                    style={{ fontSize: "20px" }}
                                    checked={checkedOptions[index]}
                                    onChange={(e) => {
                                      const updatedCheckedOptions = [
                                        ...checkedOptions,
                                      ];
                                      updatedCheckedOptions[index] =
                                        e.target.checked;
                                      setCheckedOptions(updatedCheckedOptions);
                                    }}
                                  ></Checkbox>
                                  <div className="w-full">
                                    <Form.Item
                                      // label={`Answer ${index + 1}`}
                                      name="answer"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please enter an answer",
                                        },
                                      ]}
                                      className="mb-6"
                                    >
                                      <Input.TextArea
                                        rows={2}
                                        placeholder="Add an answer"
                                        value={answer}
                                        onChange={(e) => {
                                          const updatedAnswers = [...answers];
                                          updatedAnswers[index] =
                                            e.target.value;
                                          setAnswers(updatedAnswers);
                                        }}
                                      />
                                    </Form.Item>
                                    <Form.Item
                                      // label={"Reason"}
                                      name="why"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please enter a reason",
                                        },
                                      ]}
                                      className="mb-6"
                                    >
                                      <Input.TextArea
                                        rows={3}
                                        placeholder="Add a reason why it is wrong or correct"
                                        value={reasons[index]}
                                        onChange={(e) => {
                                          const updatedReasons = [...reasons];
                                          updatedReasons[index] =
                                            e.target.value;
                                          setReasons(updatedReasons);
                                        }}
                                      />
                                    </Form.Item>
                                  </div>
                                </Form>
                                <Button
                                  danger
                                  type="text"
                                  size="large"
                                  shape="circle"
                                  icon={<DeleteOutlined />}
                                  className="flex ml-auto justify-center items-center mb-4"
                                  onClick={() =>
                                    handleDeleteOption(quiz.id, index)
                                  }
                                />
                              </Fragment>
                            ))}
                            <div className="flex">
                              <Button
                                type="primary"
                                size="small"
                                icon={<PlusOutlined />}
                                onClick={() => {
                                  setAnswers([...answers, ""]);
                                  setReasons([...reasons, ""]);
                                }}
                                className="rounded-md flex items-center justify-center ml-auto"
                              />
                            </div>
                            <Typography.Paragraph className="text-gray-400 italic">
                              Write up to 15 possible answers and indicate which
                              one is the best
                            </Typography.Paragraph>
                            <Button
                              className="flex justify-end items-center ml-auto mt-4"
                              type="primary"
                              size="large"
                              onClick={() => handleSaveQuestions(quiz.id)}
                            >
                              Save
                            </Button>
                          </Form>
                        </div>
                      </Card>
                    )}
                    {quiz?.quizquestions?.length > 0 &&
                      quiz?.quizquestions.map((question) => {
                        return (
                          <div
                            key={question.id}
                            className="flex flex-row bg-gray-200 text-sm rounded-md mt-4 p-2"
                          >
                            <li className="text-sm italics ">
                              {`${quiz.quizquestions.indexOf(question) + 1}. ${
                                question.question
                              }`}
                            </li>
                            <div className="flex items-center ml-2 justify-start">
                              <Button
                                type="text"
                                size="small"
                                shape="circle"
                                icon={<EditOutlined />}
                                // onClick={() => handleEditQuiz(quiz)}
                              />
                              <Button
                                danger
                                type="text"
                                size="small"
                                shape="circle"
                                icon={<DeleteOutlined />}
                                className="flex items-center justify-center mr-2"
                                onClick={() =>
                                  handleDeleteQuestion(question.id)
                                }
                              />
                            </div>
                          </div>
                        );
                      })}
                  </Collapse.Panel>
                </Collapse>
              </div>
            );
          })}
      </div>
    </Fragment>
  );
};
export default Quiz;
