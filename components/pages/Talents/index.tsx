"use client";

import { Row, Col, Card, Button, Avatar } from "antd";
import pic from "@/public/images/talentPic.png";
import Image from "next/image";

const TalentsPage = () => {
  return (
    <div className="bg-grey-50">
      <section className=" md:px-20 px-5 py-10 ">
        <Row className="py-5" gutter={[16, 16]}>
          <Col lg={24}>
            <h2 className="text-3xl text-bold">Our Vetted Talent Program</h2>
          </Col>

          <Col xl={24} className="">
            <Image src={pic} alt="paris picture" />
          </Col>

          <Col xl={24}>
            <h2 className="text-xl text-bold pt-2">
              Introducing talent vetting
            </h2>
          </Col>

          <Col xl={24}>
            <p className="text-bse text-bold leading-loose lg:pr-60">
              jobs, according to Carleton University Career Services. Often,
              employers skip posting jobs online and rather enter the hidden job
              market mode. In fact, 15 % of the job posting that is advertised
              are at the tip of the iceberg while the remaining 85 % of the
              iceberg consist of unadvertised Online job postings can be
              convenient and accessible, but this makes them much more
              competitive.
            </p>
          </Col>

          <Col xl={24} className="pt-10">
            <h2 className="text-xl text-bold">
              Your skills need to be trusted
            </h2>
          </Col>

          <Col xl={24}>
            <p className="text-bse text-bold leading-loose lg:pr-60">
              To access the hidden job market, candidates go directly to the
              employers and their career pages. Information Interviews can be
              arranged with Industry Professionals. Candidates may also leverage
              networks and talk to people about their experiences. In all,
              businesses want to trust people’s true skills.
              <br /> <br />
              In addition to skills gap-bridging learning, the vetted talent
              program at the Unifaires Business & Digital Technology Career
              Institute ensures that you the positive interview feedback, get
              hired and businesses can view your profile as a reliable talent.
            </p>
          </Col>
        </Row>
      </section>

      <section className="px-5">
        <Row>
          <Col xl={24} sm={24}>
            <h2 className="lg:text-3xl text-2xl text-bold text-center">
              Apply for a seat in our Vetted TalentProgram
            </h2>
          </Col>
        </Row>
      </section>

      <section className="lg:px-80 px-5 ">
        <Row>
          <Col xl={24} sm={24} xs={24} className="py-2 text-center">
            <Avatar size={50} className="bg-purple-50">
              1
            </Avatar>
          </Col>

          <Col lg={24} sm={24} xs={24} className="py-4 lg:text-center">
            <Card className="shadow-4xl rounded-xl">
              <Row>
                <Col lg={24}>
                  <h2 className="text-lg font-semibold">Apply</h2>
                </Col>

                <Col lg={24} className="lg:px-12">
                  <p className="text-base font-normal text-black">
                    Book your FREE get-to-know call by clicking the button below
                    and answering our questions. Fill out the application form
                    in line with the occupation and skills that you would like
                    to get hired or find vetted talents on.
                  </p>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xl={24} sm={24} xs={24} className="py-2 text-center">
            <Avatar size={50} className="bg-purple-50">
              2
            </Avatar>
          </Col>

          <Col lg={24} sm={24} xs={24} className="py-4 lg:text-center">
            <Card className="shadow-4xl rounded-xl">
              <Row>
                <Col lg={24}>
                  <h2 className="text-lg font-semibold">
                    Get-To-Know Call with Our Subject Matter Experts
                  </h2>
                </Col>

                <Col lg={24} className="lg:px-12">
                  <p className="text-base font-normal text-black">
                    Our knowledgeable experts will book an online meeting a FREE
                    25-minute get-to-know call to confirm your needs and provide
                    the necessary support.
                  </p>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xl={24} sm={24} xs={24} className="py-2 text-center">
            <Avatar size={50} className="bg-purple-50">
              3
            </Avatar>
          </Col>

          <Col lg={24} className="py-4 lg:text-center">
            <Card className="shadow-4xl rounded-xl">
              <Row>
                <Col lg={24}>
                  <h2 className="text-lg font-semibold">
                    Career Strategy Consultations
                  </h2>
                </Col>

                <Col lg={24} sm={24} xs={24} className="lg:px-12">
                  <p className="text-base font-normal text-black">
                    In a FREE 25 to 45-minute career consultation, we discuss
                    with business partners who want to hire vetted talents about
                    available talents and implementation roadmap and strategy.
                    We also discuss with candidates the approach to vetting
                    their talents.
                  </p>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xl={24} sm={24} xs={24} className="py-2 text-center">
            <Avatar size={50} className="bg-purple-50">
              4
            </Avatar>
          </Col>

          <Col lg={24} className="py-4 lg:text-center">
            <Card className="shadow-4xl rounded-xl">
              <Row>
                <Col lg={24}>
                  <h2 className="text-lg font-semibold">
                    Collaboration & Closing
                  </h2>
                </Col>

                <Col lg={24} className="lg:px-12">
                  <p className="text-base font-normal text-black">
                    If we agree to the roadmap and implementation strategy, the
                    business will normally take not more than one week to get
                    the requested vetted talent. Candidates who join our program
                    to vet their talent could take part in our 3 – 6 months
                    career path training and internship program for job
                    readiness on a case-by-case basis.
                  </p>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* <Col lg={24} className="text-center py-4">
            <Button type="primary" size="large" className="rounded-lg">
              Apply Now
            </Button>
          </Col> */}
        </Row>
      </section>

      <section className="lg:p-20 p-5">
        <Row gutter={16}>
          {/* <Col xl={4} sm={24} xs={24}>
            <Row>
              <Col xl={24} sm={24} xs={24}>
                <h4 className="text-lg text-semibold">OUR OFFICE ADDRESS</h4>
              </Col>

              <Col xl={24} sm={24} xs={24} className="pt-5">
                <p>Stormstraße 17, 50997 Cologne, Germany</p>
              </Col>
            </Row>
          </Col> */}

          <Col xl={4} sm={24} xs={24}>
            <Row>
              <Col xl={24} sm={12} xs={12}>
                <h4 className="text-lg text-semibold">BUSINESS HOURS</h4>
              </Col>

              <Col xl={24} sm={12} xs={12} className="lg:pt-5 pt-1">
                <p>9 AM – 6 PM, Mon to Fri</p>
              </Col>
            </Row>
          </Col>

          <Col xl={4} sm={24} xs={24}>
            <Row>
              <Col xl={24} sm={6} xs={6}>
                <h4 className="text-lg text-semibold">CONTACT</h4>
              </Col>

              <Col xl={24} sm={18} xs={18} className="lg:pt-5 pt-1">
                <p className="text-purple-50">
                  vettedtalentprogram@unifaires.com
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default TalentsPage;
