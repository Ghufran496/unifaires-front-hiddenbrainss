"use client";
import React, { useEffect, useState, useContext } from "react";
import {
  List,
  Avatar,
  message,
  Button,
  Form,
  Upload,
  Modal,
  Input,
} from "antd";
import { useSession } from "next-auth/react";
import { useForm } from "antd/lib/form/Form";
import { CourseContext } from "../Create/CourseContext";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import config from "@/app/utils/config";
import Image from "next/image";
import { InstructorsInt } from "../course.interface";
import { Image_EXT } from "@/components/Constants";

const InstructorPage = () => {
  const { data: session, status } = useSession();
  const [form] = useForm();
  const { courseData, fetchCourseData } = useContext(CourseContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState();
  const [instructorId, setInstructorId] = useState<number>();
  const [instructorDetails, setInstructorDetails] = useState({});
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const instructors = courseData?.data?.instructors;

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleEditInstructor = async (id: number) => {
    setIsModalVisible(true);
    setInstructorId(id);
    try {
      if (status === "authenticated" && session?.user?.token) {
        const res = await fetch(`${config.API.API_URL}/instructor/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-token": session?.user?.token,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setInstructorDetails(data.data);
        }
      }
    } catch (error) {
      message.error("Unable to Save Course. Try Again");
    }
  };

  const uploadToAPI = async (file: File) => {
    const formData = new FormData();
    formData.append("media", file);

    try {
      if (status === "authenticated" && session?.user?.token) {
        const imgRes = await fetch(`${config.API.API_URL}/media`, {
          method: "POST",
          body: formData,
          headers: {
            "x-token": session?.user?.token,
          },
        });
        if (imgRes.ok) {
          await imgRes.json().then((res) => {
            setAvatarUrl(res.data.url);
            setIsUploading(false);
          });
          message.success("File uploaded successfully.");
        } else {
          message.error("Image Upload failed.");
        }
      }
    } catch (error) {
      message.error("Image Upload Failed, try again.");
    }
  };

  const updateInstructor = async (id: number | undefined) => {
    setLoading(true);
    const values = form.getFieldsValue();
    try {
      if (status === "authenticated" && session?.user?.token) {
        const response = await fetch(`${config.API.API_URL}/instructor/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-token": session?.user?.token,
          },
          body: JSON.stringify({ ...values, image: avatarUrl }),
        });
        if (response.ok) {
          message.success("Instructor Updated successfully!");
          fetchCourseData();
          form.resetFields();
          setIsModalVisible(false);
        } else {
          console.error("Failed to Update instructor");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };
  const handleDeleteInstructor = async (id: number) => {
    setLoading(true);
    try {
      if (status === "authenticated" && session?.user?.token) {
        const response = await fetch(`${config.API.API_URL}/instructor/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-token": session?.user?.token,
          },
        });
        if (response.ok) {
          message.success("Instructor Updated successfully!");
          fetchCourseData();
        } else {
          console.error("Failed to Update instructor");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (instructorDetails) {
      form.setFieldsValue(instructorDetails);
    } else {
      console.log("Unable to access data");
    }
  }, [instructorDetails, form]);

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt12M = file.size / 1024 / 1024 < 12;
    if (!isLt12M) {
      message.error("Image must be smaller than 12MB!");
    }
    return isJpgOrPng && isLt12M;
  };
  const handleChange = (info: any) => {
    const { status } = info.file;

    console.log(status);
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "uploading") {
      // check if it already sent
      if (!isUploading) {
        const uploadedFile = info.file.originFileObj;
        if (uploadedFile) {
          // check if is alrady set don't set
          uploadToAPI(uploadedFile);
          setIsUploading(true);
          console.log(isUploading);
        }
      }
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <List
        className="top-4 bottom-4 mx-4 p-4"
        pagination={{
          position: "bottom",
          align: "center",
          pageSize: 3,
        }}
        itemLayout="horizontal"
        dataSource={instructors}
        size="large"
        bordered
        // loading={loading}
        renderItem={(instructor: InstructorsInt) => (
          <List.Item
            key={instructor?.id}
            actions={[
              <div
                key={`add-instructor-${instructor?.id}`}
                className="flex items-center justify-between mb-2 pl-6"
              >
                <Button
                  type="text"
                  size="small"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => handleEditInstructor(instructor?.id)}
                />
                <Button
                  danger
                  type="text"
                  size="small"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  className="grid place-items-center"
                  onClick={() => handleDeleteInstructor(instructor?.id)}
                />
              </div>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={instructor?.image} />}
              title={instructor?.name}
              description={instructor?.bio}
            />
          </List.Item>
        )}
      />

      <Modal
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          // onFinish={() => updateInstructor(instructor.id)}
          size="large"
          className="mt-10"
        >
          <Form.Item>
            <Upload
              name="image"
              listType="picture-circle"
              className="avatar-uploader flex justify-center"
              showUploadList={false}
              action=""
              accept={Image_EXT}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="avatar"
                  layout="responsive"
                  width={200}
                  height={200}
                  objectFit="contain"
                  objectPosition="center"
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter the instructor name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="bio"
            label="Bio"
            rules={[
              {
                required: true,
                message: "Please enter the instructor bio",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Bio..." />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="flex justify-end ml-auto"
              onClick={() => updateInstructor(instructorId)}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default InstructorPage;
