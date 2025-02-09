"use client";
import {
  CheckSquareFilled,
  CloseOutlined,
  CommentOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  EyeOutlined,
  MailOutlined,
  MessageFilled,
  PhoneOutlined,
} from "@ant-design/icons";
import IconText from "@/components/shared/IconText";
import { Button, Dropdown, List, MenuProps, Typography } from "antd";
import { useState, useContext, useCallback } from "react";
import { jobDetailsContext } from "../JobDetailsContext";
import { toast } from "react-hot-toast";

const CandidatesList = ({
  listType,
  applicantList,
}: {
  listType: "pending" | "interviewing" | "accepted" | "rejected";
  applicantList: any;
}) => {
  const jobContext = useContext(jobDetailsContext);
  const [enrolId, setEnrolId] = useState<string>("");
  const [resumeUrl, setResumeUrl] = useState<string>();

  /**
   * Get JSON parse result
   */
  const getJSONParse = (inputVal: any) => {
    try {
      return JSON.parse(inputVal);
    } catch (error) {
      return undefined;
    }
  };

  /**
   * handle resume download
   */
  const handleDownloadAttachment = () => {
    if (!(typeof resumeUrl === "string" && resumeUrl.trim() !== "")) {
      toast.error("No resume is associated with this user.");
      return;
    }
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.target = "_blank";
    link.setAttribute("download", "resume.pdf"); // You can specify the file name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * Get job list item menus
   */
  const getListMenuItems = useCallback((): MenuProps["items"] => {
    const result: MenuProps["items"] = [];
    if (jobContext?.permissions?.job_view) {
      result.push({
        label: (
          <IconText
            text="Download Attachments"
            title="Downlaod Attachments"
            icon={<DownloadOutlined />}
          />
        ),
        key: "download",
        onClick: handleDownloadAttachment,
      });
    }
    if (jobContext?.permissions?.job_view) {
      result.push({
        label: (
          <IconText
            text="Contact Candidate"
            title="Contact"
            icon={<CommentOutlined />}
            className=""
          />
        ),
        key: "contact",
      });
    }
    if (jobContext?.permissions?.job_view) {
      result.push({
        label: (
          <IconText
            text="View Candidate Profile"
            title="Candidate Profile"
            icon={<EyeOutlined />}
            className=""
          />
        ),
        key: "viewCandidate",
        onClick: () => {
          jobContext?.setIsShowProfile?.(true);
        },
      });
    }
    if (jobContext?.permissions?.job_edit && listType !== "pending") {
      result.push({
        label: (
          <IconText
            text="Unassign Candidate"
            title="Unassign Candidate"
            icon={<MessageFilled />}
            className=""
          />
        ),
        key: "unassign",
        onClick: () =>
          jobContext?.changeJobStatus?.({
            enrollId: enrolId,
            jobStatus: "pending",
          }),
      });
    }
    if (jobContext?.permissions?.job_edit && listType !== "interviewing") {
      result.push({
        label: (
          <IconText
            text="Interview Candidate"
            title="Interview"
            icon={<MessageFilled />}
            className=""
          />
        ),
        key: "interview",
        onClick: () => {
          jobContext?.changeJobStatus?.({
            enrollId: enrolId,
            jobStatus: "interviewing",
          });
        },
      });
    }
    if (jobContext?.permissions?.job_edit && listType !== "accepted") {
      result.push({
        label: (
          <IconText
            text="Accept Candidate"
            title="Accept"
            icon={<CheckSquareFilled />}
            className="text-green-900"
          />
        ),
        key: "accept",
        onClick: () => {
          jobContext?.changeJobStatus?.({
            enrollId: enrolId,
            jobStatus: "accepted",
          });
        },
      });
    }
    if (jobContext?.permissions?.job_edit && listType !== "rejected") {
      result.push({
        label: (
          <IconText
            text="Reject Candidate"
            title="Reject"
            icon={<CloseOutlined />}
            className="text-accent-500"
          />
        ),
        key: "reject",
        onClick: () => {
          jobContext?.changeJobStatus?.({
            enrollId: enrolId,
            jobStatus: "rejected",
          });
        },
      });
    }

    return result;
  }, [listType, enrolId]);

  return (
    <div>
      {(Array.isArray(applicantList) ? applicantList : []).length > 0 ? (
        <List
          size="large"
          itemLayout="vertical"
          className="[&>div.ant-list-pagination]:px-6 [&>div.ant-list-pagination]:pb-4"
          pagination={{
            pageSize: 10,
          }}
          dataSource={applicantList}
          renderItem={(userList: any) => {
            return (
              <div
                key={userList?.id}
                className="border-b hover:bg-gray-50 hover:cursor-pointer p-3 rounded-md"
              >
                <div className="flex justify-between">
                  <Typography.Title
                    ellipsis={{ rows: 2 }}
                    level={5}
                    onClick={() => {
                      setEnrolId(userList?.id);
                      jobContext?.fetchCandidateProfile(
                        userList?.user?.username
                      );
                      jobContext?.setIsShowProfile?.(true);
                    }}
                  >
                    {userList?.firstname} {userList?.lastname}
                  </Typography.Title>
                  <Dropdown
                    menu={{ items: getListMenuItems() }}
                    trigger={["click"]}
                    placement="bottomRight"
                    overlayClassName="p-4 rounded-lg"
                  >
                    <Button
                      type="text"
                      shape="circle"
                      icon={<EllipsisOutlined rotate={90} />}
                      onClick={(event) => {
                        event.preventDefault();
                        const resumeObj = (
                          Array.isArray(getJSONParse(userList?.meta))
                            ? getJSONParse(userList?.meta)
                            : []
                        ).find((itemObj: any) => {
                          return (
                            typeof itemObj?.key === "string" &&
                            itemObj.key.toLowerCase().trim() === "resume" &&
                            typeof itemObj?.value === "string" &&
                            itemObj.value.trim() !== ""
                          );
                        });
                        const resume: string =
                          typeof resumeObj?.value === "string"
                            ? resumeObj?.value
                            : "";
                        setResumeUrl(resume);
                        setEnrolId(userList?.id);
                        jobContext?.fetchCandidateProfile(
                          userList?.user?.username
                        );
                      }}
                    />
                  </Dropdown>
                </div>
                <Typography.Paragraph
                  ellipsis
                  className="flex items-center gap-1 mb-1"
                >
                  <MailOutlined className="text-grey-400" />
                  {userList?.email}
                </Typography.Paragraph>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Typography.Text className="flex gap-2 items-center mt-1 text-purple-900 cursor-pointer underline">
                      <PhoneOutlined />
                      {userList?.phoneNumber}
                    </Typography.Text>
                  </div>
                </div>
              </div>
            );
          }}
        />
      ) : (
        <div className="flex justify-center items-center my-10">
          <Typography.Title level={3}>No Candidates</Typography.Title>
        </div>
      )}
    </div>
  );
};

export default CandidatesList;
