"use client";
import { DownloadOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Space, Tag, Typography } from "antd";
import { Title } from "chart.js";
import { Fragment, useEffect, useRef } from "react";
import config from "@/app/utils/config";
import { BsEnvelope, BsPhone, BsPinMap } from "react-icons/bs";
import Image from "next/image";

const UserProfile = ({ userInfo }: any) => {
  console.log("user", userInfo);
  const imageUrl = userInfo && userInfo.imageUrl;

  return (
    <Fragment>
      <div className="bg-white rounded-lg p-6">
        <div id="pdfDiv" className="mt-4 bg-white rounded-md px-6 py-6">
          {/* Header */}
          <div>
            <Space size={25}>
              <div className="">
                <Avatar
                  size={80}
                  icon={
                    imageUrl ? (
                      <Image
                        src={imageUrl}
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
                  {userInfo?.firstname} {userInfo?.lastname}
                </Typography.Title>
                <Typography.Paragraph className="text-gray-500 capitalize">
                  {userInfo?.currentProfessionalRole}
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
                    dangerouslySetInnerHTML={{ __html: userInfo?.aboutMe }}
                  />
                </Typography.Paragraph>
              </div>
              {/* Languages */}
              <div className="mt-8">
                <Typography.Title level={4} className="font-bold">
                  Languages
                </Typography.Title>
                <Divider className=" border-black border-2" />
                {userInfo?.userlanguages.map((lang: any) => {
                  return (
                    <Typography.Paragraph key={lang.id} className="m-0">
                      <span className=" font-semibold">{lang.language} </span>-{" "}
                      {lang.proficiency}
                    </Typography.Paragraph>
                  );
                })}
              </div>
              {/* Personality and Hobbies */}
              {/* <div className="mt-8">
                <Typography.Title level={4} className="font-bold">
                  Personality and Hobbies
                </Typography.Title>
                <Divider />
                <Typography.Paragraph>
                  <div
                    dangerouslySetInnerHTML={{ __html: userInfo?.personality }}
                  />
                </Typography.Paragraph>
              </div> */}
              {/* Contact */}
              <div className="mt-8">
                <Typography.Title level={4} className="font-bold">
                  Contact
                </Typography.Title>
                <Divider className=" border-black border-2" />
                {userInfo?.userContacts.map((contact: any) => (
                  <>
                    <div className="flex flex-row gap-4 items-center">
                      <BsPhone size={20} color="blue" />
                      <Typography.Paragraph className="mb-0">
                        {userInfo?.userContacts[0].phoneNumber}
                      </Typography.Paragraph>
                    </div>
                    <div className="flex flex-row gap-4 items-center my-1">
                      <BsPinMap size={20} color="blue" />
                      <Typography.Paragraph className="mb-0">
                        {userInfo?.userContacts[0].portfolioUrl}
                      </Typography.Paragraph>
                    </div>
                    <div className="flex flex-row gap-4 items-center mb-4">
                      <BsEnvelope size={20} color="blue" />
                      <Typography.Paragraph className="mb-0">
                        {userInfo?.userContacts[0].email}
                      </Typography.Paragraph>
                    </div>
                  </>
                ))}
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
                  {userInfo?.workexperiences.map((exp: any) => (
                    <li key={exp.id}>
                      <Typography.Paragraph className="font-bold mb-0">
                        {exp.position} - {exp.company} |{" "}
                        <span className="italic text-gray-500">
                          {exp.city}, {exp.country}
                        </span>
                      </Typography.Paragraph>
                      <Typography.Paragraph className="italic text-gray-500">
                        {new Date(exp.startDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}{" "}
                        -{" "}
                        {exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                            })
                          : "Present"}
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
                  {userInfo?.education.map((edu: any) => (
                    <li key={edu.id}>
                      <Typography.Paragraph className="font-bold mb-0">
                        {edu.collegeName} |{" "}
                        <span className="italic text-gray-500">
                          {edu.degree}
                        </span>
                      </Typography.Paragraph>
                      <Typography.Paragraph className="italic text-gray-500">
                        {new Date(edu.fromYear).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}{" "}
                        -{" "}
                        {edu.endYear
                          ? new Date(edu.endYear).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                            })
                          : "Present"}
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
                  {userInfo?.professionalcertificates.map(
                    (cert: any, index: number) => (
                      <li key={index} className="font-bold">
                        {cert.title} -{" "}
                        <span className="italic text-gray-500 font-normal">
                          {new Date(cert.year).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          })}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Skills and Expertise */}
          <div className="mt-8">
            <Typography.Paragraph className="p-2 bg-[#D2C5FD] font-bold uppercase">
              Skills & Expertises
            </Typography.Paragraph>
            {userInfo?.skills &&
              userInfo.skills.map((skill: any) => {
                return (
                  <Tag
                    key={skill.id}
                    className="text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-4 py-1"
                  >
                    {skill.name}
                  </Tag>
                );
              })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserProfile;
