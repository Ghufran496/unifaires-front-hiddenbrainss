"use client";
import { useState, useContext } from "react";
import Image from "next/image";
import { Form, Input, Button, message, Upload } from "antd";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { CourseContext } from "../Create/CourseContext";
import { Image_EXT } from "@/components/Constants";

const AddInstructorPage = ({ setIsModalVisible }: any) => {
  const { data: session, status } = useSession();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false); // New state for upload loading
  const [avatarUrl, setAvatarUrl] = useState();
  const { courseData, fetchCourseData } = useContext(CourseContext);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const courseId = courseData?.data?.id;

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
          // const uploadUrl = imgData.data.url;
          // setAvatarUrl(uploadUrl);
          message.success("File uploaded successfully.");
          // console.log("THIS IS THE IMAGE URL:", uploadUrl);
        } else {
          message.error("Image Upload failed.");
        }
      }
    } catch (error) {
      message.error("Image Upload Failed, try again.");
    }
  };

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

  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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

  const addInstructor = async (values: any) => {
    setLoading(true);
    try {
      if (status === "authenticated" && session?.user?.token) {
        const response = await fetch(`${config.API.API_URL}/instructor`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-token": session?.user?.token,
          },
          body: JSON.stringify({ ...values, courseId, image: avatarUrl }),
        });

        // Handle the response here (e.g., show success message, redirect, etc.)
        if (response.ok) {
          message.success("Instructor added successfully!");
          fetchCourseData();
          setIsModalVisible(false);
          form.resetFields();
        } else {
          console.error("Failed to add instructor");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <Form form={form} onFinish={addInstructor} size="large" className="mt-10">
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
          { required: true, message: "Please enter the instructor name" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="bio"
        label="Bio"
        rules={[{ required: true, message: "Please enter the instructor bio" }]}
      >
        <Input.TextArea rows={4} placeholder="Bio..." />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="flex justify-end ml-auto"
        >
          Add Instructor
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddInstructorPage;
