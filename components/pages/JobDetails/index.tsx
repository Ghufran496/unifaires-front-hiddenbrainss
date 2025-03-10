"use client";

import React from "react";
import {
  Row,
  Col,
  Typography,
  Select,
  Button,
  Space,
  Avatar,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Upload,
  message,
  Skeleton,
} from "antd";
import microsoft from "@/public/images/microsoft.svg";
import Image from "next/image";
import {
  AccountBookOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axios-config";
import { UploadProps } from "antd/lib";
import { ArrowLeft } from "react-iconly";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchSinglejob } from "@/redux/features/JobSlice";
import { uploadToAPI } from "@/app/utils/mediaUpload";
import { handleAxiosError, showError } from "@/app/utils/axiosError";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { fetchUserSkills } from "@/redux/features/UserSlice";
import CardCarousel from "@/components/shared/CardCarousel";
import { RootState } from "@/redux/store";

const JobDetailPage = () => {
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : null;
  const router = useRouter();
  const params = useParams();
  const { Paragraph, Title } = Typography;
  const [job, setJob] = useState<any>();
  const [contactPerson, setContactPerson] = useState<any>();
  const [applyJob, setApplyJob] = useState(false);
  const [active, setActive] = useState(true);
  const [fileUrl, setFileUrl] = useState(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [applyLoading, setApplyLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const dispatch: any = useAppDispatch();

  function formatDate(dateString: string | number | Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const fetchJobDetails = async () => {
    try {
      const res = await dispatch(fetchSinglejob(params?.slug));
      if (res.type === "job/fetchSinglejob/fulfilled") {
        const jobs = res.payload;
        setJob(jobs);
        setActive(false);
      }
    } catch (error) {
      console.error("Error fetching job Details:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchUserSkills());
    if (job) {
      const contactInfo = JSON.parse(job?.contact);
      setContactPerson(contactInfo[0]);
    }
    fetchJobDetails();
  }, [params]);
  const allMySkills = useAppSelector((state: any) => state.user.mySkills);
  const mySkills = allMySkills.map((skill: any) => {
    return skill.skill;
  });

  // console.log(mySkills);
  const hasSkill = (skillId: any) =>
    mySkills.some((skill: any) => skill.id === skillId);
  const jobSkills = job?.skills;

  const matchingSkillsCount = jobSkills
    ? jobSkills.reduce(
        (count: number, skill: any) => count + (hasSkill(skill.id) ? 1 : 0),
        0
      )
    : 0;

  const satisfactionPercentage =
    jobSkills && jobSkills.length > 0
      ? (matchingSkillsCount / jobSkills.length) * 100
      : 0;

  const skillComparisonFraction =
    jobSkills && `${matchingSkillsCount}/${jobSkills.length}`;

  const props: UploadProps = {
    name: "file",
    listType: "picture",
    maxCount: 1,
    className: "my-4",
    action: "",
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
            setIsUploading(true);
            uploadToAPI(uploadedFile).then((res) => {
              setFileUrl(res);
              setIsUploading(false);
            });

            console.log(isUploading);
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

  const handleApplyJob = async () => {
    await form.validateFields();
    const formData = form.getFieldsValue();
    const requestBody = {
      ...formData,
      jobId: job.id,
      meta: [{ key: "resume", value: fileUrl }],
    };

    if (fileUrl) {
      try {
        setApplyLoading(true);
        const res = await axiosInstance.post("/enrol-job", requestBody);

        if (res.status) {
          toast.success("Application Sent");
          router.push("/user/jobs");
          setApplyJob(false);
        }
      } catch (error) {
        handleAxiosError(error);
      } finally {
        setApplyLoading(false);
      }
    } else {
      showError("Upload a File");
    }

    // console.log("here is the request body", requestBody);
  };

  const handleApply = () => {
    if (session) {
      if (job.isUnifaires) {
        setApplyJob(true);
      } else {
        const url = job && job.externalUrl;
        const absoluteUrl = url.startsWith("http") ? url : `https://${url}`;
        window.open(absoluteUrl, "_blank");
      }
    } else {
      router.push(`/login?redirect=${currentPath}`);
    }
  };

  const handleSaveJob = async () => {
    if (session) {
      setSaveLoading(true);
      try {
        const res = await axiosInstance.post("/job-wish", {
          jobId: job.id,
        });

        if (res.status) {
          toast.success("Job Saved");
        }
      } catch (error) {
        handleAxiosError(error);
      }
      setSaveLoading(false);
    } else {
      router.push(`/login?redirect=${currentPath}`);
    }
  };

  const skillGaps = jobSkills
    ? jobSkills.filter((skill: any) => !hasSkill(skill.id))
    : [];

  return (
    <div>
      <section className="pt-2">
        <Row className="py-3 lg:px-10 px-5 rounded-md bg-white border-b-2 border-[#F6F6F6]">
          <Col xl={4} sm={24} xs={24} className="pt-2">
            <Title level={5}>Jobs</Title>
          </Col>
        </Row>
      </section>
      <Skeleton active loading={active} className="m-4">
        <div>
          {!applyJob ? (
            <section className="bg-white xl:px-20 px-5 py-10">
              <Row
                gutter={[16, 32]}
                className="xl:px-10 px-2 xl:py-10 bg-[#F3F5F7] rounded-lg"
              >
                <Col xl={14}>
                  <Row gutter={[16, 16]}>
                    <Col xl={5} className="mt-7">
                      <Image
                        src={job && job.mediaUrl}
                        alt="company Logo"
                        width={300}
                        height={300}
                      />
                    </Col>

                    <Col xl={19} className="pl-5">
                      <Title level={4} className="mt-4">
                        {job?.title}
                      </Title>
                      <Paragraph>
                        {`${job?.state}, ${job?.country}.`}{" "}
                      </Paragraph>
                      <Title level={5}>
                        Date Posted:
                        <span className="text-sm font-light">
                          {" "}
                          {job && formatDate(job.createdAt)}
                        </span>
                      </Title>

                      <Title level={5}>
                        Reference No:
                        <span className="text-sm font-light">
                          {" "}
                          {job?.referenceNo}
                        </span>
                      </Title>
                      <Title level={5}>
                        Application Deadline:
                        <span className="text-sm font-light">
                          {" "}
                          {job && formatDate(job.deadline)}{" "}
                        </span>
                      </Title>
                      <div className="flex items-center space-x-2 mt-4">
                        <AccountBookOutlined className="text-lg" />
                        <Paragraph className="m-0 text-sm">
                          Level-time - {job?.experienceLevel}
                        </Paragraph>
                      </div>
                    </Col>

                    <Col xl={24} className="mt-7">
                      <Space>
                        <Button
                          size="large"
                          className="text-purple-50 border-purple-50"
                          loading={saveLoading}
                          onClick={handleSaveJob}
                        >
                          Save for later
                        </Button>
                        <Button
                          size="large"
                          type="primary"
                          onClick={handleApply}
                        >
                          Apply Now
                        </Button>
                      </Space>
                    </Col>

                    {/* <Col xl={24}>
                <Title level={5}>Job Description</Title>
              </Col> */}
                  </Row>
                  <div className="mt-4">
                    <Col xl={24}>
                      <Title level={5}>About {job?.organizationName}</Title>
                    </Col>

                    <Col xl={20}>
                      <Paragraph className="mt-2 ">
                        {job?.aboutOrganization}
                      </Paragraph>
                    </Col>

                    <Col xl={24}>
                      <Title level={5} className="text-sm">
                        Job Details
                      </Title>
                    </Col>

                    <Col xl={20}>
                      <Paragraph className="mt-2 ">{job?.details}</Paragraph>
                    </Col>
                  </div>
                </Col>

                <Col xl={10} sm={24} xs={24}>
                  <div className="flex flex-col">
                    {contactPerson !== undefined && (
                      <div className="w-full">
                        <div className="xl:pt-20">
                          <Title level={5}>Contact the Job Poster</Title>
                        </div>

                        <div className="flex flex-col w-full gap-4 lg:flex-row md:flex-row ">
                          <div>
                            <Avatar size="large" icon={<UserOutlined />} />
                          </div>

                          <div className="w-full">
                            <Title
                              level={5}
                            >{`${contactPerson?.firstname} ${contactPerson?.lastname}`}</Title>
                            <Paragraph className="m-0">
                              {contactPerson?.address1}
                            </Paragraph>
                            <Paragraph className="m-0 text-blue-700 hover:font-semibold hover:cursor-pointer">
                              {contactPerson?.email}
                            </Paragraph>
                            <Paragraph className="m-0">
                              Organization Center Website
                            </Paragraph>
                            <Paragraph className="m-0">
                              {`${contactPerson?.state}, ${contactPerson?.country}`}
                            </Paragraph>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="pt-5">
                        <Title level={5}>
                          How your skills match according to the job poster
                          criteria ({skillComparisonFraction})
                        </Title>
                      </div>

                      <div>
                        <Title level={5} className="text-[#00A945]">
                          You satified {satisfactionPercentage || 0}% of the
                          skills requirement
                        </Title>
                      </div>

                      <div>
                        <Title level={5} className="font-normal">
                          Skills this role needs
                        </Title>
                      </div>

                      <div className="mb-4">
                        <Space wrap size={[16, 16]}>
                          {jobSkills &&
                            jobSkills.map((skill: any) => (
                              <Button
                                key={skill.id}
                                shape="round"
                                type="primary"
                                className={`${
                                  hasSkill(skill.id)
                                    ? null
                                    : "text-purple-50 bg-[#E3E2F4]"
                                }`}
                              >
                                {skill.name}
                              </Button>
                            ))}
                        </Space>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </section>
          ) : (
            <section className="bg-[#F3F5F7] rounded-lg xl:px-20 px-5 py-10">
              <div className="mb-8">
                <Button
                  type="text"
                  size="large"
                  icon={<ArrowLeft />}
                  className="flex items-center rounded-sm"
                  onClick={() => setApplyJob(false)}
                >
                  Back
                </Button>
              </div>
              <Form layout="vertical" form={form}>
                <div className="flex lg:flex-row md:flex-row flex-col lg:gap-10 md:gap-10 gap-4 w-full">
                  <Form.Item
                    label="First Name"
                    name="firstname"
                    className="w-full"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Enter your firstname",
                      },
                    ]}
                  >
                    <Input
                      placeholder="John "
                      className="rounded-sm bg-inherit p-2"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="lastname"
                    className="w-full"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Enter your lastname",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Doe"
                      className="rounded-sm bg-inherit p-2"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Email Address"
                    name="email"
                    className="w-full"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Enter your email",
                      },
                    ]}
                  >
                    <Input
                      placeholder="johndoe@gmail.com"
                      className="rounded-sm bg-inherit p-2"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Mobile Number"
                    name="phoneNumber"
                    className="w-full"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Enter your number",
                      },
                    ]}
                  >
                    <Input
                      placeholder="+234 7038 3849"
                      className="rounded-sm bg-inherit p-2"
                    />
                  </Form.Item>
                </div>
                <div className="mt-5 flex lg:flex-row md:flex-row flex-col lg:gap-10 md:gap-10 gap-4 w-full">
                  <Form.Item
                    label="Telephone Availability"
                    name="telephoneAvailability"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Enter your telephone availability",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select "
                      // style={{ width: 120 }}
                      // onChange={handleChange}
                      size="large"
                      variant="borderless"
                      className="border-2 rounded-sm bg-inherit "
                      options={[
                        { value: "true", label: "Yes" },
                        { value: "false", label: "No" },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Available from"
                    name="availabilityFrom"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Enter your availability",
                      },
                    ]}
                  >
                    <TimePicker
                      use12Hours
                      format="h:mm A"
                      className="rounded-sm bg-inherit p-2"
                    />
                  </Form.Item>
                  <Form.Item
                    label="UNIFAIRES profile link"
                    name="unifairesProfileLink"
                    className="lg:w-1/3 md:w-1/2 w-full"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Enter your profile link",
                      },
                    ]}
                  >
                    <Input
                      placeholder="paste link here"
                      className="rounded-sm bg-inherit p-2"
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  label="Motivation/Cover Letter"
                  name="coverLetter"
                  className="w-full"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Write a cover letter",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={5}
                    placeholder="write a cover letter"
                    className="rounded-sm bg-inherit p-2"
                  />
                </Form.Item>
                <Typography.Paragraph className="italic text-gray-500">
                  You can also upload up to 20mb attachments and send the
                  application
                </Typography.Paragraph>
                <Form.Item className="w-full">
                  <Upload {...props}>
                    <Button
                      size="large"
                      icon={<UploadOutlined />}
                      className="rounded-sm"
                    >
                      Upload CV/Resume (Compulsory)
                    </Button>
                  </Upload>
                </Form.Item>
                <div className="w=full">
                  <Button
                    type="primary"
                    size="large"
                    className="flex items-center ml-auto rounded-sm"
                    onClick={handleApplyJob}
                    loading={applyLoading}
                  >
                    Apply Now
                  </Button>
                </div>
              </Form>
            </section>
          )}
        </div>
      </Skeleton>

      <CardCarousel skillGaps={skillGaps} />
    </div>
  );
};

export default JobDetailPage;
