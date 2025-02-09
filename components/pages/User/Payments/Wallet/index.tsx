"use client";
import {
  fetchUserCard,
  fetchWalletBalance,
  user,
} from "@/redux/features/UserSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  ArrowLeftOutlined,
  CopyOutlined,
  LeftOutlined,
  PhoneOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  Typography,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { BsPhone, BsPin, BsTv } from "react-icons/bs";
import { GiAerialSignal, GiElectric, GiNetworkBars } from "react-icons/gi";
import { toast } from "react-toastify";
import unifairesReload from "@/public/images/unifairesReload.png";
import AddCard from "../AddCard";
import { fetchAirtimeBillers } from "@/redux/features/BillsSlice";
import axiosInstance from "@/app/utils/axios-config";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import { RootState } from "@/redux/store";
import { getCookie } from "cookies-next";

const UserWallet = () => {
  const [form] = Form.useForm();
  const [fundAmount] = Form.useForm();
  const { data: session, update: sessionUpdate } = useSession();
  const sessionWalletBalance: any = session && session?.user.balance;
  const virtualAccount = session && session?.user.virtualAccount; // console.log(session?.user);
  const accountNumberRef: any = useRef();
  const [authorizeLoading, setAuthorizeLoading] = useState(false);
  const dispatch: any = useAppDispatch();
  const [selectCountry, setSelectCountry] = useState(false);
  const [fundWallet, setFundWallet] = useState(false);
  const [fundingMethod, setFundingMethod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bankTransfer, setBankTransfer] = useState(false);
  const [cardPayment, setCardPayment] = useState(false);
  const [isModalCard, setIsModalCard] = useState(false);
  const [airtime, setAirtime] = useState(false);
  const [buyData, setBuyData] = useState(false);
  const [buyElectricity, setBuyElectricity] = useState(false);
  const [examPin, setExamPin] = useState(false);
  const [cable, setCable] = useState(false);
  const [bvn, setBvn] = useState<any>();
  const myProfile = useAppSelector((state: any) => state.user.myProfile);
  const customerCard = useAppSelector((state: any) => state.user.myCards);
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationData = info && info.data;
  const userCountry = locationData && locationData?.country;
  const locationCurrency = info && info.data.currency;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;

  const fethAirtimeB = async () => {
    try {
      const res = await axiosInstance.get("/ng-payment/airtime-billers");

      if (res.status) {
        console.log("Airtime billers", res);
      }
    } catch (error) {
      console.log("here is the anser", error);
    }
  };

  useEffect(() => {
    fethAirtimeB();
    dispatch(fetchAirtimeBillers());
    dispatch(fetchWalletBalance());
  }, []);

  const myBalance = useAppSelector(
    (state: RootState) => state.user.walletBalance
  );

  const walletBalance = myBalance
    ? parseFloat(myBalance)
    : parseFloat(sessionWalletBalance);

  // console.log("here is the virtual account balance", myBalance);
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

  function getGreeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let greeting;

    if (currentHour < 12) {
      greeting = "Good morning";
    } else if (currentHour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }

    return greeting;
  }

  const quickActionList = [
    { name: "Airtime", icon: <BsPhone /> },
    { name: "Data", icon: <GiAerialSignal /> },
    { name: "Electricity", icon: <GiElectric /> },
    { name: "Exam Pin", icon: <BsPin /> },
    { name: "TV Cables", icon: <BsTv /> },
  ];

  const walletFundingMethods = [
    { name: "Bank Transfer" },
    // { name: "Debit or Credit Card" },
  ];

  const handleFundWallet = () => {
    setFundWallet(true);
    setPaymentMethod("");
    setBankTransfer(false);
    setCardPayment(false);
    setAirtime(false);
    setBuyData(false);
    setBuyElectricity(false);
    setFundingMethod(false);
  };

  const MakeFunding = () => {
    setFundWallet(true);
    setPaymentMethod("");
    setBankTransfer(false);
    setCardPayment(false);
    setAirtime(false);
    setBuyData(false);
    setBuyElectricity(false);
    setFundingMethod(true);
  };

  const handlePaymentMethod = (e: any) => {
    setPaymentMethod(e.target.value);
  };

  const paymentMethodProceed = () => {
    if (paymentMethod === "Bank Transfer") {
      setBankTransfer(true);
    } else {
      setCardPayment(true);
    }
  };

  const handleCopy = () => {
    console.log();
    // Text you want to copy
    const textToCopy = accountNumberRef.current.innerHTML;
    // Create a temporary textarea element
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    toast.success("Text copied to clipboard");
  };

  const handleSelectedCard = () => {
    console.log("card selected");
  };

  const handleQuickAction = (name: any) => {
    if (name === "Airtime") {
      setAirtime(true);
      setSelectCountry(false);
    } else if (name === "Data") {
      setBuyData(true);
      setSelectCountry(false);
    } else if (name === "Electricity") {
      setBuyElectricity(true);
      setSelectCountry(false);
    } else if (name === "Exam Pin") {
      setExamPin(true);
      setSelectCountry(false);
    } else {
      setCable(true);
      setSelectCountry(false);
    }
  };

  const onCountrySelected = () => {
    setSelectCountry(true);
  };

  async function createWallet() {
    try {
      setAuthorizeLoading(true);
      const res = await axiosInstance.post(
        "/ng-payment/user-virtual-bank-account",
        {
          bvn: bvn,
        }
      );
      if (res.status) {
        const resData = res.data.data;

        sessionUpdate({
          ...session!.user,
          virtualAccount: resData.accountNumber,
        }).then(() => {
          showSuccess("Account Created Successfully");
          handleFundWallet();
        });
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setAuthorizeLoading(false);
    }
  }

  return (
    <div>
      <div className="flex lg:flex-row md:flex-row flex-col gap-6 justify-between bg-gradient-to-t from-purple-400 to-purple-200 p-6 rounded-lg">
        <div className="flex flex-col justify-center">
          <Typography.Paragraph className="font-medium text-white italic text-lg m-0">
            {getGreeting()},
          </Typography.Paragraph>
          <Typography.Title className="text-white m-0 font-bold" level={2}>
            {myProfile.firstname}
          </Typography.Title>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center bg-purple-300 p-4 px-10 rounded-lg">
          <Typography.Paragraph className="m-0 text-white font-semibold">
            Wallet Balance
          </Typography.Paragraph>
          <Typography.Title level={2} className="text-white font-bold m-0">
            {formatCurrency(walletBalance || 0)}
          </Typography.Title>
          <Button
            type="default"
            icon={<PlusCircleOutlined />}
            className="border-none text-white bg-purple-200  rounded-full font-semibold"
            onClick={handleFundWallet}
          >
            Fund Wallet
          </Button>
        </div>
      </div>
      <div className="mt-6">
        {!fundWallet &&
        !fundingMethod &&
        !airtime &&
        !buyData &&
        !buyElectricity &&
        !examPin &&
        !cable ? (
          <div>
            <div>
              <Typography.Paragraph className="font-bold text-base">
                Quick Services
              </Typography.Paragraph>
            </div>
            <div className="flex lg:flex-row md:flex-row sm:flex-col lg:justify-start justify-center items-center flex-wrap gap-6">
              {quickActionList.map((action, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white rounded-full hover:shadow-xl hover:border-2 hover:border-purple-300 cursor-pointer"
                    onClick={() => handleQuickAction(action.name)}
                  >
                    <div className="flex flex-col gap-1 items-center justify-center w-[100px] h-[100px]">
                      <span className="text-lg text-purple-400">
                        {action.icon}
                      </span>
                      <Typography.Paragraph className="m-0 font-semibold">
                        {action.name}
                      </Typography.Paragraph>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : fundWallet && bankTransfer ? (
          <div>
            <div>
              <Typography.Paragraph
                onClick={() => setBankTransfer(false)}
                className="flex gap-1 text-base font-bold hover:text-purple-500 cursor-pointer"
              >
                <LeftOutlined />
                BankTransfer
              </Typography.Paragraph>
            </div>
            <div className="lg:ml-8">
              <Typography.Paragraph>
                These is your genuine Unifaires Pay Wallet account, always
                transfer to it anytime to fund your wallet. It will reflects
                instantly and automatically
              </Typography.Paragraph>
              <div className="bg-white w-[300px] p-6 rounded-lg">
                <div className="flex justify-between ">
                  <div>
                    <Typography.Paragraph className="text-base font-bold m-0">
                      Account Name
                    </Typography.Paragraph>
                    <Typography.Paragraph className="text-gray-500 italic">
                      {myProfile.firstname} {myProfile.lastname}
                    </Typography.Paragraph>
                  </div>

                  <Button
                    type="default"
                    className="border-none"
                    icon={<CopyOutlined />}
                    size="small"
                    onClick={handleCopy}
                  >
                    Copy
                  </Button>
                </div>
                <div className="flex justify-between ">
                  <div>
                    <Typography.Paragraph className="text-base font-bold m-0">
                      Account Number
                    </Typography.Paragraph>
                    <Typography.Paragraph
                      ref={accountNumberRef}
                      className="text-gray-500 italic"
                    >
                      {virtualAccount.accountNumber}
                    </Typography.Paragraph>
                  </div>

                  <Button
                    type="default"
                    className="border-none"
                    icon={<CopyOutlined />}
                    size="small"
                    onClick={handleCopy}
                  >
                    Copy
                  </Button>
                </div>
                <div className="flex justify-between ">
                  <div>
                    <Typography.Paragraph className="text-base font-bold m-0">
                      Bank Name
                    </Typography.Paragraph>
                    <Typography.Paragraph className="text-gray-500 italic">
                      {virtualAccount.bankName}
                    </Typography.Paragraph>
                  </div>
                </div>
                {/* <div className="flex justify-between ">
                  <div>
                    <Typography.Paragraph className="text-base font-bold m-0">
                      Payment Processor Fee
                    </Typography.Paragraph>
                    <Typography.Paragraph className="text-gray-500 italic">
                      $1
                    </Typography.Paragraph>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        ) : fundWallet && cardPayment ? (
          <div>
            <div>
              <Typography.Paragraph
                onClick={() => setCardPayment(false)}
                className="flex gap-1 text-base font-bold hover:text-purple-500 cursor-pointer"
              >
                <LeftOutlined />
                Card Payment Method
              </Typography.Paragraph>
            </div>
            <div className="p-4 border rounded-md">
              <div>
                <AddCard
                  isModalCard={isModalCard}
                  setIsModalCard={setIsModalCard}
                  fetchUserCards={fetchUserCard}
                />
                <Button
                  type="primary"
                  size="large"
                  className="flex items-center ml-auto rounded-md"
                  onClick={() => setIsModalCard(true)}
                >
                  Add a Card
                </Button>
              </div>
              <div className="mt-4">
                <Radio.Group onChange={handleSelectedCard}>
                  {customerCard?.length > 0 &&
                    customerCard.map((card: any) => {
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
                            </div>
                          </Card>
                        </Radio>
                      );
                    })}
                </Radio.Group>
              </div>
            </div>
          </div>
        ) : airtime ? (
          <div>
            <div>
              <Typography.Paragraph
                onClick={() => setAirtime(false)}
                className="flex gap-1 text-base font-bold hover:text-purple-500 cursor-pointer"
              >
                <LeftOutlined />
                Buy Airtime
              </Typography.Paragraph>
            </div>
            <div className="w-[300px] lg:ml-8 md:ml-8">
              <Form layout="vertical" form={form}>
                <Form.Item
                  name="country"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Select country",
                    },
                  ]}
                >
                  <Select
                    className="border-2  rounded-full hover:border-purple-400"
                    bordered={false}
                    size="large"
                    allowClear
                    showSearch
                    placeholder="Select a country"
                    optionFilterProp="children"
                    onChange={onCountrySelected}
                    filterOption={(
                      input: string,
                      option?: { label: string; value: string }
                    ) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "nigeria",
                        label: "Nigeria",
                      },
                      {
                        value: "germany",
                        label: "Germany",
                      },
                    ]}
                  />
                </Form.Item>
                {selectCountry && (
                  <div>
                    <Form.Item
                      name="networkProvider"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Select network provider",
                        },
                      ]}
                    >
                      <Select
                        className="border-2  rounded-full hover:border-purple-400"
                        bordered={false}
                        size="large"
                        allowClear
                        showSearch
                        placeholder="Select a network provider"
                        optionFilterProp="children"
                        //   onChange={onChange}
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "mtn",
                            label: "MTN",
                          },
                          {
                            value: "glo",
                            label: "Glo",
                          },
                          {
                            value: "airtel",
                            label: "Airtel",
                          },
                          {
                            value: "9mobile",
                            label: "9Mobile",
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      name="phoneNumber"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter beneficiary Number",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Beneficiary Number"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                    <Form.Item
                      name="amount"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter amount",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Amount"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                    <Form.Item
                      name="transactionPin"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter transaction pin",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Transaction Pin"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                    <Form.Item name="beneficiary">
                      <Checkbox>Save beneficiary</Checkbox>
                    </Form.Item>
                  </div>
                )}
                <Button
                  type="primary"
                  size="large"
                  className="w-full rounded-full bg-purple-400 hover:bg-purple-300"
                >
                  Continue
                </Button>
              </Form>
            </div>
          </div>
        ) : buyData ? (
          <div>
            <div>
              <Typography.Paragraph
                onClick={() => setBuyData(false)}
                className="flex gap-1 text-base font-bold hover:text-purple-500 cursor-pointer"
              >
                <LeftOutlined />
                Buy Data
              </Typography.Paragraph>
            </div>
            <div className="w-[300px] lg:ml-8 md:ml-8">
              <Form layout="vertical" form={form}>
                <Form.Item
                  name="country"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Select country",
                    },
                  ]}
                >
                  <Select
                    className="border-2  rounded-full hover:border-purple-400"
                    bordered={false}
                    size="large"
                    allowClear
                    showSearch
                    placeholder="Select a country"
                    optionFilterProp="children"
                    onChange={onCountrySelected}
                    filterOption={(
                      input: string,
                      option?: { label: string; value: string }
                    ) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "nigeria",
                        label: "Nigeria",
                      },
                      {
                        value: "germany",
                        label: "Germany",
                      },
                    ]}
                  />
                </Form.Item>
                {selectCountry && (
                  <div>
                    <Form.Item
                      name="networkProvider"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Select network provider",
                        },
                      ]}
                    >
                      <Select
                        className="border-2  rounded-full hover:border-purple-400"
                        bordered={false}
                        size="large"
                        allowClear
                        showSearch
                        placeholder="Select a network provider"
                        optionFilterProp="children"
                        //   onChange={onChange}
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "mtn",
                            label: "MTN",
                          },
                          {
                            value: "glo",
                            label: "Glo",
                          },
                          {
                            value: "airtel",
                            label: "Airtel",
                          },
                          {
                            value: "9mobile",
                            label: "9Mobile",
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      name="dataPlan"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Select data plan",
                        },
                      ]}
                    >
                      <Select
                        className="border-2  rounded-full hover:border-purple-400"
                        bordered={false}
                        size="large"
                        allowClear
                        showSearch
                        placeholder="Select a data plan"
                        optionFilterProp="children"
                        //   onChange={onChange}
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "",
                            label: "200MB (50) - 1 Day",
                          },
                          {
                            value: "glo",
                            label: "1GB (350) - 1 Day",
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      name="phoneNumber"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter beneficiary Number",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Beneficiary Number"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                    <Form.Item
                      name="transactionPin"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter transaction pin",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Transaction Pin"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                  </div>
                )}
                <Form.Item name="beneficiary">
                  <Checkbox>Save beneficiary</Checkbox>
                </Form.Item>
                <Button
                  type="primary"
                  size="large"
                  className="w-full rounded-full bg-purple-400 hover:bg-purple-300"
                >
                  Continue
                </Button>
              </Form>
            </div>
          </div>
        ) : buyElectricity ? (
          <div>
            <div>
              <Typography.Paragraph
                onClick={() => setBuyElectricity(false)}
                className="flex gap-1 text-base font-bold hover:text-purple-500 cursor-pointer"
              >
                <LeftOutlined />
                Buy Electricity
              </Typography.Paragraph>
            </div>
            <div className="w-[300px] lg:ml-8 md:ml-8">
              <Form layout="vertical" form={form}>
                <Form.Item
                  name="country"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Select country",
                    },
                  ]}
                >
                  <Select
                    className="border-2  rounded-full hover:border-purple-400"
                    bordered={false}
                    size="large"
                    allowClear
                    showSearch
                    placeholder="Select a country"
                    optionFilterProp="children"
                    onChange={onCountrySelected}
                    filterOption={(
                      input: string,
                      option?: { label: string; value: string }
                    ) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "nigeria",
                        label: "Nigeria",
                      },
                      {
                        value: "germany",
                        label: "Germany",
                      },
                    ]}
                  />
                </Form.Item>

                {selectCountry && (
                  <div>
                    <Form.Item
                      name="electricityCompany"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Select Electricity Distribution",
                        },
                      ]}
                    >
                      <Select
                        className="border-2  rounded-full hover:border-purple-400"
                        bordered={false}
                        size="large"
                        allowClear
                        showSearch
                        placeholder="Select a electricity distribution company"
                        optionFilterProp="children"
                        //   onChange={onChange}
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "kaduna",
                            label: "Kaduna Electricity",
                          },
                          {
                            value: "abuja",
                            label: "Abuja Distribution",
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      name="meterNumber"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter meter number",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Meter number"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                    <Form.Item
                      name="amount"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter amount",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Amount"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                    <Form.Item
                      name="transactionPin"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter transaction pin",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Transaction Pin"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                  </div>
                )}
                <Form.Item name="beneficiary">
                  <Checkbox>Save beneficiary</Checkbox>
                </Form.Item>
                <Button
                  type="primary"
                  size="large"
                  className="w-full rounded-full bg-purple-400 hover:bg-purple-300"
                >
                  Continue
                </Button>
              </Form>
            </div>
          </div>
        ) : examPin ? (
          <div>
            <div>
              <Typography.Paragraph
                onClick={() => setExamPin(false)}
                className="flex gap-1 text-base font-bold hover:text-purple-500 cursor-pointer"
              >
                <LeftOutlined />
                Exam Pin
              </Typography.Paragraph>
            </div>
            <div className="w-[300px] lg:ml-8 md:ml-8">
              <Form layout="vertical" form={form}>
                <Form.Item
                  name="country"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Select country",
                    },
                  ]}
                >
                  <Select
                    className="border-2  rounded-full hover:border-purple-400"
                    bordered={false}
                    size="large"
                    allowClear
                    showSearch
                    placeholder="Select a country"
                    optionFilterProp="children"
                    onChange={onCountrySelected}
                    filterOption={(
                      input: string,
                      option?: { label: string; value: string }
                    ) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "nigeria",
                        label: "Nigeria",
                      },
                      {
                        value: "germany",
                        label: "Germany",
                      },
                    ]}
                  />
                </Form.Item>

                {selectCountry && (
                  <div>
                    <Form.Item
                      name="examType"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Select exam type",
                        },
                      ]}
                    >
                      <Select
                        className="border-2  rounded-full hover:border-purple-400"
                        bordered={false}
                        size="large"
                        allowClear
                        showSearch
                        placeholder="Choose Exam Type"
                        optionFilterProp="children"
                        //   onChange={onChange}
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "waec",
                            label: "WAEC",
                          },
                          {
                            value: "neco",
                            label: "WAEC",
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      name="phoneNumber"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter beneficiary Number",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Beneficiary Number"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>

                    <Form.Item
                      name="transactionPin"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter transaction pin",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Transaction Pin"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                  </div>
                )}

                <Button
                  type="primary"
                  size="large"
                  className="w-full rounded-full bg-purple-400 hover:bg-purple-300"
                >
                  Continue
                </Button>
              </Form>
            </div>
          </div>
        ) : cable ? (
          <div>
            <div>
              <Typography.Paragraph
                onClick={() => setCable(false)}
                className="flex gap-1 text-base font-bold hover:text-purple-500 cursor-pointer"
              >
                <LeftOutlined />
                Buy TV Subscriptions
              </Typography.Paragraph>
            </div>
            <div className="w-[300px] lg:ml-8 md:ml-8">
              <Form layout="vertical" form={form}>
                <Form.Item
                  name="country"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Select country",
                    },
                  ]}
                >
                  <Select
                    className="border-2  rounded-full hover:border-purple-400"
                    bordered={false}
                    size="large"
                    allowClear
                    showSearch
                    placeholder="Select a country"
                    optionFilterProp="children"
                    onChange={onCountrySelected}
                    filterOption={(
                      input: string,
                      option?: { label: string; value: string }
                    ) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "nigeria",
                        label: "Nigeria",
                      },
                      {
                        value: "germany",
                        label: "Germany",
                      },
                    ]}
                  />
                </Form.Item>
                {selectCountry && (
                  <div>
                    <Form.Item
                      name="tvProvider"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Select provider",
                        },
                      ]}
                    >
                      <Select
                        className="border-2  rounded-full hover:border-purple-400"
                        bordered={false}
                        size="large"
                        allowClear
                        showSearch
                        placeholder="Choose Provider"
                        optionFilterProp="children"
                        //   onChange={onChange}
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "dstv",
                            label: "DSTV Subscription",
                          },
                          {
                            value: "startime",
                            label: "Star Time",
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      name="subscriptionPlan"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Select subscription plan",
                        },
                      ]}
                    >
                      <Select
                        className="border-2  rounded-full hover:border-purple-400"
                        bordered={false}
                        size="large"
                        allowClear
                        showSearch
                        placeholder="Choose Plan"
                        optionFilterProp="children"
                        //   onChange={onChange}
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "basic",
                            label: "Basic - 2,000 ",
                          },
                          {
                            value: "premium",
                            label: "DSTV Premium -Asia 33,000",
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      name="cardNumber"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter card Number",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Card Number"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                    <Form.Item
                      name="phoneNumber"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter beneficiary Number",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Beneficiary Number"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>

                    <Form.Item
                      name="transactionPin"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter transaction pin",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Transaction Pin"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                  </div>
                )}

                <Button
                  type="primary"
                  size="large"
                  className="w-full rounded-full bg-purple-400 hover:bg-purple-300"
                >
                  Continue
                </Button>
              </Form>
            </div>
          </div>
        ) : fundWallet && !virtualAccount ? (
          <div>
            <div>
              <Typography.Paragraph
                onClick={() => setFundWallet(false)}
                className="flex gap-1 text-base font-bold hover:text-purple-500 cursor-pointer"
              >
                <LeftOutlined />
                Create a Wallet
              </Typography.Paragraph>
            </div>
            <Form layout="vertical" className="max-w-[400px]">
              <label className="font-bold">
                Enter your BVN to create a wallet{" "}
              </label>
              <Form.Item name="otp">
                <Input
                  size="large"
                  type="number"
                  placeholder="BVN"
                  value={bvn}
                  onChange={(e) => setBvn(e.target.value)}
                  maxLength={11}
                  required
                />
              </Form.Item>

              <div>
                <Button
                  type="primary"
                  onClick={createWallet}
                  className="w-full h-[50px]"
                  loading={authorizeLoading}
                >
                  Authorize
                </Button>
              </div>
            </Form>
          </div>
        ) : fundWallet && fundingMethod ? (
          <div>
            <div>
              <Typography.Paragraph
                onClick={() => setFundingMethod(false)}
                className="flex gap-1 text-base font-bold hover:text-purple-500 cursor-pointer"
              >
                <LeftOutlined />
                Funding Wallet
              </Typography.Paragraph>
            </div>
            <div className="lg:ml-8">
              <Radio.Group
                className="flex flex-col gap-4"
                onChange={handlePaymentMethod}
              >
                {walletFundingMethods.map((method) => {
                  return (
                    <Radio
                      key={method.name}
                      className="p-4 bg-white rounded-lg w-[300px]"
                      value={method.name}
                    >
                      <Typography.Paragraph className="m-0 text-base font-semibold">
                        {method.name}
                      </Typography.Paragraph>
                    </Radio>
                  );
                })}
              </Radio.Group>
              <div className="mt-4 ">
                <Button
                  type="primary"
                  size="large"
                  className="w-[300px]
                     rounded-sm"
                  onClick={paymentMethodProceed}
                >
                  Proceed
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <Typography.Paragraph
                onClick={() => setFundWallet(false)}
                className="flex gap-1 text-base font-bold hover:text-purple-500 cursor-pointer"
              >
                <LeftOutlined />
                Unifaires Reload
              </Typography.Paragraph>
            </div>
            <div className="flex lg:flex-row md:flex-row flex-col gap-4 justify-between flex-wrap">
              <div className="relative items-center justify-center">
                <Image
                  src={unifairesReload}
                  alt="reloadIcon"
                  width={150}
                  height={150}
                  className="lg:w-full md:w-full"
                />
              </div>
              <div className="flex justify-center lg:w-3/5 md:w-3/5 w-full">
                <div>
                  <Typography.Paragraph className="font-bold text-base">
                    Add funds directly to your Unifaires Wallet balance
                  </Typography.Paragraph>
                  <ul className="list-disc">
                    <li>
                      Add funds to your Unifaires Wallet balance, then use your
                      balance to manage how much you spend while shopping.
                    </li>
                    <li>
                      Save up for a purchase by adding funds to your Wallet
                      balance.
                    </li>
                    <li>
                      Checkout faster when you reload to your Wallet balance in
                      advance
                    </li>
                    <li>Reloaded funds never expire and have no fees.</li>
                    <li>
                      Unifaires Reload purchases are not refundable or
                      redeemable for cash, except as required by law.
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div>
                  <Typography.Paragraph className="font-bold text-base">
                    Amount
                  </Typography.Paragraph>
                  {/* <div className="flex gap-4">
                    <Typography.Paragraph className="p-2 border-2 rounded-md cursor-pointer hover:border-purple-500 ">
                      $25
                    </Typography.Paragraph>
                    <Typography.Paragraph className="p-2 border-2 rounded-md cursor-pointer hover:border-purple-500 ">
                      $50
                    </Typography.Paragraph>
                    <Typography.Paragraph className="p-2 border-2 rounded-md cursor-pointer hover:border-purple-500 ">
                      $100
                    </Typography.Paragraph>
                  </div> */}
                  <Form form={fundAmount}>
                    <Form.Item
                      name="amountToFound"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter Amount to fund wallet",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter amount"
                        className="rounded-sm"
                      />
                    </Form.Item>
                    <div className="flex justify-center">
                      <AddCard
                        isModalCard={isModalCard}
                        setIsModalCard={setIsModalCard}
                        fetchUserCards={fetchUserCard}
                      />

                      <Button onClick={MakeFunding} className="rounded-sm">
                        Fund Wallet
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserWallet;
