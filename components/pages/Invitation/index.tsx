"use client";
import { Row, Col, Button, Typography } from "antd";
import Link from "next/link";

const InvitationPage = () => {
  const { Title, Paragraph } = Typography;

  return (
    <div>
      <section className="lg:px-20 px-5">
        <Row className="py-5">
          <Col xl={24} className="pt-7">
            <Row>
              <Col xl={14}>
                <Title
                  level={2}
                  className="lg:text-4xl text-3xl text-bold leading-normal"
                >
                  Unifaires Partner Invitational Program: A Call for Joint
                  Research on Employability Skills & Performance Innovation
                </Title>
              </Col>
            </Row>
          </Col>

          <Col xl={24} className="pt-5">
            <Paragraph className="text-base text-bold text-black leading-loose lg:pr-60">
              Let’s innovate together! You stand to gain everything -
              <span className="text-sm font-light">
                …building future managers and experts across socially relevant
                sectors!!!
              </span>
            </Paragraph>
          </Col>

          <Col xl={24} className="pt-5 ">
            <Paragraph className="text-base text-bold text-black leading-loose lg:pr-60">
              To make it easier for people to chart their own career paths to
              the future, we are inviting several partners and stakeholders
              (employers and educational institutions, and individual users) to
              test out the idea. As part of the invitational program, we invite
              partners to test-drive the transformative unifaires.com platform,
              for custom labor market intelligence analytics, skill gaps
              analytics, course recommendation system, and integrated job,
              education, and funding marketplace. Together with our partners, we
              will innovate the traditional training approach and talent hiring
              strategy. Invited partners will discover an effective way of
              presenting skills information, and job descriptions and uncover
              new connections between career options and academic subjects using
              shared data in a continuous manner.
            </Paragraph>
          </Col>

          <Col xl={24} className="pt-5">
            <h2 className="text-4xl text-bold leading-normal">Our Approach</h2>
          </Col>

          <Col xl={24} className="pt-5">
            <Paragraph className="text-base text-bold text-black leading-loose lg:pr-60">
              <span className="text-sm font-light pr-2">
                Our sales, marketing, and communication units contact you to
                understand your career and education needs. After a brief
                interview, we invite you to test-drive the unifaires platform.
                This aligns with our
              </span>
              Academia-Industry Partnerships for a digitally skilled workforce –
              Skills Matching Project
            </Paragraph>
          </Col>

          <Col xl={24} className="pt-5 lg:pb-40 pb-10">
            <Link href="/signup-business">
              <Button type="primary" size="large" className="rounded-lg">
                Register Now
              </Button>
            </Link>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default InvitationPage;
