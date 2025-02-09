"use client";
import {
  fetchBusinessDiscount,
  fetchCountryDiscount,
} from "@/redux/features/DiscountSlice";
import { fetchAllTax } from "@/redux/features/TaxSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
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
} from "antd";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

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
  firstname: string;
  lastname: string;
  email: string;
  endDate: string;
  price: number;
  startDate: Date;
}
interface IProp {
  billingAddress: AddressInt | any;
  prev: Function;
  setCurrent: any;
  totalPrice: number;
  selectedCard: ICard | undefined;
  inviteForm: Array<InviteInt>;
}

const Confirm = ({
  billingAddress,
  prev,
  setCurrent,
  totalPrice,
  selectedCard,
  inviteForm,
}: IProp) => {
  const { data: session } = useSession();
  const businessId: any = session?.user.id;
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const dispatch: any = useAppDispatch();
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationData = info && info.data;
  const userCountry = locationData && locationData?.country;
  const locationCurrency = info && info.data.currency;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;

  // console.log(selectedCard)

  const handleMakePayment = async () => {
    const formattedInviteForm = inviteForm.map(
      ({ firstname, lastname, email, endDate, startDate }) => ({
        firstname,
        lastname,
        email,
        endDate,
        startDate,
      })
    );
    setLoading(true);

    await axios
      .post(
        `${config.API.API_URL}/payment/associate`,
        {
          card: { id: selectedCard?.id },
          associates: formattedInviteForm,
        },
        {
          headers: {
            "x-token": session?.user?.token,
          },
        }
      )
      .then((res) => {
        showSuccess("Payment made Successfully");
        setIsModalOpen(true);
        setTimeout(function () {
          router.push("/business/associated-users");
        }, 2000);
      })
      .catch((error) => {
        handleAxiosError(error);
        console.log("this is the ", error);
      });

    setLoading(false);
  };

  useEffect(() => {
    dispatch(fetchAllTax());
    if (userCountry) {
      dispatch(
        fetchCountryDiscount({ type: "associate", country: userCountry })
      );
    }
    if (businessId) {
      dispatch(fetchBusinessDiscount({ type: "associate", businessId }));
    }
  }, []);

  const taxes = useAppSelector((state: any) => state.tax.taxes);
  const countryDiscount = useAppSelector(
    (state: RootState) => state.discounts.countryDiscount
  );
  const businessDiscount = useAppSelector(
    (state: RootState) => state.discounts.businessDiscount
  );
  const currencyRate = useAppSelector(
    (state: RootState) => state.currency.currencyRate
  );

  const getTaxForCountry = (countryName: string) => {
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

  const convertedTotalPrice = currencyRate
    ? totalPrice * currencyRate
    : totalPrice;

  const estimatedTax =
    convertedTotalPrice * (getTaxForCountry(userCountry) / 100);
  const applicableDiscount =
    businessDiscount && businessDiscount?.discount !== 0
      ? businessDiscount
      : countryDiscount;
  const discountAmount =
    convertedTotalPrice * (applicableDiscount?.discount / 100 || 0);
  const beforeTax = convertedTotalPrice - discountAmount;
  const finalPrice = convertedTotalPrice - discountAmount + estimatedTax;

  return (
    <Fragment>
      <div className="flex lg:flex-row md:flex-row flex-col gap-8 p-4">
        <div className="flex-initial w-full">
          <Typography.Title level={3}>Review Your order</Typography.Title>
          <Divider className="mt-0" />
          <div>
            <Typography.Paragraph className="text-lg font-bold">
              Billing Address{" "}
              <span
                className="text-blue-600 font-normal text-sm cursor-pointer pl-2"
                onClick={() => prev()}
              >
                Change
              </span>
            </Typography.Paragraph>
            <Typography.Paragraph className="m-0">
              {billingAddress?.fullname}
            </Typography.Paragraph>
            <Typography.Paragraph className="m-0">
              {billingAddress?.city}
            </Typography.Paragraph>
            <Typography.Paragraph className="m-0">
              {billingAddress?.address}
            </Typography.Paragraph>
            <Typography.Paragraph className="m-0">
              {billingAddress?.country}
            </Typography.Paragraph>
          </div>
          <Divider />
          <div>
            <Typography.Paragraph className="text-lg font-bold">
              Payment method
              <span
                className="text-blue-600 font-normal text-sm cursor-pointer pl-2"
                onClick={() => {
                  setCurrent(1);
                }}
              >
                Change
              </span>
            </Typography.Paragraph>
            <Typography.Paragraph>
              Ending in {selectedCard?.last4}
            </Typography.Paragraph>
          </div>
          <Divider />
          <div>
            <Typography.Paragraph>
              Add a gift card, vourcher or promotional code.
            </Typography.Paragraph>
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
        <div className="flex flex-initial items-center px-10 w-[45%]">
          <Card className="w-max bg-gray-50">
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
              <Typography.Paragraph className="flex justify-between">
                Items:
                <span className="ml-auto text-purple-600 font-bold">
                  {formatCurrency(convertedTotalPrice) || "0.00"}
                </span>
              </Typography.Paragraph>

              <Typography.Paragraph className="flex justify-between">
                <span>
                  {businessDiscount && businessDiscount?.discount !== 0
                    ? "Business Discount"
                    : "Country Discount"}
                  <span className="text-purple-600 font-bold">
                    ({applicableDiscount?.discount}%):
                  </span>
                </span>
                <span className="ml-auto text-purple-600 font-bold">
                  - {formatCurrency(discountAmount) || "0.00"}
                </span>
              </Typography.Paragraph>
              {/* <Typography.Paragraph className="flex justify-between">
                Shopping & Handling:
                <span className="ml-auto text-purple-600 font-bold">$0.00</span>
              </Typography.Paragraph> */}
              <Typography.Paragraph className="flex justify-between">
                Total before tax:
                <span className="ml-auto text-purple-600 font-bold">
                  {formatCurrency(beforeTax) || "0.00"}
                </span>
              </Typography.Paragraph>
              <Typography.Paragraph className="flex justify-between">
                <span>
                  Estimated tax to be collected
                  <span className="text-purple-600 font-bold">
                    ({getTaxForCountry(userCountry)}%):
                  </span>
                </span>
                <span className="ml-auto text-purple-600 font-bold">
                  {formatCurrency(estimatedTax) || "0.00"}
                </span>
              </Typography.Paragraph>

              <Divider />
              <div className="w-full">
                <Typography.Title level={4} className=" flex text-red-800">
                  Payment Total:{" "}
                  <span className="text-lg text-purple-600 ml-auto">
                    {formatCurrency(finalPrice)}
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
