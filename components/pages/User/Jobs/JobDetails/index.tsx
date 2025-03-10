"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchSinglejob } from "@/redux/features/JobSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  AccountBookOutlined,
  UserOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import UserDashboardLayout from "@/components/layouts/UserDashboard";
import JobDetailPage from "@/components/pages/JobDetails";
import CardCarousel from "@/components/shared/CardCarousel";
import DashboardHeader from "@/components/shared/dashboardHeader";
import {
  Skeleton,
  Row,
  Col,
  Space,
  Button,
  Avatar,
  Typography,
  Breadcrumb,
} from "antd";
import { useParams, useRouter } from "next/navigation";
import Container from "@/components/shared/container";
import { fetchUserSkills } from "@/redux/features/UserSlice";

const Details = () => {
  const { Paragraph, Title } = Typography;
  const router = useRouter();
  const params = useParams();
  const dispatch: any = useAppDispatch();
  const [job, setJob] = useState<any>();
  const [contactPerson, setContactPerson] = useState<any>();
  const [active, setActive] = useState(true);
  const [workingStyle, setWorkingStyle] = useState<any>();

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
      const res = await dispatch(fetchSinglejob(params?.id));
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
      const workStyle = JSON.parse(job?.workingStyle);
      setContactPerson(contactInfo[0]);
      setWorkingStyle(workStyle);
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

  const skillComparisonFraction =
    jobSkills && `${matchingSkillsCount}/${jobSkills.length}`;

  const satisfactionPercentage =
    jobSkills && jobSkills.length > 0
      ? (matchingSkillsCount / jobSkills.length) * 100
      : 0;

  // console.log(job);
  return (
    <div>
      <section className="content-header">
        <Container className="container-fluid p-6">
          <Breadcrumb
            items={[
              {
                title: "My Jobs",
                href: "/user/jobs",
              },
              { title: "Job Details" },
            ]}
          />
        </Container>
      </section>
      <div className="px-4">
        <DashboardHeader
          title="My Jobs"
          para="Check out Organisations that are making the most impact"
          para2="on Funding, Grants, & Scholarships"
        />
      </div>
      <Skeleton active loading={active} className="m-4">
        <div>
          <section className="xl:px-10 px-5 py-6">
            <Row
              gutter={[16, 32]}
              className="xl:px-10 px-2 xl:py-10 bg-white rounded-lg"
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
                    <Paragraph>{`${job?.state}, ${job?.country}.`} </Paragraph>
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
                        Level - {job?.experienceLevel}
                      </Paragraph>
                    </div>
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
                <div className="flex flex-col gap-4">
                  {contactPerson !== undefined && (
                    <div className="ml-2">
                      <div className="xl:pt-10">
                        <Title level={5}>Contact the Job Poster</Title>
                      </div>

                      <div className="flex flex-col w-full lg:gap-6 lg:flex-row md:flex-col xl:flex-row ">
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
        </div>
      </Skeleton>
      {/* <CardCarousel /> */}
    </div>
  );
};

export default Details;
