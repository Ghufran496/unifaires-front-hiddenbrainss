"use client"
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

// ants and icons
import {
  Row,
  Col,
  Button,
  Card,
  Skeleton,
  Carousel,
  Typography,
  Grid,
} from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import config from "@/app/utils/config";

import category1 from "@/public/images/category1.png";
import category2 from "@/public/images/category2.png";
import category3 from "@/public/images/category3.png";
import greater from "@/public/images/right.svg";
import paris from "@/public/images/paris.svg";
import brownRight from "@/public/images/brownRight.svg";
import play from "@/public/images/play.svg";
import playbrown from "@/public/images/playbrown.svg";
import infinity from "@/public/images/infinity.svg";
import jobs from "@/public/images/jobs2.png";
import microsoft from "@/public/images/microsoft.png";
import telsa from "@/public/images/tesla.png";
import ibm from "@/public/images/ibm.png";
import cousera from "@/public/images/coursera.png";
import emory from "@/public/images/emory-university.png";

import Container from "@/components/shared/container";

import { fetchAllTax } from "@/redux/features/TaxSlice";
import { useAppDispatch } from "@/redux/hooks";

import HeroSection from "./HeroSection";
import HomeCourseCard from "./HomeCourseCard";
import HomeFundingsCard from "./HomeFundingCard";
import HomeJobsCard from "./HomeJobsCard";

import { ICourse } from "../Business/Courses/course.interface";

const { Title, Paragraph } = Typography;

