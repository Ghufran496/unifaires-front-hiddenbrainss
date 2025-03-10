/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  Input,
  Select,
  Collapse,
  Typography,
  Divider,
  Upload,
  Button,
  Radio,
  Space,
  RadioChangeEvent,
  message,
  DatePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  fetchCountries,
  fetchCountryStates,
  fetchStateCities,
} from "@/redux/features/CountrySlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams, useRouter } from "next/navigation";
import { fetchSkills } from "@/redux/features/UserSlice";
import {
  educationLevelsOption,
  experienceLevelOption,
  workingStyleOption,
  employeeBenefitOption,
  languageOption,
  jobTypeOption,
} from "@/components/Constants";
import moment from "moment";
import dayjs, { Dayjs } from "dayjs";
import "react-quill/dist/quill.snow.css";
import quillModules from "@/components/shared/QuillTextEditor/QuillTextEditorModule";
import { editJobContext } from "./editContext";
import "highlight.js/styles/monokai-sublime.css";
import "katex/dist/katex.min.css";
import dynamic from "next/dynamic";
import katex from "katex";
if (typeof window !== "undefined") {
  window.katex = katex;
}
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const BasicInfo = () => {
  const jobEditContext = useContext(editJobContext);
  const [form] = Form.useForm();
  const [externalUrl] = Form.useForm();
  const [contactForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState();
  const [profileUrl, setProfileUrl] = useState();
  const [radioValue, setRadioValue] = useState(0);
  const [showYesOptions, setshowYesOptions] = useState(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [deadlineType, setDeadlineType] = useState("anytime");
  const [fixedDeadlineRange, setFixedDeadlineRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);
  const [jobDetailsValue, setJobDetailsValue] = useState("");
  const { RangePicker } = DatePicker;
  const router = useRouter();
  const params = useParams();
  const JobId = params?.JobId;
  const dispatch: any = useAppDispatch();

  const onChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
    setshowYesOptions(e.target.value === 2);
  };

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchSkills());
  }, []);

  const skillsOption = useAppSelector((state: any) => state.user.skillsOption);

  const countries = useAppSelector((state: any) => state.country.countries);
  const countryOptions = countries.map((c: any) => {
    return {
      label: c.name,
      value: c.code,
    };
  });

  const handleSelectedCountry = (countryCode: any) => {
    dispatch(fetchCountryStates(countryCode));
  };

  const handleSelectedState = (stateCode: any) => {
    dispatch(fetchStateCities(stateCode));
  };

  const states = useAppSelector((state: any) => state.country.states);
  const statesOption = states.map((s: any) => {
    return {
      label: s.name,
      value: s.name,
    };
  });
  const cities = useAppSelector((state: any) => state.country.cities);

  const citiesOption = cities.map((s: any) => {
    return {
      label: s.name,
      value: s.name,
    };
  });

  const props = {
    onChange({ file, fileList }: any) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
  };

  const handleDeadlineRadioChange = (e: any) => {
    setDeadlineType(e?.target?.value);
  };

  const handleRangeChange = (
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  ) => {
    const values = form.getFieldsValue();
    if (dates && dates[0] && dates[1]) {
      values.deadlineRange = true;
      setFixedDeadlineRange(dates as [dayjs.Dayjs, dayjs.Dayjs]); // Ensure both dates are valid
    } else {
      values.deadlineRange = null;
      setFixedDeadlineRange(null); // Reset to null if invalid dates
    }
  };

  const handleUpdateJob = async () => {
    let deadlineTypeVal = form.getFieldValue("appDeadlineType");
    let deadlineStartVal, deadlineEndVal;
    if (deadlineTypeVal === "Anytime") {
      deadlineStartVal = dayjs("1970-01-01");
      deadlineEndVal = dayjs("1970-01-01");
    } else if (deadlineTypeVal === "Fixed" && fixedDeadlineRange) {
      deadlineStartVal = fixedDeadlineRange[0];
      deadlineEndVal = fixedDeadlineRange[1];
    }

    // Clear previous error messages
    message.destroy();

    const employmentBenefitsValue = form.getFieldValue("employmentBenefits");
    const workingStyleValue = form.getFieldValue("workingStyle");
    const values = await form.getFieldsValue();
    values.employmentBenefits = employmentBenefitsValue;
    values.workingStyle = workingStyleValue;

    // Additional validation, if needed
    await externalUrl.validateFields();
    setLoading(true);
    // Preparing the data for API request
    const contactInfo = JSON.parse(jobEditContext?.jobInfo?.contact);
    const profileImage = contactInfo.profileMediaUrl;
    const contactData = contactForm.getFieldsValue();
    contactData.profileMediaUrl = profileUrl ? profileUrl : profileImage;
    const isUnifairesUrl = externalUrl.getFieldValue("isUnifairesUrl");
    const isUnifairesEmail = externalUrl.getFieldValue("externalEmail");
    const formData = {
      ...values,
      mediaUrl: logoUrl ? logoUrl : jobEditContext?.jobInfo?.medaiUrl,
      isUnifaires: radioValue === 1 ? true : false,
      externalUrl: radioValue === 2 ? isUnifairesUrl : "",
      externalEmail: radioValue === 3 ? isUnifairesEmail : "",
      contact: [contactData],
      deadline: deadlineStartVal,
      deadlineEnd: deadlineEndVal,
    };
    delete formData.deadlineRange;
    jobEditContext?.handleSave(formData);
  };

  /**
   * Get JSON parse output
   */
  function getJSONParse(inputStr: string = "") {
    try {
      return JSON.parse(inputStr);
    } catch (error) {
      return undefined;
    }
  }

  useEffect(() => {
    if (jobEditContext?.jobInfo) {
      const formData = { ...jobEditContext.jobInfo };
      setDeadlineType(formData?.appDeadlineType);
      if (formData?.appDeadlineType === "Fixed") {
        const dateRange = [
          dayjs(formData?.deadline),
          dayjs(formData?.deadlineEnd),
        ];
        formData.deadlineRange = dateRange;
        setFixedDeadlineRange(dateRange as [Dayjs, Dayjs]);
      }
      const skills = (
        Array.isArray(formData?.skills) ? formData.skills : []
      ).map((skill: any) => skill?.id);
      formData.skills = skills;

      formData.employmentBenefits =
        typeof formData?.employmentBenefits === "string"
          ? getJSONParse(formData.employmentBenefits)
          : formData.employmentBenefits;

      const backendDate = new Date(formData?.deadline);
      const formattedDate = moment(backendDate);
      formData.deadline = formattedDate;
      form.setFieldsValue(formData);
      if (formData.isUnifaires) {
        setRadioValue(1);
      } else {
        if (formData?.externalUrl) {
          setRadioValue(2);
          const url = formData?.externalUrl;
          externalUrl.setFieldValue("isUnifairesUrl", url);
        } else if (formData?.externalEmail) {
          setRadioValue(3);
          const email = formData?.externalEmail;
          externalUrl.setFieldValue("externalEmail", email);
        }
      }
      const contactInfo = JSON.parse(jobEditContext.jobInfo?.contact);
      if (contactInfo !== null) {
        contactForm.setFieldsValue(contactInfo[0]);
      }
    }
  }, [jobEditContext?.jobInfo]);

  return (
    <>
      <Collapse
        accordion
        collapsible="icon"
        defaultActiveKey={["Basic Info"]}
        expandIconPosition="end"
        ghost
      >
        <Collapse.Panel
          key={"Basic Info"}
          header={<Typography.Title level={3}>Basic Info</Typography.Title>}
        >
          <Form
            layout="vertical"
            form={form}
            requiredMark
            size={"large"}
            className="pb-6"
          >
            <div>
              <Form.Item
                name="title"
                label="Job Title"
                // style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter a title",
                  },
                ]}
              >
                <Input placeholder="Job Title" className="p-4" />
              </Form.Item>
              <Form.Item
                name="referenceNo"
                label="Job Reference No."
                // style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter a Reference",
                  },
                ]}
              >
                <Input placeholder="Job Reference No." className="p-4" />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col md={8} xs={24}>
                  <Form.Item
                    name="country"
                    label="Job Country"
                    // style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select a Country",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select Country"
                      onChange={handleSelectedCountry}
                      optionFilterProp="children"
                      filterOption={(input: any, option: any) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={countryOptions}
                    />
                  </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                  <Form.Item
                    name="state"
                    label="Job State or Province"
                    // style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select a State or Province",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select State"
                      onChange={handleSelectedState}
                      optionFilterProp="children"
                      filterOption={(input: any, option: any) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={statesOption}
                    />
                  </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                  <Form.Item
                    name="city"
                    label="Job City"
                    // style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select the Job City",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select City"
                      optionFilterProp="children"
                      filterOption={(input: any, option: any) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={citiesOption}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col md={8} sm={12} xs={24}>
                  <Form.Item
                    name="salary"
                    label="Estimated yearly Salary"
                    // style={{ fontStyle: "italic", fontWeight: 600 }}
                  >
                    <Input type="number" />
                    {/* addonBefore={selectCurrency} */}
                  </Form.Item>
                </Col>
                <Col md={8} sm={12} xs={24}>
                  <Form.Item
                    name="language"
                    label="Job Language"
                    // style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select a language",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      showSearch
                      placeholder="Select Language"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={languageOption}
                    />
                  </Form.Item>
                </Col>
                <Col md={8} sm={12} xs={24}>
                  <Form.Item
                    name="type"
                    label="Job Type"
                    rules={[
                      {
                        required: true,
                        message: "Please select a job type",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select"
                      options={jobTypeOption}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col md={8} sm={12} xs={24}>
                  <Form.Item
                    name="levelOfEducation"
                    label="Levels of Education"
                    rules={[
                      {
                        required: true,
                        message: "Please select a Level of Education",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select"
                      options={educationLevelsOption}
                    />
                  </Form.Item>
                </Col>
                <Col md={8} sm={12} xs={24}>
                  <Form.Item
                    name="experienceLevel"
                    label="Experience Level"
                    rules={[
                      {
                        required: true,
                        message: "Please select a Experience Level",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select"
                      options={experienceLevelOption}
                    />
                  </Form.Item>
                </Col>
                <Col md={8} sm={12} xs={24}>
                  <Form.Item
                    name="workingStyle"
                    label="Working Style"
                    rules={[
                      {
                        required: true,
                        message: "Please select a working style",
                      },
                    ]}
                  >
                    <Select
                      // mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select"
                      options={workingStyleOption}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <Form.Item
                    name="skills"
                    label="Tags & Interest"
                    rules={[
                      {
                        required: true,
                        message: "Please add tags and interest",
                      },
                    ]}
                  >
                    <Select
                      mode="tags"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select"
                      tokenSeparators={[","]}
                      options={skillsOption}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <Form.Item
                    name="employmentBenefits"
                    label="Employee Benefit"
                    rules={[
                      {
                        required: true,
                        message: "Please select employee benefits",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select"
                      options={employeeBenefitOption}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <Form.Item
                    name="appDeadlineType"
                    label="Application Deadline"
                    rules={[
                      {
                        required: true,
                        message: "Please select application deadline",
                      },
                    ]}
                  >
                    <Radio.Group
                      onChange={handleDeadlineRadioChange}
                      value={deadlineType}
                    >
                      <Radio value="Anytime">Anytime</Radio>
                      <Radio value="Fixed">Fixed</Radio>
                      {deadlineType === "Fixed" && (
                        <Form.Item
                          name="deadlineRange"
                          rules={[
                            {
                              required: deadlineType === "Fixed",
                              message: "Please select a valid date range",
                              validator: () => {
                                if (!fixedDeadlineRange) {
                                  return Promise.reject(
                                    "Please select a start and end date."
                                  );
                                }
                                return Promise.resolve();
                              },
                            },
                          ]}
                        >
                          <br />
                          <RangePicker
                            value={fixedDeadlineRange}
                            disabledDate={(current) =>
                              current && current < dayjs().startOf("day")
                            } // Disable past dates
                            onChange={handleRangeChange} // Handle range change
                          />
                        </Form.Item>
                      )}
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Form>
        </Collapse.Panel>
        <Divider className="m-0" />
        <Collapse.Panel
          key={"Job Decription"}
          header={
            <Typography.Title level={3}>Job Description</Typography.Title>
          }
        >
          <Form
            layout="vertical"
            form={form}
            requiredMark
            size={"large"}
            className="pb-6"
          >
            <div>
              <Form.Item
                name="organizationName"
                label="Organization Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter a Organization Name",
                  },
                ]}
              >
                <Input placeholder="Organization Name" />
              </Form.Item>
              <Form.Item
                name="aboutOrganization"
                label="About Organization"
                rules={[
                  {
                    required: true,
                    message: "Please tell us about your Organization",
                  },
                ]}
                extra={
                  <Typography.Paragraph className="text-blue-600 font-bold">
                    Accepted Formats: docx, doc, txt, rtf. Max size: 1mb
                  </Typography.Paragraph>
                }
              >
                <Input.TextArea rows={4} placeholder="About Organization" />
              </Form.Item>
              <Form.Item>
                <Upload listType="picture" {...props}>
                  <Button icon={<UploadOutlined />}>Upload Logo</Button>
                  <p className="ant-upload-hint text-[12px] italic">
                    Image should be 300 * 80px
                  </p>
                  <p className="ant-upload-hint text-[12px] italic">
                    SVG or transparent PNG recommended. GIF, JEG also supported
                  </p>
                </Upload>
              </Form.Item>
              <Form.Item
                name="details"
                label="Job Details"
                rules={[
                  {
                    required: true,
                    message: "Please tell us about Job Details",
                  },
                ]}
                // extra={
                //   <Typography.Paragraph className="text-blue-600 font-bold">
                //     Accepted Formats: docx, doc, txt, rtf. Max size: 1mb
                //   </Typography.Paragraph>
                // }
              >
                {/* <Input.TextArea rows={4} placeholder="Job Details" /> */}
                <ReactQuill
                  theme="snow"
                  style={{
                    height: "100px",
                    marginBottom: "40px",
                    maxHeight: "300px",
                  }}
                  value={jobDetailsValue}
                  onChange={setJobDetailsValue}
                  className="tw-font-normal"
                  placeholder="Job Details"
                  modules={quillModules}
                />
              </Form.Item>
            </div>
          </Form>
        </Collapse.Panel>
        <Divider className="m-0" />
      </Collapse>
      <div className="ml-4">
        <Typography.Paragraph className="font-semibold italic">
          Do you want this to be processed on Unifaires.com?
        </Typography.Paragraph>
        <div>
          <Radio.Group onChange={onChange} value={radioValue}>
            <Space direction="horizontal">
              <Radio value={1}>Yes</Radio>
              <Radio value={2}>No</Radio>
              <Radio value={3}>Email</Radio>
            </Space>
          </Radio.Group>
        </div>
        {radioValue == 2 && (
          <div className="mt-6">
            <Row>
              <Col lg={10}>
                <Form layout="vertical" size="large" form={externalUrl}>
                  <Form.Item
                    required
                    label="Please enter the application URL"
                    className="font-semibold italic"
                    name="isUnifairesUrl"
                    rules={[
                      {
                        required: true,
                        message: "Please enter application url",
                      },
                    ]}
                  >
                    <Input placeholder="https://www.bsaf.com/career/job" />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        )}
        {radioValue === 3 && (
          <div className="mt-6">
            <Row>
              <Col lg={10}>
                <Form layout="vertical" size="large" form={externalUrl}>
                  <Form.Item
                    required
                    label="Please enter the application email"
                    className="font-semibold italic"
                    name="externalEmail"
                    rules={[
                      {
                        required: true,
                        message: "Please entel a valid email",
                      },
                      {
                        type: "email",
                        message: "Please enter a valid email address",
                      },
                    ]}
                  >
                    <Input placeholder="Enter email" />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        )}
      </div>
      <div className="flex flex-row gap-4 mt-4">
        <Button
          type="primary"
          size="large"
          loading={loading}
          onClick={handleUpdateJob}
        >
          Update Job Posting
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={(event) => {
            event.preventDefault();
            const stepNo: number =
              typeof jobEditContext?.steps?.current === "number"
                ? jobEditContext.steps.current
                : 0;
            jobEditContext?.steps?.setCurrent(stepNo + 1);
          }}
        >
          Preview Job Posting
        </Button>
      </div>
    </>
  );
};

export default BasicInfo;
