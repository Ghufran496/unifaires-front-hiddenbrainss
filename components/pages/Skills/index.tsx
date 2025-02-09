"use client";

import { Row, Col, Button } from "antd";
import pic from "@/public/images/skillsMatching.png";
import Image from "next/image";

const SkillsPage = () => {
  return (
    <div className="bg-grey-50">
      <section className=" md:px-20 md:py-5  p-5">
        <Row className="py-5" gutter={[16, 16]}>
          <Col lg={14}>
            <h2 className="md:text-3xl text-2xl text-bold leading-normal">
              Academia-Industry Partnerships for a digitally skilled
              workforce-Skills Matching Project
            </h2>
          </Col>

          <Col xl={24} className="">
            <Image src={pic} alt="skillsMatching" />
          </Col>

          <Col xl={24}>
            <p className="text-bse text-bold leading-loose md:pr-60 ">
              Employers are concerned about the growing skills mismatches and
              workforce shortages and the challenge of attracting motivated and
              competent workers. If left unattended, this worrying trend could
              negatively impact productivity and innovation across sectors.
            </p>
          </Col>

          <Col xl={24} className="py-5">
            <h2 className="text-lg text-bold">
              The project’s overall aim is to develop and demonstrate worldwide
              assessment and learning, innovative technology, and a
              knowledge-based system, which will help every user to adapt their
              skill sets to the demands of the labor market focusing on
              in-demand skills of the future.
            </h2>
          </Col>

          <Col xl={24}>
            <p className="text-bse text-bold leading-loose md:pr-60">
              The proposed solution will integrate the development of technical,
              digital, and soft skills by providing labor market intelligence
              and skills analytics and recommending users’ actions for bridging
              the gap between their skills profile and the one recommended for
              their target jobs. In addition, this solution will lead to the
              recognition of people’s new learning and certification of their
              skills.
            </p>
          </Col>

          <Col lg={24}>
            <h2 className="text-3xl text-bold leading-normal">Objectives</h2>
          </Col>

          <Col xl={20}>
            <ul className="marker:text-purple-50 marker:text-2xl list-outside list-disc text-xl ml-5">
              <li className="text-base text-black pt-2">
                To develop a standardized framework for job descriptions and
                online training services by identifying employability skills and
                mapping them to a curated skills database
              </li>

              <li className="text-base text-black pt-5">
                To use unifaires’ machine learning and intelligent system to
                ensure the exact fit between job requirements and people skills
                and recommend individuals to courses containing skills that they
                are missing
              </li>

              <li className="text-base text-black pt-5">
                To create a trusted and cost-effective platform for verified and
                rapid skills search by employers and in-demand skills tracking
                for academic and educational institutions
              </li>
            </ul>
          </Col>

          <Col lg={24}>
            <h2 className="text-lg text-bold leading-normal ml-5">
              As part of the Skills Matching Project, we invite partners and
              individuals to provide interoperable data.
            </h2>
          </Col>

          {/* <Col lg={24} className="py-5 ml-5">
            <Button type="primary" size="large" className="rounded-lg">
              Learn More
            </Button>
          </Col> */}
        </Row>
      </section>
    </div>
  );
};

export default SkillsPage;
