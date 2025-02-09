"use client";
import { fetchUserProfile } from "@/redux/features/UserSlice";
import { useAppDispatch } from "@/redux/hooks";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import { Button, Form } from "antd";
import dynamic from "next/dynamic";
import { useState } from "react";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const UserHobbies = () => {
  const [personalityForm] = Form.useForm();
  const [loading, setLoading] = useState();
  const dispatch: any = useAppDispatch();

  async function savePersonality() {
    const reqBody = personalityForm.getFieldsValue();
    try {
      const res = await axiosInstance.post("/dk", reqBody);
      if (res.status) {
        showSuccess("Personality Added");
        dispatch(fetchUserProfile("user"));
      }
    } catch (error) {
      handleAxiosError(error);
    }
  }
  return (
    <div>
      <Form layout="vertical" form={personalityForm}>
        <Form.Item
          name="aboutMe"
          label="Your personality and hobbies here:"
          style={{ fontWeight: 600 }}
        >
          <ReactQuill
            theme="snow"
            className="font-normal"
            placeholder="Tell us about your hobbies..."
          />
        </Form.Item>
        <Button
          className="text-base font-bold"
          type="primary"
          size="large"
          block
          htmlType="button"
          //   onClick={savePersonality}
          loading={loading}
        >
          Save
        </Button>
      </Form>
    </div>
  );
};

export default UserHobbies;
