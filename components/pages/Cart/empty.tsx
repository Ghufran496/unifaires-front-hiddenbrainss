"use client";
import { Button, Card, Col, Divider, List, Row, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import cartPic from "@/public/images/empty.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import axiosInstance from "@/app/utils/axios-config";
import Link from "next/link";
import IconText from "@/components/shared/IconText";
import {
  PlusOutlined,
  ShoppingCartOutlined,
  StarFilled,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  handleAxiosError,
  showError,
  showSuccess,
} from "@/app/utils/axiosError";
import { addCart } from "@/redux/features/CoursesSlice";
import { usePathname, useRouter } from "next/navigation";
import { fetchUserRole } from "@/redux/features/UserSlice";
import { fetchAllTax } from "@/redux/features/TaxSlice";
import { getCookie } from "cookies-next";
const EmptyCartPage = () => {
  const { Title, Paragraph } = Typography;
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const userCountry = info && info.data.country;
  const locationCurrency = info && info.data.currency;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;

  const { data: session } = useSession();
  const dispatch: any = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const router = useRouter();
  const currentPath = usePathname();
  const [courses, setCourses] = useState();
  const limit = 10;

  const fetchCourses = async () => {
    await axiosInstance
      .get("/course")
      .then((response) => {
        const courses = response.data.data.courses;
        const filteredCourses = courses.filter((c: any) => c.pricing !== null);
        const limitedCourses = filteredCourses.slice(0, limit);
        setCourses(limitedCourses);
        // console.log("here is ", response);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };

  useEffect(() => {
    fetchCourses();
    dispatch(fetchUserRole());
  }, []);

  const userType = useAppSelector((state: RootState) => state.user.userRole);

  const handleAddToCart = async (course: any) => {
    const id = course.id;
    if (session && userType !== "business") {
      setLoadingStates((prev) => ({ ...prev, [id]: true }));
      try {
        const addToCart = await dispatch(addCart(id));

        if (addToCart.type === "course/addCart/fulfilled") {
          showSuccess("Course added to cart");
        } else {
          handleAxiosError(addToCart.error);
        }
      } catch (error) {
        handleAxiosError(error);
      }
    } else {
      showError("Login to user account");
      router.push(`/login?redirect=${currentPath}`);
    }
    setLoadingStates((prev) => ({ ...prev, [id]: false }));
  };

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

  const currencyRate = useAppSelector(
    (state: RootState) => state.currency.currencyRate
  );

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: `${currencyRate ? currency : "USD"}`,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div>
      <section className="xl:px-20 px-5 py-10">
        <div className="flex justify-between gap-2 flex-wrap ">
          <Card className="shadow-3xl rounded-md lg:w-[700px] h-full py-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center">
                <Image src={cartPic} alt="empty" />
              </div>

              <div className="text-center">
                <Title level={3} className="text-black">
                  Your Unifaires Cart Is Empty!
                </Title>
              </div>

              <div>
                <Paragraph className="text-purple-50 text-center py-2">
                  Shop For today’s deals
                </Paragraph>
              </div>
              {session ? (
                <div className="flex items-center justify-center">
                  <Button
                    type="primary"
                    size="large"
                    className="rounded-sm"
                    href={"/courses"}
                  >
                    Browse Courses
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4">
                    <div>
                      <Button type="primary" size="large" href={"/login"}>
                        Sign in to your account
                      </Button>
                    </div>

                    <div>
                      <Button
                        size="large"
                        className="text-purple-50"
                        href={"/sigup-individual"}
                      >
                        Sign up now
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="shadow-3xl rounded-md min-w-[300px] ">
            <div>
              <Title level={4} className="text-black">
                Other Courses
              </Title>
            </div>
            <Divider />
            <List
              size="large"
              itemLayout="vertical"
              dataSource={courses ? courses : []}
              renderItem={(course: any) => {
                const salesPrice =
                  course?.pricing &&
                  course?.pricing?.amount -
                    course?.pricing?.amount * (course?.pricing?.discount / 100);

                const estimatedTax =
                  salesPrice &&
                  salesPrice * (getTaxForCountry(userCountry) / 100);
                // // Sales Price Plus Tax
                const finalSalesPrice = salesPrice && salesPrice + estimatedTax;

                const convertedPrice =
                  finalSalesPrice && finalSalesPrice * currencyRate;

                const courseImage =
                  course && course.image
                    ? course.image
                    : JSON.parse(course.meta).image;

                return (
                  <List.Item
                    className="flex gap-4 hover:bg-gray-100 hover:cursor-pointer"
                    key={`course-item-${course.id}`}
                  >
                    <Link
                      href={`/courses/${course.slug}`}
                      passHref
                      className="rounded-lg overflow-hidden w-24 h-20"
                    >
                      <Image
                        alt="logo"
                        width={96}
                        height={80}
                        objectFit="cover"
                        src={courseImage}
                      />
                    </Link>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between">
                        <Link
                          passHref
                          href={`/business/courses/${course.id}`}
                          className="text-grey-900 hover:text-purple-500 font-semibold text-base flex-grow"
                        >
                          {course.title}
                        </Link>
                      </div>
                      <Space className="gap-3 flex-wrap mb-2">
                        <IconText
                          title="course author"
                          text={course.organizationName}
                          icon={<UserOutlined />}
                        />
                        <IconText
                          title="students"
                          text={`${
                            course.students ? course.students : "0"
                          } students`}
                          icon={<UsergroupAddOutlined />}
                        />
                        <IconText
                          title="ratings"
                          text={course.averageRating}
                          // text={`${course.rating} (${course.ratingsCount})`}
                          icon={<StarFilled className="text-yellow-500" />}
                        />
                      </Space>
                      <div className="flex justify-between flex-wrap gap-3">
                        {!course?.pricing ||
                        course?.pricing?.type === "free" ? (
                          <Typography.Paragraph className="text-base font-bold text-gray-600 mb-0">
                            Free
                          </Typography.Paragraph>
                        ) : (
                          <Typography.Paragraph className="text-base font-bold text-gray-600 mb-0">
                            {formatCurrency(convertedPrice || finalSalesPrice)}{" "}
                            {/* <span className="line-through font-semibold text-sm">
                              ${course?.pricing?.amount}
                            </span> */}
                          </Typography.Paragraph>
                        )}
                        <Button
                          icon={<PlusOutlined className="text-xs" />}
                          onClick={() => handleAddToCart(course)}
                          className="flex items-center p-0 hover:bg-inherit hover:text-purple-600"
                          loading={loadingStates[course.id] || false}
                          type="text"
                        >
                          <ShoppingCartOutlined className="flex items-center justify-center text-2xl m-0" />
                        </Button>
                      </div>
                    </div>
                  </List.Item>
                );
              }}
            />
          </Card>
        </div>
      </section>
    </div>
  );
};

export default EmptyCartPage;
