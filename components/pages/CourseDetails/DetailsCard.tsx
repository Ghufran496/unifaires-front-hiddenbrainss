/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
// next
// import NextLink from "next/link";
// antd and Icon components
import { Card, Button, Typography, Modal, Avatar, message } from "antd";
import {
  GlobalOutlined,
  MobileOutlined,
  FileTextOutlined,
  DownloadOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  VideoCameraOutlined,
  TranslationOutlined,
  SafetyCertificateOutlined,
  HeartOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
// app components
import VideoJs from "@/components/shared/video/VideoJs";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import LogoIcon from "@/public/icon.png";
import axiosInstance from "@/app/utils/axios-config";
import { toast } from "react-toastify";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addCart,
  cartCourses,
  fetchMyCourse,
} from "@/redux/features/CoursesSlice";
import { error } from "console";
import { RootState } from "@/redux/store";
import { getCookie } from "cookies-next";
import { fetchAllTax } from "@/redux/features/TaxSlice";

const DetailsCard = ({ course, userType }: any) => {
  // const playerRef = React.useRef(null);
  const { data: session } = useSession();
  const dispatch: any = useAppDispatch();
  const isAssociate = session && session?.user.isAssociate;
  const courseOwner = course && (course.userId || course.businessId);
  const associateAccounts = session && session?.user.associatedAcounts;
  const courseAssociate =
    course && associateAccounts && associateAccounts.includes(courseOwner);
  // const adminAssociate =
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const userCountry = info && info.data.country;
  const locationCurrency = info && info.data.currency;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;
  const requestError = useAppSelector((state: any) => state.course.error);
  const router = useRouter();
  const params = useSearchParams();
  const stringId = course && [course.id];
  const courseId = stringId && JSON.stringify(stringId);
  const [switchAccount, setSwitchAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enrolLoading, setEnrolLoading] = useState(false);
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : null;
  const propsString: any = params.get("props");
  const CourseProps = propsString && JSON.parse(propsString);
  const courseImage =
    course && course.image ? course.image : JSON.parse(course.meta).image;
  const videoUrl =
    course && course.video ? course.video : JSON.parse(course.meta).video;
  const amount = parseInt(course?.pricing?.amount, 10);
  const discount = course?.pricing?.discount;
  const scholarshipUrl = (typeof course?.scholarshipUrl === "string"
    ? course.scholarshipUrl
    : ""
  ).startsWith("http")
    ? course.scholarshipUrl
    : `https://${course.scholarshipUrl}`;

  useEffect(() => {
    dispatch(fetchAllTax());
  }, []);

  const taxes = useAppSelector((state: any) => state.tax.taxes);

  const getTaxForCountry = (countryName: string) => {
    if (!taxes || !Array.isArray(taxes)) {
      // Handle the case when currentPricingIndex is not defined or not an array
      return "N/A";
    }
    const country = taxes.find((c) => c.country === countryName);
    return country ? country.tax : 0;
  };

  const salesPrice: any =
    amount && discount ? amount - amount * (discount / 100) : 0;

  const estimatedTax =
    salesPrice && salesPrice * (getTaxForCountry(userCountry) / 100);
  // Sales Price Plus Tax
  const finalSalesPrice = salesPrice && salesPrice + estimatedTax;
  // Amount Plus Tax
  const estimatedAmountTax =
    amount && amount * (getTaxForCountry(userCountry) / 100);

  const finalAmount = amount && amount + estimatedAmountTax;

  const currencyRate = useAppSelector(
    (state: RootState) => state.currency.currencyRate
  );
  const convertedAmount = finalAmount && finalAmount * currencyRate;

  const convertedPrice = finalSalesPrice && finalSalesPrice * currencyRate;

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: `${convertedPrice ? currency : "USD"}`,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  // console.log("here is ", currencyRate);

  const formattedDate = new Date(course?.updatedAt);

  const courseArray = useAppSelector((state: any) => state.course.cart);
  const myCartCourses = courseArray.map((i: any) => i.courseId);

  useEffect(() => {
    dispatch(fetchMyCourse());
    if (userType !== "business") {
      setSwitchAccount(false);
    }
  }, [userType]);

  const userCourses = useAppSelector((state: any) => state.course.myCourses);
  const myCourses =
    userCourses && userCourses.map((course: any) => course.courseId);

  const enrolledDate =
    userCourses &&
    userCourses.map((course: any) => {
      return {
        id: course.courseId,
        dateEnrolled: course.createdAt,
      };
    });

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: `${videoUrl}`,
        type: "video/mp4",
      },
    ],
  };

  const closeModal = async () => {
    setSwitchAccount(false);
    await signOut({
      callbackUrl: `${window.location.origin}/login?redirect=${currentPath}`,
    });
  };

  const handleWishList = async () => {
    if (session && userType !== "business") {
      await axiosInstance
        .post("/course-wish", {
          courseId: course.id,
        })
        .then((res) => {
          toast.success("Course added to wishlist");
          console.log("here is the response", res.data);
        })
        .catch((error) => {
          toast.error("Wishlist Already exist");
          console.log("here is the error", error);
        });
    } else {
      toast.error("Login to user account to add course to wishlist");
      // router.push(`/login?redirect=${currentPath}`);
    }
  };

  const handleAddToCart = async () => {
    if (session && userType !== "business") {
      setLoading(true);
      try {
        const id = course.id;
        const addToCart = await dispatch(addCart(id));

        if (addToCart.type === "course/addCart/fulfilled") {
          toast.success("Course added to cart");
        } else {
          handleAxiosError(addToCart.error);
        }
      } catch (error) {
        handleAxiosError(error);
      }
    } else {
      toast.error("Login to user account");
      router.push(`/login?redirect=${currentPath}`);
    }
    setLoading(false);
  };

  const handleEnrolCourse = async (id: any) => {
    setEnrolLoading(true);
    try {
      const enrolCourse = await axiosInstance.post("/enrol-course", {
        country: userCountry,
        courseIds: [id],
      });
      if (enrolCourse) {
        showSuccess("Course Enrol Sucessful");
        dispatch(cartCourses());
        // setIsModalOpen(tsrue);
        setTimeout(function () {
          router.push("/user/my-learning");
        }, 2000);
      }
    } catch (error) {
      handleAxiosError(error);
      console.log(error);
    }
    setEnrolLoading(false);
  };

  return (
    <Card className="lg:-mt-64 shadow-sm sticky mb-6 top-0">
      <div>
        {videoUrl ? (
          <VideoJs options={videoJsOptions} />
        ) : (
          <div className="flex justify-center items-center">
            {course && course.image && (
              <Image
                src={courseImage}
                alt="courseImage"
                width={230}
                height={230}
                objectPosition="center"
              />
            )}
          </div>
        )}
      </div>

      {myCourses && myCourses.includes(course?.id) ? (
        <div>
          <div>
            <Typography.Paragraph>
              Enrolled for this Course on:{" "}
              {enrolledDate.map((courseDate: any) => {
                if (courseDate.id === course?.id) {
                  const dateString = courseDate.dateEnrolled;
                  const actualDate = new Date(dateString);
                  const formattedDate = actualDate.toLocaleString();
                  return (
                    <span
                      key={courseDate.id}
                      className="text-base font-semibold"
                    >
                      {formattedDate}
                    </span>
                  );
                }
                return null;
              })}
            </Typography.Paragraph>
          </div>

          <div>
            <Button
              href={`/user/course/${course.id}/lecture/0`}
              block
              type="primary"
              size="large"
              className="flex justify-center items-center h-[50px]"
              // onClick={() => router.push(`/user/course/${course.id}/lecture/0`)}
            >
              Go to Course
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mt-6">
            {course?.pricing?.type == "paid" ? (
              <Typography.Title level={2} className="mb-0">
                {formatCurrency(convertedPrice ? convertedPrice : salesPrice)}
                <Typography.Text type="secondary" delete>
                  {formatCurrency(convertedAmount ? convertedAmount : amount)}
                </Typography.Text>
              </Typography.Title>
            ) : (
              <Typography.Title level={2} className="mb-0">
                Free
              </Typography.Title>
            )}
          </div>
          {course && (
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex flex-row justify-between gap-4 ">
                {myCartCourses && !myCartCourses.includes(course?.id) ? (
                  <Button
                    block
                    type="primary"
                    size="large"
                    className="flex justify-center items-center bg-inherit text-black h-[50px] border-purple-500 border-2 hover:bg-purple-500 hover:text-white hover:border-none"
                    onClick={handleAddToCart}
                    loading={loading}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <Button
                    block
                    type="primary"
                    size="large"
                    className="flex justify-center items-center bg-inherit text-black h-[50px] border-purple-500 border-2 hover:bg-purple-500 hover:text-white hover:border-none"
                    href="/cart"
                    loading={loading}
                  >
                    Go to Cart
                  </Button>
                )}

                <HeartOutlined
                  onClick={handleWishList}
                  className="text-2xl cursor-pointer hover:text-red-800 hover:font-extrabold"
                />
              </div>
              {session &&
              userType &&
              userType === "user" &&
              course?.pricing?.type === "paid" &&
              !courseAssociate &&
              !course.isAssociateFree ? (
                <Button
                  href={`/courses/course-checkout?courseId=${courseId}&totalPrice=${salesPrice}`}
                  // block
                  type="primary"
                  size="large"
                  className="flex justify-center items-center h-[50px]"
                >
                  Buy Now
                </Button>
              ) : session &&
                userType === "user" &&
                (course?.pricing?.type === "free" ||
                  course?.pricing === null ||
                  (isAssociate && courseAssociate && course.isAssociateFree) ||
                  (course?.userId && isAssociate && course.isAssociateFree)) ? (
                <Button
                  block
                  type="primary"
                  size="large"
                  className=" flex justify-center items-center h-[50px]"
                  onClick={() => handleEnrolCourse(course?.id)}
                  loading={enrolLoading}
                >
                  Enrol
                </Button>
              ) : session && userType && userType === "business" ? (
                <div>
                  <Button
                    block
                    type="primary"
                    size="large"
                    className="flex justify-center items-center h-[50px]"
                    onClick={() => setSwitchAccount(true)}
                  >
                    Buy Now
                  </Button>
                </div>
              ) : session && course?.isExternal ? (
                <Link href={`/${course?.externalUrl}`} target="_blank">
                  <Button
                    block
                    type="primary"
                    size="large"
                    className="flex justify-center items-center h-[50px]"
                  >
                    Buy Now
                  </Button>
                </Link>
              ) : (
                <Button
                  href={`/login?redirect=${currentPath}`}
                  block
                  type="primary"
                  size="large"
                  className="flex justify-center items-center h-[50px]"
                >
                  Buy Now
                </Button>
              )}
            </div>
          )}
        </div>
      )}
      {isAssociate &&
        (courseAssociate || course.userId) &&
        course.isAssociateFree && (
          <Typography.Paragraph className="italic text-gray-500">
            You are an associate of{" "}
            {!course.userId ? "a business" : "the course owner"} and the course
            has been made free for associates. Just enrol for the course
          </Typography.Paragraph>
        )}
      <div></div>
      <div className="mt-6">
        {/* <Typography.Title level={4}>This course includes:</Typography.Title>
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
          <VideoCameraOutlined /> 46.5 hours on-demand video
        </Typography.Paragraph>
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
          <FileTextOutlined /> 77 articles
        </Typography.Paragraph>
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
          <DownloadOutlined /> 85 downloadable resources
        </Typography.Paragraph> */}
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
          <ClockCircleOutlined className="" /> Full time access
        </Typography.Paragraph>
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
          <MobileOutlined /> Access on mobile and Tablet
        </Typography.Paragraph>
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
          <SafetyCertificateOutlined /> Certificate of Completion
        </Typography.Paragraph>

        <Typography.Title level={5}>Meta Data:</Typography.Title>
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap capitalize">
          <GlobalOutlined /> Language - {course?.lang}
        </Typography.Paragraph>
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
          <TranslationOutlined /> Subtitles -{" "}
          {course?.subtitleLanguage || "No subtitle"}
        </Typography.Paragraph>
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
          <CalendarOutlined /> Last Updated -{" "}
          {formattedDate.toLocaleDateString()}
        </Typography.Paragraph>
      </div>
      <div className="mt-4">
        <Typography.Paragraph className="italic text-base font-semibold ">
          Scholarship Availability: {course?.isScholarship ? "Yes" : "No"}
        </Typography.Paragraph>
        {course && course?.isScholarship && (
          <a
            href={`${scholarshipUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              block
              type="primary"
              size="large"
              className="flex bg-transparent border-2 border-purple-600 text-black hover:bg-purple-600 hover:text-white font-semibold text-base justify-center items-center h-[50px]"
            >
              Click to Apply
            </Button>
          </a>
        )}
      </div>
      <Modal
        open={switchAccount}
        onCancel={closeModal}
        onOk={closeModal}
        width={700}
        footer={null}
      >
        <div className="p-10 w-full">
          <div className="flex flex-col justify-center items-center p-6 h-[400px]">
            <Typography.Paragraph>
              <Avatar
                icon={<UserOutlined />}
                size={{ xs: 80, sm: 80, md: 80, lg: 80, xl: 100, xxl: 100 }}
              />
            </Typography.Paragraph>
            <Typography.Paragraph className="mt-0 text-lg font-bold italic text-center">
              Switch to your personal account to use the service
            </Typography.Paragraph>
            <div>
              <Image src={LogoIcon} alt="logo icon" width={60} height={60} />
            </div>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default DetailsCard;
