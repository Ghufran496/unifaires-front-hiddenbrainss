/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useContext, useEffect, useState } from "react";
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
  DatePicker,
  Radio,
  Space,
  UploadProps,
  RadioChangeEvent,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import {
  educationLevelsOption,
  employeeBenefitOption,
  experienceLevelOption,
  jobTypeOption,
  languageOption,
  workingStyleOption,
} from "@/components/Constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchCountries,
  fetchCountryStates,
  fetchStateCities,
} from "@/redux/features/CountrySlice";
import { uploadToAPI } from "@/app/utils/mediaUpload";
import { fetchSkills } from "@/redux/features/UserSlice";
import dayjs, { Dayjs } from "dayjs";
import { createJobContext } from "./createJobContext";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/monokai-sublime.css";
import "katex/dist/katex.min.css";
import quillModules from "@/components/shared/QuillTextEditor/QuillTextEditorModule";
import katex from "katex";
if (typeof window !== "undefined") {
  window.katex = katex;
}
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const BasicInfo = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [accordionActiveIndex, setAccordionActiveIndex] = useState<string>("1");
  const [externalUrl] = Form.useForm();
  const [contactForm] = Form.useForm();
  const { data: session, status } = useSession();
  const [radioValue, setRadioValue] = useState<any>(1);
  const [logoUrl, setLogoUrl] = useState();
  const [profileUrl, setProfileUrl] = useState();
  const [showYesOptions, setShowYesOptions] = useState(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const dispatch: any = useAppDispatch();
  const [jobDetailsValue, setJobDetailsValue] = useState("");
  const [deadlineType, setDeadlineType] = useState("anytime");
  const [fixedDeadlineRange, setFixedDeadlineRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);
  const { RangePicker } = DatePicker;
  const addJobContext = useContext(createJobContext);

  const onChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
    setShowYesOptions(e.target.value === 0);
  };

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchSkills());
  }, []);

  const skillsOption = useAppSelector((state: any) => state.user.skillsOption);

  useEffect(() => {
    if (typeof addJobContext?.steps?.requestBody !== undefined) {
      form.setFieldsValue(addJobContext.steps.requestBody);
      const contactInfo = addJobContext.steps.requestBody?.contact?.[0];
      if (contactInfo) {
        contactForm.setFieldsValue(contactInfo);
      }
    }
  }, [addJobContext?.steps?.requestBody]);

  const countries = useAppSelector((state: any) => state.country.countries);
  const countryOptions = countries.map((c: any) => {
    return {
      label: c.name,
      value: c.name,
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

  const selectCurrency = (
    <Select
      showSearch
      placeholder="Select Currency"
      optionFilterProp="children"
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={[
        {
          value: "USD",
          label: "USD",
        },
        {
          value: "NGN",
          label: "NGN",
        },
        {
          value: "EURO",
          label: "EURO",
        },
      ]}
    />
  );

  const props: UploadProps = {
    name: "image",
    multiple: false,
    onChange(info) {
      const { status } = info.file;
      if (status === "uploading") {
        if (!isUploading) {
          const uploadedFile = info.file.originFileObj;
          if (uploadedFile) {
            // check if is alrady set don't set
            uploadToAPI(uploadedFile).then((res) => {
              setLogoUrl(res);
              setIsUploading(false);
            });
          }
        }
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const contactProps: UploadProps = {
    name: "image",
    multiple: false,
    onChange(info) {
      const { status } = info.file;

      console.log(status);
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "uploading") {
        // check if it already sent
        if (!isUploading) {
          const uploadedFile = info.file.originFileObj;
          if (uploadedFile) {
            // check if is alrady set don't set
            uploadToAPI(uploadedFile).then((res) => {
              setProfileUrl(res);
              setIsUploading(false);
            });
          }
        }
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleDeadlineRadioChange = (e: any) => {
    setDeadlineType(e.target.value);
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

  const nextStep = async () => {
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
    await form.validateFields();
    await contactForm.validateFields();

    const employmentBenefitsValue = form.getFieldValue("employmentBenefits");
    const workingStyleValue = form.getFieldValue("workingStyle");
    // const values = await form.getFieldsValue();
    const values = form.getFieldsValue();

    values.deadline = deadlineStartVal;
    values.deadlineEnd = deadlineEndVal;

    values.employmentBenefits = employmentBenefitsValue;
    values.workingStyle = workingStyleValue;

    // Additional validation, if needed
    if (radioValue === 0) {
      await externalUrl.validateFields();
    }
    if (accordionActiveIndex === "1") {
      setAccordionActiveIndex("2");
      return;
    }
    setLoading(true);
    // Preparing the data for API request
    const contactData = contactForm.getFieldsValue();
    contactData.profileMediaUrl = profileUrl ? profileUrl : "";
    const isUnifairesUrl = externalUrl.getFieldValue("isUnifairesUrl");
    const isUnifairesEmail = externalUrl.getFieldValue("externalEmail");
    let formData;
    let mediaUrl: any = logoUrl;
    if (
      !(typeof mediaUrl === "string" && mediaUrl.trim() !== "") &&
      typeof addJobContext?.steps?.requestBody?.medaiUrl === "string" &&
      addJobContext.steps.requestBody.medaiUrl.trim() !== ""
    ) {
      mediaUrl = addJobContext.steps.requestBody.medaiUrl.trim();
    }
    formData = {
      ...values,
      status: "opened",
      mediaUrl,
      isUnifaires: radioValue === 1 ? true : false,
      externalUrl: radioValue === 0 ? isUnifairesUrl : "",
      externalEmail: radioValue === 2 ? isUnifairesEmail : "",
      contact: [contactData],
    };
    delete formData.deadlineRange;

    addJobContext?.steps?.setRequestBody(formData);
    addJobContext?.steps?.nextPage?.();
  };

  return (
    <>
      <Collapse
        accordion
        activeKey={accordionActiveIndex}
        onChange={(activeKey) => {
          switch (activeKey[0]) {
            case "1":
              setAccordionActiveIndex("1");
              break;
            case "2":
              setAccordionActiveIndex("2");
              break;
            default:
              // Do nothing
              break;
          }
        }}
        collapsible="icon"
        defaultActiveKey={["1"]}
        expandIconPosition="end"
        ghost
      >
        <Collapse.Panel
          key={"1"}
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
                  <Form.Item name="salary" label="Estimated yearly Salary">
                    <Input type="number" placeholder="Price in USD" />
                  </Form.Item>
                </Col>
                <Col md={8} sm={12} xs={24}>
                  <Form.Item
                    name="language"
                    label="Job Language"
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
                              type: "array" as const,
                              required: true,
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
                            }
                            onChange={handleRangeChange}
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
          key={"2"}
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
              >
                <ReactQuill
                  theme="snow"
                  style={{
                    height: "100px",
                    marginBottom: "40px",
                    maxHeight: "300px",
                  }}
                  value={jobDetailsValue}
                  onChange={setJobDetailsValue}
                  className="font-normal"
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
              <Radio value={0}>No</Radio>
              <Radio value={2}>Email</Radio>
            </Space>
          </Radio.Group>
        </div>
        {showYesOptions && (
          <div className="mt-6">
            <Row>
              <Col lg={10}>
                <Form layout="vertical" size="large" form={externalUrl}>
                  <Form.Item
                    required
                    label="Please enter the application URL"
                    className="font-semibold italic"
                    name="isUnifairesUrl"
                  >
                    <Input placeholder="https://www.bsaf.com/career/job" />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        )}
        {radioValue === 2 && (
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
                        message: "Please select an Email",
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
          onClick={nextStep}
          className="ml-auto"
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default BasicInfo;
