"use client";
import React, { Fragment } from "react";
// next
import NextLink from "next/link";
// antd and Icon components
import { Col, Row, Space, Button, Divider, Typography, Breadcrumb } from "antd";
import {
  MailOutlined,
  StarOutlined,
  LinkOutlined,
  PhoneOutlined,
  GlobalOutlined,
  MessageOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
// icons and images
import ProfileImage from "@/public/images/avatar/user-1.png";
// app components
import DetailsCard from "./DetailsCard";
import DetailsContent from "./DetailsContent";
import Container from "@/components/shared/container";
import ImageComponent from "@/components/shared/image";

const TalentProfile = () => {
  return (
    <Fragment>
      <section className="content-header">
        <Container fluid className="p-6">
          <Breadcrumb>
            <Breadcrumb.Item>
              <NextLink href="/admin/talent-program/profiles">
                Talent profiles
              </NextLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Profile</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </section>
      <section className="content-hero border-b mb-6">
        <Container fluid className="px-6 pb-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16} xxl={18}>
              <div className="flex justify-start items-start gap-4">
                <div className="relative shrink-0 rounded-full aspect-square w-24 h-24 bg-grey-200 overflow-hidden">
                  <ImageComponent
                    layout="fill"
                    objectFit="cover"
                    src={ProfileImage}
                    alt="paris picture"
                  />
                </div>
                <div className="grow">
                  <Typography.Title level={1} className="mb-2 text-2xl">
                    Flora Miles
                  </Typography.Title>
                  <Typography.Paragraph className="mb-2 max-w-xl text-base opacity-90">
                    Product Designer - 5 years experience.
                  </Typography.Paragraph>
                  <Typography.Paragraph className="mb-2 max-w-xl">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Scelerisque at duis eros, laoreet. Enim consequat, mauris
                    enim ut non fusce. Enim consequat, mauris enim ut non fusce.
                  </Typography.Paragraph>
                  <div className="flex gap-3 flex-wrap items-center mb-4">
                    <Typography.Text className="flex items-center gap-1 flex-nowrap text-base">
                      <PhoneOutlined type="secondary" /> +49 5853 2453
                    </Typography.Text>
                    <Typography.Text className="flex items-center gap-1 flex-nowrap text-base">
                      <MailOutlined type="secondary" />
                      davemilly@gmail.com
                    </Typography.Text>
                    <Typography.Text className="flex items-center gap-1 flex-nowrap text-base">
                      <GlobalOutlined type="secondary" /> 5th Avenue, Morgan
                      Street San Francisco, USA
                    </Typography.Text>
                  </div>
                </div>
              </div>
              <Divider />
              <Space direction="vertical">
                <Space wrap>
                  <Button
                    size="large"
                    icon={<StarOutlined />}
                    className="flex justify-center items-center gap-1 px-6"
                  >
                    Leave a rating
                  </Button>
                  <Button
                    size="large"
                    icon={<MessageOutlined />}
                    className="flex justify-center items-center gap-1 px-6"
                  >
                    Send message
                  </Button>
                  <Button
                    size="large"
                    icon={<LinkOutlined />}
                    className="flex justify-center items-center gap-1 px-6"
                  >
                    Copy link
                  </Button>
                  <Button
                    size="large"
                    icon={<DownloadOutlined />}
                    className="flex justify-center items-center gap-1 px-6"
                  >
                    Download pdf
                  </Button>
                </Space>
              </Space>
            </Col>
            <Col xs={24} lg={8} xxl={6}>
              <DetailsCard />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="content-body">
        <Container fluid className="px-6">
          <DetailsContent />
        </Container>
      </section>
    </Fragment>
  );
};

export default TalentProfile;
