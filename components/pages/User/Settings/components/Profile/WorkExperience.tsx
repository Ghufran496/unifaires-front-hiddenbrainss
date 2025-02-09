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
import QuillEditor from "@/components/shared/QuillTextEditor";
import axiosInstance from "@/app/utils/axios-config";
import {
  handleAxiosError,
  showError,
  showSuccess,
} from "@/app/utils/axiosError";
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

const UserWorkExperience = () => {
  const [workForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const dispatch: any = useAppDispatch();
  const [experienceId, setExperienceId] = useState(null);
  const [currentlyWorkHere, setCurrentlyWorkHere] = useState(false);
  const [contentLength, setContentLength] = useState(0);
  const charLimit = 300;

  const myProfile: any = useAppSelector(
    (state: RootState) => state.user.myProfile
  );
  // console.log(myProfile);
  const myWorkExperiences = myProfile && myProfile.workexperiences;

  useEffect(() => {
    if (experienceId !== null) {
      const eachExp = myWorkExperiences.find(
        (exp: any) => exp.id === experienceId
      );

      workForm.setFieldsValue({
        ...eachExp,
        startDate: eachExp ? dayjs(eachExp.startDate) : null,
        endDate: eachExp ? dayjs(eachExp.endDate) : null,
      });
      console.log(eachExp);
    }
  }, [experienceId, workForm, myWorkExperiences]);

  const onChangeCurrentWorkHere = () => {
    setCurrentlyWorkHere(!currentlyWorkHere);
  };

  async function saveWorkInfo() {
    const vals = workForm.getFieldsValue();
    const reqBody = vals.workExperiences.map((ex: any) => {
      return {
        ...ex,
        currentWorkHere: currentlyWorkHere,
      };
    });

    try {
      setLoading(true);
      const res = await axiosInstance.post("/work-experience", reqBody);

      if (res.status) {
        showSuccess("Work Experience Added");
        dispatch(fetchUserProfile("user"));
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateWorkExpInfo(id: any) {
    const reqBody = workForm.getFieldsValue();
    reqBody.currentWorkHere = currentlyWorkHere;
    // console.log(reqBody);

    try {
      setUpdateLoading(true);
      const res = await axiosInstance.put(`/work-experience/${id}`, reqBody);

      if (res.status) {
        showSuccess("Work Experience Updated");
        dispatch(fetchUserProfile("user"));
        setExperienceId(null);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setUpdateLoading(false);
    }
  }

  async function deleteWorkExpInfo(id: any) {
    try {
      const res = await axiosInstance.delete(`/work-experience/${id}`);
      if (res.status) {
        showSuccess("Work Experience Deleted Successfully");
        dispatch(fetchUserProfile("user"));
      }
    } catch (error) {
      handleAxiosError(error);
    }
  }

  const handleContentChange = (content: string) => {
    setContentLength(content.length);
  };

  const stripHtmlTags = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const handleTextChange = (e: any) => {
    const onlyText = stripHtmlTags(e);
    if (onlyText.length === charLimit) {
      showError("You've reached the max limit");
    }
  };

  return (
    <div>
      <Form layout="vertical" form={workForm}>
        {/* EDIT WORK EXPERIENCE STARTS*/}
        {myWorkExperiences &&
          myWorkExperiences?.map((work: any) => (
            <div
              key={work.id}
              className="flex items-center justify-between mb-2 border-gray-300 border-[1px] bg-gray-100 rounded-md p-2"
              style={{ fontWeight: "400" }}
            >
              {experienceId === work.id ? (
                <div className="w-full relative">
                  <Button
                    onClick={() => setExperienceId(null)}
                    style={{
                      position: "absolute",
                      zIndex: "99",
                      right: "0",
                    }}
                    icon={<CloseOutlined />}
                    className="border-none"
                  />
                  <Form.Item
                    name="company"
                    label="Company"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please enter company name",
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
                    name="position"
                    label="Position"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please enter position",
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
                    name="city"
                    label="City/Town"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please enter city or town ",
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
                    name="country"
                    label="Country"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please enter Country",
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
                    name="description"
                    label="Description"
                    style={{ fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please enter job description",
                      },
                    ]}
                  >
                    <QuillEditor
                      form={workForm}
                      name="description"
                      maxLength={charLimit}
                      onContentChange={handleContentChange}
                      // className="font-normal h-[300px]"
                    />
                    <div>
                      <Typography.Paragraph className="mt-1 text-blue-600 italic">
                        {contentLength}/{charLimit} characters
                      </Typography.Paragraph>
                    </div>
                  </Form.Item>
                  <Typography.Paragraph className="font-semibold text-lg">
                    Time Period
                  </Typography.Paragraph>
                  <Row gutter={[16, 16]}>
                    <Col lg={10}>
                      <Form.Item
                        name="startDate"
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
                    {!currentlyWorkHere && (
                      <Col lg={10}>
                        <Form.Item
                          label="End Date"
                          name="endDate"
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
                  <Form.Item name="currentWorkHere">
                    <Checkbox
                      className="font-normal"
                      onChange={onChangeCurrentWorkHere}
                    >
                      I currently work here
                    </Checkbox>
                  </Form.Item>
                  <Button
                    className="text-base font-bold my-5"
                    type="primary"
                    size="large"
                    block
                    htmlType="button"
                    onClick={() => updateWorkExpInfo(work.id)}
                    loading={updateLoading}
                  >
                    Update
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <p>{work.company}</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setExperienceId(work.id);
                      }}
                      className="hover:text-blue-400 font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteWorkExpInfo(work.id);
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
        {/* EDIT WORK EXPERIENCE ENDS*/}

        {/* CREATE WORK EXPERIENCE STARTS */}
        <Form.List name="workExperiences">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="flex">
                  <div className="w-full relative">
                    <Form.Item
                      name={[name, "company"]}
                      label="Company"
                      style={{ fontStyle: "italic", fontWeight: 600 }}
                      rules={[
                        {
                          required: true,
                          message: "Please enter company name",
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
                      name={[name, "position"]}
                      label="Position"
                      style={{ fontStyle: "italic", fontWeight: 600 }}
                      rules={[
                        {
                          required: true,
                          message: "Please enter position",
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
                      name={[name, "city"]}
                      label="City/Town"
                      style={{ fontStyle: "italic", fontWeight: 600 }}
                      rules={[
                        {
                          required: true,
                          message: "Please enter city or town ",
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
                      name={[name, "country"]}
                      label="Country"
                      style={{ fontStyle: "italic", fontWeight: 600 }}
                      rules={[
                        {
                          required: true,
                          message: "Please enter Country",
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
                      name={[name, "description"]}
                      label="Description"
                      style={{ fontWeight: 600 }}
                      rules={[
                        {
                          required: true,
                          message: "Please enter job description",
                        },
                      ]}
                    >
                      <ReactQuill
                        theme="snow"
                        className="font-normal"
                        placeholder="Job Description..."
                        onChange={handleTextChange}
                      />

                      <div>
                        <Typography.Paragraph className="mt-1 text-blue-600 italic">
                          {charLimit} Max characters
                        </Typography.Paragraph>
                      </div>
                    </Form.Item>
                    <Typography.Paragraph className="font-semibold text-lg">
                      Time Period
                    </Typography.Paragraph>
                    <Row gutter={[16, 16]}>
                      <Col lg={10}>
                        <Form.Item
                          name={[name, "startDate"]}
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
                      {!currentlyWorkHere && (
                        <Col lg={10}>
                          <Form.Item
                            name={[name, "endDate"]}
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
                    <Form.Item name="currentWorkHere">
                      <Checkbox
                        className="font-normal"
                        value={currentlyWorkHere}
                        onChange={onChangeCurrentWorkHere}
                      >
                        I currently work here
                      </Checkbox>
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
                  {fields.length > 0
                    ? "Add More Work Experience"
                    : "Add Work Experience"}
                </Button>
              </Form.Item>
              <Button
                className="text-base font-bold"
                type="primary"
                size="large"
                block
                htmlType="button"
                onClick={saveWorkInfo}
                loading={loading}
              >
                Save
              </Button>
            </>
          )}
        </Form.List>
        {/* CREATE WORK EXPERIENCE */}
      </Form>
    </div>
  );
};

export default UserWorkExperience;
