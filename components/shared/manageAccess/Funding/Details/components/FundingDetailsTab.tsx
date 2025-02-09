"use client";
import {
  ClockCircleOutlined,
  UsergroupAddOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import Container from "@/components/shared/container";
import ImageComponent from "@/components/shared/image";
import { Row, Col, Typography } from "antd";
import JobsImage from "@/public/images/courses/laravel.jpg";

const JobDetailsTab = ({ funding }: any) => {
  function formatDate(dateString: string | number | Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return (
    <div>
      <section className="content-hero border-b mb-6">
        <Container fluid className="px-6 pb-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16} xxl={18}>
              <div className="flex justify-start items-start gap-4">
                <div className="relative shrink-0 rounded-md aspect-square w-24 h-24 bg-grey-200 overflow-hidden">
                  <ImageComponent
                    layout="fill"
                    objectFit="cover"
                    // src={JobsImage}
                    src={funding.mediaUrl}
                    alt="paris picture"
                  />
                </div>
                <div className="grow">
                  <Typography.Title level={1} className="mb-2 text-3xl">
                    {funding?.title}
                  </Typography.Title>
                  <Typography.Paragraph className="mb-2 max-w-xl text-lg opacity-90">
                    {funding?.state} - {funding?.country}
                  </Typography.Paragraph>
                  <div className="flex gap-3 flex-wrap items-center mb-4">
                    <Typography.Text className="flex items-center gap-1 flex-nowrap">
                      <ClockCircleOutlined className="" />
                      {funding && formatDate(funding.createdAt)} -{" "}
                      {funding && formatDate(funding.deadline)}
                    </Typography.Text>
                    {/* <Typography.Text className="flex items-center gap-1 flex-nowrap">
                      <UsergroupAddOutlined type="secondary" /> 122 Funded
                    </Typography.Text>
                    <Typography.Text className="flex items-center gap-1 flex-nowrap">
                      <GlobalOutlined type="secondary" /> Academic issues
                    </Typography.Text> */}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="content-body">
        <Container fluid className="px-6">
          <Row gutter={[16, 16]}>
            <Col
              xs={{ span: 24, order: 2 }}
              lg={{ span: 16, order: 1 }}
              xxl={{ span: 18, order: 1 }}
            >
              <div className="mb-8">
                <Typography.Title level={4}>Funding Overview</Typography.Title>
                <Typography.Paragraph className="leading-6">
                  {funding?.details}
                </Typography.Paragraph>
                <div className="mb-8">
                  <Typography.Title level={4}>
                    About Organisation
                  </Typography.Title>
                  <Typography.Paragraph className="leading-6">
                    {funding?.aboutOrganization}
                  </Typography.Paragraph>
                </div>
              </div>
            </Col>
            {/* <Col
                  xs={{ span: 24, order: 1 }}
                  lg={{ span: 8, order: 2 }}
                  xxl={{ span: 6, order: 2 }}
                >
                  <DetailsCard />
                </Col> */}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default JobDetailsTab;
