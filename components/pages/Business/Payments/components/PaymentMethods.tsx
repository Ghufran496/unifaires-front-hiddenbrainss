"use client";
import { Fragment, useEffect, useState } from "react";
import Container from "@/components/shared/container";
import {
  Button,
  Card,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Typography,
  message,
} from "antd";
import { UserInt } from "@/app/utils/interface";
import Image from "next/image";
import WalletImage from "@/public/images/wallet.png";
import SendMoney from "@/public/images/sendMoney.png";
import AddCard from "./AddCard";
import {
  CopyOutlined,
  DeleteOutlined,
  LeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ComingSoonModal from "@/components/shared/Soon/ComingSoonModal";
import axiosInstance from "@/app/utils/axios-config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import { fetchUserProfile } from "@/redux/features/UserSlice";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";

interface DataType extends UserInt {
  completed: string;
  paymentType: string;
  date: string;
  amount: any;
  item: string;
  user: UserInt;
}

interface ICard {
  id: string;
  brand: string;
  exp_month: number;
  exp_year: number;
  last4: string;
}

interface AddressInt {
  zipcode: string;
  id: number;
  address: string;
  country: string;
  city: string;
  fullname: string;
  phoneNumber: string;
  state: string;
}

interface IPlan {
  id: number;
  title: string;
  price: string;
  meta: string;
}

const PaymentMethods = () => {
  const { data: session } = useSession();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch: any = useAppDispatch();
  const [customerCard, setCustomerCard] = useState<Array<ICard>>([]);
  const [addAccount, setAddAccount] = useState(false);
  const [isModalCard, setIsModalCard] = useState(false);
  const [userSubPlan, setUserSubPlan] = useState<IPlan>();
  const [comingSoon, setComingSoon] = useState(false);

  const fetchUserCards = async () => {
    await axiosInstance
      .get("/payment/customer-card")
      .then((res) => {
        setCustomerCard(res.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchUserSubscriptionPlan = async () => {
    await axiosInstance
      .get("/subscription/user-subscription")
      .then((res) => {
        setUserSubPlan(res.data.data.subscriptionplan);
        // setSubPlan(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUserSubscriptionPlan();
    fetchUserCards();
  }, []);

  const handleSelectCard = (e: RadioChangeEvent) => {
    console.log("this is the value", e.target.value);
  };

  const handleDeleteCard = async (id: any) => {
    await axiosInstance
      .post("/payment/remove-card", {
        cardId: id,
      })
      .then((res) => {
        fetchUserCards();
        message.success("Card removed Successfully");
      })
      .catch((error) => {
        message.error("Unable to remove card");
        console.log(error);
      });
  };

  // UPDATE USER FIRST AND LAST NAME
  async function updateAccount() {
    const formData = await form.getFieldsValue();
    setLoading(true);
    await axiosInstance
      .put(`/business/${session?.user?.id}`, formData)
      .then((res) => {
        dispatch(fetchUserProfile("business"));
        showSuccess("Details Updated Successfully");
        setLoading(false);
      })
      .catch((error) => {
        console.log("here is the error", error);
        handleAxiosError(error);
      });
    setLoading(false);
  }

  const myProfile = useAppSelector((state: any) => state.user.myProfile);

  return (
    <Fragment>
      <div className="font-Montserrat lg:m-10 m-6">
        <Container className="mt-8">
          <div className="flex">
            <Typography.Paragraph
              onClick={() => setAddAccount(true)}
              className="flex ml-auto text-base font-bold text-blue-700 hover:cursor-pointer hover:underline"
            >
              Add Payout Account
            </Typography.Paragraph>
          </div>
          {/* Account Details */}
          {addAccount && (
            <div className="my-4">
              <Typography.Title
                level={4}
                className="flex items-center gap-2 hover:cursor-pointer"
                onClick={() => setAddAccount(false)}
              >
                <LeftOutlined />
                Bank Account Details
              </Typography.Title>
              <Form layout="vertical" size="large" form={form}>
                <Form.Item label="Bank Name" name="bankName" required>
                  <Input
                    placeholder="Enter Bank Name"
                    className="w-1/2 bg-inherit"
                  />
                </Form.Item>
                <Form.Item label="Account Number" name="accountNumber" required>
                  <Input
                    placeholder="0003873078"
                    className="w-1/2 bg-inherit"
                    type="number"
                  />
                </Form.Item>
              </Form>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={updateAccount}
                loading={loading}
              >
                Save
              </Button>
            </div>
          )}
          {myProfile && myProfile.accountNumber && (
            <div className="bg-white mb-4 w-[300px] p-6 rounded-lg">
              <div className="flex justify-between ">
                <div>
                  <Typography.Paragraph className="text-base font-bold m-0">
                    Account Name
                  </Typography.Paragraph>
                  <Typography.Paragraph className="text-gray-500 italic">
                    {myProfile.firstname} {myProfile.lastname}
                  </Typography.Paragraph>
                </div>
              </div>
              <div className="flex justify-between ">
                <div>
                  <Typography.Paragraph className="text-base font-bold m-0">
                    Account Number
                  </Typography.Paragraph>
                  <Typography.Paragraph
                    //   ref={accountNumberRef}
                    className="text-gray-500 italic"
                  >
                    {myProfile.accountNumber}
                  </Typography.Paragraph>
                </div>
              </div>
              <div className="flex justify-between ">
                <div>
                  <Typography.Paragraph className="text-base font-bold m-0">
                    Bank Name
                  </Typography.Paragraph>
                  <Typography.Paragraph className="text-gray-500 italic">
                    {myProfile.bankName}
                  </Typography.Paragraph>
                </div>
              </div>
            </div>
          )}

          {/* Payment Method */}
          <div className="border-2 p-8 mb-10">
            <Typography.Title level={3} className="font-bold">
              Payment Methods
            </Typography.Title>
            <div className="flex lg:flex-row md:flex-col-reverse flex-col-reverse bg-purple-300 lg:p-6 p-4 rounded-md">
              <div className="lg:w-3/5 w-full">
                <Typography.Paragraph className="font-semibold text-white">
                  Discover Effortless Transactions: Your Gateway to Secure
                  Payment Solutions!
                </Typography.Paragraph>
                <Typography.Paragraph className="text-white">
                  Experience seamless transactions with our diverse payment
                  methods, tailored for your convenience. With our hassle-free
                  payment solutions, enjoy swift, reliable, and worry-free
                  transactions every time.
                </Typography.Paragraph>
              </div>
              <div className="lg:block md:hidden relative lg:w-2/5">
                <div className="lg:absolute md:relative sm:relative lg:-top-[6rem] md:top-0 sm:top-0 right-0">
                  <Image
                    src={WalletImage}
                    alt="wallet"
                    // width={1500}
                    // height={1400}
                  />
                </div>
              </div>
            </div>
            <div className="my-10">
              <Typography.Paragraph className="text-lg font-bold mb-0">
                Cards
              </Typography.Paragraph>
              <div className="p-4 border rounded-md">
                <div className="mt-4">
                  <Radio.Group onChange={handleSelectCard}>
                    {customerCard?.length > 0 &&
                      customerCard.map((card) => {
                        return (
                          <Radio value={card} key={card.id}>
                            <Card
                              className=" mb-2"
                              // onClick={() => setSelectedCard(card)}
                            >
                              <div className="flex flex-row justify-between items-center gap-4">
                                <div>
                                  <Typography.Paragraph className="font-semibold text-blue-700 mb-0">
                                    {card.brand}
                                  </Typography.Paragraph>
                                  <Typography.Paragraph>
                                    **** **** **** {card.last4}
                                  </Typography.Paragraph>
                                </div>
                                <div className="flex ml-auto items-center justify-center my-0">
                                  <Button
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    className="ml-auto text-red-700"
                                    onClick={() => handleDeleteCard(card.id)}
                                  />
                                </div>
                              </div>
                            </Card>
                          </Radio>
                        );
                      })}
                  </Radio.Group>
                </div>
              </div>
            </div>
            <AddCard
              isModalCard={isModalCard}
              setIsModalCard={setIsModalCard}
              fetchUserCards={fetchUserCards}
            />
            <Button
              type="primary"
              size="large"
              className="w-full rounded-md"
              onClick={() => setIsModalCard(true)}
            >
              Add a Payment Method
            </Button>
          </div>

          {/* Send Money to Unifaires */}
          <div className="mb-10">
            <div className="flex lg:flex-row md:flex-col-reverse flex-col-reverse bg-purple-300 lg:p-6 p-4 rounded-md">
              <div className="lg:w-3/5 w-full">
                <Typography.Paragraph className="font-semibold text-white mt-2 lg:text-left md:text-left text-center text-[24px]">
                  Send Money to Unifaires Accounts
                </Typography.Paragraph>
                <Typography.Paragraph className="text-white lg:text-left md:text-left text-center">
                  Send Money to Unifaires Accounts and others
                </Typography.Paragraph>
                <div className="flex justify-center md:justify-start lg:justify-start">
                  <Button
                    // href="/business/payments/send-money"
                    onClick={() => {
                      setComingSoon(true);
                    }}
                    type="primary"
                    size="large"
                    className="bg-white text-purple-300 rounded-md font-bold "
                  >
                    Send Money
                  </Button>
                </div>
              </div>
              <div className="lg:block md:hidden relative lg:w-2/5">
                <div className="lg:absolute md:relative sm:flex lg:-top-[2.8rem] md:top-0 sm:top-0 right-0">
                  <Image
                    src={SendMoney}
                    alt="wallet"
                    // width={300}
                    // height={200}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <ComingSoonModal comingSoon={comingSoon} setComingSoon={setComingSoon} />
    </Fragment>
  );
};
export default PaymentMethods;
