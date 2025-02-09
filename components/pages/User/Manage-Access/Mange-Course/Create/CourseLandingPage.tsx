/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  Input,
  Select,
  message,
  Button,
  DatePicker,
  Typography,
  Upload,
  UploadProps,
  Divider,
  Switch,
  Checkbox,
  Radio,
  Space,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import {
  Video_EXT,
  admissionCriteriaOption,
  courseInstitutionalTypeOption,
  courseLevelOption,
  educationLevelsOption,
  featuresOption,
  institutionalOwnershipOption,
  internationalRankingOption,
  languageCertificationRequirementOption,
  languageOption,
  nationalRankingOption,
  programTypeOption,
  qualificationTypeOption,
  studyModeOption,
  studyPaceOption,
  subtitleLanguageOption,
} from "@/components/Constants";
import { Image_EXT } from "@/components/Constants";
import Image from "next/image";
import moment from "moment";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchSkills } from "@/redux/features/UserSlice";
import { RadioChangeEvent } from "antd/lib";

const CourseLandingPage = ({
  next,
  requestBody,
  setRequestBody,
  current,
}: any) => {
  const [form] = Form.useForm();
  const [academicForm] = Form.useForm();
  const [externalUrl] = Form.useForm();
  const [scholarshipUrl] = Form.useForm();
  const { data: session, status } = useSession();
  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isAcademic, setIsAcademic] = useState(false);
  const [associateFree, setAssociateFree] = useState(false);
  const [showExternalOptions, setShowExternalOptions] = useState(false);
  const [showScholarshipOptions, setShowScholarshipOptions] = useState(true);
  const [isExternal, setIsExternal] = useState(false);
  const [isScholarship, setIsScholarship] = useState(false);
  const [value, setValue] = useState("");
  const dispatch: any = useAppDispatch();

  // Media Upload
  const uploadToAPI = async (file: File) => {
    const formData = new FormData();
    formData.append("media", file);

    try {
      if (status === "authenticated" && session?.user?.token) {
        const imgRes = await fetch(`${config.API.API_URL}/media`, {
          method: "POST",
          body: formData,
          headers: {
            "x-token": session?.user?.token,
          },
        });
        if (imgRes.ok) {
          const isImage = file.type?.startsWith("image/");
          const isVideo = file.type?.startsWith("video/");
          if (isImage) {
            await imgRes.json().then((res) => {
              message.success("Image uploaded successfully.");
              setIsUploading(false);
              setImageUrl(res.data.url);
            });
          } else if (isVideo) {
            await imgRes.json().then((res) => {
              message.success("Video uploaded successfully.");
              setIsUploading(false);
              setVideoUrl(res.data.url);
            });
          }
        } else {
          message.error("Image Upload failed.");
        }
      }
    } catch (error) {
      message.error("Image Upload Failed, try again.");
    }
  };

  //Upload Props
  const props: UploadProps = {
    listType: "picture",
    maxCount: 1,
    className: "my-4",
    action: "",
    onChange(info) {
      const { status } = info?.file;

      if (status === "uploading") {
        // check if it already sent
        if (!isUploading) {
          const uploadedFile = info?.file?.originFileObj;
          if (uploadedFile) {
            // check if is alrady set don't set
            uploadToAPI(uploadedFile);
            setIsUploading(true);

            console.log(isUploading);
          }
        }
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log("Dropped files", e?.dataTransfer?.files);
    },
  };
  const imageUploadProps: UploadProps = {
    ...props,
    name: "image",
    accept: Image_EXT,
  };
  const videoUploadProps: UploadProps = {
    ...props,
    name: "video",
    accept: Video_EXT,
  };

  const nextStep = async () => {
    await form.validateFields();

    if (isAcademic) {
      await academicForm.validateFields();
    } else if (isExternal) {
      await externalUrl.validateFields();
    } else if (isScholarship) {
      await scholarshipUrl.validateFields();
    }

    const formData = form.getFieldsValue();
    const academicData = academicForm.getFieldsValue();
    const externalData = externalUrl.getFieldsValue();
    const scholarshipData = scholarshipUrl.getFieldsValue();
    formData["image"] = imageUrl;
    formData["video"] = videoUrl;
    formData["isAssociateFree"] = associateFree;
    formData["isExternal"] = isExternal;
    formData["isScholarship"] = isScholarship;
    const allFormFields = {
      ...formData,
      ...academicData,
      ...externalData,
      ...scholarshipData,
    };
    setRequestBody(allFormFields);
    next();
  };

  useEffect(() => {
    if (requestBody !== undefined) {
      const image = requestBody?.image;
      const video = requestBody?.video;
      setImageUrl(image);
      setVideoUrl(video);
      form.setFieldsValue(requestBody);
      setAssociateFree(requestBody.isAssociateFree);
      if (requestBody?.programRanking) {
        const backendDate = new Date(requestBody?.applicationDeadline);
        const programStart = new Date(requestBody?.programStartDate);
        const formattedProgramStart = moment(programStart);
        const formattedDate = moment(backendDate);
        academicForm.setFieldsValue(requestBody);
        academicForm.setFieldValue("applicationDeadline", formattedDate);
        academicForm.setFieldValue("programStartDate", formattedProgramStart);
      }
    }
  }, [requestBody, current]);

  const handleAcademicProgram = (checked: boolean) => {
    setIsAcademic(checked);
  };

  const freeForAssociate = (e: any) => {
    setAssociateFree(e.target.checked);
  };

  useEffect(() => {
    dispatch(fetchSkills());
  }, []);

  const skillsOption = useAppSelector((state: any) => state.user.skillsOption);
  const handleExternalCourses = (e: RadioChangeEvent) => {
    // setRadioValue(e.target.value);
    if (e?.target?.value) {
      setIsExternal(false);
    } else {
      setIsExternal(true);
    }
    setShowExternalOptions(e?.target?.value);
  };
  const handleScholarship = (e: RadioChangeEvent) => {
    // setRadioValue(e.target.value);
    if (e?.target?.value) {
      setIsScholarship(true);
    } else {
      setIsScholarship(false);
    }
    setShowScholarshipOptions(e?.target?.value);
  };

  return (
    <>
      <Form
        form={form}
        wrapperCol={{
          span: 100,
        }}
        layout="vertical"
        size="large"
      >
        <Form.Item
          required
          label="Course Cover Image"
          rules={[
            {
              validator: (_, fileList) => {
                if (fileList.length === 0) {
                  return Promise.reject(
                    new Error("Please upload an image file")
                  );
                }
                const file = fileList[0];
                const fileType = file.type;
                if (!fileType || !fileType.startsWith("image/")) {
                  return Promise.reject(
                    new Error("Please upload an image file")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <div className="flex flex-col lg:flex-row gap-10">
            <Upload.Dragger
              // customRequest={(e) => dummyRequest(e)}
              {...imageUploadProps}
              className="w-full lg:w-2/3 h-full"
            >
              <div className="flex justify-center items-center">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="coverImage"
                    width={200}
                    height={200}
                    objectFit="contain"
                    objectPosition="center"
                    className="flex justify-center items-center"
                  />
                ) : (
                  <Typography.Title level={1} className="mb-0 text-purple-500">
                    <InboxOutlined className="my-[3em]" />
                  </Typography.Title>
                )}
              </div>
            </Upload.Dragger>
            <div className="flex flex-col items-left justify-center">
              <Typography.Paragraph className="ant-upload-text mb-0">
                Click or drag video file to this area to upload
              </Typography.Paragraph>
              <Typography.Paragraph
                type="secondary"
                className="ant-upload-hint"
              >
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </Typography.Paragraph>
            </div>
          </div>
          <Typography.Paragraph
            type="secondary"
            className="ant-upload-hint pt-4"
          >
            Upload your course image here. It must meet our course image quality
            standards to be accepted. Important guidelines: at least 650x650
            pixels or more; .jpg, .jpeg,. gif, or .png. no text on the image.
          </Typography.Paragraph>
        </Form.Item>
        <Form.Item
          required
          label="Promotional Video"
          rules={[
            {
              validator: (_, fileList) => {
                if (fileList?.length === 0) {
                  return Promise.reject(
                    new Error("Please upload a video file")
                  );
                }
                const file = fileList?.[0];
                const fileType = file?.type;
                if (!fileType || !fileType?.startsWith?.("video/")) {
                  return Promise.reject(
                    new Error("Please upload a video file")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <Upload.Dragger
              // customRequest={(e) => dummyRequest(e)}
              {...videoUploadProps}
              className="w-full lg:w-2/3 h-full"
            >
              <div className="flex justify-center items-center">
                {videoUrl ? (
                  <video
                    src={videoUrl}
                    className="w-full h-full object-center"
                    controls
                  />
                ) : (
                  <Typography.Title level={1} className="mb-0 text-purple-500">
                    <InboxOutlined className="my-[3em]" />
                  </Typography.Title>
                )}
              </div>
            </Upload.Dragger>
            <div className="flex flex-col items-left justify-center">
              <Typography.Paragraph className="ant-upload-text mb-0">
                Click or drag video file to this area to upload
              </Typography.Paragraph>
              <Typography.Paragraph
                type="secondary"
                className="ant-upload-hint pt-4"
              >
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </Typography.Paragraph>
            </div>
          </div>
          <Typography.Paragraph type="secondary" className="ant-upload-hint">
            Student who watch a well-made promo video are 5x more likely to
            enroll in your Course. We&apos;ve seen the statistic go up to 10x
            for exceptionally awesome videos
          </Typography.Paragraph>
        </Form.Item>

        <Form.Item
          name="title"
          label="Course Title"
          rules={[
            {
              required: true,
              message: "Please enter a course title",
            },
            {
              max: 60,
              message: "Course title should not exceed 60 characters",
            },
          ]}
          tooltip="Write a 60 character course title."
          extra="Write a 60 character course title."
        >
          <Input placeholder="Course Title" />
        </Form.Item>
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
          extra="A brief summary of about your Organization."
        >
          <ReactQuill
            theme="snow"
            style={{
              height: "100px",
              marginBottom: "40px",
              maxHeight: "300px",
            }}
            value={value}
            onChange={setValue}
            className="font-normal"
            placeholder="Tell us about your organization..."
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="What Will You Learn"
          rules={[
            {
              required: true,
              message: "Please fill what the Student will learn",
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
            value={value}
            onChange={setValue}
            className="font-normal"
            placeholder="You will learn how to..."
          />
        </Form.Item>
        <Form.Item
          name="requirement"
          label="Requirement"
          rules={[
            {
              required: true,
              message: "Please enter Requirement",
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
            value={value}
            onChange={setValue}
            className="font-normal"
            placeholder="Basic Knowledge of..."
          />
        </Form.Item>
        <Form.Item
          name="target"
          label="Who is this Course for"
          rules={[
            {
              required: true,
              message: "Please Enter those that the Course is meant for",
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
            value={value}
            onChange={setValue}
            className="tw-font-normal"
            placeholder="Meant for..."
          />
        </Form.Item>
        <Form.Item
          name="scope"
          label="Scope"
          rules={[
            {
              required: true,
              message: "Please Enter those that the Course is meant for",
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
            value={value}
            onChange={setValue}
            className="tw-font-normal"
            placeholder="Scope..."
          />
        </Form.Item>
        <Form.Item
          name="skills"
          label="Skills & Expertise"
          rules={[
            {
              required: true,
              message: "Please enter skills and Expertise",
            },
          ]}
        >
          <Select
            mode="tags"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            options={skillsOption}
          />
        </Form.Item>
        <Row gutter={[16, 16]}>
          <Col lg={12}>
            <Form.Item
              name="lang"
              label="Language"
              rules={[
                {
                  required: true,
                  message: "Please select a course Language",
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
          <Col lg={12}>
            <Form.Item
              name="level"
              label="Course Level"
              rules={[
                {
                  required: true,
                  message: "Please select a course level",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select Course Level"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={courseLevelOption}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="mt-10">
          <Divider orientation="left">
            <Typography.Paragraph className="text-base">
              Course Messages
            </Typography.Paragraph>
          </Divider>
          <Typography.Paragraph>
            Write messages to your student that will be sent automatically when
            they join or complete your course to encourage students to engage
            with course content. If you do not wish to send welcome or
            congratulations message, leave the text box blank.
          </Typography.Paragraph>
          <Form.Item
            name="welcomeMessage"
            label="Welcome Message"
            rules={[
              {
                required: true,
                message: "Please write a welcome message",
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
              value={value}
              onChange={setValue}
              className="font-normal"
              placeholder="Welcome to the..."
            />
          </Form.Item>
          <Form.Item
            name="congratulationMessage"
            label="Congratulation Message"
            rules={[
              {
                required: true,
                message: "Please write a congratulatory message",
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
              value={value}
              onChange={setValue}
              className="tw-font-normal"
              placeholder="Congrats on Completing..."
            />
          </Form.Item>
        </div>
        <div className="mb-4">
          <Checkbox
            onChange={freeForAssociate}
            checked={associateFree}
            className="text-base font-semibold"
          >
            Tick, if it&apos;s free for associate users
          </Checkbox>
        </div>
      </Form>
      <div className="ml-2 mb-4">
        <Typography.Paragraph className="font-semibold italic">
          Do you want this to be processed on Unifaires.com?
        </Typography.Paragraph>

        <div>
          <Radio.Group onChange={handleExternalCourses}>
            <Space direction="horizontal">
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Space>
          </Radio.Group>
        </div>
        {!showExternalOptions && (
          <div className="mt-6">
            <Row>
              <Col lg={10}>
                <Form layout="vertical" size="large" form={externalUrl}>
                  <Form.Item
                    required
                    label="Please enter the coure external URL"
                    className="font-semibold italic"
                    name="externalUrl"
                  >
                    <Input placeholder="https://www.bsaf.com/course" />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        )}
      </div>
      <div className="ml-2 mb-4">
        <Typography.Paragraph className="font-semibold italic">
          Do you have a scholarship available for this course?
        </Typography.Paragraph>

        <div>
          <Radio.Group onChange={handleScholarship}>
            <Space direction="horizontal">
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Space>
          </Radio.Group>
        </div>
        {showScholarshipOptions && (
          <div className="mt-6">
            <Row>
              <Col lg={10}>
                <Form layout="vertical" size="large" form={scholarshipUrl}>
                  <Form.Item
                    required
                    label="Please enter the scholarship URL"
                    className="font-semibold italic"
                    name="scholarshipUrl"
                  >
                    <Input placeholder="https://www.bsaf.com/scholarship" />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        )}
      </div>
      <div className="flex flex-row">
        <Typography.Title level={3}> Academic Program </Typography.Title>
        <span className="ml-2 mt-1 ">
          <Switch onChange={handleAcademicProgram} />
        </span>
      </div>
      {isAcademic && (
        <Form layout="vertical" size="large" form={academicForm}>
          <Row gutter={[16, 16]}>
            <Col lg={12}>
              <Form.Item
                name="subtitleLanguage"
                label="Subtitle Language"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please select a Subtile Language",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select Subtitle Language"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={subtitleLanguageOption}
                />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item
                name="levelsOfEducation"
                label="Levels of Education"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please select a course level",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select Course Level"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={educationLevelsOption}
                />
              </Form.Item>
            </Col>
            <div className="px-4">
              <span>
                <span className="font-bold text-base">Note: </span>If no Program
                Start Date or Application Deadline is selected, the default will
                be anytime. Once the deadline is reached, the course will be
                closed.
              </span>
            </div>
            <Col lg={12}>
              <Form.Item
                name="programStartDate"
                label="Program Start Date"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please select a program start date",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item
                name="applicationDeadline"
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
          <Row gutter={[16, 16]}>
            <Col lg={12}>
              <Form.Item
                name="applicationFees"
                label="Application Fee"
                rules={[
                  {
                    required: true,
                    message: "Please select if there is an application fee",
                  },
                ]}
                style={{ fontStyle: "italic", fontWeight: 600 }}
              >
                <Select
                  // mode="tags"
                  allowClear
                  showSearch
                  placeholder="Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      label: "Yes",
                      value: "yes",
                    },
                    {
                      label: "No",
                      value: "no",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item
                name="programRanking"
                label="Program Ranking"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please select program rank",
                  },
                ]}
              >
                <Select
                  // mode="tags"
                  allowClear
                  showSearch
                  placeholder="Select Program Ranking"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    ...internationalRankingOption,
                    ...nationalRankingOption,
                  ]}
                />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item
                name="programType"
                label="Program Type"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please select program type",
                  },
                ]}
              >
                <Select
                  allowClear
                  showSearch
                  placeholder="Select Program Type"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={programTypeOption}
                />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item
                name="qualificationType"
                label="Qualification & Certification Type"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message:
                      "Please select qulification and certification type",
                  },
                ]}
              >
                <Select
                  allowClear
                  showSearch
                  placeholder="Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={qualificationTypeOption}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col lg={12}>
              <Form.Item
                name="studyPace"
                label="Study Pace"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please select pace",
                  },
                ]}
              >
                <Select
                  // mode="tags"
                  allowClear
                  showSearch
                  placeholder="Select Study Pace"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={studyPaceOption}
                />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item
                name="studyMode"
                label="Study Mode"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please select mode",
                  },
                ]}
              >
                <Select
                  // mode="tags"
                  allowClear
                  showSearch
                  placeholder="Select Study Mode"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={studyModeOption}
                />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item
                // name="admissionCreteria"
                label="Admission Creteria"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please select admission creteria",
                  },
                ]}
              >
                <Select
                  allowClear
                  showSearch
                  placeholder="Select Admission Creteria"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={admissionCriteriaOption}
                />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item
                // name="institutionalOwnership"
                label="Institutional Ownership"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                // rules={[
                //   {
                //     required: true,
                //     message: "Please select institutional ownership",
                //   },
                // ]}
              >
                <Select
                  // mode="tags"
                  allowClear
                  showSearch
                  placeholder="Select Institutional Ownership"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={institutionalOwnershipOption}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col lg={12}>
              <Form.Item
                // name="institutionalType"
                label="Course Institutional Type"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                // rules={[
                //   {
                //     required: true,
                //     message: "Please select course institutional type",
                //   },
                // ]}
              >
                <Select
                  // mode="tags"
                  allowClear
                  showSearch
                  placeholder="Select Course Institutional Type"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={courseInstitutionalTypeOption}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={10}>
              <Form.Item
                // name="feature"
                label="Feature"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                // rules={[
                //   {
                //     required: true,
                //     message: "Please select feature",
                //   },
                // ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  showSearch
                  placeholder="Select Feature"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={featuresOption}
                />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item
                // name="certificationOwnership"
                label="Language Certification Ownership"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please select langugage certification ownership",
                  },
                ]}
              >
                <Select
                  allowClear
                  showSearch
                  placeholder="Select Language Certification Ownership"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={languageCertificationRequirementOption}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
      <div className="steps-action flex justify-between items-center">
        <Button
          size="large"
          type="primary"
          className="ml-auto"
          onClick={nextStep}
        >
          Next
        </Button>
      </div>
      {/* <Button
        size="large"
        type="primary"
        icon={<PlusOutlined />}
        className="rounded-md ml-auto flex justify-end items-center"
        onClick={handleFinish}
        loading={loading}
      >
        Save
      </Button> */}
    </>
  );
};

export default CourseLandingPage;
