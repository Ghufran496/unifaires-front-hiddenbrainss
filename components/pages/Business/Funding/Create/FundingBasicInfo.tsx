/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { Fragment, useEffect, useState, useCallback } from "react";
// next components
// import NextLink from "next/link";
// antd components
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
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import Country from "@/components/shared/CountryList/countryList";
import {
  educationLevelsOption,
  employeeBenefitOption,
  experienceLevelOption,
  fundingPurposeOption,
  languageOption,
  skillsOption,
  workingStyleOption,
} from "@/components/Constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchCountries,
  fetchCountryStates,
  fetchStateCities,
} from "@/redux/features/CountrySlice";
import axiosInstance from "@/app/utils/axios-config";
import { uploadToAPI } from "@/app/utils/mediaUpload";
import { fetchSkills } from "@/redux/features/UserSlice";

interface FundingBasicInfoInt {
  next: Function;
  requestBody: any;
  current: any;
  setRequestBody: any;
}

const FundingBasicInfo = ({
  next,
  requestBody,
  setRequestBody,
  current,
}: FundingBasicInfoInt) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [externalUrl] = Form.useForm();
  const [contactForm] = Form.useForm();
  const { data: session, status } = useSession();
  const [radioValue, setRadioValue] = useState<any>(1);
  const [logoUrl, setLogoUrl] = useState();
  const [profileUrl, setProfileUrl] = useState();
  const [showYesOptions, setShowYesOptions] = useState(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const dispatch: any = useAppDispatch();

  const onChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
    setShowYesOptions(e.target.value === 0);
  };

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchSkills());
  }, []);

  const skillsOption = useAppSelector((state: any) => state.user.skills);

  useEffect(() => {
    if (requestBody !== undefined) {
      console.log(requestBody);
      form.setFieldsValue(requestBody);
      const contactInfo = requestBody.contact[0];
      if (contactInfo !== null) {
        contactForm.setFieldsValue(contactInfo);
      }
    } else {
      console.log("No request body yet");
    }
  }, [requestBody]);

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
              setLogoUrl(res);
              setIsUploading(false);
            });

            // console.log(isUploading);
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

            // console.log(isUploading);
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

  

  const nextStep = async () => {
    // Clear previous error messages
    message.destroy();
    await form.validateFields();
    await contactForm.validateFields();
    // const values = await form.getFieldsValue();
    const values = form.getFieldsValue();

    // Additional validation, if needed
    if (radioValue === 0) {
      await externalUrl.validateFields();
    }
    setLoading(true);
    // Preparing the data for API request
    const contactData = contactForm.getFieldsValue();
    contactData.profileMediaUrl = profileUrl ? profileUrl : "";
    const isUnifairesUrl = externalUrl.getFieldValue("isUnifairesUrl");
    let formData;
    if (radioValue === 0) {
      formData = {
        ...values,
        status: "active",
        mediaUrl: logoUrl ? logoUrl : requestBody.medaiUrl,
        isUnifaires: radioValue === 1 ? true : false,
        externalUrl: isUnifairesUrl,
        contact: [contactData],
      };
    } else {
      formData = {
        ...values,
        status: "active",
        mediaUrl: logoUrl ? logoUrl : requestBody.medaiUrl,
        isUnifaires: radioValue === 1 ? true : false,
        contact: [contactData],
      };
    }

    setRequestBody(formData);
    next();

  };

  const [isExpanded, setExpand] = useState<boolean>();
  
  // const handleExpandToggle = useCallback(() => {
  //   setExpand(!isExpanded);
  // }, [isExpanded]);


  

  return (
    <Fragment>
      <Collapse
        accordion
        collapsible="header"
        defaultActiveKey={["Basic Info"]}
        expandIconPosition="end"
        // onClick={handleExpandToggle}
        // expandIcon={}
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
                label="Funding Title"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter a title",
                  },
                ]}
              >
                <Input placeholder="Funding Title" className="p-4" />
              </Form.Item>
              <Form.Item
                name="referenceNo"
                label="Funding Reference No."
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter a Reference",
                  },
                ]}
              >
                <Input placeholder="Funding Reference No." className="p-4" />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col lg={6}>
                  <Form.Item
                    name="country"
                    label="Funding Country"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
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
                <Col lg={6}>
                  <Form.Item
                    name="state"
                    label="Funding State or Province"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
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
                <Col lg={6}>
                  <Form.Item
                    name="city"
                    label="Funding City"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select the Funding City",
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
              <Form.Item
                name="size"
                label="Estimated Funding Size"
                style={{ fontStyle: "italic", fontWeight: 600 }}
              >
                <Input type="number" placeholder="Price in USD" />
                {/* addonBefore={selectCurrency} */}
              </Form.Item>
              {/* New Addion */}
              <Row gutter={[16, 16]}>
                <Col lg={10}>
                  <Form.Item
                    name="language"
                    label="Funding Language"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select a language",
                      },
                    ]}
                  >
                    <Select
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
                <Col lg={10}>
                  <Form.Item
                    name="deadline"
                    label="Application Deadline"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select deadline",
                      },
                    ]}
                  >
                    <DatePicker />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="fundingPurpose"
                label="Funding Purpose"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please select a purpose",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select purpose"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={fundingPurposeOption}
                />
              </Form.Item>

              {/* End of New Addition */}
            </div>
          </Form>
        </Collapse.Panel>
        <Divider className="m-0" />
        <Collapse.Panel
          key={"Funding Decription"}
          header={
            <Typography.Title level={3}>Funding Description</Typography.Title>
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
                label="Funding Details"
                rules={[
                  {
                    required: true,
                    message: "Please tell us about Funding Details",
                  },
                ]}
                extra={
                  <Typography.Paragraph className="text-blue-600 font-bold">
                    Accepted Formats: docx, doc, txt, rtf. Max size: 1mb
                  </Typography.Paragraph>
                }
              >
                <Input.TextArea rows={4} placeholder="Funding Details" />
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
            </div>
          </Form>
        </Collapse.Panel>
        <Divider className="m-0" />
        <Collapse.Panel
          key={"Contact Person"}
          header={<Typography.Title level={3}>Contact Person</Typography.Title>}
        >
          <Form
            layout="vertical"
            form={contactForm}
            requiredMark
            size={"large"}
            className="pb-6"
          >
            <div>
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
                <Input placeholder="BASF AG" className="p-4" />
              </Form.Item>
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
                <Input placeholder="BASF AG" className="p-4" />
              </Form.Item>
              <Form.Item
                name="address1"
                label="Address Line 1"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter an Address",
                  },
                ]}
              >
                <Input placeholder="BASF AG" className="p-4" />
              </Form.Item>
              <Form.Item
                name="address2"
                label="Address Line 2"
                style={{ fontStyle: "italic", fontWeight: 600 }}
              >
                <Input placeholder="BASF AG" className="p-4" />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col lg={10}>
                  <Form.Item
                    name="country"
                    label="Country"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
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
                      optionFilterProp="children"
                      onChange={handleSelectedCountry}
                      filterOption={(input: any, option: any) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={countryOptions}
                    />
                  </Form.Item>
                </Col>
                <Col lg={10}>
                  <Form.Item
                    name="state"
                    label="State"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select a State",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select State"
                      optionFilterProp="children"
                      onChange={handleSelectedState}
                      filterOption={(input: any, option: any) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={statesOption}
                    />
                  </Form.Item>
                </Col>
                <Col lg={10}>
                  <Form.Item
                    name="city"
                    label="City"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select a City",
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
                <Col lg={10}>
                  <Form.Item
                    name="zipcode"
                    label="Zip Code"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select the Zip Code",
                      },
                    ]}
                  >
                    <Input placeholder="9394" />
                  </Form.Item>
                </Col>

                <Col lg={10}>
                  <Form.Item
                    name="email"
                    label="Email"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select an Email",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Email" />
                  </Form.Item>
                </Col>
                <Col lg={10}>
                  <Form.Item
                    name="profileMediaUrl"
                    label="Upload Profile Picture (optional)"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: false,
                        message: "Please upload a Picture",
                      },
                    ]}
                  >
                    <Upload {...contactProps}>
                      <Button type="default" size="middle">
                        Upload File
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Form>
        </Collapse.Panel>
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
                    <Input placeholder="https://www.bsaf.com/career/Funding" />
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
          // loading={loading}
        >
          Next
        </Button>
      </div>
    </Fragment>
  );
};

export default FundingBasicInfo;
