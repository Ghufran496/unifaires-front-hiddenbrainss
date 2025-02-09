"use client";

import { skillsOption } from "@/components/Constants";
import {
  CountryDialCodeOption,
  CountryListOption,
} from "@/components/shared/CountryList/countryList";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  MinusCircleOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";
import Image from "next/image";
import axiosInstance from "@/app/utils/axios-config";
import SkillsAndExpertise from "../SkillsAndExpertise";
import { uploadToAPI } from "@/app/utils/mediaUpload";
import { handleAxiosError, showError } from "@/app/utils/axiosError";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hooks";
import { fetchSkills } from "@/redux/features/UserSlice";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    toast.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    toast.error("Image must smaller than 5MB!");
  }
  return isJpgOrPng && isLt2M;
};

interface ISector {
  name: string;
  skills: Array<string> | undefined;
}

const MentorshipApplication = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch: any = useAppDispatch();
  const [addSector, setAddSector] = useState(false);
  const [categoriesPicked, setCategoriesPicked] = useState<any[]>([]);
  const [skillsPicked, setSkillsPicked] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const currentPath = usePathname();

  // Media Upload

  const handleChange: UploadProps["onChange"] = async (info) => {
    setLoading(true);

    const { status } = info.file;

    if (status === "uploading") {
      // check if it already sent
      if (!isUploading) {
        const uploadedFile = info.file.originFileObj;

        if (uploadedFile) {
          // check if is alrady set don't set
          setIsUploading(true);
          uploadToAPI(uploadedFile).then((res) => {
            setImageUrl(res);
            setLoading(false);
            setIsUploading(false);
          });
        }
      }
    } else if (status === "error") {
      toast.error(`${info.file.name} file upload failed.`);
      setLoading(false);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const onFinish = async (values: any) => {
    values.skills = skillsPicked;
    values.mediaUrl = imageUrl;
    console.log("Form values:", values);
    if (session) {
      try {
        setSubmitLoading(true);
        const res = await axiosInstance.post("/mentorships", values);
        if (res.status) {
          toast.success("Application Submitted Successfully");
        }
      } catch (error) {
        handleAxiosError(error);
      } finally {
        setSubmitLoading(false);
      }
    } else {
      showError("Proceed to Login");
      setTimeout(() => {
        router.push(`/login?redirect=${currentPath}`);
      }, 5000);
    }
  };

  useEffect(() => {
    dispatch(fetchSkills());
  }, []);

  // console.log(skillsPicked);
  return (
    <div className="container mx-auto lg:w-[60%] md:w-[80%] w-[100%] font-Montserrat px-4 py-8">
      <h1 className="text-3xl flex justify-center text-purple-50 font-bold mb-6">
        Become a Mentor & Facilitator
      </h1>
      <Form
        layout="vertical"
        name="mentorship_form"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          className="text-purple-500 font-semibold text-3xl "
          name="firstname"
          rules={[
            {
              required: true,
              message: "Please enter your first name!",
            },
          ]}
        >
          <Input className="h-12" placeholder="First Name" />
        </Form.Item>

        <Form.Item
          name="lastname"
          rules={[
            {
              required: true,
              message: "Please enter your last name!",
            },
          ]}
        >
          <Input
            className="h-12 font-medium text-base"
            placeholder="Last Name"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "Please enter a valid email address!",
            },
            {
              required: true,
              message: "Please enter your email address!",
            },
          ]}
        >
          <Input className="h-12 font-medium text-base" placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="currentJobTitle"
          rules={[
            {
              required: true,
              message: "Please enter your current job title!",
            },
          ]}
        >
          <Input
            className="h-12 pt-2 font-medium text-base"
            placeholder="Current Job Title"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="currentOrganization"
          rules={[
            {
              required: true,
              message: "Please enter your current organization!",
            },
          ]}
        >
          <Input
            className="h-12 pt-2 font-medium text-base"
            placeholder="Current Organization"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter your phone number!",
            },
          ]}
        >
          <Space.Compact className="w-full">
            <Form.Item
              // name="dialCode"
              className=" w-1/3 "
              rules={[
                {
                  required: true,
                  message: "Please enter your country dial code!",
                },
              ]}
            >
              <Select
                allowClear
                showSearch
                placeholder="Select a dial code"
                bordered={false}
                size="large"
                className="font-medium text-base border border-r-none h-[2.5em] w-full"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={CountryDialCodeOption}
              />
            </Form.Item>
            <Form.Item
              name="phonenumber"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: "Please enter your phone number!",
                },
              ]}
            >
              <Input
                type="number"
                size="large"
                className="font-medium text-base"
                placeholder="Phone Number"
                // style={{ width: "100%" }}
              />
            </Form.Item>
          </Space.Compact>
        </Form.Item>

        <Form.Item
          label="Country"
          name="country"
          rules={[
            {
              required: true,
              message: "Please select your country!",
            },
          ]}
        >
          <Select
            allowClear
            placeholder="Select a field"
            size="large"
            showSearch
            className="font-medium text-base"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={CountryListOption}
          />
        </Form.Item>

        <Form.Item name="mediaUrl">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <Image src={imageUrl} alt="image" width={100} height={100} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>

        <Form.List name="skills">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 16 }}
                  align="baseline"
                >
                  <SkillsAndExpertise
                    skillsPicked={skillsPicked}
                    setSkillsPicked={setSkillsPicked}
                    categoriesPicked={categoriesPicked}
                    setCategoriesPicked={setCategoriesPicked}
                  />

                  <MinusCircleOutlined
                    onClick={() => {
                      remove(name);
                      setCategoriesPicked([]);
                      setSkillsPicked([]);
                      setAddSector(false);
                    }}
                  />
                </Space>
              ))}
              {!addSector && (
                <Form.Item>
                  <Button
                    type="link"
                    onClick={() => {
                      add();
                      setAddSector(true);
                    }}
                    // block
                    className="text-purple-50 mt-8 bg-purple-60 p-6 pb-12 rounded-lg"
                    icon={
                      <PlusOutlined
                        style={{ color: "#5832DA" }}
                        className="rounded-full p-2 bg-purple-60"
                      />
                    }
                  >
                    Add Skillls & Expertise
                  </Button>
                </Form.Item>
              )}
            </>
          )}
        </Form.List>

        <Form.Item
          label="Why do you want to join the mentorship program? About you!"
          name="about"
          rules={[
            {
              required: true,
              message: "Please provide your reason for joining!",
            },
          ]}
        >
          <Input.TextArea className="h-56 font-medium text-base" rows={4} />
        </Form.Item>

        <Form.Item className="flex justify-center">
          <Button
            type="primary"
            className="h-12 text-6 font-semibold w-[220px]"
            htmlType="submit"
            loading={submitLoading}
          >
            Submit Application
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MentorshipApplication;
