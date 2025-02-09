"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchSinglefunding } from "@/redux/features/FundingSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
  AccountBookOutlined,
  UserOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import UserDashboardLayout from "@/components/layouts/UserDashboard";
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

const Details = () => {
  const { Paragraph, Title } = Typography;
  const router = useRouter();
  const dispatch: any = useAppDispatch();
  const [funding, setFunding] = useState<any>();
  const [contactPerson, setContactPerson] = useState<any>();
  const [active, setActive] = useState(true);
  const [workingStyle, setWorkingStyle] = useState<any>();
  const params = useParams();

  function formatDate(dateString: string | number | Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const fetchFundingDetails = async () => {
    try {
      const res = await dispatch(fetchSinglefunding(params.id));
      if (res.type === "funding/fetchSinglefunding/fulfilled") {
        const fundings = res.payload;
        setFunding(fundings);
        setActive(false);
      }
    } catch (error) {
      console.error("Error fetching funding Details:", error);
    }
  };

  useEffect(() => {
    if (funding) {
      const contactInfo = JSON.parse(funding?.contact);
      // const workStyle = JSON.parse(funding?.workingStyle);
      setContactPerson(contactInfo[0]);
      // setWorkingStyle(workStyle);
    }
    fetchFundingDetails();
  }, [params]);

  // console.log(job);
  return (
    <UserDashboardLayout>
      <section className="content-header">
        <Container className="container-fluid p-6">
          <Breadcrumb
            items={[
              {
                title: "My Fundings",
                href: "/user/funding",
              },
              { title: "Funding Details" },
            ]}
          />
        </Container>
      </section>
      <div className="px-4">
        <DashboardHeader
          title="My Fundings"
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
                      src={funding && funding.mediaUrl}
                      alt="company Logo"
                      width={300}
                      height={300}
                    />
                  </Col>

                  <Col xl={19} className="pl-5">
                    <Title level={4} className="mt-4">
                      {funding?.title}
                    </Title>
                    <Paragraph>
                      {`${funding?.state}, ${funding?.country}.`}{" "}
                    </Paragraph>
                    <Title level={5}>
                      Date Posted:
                      <span className="text-sm font-light">
                        {" "}
                        {funding && formatDate(funding.createdAt)}
                      </span>
                    </Title>

                    <Title level={5}>
                      Reference No:
                      <span className="text-sm font-light">
                        {" "}
                        {funding?.referenceNo}
                      </span>
                    </Title>
                    <Title level={5}>
                      Application Deadline:
                      <span className="text-sm font-light">
                        {" "}
                        {funding && formatDate(funding.deadline)}{" "}
                      </span>
                    </Title>
                    <div className="flex items-center space-x-2 mt-4">
                      <AccountBookOutlined className="text-lg" />
                      <Paragraph className="m-0 text-sm">
                        Full-time - Mid-Senior level
                      </Paragraph>
                    </div>
                  </Col>

                  {/* <Col xl={24}>
                <Title level={5}>funding Description</Title>
              </Col> */}
                </Row>
                <div className="mt-4">
                  <Col xl={24}>
                    <Title level={5}>About {funding?.organizationName}</Title>
                  </Col>

                  <Col xl={20}>
                    <Paragraph className="mt-2 ">
                      {funding?.aboutOrganization}
                    </Paragraph>
                  </Col>

                  <Col xl={24}>
                    <Title level={5} className="text-sm">
                      Funding Details
                    </Title>
                  </Col>

                  <Col xl={20}>
                    <Paragraph className="mt-2 ">{funding?.details}</Paragraph>
                  </Col>
                </div>
              </Col>

              <Col xl={10} sm={24} xs={24}>
                <div className="flex flex-col gap-4">
                  {contactPerson !== undefined && (
                    <div className="ml-2">
                      <div className="xl:pt-10">
                        <Title level={5}>Contact the Funding Poster</Title>
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
                  {/* 
                  <div className="pt-5">
                    <Title level={5}>
                      How your skills match according to the job poster criteria
                      (4/11)
                    </Title>
                  </div>

                  <div>
                    <Title level={5} className="text-[#00A945]">
                      You satified 36% of the skills requirement
                    </Title>
                  </div>

                  <div>
                    <Title level={5} className="font-normal">
                      Skills this role needs
                    </Title>
                  </div>

                  <div className="mb-4">
                    <Space wrap size={[16, 16]}>
                      <Button shape="round" type="primary">
                        Java
                      </Button>

                      <Button shape="round" type="primary">
                        Javascript
                      </Button>

                      <Button shape="round" type="primary">
                        Html
                      </Button>

                      <Button shape="round" type="primary">
                        Css
                      </Button>

                      <Button
                        className="text-purple-50 bg-[#E3E2F4]"
                        shape="round"
                      >
                        Jquery
                      </Button>

                      <Button
                        className="text-purple-50 bg-[#E3E2F4]"
                        shape="round"
                      >
                        Python
                      </Button>

                      <Button
                        className="text-purple-50 bg-[#E3E2F4]"
                        shape="round"
                      >
                        React
                      </Button>

                      <Button
                        className="text-purple-50 bg-[#E3E2F4]"
                        shape="round"
                      >
                        Vue
                      </Button>

                      <Button
                        className="text-purple-50 bg-[#E3E2F4]"
                        shape="round"
                      >
                        Mysql
                      </Button>
                    </Space>
                  </div> */}
                </div>
              </Col>
            </Row>
          </section>
        </div>
      </Skeleton>
      <CardCarousel />
    </UserDashboardLayout>
  );
};

export default Details;
