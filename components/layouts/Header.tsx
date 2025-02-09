/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
  BellOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Row,
  Col,
  Typography,
  Input,
  Dropdown,
  Button,
  Drawer,
  Divider,
  Badge,
  Space,
  Popover,
  Avatar,
  Select,
  Spin,
} from "antd";
import home from "@/public/images/home.svg";
import logo from "@/public/images/logo.png";
import caret from "@/public/images/caret.svg";
import england from "@/public/images/england.svg";
import Container from "@/components/shared/container";
import config from "@/app/utils/config";
import CourseCategories from "./CourseCategories";
import JobCategories from "./JobCategories";
import InstitutionAccess from "../pages/InstitutionAccess";
import Popup from "../shared/Popup";
import TopNav from "./TopNav";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { cartCourses } from "@/redux/features/CoursesSlice";
import { fetchUserProfile, fetchUserRole } from "@/redux/features/UserSlice";
import FundingCategories from "./FundingCategories";
import axiosInstance from "@/app/utils/axios-config";
import { fetchAllJobCategories } from "@/redux/features/JobCategorySlice";
import { handleAxiosError } from "@/app/utils/axiosError";
import { LoadingOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

interface CategoryStateInt {
  id: number;
  name: string;
}
const Header = () => {
  const router = useRouter();
  const dispatch: any = useAppDispatch();
  const { data: session, status, update: sessionUpdate } = useSession();
  const [searchData, setSearchData] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [open, setOpen] = useState(false);
  const [openJobs, setOpenJobs] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [fundingOpen, setFundingOpen] = useState(false);
  const [subPopUp, setSubPopUp] = useState(false);
  const [Jobopen, setJobOpen] = useState(false);
  const [institutionAccess, setInstitutionAccess] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [fundingCategories, setFundingCategories] =
    useState<Array<CategoryStateInt>>();
  const [courseCategories, setCourseCategories] =
    useState<Array<CategoryStateInt>>();
  const [searchTerms, setSearchTerms] = useState<string>("i");
  const userType: string = useAppSelector((state: any) => state.user.userRole);
  const [searchProduct, setSearchProduct] = useState<any>();
  const [isSwitchAccountLoading, setIsSwitchAccountLoading] =
    useState<boolean>(false);

  useEffect(() => {
    if (status === "authenticated") {
      dispatch(fetchUserRole());
      dispatch(cartCourses());
    }
  }, [status]);

  useEffect(() => {
    if (userType) {
      dispatch(fetchUserProfile(userType));
    }
  }, [userType]);

  const myProfile = useAppSelector((state: any) => state.user.myProfile);
  const imageUrl = myProfile && myProfile.imageUrl;
  const cartCount = useAppSelector((state: any) => state.course.cart.length);

  // Fetching Job Categories for header usage

  useEffect(() => {
    dispatch(fetchAllJobCategories());
  }, []);
  // Fetching Funding Categories for header usage

  useEffect(() => {
    axios
      .get(`${config.API.API_URL}/funding-category/funding-category`)
      .then((res) => {
        setFundingCategories(res.data.data);
      })
      .catch((e) => {
        // console.log(e);
      });
  }, []);

  // Fetching Course Categories
  useEffect(() => {
    axios
      .get(`${config.API.API_URL}/category/course-category`)
      .then((res) => {
        setCourseCategories(res.data.data);
      })
      .catch((e) => {
        // console.log("Fetch Course category error", e);
      });
  }, []);

  const showJobDrawer = () => {
    setJobOpen(true);
  };
  const jobDrawer = () => {
    setOpenJobs(true);
  };

  const showCoursesDrawer = () => {
    setCoursesOpen(true);
  };
  const showFundingDrawer = () => {
    setFundingOpen(true);
  };

  const closeAllDrawer = () => {
    setCoursesOpen(false);
    setJobOpen(false);
    setOpen(false);
    setOpenJobs(false);
    setFundingOpen(false);
  };
  const onJobClose = () => {
    setJobOpen(false);
  };

  const onCoursesClose = () => {
    setCoursesOpen(false);
  };
  const onFundingClose = () => {
    setFundingOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onCloseJobs = () => {
    setOpenJobs(false);
  };

  /**
   * Get switch user datas
   */
  const getSwitchUserDatas = async () => {
    try {
      setIsSwitchAccountLoading(true);
      const output = await axiosInstance.get("/users/switch-user-datas");
      return output?.data?.data;
    } catch (errorObj) {
      handleAxiosError(errorObj);
    } finally {
      setIsSwitchAccountLoading(false);
    }
  };

  const { Search } = Input;

  const handleSwitchAccount = async () => {
    const resultObj: any = await getSwitchUserDatas();
    setIsSwitchAccountLoading(true);
    if (typeof resultObj?.user !== "undefined") {
      await sessionUpdate(resultObj.user);
      dispatch(fetchUserProfile("user"));
      router.push("/user");
    } else if (typeof resultObj?.business !== "undefined") {
      await sessionUpdate(resultObj.business);
      dispatch(fetchUserProfile("business"));
      router.push("/business");
    }
    setIsSwitchAccountLoading(false);
  };

  const GuestMenu = (
    <div className="py-8 px-10 max-w-max w-full">
      {status === "authenticated" ? (
        <Spin
          spinning={isSwitchAccountLoading}
          indicator={
            <LoadingOutlined className="flex items-center justify-center text-2xl" />
          }
        >
          <div className="flex flex-col justify-center items-center text-center mb-[2em]">
            {imageUrl ? (
              <div className="">
                <Avatar
                  size={{ xs: 80, sm: 80, md: 80, lg: 80, xl: 100, xxl: 100 }}
                  icon={
                    <Image
                      src={imageUrl}
                      alt="profile picture"
                      className="rounded-full justify-self-start"
                      width={60}
                      height={60}
                    />
                  }
                />
              </div>
            ) : (
              <Avatar
                size={{ xs: 80, sm: 80, md: 80, lg: 80, xl: 100, xxl: 100 }}
                icon={<UserOutlined />}
              />
            )}
            <Typography.Paragraph className="mt-0 text-sm font-semibold italic">
              {userType == "business"
                ? "Business Account"
                : userType == "user"
                ? "Personal Account"
                : null}
            </Typography.Paragraph>
            <Button
              type="default"
              className="border-gray-400 rounded-2xl text-[13px]"
            >
              <Link href={`/${userType}`} className="pl-2 text-purple-50">
                Manage your Unifaires Account
              </Link>
            </Button>
            {userType && session?.user?.isPassword && (
              <Button
                type="primary"
                size="middle"
                className="bg-blue-50 rounded-md w-full mt-[1em] text-sm"
                onClick={handleSwitchAccount}
              >
                {userType == "business"
                  ? "Switch to personal account"
                  : userType == "user"
                  ? "Switch to business account"
                  : null}
              </Button>
            )}
          </div>
        </Spin>
      ) : (
        <Typography.Title level={3} className="mb-[3em]">
          Sign in to get limitless <br /> information at your <br />
          fingertips!
        </Typography.Title>
      )}
      <div className="flex flex-col justify-center items-center gap-3">
        {status == "authenticated" ? (
          <Button
            type="primary"
            size="large"
            className="w-full rounded-none"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            type="default"
            size="large"
            className="w-full rounded-none"
            onClick={() => router.push("/login")}
          >
            Sign In
          </Button>
        )}
        <Button
          type={status !== "authenticated" ? "primary" : "default"}
          size="large"
          className="w-full rounded-none"
          onClick={() => setInstitutionAccess(true)}
        >
          Access via Institution
        </Button>
      </div>
      {status !== "authenticated" && (
        <Typography.Paragraph className="text-center pt-2">
          New to Unifaires?
          <span className="pl-2 text-purple-50">
            <Link href="/signup-individual" className="pl-2 text-purple-50">
              Start here
            </Link>
          </span>
        </Typography.Paragraph>
      )}
    </div>
  );

  const onSearch = async (value: string) => {
    router.push(`/search?keyword=${value}`);
  };

  const handleSearch = async () => {
    // const value = e.target.value;
    try {
      const url =
        searchProduct == "course"
          ? "course"
          : searchProduct == "job"
          ? "jobs"
          : searchProduct == "funding"
          ? "funding"
          : "search";
      setFetching(true);
      const res = await axiosInstance.get(`/${url}?title=${searchTerms}`);

      if (res.status) {
        const data =
          searchProduct == "course"
            ? res.data.data.courses
            : searchProduct == "job"
            ? res.data.data.jobs
            : searchProduct == "funding"
            ? res.data.data.fundings
            : res.data.data.results;

        const dataOption = data.map((searchRes: any) => {
          return {
            key: searchRes.id,
            label: (
              <Link
                rel="noopener noreferrer"
                href={`/search?keyword=${searchRes.title}`}
                className="font-bold text-base"
              >
                {searchRes.title}
                {searchRes.model && (
                  <span className="pl-2 italic capitalize text-gray-500">
                    - ({searchRes.model})
                  </span>
                )}
              </Link>
            ),
          };
        });
        setFetching(false);
        setSearchData(dataOption);
      }
    } catch (error) {
      console.log("Unable to find", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerms, searchProduct]);

  return (
    <header className="app-header sticky top-[-20%] z-10">
      {subPopUp && <Popup subPopUp={subPopUp} setSubPopUp={setSubPopUp} />}
      <InstitutionAccess
        institutionAccess={institutionAccess}
        setInstitutionAccess={setInstitutionAccess}
        nextStep={nextStep}
        setNextStep={setNextStep}
      />
      <TopNav />
      <nav className="  bg-purple-50">
        <Container className="px-6 container-fluid">
          <div className="flex flex-wrap items-center w-full py-2 lg:flex-nowrap">
            <Link
              href={"/"}
              passHref
              className="relative order-first block aspect-[28/5]"
            >
              <Image
                src={logo}
                alt="icon"
                width={174}
                height={48}
                objectFit="contain"
                priority
              />
            </Link>
            <div className="order-3 w-full px-0 lg:w-2/4 grow lg:px-5">
              <Dropdown
                // overlayStyle={{
                //   maxWidth: "20px",
                // }}
                overlayClassName="overflow-y-scroll max-h-[400px] custom-scrollbar "
                menu={{ items: searchData }}
                trigger={["click"]}
              >
                <Search
                  addonBefore={
                    <Select
                      allowClear
                      placeholder="All"
                      variant="borderless"
                      // optionFilterProp="children"
                      className="min-w-[90px] rounded-l-lg border-r-2 border-l-2 border-l-white border-r-black rounded-r-none bg-white font-bold text-black"
                      size="large"
                      filterOption={(
                        input: string,
                        option?: { label: string; value: string }
                      ) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      onChange={(value) => setSearchProduct(value)}
                      options={[
                        {
                          value: "all",
                          label: "All",
                        },
                        {
                          value: "course",
                          label: "Courses",
                        },
                        {
                          value: "job",
                          label: "Jobs",
                        },
                        {
                          value: "funding",
                          label: "Fundings",
                        },
                      ]}
                    />
                  }
                  className="mb-0 border-1 rounded-l-lg rounded-r-lg bg-white "
                  variant="borderless"
                  placeholder="Search Unifaires"
                  onSearch={onSearch}
                  onChange={(e) => setSearchTerms(e.target.value)}
                  enterButton
                  size="large"
                />
              </Dropdown>
            </div>
            <Space
              direction="horizontal"
              className="items-center order-2 gap-4 ml-auto lg:order-last"
            >
              {status !== "authenticated" && (
                <Popover placement="bottom" content={GuestMenu}>
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-2"
                  >
                    <UserOutlined className="text-2xl leading-none text-white" />
                    <Paragraph className="hidden mb-0 text-base text-white sm:block">
                      Hello🖐, Sign In
                    </Paragraph>
                    <div className="hidden sm:block">
                      <Image src={caret} alt="country" />
                    </div>
                  </Link>
                </Popover>
              )}

              {status === "authenticated" && (
                <Popover placement="bottom" content={GuestMenu}>
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-2"
                  >
                    <UserOutlined className="text-2xl leading-none text-white" />
                    <Paragraph className="capitalize hidden mb-0 text-base text-white sm:block">
                      {myProfile?.firstname}
                      {/* {session?.user?.fullname == undefined
                        ? null
                        : session?.user?.firstname} */}
                    </Paragraph>
                    <div className="hidden sm:block">
                      <Image src={caret} alt="country" />
                    </div>
                  </Link>
                </Popover>
              )}

              <Link href="#" passHref className="px-2">
                <Badge
                  count={0}
                  status="warning"
                  className="flex items-center gap-2 border-none"
                >
                  <BellOutlined className="text-2xl leading-none text-white" />
                </Badge>
              </Link>
              <Link
                href="/cart"
                passHref
                className="flex items-center gap-2 border-none"
              >
                <Badge
                  count={cartCount}
                  status="warning"
                  className=""
                  size="small"
                >
                  <ShoppingCartOutlined
                    alt="cart"
                    className="text-2xl leading-none text-white"
                  />
                </Badge>
                <Paragraph className="hidden mb-0 text-base text-white sm:block">
                  Cart
                </Paragraph>
              </Link>
            </Space>
          </div>
        </Container>
      </nav>
      <nav className=" bg-blue-50 pt-2">
        <Container className="px-6 container-fluid">
          <div className="flex gap-2 py-2 ">
            <Button
              type="text"
              className="flex items-end pl-0"
              onClick={showDrawer}
            >
              <MenuOutlined className="text-2xl text-white" />
            </Button>
            <ul className="flex gap-4 pl-5 mb-0 overflow-auto flex-nowrap [&>li>a]:whitespace-nowrap">
              <li className="">
                <Link href="/contact" className="text-white">
                  Contact us
                </Link>
              </li>

              <li className="">
                <Link href="/talents" className="text-white">
                  Hire & Vet Talents
                </Link>
              </li>

              <li className="">
                <Link href="/about" className="text-white">
                  About Us
                </Link>
              </li>

              <li className="">
                <Link href="/pricing" className="text-white">
                  Pricing
                </Link>
              </li>
              <li className="">
                <Link href="/mentorship-application" className="text-white">
                  Become a Mentor & Facilitator
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </nav>
      {/* drawer begins */}
      <Drawer
        open={open}
        width={400}
        placement="left"
        closable={false}
        onClose={onClose}
      >
        <div className="flex justify-between bg-purple-50">
          <div className="flex gap-2 items-center p-2">
            {imageUrl ? (
              <div className="">
                <Avatar
                  size={40}
                  icon={
                    <Image
                      src={imageUrl}
                      alt="profile picture"
                      className="rounded-full justify-self-start"
                      width={40}
                      height={40}
                    />
                  }
                />
              </div>
            ) : (
              <Avatar size={50} icon={<UserOutlined />} />
            )}

            <Paragraph className="m-0 text-base font-bold text-white ">
              {status === "authenticated" ? (
                <span>
                  {myProfile?.firstname} {myProfile?.lastname}
                </span>
              ) : (
                <span
                  onClick={() => router.push("/login")}
                  className="hover:cursor-pointer"
                >
                  Hello, Sign In
                </span>
              )}
            </Paragraph>
          </div>
          <div>
            <button
              className="px-6 h-full text-xl text-white bg-black"
              onClick={onClose}
            >
              X
            </button>
          </div>
        </div>

        <Row className="px-4 py-4" gutter={[16, 8]}>
          <Col lg={20} sm={20} xs={20}>
            <p className="text-2xl text-purple-50"> Unifaires Home</p>
          </Col>

          <Col lg={4} sm={4} xs={4} className="">
            <Image src={home} alt="country" />
          </Col>

          <Col lg={24} sm={24} xs={24} className="-mt-8">
            <Divider />
          </Col>

          <Col lg={24} sm={24} xs={24} className="pt-2">
            <p className="text-lg font-bold text-black">Category</p>
          </Col>

          <Col
            lg={24}
            sm={24}
            xs={24}
            className="flex flex-row p-2 cursor-pointer hover:bg-gray-200"
            onClick={showJobDrawer}
          >
            <p className="text-base text-black">Job, Education and Funding</p>
            <RightOutlined className="flex ml-auto " />
          </Col>

          <Col lg={24} sm={24} xs={24} className="-mt-6">
            <Divider />
          </Col>

          <Col lg={24} sm={24} xs={24} className="pt-2">
            <p className="text-lg font-bold text-black">Help & Settings</p>
          </Col>

          <Col lg={24} sm={24} xs={24} className="pt-2">
            <Link href={`/${userType}`} className="text-base text-black">
              My Account
            </Link>
          </Col>

          <Col lg={4} sm={4} xs={4} className="pt-2">
            <Image src={england} alt="country" />
          </Col>

          <Col lg={20} sm={20} xs={20} className="pt-2">
            <p className="text-base text-black">United States</p>
          </Col>

          <Col lg={24} sm={24} xs={24} className="pt-4">
            <Link href="/contact" className="text-lg font-bold text-black">
              Contact us
            </Link>
          </Col>

          <Col lg={24} sm={24} xs={24} className="pt-2">
            {status == "authenticated" ? (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                  router.push("/login");
                }}
              >
                <span className="text-base text-black">Sign out </span>
              </div>
            ) : (
              <Link href="/login" className="text-base text-black">
                Sign in
              </Link>
            )}
          </Col>

          <Col lg={24} sm={24} xs={24} className="pt-2">
            <Link href="/about" className="text-base text-black">
              About Us
            </Link>
          </Col>

          <Col lg={24} sm={24} xs={24} className="pt-2">
            <Link href="/pricing" className="text-base text-black">
              Pricing
            </Link>
          </Col>

          <Col lg={24} sm={24} xs={24} className="pt-2">
            <Link href="/signup-business" className="text-base text-purple-50 ">
              Become a Business Partner
            </Link>
          </Col>
        </Row>
      </Drawer>

      {/* primary drawer */}
      <Drawer
        placement="left"
        onClose={onJobClose}
        open={Jobopen}
        closable={false}
        width={400}
      >
        <div className="flex justify-between bg-purple-50">
          <div className="flex gap-2 items-center p-2">
            {imageUrl ? (
              <div className="">
                <Avatar
                  size={40}
                  icon={
                    <Image
                      src={imageUrl}
                      alt="profile picture"
                      className="rounded-full justify-self-start"
                      width={40}
                      height={40}
                    />
                  }
                />
              </div>
            ) : (
              <Avatar size={50} icon={<UserOutlined />} />
            )}

            <Paragraph className="m-0 text-base font-bold text-white ">
              {status === "authenticated" ? (
                <span>
                  {myProfile?.firstname} {myProfile?.lastname}
                </span>
              ) : (
                <span
                  onClick={() => router.push("/login")}
                  className="hover:cursor-pointer"
                >
                  Hello, Sign In
                </span>
              )}
            </Paragraph>
          </div>
          <div>
            <button
              className="px-6 h-full text-xl text-white bg-black"
              onClick={onJobClose}
            >
              X
            </button>
          </div>
        </div>

        <Row className="px-4 py-4" gutter={[16, 8]}>
          <Col
            lg={22}
            className="pt-2 hover:cursor-pointer flex flex-row gap-2 hover:text-red-400"
            onClick={onJobClose}
          >
            <LeftOutlined className="flex " />
            <p className="text-base text-black hover:text-red-400">Back</p>
          </Col>

          <Col lg={24} sm={24} xs={24} className="pt-2">
            <p className="text-lg font-bold text-black">
              Job, Education and Funding
            </p>
          </Col>

          <Col
            lg={24}
            sm={24}
            xs={24}
            className="flex flex-row p-2 cursor-pointer hover:bg-gray-200"
            onClick={jobDrawer}
          >
            <p className="text-base text-black">Jobs</p>
            <RightOutlined className="flex ml-auto " />
          </Col>

          <Col
            lg={24}
            sm={24}
            xs={24}
            className="flex flex-row p-2 cursor-pointer hover:bg-gray-200"
            onClick={showCoursesDrawer}
          >
            <p className="text-base text-black">Course & Certification</p>
            <RightOutlined className="flex ml-auto " />
          </Col>

          <Col
            lg={24}
            sm={24}
            xs={24}
            className="flex flex-row p-2 cursor-pointer hover:bg-gray-200"
            onClick={showFundingDrawer}
          >
            <p className="text-base text-black">
              {" "}
              Funding, Grants & Scholarships
            </p>
            <RightOutlined className="flex ml-auto " />
          </Col>
          {/* <Col
            lg={24}
            sm={24}
            xs={24}
            className="flex flex-row p-2 cursor-pointer hover:bg-gray-200"
          >
            <p className="text-base text-black">Group and communities</p>
            <RightOutlined className="flex ml-auto " />
          </Col> */}

          <Col lg={24} sm={24} xs={24} className="-mt-6">
            <Divider />
          </Col>

          <Col lg={24} sm={24} xs={24} className="pt-2">
            <p className="text-lg font-bold text-black">Help & Settings</p>
          </Col>

          <Col lg={24} sm={24} xs={24} className="pt-2">
            <p className="text-base text-black">Your Account</p>
          </Col>

          <Col lg={4} sm={4} xs={4} className="pt-2">
            <Image src={england} alt="country" />
          </Col>

          <Col lg={20} sm={20} xs={20} className="pt-2">
            <p className="text-base text-black">United States</p>
          </Col>

          <Col lg={24} sm={24} xs={24} className="pt-4">
            <Link href="/contact" className="text-lg font-bold text-black">
              Contact Us
            </Link>
          </Col>

          <Col lg={24} sm={24} xs={24} className="pt-2">
            {status == "authenticated" ? (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                  router.push("/login");
                }}
              >
                <Link href="#" className="text-base text-black">
                  Sign out{" "}
                </Link>
              </div>
            ) : (
              <Link href="/login" className="text-lg text-black">
                Sign in
              </Link>
            )}
          </Col>

          <Col lg={24} sm={24} xs={24} className="pt-2">
            <Link href="/about" className="text-lg  text-black">
              About Us
            </Link>
          </Col>

          <Col lg={24} sm={24} xs={24} className="pt-2">
            <Link href="/pricing" className="text-base text-black">
              Pricing
            </Link>
          </Col>

          <Col lg={24} sm={24} xs={24} className="pt-2">
            <Link href="/pricing" className="text-base text-purple-50">
              Become a Business Partner
            </Link>
          </Col>
        </Row>
      </Drawer>

      {/* jobs drawer */}
      <Drawer
        placement="left"
        onClose={onCloseJobs}
        open={openJobs}
        closable={false}
        width={400}
      >
        <div className="flex justify-between bg-purple-50">
          <div className="flex gap-2 items-center p-2">
            {imageUrl ? (
              <div className="">
                <Avatar
                  size={40}
                  icon={
                    <Image
                      src={imageUrl}
                      alt="profile picture"
                      className="rounded-full justify-self-start"
                      width={40}
                      height={40}
                    />
                  }
                />
              </div>
            ) : (
              <Avatar size={50} icon={<UserOutlined />} />
            )}

            <Paragraph className="m-0 text-base font-bold text-white ">
              {status === "authenticated" ? (
                <span>
                  {myProfile?.firstname} {myProfile?.lastname}
                </span>
              ) : (
                <span
                  onClick={() => router.push("/login")}
                  className="hover:cursor-pointer"
                >
                  Hello, Sign In
                </span>
              )}
            </Paragraph>
          </div>
          <div>
            <button
              className="px-6 h-full text-xl text-white bg-black"
              onClick={onCloseJobs}
            >
              X
            </button>
          </div>
        </div>
        <Row className="px-4 py-4">
          <Col
            lg={22}
            className="pt-2 hover:cursor-pointer flex flex-row gap-2 hover:text-red-400"
            onClick={onCloseJobs}
          >
            <LeftOutlined className="flex " />
            <p className="text-base text-black hover:text-red-400">Back</p>
          </Col>

          <Col lg={24} md={24} sm={24} xs={24} className="pt-2">
            <p className="text-lg font-bold text-black">Jobs</p>
          </Col>
          <Col lg={24} sm={24} xs={24}>
            <JobCategories
              closeAllDrawer={closeAllDrawer}
            />
          </Col>
        </Row>
      </Drawer>

      {/* Courses and Certification Drawer */}
      <Drawer
        placement="left"
        onClose={onCoursesClose}
        open={coursesOpen}
        closable={false}
        width={400}
      >
        <div className="flex justify-between bg-purple-50">
          <div className="flex gap-2 items-center p-2">
            {imageUrl ? (
              <div className="">
                <Avatar
                  size={40}
                  icon={
                    <Image
                      src={imageUrl}
                      alt="profile picture"
                      className="rounded-full justify-self-start"
                      width={40}
                      height={40}
                    />
                  }
                />
              </div>
            ) : (
              <Avatar size={50} icon={<UserOutlined />} />
            )}

            <Paragraph className="m-0 text-base font-bold text-white ">
              {status === "authenticated" ? (
                <span>
                  {myProfile?.firstname} {myProfile?.lastname}
                </span>
              ) : (
                <span
                  onClick={() => router.push("/login")}
                  className="hover:cursor-pointer"
                >
                  Hello, Sign In
                </span>
              )}
            </Paragraph>
          </div>
          <div>
            <button
              className="px-6 h-full text-xl text-white bg-black"
              onClick={onCoursesClose}
            >
              X
            </button>
          </div>
        </div>

        <Row className="px-4 py-4">
          <Col
            lg={22}
            className="pt-2 hover:cursor-pointer flex flex-row gap-2 hover:text-red-400"
            onClick={onCoursesClose}
          >
            <LeftOutlined className="flex " />
            <p className="text-base text-black hover:text-red-400">Back</p>
          </Col>

          <Col lg={24} md={24} sm={24} xs={24} className="pt-2">
            <p className="text-lg font-bold text-black">
              Courses and Certificate
            </p>
          </Col>
          <Col lg={24} sm={24} xs={24}>
            <CourseCategories
              courseCategories={courseCategories}
              closeAllDrawer={closeAllDrawer}
            />
          </Col>
        </Row>
      </Drawer>
      {/* Funding and Scholarship Drawer */}
      <Drawer
        placement="left"
        onClose={onFundingClose}
        open={fundingOpen}
        closable={false}
        width={400}
      >
        <div className="flex justify-between bg-purple-50">
          <div className="flex gap-2 items-center p-2">
            {imageUrl ? (
              <div className="">
                <Avatar
                  size={40}
                  icon={
                    <Image
                      src={imageUrl}
                      alt="profile picture"
                      className="rounded-full justify-self-start"
                      width={40}
                      height={40}
                    />
                  }
                />
              </div>
            ) : (
              <Avatar size={50} icon={<UserOutlined />} />
            )}

            <Paragraph className="m-0 text-base font-bold text-white ">
              {status === "authenticated" ? (
                <span>
                  {myProfile?.firstname} {myProfile?.lastname}
                </span>
              ) : (
                <span
                  onClick={() => router.push("/login")}
                  className="hover:cursor-pointer"
                >
                  Hello, Sign In
                </span>
              )}
            </Paragraph>
          </div>
          <div>
            <button
              className="px-6 h-full text-xl text-white bg-black"
              onClick={onFundingClose}
            >
              X
            </button>
          </div>
        </div>

        <Row className="px-4 py-4">
          <Col
            lg={22}
            className="pt-2 hover:cursor-pointer flex flex-row gap-2 hover:text-red-400"
            onClick={onFundingClose}
          >
            <LeftOutlined className="flex " />
            <p className="text-base text-black hover:text-red-400">Back</p>
          </Col>

          <Col lg={24} md={24} sm={24} xs={24} className="pt-2">
            <p className="text-lg font-bold text-black">
              Funding and Scholarship
            </p>
          </Col>
          <Col lg={24} sm={24} xs={24}>
            <FundingCategories
              fundingCategories={fundingCategories}
              closeAllDrawer={closeAllDrawer}
            />
          </Col>
        </Row>
      </Drawer>
    </header>
  );
};

export default Header;
