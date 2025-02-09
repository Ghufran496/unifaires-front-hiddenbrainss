"use client";
import {
  CheckOutlined,
  CheckSquareFilled,
  CloseOutlined,
  CommentOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  MailOutlined,
  MessageFilled,
  PhoneOutlined,
  SaveOutlined,
  StarFilled,
} from "@ant-design/icons";
import IconText from "@/components/shared/IconText";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";
import { Button, Dropdown, List, MenuProps, Typography } from "antd";
// next
import NextLink from "next/link";
import { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { toast } from "react-toastify";

const CandidatesList = ({
  listType,
  applicantList,
  fetchApplicantList,
  setViewProfile,
  fetchCandidateProfile,
}: any) => {
  const [enrolId, setEnrolId] = useState();
  const [resumeUrl, setResumeUrl] = useState<any>();

  const changeFundingStatus = async (fundingStatus: any) => {
    try {
      const res = await axiosInstance.put(`/enrol-funding/status/${enrolId}`, {
        fundingUserStatus: fundingStatus,
      });
      if (res.status) {
        toast.success("Funding Status Changed");
        fetchApplicantList();
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleDownloadAttachment = () => {
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.setAttribute("download", "resume.pdf"); // You can specify the file name here
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);
  };

  const intervieItems: MenuProps["items"] = [
    {
      label: (
        <IconText
          text="Download Attachments"
          title="Downlaod Attachments"
          icon={<DownloadOutlined />}
          // className="text-accent-500"
        />
      ),
      key: "download",
    },
    {
      label: (
        <IconText
          text="Contact Candidate"
          title="Contact"
          icon={<CommentOutlined />}
          className=""
        />
      ),
      key: "contact",
    },
    {
      label: (
        <IconText
          text="View Candidate Profile"
          title="Candidate Profile"
          icon={<EyeOutlined />}
          className=""
        />
      ),
      key: "viewCandidate",
      onClick: () => setViewProfile(true),
    },
    {
      label: (
        <IconText
          text="Unassign Candidate"
          title="Interview"
          icon={<MessageFilled />}
          className=""
        />
      ),
      key: "unassign",
      onClick: () => changeFundingStatus("pending"),
    },
    {
      label: (
        <IconText
          text="Accept Candidate"
          title="Accept"
          icon={<CheckSquareFilled />}
          className="text-green-900"
        />
      ),
      key: "accept",
      onClick: () => changeFundingStatus("accepted"),
    },
    {
      label: (
        <IconText
          text="Reject Candidate"
          title="Reject"
          icon={<CloseOutlined />}
          className="text-accent-500"
        />
      ),
      key: "reject",
      onClick: () => changeFundingStatus("rejected"),
    },
  ];
  const items: MenuProps["items"] = [
    {
      label: (
        <IconText
          text="Download Attachments"
          title="Downlaod Attachments"
          icon={<DownloadOutlined />}
          // className="text-accent-500"
        />
      ),
      key: "download",
    },
    {
      label: (
        <IconText
          text="Contact Candidate"
          title="Contact"
          icon={<CommentOutlined />}
          className=""
        />
      ),
      key: "contact",
    },
    {
      label: (
        <IconText
          text="View Candidate Profile"
          title="Candidate Profile"
          icon={<EyeOutlined />}
          className=""
        />
      ),
      key: "viewCandidate",
      onClick: () => setViewProfile(true),
    },
    {
      label: (
        <IconText
          text="Interview Candidate"
          title="Interview"
          icon={<MessageFilled />}
          className=""
        />
      ),
      key: "interview",
      onClick: () => changeFundingStatus("interviewing"),
    },
    {
      label: (
        <IconText
          text="Accept Candidate"
          title="Accept"
          icon={<CheckSquareFilled />}
          className="text-green-900"
        />
      ),
      key: "accept",
      onClick: () => changeFundingStatus("accepted"),
    },
    {
      label: (
        <IconText
          text="Reject Candidate"
          title="Reject"
          icon={<CloseOutlined />}
          className="text-accent-500"
        />
      ),
      key: "reject",
      onClick: () => changeFundingStatus("rejected"),
    },
  ];

  // console.log(applicantList);

  return (
    <div>
      {applicantList && applicantList.length > 0 ? (
        <List>
          {applicantList.map((userList: any) => (
            <div
              key={userList.id}
              className="border-b hover:bg-gray-50 hover:cursor-pointer p-3 rounded-md"
            >
              <div className="flex justify-between">
                {/* <NextLink href={"/dashboard/jobs/"} passHref> */}
                <Typography.Title
                  ellipsis={{ rows: 2 }}
                  level={5}
                  onClick={() => {
                    // setResumeUrl()
                    setEnrolId(userList.id);
                    fetchCandidateProfile(userList.user.username);
                    setViewProfile(true);
                  }}
                >
                  {userList.firstname} {userList.lastname}
                </Typography.Title>
                {/* </NextLink> */}
                <Dropdown
                  menu={
                    listType === "pending"
                      ? { items }
                      : { items: intervieItems }
                  }
                  trigger={["click"]}
                  placement="bottomRight"
                  overlayClassName="p-4 rounded-lg"
                >
                  <Button
                    type="text"
                    shape="circle"
                    icon={<EllipsisOutlined rotate={90} />}
                    onClick={() => {
                      setEnrolId(userList.id);
                      fetchCandidateProfile(userList.user.username);
                    }}
                  />
                </Dropdown>
              </div>
              <Typography.Paragraph
                ellipsis
                className="flex items-center gap-1 mb-1"
              >
                <MailOutlined className="text-grey-400" />
                {userList.email}
              </Typography.Paragraph>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 mb-1">
                  <Typography.Text className="flex gap-2 items-center mt-1 text-purple-900 cursor-pointer underline">
                    <PhoneOutlined />
                    {userList.phoneNumber}
                  </Typography.Text>
                </div>
              </div>
            </div>
          ))}
        </List>
      ) : (
        <div className="flex justify-center items-center my-10">
          <Typography.Title level={3}>No Candidates</Typography.Title>
        </div>
      )}
    </div>
  );
};

export default CandidatesList;
