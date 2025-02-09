"use client";
import { fetchAllTax } from "@/redux/features/TaxSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";
import config from "@/app/utils/config";
import {
  Typography,
  Divider,
  Form,
  Input,
  Button,
  Card,
  Collapse,
  message,
  Modal,
  Result,
  Select,
} from "antd";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { cartCourses } from "@/redux/features/CoursesSlice";

interface AddressInt {
  id: number;
  address: string;
  country: string;
  city: string;
  fullname: string;
  phoneNumber: string;
  state: string;
}

interface ICard {
  id: string;
  brand: string;
  exp_month: number;
  exp_year: number;
  last4: string;
}

interface InviteInt {
  fullname: string;
  email: string;
  endDate: string;
  price: number;
  startDate: Date;
}
interface IProp {
  billingAddress: AddressInt | any;
  prev: Function;
  reqBody: any;
  setCurrent: any;
  totalPrice: any;
  selectedCard: ICard | undefined;
  courseId: any;
}

const { Title, Paragraph } = Typography;

const Confirm = ({
  billingAddress,
  prev,
  reqBody,
  setCurrent,
  totalPrice,
  selectedCard,
  courseId,
}: IProp) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const userId = session?.user?.id;
  const dispatch: any = useAppDispatch();
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationData = info && info.data;
  const userCountry = locationData && locationData?.country;
  const locationCurrency = info && info.data.currency;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;

  const handleMakePayment = async () => {
    const paymentEndpoint =
      reqBody && userCountry == "Nigeria"
        ? // ? "/ng-payment/course-card-otp"
          "/enrol-course"
        : "/enrol-course";
    setLoading(true);
    try {
      const payFor = await axiosInstance.post(`${paymentEndpoint}`, {
        ...reqBody,
      });
      if (payFor) {
        dispatch(cartCourses());

        // message.success("Payment ade Successfully");
        toast.success("Payment made Sucessfully");
        setIsModalOpen(true);
        setTimeout(function () {
          router.push("/user/my-learning");
        }, 2000);
      }
    } catch (error: any) {
      message.error(`${error?.response?.data?.message}`);
      console.log(error);
    }
    setLoading(false);
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
  const estimatedPrice = currencyRate && totalPrice * currencyRate;
  const estimatedTax = totalPrice * (getTaxForCountry(userCountry) / 100);
  const convertedTax = currencyRate && estimatedTax * currencyRate;
  const finalPrice = totalPrice + estimatedTax;
  const convertedFinalPrice = currencyRate && finalPrice * currencyRate;

  return (
    <Fragment>
      <div className="flex lg:flex-row md:flex-row flex-col gap-8 p-4">
        <div className="flex-initial w-full">
          <Title level={3}>Review Your order</Title>
          <Divider className="mt-0" />
          <div>
            <Paragraph className="text-lg font-bold">
              Billing Address{" "}
              <span
                className="text-blue-600 font-normal text-sm cursor-pointer pl-2"
                onClick={() => prev()}
              >
                Change
              </span>
            </Paragraph>
            <Paragraph className="m-0">{billingAddress?.fullname}</Paragraph>
            <Paragraph className="m-0">{billingAddress?.city}</Paragraph>
            <Paragraph className="m-0">{billingAddress?.address}</Paragraph>
            <Paragraph className="m-0">{billingAddress?.country}</Paragraph>
          </div>
          <Divider />
          <div>
            <Paragraph className="text-lg font-bold">
              Payment method
              <span
                className="text-blue-600 font-normal text-sm cursor-pointer pl-2"
                onClick={() => {
                  setCurrent(1);
                }}
              >
                Change
              </span>
            </Paragraph>
            <Paragraph>Ending in {selectedCard?.last4}</Paragraph>
          </div>
          <Divider />
          <div>
            <Paragraph>
              Add a gift card, vourcher or promotional code.
            </Paragraph>
            <Form.Item name="cupon">
              <div className="flex flex-row gap-6">
                <Input placeholder="Enter a Code" />
                <Button
                  size="large"
                  className="flex flex-row ml-auto bg-gray-200"
                >
                  Apply
                </Button>
              </div>
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-initial items-center lg:w-[45%] md:w-[55%] w-full">
          <Card className=" bg-gray-50">
            <Button
              type="primary"
              size="large"
              className="flex justify-center items-center w-full mb-4"
              onClick={handleMakePayment}
              loading={loading}
            >
              Place your order
            </Button>
            <Typography.Paragraph className="text-gray-400">
              By clicking to place your order, you agree to unifaires terms of
              use and privacy policy.
            </Typography.Paragraph>
            <Divider />
            <div>
              <Typography.Paragraph className="font-semibold">
                ORDER SUMMARY
              </Typography.Paragraph>
              <Typography.Paragraph className="flex">
                Item(s):
                <span className="ml-auto text-purple-600 font-bold">
                  {formatCurrency(estimatedPrice || totalPrice)}
                </span>
              </Typography.Paragraph>
              <Typography.Paragraph className="flex">
                Shopping & Handling:
                <span className="ml-auto text-purple-600 font-bold">$0.00</span>
              </Typography.Paragraph>
              <Typography.Paragraph className="flex">
                Total before tax:
                <span className="ml-auto text-purple-600 font-bold">
                  {formatCurrency(estimatedPrice || totalPrice)}
                </span>
              </Typography.Paragraph>
              <Typography.Paragraph className="flex">
                Estimated tax to be collected
                <span className="text-purple-600 font-bold">
                  ({getTaxForCountry(userCountry)}%)
                </span>
                :
                <span className="ml-auto text-purple-600 font-bold">
                  {formatCurrency(convertedTax || estimatedTax) || 0.0}
                </span>
              </Typography.Paragraph>
              <Divider />
              <div className="w-full">
                <Typography.Title level={4} className=" flex text-red-800">
                  Payment Total:{" "}
                  <span className="text-lg text-purple-600 ml-auto">
                    {formatCurrency(convertedFinalPrice || finalPrice)}
                  </span>
                </Typography.Title>
                <Collapse ghost size="small">
                  <Collapse.Panel
                    key={"Exchange-Rate"}
                    header={
                      <Typography.Paragraph className="m-0">
                        Applicable Exchange Rate
                      </Typography.Paragraph>
                    }
                  >
                    {currencyRate && (
                      <Typography.Paragraph className="m-0  text-base font-semibold italic">
                        1 USD = {formatCurrency(currencyRate)}
                      </Typography.Paragraph>
                    )}
                  </Collapse.Panel>
                </Collapse>
              </div>
            </div>
          </Card>
        </div>
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Result
            status="success"
            title="Payment Successfull"
            subTitle="Please wait while we redirect you"
          />
        </Modal>
      </div>
    </Fragment>
  );
};

export default Confirm;
