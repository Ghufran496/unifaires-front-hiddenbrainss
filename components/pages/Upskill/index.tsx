"use client";

import { Row, Col, Button, Typography } from "antd";
import search from "@/public/images/upSearch.svg";
import cap from "@/public/images/upskillCap.svg";
import book from "@/public/images/upskillBook.svg";
import Image from "next/image";

const UpSkillPage = () => {
  const { Title, Paragraph } = Typography;

  return (
    <div className="bg-grey-50">
      <section className="lg:px-20 px-5 lg:py-10 py-5 ">
        <Row className="py-5 lg:px-20 px-5">
          <Col lg={24}>
            <Title level={2} className="text-center">
              Unifaires Learn For Upskilling & Reskilling
            </Title>
          </Col>
          <Col xl={24} sm={24} xs={24} className="py-4">
            <Paragraph className="text-base text-bold leading-loose text-center">
              Whether you are new to the unifaires on an exsting skill set, you
              can find the curriculum tailored to your needs. From data analysis
              and data engineering to data science, machine learning, business,
              socail sciences, skilled trades, and humanities.
            </Paragraph>
          </Col>

          <Col lg={24} sm={24} xs={24}>
            <Title level={2} className="text-center">
              Discover Your Career Path
            </Title>
          </Col>
          <Col xl={24} className="py-4">
            <Paragraph className="text-base text-bold leading-loose text-center">
              Whether you are just beginning, at the intermediate level, or an
              advanced and experienced professional, we offer you a careful
              selection of hands-on and high-quality instructions under
              custom-fit learning paths for multiple roles and career choices.
              Where appropraite, these paths includes modularand role-based
              short courses, test exams and certifications courses, academic
              degrees and micro-creddentials, continue education, professional
              and executive, MBA, and executive MBA.
            </Paragraph>
          </Col>

          <Col lg={24} sm={24} xs={24}>
            <Title level={2} className="text-center">
              Why Unifaires Learn?
            </Title>
          </Col>
          <Col xl={24} className="lg:py-4">
            <Paragraph className="text-base text-bold leading-loose text-center">
              We believe that jobs and education should be interoperable,
              flexible & inexpensive
              <br />
              At Unifaires, we are harnessing the power of online education and
              career resources to build a seamless career path recommendation
              engine.
            </Paragraph>
          </Col>
        </Row>
      </section>

      <section className="lg:px-60 px-5 ">
        <Row gutter={[32, 16]}>
          <Col xl={8} sm={24} xs={24} className="text-center">
            <Row>
              <Col xl={24} sm={24} xs={24}>
                <Image src={search} alt="ceoPic" />
              </Col>

              <Col xl={24} sm={24} xs={24} className="py-2">
                <Title level={4} className="text-center">
                  Start Immediately
                </Title>
              </Col>

              <Col xl={24} sm={24} xs={24} className="">
                <Paragraph className="text-base text-bold leading-loose text-center">
                  Search for a job now, analyze your skills gap, and start
                  building new skills sets
                </Paragraph>
              </Col>
            </Row>
          </Col>

          <Col xl={8} sm={24} xs={24} className="text-center">
            <Row>
              <Col xl={24} sm={24} xs={24}>
                <Image src={book} alt="ceoPic" />
              </Col>

              <Col xl={24} sm={24} xs={24} className="py-2">
                <Title level={4} className="text-center">
                  Custom-Fit Learning
                </Title>
              </Col>

              <Col xl={24} sm={24} xs={24} className="">
                <Paragraph className="text-base text-bold leading-loose text-center">
                  Select carefully curated courses tailored to occupation
                  targets by renowned experts
                </Paragraph>
              </Col>
            </Row>
          </Col>

          <Col xl={8} sm={24} xs={24} className="text-center">
            <Row>
              <Col xl={24} sm={24} xs={24}>
                <Image src={cap} alt="ceoPic" />
              </Col>

              <Col xl={24} sm={24} xs={24} className="py-2">
                <Title level={4} className="text-center">
                  Interview Preparation
                </Title>
              </Col>

              <Col xl={24} className="">
                <Paragraph className="text-base text-bold leading-loose text-center">
                  Our training sessions will include interview preparations to
                  enable you pass your interviews without stress.
                </Paragraph>
              </Col>
            </Row>
          </Col>

          {/* <Col xl={24} sm={24} xs={24} className="py-5 text-center">
            <Button className="rounded-lg px-10" size="large" type="primary">
              Join Now
            </Button>
          </Col> */}

          <Col xl={24} className="pt-5 pb-32">
            <Paragraph className="text-base text-bold leading-loose text-center">
              Your career and education path are simple and straight forward
            </Paragraph>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default UpSkillPage;
