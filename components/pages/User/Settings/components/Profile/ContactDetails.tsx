"use client";
import { fetchUserProfile } from "@/redux/features/UserSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";
import { Row, Col, Form, Input, Checkbox, Typography, Button } from "antd";
import email from "next-auth/providers/email";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SettingsContactDetails = () => {
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const dispatch: any = useAppDispatch();
  const [isDefault, setIsDefault] = useState(false);
  const userId = session?.user.id;
  const myProfile: any = useAppSelector(
    (state: RootState) => state.user.myProfile
  );
  const myContacts = myProfile && myProfile.userContacts[0];

  async function saveContactInfo() {
    const formData = form.getFieldsValue();
    formData.isDefault = isDefault;
    try {
      setLoading(true);
      const response = await axiosInstance.post("/contact", formData);
      if (response.status) {
        toast.success("Contact Addeded Successfully");
        dispatch(fetchUserProfile("user"));
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    form.setFieldsValue(myContacts);
  }, [myProfile]);

  return (
    <div>
      <Form layout="vertical" form={form}>
        <Row gutter={[16, 16]}>
          <Col lg={10}>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              style={{ fontStyle: "italic", fontWeight: 600 }}
              rules={[
                {
                  required: true,
                  message: "Please enter your phone number",
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
          <Col lg={10}>
            <Form.Item
              name="email"
              label="Email Address"
              style={{ fontStyle: "italic", fontWeight: 600 }}
              rules={[
                {
                  required: true,
                  message: "Please enter your email address",
                },
              ]}
            >
              <Input
                placeholder="example@gmail.com"
                size="large"
                className="rounded-sm"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="portfolioUrl"
          label="Portfolio Link"
          style={{ fontStyle: "italic", fontWeight: 600 }}
          rules={[
            {
              required: true,
              message: "Please enter your a portfolio link",
            },
          ]}
        >
          <Input
            placeholder="Portfolio link"
            size="large"
            className="rounded-sm"
          />
        </Form.Item>
        <Form.Item name="isDefault">
          <Checkbox
            className="font-normal"
            onChange={(e: any) => setIsDefault(e.target.checked)}
            checked={isDefault}
          >
            Make Default Contact
          </Checkbox>
        </Form.Item>
        <div>
          <Typography.Paragraph className="font-bold italic">
            Linked Accounts
          </Typography.Paragraph>
          <Typography.Paragraph className="font-normal">
            See connected
            <span className="text-blue-700 font-semibold cursor-pointer">
              {" "}
              third-party social media apps
            </span>
          </Typography.Paragraph>
        </div>
      </Form>
      <Button
        className="text-base font-bold"
        type="primary"
        size="large"
        block
        htmlType="button"
        onClick={saveContactInfo}
        loading={loading}
      >
        Save
      </Button>
    </div>
  );
};

export default SettingsContactDetails;
