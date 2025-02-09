"use client";
import React, { createContext, useEffect, useState } from "react";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import axios from "axios";
import { FundingInt } from "../funding.interface";
import CreateFundingForm from "./Steps";
import axiosInstance from "@/app/utils/axios-config";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export interface FundingContextType {
  fundingData: FundingInt | any;
  fetchFundingData: Function;
}

export const FundingContext = createContext({} as FundingContextType);

export const FundingProvider = ({ fundingId }: any) => {
  const { data: session, status } = useSession();
  const [fundingData, setFundingData] = useState<FundingInt | null>();
  const [loading, setLoading] = useState(false);

  const fetchFundingData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/funding/${fundingId}`);

      if (res.status) {
        const data = res;
        setFundingData(data.data);
        // console.log(data.data);
      }
    } catch (error) {
      console.log("e", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFundingData();
  }, [fundingId]);

  return (
    <FundingContext.Provider value={{ fundingData, fetchFundingData }}>
      {/* {children} */}
      <Spin
        spinning={loading}
        indicator={
          <LoadingOutlined className="flex items-center justify-center text-5xl" />
        }
      >
        <CreateFundingForm />
      </Spin>
    </FundingContext.Provider>
  );
};
