"use client";

import { Row, Col, Typography } from "antd";
import pic from "@/public/images/diversityPic.png";
import Image from "next/image";

const DiversityPage = () => {
  const { Paragraph } = Typography;

  return (
    <div>
      <section className=" md:px-20 px-10">
        <Row className="py-5" gutter={[16, 16]}>
          <Col xl={24}>
            <h2 className="md:text-3xl text-2xl text-bold">
              Diversity, Equity & Inclusion
            </h2>
          </Col>

          <Col xl={24} className="md:py-5 py-2">
            <Row>
              <Col xl={13}>
                <Image src={pic} alt="paris picture" />
              </Col>
              {/* <Col
                xl={5}
                className=" relative right-5 bg-purple-50 rounded-lg px-2 pt-10 xl:max-h-[12rem]"
              >
                <Title level={3} className="text-white">
                  Unifaires is a diverse and inclusive workspace
                </Title>
              </Col> */}
            </Row>
          </Col>

          <Col xl={24} className="pt-5 md:pb-40 pb-10  ">
            <Paragraph className="text-base text-bold text-black leading-loose lg:pr-60">
              We are an entity of varying backgrounds, ideas, and perspectives
              innovating on behalf of customers’ changing patterns and specific
              needs. Our diverse points of view come from various sources
              including gender, race, age, nationality, education, culture,
              sexual orientation, and professional and life experience. We are
              committed to a diverse and inclusive workplace and always look for
              ways to make everyone, regardless of who they are or what they do
              for the business, feel equally involved in and supported in all
              areas of the workplace
            </Paragraph>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default DiversityPage;
