"use client";
import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  List,
  Pagination,
  Spin,
  Tabs,
  Typography,
} from "antd";
import type { TabsProps } from "antd";
import axios from "axios";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { UserInt } from "@/app/utils/interface";
import {
  ArrowLeftOutlined,
  LoadingOutlined,
  MoneyCollectFilled,
} from "@ant-design/icons";
import { MdMoneyOff } from "react-icons/md";
import axiosInstance from "@/app/utils/axios-config";
import { buildQuery } from "@/app/utils/buildQuery";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getCookie } from "cookies-next";
import { format } from "date-fns";
import TransactionFilterForm from "./TransactionFilterForm";
import TransactionOverview from "./TransactionOverview";

interface DataType extends UserInt {
  completed: string;
  paymentType: string;
  date: string;
  price: number;
  plan: IPlan;
  user: UserInt;
}

interface IPlan {
  id: string;
  createdAt: string;
  price: string;
  title: string;
}

interface IProp {
  transactionList: Array<DataType>;
}

const MyTransactionsList: React.FC = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [activeTabKey1, setActiveTabKey1] = useState<string>("Subscription");
  const [transactionList, setTransactionList] = useState<Array<DataType>>([]);
  const [viewTransaction, setViewTransaction] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<any>();
  const [selectedStartDate, setSelectedStartDate] = useState<any>();
  const [selectedEndDate, setSelectedEndDate] = useState<any>();
  const [selectedStatus, setSelectedStatus] = useState<any>();
  const [searchQuery, setSearchQuery] = useState<any>();
  const [accountType, setAccountType] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationData = info && info.data;
  const userCountry = locationData && locationData?.country;
  const locationCurrency = info && info.data.currency;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;

  const fetchUserTransactions = async (page: any) => {
    const queryParams = {
      page,
      limit: pageSize,
      // status: accountType,
      from: selectedStartDate,
      to: selectedEndDate,
      status: selectedStatus,
      paidFor: searchQuery,
    };
    const query = buildQuery(queryParams);

    try {
      setLoading(true);
      const res = await axiosInstance.get(`/transactions/user${query}`);
      if (res.status) {
        const resData = res.data.data;
        setTotalTransactions(resData.count);
        setCurrentPage(resData.currentPage);
        // console.log("this is the list of transactions", res);
        setTransactionList(resData.transactions);
      }
    } catch (error) {
      console.log("unable to fetch transactions", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    const messageDate = new Date(date);
    const currentDate = new Date();

    // Compare the year of the message date and the current date
    const isSameYear = messageDate.getFullYear() === currentDate.getFullYear();

    // Compare the day of the message date and the current date
    const isToday = messageDate.getDate() === currentDate.getDate();
    const isYesterday =
      messageDate.getDate() === currentDate.getDate() - 1 &&
      messageDate.getMonth() === currentDate.getMonth() &&
      messageDate.getFullYear() === currentDate.getFullYear();

    if (isToday) {
      return "Today";
    } else if (isYesterday) {
      return "Yesterday";
    } else {
      const day = format(messageDate, "EEE");
      const month = format(messageDate, "MMM");
      const dayOfMonth = format(messageDate, "d");

      let formattedDate = `${day}, ${month} ${dayOfMonth}`;

      if (!isSameYear) {
        const year = format(messageDate, "yyyy");
        formattedDate += ` ${year}`;
      }

      return formattedDate;
    }
  };

  useEffect(() => {
    fetchUserTransactions(currentPage);
  }, [currentPage, searchQuery, selectedStartDate, selectedStatus]);

  const tabList = [
    {
      key: "Subscription",
      tab: "Subscription",
    },
    {
      key: "Courses",
      tab: "Courses",
    },
  ];

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

  const handleTransactionClick = async (transaction: any) => {
    const paidFor = transaction.paidFor;
    try {
      setLoading(true);
      const url =
        paidFor == "course" || "free-business-course"
          ? "course"
          : paidFor == "subscription"
          ? "subscription"
          : paidFor == "jobs"
          ? "jobs"
          : paidFor == "associate"
          ? "associate"
          : paidFor == "invites"
          ? "invite"
          : "fundings";

      // console.log("here is ", url);
      const res = await axiosInstance.get(`/${url}/${transaction.paidForId}`);
      if (res.status) {
        const resData = res.data.data;
        setTransactionDetails({ ...transaction, paidForDetails: resData });
        // console.log("here is res", res.data.data);
      }
    } catch (error) {
      setTransactionDetails(transaction);
      // console.log("unable to fetch transaction details", error);
    } finally {
      setLoading(false);
      setViewTransaction(true);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const dateString = transactionDetails && transactionDetails.createdAt;
  const createdAt = dateString && new Date(dateString);

  const parsedDetailAmount =
    transactionDetails && parseFloat(transactionDetails.amount);
  const convertedDetailPrice =
    currencyRate && parsedDetailAmount * currencyRate;

  return (
    <div>
      <Spin
        spinning={loading}
        indicator={
          <LoadingOutlined className="flex items-center justify-center text-5xl" />
        }
      >
        <div className="">
          <div>
            {!viewTransaction ? (
              <div>
                <div>
                  <TransactionOverview />
                  <TransactionFilterForm
                    setSearchQuery={setSearchQuery}
                    setSelectedStartDate={setSelectedStartDate}
                    setSelectedEndDate={setSelectedEndDate}
                    setAccountType={setAccountType}
                    setSelectedStatus={setSelectedStatus}
                  />
                </div>
                <Typography.Title level={3} className="font-bold">
                  Recent Activities
                </Typography.Title>
                <div>
                  <div className="flex flex-col gap-4">
                    <List
                      size="large"
                      itemLayout="vertical"
                      dataSource={transactionList ? transactionList : []}
                      // dataSource={coursesList}
                      renderItem={(list: any, index: any) => {
                        // console.log(transactionList);
                        const parsedAmount = parseFloat(list.amount);
                        const convertedPrice =
                          currencyRate && parsedAmount * currencyRate;
                        const transactionDate = formatDate(list.createdAt);

                        const previousMessageDate =
                          index > 0
                            ? formatDate(transactionList[index - 1].createdAt)
                            : null;
                        const shouldDisplayDate =
                          previousMessageDate !== transactionDate;

                        return (
                          <div
                            key={list.id}
                            onClick={() => handleTransactionClick(list)}
                            className="mb-2"
                          >
                            {shouldDisplayDate && (
                              <Typography.Paragraph className="text-md mb-1 ml-4 font-bold text-gray-500">
                                {formatDate(list.createdAt)}
                              </Typography.Paragraph>
                            )}
                            <div className="flex items-center cursor-pointer hover:shadow-lg  bg-white p-4 gap-4 rounded-md">
                              <div className="p-4 rounded-lg bg-gradient-to-r from-purple-300 to-purple-500">
                                <MdMoneyOff size={35} />
                              </div>
                              <Typography.Paragraph className="m-0 font-semibold uppercase w-2/5">
                                {list.paidFor}
                              </Typography.Paragraph>
                              <div className="flex flex-col items-center gap-1 ml-auto">
                                <Typography.Paragraph
                                  className={`${
                                    list.status == "successful" || "1"
                                      ? "text-green-600"
                                      : "text-red-600"
                                  } capitalize flex justify-end font-semibold`}
                                >
                                  {list.status == "successful" || "1"
                                    ? "Successful"
                                    : "pending"}
                                </Typography.Paragraph>
                                <Typography.Paragraph
                                  className={`flex ml-auto text-base m-0 font-bold ${
                                    list.paidFor
                                      ? "text-red-500"
                                      : "text-green-700"
                                  }`}
                                >
                                  {list.paidFor ? "-" : "+"}
                                  {formatCurrency(
                                    convertedPrice || parsedAmount
                                  )}
                                </Typography.Paragraph>
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    />

                    {/* {transactionList &&
                      transactionList.map((list: any, index) => {
                        // console.log(transactionList);
                        const parsedAmount = parseFloat(list.amount);
                        const convertedPrice =
                          currencyRate && parsedAmount * currencyRate;
                        const transactionDate = formatDate(list.createdAt);

                        const previousMessageDate =
                          index > 0
                            ? formatDate(transactionList[index - 1].createdAt)
                            : null;
                        const shouldDisplayDate =
                          previousMessageDate !== transactionDate;

                        return (
                          <div
                            key={list.id}
                            onClick={() => handleTransactionClick(list)}
                          >
                            {shouldDisplayDate && (
                              <Typography.Paragraph className="text-md mb-1 ml-4 font-bold text-gray-500">
                                {formatDate(list.createdAt)}
                              </Typography.Paragraph>
                            )}
                            <div className="flex items-center cursor-pointer hover:shadow-lg  bg-white p-4 gap-4 rounded-md">
                              <div className="p-4 rounded-lg bg-gradient-to-r from-purple-300 to-purple-500">
                                <MdMoneyOff size={35} />
                              </div>
                              <Typography.Paragraph className="m-0 font-semibold uppercase w-2/5">
                                {list.paidFor}
                              </Typography.Paragraph>
                              <div className="flex flex-col items-center gap-1 ml-auto">
                                <Typography.Paragraph
                                  className={`${
                                    list.status == "successful" || "1"
                                      ? "text-green-600"
                                      : "text-red-600"
                                  } capitalize flex justify-end font-semibold`}
                                >
                                  {list.status == "successful" || "1"
                                    ? "Successful"
                                    : "pending"}
                                </Typography.Paragraph>
                                <Typography.Paragraph
                                  className={`flex ml-auto text-base m-0 font-bold ${
                                    list.paidFor
                                      ? "text-red-500"
                                      : "text-green-700"
                                  }`}
                                >
                                  {list.paidFor ? "-" : "+"}
                                  {formatCurrency(
                                    convertedPrice || parsedAmount
                                  )}
                                </Typography.Paragraph>
                              </div>
                            </div>
                          </div>
                        );
                      })} */}
                  </div>

                  <div className="flex items-center justify-center mt-2">
                    <Pagination
                      current={currentPage}
                      pageSize={pageSize}
                      total={totalTransactions}
                      onChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Button
                  type="text"
                  icon={<ArrowLeftOutlined />}
                  className="flex items-center my-6 text-lg font-extrabold "
                  onClick={() => setViewTransaction(false)}
                >
                  View Details
                </Button>
                <div className="flex  justify-center items-center">
                  <div className="border-1 shadow-lg w-[600px]">
                    <div className="flex flex-col gap-6 p-4 rounded-lg bg-gradient-to-r from-blue-400 to-blue-800 w-full">
                      <Typography.Paragraph className="m-0 text-center text-white text-lg font-bold w-full ">
                        {createdAt && createdAt.toLocaleDateString()}
                      </Typography.Paragraph>

                      <div className="flex flex-col w-full items-center justify-center">
                        <div className="flex items-center justify-center p-4 rounded-lg bg-blue-300 w-[80px]">
                          <MdMoneyOff size={35} />
                        </div>
                        <Typography.Title
                          level={3}
                          className="m-0 mt-2 font-bold text-white"
                        >
                          {formatCurrency(
                            convertedDetailPrice || parsedDetailAmount
                          )}
                        </Typography.Title>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 rounded-b-lg bg-white p-4">
                      <div className="flex justify-between gap-2">
                        <Typography.Paragraph className="font-bold">
                          Item
                        </Typography.Paragraph>
                        <Typography.Paragraph className="uppercase w-3/5 text-right font-semibold">
                          {transactionDetails.paidForDetails
                            ? transactionDetails.paidForDetails.title ||
                              `${transactionDetails.paidForDetails?.user?.firstname} ${transactionDetails.paidForDetails?.user?.lastname}`
                            : transactionDetails.paidFor}
                        </Typography.Paragraph>
                      </div>
                      <hr />
                      {/* <div className="flex justify-between gap-2">
                      <Typography.Paragraph className="font-bold">
                        To
                      </Typography.Paragraph>
                      <Typography.Paragraph className="uppercase w-3/5 text-right font-semibold">
                        MaxiMin Agha Emmanuel
                      </Typography.Paragraph>
                    </div>
                    <hr /> */}
                      <div className="flex justify-between gap-2">
                        <Typography.Paragraph className="font-bold">
                          Narration
                        </Typography.Paragraph>
                        <Typography.Paragraph className="uppercase w-3/5 text-right font-semibold">
                          {transactionDetails.paidFor}
                        </Typography.Paragraph>
                      </div>
                      <hr />
                      <div className="flex justify-between gap-2">
                        <Typography.Paragraph className="font-bold">
                          Reference
                        </Typography.Paragraph>
                        <Typography.Paragraph className="uppercase w-3/5 text-right font-semibold">
                          {transactionDetails.paymentId}
                        </Typography.Paragraph>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <Card
          style={{ width: "100%" }}
          title="All Transactions"
          headStyle={{
            fontSize: 20,
          }}
          tabList={tabList}
          activeTabKey={activeTabKey1}
          onTabChange={onTab1Change}
        >
          {contentList[activeTabKey1]}
        </Card> */}
        </div>
      </Spin>
    </div>
  );
};

export default MyTransactionsList;
