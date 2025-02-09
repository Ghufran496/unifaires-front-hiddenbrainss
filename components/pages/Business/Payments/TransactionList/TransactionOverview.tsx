"use client";
import React, { useEffect, useState } from "react";
// next components
import {
  Row,
  Col,
  Card,
  Space,
  Avatar,
  Progress,
  Typography,
  Skeleton,
} from "antd";
import {
  RiseOutlined,
  FallOutlined,
  GlobalOutlined,
  WalletOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import axiosInstance from "@/app/utils/axios-config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCountries } from "@/redux/features/CountrySlice";
import { RootState } from "@/redux/store";

const TransactionOverview = () => {
  const [overview, setOverview] = useState<any>();
  const [loading, setLoading] = useState(true);
  const dispatch: any = useAppDispatch();

  const fetchBusinessStats = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/business/stats");
      if (res.status) {
        // console.log("here is stat res", res);
        setOverview(res.data.data);
      }
    } catch (error) {
      console.log("Unable to fetch business stats", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessStats();
  }, []);

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  const Countries = useAppSelector(
    (state: RootState) => state.country.countries
  );

  const getCountry = (countryCode: string) => {
    if (!Countries || !Array.isArray(Countries)) {
      // Handle the case when currentPricingIndex is not defined or not an array
      return "N/A";
    }
    const country = Countries.find((c) => c.code === countryCode);
    return country ? country.name : 0;
  };

  const overallFlow =
    overview && overview?.credits + overview?.debits + overview?.pending;

  return (
    <div className="mb-6">
      <Skeleton active loading={loading} className="p-4">
        <Card hoverable className="rounded-lg h-full bg-grey-100">
          <div>
            <Typography.Paragraph className="font-bold text-base m-0">
              Balances
            </Typography.Paragraph>
            <Typography.Title level={1} className="m-0 font-bold">
              {formatCurrency(overallFlow || 0)}
            </Typography.Title>
            <Typography.Paragraph className="font-semibold text-lg">
              Overall CashFlow
            </Typography.Paragraph>
          </div>
          <div className=" flex flex-col gap-2 h-full">
            <div className="flex items-center flex-wrap-reverse lg:gap-2 w-full">
              <Progress
                percent={(overview?.credits / overallFlow) * 100 || 0}
                className="lg:w-3/5 relative"
                strokeLinecap="square"
                size={["", 30]}
                // percentPosition={{ align: "start", type: "inner" }}
                strokeColor="green"
              />
              <div>
                <Typography.Title level={4} className="m-0 font-bold">
                  {formatCurrency(overview?.credits || 0)}
                </Typography.Title>
                <Typography.Paragraph className="m-0">
                  Credit Amount
                </Typography.Paragraph>
              </div>
            </div>
            <div className="flex items-center flex-wrap-reverse lg:gap-2 w-full">
              <Progress
                percent={(overview?.debits / overallFlow) * 100 || 0}
                className="lg:w-3/5 relative"
                strokeLinecap="square"
                size={["", 30]}
                // percentPosition={{ align: "start", type: "inner" }}
                strokeColor="red"
              />
              <div>
                <Typography.Title level={4} className="m-0 font-bold">
                  {formatCurrency(overview?.debits || 0)}
                </Typography.Title>
                <Typography.Paragraph className="m-0">
                  Debit Amount
                </Typography.Paragraph>
              </div>
            </div>
            <div className="flex items-center flex-wrap-reverse lg:gap-2 w-full">
              <Progress
                percent={(overview?.pending / overallFlow) * 100 || 0}
                className="lg:w-3/5 relative"
                strokeLinecap="square"
                size={["", 30]}
                // percentPosition={{ align: "start", type: "inner" }}
                strokeColor="orange"
              />
              <div>
                <Typography.Title level={4} className="m-0 font-bold">
                  {formatCurrency(overview?.pending || 0)}
                </Typography.Title>
                <Typography.Paragraph className="m-0">
                  Pending Amount
                </Typography.Paragraph>
              </div>
            </div>
          </div>
        </Card>
      </Skeleton>
    </div>
  );
};

export default TransactionOverview;
