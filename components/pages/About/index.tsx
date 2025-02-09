"use client";
import { Row, Col, Button } from "antd";
import micIcon from "@/public/images/micIcon.png";
import KeyIcon from "@/public/images/keyIcon.png";
import handIcon from "@/public/images/handIcon.png";
import aboutPic from "@/public/images/aboutPic.png";
import clipIcon from "@/public/images/clipIcon.png";
import graphIcon from "@/public/images/graphIcon.png";
import aboutGirl from "@/public/images/aboutGirl.png";
import aboutText from "@/public/images/aboutText.png";
import aboutSide from "@/public/images/aboutSide.png";
import aboutSystem from "@/public/images/aboutSystem.png";
import computerIcon from "@/public/images/computerIcon.png";
import Image from "next/image";
import Container from "@/components/shared/container";
import { CaretRightOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
const AboutPage = () => {
  const router = useRouter();

  const getInTouch = () => {
    router.push("/contact");
  };
  return (
    <div>
      <section className="lg:px-20 px-5 bg-purple-50 pt-20">
        <Container>
          <Row gutter={[16, 16]}>
            <Col xl={16} sm={24} xs={24} className="py-10">
              <Row gutter={[16, 16]}>
                <Col xl={24}>
                  <h2 className="xl:text-5xl text-3xl font-bold leading-snug text-white">
                    Get Access to Unlimited <br /> Educational & Career
                    Resources. Everywhere, Everytime!
                  </h2>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <p className="text-base font-light text-white">
                    Get unlimited access with one-off subscription
                  </p>
                </Col>

                <Col xl={2} lg={2} md={2} sm={3} xs={3}>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<CaretRightOutlined />}
                    size="large"
                    className="bg-[#4867D6] "
                  />
                </Col>

                <Col xl={8} lg={2} sm={16} xs={16}>
                  <p className="pt-2 text-sm text-white font-extralight">
                    See How It Works
                  </p>
                </Col>
              </Row>
            </Col>

            <Col xl={8} className="xl:flex hidden">
              <Image src={aboutPic} alt="picture" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-20 text-center bg-white">
        <Container>
          <Row className="lg:px-20 px-5 text-center" gutter={[16, 8]}>
            <Col xl={8} sm={24} xs={24}>
              <Image src={handIcon} alt="picture" />
              <h2 className="p-2 text-base text-[#5C5C5C]">Unlimited Access</h2>
              <p className="text-sm font-light text-[#5C5C5C]">
                One subscription unlimited access
              </p>
            </Col>

            <Col xl={8} sm={24} xs={24}>
              <Image src={computerIcon} alt="picture" />
              <h2 className="p-2 text-[#5C5C5C]">Personalized Learning</h2>
              <p className="text-sm font-light text-[#5C5C5C]">
                gain new skills through personalized learning and development
                courses
              </p>
            </Col>

            <Col xl={8} sm={24} xs={24}>
              <Image src={KeyIcon} alt="picture" />
              <h2 className="p-2 text-[#5C5C5C]">
                Job Posting & Career Development
              </h2>
              <p className="text-sm font-light text-[#5C5C5C]">
                See 2-3x increase in numbers reputable jobs posting. plan your
                career progression
              </p>
            </Col>

            <Col xl={8} sm={24} xs={24}>
              <Image src={clipIcon} alt="picture" />
              <h2 className="p-2 text-[#5C5C5C]">Events & Fair</h2>
              <p className="text-sm font-light text-[#5C5C5C]">
                Manage virture and in-person events and fairs
              </p>
            </Col>

            <Col xl={8} sm={24} xs={24}>
              <Image src={graphIcon} alt="picture" />
              <h2 className="p-2 text-[#5C5C5C]">
                Advanced & Skills Gap Analytics
              </h2>
              <p className="text-sm font-light text-[#5C5C5C]">
                showcase your value with the help of sophisticated analytics.
                reveal the skills that you need to acquire your next upskilling
                and reskilling move!
              </p>
            </Col>

            <Col xl={8} sm={24} xs={24}>
              <Image src={micIcon} alt="picture" />
              <h2 className="p-2 text-[#5C5C5C]">Marketing Tools</h2>
              <p className="text-sm font-light text-[#5C5C5C]">
                Reach students with eye-catching, actionable campaigns
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="xl:px-20 px-5 py-20 bg-white lg:text-left text-center  ">
        <Container>
          <Row gutter={[16, 16]}>
            <Col xl={17}>
              <Row gutter={[16, 16]}>
                <Col xl={24} sm={24} xs={24}>
                  <p className="text-sm lg:text-left text-center">
                    OUR MISSION
                  </p>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <h2 className="text-2xl text-purple-50">
                    Why we do what we do
                  </h2>
                </Col>

                <Col xl={15} sm={24} xs={24}>
                  <p className="text-base text-[#12355B] leading-loose font-light">
                    People need to know the labour market trends to build skills
                    for their professional lives. The internet contains an
                    unprecedented amount of labour market information with a
                    significant significant significant trade-off between
                    quality and and quantity. It could be confusing and
                    intimidating knowing the internet cannot cannot always
                    provide reliable guidance on career pathways and how to
                    change or advance them. This is most online job boards.
                  </p>
                </Col>
              </Row>
            </Col>

            <Col xl={7} sm={24} xs={24}>
              <Image src={aboutGirl} alt="picture" />
            </Col>

            <Col xl={24} sm={24} xs={24}>
              <p className="py-5 text-base leading-loose  text-black xl:px-80">
                The vision of the Jobs, Education & Funding category of
                Unifaires Group services is to help everyone get guided
                education and career direction that contribute to workplace
                equality, economic mobility, and career progression.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="xl:px-20 px-5 py-20 lg:text-left text-center">
        <Container>
          <Row>
            <Col xl={8} sm={24} xs={24}>
              <Image src={aboutGirl} alt="picture" />
            </Col>

            <Col xl={{ span: 12, offset: 4 }}>
              <Row gutter={[16, 16]}>
                <Col xl={24} sm={24} xs={24}>
                  <p className="text-base">MORE ABOUT US</p>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <h2 className="text-2xl text-purple-50">
                    Purposeful Drive to learning
                  </h2>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <p className="text-base text-[#12355B] text-left leading-loose font-light">
                    Founded in 2023, the Unifaires Group’s jobs, education &
                    funding service category is committed to creating an
                    integrated platform for an organization-wide alliance in
                    bridging skill gaps and for finding the right talent – a
                    platform where all people are enabled to reach their full
                    career and education milestones with little or no debts, and
                    by means of customer-centric delivery modes that accommodate
                    work and life responsibilities. In this service category, we
                    belong to a school of thought that believes in making career
                    change decisions as easy as possible. Unifaires operates a
                    shared services partnership dedicated to serving not just
                    colleges and universities, but also businesses &
                    enterprises, government, research & funding institutions in
                    a win-win in a win-win in alliance value propositions
                    manner. Our MISSION is to provide everyone with innovative
                    and transformative talent solutions that promote personal
                    career success and institutional growth.
                  </p>
                </Col>
              </Row>
            </Col>

            <Col xl={24} sm={24} xs={24}>
              <p className="py-5 text-base leading-loose text-left text-black xl:px-80 ">
                The vision of the Jobs, Education & Funding category of
                Unifaires Group services is to help everyone get guided
                education and career direction that contribute to workplace
                equality, economic mobility, and career progression.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="bg-grey-80 xl:px-60 px-5">
        <Container>
          <Row className="py-10" gutter={[16, 16]}>
            <Col xl={24} sm={24} xs={24}>
              <p className="lg:text-3xl text-2xl text-center text-purple-50">
                Why Unifaires?
              </p>
            </Col>

            <Col xl={24}>
              <p className="text-base font-light leading-loose text-left text-black">
                The skills gap is apparently responsible for the existence of
                unfilled job positions, as compared to the total number of
                unemployed. Organizations complain about skills, especially in
                recent graduates with little to no effective ways of addressing
                the problem. Aligning the curriculum with the needs of employers
                could eliminate the skills gap and give students a unique
                pathway towards achieving a career goal.
                <br /> <br />
                Our goal is to provide an upskilling and reskilling platform as
                a good strategy for automated career mentorship. Unlike
                available platforms with only enterprise-wide solutions,
                Unifaires democratizes access to workforce resources. With an
                aggregation of over a million job postings and degree programs
                and courses via our Academia-Industry alliance program,
                Unifaires extracts insightful and real-time labour market skills
                analytics and intelligence from real-world experiences to
                provide information and tools for tailored career growth. We
                match skills to build a learning experience that guides everyone
                to the right career path.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="xl:px-32 px-5 py-20 text-center ">
        <Container>
          <Row gutter={[16, 16]}>
            <Col xl={24} sm={24} xs={24}>
              <p className="text-base text-center">OUR PARTNERS</p>
            </Col>

            <Col xl={24} sm={24} xs={24}>
              <p className="text-3xl text-center text-purple-50">
                Unifaires Partner Program
              </p>
            </Col>

            <Col xl={24} sm={24} xs={24}>
              <p className="text-base font-light leading-loose text-left text-black">
                Unifaires’ work is shaped by partnerships. We collaborate with
                many different stakeholders. Unifaires recognizes the value of
                academia-industry collaborations nationally and internationally
                to promote workforce and education success. With this type of
                alliance, we are committed to providing partners with reliable
                data necessary to upskill, recruit and retain. In a dynamic
                talent solution and recruitment industry, we rely on robust data
                and technology-driven strategies to build an all-inclusive
                connection between employers, job candidates, and employees.
                Unifaires address the labour market challenges of skills
                identification and prediction of new jobs demand, upskilling,
                reskilling, and talent qualification on three main pillars:
                <br /> <br />
                Unifaires partners have a lot of benefits – from building a
                global brand and sharing their activities to attract future
                talents and driving digital innovation. Arouses your curiosity?
                We are always forming partnerships across academia and industry,
                maybe you could be our next partner
              </p>
            </Col>

            <Col xl={24} sm={24} xs={24}>
              <Link href="/invitation">
                <Button className="purple-button" size="large">
                  Learn more
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Row className="xl:px-40 px-5" gutter={[16, 16]}>
            <Col xl={8} sm={24} xs={24}>
              <Image src={aboutText} alt="picture" />
            </Col>

            <Col xl={16}>
              <Row gutter={[16, 16]}>
                <Col xl={24} sm={24} xs={24}>
                  <p className="text-base text-center">OUR PARTNERS</p>
                </Col>

                <Col xl={24}>
                  <p className="text-3xl text-center text-purple-50">
                    Join our Career Network
                  </p>
                </Col>

                <Col xl={24}>
                  <p className="text-[#12355B] text-center text-base font-normal leading-loose">
                    Are you ready to join us in preparing the global workforce
                    for the jobs of tomorrow through transformative career and
                    educational services?
                  </p>
                </Col>

                {/* <Col xl={24} sm={24} xs={24} className="text-center">
                  <Button className="purple-button" size="large">
                    Get in touch
                  </Button>
                </Col> */}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="xl:px-32 px-5 xl:text-left text-center py-2">
        <Container>
          <Row gutter={[16, 16]}>
            <Col xl={24} sm={24} xs={24}>
              <p className="text-base text-[#12355B] font-normal">
                VETTED TALENT PROGRAM
              </p>
            </Col>
            <Col xl={24}>
              <p className="xl:text-3xl text-2xl font-semibold text-purple-50">
                Apply for a seat in our vetted talent program – <br />
                Hire or get hired.
              </p>
            </Col>

            <Col xl={20}>
              <p className=" text-[#12355B] text-base font-normal leading-loose">
                At the unifaires Business & Digital Technology Career Institute,
                we provide you with the right career consultation and training
                to get you hired. We also ready vetted talents to assist our
                partners to promote their activities. Our vetted program is
                global.
              </p>
            </Col>

            <Col xl={24}>
              <p className="text-base font-normal leading-loose text-purple-50">
                Learn more about Unifaires vetted talent program
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="xl:px-32 px-5 lg:text-left text-center">
        <Container>
          <Row gutter={[32, 16]}>
            <Col xl={14}>
              <Row gutter={[16, 16]}>
                <Col xl={24} sm={24} xs={24}>
                  <p className="text-lg font-light"> USE CASES</p>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <p className="xl:text-3xl text-2xl font-medium text-purple-50">
                    For Students, Job seekers, Employers, Colleges, Universities
                  </p>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <p className=" text-[#12355B] xl:text-lg text-base font-light leading-loose">
                    Unifares works with employers, higher and further education
                    institutions to embed our jobs, education, and funding
                    portfolio within their talent development programs, academic
                    and corporate training curriculum.
                  </p>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <ul className="marker:text-purple-50 marker:text-2xl list-outside list-disc lg:text-lg text-left">
                    <li className="ml-4 mb-2 text-sm text-[#2F2F2F] font-light">
                      A digital skills certification to supplement the student’s
                      academic qualifications and improve their professional
                      life.
                    </li>
                    <li className="ml-4 mb-2 text-sm text-[#2F2F2F] font-light">
                      Integrated within student’s coursework to extend the
                      learning into the realm of te workplace.
                    </li>

                    <li className="ml-4 mb-2 text-sm text-[#2F2F2F] font-light">
                      Improving the employability of students as they embark on
                      their working lives after graduation.
                    </li>
                  </ul>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <p className="text-3xl font-medium text-purple-50">
                    Key Benefits
                  </p>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <ul className="marker:text-purple-50 marker:text-2xl list-outside list-disc lg:text-lg text-left">
                    <li className="ml-4 mb-2 text-sm text-[#2F2F2F] font-light">
                      <span className="text-[#2F2F2F] text-base font-normal pr-1 ">
                        Academic Institution:
                      </span>
                      Improve the employability of learners.
                    </li>
                    <li className="ml-4 mb-2 text-sm text-[#2F2F2F] font-light">
                      <span className="text-[#2F2F2F] text-base font-normal pr-1 ">
                        Lecturer and Teacher:
                      </span>
                      Continiously track in-demand skills to extend teaching
                      with revamped academic curriculum.
                    </li>

                    <li className="ml-4 mb-2 text-sm text-[#2F2F2F] font-light">
                      <span className="text-[#2F2F2F] text-base font-normal pr-1 ">
                        Student:
                      </span>
                      Stand out from your competitors and be ready for the world
                      of work.
                    </li>

                    <li className="ml-4 mb-2 text-sm text-[#2F2F2F] font-light">
                      <span className="text-[#2F2F2F] text-base font-normal pr-1 ">
                        Employer:
                      </span>
                      Prepare students for the workspace via virtual and later
                      onsite internship programs as well as upskill and reskill
                      employees with the skills they need to succeed.
                    </li>
                  </ul>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <p className="text-[#242424] text-lg font-semibold">
                    How to get Involved?
                  </p>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <p className="text-[#242424] text-sm font-semibold">
                    If you would like to find out more, please contact the team
                    using Our
                    <span className="text-[#CD1F2A] underline">
                      Contact Form
                    </span>
                  </p>
                </Col>
              </Row>
            </Col>

            <Col xl={10} sm={24} xs={24}>
              <Image src={aboutSystem} alt="picture" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="xl:p-32 p-5">
        <Container>
          <Row gutter={32}>
            <Col xl={12} sm={24} xs={24}>
              <Image src={aboutSide} alt="picture" />
            </Col>

            <Col xl={12} className="xl:px-10 px-5">
              <Row gutter={[16, 16]}>
                <Col xl={24} sm={24} xs={24}>
                  <p className="text-lg font-light"> CAREERS</p>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <p className="text-3xl font-medium text-black ">
                    Come work with us
                  </p>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <p className=" text-[#12355B]  text-lg font-light leading-loose">
                    At Unifaires Group, every member of the community plays an
                    important role in fulfilling our mission of providing
                    everyone with innovative and transformative talent solutions
                    that promote personal career success and institutional
                    growth. Want to make a difference? Look no further – We need
                    your talent!
                  </p>
                </Col>

                {/* <Col xl={12} sm={24} xs={24}>
                  <Button type="primary" block size="large">
                    Explore Job Opportunies
                  </Button>
                </Col> */}
                <Col xl={12} sm={24} xs={24}>
                  <p className="text-xl text-[#0368FF] pt-2">Support Us</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="lg:px-32 px-5 pb-20 ">
        <Container>
          <Row>
            <Col xl={2} sm={24} xs={24}>
              <p className=" text-5xl text-[#0368FF] xl:ml-5">?</p>
            </Col>
            <Col xl={22} sm={24} xs={24}>
              <p className="text-2xl text-[#0368FF]  font-light leading-loose xl:ml-5">
                View common questions
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;
