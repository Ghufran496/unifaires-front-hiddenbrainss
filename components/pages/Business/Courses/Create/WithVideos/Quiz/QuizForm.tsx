"use client";
import React, { Fragment, useState, useContext } from "react";
import {
  Form,
  Input,
  // Upload,
  Button,
  // message,
  Typography,
  // UploadProps,
  message,
} from "antd";

import { CourseContext } from "../../CourseContext";
import { useSession } from "next-auth/react";
import config from "@/app/utils/config";
import { SectionInt } from "../../../course.interface";

interface ISection {
  section: SectionInt;
}

const QuizForm = ({ section }: ISection) => {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const [form] = Form.useForm();
  const { courseData, fetchCourseData } = useContext(CourseContext);
  const [addQuiz, setAddQuiz] = useState(section.id);

  const handleSaveQuiz = async (section: SectionInt) => {
    if (status === "authenticated" && session?.user?.token) {
      const formData = form.getFieldsValue();
      setLoading(true);
      try {
        const response = await fetch(`${config.API.API_URL}/quiz`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-token": session?.user?.token,
          },
          body: JSON.stringify({ ...formData, sectionId: section?.id }),
        });
        if (response.ok) {
          message.success("Quiz Created Successfully");
          fetchCourseData();
          setAddQuiz(-1);
        } else {
          message.error("Quiz Creation Failed");
        }
      } catch (error) {
        message.error("Quiz Creation Failed");
      }
      setLoading(false);
    }
  };
  return (
    <Fragment>
      {addQuiz === section.id && (
        <div className="mt-4 mb-4">
          <Form layout="vertical" form={form} size="large">
            <div className="flex flex-row gap-2">
              <div className="w-1/5 mt-2">
                <Typography.Title level={5}>New Quiz:</Typography.Title>
              </div>
              <div className="w-full">
                <Form.Item required className="w-full">
                  <Form.Item required name="title">
                    <Input placeholder="Quiz Title" />
                  </Form.Item>
                  <div className="m-0">
                    <Form.Item
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a description",
                        },
                      ]}
                      tooltip="Write a description."
                      className="mb-6"
                    >
                      <Input.TextArea rows={4} placeholder="Quiz Description" />
                    </Form.Item>
                  </div>
                  <div className="flex flex-row gap-2 ">
                    <Button
                      className=" flex justify-center items-center ml-auto"
                      type="default"
                      size="large"
                      onClick={() => setAddQuiz(-1)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className=" flex justify-center items-center "
                      type="primary"
                      size="large"
                      //   icon={<PlusOutlined />}
                      onClick={() => handleSaveQuiz(section)}
                      loading={loading}
                    >
                      Add Quiz
                    </Button>
                  </div>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Fragment>
  );
};
export default QuizForm;
