"use client";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Divider, Space, Tag, Typography } from "antd";
import { useContext } from "react";
import { BsEnvelope, BsPhone, BsPinMap } from "react-icons/bs";
import Image from "next/image";
import { jobDetailsContext } from "../JobDetailsContext";

const UserProfile = () => {
  const jobContext = useContext(jobDetailsContext);

  /**
   * Get date string
   */
  const getDateString = (dateStr: string = ""): string => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
    } catch (error) {
      return "";
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg p-6">
        <div id="pdfDiv" className="mt-4 bg-white rounded-md px-6 py-6">
          <div>
            <Space size={25}>
              <div className="">
                <Avatar
                  size={80}
                  icon={
                    typeof jobContext?.candidateProfile?.imageUrl == "string" &&
                    jobContext.candidateProfile.imageUrl.trim() !== "" ? (
                      <Image
                        src={jobContext.candidateProfile.imageUrl}
                        alt="profile picture"
                        className="rounded-full justify-self-start"
                        width={80}
                        height={80}
                      />
                    ) : (
                      <UserOutlined />
                    )
                  }
                />
              </div>

              <Typography className="my-4">
                <Typography.Title level={5}>
                  {jobContext?.candidateProfile?.firstname}{" "}
                  {jobContext?.candidateProfile?.lastname}
                </Typography.Title>
                <Typography.Paragraph className="text-gray-500 capitalize">
                  {jobContext?.candidateProfile?.currentProfessionalRole}
                </Typography.Paragraph>
              </Typography>
            </Space>
          </div>
          <div className="flex lg:flex-row md:flex-row flex-col mt-12 gap-10">
            {/* Left hand side */}
            <div className="lg:w-1/2 md:w-1/2 w-full">
              {/* About Me */}
              <div>
                <Typography.Title level={4} className="font-bold ">
                  About Me
                </Typography.Title>
                <Divider className=" border-black border-2" />
                <Typography.Paragraph>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: jobContext?.candidateProfile?.aboutMe,
                    }}
                  />
                </Typography.Paragraph>
              </div>
              {/* Languages */}
              <div className="mt-8">
                <Typography.Title level={4} className="font-bold">
                  Languages
                </Typography.Title>
                <Divider className=" border-black border-2" />
                {(Array.isArray(jobContext?.candidateProfile?.userlanguages)
                  ? jobContext.candidateProfile.userlanguages
                  : []
                ).map((lang: any) => {
                  return (
                    <Typography.Paragraph key={lang?.id} className="m-0">
                      <span className=" font-semibold">{lang?.language} </span>-{" "}
                      {lang?.proficiency}
                    </Typography.Paragraph>
                  );
                })}
              </div>
              <div className="mt-8">
                <Typography.Title level={4} className="font-bold">
                  Contact
                </Typography.Title>
                <Divider className=" border-black border-2" />
                {(Array.isArray(jobContext?.candidateProfile?.userContacts)
                  ? jobContext.candidateProfile.userContacts
                  : []
                ).length > 0 ? (
                  <>
                    <div className="flex flex-row gap-4 items-center">
                      <BsPhone size={20} color="blue" />
                      <Typography.Paragraph className="mb-0">
                        {
                          jobContext?.candidateProfile?.userContacts?.[0]
                            ?.phoneNumber
                        }
                      </Typography.Paragraph>
                    </div>
                    <div className="flex flex-row gap-4 items-center my-1">
                      <BsPinMap size={20} color="blue" />
                      <Typography.Paragraph className="mb-0">
                        {
                          jobContext?.candidateProfile?.userContacts?.[0]
                            ?.portfolioUrl
                        }
                      </Typography.Paragraph>
                    </div>
                    <div className="flex flex-row gap-4 items-center mb-4">
                      <BsEnvelope size={20} color="blue" />
                      <Typography.Paragraph className="mb-0">
                        {jobContext?.candidateProfile?.userContacts?.[0]?.email}
                      </Typography.Paragraph>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            {/* Righ handside */}
            <div className="lg:w-1/2 md:w-1/2 w-full">
              {/* Work Experience */}
              <div>
                <Typography.Title level={4} className="font-bold">
                  Work Experience
                </Typography.Title>
                <Divider className=" border-black border-2" />
                <ul className="list-disc ml-4">
                  {(Array.isArray(jobContext?.candidateProfile?.workexperiences)
                    ? jobContext.candidateProfile.workexperiences
                    : []
                  ).map((exp: any) => (
                    <li key={exp?.id}>
                      <Typography.Paragraph className="font-bold mb-0">
                        {exp?.position} - {exp?.company} |{" "}
                        <span className="italic text-gray-500">
                          {exp?.city}, {exp?.country}
                        </span>
                      </Typography.Paragraph>
                      <Typography.Paragraph className="italic text-gray-500">
                        {getDateString(exp?.startDate) +
                          (getDateString(exp?.startDate).trim() !== "" &&
                          getDateString(exp?.endDate).trim() !== ""
                            ? " - "
                            : "") +
                          (getDateString(exp?.endDate).trim() !== ""
                            ? getDateString(exp?.endDate).trim()
                            : "Present")}
                      </Typography.Paragraph>
                      <Typography.Paragraph>
                        <div
                          dangerouslySetInnerHTML={{ __html: exp?.description }}
                        />
                      </Typography.Paragraph>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Education */}
              <div className="mt-8">
                <Typography.Title level={4} className="font-bold">
                  Education
                </Typography.Title>
                <Divider className=" border-black border-2" />
                <ul className="list-disc ml-4">
                  {(Array.isArray(jobContext?.candidateProfile?.education)
                    ? jobContext.candidateProfile.education
                    : []
                  ).map((edu: any) => (
                    <li key={edu?.id}>
                      <Typography.Paragraph className="font-bold mb-0">
                        {edu?.collegeName} |{" "}
                        <span className="italic text-gray-500">
                          {edu?.degree}
                        </span>
                      </Typography.Paragraph>
                      <Typography.Paragraph className="italic text-gray-500">
                        {getDateString(edu?.fromYear) +
                          (getDateString(edu?.fromYear).trim() !== "" &&
                          getDateString(edu?.endYear).trim() !== ""
                            ? " - "
                            : "") +
                          (getDateString(edu?.endYear).trim() !== ""
                            ? getDateString(edu?.endYear).trim()
                            : "Present")}
                      </Typography.Paragraph>
                    </li>
                  ))}
                </ul>
              </div>
              {/* IT Services */}
              <div className="mt-8">
                <Typography.Title level={4} className="font-bold">
                  Professional Certificates
                </Typography.Title>
                <Divider className=" border-black border-2" />
                <ul className="list-disc ml-4">
                  {(Array.isArray(
                    jobContext?.candidateProfile?.professionalcertificates
                  )
                    ? jobContext?.candidateProfile.professionalcertificates
                    : []
                  ).map((cert: any, index: number) => (
                    <li key={index} className="font-bold">
                      {cert?.title} -{" "}
                      <span className="italic text-gray-500 font-normal">
                        {getDateString(cert?.year)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Skills and Expertise */}
          <div className="mt-8">
            <Typography.Paragraph className="p-2 bg-[#D2C5FD] font-bold uppercase">
              Skills & Expertises
            </Typography.Paragraph>
            {(Array.isArray(jobContext?.candidateProfile?.skills)
              ? jobContext.candidateProfile.skills
              : []
            ).map((skill: any) => {
              return (
                <Tag
                  key={skill?.id}
                  className="text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-4 py-1"
                >
                  {skill?.name}
                </Tag>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
