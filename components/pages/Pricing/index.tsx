"use client";
import { Row, Col, Button } from "antd";
import unifaires from "@/public/images/uni-lappy.png";
import Image from "next/image";
import Container from "@/components/shared/container";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { stat } from "fs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InstitutionAccess from "../InstitutionAccess";
import { showError } from "@/app/utils/axiosError";

const PricingPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [institutionAccess, setInstitutionAccess] = useState(false);
  const [nextStep, setNextStep] = useState(false);

  const handleSubscribe = () => {
    if (status === "authenticated") {
      router.push("/user/payments/subscription");
    } else {
      showError("Login to Subscribe");
      router.push("/login");
    }
  };

  const contactUs = () => {
    router.push("/contact");
  };

  return (
    <div>
      <section className="bg-purple-50 py-10">
        <Container>
          <Row className="lg:px-20 px-5" gutter={[16, 16]}>
            <Col xl={24}>
              <p className="text-white lg:text-5xl text-3xl font-normal ">
                Subscribe to unifaires unlimited
              </p>
            </Col>

            <Col xl={24}>
              <p className="text-white text-2xl font-light ">
                For the most comprehensive jobs, education & funding information
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="bg-white pt-10 pb-3 text-center">
        <Container>
          <Row className="lg:px-40 px-5" gutter={[16, 16]}>
            <Col xl={24}>
              <p className="text-black lg:text-3xl text-2xl font-light ">
                With the added intelligence and analytics from Unifaires Pro
              </p>
            </Col>
            <Col xl={24} className="pt-5">
              <p className="text-black text-base font-normal ">
                Everything you need to stay on the dynamic market and rapid
                technological advancement. Follow in-demand skills analytics and
                data-driven labor market intelligence on jobs, education, and
                funding issues you need to know.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="bg-white text-center pt-1 pb-3">
        <Container>
          <Row className="lg:px-40 px-5" gutter={[16, 16]}>
            <Col xl={24} sm={24} xs={24} className="py-5">
              <h4 className="text-black lg:text-3xl text-2xl font-semibold ">
                Subscription & Pricing
              </h4>
            </Col>

            <Col xl={12}>
              <Row gutter={[16, 16]}>
                <Col xl={24} sm={24} xs={24}>
                  <Button className="text-purple-50 bg-purple-60 rounded-3xl">
                    For Individual Only
                  </Button>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <h4 className="text-black text-xl font-semibold ">
                    Pro Access for Individuals
                  </h4>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <h4 className="text-purple-50 text-xl font-semibold ">
                    Custom Pricing
                  </h4>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <h4 className="text-black text-lg font-light ">
                    Billed annually
                  </h4>
                </Col>

                <Col
                  xl={24}
                  sm={24}
                  xs={24}
                  className="text-center xl:px-32 px-5"
                >
                  <Button
                    block
                    className="text-purple-50 rounded-xl border-purple-50"
                    size="large"
                    onClick={handleSubscribe}
                  >
                    Subscribe
                  </Button>
                </Col>

                <Col xl={24} className="lg:px-12 pt-4">
                  <p className="text-grey-90 text-base font-light font-Montserrat">
                    The solution for individuals and consultants looking for
                    education, career, and funding opportunities while staying
                    informed on the global and changing labor market and
                    technological advancement trends with advanced data
                    analytics insights.
                  </p>
                </Col>
              </Row>
            </Col>

            <Col xl={12}>
              <Row gutter={[16, 16]}>
                <Col xl={24} sm={24} xs={24}>
                  <Button className="text-purple-50 bg-purple-60 rounded-3xl">
                    For Groups Only
                  </Button>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <h4 className="text-black text-xl font-semibold ">
                    Pro Access for Organizations
                  </h4>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <h4 className="text-black text-lg font-light ">
                    Custom Pricing
                  </h4>
                </Col>

                <Col
                  xl={24}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  className="text-center xl:px-32"
                >
                  <Link href="/contact">
                    <Button
                      block
                      className="purple-button"
                      size="large"
                      // onClick={handleSubscribe}
                    >
                      Request a Demo
                    </Button>
                  </Link>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <p className="text-black text-sm font-light ">
                    Part of a group?
                    <span
                      className="text-purple-50 pl-2 hover:cursor-pointer hover:font-bold"
                      onClick={() => setInstitutionAccess(true)}
                    >
                      Access via institution
                    </span>
                  </p>
                </Col>

                <Col xl={24} sm={24} xs={24} className="lg:px-12 pt-4">
                  <p className="text-grey-90 text-base font-light font-Montserrat ">
                    Idea for your team or entire organization to track
                    education, career, and funding opportunities while staying
                    informed on the global and changing labor market and
                    technological advancement trends with advanced data
                    analytics insights. Plus it includes exclusive benefits of
                    helping build your global brand and share your research
                    attract the right talents and digital transformation
                    initaitives.
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="bg-white py-4 ">
        <Container>
          <Row className="lg:px-40 px-5">
            <Col xl={24}>
              <h4 className="text-black text-2xl font-semibold text-center py-5">
                Unifaires offers informative pathways for the development-minded
              </h4>
            </Col>

            <Col xl={12} sm={24} xs={24} className="py-10">
              <Image src={unifaires} alt="icon" />
            </Col>

            <Col
              xl={12}
              sm={24}
              xs={24}
              className="py-10 lg:text-left text-center"
            >
              <Row gutter={[16, 16]}>
                <Col xl={24}>
                  <h4 className="text-black text-2xl font-semibold text-left">
                    Subscription Benefits
                  </h4>
                </Col>

                <Col xl={24}>
                  <ul className="marker:text-purple-50 marker:text-2xl list-outside list-disc lg:text-lg text-left">
                    <li className="ml-4 mb-2">
                      Unlimited access to Unifaires.com
                    </li>
                    <li className="ml-4 mb-2">
                      Business and digital technology career coaching tailored
                      to your occupation goals
                    </li>
                    <li className="ml-4 mb-2">Cancel anytime</li>

                    <li className="ml-4 mb-2">
                      Access to in-demand e-learning resources
                    </li>

                    <li className="ml-4 mb-2">
                      Standardization of job posting to attract the right talent
                    </li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="lg:px-44 px-5 lg:text-left text-center">
        <h4 className="text-black text-3xl font-semibold lg:text-left text-center py-5">
          Who we are
        </h4>

        <p className="text-grey-90 text-sm font-light font-Montserrat leading-loose lg:pr-40 py-2">
          The solution for individuals and consultants looking for education,
          career, and funding opportunities while staying informed on the global
          and changing labor market and technological advancement trends with
          advanced data analytics insights.
          <br />
        </p>

        <p className="text-grey-90 text-sm font-light font-Montserrat leading-loose py-5 lg:pr-40">
          When Subscribing to Unifaires Unlimited, you can expect practical,
          experiential learning and non-nonsense advice for every stage of your
          growth journey
          <br />
        </p>

        <h4 className="text-black text-xl font-semibold  pt-5 pb-40">
          Have a question?{" "}
          <span className="text-purple-50 cursor-pointer" onClick={contactUs}>
            Contact Us{" "}
          </span>
        </h4>
      </section>

      <InstitutionAccess
        institutionAccess={institutionAccess}
        setInstitutionAccess={setInstitutionAccess}
        nextStep={nextStep}
        setNextStep={setNextStep}
      />
    </div>
  );
};

export default PricingPage;
