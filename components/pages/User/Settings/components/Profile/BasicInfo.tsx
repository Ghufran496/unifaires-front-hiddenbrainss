"use client";
import dynamic from "next/dynamic";
import { fetchUserProfile } from "@/redux/features/UserSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";
import { Row, Col, Form, Input, Button, Select } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import { experienceLevelOption } from "@/components/Constants";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const SettingsBasicInfo = ({}) => {
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const dispatch: any = useAppDispatch();
  const userId = session?.user.id;
  const [loading, setLoading] = useState(false);
  const myProfile: any = useAppSelector(
    (state: RootState) => state.user.myProfile
  );

  useEffect(() => {
    form.setFieldsValue(myProfile);
  }, [myProfile]);

  async function saveBasicInfo() {
    const formData = form.getFieldsValue();
    try {
      setLoading(true);
      const response = await axiosInstance.put(`/user/${userId}`, formData);
      if (response.status) {
        toast.success("Profile Updated Successfully");
        dispatch(fetchUserProfile("user"));
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  }

  // console.log(myProfile);
  return (
    <div>
      <Form layout="vertical" form={form}>
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item
              name="firstname"
              label="First Name"
              style={{ fontStyle: "italic", fontWeight: 600 }}
              rules={[
                {
                  required: true,
                  message: "Please enter name",
                },
              ]}
            >
              <Input
                placeholder="BASF AG"
                size="large"
                className="rounded-sm"
              />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item
              name="lastname"
              label="Last Name"
              style={{ fontStyle: "italic", fontWeight: 600 }}
              rules={[
                {
                  required: true,
                  message: "Please enter name",
                },
              ]}
            >
              <Input placeholder="John" size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item
              name="currentProfessionalRole"
              label="Current Professional Role"
              style={{ fontStyle: "italic", fontWeight: 600 }}
              rules={[
                {
                  required: true,
                  message: "Please enter role",
                },
              ]}
            >
              <Input
                placeholder="BASF AG"
                size="large"
                className="rounded-sm"
              />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item
              name="yearsOfExperience"
              label="Years of Experience"
              style={{ fontStyle: "italic", fontWeight: 600 }}
              rules={[
                {
                  required: true,
                  message: "Please enter years of experience",
                },
              ]}
            >
              <Input placeholder="2" size="large" className="rounded-sm" />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item
              name="experienceLevel"
              label="Experience Level"
              style={{ fontStyle: "italic", fontWeight: 600 }}
              rules={[
                {
                  required: true,
                  message: "Please enter years of experience",
                },
              ]}
            >
              <Select
                // mode="multiple"
                size="large"
                showSearch
                allowClear
                placeholder="Experience Level"
                maxTagCount="responsive"
                optionFilterProp="children"
                style={{ border: "none" }}
                className="rounded-full bg-white"
                // onChange={(e) => setExperienceLevel(e)}
                filterOption={(input, option: any) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={experienceLevelOption}
              />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item
              name="estimatedYearlySalary"
              label="Estimate yearly salary"
              style={{ fontStyle: "italic", fontWeight: 600 }}
              rules={[
                {
                  required: true,
                  message: "Please enter estimated yearly salary",
                },
              ]}
            >
              <Input placeholder="USD" size="large" className="rounded-sm" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="aboutMe"
          label="About Me"
          style={{ fontWeight: 600 }}
          rules={[
            {
              required: true,
              message: "Please enter about me",
            },
          ]}
        >
          {/* <DraftEditor /> */}
          <ReactQuill
            theme="snow"
            className="font-normal"
            placeholder="Tell us about yourself..."
          />
        </Form.Item>
      </Form>

      <Button
        className="text-base font-bold"
        type="primary"
        size="large"
        block
        htmlType="button"
        onClick={saveBasicInfo}
        loading={loading}
      >
        Save
      </Button>
    </div>
  );
};

export default SettingsBasicInfo;
