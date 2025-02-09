"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";
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
import axiosInstance from "@/app/utils/axios-config";
import { useParams, useRouter } from "next/navigation";
import { fetchSkills } from "@/redux/features/UserSlice";
import {
  educationLevelsOption,
  experienceLevelOption,
  workingStyleOption,
  employeeBenefitOption,
  languageOption,
  fundingPurposeOption,
} from "@/components/Constants";
import { UploadProps } from "antd/lib/upload";
import { uploadToAPI } from "@/app/utils/mediaUpload";
import { FundingContext } from "../FundingContext";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";

interface FundingBasicInfoInt {
  next: Function;
}

const FundingBasicInfo = ({ next }: FundingBasicInfoInt) => {
  const [form] = Form.useForm();
  const [externalUrl] = Form.useForm();
  const [contactForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { fundingData, fetchFundingData } = useContext(FundingContext);
  const [logoUrl, setLogoUrl] = useState();
  const [profileUrl, setProfileUrl] = useState();
  const [radioValue, setRadioValue] = useState(0);
  const [showPaidOptions, setShowPaidOptions] = useState(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams();
  const FundingId = params.FundingId;
  const dispatch: any = useAppDispatch();

  const onChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
    setShowPaidOptions(e.target.value === 2);
  };

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchSkills());
  }, []);

  const skillsOption = useAppSelector((state: any) => state.user.skills);

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

  const props = {
    onChange({ file, fileList }: any) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
  };

  // const handlePreviewFunding = () => {
  //   next();
  // };

  const handleUpdatePosting = async () => {
    try {
      // Clear previous error messages
      message.destroy();

      const values = await form.getFieldsValue();

      // Additional validation, if needed
      if (radioValue === 0) {
        await externalUrl.validateFields();
      }
      setLoading(true);
      // Preparing the data for API request
      const contactInfo = JSON.parse(fundingData.data.contact);
      const profileImage = contactInfo.profileMediaUrl;
      const contactData = contactForm.getFieldsValue();
      contactData.profileMediaUrl = profileUrl ? profileUrl : profileImage;
      const isUnifairesUrl = externalUrl.getFieldValue("isUnifairesUrl");
      const formData = {
        ...values,
        status: "active",
        mediaUrl: logoUrl ? logoUrl : fundingData.data.medaiUrl,
        isUnifaires: radioValue === 1 ? true : false,
        externalUrl: isUnifairesUrl,
        contact: [contactData],
      };

      const response = await axiosInstance.put(
        `/funding/user/${FundingId}`,
        formData
      );

      if (response.status) {
        next();
        showSuccess("Funding Updated Successfully");
      }
    } catch (error) {
      // Handle validation errors
      handleAxiosError(error);
      // message.error("Please fill in all required fields.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (fundingData?.data) {
      const formData = fundingData.data;
      form.setFieldsValue(formData);
      if (formData.isUnifaires) {
        setRadioValue(1);
      } else {
        setRadioValue(2);
        const url = formData.externalUrl;
        externalUrl.setFieldValue("isUnifairesUrl", url);
      }
      const contactInfo = JSON.parse(fundingData.data.contact);
      if (contactInfo !== null) {
        contactForm.setFieldsValue(contactInfo[0]);
      }
    } else {
      console.log("Unable to access data");
    }
  }, [fundingData?.data, form]);

  return (
    <Fragment>
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
                label="Funding Title"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter a title",
                  },
                ]}
              >
                <Input placeholder="BASF AG" className="p-4" />
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
                <Input placeholder="BASF AG" className="p-4" />
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
                <Input type="number" />
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
                  {/* <Form.Item
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
                  </Form.Item> */}
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
                        required: true,
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
              <Radio value={2}>No</Radio>
            </Space>
          </Radio.Group>
        </div>
        {radioValue == 2 && (
          <div className="mt-6">
            <Row>
              <Col lg={10}>
                <Form.Item
                  required
                  label="Please enter the application URL"
                  className="font-semibold italic"
                  name="applicationURL"
                >
                  <Input placeholder="https://www.bsaf.com/career/Funding" />
                </Form.Item>
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
          onClick={handleUpdatePosting}
        >
          Update Funding Posting
        </Button>
        <Button type="primary" size="large" onClick={() => next()}>
          Preview Funding Posting
        </Button>
      </div>
    </Fragment>
  );
};

export default FundingBasicInfo;
