"use client";
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
import { Row, Col, Form, Input, DatePicker, Button } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const UserProfessionalCertificate = () => {
  const [form] = Form.useForm();
  const [presentCert] = Form.useForm();
  const dispatch: any = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [certificateId, setCertificateId] = useState(null);

  const myProfile: any = useAppSelector(
    (state: RootState) => state.user.myProfile
  );

  const professionalCertificates =
    myProfile && myProfile.professionalcertificates;

  useEffect(() => {
    if (certificateId !== null) {
      const eachCert = professionalCertificates.find(
        (exp: any) => exp.id === certificateId
      );

      presentCert.setFieldsValue({
        ...eachCert,
        year: eachCert ? dayjs(eachCert.year) : null,
      });
      console.log(eachCert);
    }
  }, [certificateId, presentCert, professionalCertificates]);

  async function saveCertificateInfo() {
    const formData = form.getFieldsValue();
    const reqBody = formData.certificates;

    try {
      setLoading(true);
      const res = await axiosInstance.post(
        "/professional-certificate",
        reqBody
      );
      if (res.status) {
        showSuccess("Certificate Added");
        dispatch(fetchUserProfile("user"));
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateCertificateInfo(id: any) {
    const reqBody = presentCert.getFieldsValue();

    try {
      setUpdateLoading(true);
      const res = await axiosInstance.put(
        `/professional-certificate/${id}`,
        reqBody
      );
      if (res.status) {
        showSuccess("Certificate Updated");
        dispatch(fetchUserProfile("user"));
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setUpdateLoading(false);
    }
  }

  async function deleteCertificateInfo(id: any) {
    try {
      setLoading(true);
      const res = await axiosInstance.delete(`/professional-certificate/${id}`);
      if (res.status) {
        showSuccess("Certificate Deleted");
        dispatch(fetchUserProfile("user"));
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {professionalCertificates?.map((cert: any) => (
        <div
          key={cert.id}
          className="flex items-center justify-between mb-2 border-gray-300 border-[1px] bg-gray-100 rounded-md p-2"
          style={{ fontWeight: "400" }}
        >
          {certificateId === cert.id ? (
            <div className="w-full relative">
              <Button
                onClick={() => setCertificateId(null)}
                style={{
                  position: "absolute",
                  zIndex: "99",
                  right: "0",
                }}
                icon={<CloseOutlined />}
                className="border-none"
              />
              <Form
                form={presentCert}
                size="large"
                className="w-full"
                layout="vertical"
              >
                <Row gutter={[16, 16]}>
                  <Col lg={10}>
                    <Form.Item
                      name="title"
                      label="Certificate Title"
                      style={{
                        fontStyle: "italic",
                        fontWeight: 600,
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please enter certificate title",
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
                      name="year"
                      label="Year of Certification"
                      style={{
                        fontStyle: "italic",
                        fontWeight: 600,
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please enter year of certification",
                        },
                      ]}
                    >
                      <DatePicker size="large" className="rounded-sm" />
                    </Form.Item>
                  </Col>
                </Row>
                <Button
                  className="text-base font-bold my-5"
                  type="primary"
                  size="large"
                  block
                  htmlType="button"
                  onClick={() => updateCertificateInfo(cert.id)}
                  loading={updateLoading}
                >
                  Update
                </Button>
              </Form>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <p>{cert.title}</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setCertificateId(cert.id);
                  }}
                  className="hover:text-blue-400 font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    deleteCertificateInfo(cert.id);
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

      {/* CREATE PROFESSIONAL CERTS STARTS */}
      <Form size="large" form={form} layout="vertical">
        <Form.List name="certificates">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className="flex justify-between gap-6 align-baseline"
                >
                  <div className="w-full">
                    <Row gutter={[16, 16]}>
                      <Col lg={10}>
                        <Form.Item
                          {...restField}
                          name={[name, "title"]}
                          label="Certificate Title"
                          style={{
                            fontStyle: "italic",
                            fontWeight: 600,
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please enter certificate title",
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
                          name={[name, "year"]}
                          label="Year "
                          style={{
                            fontStyle: "italic",
                            fontWeight: 600,
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please enter year of certification",
                            },
                          ]}
                        >
                          <DatePicker size="large" className="rounded-sm" />
                        </Form.Item>
                      </Col>
                    </Row>
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
                  {fields.length > 0
                    ? "Add More Certificate"
                    : "Add Certificate"}
                  Add Certificate
                </Button>
              </Form.Item>
              <Button
                className="text-base font-bold"
                type="primary"
                size="large"
                block
                htmlType="button"
                onClick={saveCertificateInfo}
                loading={loading}
              >
                Save
              </Button>
            </>
          )}
        </Form.List>
      </Form>
      {/* CREATE PROFESSIONAL CERTS ENDS */}
    </div>
  );
};

export default UserProfessionalCertificate;
