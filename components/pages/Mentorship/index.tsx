"use client";

import { Row, Col, Button } from "antd";
import phone from "@/public/images/MentorPhone.svg";
import internet from "@/public/images/MentorInternet.svg";
import clip from "@/public/images/MentorClip.svg";
import chat from "@/public/images/MentorChat.svg";

import Image from "next/image";

const MentorshipPage = () => {
  return (
    <div className="bg-grey-50">
      <section className=" lg:px-20 px-5 py-10 ">
        <Row className="py-5 lg:px-20 px-5" gutter={[16, 16]}>
          <Col lg={24} sm={24} xs={24}>
            <h2 className="text-3xl text-bold  text-center">
              Unifaires Mentorship
            </h2>
          </Col>
          <Col xl={24} className="py-4">
            <p className="text-base text-bold leading-loose text-center">
              Unifaires mentors use their wealth of career and education
              experience to inspire and make a difference in the life others
              under our Business & Digital Technology Career Institute. Our
              mentors can fully engage and empower you via strategic education
              and career mentoring and provide hands-on training on
              demand-driven technical and soft skills necessary for the future
              workforce. Our mentorship program will provide opportunities for
              students to be matched to internship programs and work
              opportunities thereby hereby helping them develop their
              professional and leadership skills. Together with the
              academia-industry alliance, the mentorship program will equip
              students and co-sponsor community innovation programs.
            </p>
          </Col>

          <Col lg={24} sm={24} xs={24}>
            <h2 className="text-3xl text-bold  text-center">
              Unifaires Education & Study Advisory
            </h2>
          </Col>
          <Col xl={24} className="py-4">
            <p className="text-base text-bold leading-loose text-center">
              At Unifaires, we will advise you on prestigious education and
              study pathways that lead to a successful future career. We can
              help you evaluate and build your application profile, choose the
              best education programs, and apply for scholarships, including
              edits to your cover letters, essays, and CV as well as prepare for
              any time of interview
            </p>
          </Col>

          <Col lg={24} xs={24} className="text-center lg:py-5 py-2">
            <Button
              type="primary"
              size="large"
              className="rounded-lg"
              href="/mentorshipapplication"
            >
              Book your consultation
            </Button>
          </Col>

          <Col xl={24} sm={24} xs={24} className="py-5">
            <h6 className="text-xl text-bold  text-center">
              How we assist student get their dream education and study
              programs:
            </h6>
          </Col>
        </Row>
      </section>

      <section className="lg:px-20 lg:pt-12 px-5  pb-32">
        <Row gutter={[32, 16]}>
          <Col xl={6} sm={24} xs={24} className="text-center">
            <Row>
              <Col xl={24} sm={24} xs={24}>
                <Image src={phone} alt="ceoPic" />
              </Col>

              <Col xl={24} sm={24} xs={24} className="py-2">
                <h4 className="text-bold text-xl ">
                  Your initial request & call
                </h4>
              </Col>

              <Col xl={24} sm={24} xs={24}>
                <p className="text-base text-bold leading-loose text-center">
                  Our first video call with you will be know you better and a
                  chance to ask question and the next step(s).
                </p>
              </Col>
            </Row>
          </Col>

          <Col xl={6} sm={24} xs={24} className="text-center">
            <Row>
              <Col xl={24} sm={24} xs={24}>
                <Image src={internet} alt="ceoPic" />
              </Col>

              <Col xl={24} sm={24} xs={24} className="py-2">
                <h4 className="text-bold text-xl ">
                  Target & chose the best programs
                </h4>
              </Col>

              <Col xl={24} sm={24} xs={24} className="">
                <p className="text-base text-bold leading-loose text-center">
                  Our mentors, education & career experts will select matching
                  programs for your profile.
                </p>
              </Col>
            </Row>
          </Col>

          <Col xl={6} sm={24} xs={24} className="text-center">
            <Row>
              <Col xl={24} sm={24} xs={24}>
                <Image src={clip} alt="ceoPic" />
              </Col>

              <Col xl={24} sm={24} xs={24} className="py-2">
                <h4 className="text-bold text-xl ">
                  Unlimited edits of profile info, CV & essays
                </h4>
              </Col>

              <Col xl={24} sm={24} xs={24} className="">
                <p className="text-base text-bold leading-loose text-center">
                  We will work with you on your career and education journey.
                  This includes helping craft the best stories about yourself,
                  edit your CV and essays.
                </p>
              </Col>
            </Row>
          </Col>

          <Col xl={6} sm={24} xs={24} className="text-center">
            <Row>
              <Col xl={24} sm={24} xs={24}>
                <Image src={chat} alt="ceoPic" />
              </Col>

              <Col xl={24} sm={24} xs={24} className="py-2">
                <h4 className="text-bold text-xl ">Interview Preparation</h4>
              </Col>

              <Col xl={24} sm={24} xs={24} className="">
                <p className="text-base text-bold leading-loose text-center">
                  Our training sessions will include interview preparations to
                  enable you pass your interviews without stress.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default MentorshipPage;
