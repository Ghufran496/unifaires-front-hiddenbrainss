"use client";

import { Row, Col } from "antd";
import pic from "@/public/images/academia.png";

import Image from "next/image";

const AcademicPartnerPage = () => {
  return (
    <div className="bg-grey-50">
      <section className=" md:px-20 md:py-10  p-10">
        <Row className="py-5">
          <Col lg={24}>
            <h2 className="md:text-3xl text-2xl text-bold">
              Academic Partners Excellence
            </h2>
          </Col>

          <Col xl={24} className="py-5">
            <Image src={pic} alt="paris picture" />
          </Col>

          <Col lg={14}>
            <h2 className="md:text-3xl text-2xl text-bold leading-normal">
              Unifaires is keen to sign a memorandum of understanding with our
              academic partners.
            </h2>
          </Col>

          <Col xl={24}>
            <p className="text-bse text-bold leading-loose lg:pr-60">
              With this arrangement, it is our mission to foster academic
              synergy, collaboration, and partnership arrangement. This will
              mainly cover those areas of unifaires career network partnerships
              such as Mentorship for academic excellence, growth, and
              development as well as facilitation of access to academic and
              future of work resources and materials.
            </p>
          </Col>

          <Col xl={24} className="pt-10">
            <h2 className="text-xl text-bold">
              Promoting sustained institutional growth and development
            </h2>
          </Col>

          <Col xl={24}>
            <p className="text-bse text-bold leading-loose lg:pr-60">
              We continuously engage in research and development to identify
              areas to make significant investments in the success of our
              education partners according to their immediate needs and
              financial resource availability.
            </p>
          </Col>

          <Col xl={24} className="pt-10">
            <h2 className="text-xl text-bold">
              Engagement and investments are mostly in the following area:
            </h2>
          </Col>

          <Col xl={20}>
            <ul className="lg:marker:text-purple-50 lg:marker:text-2xl lg:list-outside lg:list-disc lg:text-xl lg:ml-5">
              <li className="text-base text-black pt-2">
                Devising the best-suited approach to finance the integrated
                online learning system and state-of-the-art classrooms
              </li>

              <li className="text-base text-black pt-5">
                IT centers and college-wide wireless networks
              </li>

              <li className="text-base text-black pt-5">
                Expansion of digital collections and improvement of the library
                system
              </li>
            </ul>
          </Col>

          <Col xl={24}>
            <p className="text-bse text-bold leading-loose lg:pr-60 pt-2">
              The envisaged synergy between unifaires and academic partners will
              deepen cross-institutional collaborations and facilitate exchange
              programs between the institutions. In turn, such partnership will
              promote human capital, national and international academic
              development, and growth and foster a great opportunity for
              innovative research activities as well as improve partners’ global
              outlook.
            </p>
          </Col>

          <Col xl={24} className="pt-10">
            <h2 className="text-xl text-bold">
              Academic Partners & Student Chapters Technology Fund
            </h2>
          </Col>

          <Col xl={24}>
            <p className="text-bse text-bold leading-loose lg:pr-60">
              At unifaires we do not just operate a consistently fair and
              transparent pricing strategy across products and services, but
              also assist our academic partners, including unifaires student and
              alumni career services chapters to engineer the allocation of
              equitable funding and fees on behalf of their members (e.g.,
              graduate, professional and undergraduate students) via Student
              Technology Fund & Administrative Fees toward corporate-wide
              licensing and supporting subscription to products and services on
              unifaires. Our intention is to support efforts that promote
              academic activities in an innovative and practical way, especially
              as it concerns meeting the needs of historically underserved
              students. Such fees are also expected to help provide the platform
              for to students find internships (including virtual internships)
              and in transitioning into a career.
            </p>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default AcademicPartnerPage;
