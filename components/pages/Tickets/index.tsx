"use client";

import { Fragment, useEffect, useState } from "react";
import { Form, Grid, Spin, Tabs, TabsProps, Typography } from "antd";
import {
  HistoryOutlined,
  HomeOutlined,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useSession } from "next-auth/react";

import TicketList from "./TicketList";

import { handleAxiosError } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import CreateTicket from "./CreateTicket";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

const { useBreakpoint } = Grid;

const TicketsPage = () => {
  const [form] = Form.useForm();
  const { data: session, status } = useSession();
  const myProfile: any = useAppSelector(
    (state: RootState) => state.user.myProfile
  );
  const email = myProfile && myProfile?.email;
  const [loading, setLoading] = useState(false);
  const [pendingTickets, setPendingTickets] = useState<any>();
  const [closedTickets, setClosedTickets] = useState<any>();
  const [selectedSeverity, setSelectedSeverity] = useState<any>();
  const [selectedDay, setSelectedDay] = useState<any>();
  const screens = useBreakpoint();

  const fetchPendingTickets = async () => {
    const query = buildQuery({
      severity: selectedSeverity,
      days: selectedDay,
      // page,
      // limit: pageSize,
    });
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/help/my-helps/${email}?${query}`);
      if (res.status) {
        const resData = res.data.data;
        setPendingTickets(resData);
      }
    } catch (error) {
      // handleAxiosError(error);
      console.log("Unable to get my helps", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClosedTickets = async () => {
    // const requestBody = val;
    const query = buildQuery({
      severity: selectedSeverity,
      days: selectedDay,
      // page,
      // limit: pageSize,
    });
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/help/my-helps/${email}?status=resolved&&${query}`
      );
      if (res.status) {
        const resData = res.data.data;
        setClosedTickets(resData);
      }
    } catch (error) {
      // handleAxiosError(error);
      console.log("Unable to get my helps", error);
    } finally {
      setLoading(false);
    }
  };

  const buildQuery = (params: { [key: string]: any }) => {
    const query = Object.entries(params)
      .filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    return query ? `${query}` : "";
  };

  useEffect(() => {
    if (session && email) {
      fetchPendingTickets();
      fetchClosedTickets();
    }
  }, [session, selectedSeverity, selectedDay]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Create Ticket",
      children: <CreateTicket fetchPendingTickets={fetchPendingTickets} />,
      icon: <PlusOutlined />,
    },
    ...(session
      ? [
          {
            key: "2",
            label: "Tickets History",
            children: (
              <Spin
                spinning={loading}
                indicator={
                  <LoadingOutlined className="flex items-center justify-center text-5xl " />
                }
              >
                <TicketList
                  setSelectedDay={setSelectedDay}
                  setSelectedSeverity={setSelectedSeverity}
                  pendingTickets={pendingTickets}
                  closedTickets={closedTickets}
                />
              </Spin>
            ),
            icon: <HistoryOutlined />,
          },
        ]
      : []),
  ];

  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => (
    <div>
      <DefaultTabBar {...props} className="m-0" />
    </div>
  );

  return (
    <Fragment>
      <div className="m-8">
        <Typography.Title level={2} className="flex gap-2 font-bold">
          <HomeOutlined />
          Unifaires Support
        </Typography.Title>

        <Tabs
          renderTabBar={renderTabBar}
          defaultActiveKey="1"
          tabPosition={screens.md ? "left" : "top"}
          items={items}
        />
      </div>
    </Fragment>
  );
};

export default TicketsPage;
