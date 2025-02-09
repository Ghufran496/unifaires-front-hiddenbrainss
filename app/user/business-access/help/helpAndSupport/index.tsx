"use client";
import { Fragment, useEffect, useState } from "react";
import Container from "@/components/shared/container";
import {
  Breadcrumb,
  Button,
  Card,
  Dropdown,
  List,
  MenuProps,
  Spin,
  Typography,
} from "antd";
import {
  UserAddOutlined,
  EllipsisOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { HelpInt } from "./help.interface";
import IconText from "@/components/shared/IconText";
import HelpDetails from "./helpDetails";
import AssignAdmin from "./assignAdmin";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import FilterForm from "./FilterForm";
import axiosAccessInstance from "@/app/utils/businessAccess-axios-config";

const HelpAndSupport = () => {
  const { data: session } = useSession();
  const [activeTabKey, setActiveTabKey] = useState<string>("pendingSupport");
  const [pendingHelp, setPendingHelp] = useState<Array<HelpInt>>();
  const [assignedHelp, setAssignedHelp] = useState<Array<HelpInt>>();
  const [resolvedHelp, setResolvedHelp] = useState<Array<HelpInt>>();
  const [selectedHelpId, setSelectedHelpId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [adminModal, setAdminModal] = useState<boolean>(false);
  const [selectedSeverity, setSelectedSeverity] = useState<any>();
  const [selectedDay, setSelectedDay] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleHelpClick = (helpId: number) => {
    setSelectedHelpId(helpId);
    setIsModalOpen(true);
  };

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const handleAssign = () => {
    setAdminModal(true);
  };

  const handleDeleteHelp = async () => {
    try {
      const res = await axiosAccessInstance.delete(`/help/${selectedHelpId}`);
      if (res.status) {
        showSuccess("Deleted Successfully");
        fetchPendingHelp();
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <IconText
          text="Assign"
          title="Assign help"
          icon={<UserAddOutlined />}
        />
      ),
      key: "assign",
      onClick: handleAssign,
    },
    // {
    //   label: (
    //     <IconText
    //       text="Delete"
    //       title="Delete help"
    //       icon={<DeleteOutlined />}
    //       className="text-accent-500"
    //     />
    //   ),
    //   key: "delete",
    //   onClick: handleDeleteHelp,
    // },
  ];

  const fetchPendingHelp = async () => {
    const query = buildQuery({
      severity: selectedSeverity,
      days: selectedDay,
      // page,
      // limit: pageSize,
    });
    try {
      setLoading(true);
      const res = await axiosAccessInstance.get(`/help/status?${query}`);

      if (res.status) {
        setPendingHelp(res.data.data);
      }
    } catch (error) {
      // handleAxiosError(error);
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignedHelp = async () => {
    const query = buildQuery({
      severity: selectedSeverity,
      days: selectedDay,
      // page,
      // limit: pageSize,
    });
    try {
      const res = await axiosAccessInstance.get(
        `/help/status?status=assigned${query}`
      );

      if (res.status) {
        setAssignedHelp(res.data.data);
        // console.log("this is the assigned", res.data.data);
      }
    } catch (error) {
      console.log("assigned error", error);
    }
  };

  const fetchResolvedHelp = async () => {
    const query = buildQuery({
      severity: selectedSeverity,
      days: selectedDay,
      // page,
      // limit: pageSize,
    });
    try {
      const res = await axiosAccessInstance.get(
        `/help/status?status=resolved&${query}`
      );

      if (res.status) {
        setResolvedHelp(res.data.data);
      }
    } catch (error) {
      console.log("resolved error", error);
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
    fetchPendingHelp();
    fetchAssignedHelp();
    fetchResolvedHelp();
  }, [selectedDay, selectedSeverity]);

  const tabList = [
    {
      key: "pendingSupport",
      tab: <span>Pending Support ({pendingHelp?.length})</span>,
    },
    {
      key: "assignedSupport",
      tab: <span>Assigned Support ({assignedHelp?.length})</span>,
    },
    {
      key: "resolved",
      tab: <span>Resolved ({resolvedHelp?.length})</span>,
    },
  ];

  function calculateDaysAgo(dateString: any) {
    const givenDate: any = new Date(dateString);
    const currentDate: any = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - givenDate;
    // Calculate the difference in days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    // Return the formatted string
    return `${daysDifference} days ago`;
  }

  const contentList: Record<string, JSX.Element> = {
    pendingSupport: (
      <List
        size="large"
        itemLayout="vertical"
        className="[&>div.ant-list-pagination]:px-6 [&>div.ant-list-pagination]:pb-4"
        pagination={{
          pageSize: 5,
        }}
        dataSource={pendingHelp ? pendingHelp : []}
        renderItem={(help) => (
          <div key={help.id} className="pb-2">
            <List.Item className="flex gap-4 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
              <div className="flex-grow">
                <div className="flex items-start justify-between">
                  <div
                    onClick={() => handleHelpClick(help.id)}
                    className="w-full"
                  >
                    <Typography.Paragraph className="text-lg font-bold mb-0">
                      {help?.subject}
                    </Typography.Paragraph>
                    <div className="flex lg:flex-row md:flex-row flex-col lg:gap-4 md:gap-2 gap-0">
                      <Typography.Paragraph className="italics m-0 italic font-semibold">
                        <DoubleRightOutlined className="pr-2" />
                        <span className="text-purple-400 font-bold">
                          Status:
                        </span>{" "}
                        Pending
                      </Typography.Paragraph>
                      <Typography.Paragraph className="italics m-0 italic font-semibold">
                        <span className="text-purple-400 font-bold ">
                          Severity:
                        </span>{" "}
                        {help.severity}
                      </Typography.Paragraph>
                      <Typography.Paragraph className="italics m-0 italic font-semibold">
                        <span className="text-purple-400 font-bold ">
                          Category:
                        </span>{" "}
                        {help.category}
                      </Typography.Paragraph>
                      <Typography.Paragraph className="italics m-0 italic font-semibold">
                        <span className="text-purple-400 font-bold ">
                          TicketId:
                        </span>{" "}
                        {help.ticketId}
                      </Typography.Paragraph>
                      <Typography.Paragraph className="italics m-0 italic font-semibold">
                        <span className="text-purple-400 font-bold ">
                          Date Created:
                        </span>{" "}
                        {calculateDaysAgo(help.createdAt)}
                      </Typography.Paragraph>
                    </div>
                  </div>
                  <Dropdown
                    menu={{ items }}
                    trigger={["click"]}
                    placement="bottomRight"
                    overlayClassName="p-2 rounded-lg"
                  >
                    <Button
                      type="text"
                      shape="circle"
                      icon={<EllipsisOutlined rotate={90} />}
                      onClick={() => setSelectedHelpId(help.id)}
                    />
                  </Dropdown>
                </div>
              </div>
            </List.Item>
            {selectedHelpId === help.id && (
              <HelpDetails
                helpDetail={help}
                fetchAssignedHelp={fetchAssignedHelp}
                fetchResolvedHelp={fetchResolvedHelp}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            )}
            {selectedHelpId === help.id && adminModal && (
              <AssignAdmin
                fetchPendingHelp={fetchPendingHelp}
                fetchAssignedHelp={fetchAssignedHelp}
                helpId={help.id}
                adminModal={adminModal}
                setAdminModal={setAdminModal}
              />
            )}
          </div>
        )}
      />
    ),
    assignedSupport: (
      <List
        size="large"
        itemLayout="vertical"
        className="[&>div.ant-list-pagination]:px-6 [&>div.ant-list-pagination]:pb-4"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={assignedHelp ? assignedHelp : []}
        renderItem={(help) => (
          <div key={help.id} className="pb-2">
            <List.Item className="flex gap-4 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
              <div className="flex-grow">
                <div className="flex items-start justify-between">
                  <div
                    onClick={() => handleHelpClick(help.id)}
                    className="w-full"
                  >
                    <Typography.Paragraph className="text-lg font-bold mb-0">
                      {help?.subject}
                    </Typography.Paragraph>
                    <div className="flex lg:flex-row md:flex-row flex-col lg:gap-4 md:gap-2 gap-0">
                      <Typography.Paragraph className="italics m-0 italic font-semibold">
                        <DoubleRightOutlined className="pr-2" />
                        <span className="text-purple-400 font-bold">
                          Status:
                        </span>{" "}
                        Assigned
                      </Typography.Paragraph>
                      <Typography.Paragraph className="italics m-0 italic font-semibold">
                        <span className="text-purple-400 font-bold ">
                          Severity:
                        </span>{" "}
                        {help.severity}
                      </Typography.Paragraph>
                      <Typography.Paragraph className="italics m-0 italic font-semibold">
                        <span className="text-purple-400 font-bold ">
                          Category:
                        </span>{" "}
                        {help.category}
                      </Typography.Paragraph>
                      <Typography.Paragraph className="italics m-0 italic font-semibold">
                        <span className="text-purple-400 font-bold ">
                          TicketId:
                        </span>{" "}
                        {help.ticketId}
                      </Typography.Paragraph>
                      <Typography.Paragraph className="italics m-0 italic font-semibold">
                        <span className="text-purple-400 font-bold ">
                          Date Created:
                        </span>{" "}
                        {calculateDaysAgo(help.createdAt)}
                      </Typography.Paragraph>
                    </div>
                  </div>
                  {/* <Dropdown
                    menu={{ items }}
                    trigger={["click"]}
                    placement="bottomRight"
                    overlayClassName="p-2 rounded-lg"
                  >
                    <Button
                      type="text"
                      shape="circle"
                      icon={<EllipsisOutlined rotate={90} />}
                      onClick={() => setSelectedHelpId(help.id)}
                    />
                  </Dropdown> */}
                </div>
              </div>
            </List.Item>
            {selectedHelpId === help.id && (
              <HelpDetails
                helpDetail={help}
                fetchAssignedHelp={fetchAssignedHelp}
                fetchResolvedHelp={fetchResolvedHelp}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            )}
            {/* {selectedHelpId === help.id && adminModal && (
              <AssignAdmin
                fetchPendingHelp={fetchPendingHelp}
                helpId={help.id}
                adminModal={adminModal}
                setAdminModal={setAdminModal}
              />
            )} */}
          </div>
        )}
      />
    ),
    resolved: (
      <List
        size="large"
        itemLayout="vertical"
        className="[&>div.ant-list-pagination]:px-6 [&>div.ant-list-pagination]:pb-4"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={resolvedHelp ? resolvedHelp : []}
        renderItem={(help) => (
          <div key={help.id} className="pb-2">
            <List.Item className="flex gap-4 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
              <div className="flex-grow">
                <div className="flex items-start justify-between">
                  <div
                    onClick={() => handleHelpClick(help.id)}
                    className="w-full"
                  >
                    <Typography.Paragraph className="text-lg font-bold mb-0">
                      {help?.subject}
                    </Typography.Paragraph>
                    <div className="flex lg:flex-row md:flex-row flex-col lg:gap-4 md:gap-2 gap-0">
                      <Typography.Paragraph className="italics m-0 italic font-semibold">
                        <DoubleRightOutlined className="pr-2" />
                        <span className="text-purple-400 font-bold">
                          Status:
                        </span>{" "}
                        Resolved
                      </Typography.Paragraph>
                      <Typography.Paragraph className="italics m-0 italic font-semibold">
                        <span className="text-purple-400 font-bold ">
                          Severity:
                        </span>{" "}
                        {help.severity}
                      </Typography.Paragraph>
                      <Typography.Paragraph className="italics m-0 italic font-semibold">
                        <span className="text-purple-400 font-bold ">
                          Category:
                        </span>{" "}
                        {help.category}
                      </Typography.Paragraph>
                      <Typography.Paragraph className="italics m-0 italic font-semibold">
                        <span className="text-purple-400 font-bold ">
                          TicketId:
                        </span>{" "}
                        {help.ticketId}
                      </Typography.Paragraph>
                      <Typography.Paragraph className="italics m-0 italic font-semibold">
                        <span className="text-purple-400 font-bold ">
                          Date Created:
                        </span>{" "}
                        {calculateDaysAgo(help.createdAt)}
                      </Typography.Paragraph>
                    </div>
                  </div>
                  {/* <Dropdown
                    menu={{ items }}
                    trigger={["click"]}
                    placement="bottomRight"
                    overlayClassName="p-2 rounded-lg"
                  >
                    <Button
                      type="text"
                      shape="circle"
                      icon={<EllipsisOutlined rotate={90} />}
                      onClick={() => setSelectedHelpId(help.id)}
                    />
                  </Dropdown> */}
                </div>
              </div>
            </List.Item>
            {selectedHelpId === help.id && (
              <HelpDetails
                helpDetail={help}
                fetchAssignedHelp={fetchAssignedHelp}
                fetchResolvedHelp={fetchResolvedHelp}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            )}
            {/* {selectedHelpId === help.id && adminModal && (
              <AssignAdmin
                fetchPendingHelp={fetchPendingHelp}
                helpId={help.id}
                adminModal={adminModal}
                setAdminModal={setAdminModal}
              />
            )} */}
          </div>
        )}
      />
    ),
  };
  return (
    <Fragment>
      <section className="content-header">
        <Container className="container-fluid p-6">
          <Typography.Title className="font-bold">
            Help & Support Center
          </Typography.Title>
          <Breadcrumb
            separator=">"
            className="cursor-pointer"
            items={[{ title: "Unifaries Support" }]}
          />
        </Container>
      </section>
      <div className="p-6">
        <FilterForm
          setSelectedDay={setSelectedDay}
          setSelectedSeverity={setSelectedSeverity}
        />
        <Spin spinning={loading} size="large">
          <Card
            style={{
              width: "100%",
            }}
            tabList={tabList}
            activeTabKey={activeTabKey}
            onTabChange={onTabChange}
          >
            {contentList[activeTabKey]}
          </Card>
        </Spin>
      </div>
    </Fragment>
  );
};

export default HelpAndSupport;
