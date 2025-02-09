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
import {
  languageOption,
  languageProficiencyOption,
} from "@/components/Constants";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import { Form, Row, Col, Select, Button, DatePicker } from "antd";
import Input from "antd/es/input/Input";
import { useEffect, useState } from "react";

const UserLanguages = () => {
  const [form] = Form.useForm();
  const [presentLang] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [langId, setLangId] = useState(null);
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

  const myLanguages = myProfile && myProfile.userlanguages;

  useEffect(() => {
    if (langId !== null) {
      const eachLang = myLanguages.find((exp: any) => exp.id === langId);

      presentLang.setFieldsValue({
        ...eachLang,
      });
      console.log(eachLang);
    }
  }, [langId, presentLang, myLanguages]);

  async function saveLanguageInfo() {
    const vals = form.getFieldsValue();
    const reqBody = vals.languages;

    try {
      setLoading(true);
      const res = await axiosInstance.post("/user-language", reqBody);
      if (res.status) {
        dispatch(fetchUserProfile("user"));
        showSuccess("Language Added");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateLanguageInfo(id: any) {
    const reqBody = presentLang.getFieldsValue();
    try {
      setUpdateLoading(true);
      const res = await axiosInstance.put(`/user-language/${id}`, reqBody);
      if (res.status) {
        dispatch(fetchUserProfile("user"));
        showSuccess("Language Updated");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setUpdateLoading(false);
    }
  }

  async function deleteLanguageInfo(id: any) {
    try {
      setLoading(true);
      const res = await axiosInstance.delete(`/user-language/${id}`);
      if (res.status) {
        dispatch(fetchUserProfile("user"));
        showSuccess("Language Deleted");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {myLanguages &&
        myLanguages?.map((lang: any) => (
          <div
            key={lang.id}
            className="flex items-center justify-between mb-2 border-gray-300 border-[1px] bg-gray-100 rounded-md p-2"
            style={{ fontWeight: "400" }}
          >
            {langId === lang.id ? (
              <div className="w-full relative">
                <Button
                  onClick={() => setLangId(null)}
                  style={{
                    position: "absolute",
                    zIndex: "99",
                    right: "0",
                  }}
                  icon={<CloseOutlined />}
                  className="border-none"
                />
                <Form layout="vertical" size="large" form={presentLang}>
                  <Row gutter={[16, 16]}>
                    <Col lg={12} md={12} sm={16} xs={20}>
                      <Form.Item
                        name="language"
                        label="Language"
                        style={{
                          fontStyle: "italic",
                          fontWeight: 600,
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Please select language",
                          },
                        ]}
                      >
                        <Select
                          options={languageOption}
                          placeholder="Select a Language"
                          size="large"
                          className="rounded-sm"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={16} xs={20}>
                      <Form.Item
                        name="proficiency"
                        label="proficiency"
                        style={{
                          fontStyle: "italic",
                          fontWeight: 600,
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Please select a level",
                          },
                        ]}
                      >
                        <Select
                          options={languageProficiencyOption}
                          placeholder="Select a level"
                          size="large"
                          className="rounded-sm"
                          showSearch
                        />
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
                  onClick={() => updateLanguageInfo(lang.id)}
                  loading={updateLoading}
                >
                  Update
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <p>{lang.language}</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setLangId(lang.id);
                    }}
                    className="hover:text-blue-400 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteLanguageInfo(lang.id);
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

      <Form name="dynamicLanguages" layout="vertical" form={form} size="large">
        <Form.List name="languages">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className="flex justify-between gap-6 align-baseline"
                >
                  <div className="w-full">
                    <Row gutter={[16, 16]}>
                      <Col lg={12} md={12} sm={16} xs={20}>
                        <Form.Item
                          {...restField}
                          name={[name, "language"]}
                          label="Language"
                          style={{
                            fontStyle: "italic",
                            fontWeight: 600,
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please select language",
                            },
                          ]}
                        >
                          <Select
                            options={languageOption}
                            placeholder="Select a Language"
                            size="large"
                            className="rounded-sm"
                            showSearch
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={16} xs={20}>
                        <Form.Item
                          name={[name, "proficiency"]}
                          label="proficiency"
                          style={{
                            fontStyle: "italic",
                            fontWeight: 600,
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please select a level",
                            },
                          ]}
                        >
                          <Select
                            options={languageProficiencyOption}
                            placeholder="Select a level"
                            size="large"
                            className="rounded-sm"
                            showSearch
                          />
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
                  {fields.length > 0 ? "Add More Language" : "Add Language"}
                </Button>
              </Form.Item>
              <Button
                className="text-base font-bold"
                type="primary"
                size="large"
                block
                htmlType="button"
                onClick={saveLanguageInfo}
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

export default UserLanguages;