const HomePage = () => {
  const screens = Grid.useBreakpoint();
  const ref: any = useRef();
  const dispatch: any = useAppDispatch();

  const [course, setCourse] = useState<Array<ICourse>>();
  const [job, setJob] = useState<Array<any>>();
  const [funding, setFunding] = useState<Array<any>>();
  const [fetchingCourse, setFetchingCourse] = useState(true);
  const [fetchingJob, setFetchingJob] = useState(true);
  const [fetchingFunding, setFetchingFunding] = useState(true);
  
  const limit = 20;
  
  const fetchCourses = async () => {
    await axios
      .get(`${config.API.API_URL}/course`)
      .then((response) => {
        const courses = response.data.data.courses;
        const filteredCourses = courses.filter((c: any) => c.pricing !== null);
        const limitedCourses = filteredCourses.slice(0, limit);
        setCourse(limitedCourses);
        // console.log(response);
        setFetchingCourse(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };
  const fetchJobs = async () => {
    await axios
      .get(`${config.API.API_URL}/jobs`)
      .then((response) => {
        const jobs = response.data.data.jobs;
        const limitedJobs = jobs.slice(0, limit);
        setJob(limitedJobs);
        setFetchingJob(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };
  const fetchFundings = async () => {
    await axios
      .get(`${config.API.API_URL}/funding`)
      .then((response) => {
        const fundings = response.data.data.fundings;
        const limitedFundings = fundings.slice(0, limit);
        setFunding(limitedFundings);
        setFetchingFunding(false);
      })
      .catch((error) => {
        console.error("Error fetching funding:", error);
      });
  };

  const nextCarousel = () => {
    ref.current.next();
  };
  const prevCarousel = () => {
    ref.current.prev();
  };

  useEffect(() => {
    console.log("HOME PAGE");
    
    fetchCourses();
    fetchJobs();
    fetchFundings();
    dispatch(fetchAllTax());
  }, []);
  return (
    <div>
      <HeroSection />
      {screens.xs ? (
        <section className="relative lg:px-10 pt-6 px-5 pb-2 bg-grey-50">
          <Title level={3} className="text-center">
            Browse by Categories
          </Title>
          <div className="absolute top-[45%] z-10">
            <Button
              type="text"
              size="large"
              className="flex items-center justify-center font-bold bg-gray-300 py-8"
              icon={<LeftOutlined className="text-[2em]" />}
              onClick={prevCarousel}
            />
          </div>
          <div className="absolute right-6 top-[45%] z-10">
            <Button
              type="text"
              size="large"
              className="flex items-center justify-center font-bold  bg-gray-300 py-8"
              icon={<RightOutlined className="text-[2em]" />}
              onClick={nextCarousel}
            />
          </div>

          <Carousel
            ref={ref}
            autoplay
            // className="flex gap-4 px-2 pb-8 bg-grey-50"
          >
            <div>
              <Card className="rounded-xl shadow-3xl ">
                <Row gutter={[16, 16]}>
                  <Col lg={24} sm={24} xs={24}>
                    <p className="text-base font-semibold font-Montserrat text-grey-60">
                      Apply to the right job
                    </p>
                  </Col>

                  <Col lg={24} sm={24} xs={24}>
                    <p className="text-lg font-semibold font-Montserrat text-purple-50 ">
                      Jobs
                    </p>
                  </Col>

                  <Col lg={24} sm={24} xs={24}>
                    <Image src={category1} alt="icon" />
                  </Col>

                  <Col lg={24} sm={24} xs={24}>
                    <p className="text-base font-medium font-Montserrat text-grey-70">
                      Several millions of people are looking for career for
                      guidance. At unifaires, job descriptions are standardized
                      to provide career pathways for everyone
                    </p>
                  </Col>

                  <div className="mt-12">
                    <Link href="/career">
                      <Button className="flex flex-row items-center p-5 text-white rounded-md bg-purple-50">
                        Search Jobs
                        <span className="pl-20">
                          <Image src={greater} alt="icon" />
                        </span>
                      </Button>
                    </Link>
                  </div>
                </Row>
              </Card>
            </div>
            <div>
              <Card className="rounded-xl shadow-3xl ">
                <Row gutter={[16, 16]}>
                  <Col lg={24} sm={24} xs={24}>
                    <p className="text-base font-semibold font-Montserrat text-grey-60 ">
                      Develop your talent
                    </p>
                  </Col>

                  <Col lg={24} sm={24} xs={24}>
                    <p className="text-lg font-semibold font-Montserrat text-purple-50 ">
                      Courses & Certifications
                    </p>
                  </Col>

                  <Col lg={24} sm={24} xs={24}>
                    <Image src={category2} alt="icon" />
                  </Col>

                  <Col lg={24} sm={24} xs={24}>
                    <p className="text-base font-medium font-Montserrat text-grey-70">
                      As talent gaps widen and technological advancement
                      accelerates, organizations are struggling to attract the
                      right talent and people want to reshuffle their skills
                    </p>
                  </Col>
                  <div>
                    <Link href="/courses">
                      <Button className="flex flex-row items-center p-5 text-white rounded-md bg-purple-50">
                        Discover your career
                        <span className="pl-20">
                          <Image src={greater} alt="icon" />
                        </span>
                      </Button>
                    </Link>
                  </div>
                </Row>
              </Card>
            </div>
            <div>
              <Card className="rounded-xl shadow-3xl ">
                <Row gutter={[16, 16]}>
                  <Col lg={24} sm={24} xs={24}>
                    <p className="text-base font-semibold font-Montserrat text-grey-60 ">
                      Explore funding & grants opportunities
                    </p>
                  </Col>

                  <Col lg={24} sm={24} xs={24}>
                    <p className="text-lg font-semibold font-Montserrat text-purple-50 ">
                      Funding, Grants & Scholarships
                    </p>
                  </Col>

                  <Col lg={24} sm={24} xs={24}>
                    <Image src={category3} alt="icon" />
                  </Col>

                  <Col lg={24} sm={24} xs={24}>
                    <p className="text-base font-medium font-Montserrat text-grey-70">
                      At unifaires, we have a comprehensive list of funds,
                      grunts, and scholarships for your financial and technical
                      support
                    </p>
                  </Col>
                  <div>
                    <Link href="/funding">
                      <Button className="flex flex-row items-center p-5 text-white rounded-md bg-purple-50">
                        Find your next funding
                        <span className="pl-20">
                          <Image src={greater} alt="icon" />
                        </span>
                      </Button>
                    </Link>
                  </div>
                </Row>
              </Card>
            </div>
          </Carousel>
        </section>
      ) : (
        <section className="lg:px-10 px-5 pb-2 bg-grey-50">
          <Container>
            <Row className="lg:px-6 justify-center" gutter={[64, 16]}>
              <Col lg={24} sm={24} xs={24} className="pt-10 ">
                <p className="lg:text-3xl text-2xl font-medium text-center">
                  Browse by Categories
                </p>
              </Col>

              <Col lg={8} sm={24} xs={24} className="flex">
                <Card className="rounded-xl shadow-3xl ">
                  <Row gutter={[16, 16]}>
                    <Col lg={24} sm={24} xs={24}>
                      <p className="text-base font-semibold font-Montserrat text-grey-60">
                        Apply to the right job
                      </p>
                    </Col>

                    <Col lg={24} sm={24} xs={24}>
                      <p className="text-lg font-semibold font-Montserrat text-purple-50 ">
                        Jobs
                      </p>
                    </Col>

                    <Col lg={24} sm={24} xs={24}>
                      <Image src={category1} alt="icon" />
                    </Col>

                    <Col lg={24} sm={24} xs={24}>
                      <p className="text-base font-medium font-Montserrat text-grey-70">
                        Several millions of people are looking for career for
                        guidance. At unifaires, job descriptions are
                        standardized to provide career pathways for everyone
                      </p>
                    </Col>

                    <div className="mt-12">
                      <Link href="/career">
                        <Button className="flex flex-row items-center p-5 text-white rounded-md bg-purple-50">
                          Search Jobs
                          <span className="pl-20">
                            <Image src={greater} alt="icon" />
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </Row>
                </Card>
              </Col>

              <Col lg={8} className="flex">
                <Card className="rounded-xl shadow-3xl ">
                  <Row gutter={[16, 16]}>
                    <Col lg={24} sm={24} xs={24}>
                      <p className="text-base font-semibold font-Montserrat text-grey-60 ">
                        Develop your talent
                      </p>
                    </Col>

                    <Col lg={24} sm={24} xs={24}>
                      <p className="text-lg font-semibold font-Montserrat text-purple-50 ">
                        Courses & Certifications
                      </p>
                    </Col>

                    <Col lg={24} sm={24} xs={24}>
                      <Image src={category2} alt="icon" />
                    </Col>

                    <Col lg={24} sm={24} xs={24}>
                      <p className="text-base font-medium font-Montserrat text-grey-70">
                        As talent gaps widen and technological advancement
                        accelerates, organizations are struggling to attract the
                        right talent and people want to reshuffle their skills
                      </p>
                    </Col>
                    <div>
                      <Link href="/courses">
                        <Button className="flex flex-row items-center p-5 text-white rounded-md bg-purple-50">
                          Discover your career
                          <span className="pl-20">
                            <Image src={greater} alt="icon" />
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </Row>
                </Card>
              </Col>

              <Col lg={8} className="flex">
                <Card className="rounded-xl shadow-3xl ">
                  <Row gutter={[16, 16]}>
                    <Col lg={24} sm={24} xs={24}>
                      <p className="text-base font-semibold font-Montserrat text-grey-60 ">
                        Explore funding & grants opportunities
                      </p>
                    </Col>

                    <Col lg={24} sm={24} xs={24}>
                      <p className="text-lg font-semibold font-Montserrat text-purple-50 ">
                        Funding, Grants & Scholarships
                      </p>
                    </Col>

                    <Col lg={24} sm={24} xs={24}>
                      <Image src={category3} alt="icon" />
                    </Col>

                    <Col lg={24} sm={24} xs={24}>
                      <p className="text-base font-medium font-Montserrat text-grey-70">
                        At unifaires, we have a comprehensive list of funds,
                        grunts, and scholarships for your financial and
                        technical support
                      </p>
                    </Col>
                    <div>
                      <Link href="/funding">
                        <Button className="flex flex-row items-center p-5 text-white rounded-md bg-purple-50">
                          Find your next funding
                          <span className="pl-20">
                            <Image src={greater} alt="icon" />
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      <section className="py-10 bg-grey-50 lg:px-28 px-5">
        <Container>
          <Row>
            <Col lg={{ span: 24, offset: 0 }}>
              <Card className="shadow-4xl rounded-xl lg:py-10">
                <Row
                  className="flex items-center justify-center text-center"
                  gutter={[16, 16]}
                >
                  <Col lg={{ span: 4, offset: 8 }} sm={24} xs={24}>
                    <Image src={paris} alt="paris picture" />
                  </Col>

                  <Col
                    lg={12}
                    sm={24}
                    xs={24}
                    className="pt-5 pl-2 text-lg lg:text-left text-center"
                  >
                    <p>2,305+ Courses</p>
                  </Col>

                  <Col lg={24} sm={24} xs={24} className="pt-5 text-lg ">
                    <h4 className="text-3xl">Find suitable learning courses</h4>
                  </Col>

                  <Col
                    lg={24}
                    sm={24}
                    xs={24}
                    className="pt-5 font-Montserrat text-blue-60 xl:px-72 lg:px-40"
                  >
                    <p>
                      Unifaires helps people seeking to learn by providing them
                      with multiple courses to learn form; across various
                      industries and fields. We respect your privacy. And it’s
                      completely free to search.
                    </p>
                  </Col>

                  <div>
                    <Link href="/courses">
                      <Button className="flex flex-row items-center p-5 text-white rounded-md bg-purple-50">
                        Explore Courses
                        <span className="pl-20">
                          <Image src={greater} alt="icon" />
                        </span>
                      </Button>
                    </Link>
                  </div>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="lg:px-20 px-5 py-4 bg-grey-50">
        <Container>
          <Row gutter={[16, 16]}>
            <Col lg={24} sm={24} xs={24}>
              <h3 className="text-3xl text-brown-50">
                Explore 2,305 courses from various instructors
              </h3>
            </Col>

            <Col lg={20}>
              <h3 className="text-xl font-light text-black font-Montserrat">
                Search courses from 1,513 different institutions
              </h3>
            </Col>

            <Col lg={4}>
              <Link href="/courses">
                <p className="flex items-center font-light text-md text-brown-50 cursor-pointer">
                  See All
                  <span className="pl-2">
                    <Image src={brownRight} alt="paris picture" />
                  </span>
                </p>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="lg:px-20 px-5 py-4 bg-grey-50">
        <Container>
          <Skeleton active loading={fetchingCourse}>
            <div className="flex lg:justify-center md:justify-center gap-2 flex-wrap w-full">
              {course !== undefined &&
                course.slice(0, 4).map((eachCourse, index) => {
                  return (
                    <div
                      key={`course-item-${index}`}
                      className="lg:w-fit md:w-fit w-full"
                    >
                      <HomeCourseCard {...eachCourse} />
                    </div>
                  );
                })}
            </div>
          </Skeleton>
        </Container>
      </section>

      <section className="bg-grey-80">
        <Container>
          <Row
            gutter={[16, 16]}
            className="py-10 lg:pl-20 px-10 lg:text-left text-center"
          >
            <Col lg={8} sm={24} xs={24}>
              <Row gutter={[16, 16]}>
                <Col lg={4} sm={24} xs={24}>
                  <Image src={play} alt="paris picture" />
                </Col>

                <Col lg={12} className="pt-2 text-sm text-blue-60">
                  <p>
                    Learn in-demand skills with and endless pool of video
                    courses
                  </p>
                </Col>
              </Row>
            </Col>

            <Col lg={6} sm={24} xs={24}>
              <Row>
                <Col lg={5} sm={24} xs={24}>
                  <Image src={playbrown} alt="paris picture" />
                </Col>

                <Col lg={12} className="pt-2 text-sm text-brown-50">
                  <p>Choose courses taught by real-world experts </p>
                </Col>
              </Row>
            </Col>

            <Col lg={10} sm={24} xs={24}>
              <Row gutter={[16, 16]}>
                <Col lg={3} sm={24} xs={24}>
                  <Image src={infinity} alt="paris picture" />
                </Col>

                <Col lg={12} className="pt-1 text-sm text-purple-50">
                  <p>
                    Learn at your own pace, with lifetime access on mobile and
                    desktop
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="lg:px-20 lg:py-20 p-5 ">
        <Container>
          <Row className="bg-purple-70 rounded-3xl" gutter={[16, 16]}>
            <Col lg={12}>
              <Row
                className="lg:pt-20 lg:pb-10 pt-10 lg:pl-20 px-5"
                gutter={[16, 16]}
              >
                <Col lg={24} className="">
                  <h4 className="lg:text-4xl text-2xl text-blue-70">
                    A diverse selection <br /> of job titles
                  </h4>
                </Col>
                <Col lg={24} className="">
                  <p className="text-xl text-blue-60">
                    From Philosophy to Anthropology, Data Science and
                    <br /> everything in-between; we have the right jobs you
                    need.
                  </p>
                </Col>

                <Col lg={24} className="lg:pt-28 pt-10">
                  <Link href="/career">
                    <Button className="purple-button" size="large">
                      See all Jobs
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>

            <Col lg={12}>
              <Image src={jobs} alt="paris picture" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="lg:px-20 px-5 py-10 ">
        <Container>
          <Row gutter={[16, 16]}>
            <Col lg={24}>
              <h3 className="text-3xl text-brown-50">
                Popular Funding, Grants & Scholarships
              </h3>
            </Col>

            <Col lg={20}>
              <h3 className="text-xl font-light text-blue-60 font-Montserrat">
                Check out Organisations that are making the most impact on
                Funding, Grants, & Scholarships
              </h3>
            </Col>

            <Col lg={4}>
              <Link href="/funding">
                <p className="flex items-center font-light text-md text-brown-50 cursor-pointer">
                  See All
                  <span className="pl-2">
                    <Image src={brownRight} alt="paris picture" />
                  </span>
                </p>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="lg:px-20 px-5 py-4 ">
        <Container>
          <Skeleton active loading={fetchingFunding}>
            <div className="flex flex-row lg:justify-center md:justify-start justify-center gap-4 flex-wrap w-full">
              {funding !== undefined &&
                funding.slice(0, 4).map((eachFunding, index) => {
                  return (
                    <div
                      key={`course-item-${index}`}
                      className="lg:w-fit md:w-fit w-full"
                    >
                      <HomeFundingsCard {...eachFunding} />
                    </div>
                  );
                })}
            </div>
          </Skeleton>
        </Container>
      </section>

      <section className="text-center bg-grey-80">
        <Container>
          <Row className="py-10 lg:pl-20 px-2 " gutter={[16, 16]}>
            <Col lg={24}>
              <h3 className="text-3xl text-center text-brown-50">
                Meet some of our educational and industry partners
              </h3>
            </Col>

            <Col lg={8} sm={24} xs={24} className="pt-2">
              <Image src={microsoft} alt="paris picture" />
            </Col>

            <Col lg={8} sm={24} xs={24} className="pt-4">
              <Image src={telsa} alt="paris picture" />
            </Col>

            <Col lg={8} sm={24} xs={24} className="pt-2">
              <Image src={ibm} alt="paris picture" />
            </Col>

            <Col lg={24} sm={24} xs={24} className="pt-10 text-center lg:px-60">
              <Row gutter={[16, 16]}>
                <Col lg={12} sm={24} xs={24}>
                  <Image src={cousera} alt="paris picture" />
                </Col>

                <Col lg={12} sm={24} xs={24}>
                  <Image src={emory} alt="paris picture" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="lg:px-20 px-5 py-10 ">
        <Container>
          <Row gutter={[16, 16]}>
            <Col lg={24}>
              <h3 className="text-3xl text-brown-50">In-Demand Jobs </h3>
            </Col>

            <Col lg={20}>
              <h3 className="text-xl font-light text-blue-60 font-Montserrat">
                We are committed to your growth by linking your learning with
                the jobs that matter to you.
              </h3>
            </Col>

            <Col lg={4}>
              <Link href="/career">
                <p className="flex items-center font-light text-md text-brown-50 cursor-pointer">
                  See All
                  <span className="pl-2">
                    <Image src={brownRight} alt="paris picture" />
                  </span>
                </p>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="lg:px-20 px-5 py-4 ">
        <Container>
          <Skeleton active loading={fetchingJob}>
            <div className="flex flex-row lg:justify-center md:justify-start justify-center gap-4 flex-wrap w-full">
              {job !== undefined &&
                job.slice(0, 4).map((eachJob, index) => {
                  return (
                    <div
                      key={`course-item-${index}`}
                      className="lg:w-fit md:w-fit w-full"
                    >
                      <HomeJobsCard {...eachJob} />
                    </div>
                  );
                })}
            </div>
          </Skeleton>
        </Container>
      </section>

      <section className="lg:px-40 px-5 py-10 ">
        <Container>
          <Row className="p-10 text-center bg-grey-80 rounded-3xl ">
            <Col lg={12} sm={24} xs={24}>
              <Row gutter={[16, 16]}>
                <Col lg={24} sm={24} xs={24}>
                  <h4 className="text-2xl font-semibold">
                    Transform the way you hire
                  </h4>
                </Col>

                <Col lg={24} sm={24} xs={24}>
                  <p className="text-sm font-light">
                    Leverage our network of verified talent to upscale your
                    <br />
                    business growth
                  </p>
                </Col>

                <Col lg={24} sm={24} xs={24} className="pt-2 text-center">
                  <Link href="/signup-business">
                    <Button className="purple-button " size="large">
                      Sign Up as a Business
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>

            <Col lg={12} sm={24} xs={24}>
              <Row gutter={[16, 16]}>
                <Col lg={24} sm={24} xs={24}>
                  <h4 className="text-2xl font-semibold mt-3">
                    Power your career
                  </h4>
                </Col>

                <Col lg={24} sm={24} xs={24}>
                  <p className="text-sm font-light">
                    Learn the skills needed for success in today’s <br /> world
                  </p>
                </Col>

                <Col lg={24} sm={24} xs={24} className="pt-2 text-center">
                  <Link href="/signup-individual">
                    <Button className="purple-button" size="large">
                      Sign Up as an Individual
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
