"use client";
import React from "react";
import security from "@/public/images/security.png";
import { Row, Col, Typography } from "antd";
import Image from "next/image";

const PrivacyPage = () => {
  const { Title } = Typography;
  const { Paragraph } = Typography;
  return (
    <div>
      <section className="lg:p-20 p-5">
        <Row>
          <Col xl={24}>
            <Title level={2} className="text-black">
              Data Security & Privacy
            </Title>
          </Col>

          <Col xl={24}>
            <Image src={security} alt="security" />
          </Col>

          <Col xl={24}>
            <Paragraph className="text-black  text-light text-base pt-5 pb-28 leading-loose">
              At Unifaires, we believe that people should own and control their
              information, including education and career achievements. That
              mission is aligned with a larger global trend of entrusting
              individuals to oversee their own data. We place emphasis on best
              practices and compliance with industry standards aimed to protect
              the security and privacy of our customers, business partners, and
              their employees, members, learners, and users. Our policies and
              procedures proactively seek the scrutiny of certified global data
              security and privacy experts and auditors who test and validate
              the measures we implement and maintain.
            </Paragraph>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default PrivacyPage;
