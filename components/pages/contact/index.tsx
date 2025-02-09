"use client";
import { Row, Col, Button, Card } from "antd";
import Image from "next/image";
import ContactForm from "./ContactForm";
import lucy from "@/public/images/lucyPic.png";
import lucyMessage from "@/public/images/lucyMessage.png";
import updateMessage from "@/public/images/updateMessage.png";
import markpic from "@/public/images/markpic.png";
import support from "@/public/images/support.png";
import lines from "@/public/images/lines.svg";
import testimonials from "@/public/images/testimonials2.png";
import subscribeArrow from "@/public/images/t2.svg";
import { useState } from "react";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import { BsMailbox } from "react-icons/bs";

const ContactPages = () => {
  const [email, setEmail] = useState<any>();
  const [loading, setLoading] = useState(false);

  const emailSubscription = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/newsletter-subscriber", {
        email: email,
      });
      if (res.status) {
        showSuccess("News Letter Subscription Successfull");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section>
        <Row>
          <Col
            xl={16}
            sm={24}
            xs={24}
            className="bg-purple-50 py-10 xl:pl-28 px-5 slant-right"
          >
            <Row>
              <Col xl={6} lg={12} md={16} sm={16} xs={16}>
                <Card className="rounded-xl card-sm ">
                  <p>👋 Welcome to Unifaires</p>
                </Card>
              </Col>
              <Col xl={24} sm={24} xs={24} className="pt-3">
                <h1 className="text-white xl:text-5xl text-3xl leading-snug font-bold ">
                  We are here to help <br /> you grow your <br /> business
                </h1>
              </Col>

              <Col xl={8} sm={24} xs={24} className="">
                <p className="text-white text-base font-light ">
                  We value your time so we will do our best to respond to your
                  message promptly.
                </p>
              </Col>
            </Row>
          </Col>

          <Col xl={8} className="bg-white pt-10 lg:flex hidden">
            <Row>
              <Col xl={8} className="relative right-32 pt-5">
                <Image src={lucy} alt="picture" />
              </Col>

              <Col xl={16} className="relative right-32">
                <Image src={lucyMessage} alt="picture" />
              </Col>

              <Col xl={16} className="relative right-64">
                <Image src={updateMessage} alt="picture" />
              </Col>

              <Col xl={8} className="relative right-64">
                <Image src={markpic} alt="picture" />
              </Col>
            </Row>
          </Col>
        </Row>
      </section>

      <section className="bg-white xl:px-20 px-5 py-16 ">
        <Row className=" border  border-[#ECEEF0]-500/50" gutter={[16, 16]}>
          <Col xl={24} sm={24} xs={24} className="pt-16">
            <h2 className="text-3xl text-center ">Let’s talk</h2>
          </Col>

          <Col xl={24} sm={24} xs={24}>
            <p className="text-sm text-center ">
              Have a project in mind that you think we’d be a great fit for it?
              <br />
              We’d love to know what you’re thinking
            </p>
          </Col>

          <Col xl={24} className="xl:px-20 px-5 py-5">
            <ContactForm />
          </Col>
        </Row>
      </section>

      <section className="bg-purple-50 xl:px-20 px-5 py-5">
        <Row className="pt-10">
          <Col xl={12} sm={24} xs={24}>
            <Image src={support} alt="picture" />
          </Col>

          <Col xl={12} className="xl:pt-20">
            <Row gutter={[16, 16]}>
              <Col xl={24} sm={24} xs={24}>
                <h1 className="text-white text-3xl">24/7 Customer Support</h1>
              </Col>

              <Col xl={24} className="">
                <Image src={lines} alt="picture" />
              </Col>

              <Col xl={20}>
                <p className="text-white text-lg font-extralight">
                  Our team is here to give you personalized support within the
                  hour available 24/7. In accordance with our commitment to
                  providing superior and professional service. Join daily live
                  webinars, watch our tutorials, or browse through our knowledge
                  base
                </p>
              </Col>

              <Col xl={24} className="">
                <Button
                  htmlType="submit"
                  size="large"
                  className="rounded-md text-black bg-yellow-50 border-yellow-50 "
                >
                  Read More
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>

      <section className="py-20 hidden">
        <Row>
          <Col xl={24}>
            <h4 className="text-center text-black text-3xl">Client</h4>
          </Col>

          <Col xl={24}>
            <h4 className="text-center text-blue-700 text-3xl">Testimonials</h4>
          </Col>

          <Col xl={24} className="">
            <Image src={testimonials} alt="picture" />
          </Col>
        </Row>
      </section>

      <section className="bg-grey-100 px-5">
        <Row className="py-20" gutter={[16, 16]}>
          <Col xl={24} sm={24} xs={24}>
            <p className="text-center">Support</p>
          </Col>

          <Col xl={24} sm={24} xs={24}>
            <p className="text-center text-3xl">Subscribe Newsletter & get</p>
          </Col>

          <Col xl={24} sm={24} xs={24}>
            <p className="text-center font-extralight text-3xl">Company News</p>
          </Col>
          <Col xl={24} sm={24} xs={24}>
            <div className="relative xl:mx-96">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                {/* <Image src={email} alt="picture" /> */}
                <BsMailbox color="blue" size={25} />
              </div>
              <input
                type="search"
                id="search"
                className="block p-4 pl-10 w-full text-sm  rounded-lg border  "
                placeholder="Your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                size="large"
                className="flex gap-2 items-center justify-center text-white absolute right-2.5 bottom-1.5 bg-purple-50
                 font-normal rounded-xl text-base px-4 py-2  "
                loading={loading}
                onClick={emailSubscription}
              >
                <span className=" relative">
                  <Image src={subscribeArrow} alt="picture" />
                </span>
                Subscribe
              </Button>
            </div>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default ContactPages;
