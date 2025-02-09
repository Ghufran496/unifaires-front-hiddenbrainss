"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Row, Col, Typography, Space } from "antd";
import logo from "@/public/images/logo.png";
import GlobalOutlined from "@ant-design/icons/GlobalOutlined";
import Container from "@/components/shared/container";
import axiosInstance from "@/app/utils/axios-config";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsWhatsapp,
} from "react-icons/bs";

const { Paragraph, Title } = Typography;

const Footer = () => {
  const [socialMediaList, setSocialMediaList] = useState([]);

  const fetchAllSocials = async () => {
    try {
      const res = await axiosInstance.get("/admin-socials");
      if (res.status) {
        setSocialMediaList(res.data.data);
      }
    } catch (error) {
      console.log("Error fetch ing user socials", error);
      // handleAxiosError(error);
    }
  };

  /**
   * Get copy write text
   */
  const getCopyRightText = () => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;

    return `Copyright © ${currentYear}-${nextYear} Unifaires. All Rights Reserved`;
  };

  useEffect(() => {
    fetchAllSocials();
  }, []);

  return (
    <footer>
      <section className="py-8 bg-purple-50">
        <Container className="p-6 container-fluid">
          <div className="flex flex-wrap justify-between gap-4 w-full">
            <div className="lg:w-1/4">
              <Image src={logo} alt="icon" width={200} height={58} />
              <Paragraph className="mt-4 text-sm text-white">
                Unifaires is a platform that provides job boards, education, and
                funding to students and passionate individuals to upskill or
                reskill themselves. It works with partners to bridge skill gaps
                and find the right talent for businesses and enterprises. It
                provides an entry point into in-demand careers for those who
                wouldn’t otherwise have it.
              </Paragraph>
            </div>

            <div>
              <Title level={5} className="text-white">
                MORE INFORMATION
              </Title>
              <Space direction="vertical">
                <Link
                  href="/partnership"
                  passHref
                  className="text-sm text-white hover:underline"
                >
                  Unifaires Partner Program
                </Link>
                <Link
                  href="/upskill"
                  passHref
                  className="text-sm text-white hover:underline"
                >
                  UpSkilling & ReSkilling
                </Link>
                {/* <Link
                  href="/facilitators"
                  passHref
                  className="text-sm text-white hover:underline"
                >
                  Mentors and Facilitators
                </Link> */}
                <Link
                  href="/skills"
                  passHref
                  className="text-sm text-white hover:underline"
                >
                  Skills Matching Project
                </Link>
                <Link
                  href="/invitation"
                  passHref
                  className="text-sm text-white hover:underline"
                >
                  Partner Invitation Program
                </Link>
                <Link
                  href="/mentorship"
                  passHref
                  className="text-sm text-white hover:underline"
                >
                  Mentorship & Education Advisory
                </Link>
                <Link
                  href="/diversity"
                  passHref
                  className="text-sm text-white hover:underline"
                >
                  Diversity, Equity & Inclusion
                </Link>
              </Space>
            </div>
            <div>
              <Title level={5} className="text-white">
                Company
              </Title>
              <Space direction="vertical">
                <Link
                  href="/about"
                  passHref
                  className="text-sm text-white hover:underline"
                >
                  About Us
                </Link>

                <Link
                  href="/talents"
                  passHref
                  className="text-sm text-white hover:underline"
                >
                  Vetted Talent Program
                </Link>
                <Link
                  href="/career"
                  passHref
                  className="text-sm text-white hover:underline"
                >
                  Careers
                </Link>
                <Link
                  href="/pricing"
                  passHref
                  className="text-sm text-white hover:underline"
                >
                  Our Pricing{" "}
                </Link>
                <Link
                  href="/academicPartnership"
                  passHref
                  className="text-sm text-white hover:underline"
                >
                  Academic Partner Excellence
                </Link>
              </Space>
            </div>
            <div>
              <Title level={5} className="text-white">
                Support
              </Title>
              <Space direction="vertical">
                <Link
                  href="/contact"
                  passHref
                  className="text-sm text-white hover:underline"
                >
                  Contact Us
                </Link>
                <Link
                  href="/privacy"
                  passHref
                  className="text-sm text-white hover:underline "
                >
                  Data Security & Privacy
                </Link>
              </Space>
            </div>
          </div>
        </Container>
      </section>
      <section className="py-4 bg-blue-50">
        <Container className="p-6 container-fluid">
          <Row className="w-full" gutter={[16, 16]}>
            <Col xs={24} lg={3}>
              <Space className="gap-3" align="end">
                <GlobalOutlined className="mb-1 text-xl leading-none text-white" />
                <Paragraph className="mb-1 text-white ">English</Paragraph>
                {/* <Image src={england} alt="icon" width={40} /> */}
              </Space>
            </Col>
            <Col xs={24} lg={9}>
              <Paragraph className="mb-0 text-white">
                {getCopyRightText()}
              </Paragraph>
            </Col>

            <Col xs={24} lg={3}>
              <Link href="/terms-of-service" className="text-white" passHref>
                Terms of Conditions
              </Link>
            </Col>

            <Col xs={24} lg={4} className="lg:ml-auto">
              <Space className="justify-start w-full gap-6 lg:justify-end">
                {socialMediaList &&
                  socialMediaList.map((list: any, index) => {
                    const socialUrl =
                      list && list.url && list.url.startsWith("http")
                        ? list.url
                        : `https://${list.url}`;
                    return (
                      <div key={list.id}>
                        {list.name !== "" && list.url !== "" && (
                          <div>
                            {list.name == "Facebook" ? (
                              <Link href={`${socialUrl}`} target="_blank">
                                <BsFacebook color="#205FD8" size={25} />{" "}
                              </Link>
                            ) : list.name == "Twitter" ? (
                              <Link href={`${socialUrl}`} target="_blank">
                                <BsTwitter color="#55ACEE" size={25} />{" "}
                              </Link>
                            ) : list.name == "LinkedIn" ? (
                              <Link href={`${socialUrl}`} target="_blank">
                                <BsLinkedin color="#0A66C2" size={25} />{" "}
                              </Link>
                            ) : list.name == "WhatsApp" ? (
                              <Link href={`${socialUrl}`} target="_blank">
                                <BsWhatsapp color="#25D366" size={25} />{" "}
                              </Link>
                            ) : list.name == "Instagram" ? (
                              <Link href={`${list.link}`} target="_blank">
                                <BsInstagram color="#25D366" size={25} />{" "}
                              </Link>
                            ) : null}
                          </div>
                        )}
                      </div>
                    );
                  })}
                {/* <Image src={linkedin} alt="icon" />
                <Image src={youtube} alt="icon" />
                <Image src={instagram} alt="icon" />
                <Image src={facebook} alt="icon" /> */}
              </Space>
            </Col>
          </Row>
        </Container>
        <div>
          <Typography.Paragraph className="text-center text-white">
            <span className="text-base font-bold">Disclaimer:</span> Unifaires
            has education & industry partners and presently not an institution
            of higher learning
          </Typography.Paragraph>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
