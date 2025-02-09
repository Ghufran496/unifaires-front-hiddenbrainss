"use client";

import { Row, Col, Typography, Button } from "antd";
import Link from "next/link";

const PartnershipPage = () => {
  const { Title, Paragraph } = Typography;
  return (
    <div>
      <section className="xl:pl-20 xl:pr-60 md:pl-10 md:pr-28 px-10 py-10">
        <Row gutter={[16, 8]}>
          <Col xl={24}>
            <Title level={2}> Partnerships </Title>
          </Col>

          <Col xl={24}>
            <Paragraph>
              Unifaires is in business to provide services to a wide range of
              customers and partners – private, public, and civil society
              stakeholders across the globe.
            </Paragraph>
          </Col>

          <Col xl={24} className="pt-5">
            <Title level={4}>
              {" "}
              Unifaires Business Partners have common qualities{" "}
            </Title>
          </Col>

          <Col xl={24}>
            <ul className="marker:text-purple-50 marker:text-2xl list-outside list-disc text-xl ml-5">
              <li className="text-base text-black pt-2">
                Increasing chance of candidates for future of work
              </li>

              <li className="text-base text-black pt-5">
                Strong commitment to academic research and advancing education
              </li>
            </ul>
          </Col>

          <Col xl={24} className="pt-10">
            <Title level={4}>
              As a Unifaires Business Partner, we help you
            </Title>
          </Col>

          <Col xl={24}>
            <ul className="marker:text-purple-50 marker:text-2xl list-outside list-disc text-xl ml-5">
              <li className="text-base text-black pt-2">
                Increasing chance of candidates for future of work
              </li>

              <Paragraph className="text-black text-base font-light pt-2">
                Unifaires’ activities are shaped by partnerships. We collaborate
                with many different stakeholders in promoting promote workforce
                and education success, nationally and internationally. Unifaires
                partners have a lot of benefits – frombuilding a global brand
                and sharing to attracting future talents and driving digital
                innovation. Arouses your curiosity? We are always forming
                partnerships across academia and industry, maybe you could be
                our next partner
              </Paragraph>

              <li className="text-base text-black pt-5">
                Strong commitment to academic research and advancing education
              </li>

              <Paragraph className="text-black text-base font-light pt-2">
                In addition to showcasing your organization and brand to a
                global audience, you have the option to recruit students and
                talents to your courses and organization, respectively. The
                integrated unifaires education and career 4.0 platform provide a
                job-course recommendation system – this implies that learners
                and job candidates will always be receptive to the platform.
              </Paragraph>

              <li className="text-base text-black pt-5">
                Drive Digital Transformation Initiatives
              </li>

              <Paragraph className="text-black text-base font-light pt-2">
                Partners will get the necessary and complete support in
                promoting a truly “digital mindset”. We collaborate with our
                partners in understanding their digital customers via trend
                spotting and analysis.
              </Paragraph>
            </ul>
          </Col>

          <Col xl={24} className="pt-5">
            <Title level={4}>Partnership on Full-scale Blended Learning</Title>
          </Col>

          <Col xl={24}>
            <Paragraph className="text-black text-base font-light ">
              Aside from the opportunity for brand and talent management,
              full-scale blended learning will also be the focal point of our
              partnerships. Unifaires’ online learning and education platform
              will be integrated into the partners’ learning experience to
              address the need for high-quality, job-relevant skills by her
              students, faculty, and employees on a large scale and affordable
              price via integrated API and voucher code wholly owned and managed
              by our partners. Unifaires partner courses span popular college,
              university, and K-12 academics and education courses and subjects
              like engineering, business, data science, health, and arts, which
              are available as modular and role-based short courses, test exams
              and certifications, academic degrees and micro-credentials,
              continuing education, professional and executive education, MBA,
              and executive MBA learning paths in various study modes.
            </Paragraph>
          </Col>

          <Col xl={24} className="pt-5">
            <Title level={4}>Get in touch </Title>
          </Col>

          <Col xl={24}>
            <p className="text-black text-base font-light pb-4 ">
              If you are interested in becoming a partner, want more
              information, or have further questions please, email us at
              <span className="text-purple-50 pl-2">info@unifaires.com</span> or
              simply register here.
            </p>
            <Link href="/signup-business">
              <Button type="primary" size="large" className="mt-0">
                Register Now
              </Button>
            </Link>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default PartnershipPage;
