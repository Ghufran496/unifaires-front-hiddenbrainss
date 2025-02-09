"use client";
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Rate,
  List,
  Skeleton,
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import cartPic from "@/public/images/cartPic.png";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { cartCourses, removeCart } from "@/redux/features/CoursesSlice";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import { getCookie } from "cookies-next";
import { fetchAllTax } from "@/redux/features/TaxSlice";
import { RootState } from "@/redux/store";
import { LoadingOutlined } from "@ant-design/icons";
import EmptyCartPage from "./empty";

const CartPage = () => {
  const { Title, Paragraph } = Typography;
  const [loadingCart, setLoadingCart] = useState(false);
  // const [cartList, setCartList] = useState<any>();
  const [fetchingCart, setFetchingCart] = useState(true);
  const [subTotal, setSubTotal] = useState();
  const [totalPrice, setTotalPrice] = useState<any>();
  const [courseIds, setCourseIds] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const dispatch: any = useAppDispatch();
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationCurrency = info && info.data.currency;
  const userCountry = info && info.data.country;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;

  const fetchCartCourses = async () => {
    try {
      setLoadingCart(true);
      setFetchingCart(true);
      const res = await dispatch(cartCourses());

      if (res.meta.requestStatus === "fulfilled") {
        console.log("Cart fetched Successfully");
      }
    } catch (error) {
      console.log("Unable to fetch Course Cart", error);
    } finally {
      setLoadingCart(false);
      setFetchingCart(false);
    }
  };

  useEffect(() => {
    fetchCartCourses();
    dispatch(fetchAllTax());
    setFetchingCart(false);
  }, []);

  const currencyRate = useAppSelector(
    (state: RootState) => state.currency.currencyRate
  );

  const taxes = useAppSelector((state: RootState) => state.tax.taxes);

  const getTaxForCountry: any = (countryName: string) => {
    if (!taxes || !Array.isArray(taxes)) {
      // Handle the case when currentPricingIndex is not defined or not an array
      return "N/A";
    }
    const country = taxes.find((c) => c.country === countryName);
    return country ? country.tax : 0;
  };

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: `${currencyRate ? currency : "USD"}`,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const cartList = useAppSelector((state: any) => state.course.cart);

  useEffect(() => {
    if (cartList) {
      const courseSubTotal = cartList.reduce(
        (acc: number, cart: { course: any }) => {
          const course = cart.course;
          const pricing = course?.pricing;

          // Calculate the actual price considering discount if available
          const actualPrice = pricing
            ? pricing.amount - (pricing.discount / 100) * pricing.amount
            : 0; // Consider 0 if actualPrice is not available

          return acc + actualPrice;
        },
        0
      );

      const IDs = cartList.map((cart: any) => {
        const courseCart = cart.course;
        return courseCart && courseCart.id;
      });
      const stringId = JSON.stringify(IDs);

      setCourseIds(stringId);

      const estimatedTax =
        courseSubTotal * (getTaxForCountry(userCountry) / 100);
      const priceWithTax = courseSubTotal + estimatedTax;
      const convertedPrice = priceWithTax && priceWithTax * currencyRate;

      setSubTotal(convertedPrice || priceWithTax);
      setTotalPrice(courseSubTotal);
    }
  }, [cartList]);

  const handleRemove = (id: any) => {
    try {
      const deleteCart = dispatch(removeCart(id));
      if (deleteCart) {
        showSuccess("Deleted Succesfully");
        dispatch(cartCourses());
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <div>
      <Spin
        spinning={loadingCart}
        indicator={
          <LoadingOutlined className="flex items-center justify-center text-5xl" />
        }
      >
        {cartList && cartList.length < 1 ? (
          <EmptyCartPage />
        ) : (
          <section className="xl:px-20 px-5 py-10">
            <Row gutter={[16, 16]}>
              <Col xl={24} sm={24} xs={24}>
                <Title level={3} className="text-black">
                  Shopping Cart
                </Title>
              </Col>

              <Col xl={24} sm={24} xs={24}>
                <Paragraph className="">Items in Cart</Paragraph>
              </Col>
            </Row>

            <div className="flex lg:flex-row md:flex-row flex-col gap-4 justify-between">
              <Skeleton active loading={fetchingCart} className="w-1/2">
                <List
                  className="w-full"
                  dataSource={cartList}
                  renderItem={(cart: any) => {
                    const course = cart.course;
                    const courseImage =
                      course && course.image
                        ? course.image
                        : course && JSON.parse(course.meta).image;
                    const actualPrice = course?.pricing
                      ? parseFloat(course?.pricing?.amount) -
                      (course?.pricing?.discount / 100) *
                      parseFloat(course?.pricing.amount)
                      : 0;
                    const estimatedTax =
                      actualPrice * (getTaxForCountry(userCountry) / 100);
                    const priceWithTax = actualPrice + estimatedTax;
                    const convertedPrice =
                      priceWithTax && priceWithTax * currencyRate;

                    return (
                      <List.Item>
                        {course && (
                          <div className="w-full">
                            <Card>
                              <div className="flex gap-4">
                                <div>
                                  <Image
                                    src={courseImage}
                                    alt="icon"
                                    width={100}
                                    height={100}
                                  />
                                </div>

                                <div className=" flex flex-col">
                                  <div>
                                    <Title level={5}>{course?.title}</Title>
                                  </div>

                                  <div>
                                    <Paragraph className="">
                                      By {course?.organizationName}
                                    </Paragraph>
                                  </div>
                                  <div className="flex gap-2">
                                    <Paragraph className="text-purple-50">
                                      {actualPrice
                                        ? formatCurrency(
                                          convertedPrice || priceWithTax
                                        )
                                        : "Free"}
                                    </Paragraph>

                                    {/* <Paragraph className="line-through">
                                {course?.pricing
                                  ? "$" + course?.pricing?.amount
                                  : null}
                              </Paragraph> */}
                                  </div>
                                  {/* 
                          <div className="flex gap-2 items-center">
                            <Rate value={4} disabled />

                            <Paragraph className="m-0">
                              (21,891 ratings)
                            </Paragraph>
                          </div> */}

                                  <div className="flex gap-4">
                                    <Button
                                      type="primary"
                                      className="hover:cursor-pointer bg-inherit border-none shadow-none text-blue-600"
                                      onClick={() => handleRemove(cart.id)}
                                      loading={loading}
                                    >
                                      Remove
                                    </Button>

                                    {/* <Typography.Link className="hover:underline">
                                Move to wishlist
                              </Typography.Link> */}
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </div>
                        )}
                      </List.Item>
                    );
                  }}
                />
              </Skeleton>
              <div className="flex justify-center items-center lg:w-1/3 md:w-2/3 w-full">
                <Card className="w-[300px]">
                  <div className="flex flex-col gap-4">
                    <div>
                      <Title level={4} className="text-black">
                        CART SUMMARY
                      </Title>
                    </div>

                    <div>
                      <hr />
                    </div>

                    {/* <div className="flex justify-between items-center">
                  <Paragraph className="m-0">75% off</Paragraph>
                  <Paragraph className="m-0">USD 650.70</Paragraph>
                </div> */}

                    <div className="flex justify-between items-center">
                      <Paragraph className="m-0 text-base font-semibold">
                        Subtotal
                      </Paragraph>
                      <Title level={4} className="text-purple-50 text-sm m-0">
                        {formatCurrency(subTotal)}
                        {/* USD 400.60 */}
                      </Title>
                    </div>

                    <div>
                      <hr />
                    </div>

                    <div>
                      {cartList.length > 0 ? (
                        <Button
                          type="primary"
                          size="large"
                          className="rounded-[4px]"
                          block
                          href={`/courses/course-checkout?d=${Buffer.from(
                              JSON.stringify({ 
                                "courseId": courseIds, 
                                "totalPrice": totalPrice 
                              }
                            )).toString('base64')
                            }
                            `}
                          // href={`/ courses / course - checkout ? d = courseId = ${courseIds}&totalPrice=${totalPrice}`}
                        >
                      Proceed to checkout
                    </Button>
                    ) : (
                    <Button
                      type="primary"
                      size="large"
                      className="rounded-[4px]"
                      block
                      // href={`/courses/course-checkout?totalPrice=${subTotal}`}
                      href={"/courses"}
                    >
                      Continue Browsing
                    </Button>
                      )}
                  </div>
              </div>
            </Card>
          </div>
            </div>
          </section >
        )}
      </Spin >
    </div >
  );
};

export default CartPage;
