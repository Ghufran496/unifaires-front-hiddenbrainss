"use client";

import { country } from "@/redux/features/CountrySlice";
import { fetchUserProfile } from "@/redux/features/UserSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  CloseOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";

const UserEducationalQualification = () => {
  const [eduForm] = Form.useForm();
  const [presentForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [editEdu, setEditEdu] = useState(null);
  const [currentEdu, setCurrentEdu] = useState(false);

  const myProfile: any = useAppSelector(
    (state: RootState) => state.user.myProfile
  );
  const educationCerts = myProfile && myProfile.education;

  useEffect(() => {
    if (editEdu !== null) {
      const eachCert = educationCerts.find((edu: any) => edu.id === editEdu);
      presentForm.setFieldsValue({
        ...eachCert,
        fromYear: eachCert ? dayjs(eachCert.fromYear) : null,
        endYear: eachCert ? dayjs(eachCert.endYear) : null,
      });
    }
  }, [editEdu, presentForm, educationCerts]);

  const handleCurrentEdu = () => {
    setCurrentEdu(!currentEdu);
  };

  async function saveEducationInfo() {
    const vals = eduForm.getFieldsValue();
    const reqBody = vals.educationQualification.map((ed: any) => {
      return {
        ...ed,
        // currentEducation: currentEdu,
      };
    });

    try {
      setLoading(true);
      const res = await axiosInstance.post("/education", reqBody);

      if (res.status) {
        showSuccess("Education Added");
        dispatch(fetchUserProfile("user"));
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateEducationInfo(id: any) {
    const reqBody = presentForm.getFieldsValue();

    try {
      setUpdateLoading(true);
      const res = await axiosInstance.put(`/education/${id}`, reqBody);

      if (res.status) {
        showSuccess("Education Updated");
        setEditEdu(null);
        dispatch(fetchUserProfile("user"));
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setUpdateLoading(false);
    }
  }

  async function deleteEduInfo(id: any) {
    try {
      const res = await axiosInstance.delete(`/education/${id}`);
      if (res.status) {
        showSuccess("Education Deleted Successfully");
        dispatch(fetchUserProfile("user"));
      }
    } catch (error) {
      handleAxiosError(error);
    }
  }

  return (
    <div>
      {/* EDIT EDUCATION AND QUALIFICATION */}
      {educationCerts?.map((cert: any) => (
        <div
          key={cert.id}
          className="flex items-center justify-between mb-2 border-gray-300 border-[1px] bg-gray-100 rounded-md p-2"
          style={{ fontWeight: "400" }}
        >
          {editEdu === cert.id ? (
            <Form layout="vertical" form={presentForm} className="w-full">
              <div className="relative p-4">
                <Button
                  onClick={() => setEditEdu(null)}
                  style={{
                    position: "absolute",
                    zIndex: "99",
                    right: "0",
                  }}
                  icon={<CloseOutlined />}
                  className="border-none"
                />
                <Form.Item
                  name="collegeName"
                  label="College/University"
                  style={{ fontStyle: "italic", fontWeight: 600 }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter college name",
                    },
                  ]}
                >
                  <Input
                    placeholder="BASF AG"
                    size="large"
                    className="rounded-sm"
                  />
                </Form.Item>
                <Form.Item
                  name="degree"
                  label="Degree and Major"
                  style={{ fontStyle: "italic", fontWeight: 600 }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter degree and major",
                    },
                  ]}
                >
                  <Input
                    placeholder="BASF AG"
                    size="large"
                    className="rounded-sm"
                  />
                </Form.Item>
                <Typography.Paragraph className="font-semibold text-lg">
                  Time Period
                </Typography.Paragraph>
                <Row gutter={[16, 16]}>
                  <Col lg={10}>
                    <Form.Item
                      name="fromYear"
                      label="Start Date"
                      style={{ fontWeight: 600 }}
                      rules={[
                        {
                          required: true,
                          message: "Please pick a start date",
                        },
                      ]}
                    >
                      <DatePicker className="rounded-sm p-2" />
                    </Form.Item>
                  </Col>
                  {!currentEdu && (
                    <Col lg={10}>
                      <Form.Item
                        name="endYear"
                        label="End Date"
                        style={{ fontWeight: 600 }}
                        rules={[
                          {
                            required: true,
                            message: "Please pick an end date",
                          },
                        ]}
                      >
                        <DatePicker className="rounded-sm p-2" />
                      </Form.Item>
                    </Col>
                  )}
                </Row>
                <Checkbox
                  className="font-normal"
                  value={currentEdu}
                  onChange={handleCurrentEdu}
                >
                  I currently school here
                </Checkbox>
                <Button
                  className="text-base font-bold my-5"
                  type="primary"
                  size="large"
                  block
                  htmlType="button"
                  onClick={() => updateEducationInfo(cert.id)}
                  loading={updateLoading}
                >
                  Update
                </Button>
              </div>
            </Form>
          ) : (
            <div className="flex items-center justify-between w-full ">
              <p>{cert.collegeName}</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setEditEdu(cert.id)}
                  className="hover:text-blue-400 font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    deleteEduInfo(cert.id);
                  }}
                  className="hover:text-blue-400 font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      {/* EDIT EDUCATION AND QUALIFICATION */}

      {/* EDUCATION AND QUALIFICATION CREATE STARTS */}
      <Form layout="vertical" form={eduForm}>
        <Form.List name="educationQualification">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className="flex justify-between gap-6 mb-8 align-baseline"
                >
                  <div className="w-full">
                    <Form.Item
                      {...restField}
                      name={[name, "collegeName"]}
                      label="College/University"
                      style={{ fontStyle: "italic", fontWeight: 600 }}
                      rules={[
                        {
                          required: true,
                          message: "Please enter college name",
                        },
                      ]}
                    >
                      <Input
                        placeholder="BASF AG"
                        size="large"
                        className="rounded-sm"
                      />
                    </Form.Item>
                    <Form.Item
                      name={[name, "degree"]}
                      label="Degree and Major"
                      style={{ fontStyle: "italic", fontWeight: 600 }}
                      rules={[
                        {
                          required: true,
                          message: "Please enter degree and major",
                        },
                      ]}
                    >
                      <Input
                        placeholder="BASF AG"
                        size="large"
                        className="rounded-sm"
                      />
                    </Form.Item>
                    <Typography.Paragraph className="font-semibold text-lg">
                      Time Period
                    </Typography.Paragraph>
                    <Row gutter={[16, 16]}>
                      <Col lg={10}>
                        <Form.Item
                          name={[name, "fromYear"]}
                          label="Start Date"
                          style={{ fontWeight: 600 }}
                          rules={[
                            {
                              required: true,
                              message: "Please pick a start date",
                            },
                          ]}
                        >
                          <DatePicker className="rounded-sm p-2" />
                        </Form.Item>
                      </Col>
                      {!currentEdu && (
                        <Col lg={10}>
                          <Form.Item
                            name={[name, "endYear"]}
                            label="End Date"
                            style={{ fontWeight: 600 }}
                            rules={[
                              {
                                required: true,
                                message: "Please pick an end date",
                              },
                            ]}
                          >
                            <DatePicker className="rounded-sm p-2" />
                          </Form.Item>
                        </Col>
                      )}
                    </Row>
                    <Checkbox
                      className="font-normal"
                      onChange={handleCurrentEdu}
                    >
                      I currently school here
                    </Checkbox>
                  </div>
                  <div>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </div>
                </div>
              ))}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add()}
                  className="text-purple-50 mt-6"
                  icon={
                    <PlusOutlined
                      style={{ color: "#5832DA" }}
                      className="rounded-full p-2 bg-purple-60"
                    />
                  }
                >
                  {fields.length > 0 ? " Add More Education" : " Add Education"}
                </Button>
              </Form.Item>
              <Button
                className="text-base font-bold"
                type="primary"
                size="large"
                block
                htmlType="button"
                onClick={saveEducationInfo}
                loading={loading}
              >
                Save
              </Button>
            </>
          )}
        </Form.List>
        {/* EDUCATION AND QUALIFICATION CREATE ENDS */}
      </Form>
    </div>
  );
};

export default UserEducationalQualification;
