"use client";
import { fetchCountries } from "@/redux/features/CountrySlice";
import { fetchUserProfile } from "@/redux/features/UserSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  CloseOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { licensesOption } from "@/components/Constants";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import { Row, Col, Select, Button, DatePicker, Form } from "antd";
import Input from "antd/es/input/Input";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const SettingsLicenses = () => {
  const [licenseForm] = Form.useForm();
  const [presentLicense] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [licenseId, setLicenseId] = useState(null);
  const dispatch: any = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  const allCountries = useAppSelector(
    (state: RootState) => state.country.countries
  );

  const myProfile: any = useAppSelector(
    (state: RootState) => state.user.myProfile
  );

  const myLicenses = myProfile && myProfile.userlicenses;

  useEffect(() => {
    if (licenseId !== null) {
      const eachLicense = myLicenses.find((exp: any) => exp.id === licenseId);

      presentLicense.setFieldsValue({
        ...eachLicense,
        expirationDate: eachLicense ? dayjs(eachLicense.expirationDate) : null,
      });
      console.log(eachLicense);
    }
  }, [licenseId, presentLicense, myLicenses]);

  async function saveLicenseInfo() {
    const formData = licenseForm.getFieldsValue();
    const reqBody = formData.userLicenses;

    try {
      setLoading(true);
      const res = await axiosInstance.post("/user-licence", reqBody);
      if (res.status) {
        showSuccess("License Added");
        dispatch(fetchUserProfile("user"));
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateLicenseInfo(id: any) {
    const reqBody = presentLicense.getFieldsValue();

    try {
      setUpdateLoading(true);
      const res = await axiosInstance.put(`/user-licence/${id}`, reqBody);
      if (res.status) {
        showSuccess("License Updated");
        dispatch(fetchUserProfile("user"));
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setUpdateLoading(false);
    }
  }

  async function deleteLicenseInfo(id: any) {
    try {
      setUpdateLoading(true);
      const res = await axiosInstance.delete(`/user-licence/${id}`);
      if (res.status) {
        showSuccess("License Deleted");
        dispatch(fetchUserProfile("user"));
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setUpdateLoading(false);
    }
  }

  return (
    <div>
      {/* EDIT license STARTS*/}
      {myLicenses &&
        myLicenses?.map((license: any) => (
          <div
            key={license.id}
            className="flex items-center justify-between mb-2 border-gray-300 border-[1px] bg-gray-100 rounded-md p-2"
            style={{ fontWeight: "400" }}
          >
            {licenseId === license.id ? (
              <div className="w-full relative">
                <Button
                  onClick={() => setLicenseId(null)}
                  style={{
                    position: "absolute",
                    zIndex: "99",
                    right: "0",
                  }}
                  icon={<CloseOutlined />}
                  className="border-none"
                />
                <Form layout="vertical" size="large" form={presentLicense}>
                  <Row gutter={[16, 16]}>
                    <Col lg={12} md={12} sm={16} xs={20}>
                      <Form.Item
                        name="licenseType"
                        label="License Type"
                        style={{
                          fontStyle: "italic",
                          fontWeight: 600,
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Please select",
                          },
                        ]}
                      >
                        <Select
                          options={licensesOption}
                          placeholder="Select"
                          showSearch
                          size="large"
                          className="rounded-sm"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={16} xs={20}>
                      <Form.Item
                        name="licenseNumber"
                        label="License Number"
                        style={{
                          fontStyle: "italic",
                          fontWeight: 600,
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Please select",
                          },
                        ]}
                      >
                        <Input placeholder="Enter License Number" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={16} xs={20}>
                      <Form.Item
                        name="expirationDate"
                        label="Expiration Date"
                        style={{
                          fontStyle: "italic",
                          fontWeight: 600,
                        }}
                      >
                        <DatePicker />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                <Button
                  className="text-base font-bold my-5"
                  type="primary"
                  size="large"
                  block
                  htmlType="button"
                  onClick={() => updateLicenseInfo(license.id)}
                  loading={updateLoading}
                >
                  Update
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <p>{license.licenseType}</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setLicenseId(license.id);
                    }}
                    className="hover:text-blue-400 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteLicenseInfo(license.id);
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
      {/* EDIT Licenses ENDS*/}

      <Form layout="vertical" form={licenseForm} size="large">
        <Form.List name="userLicenses">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className="flex justify-between gap-6 align-baseline"
                >
                  <div className="flex justify-between gap-2 w-full relative">
                    <Form.Item
                      {...restField}
                      name={[name, "licenseType"]}
                      label="License Type"
                      className="w-1/3"
                      style={{
                        fontStyle: "italic",
                        fontWeight: 600,
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please select",
                        },
                      ]}
                    >
                      <Select
                        options={licensesOption}
                        placeholder="Select"
                        showSearch
                        size="large"
                        className="rounded-sm"
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "licenseNumber"]}
                      label="License Number"
                      style={{
                        fontStyle: "italic",
                        fontWeight: 600,
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please select",
                        },
                      ]}
                    >
                      <Input placeholder="Enter License Number" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "expirationDate"]}
                      label="Expiration Date"
                      className="mt-0"
                      style={{
                        fontStyle: "italic",
                        fontWeight: 600,
                      }}
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Please select",
                      //   },
                      // ]}
                    >
                      <DatePicker />
                    </Form.Item>
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
                  {fields.length > 0 ? "Add More License" : "Add License"}
                </Button>
              </Form.Item>
              <Button
                className="text-base font-bold"
                type="primary"
                size="large"
                block
                // htmlType="submit"
                onClick={saveLicenseInfo}
                loading={loading}
              >
                Save
              </Button>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
};

export default SettingsLicenses;
