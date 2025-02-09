"use client";
import { DownloadOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Space, Tag, Typography } from "antd";
import { Title } from "chart.js";
import { Fragment, useEffect, useRef } from "react";
import config from "@/app/utils/config";
import { BsEnvelope, BsPhone, BsPinMap } from "react-icons/bs";

const UserProfile = ({ userInfo }: any) => {
  return (
    <Fragment>
      <div className="bg-white rounded-lg p-6">
        <div className="flex flex-row gap-4 items-center">
          <Button
            type="text"
            className="flex items-center text-purple-600 hover:font-bold ml-auto underline"
            icon={<DownloadOutlined />}
            // onClick={() => printDocument()}
          >
            Download PDF
          </Button>
        </div>

        <div className="mt-4 pdfDiv">
          {/* Header */}
          <div>
            <Space size={25}>
              <Avatar size={80} icon={<UserOutlined />} />
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
          <div className="flex flex-row mt-12 gap-10">
            {/* Left hand side */}
            <div className="w-1/2">
              {/* About Me */}
              <div>
                <Typography.Title level={4} className="font-bold">
                  About Me
                </Typography.Title>
                <Divider />
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
                <Divider />
                <Typography.Paragraph>
                  {userInfo?.language} - {userInfo?.proficiency}
                </Typography.Paragraph>
                {/* <Typography.Paragraph>
                  Germany - Intermidate
                </Typography.Paragraph> */}
              </div>
              {/* Personality and Hobbies */}
              <div className="mt-8">
                <Typography.Title level={4} className="font-bold">
                  Personality and Hobbies
                </Typography.Title>
                <Divider />
                <Typography.Paragraph>
                  <div
                    dangerouslySetInnerHTML={{ __html: userInfo?.personality }}
                  />
                </Typography.Paragraph>
              </div>
              {/* Contact */}
              <div className="mt-8">
                <Typography.Title level={4} className="font-bold">
                  Contact
                </Typography.Title>
                <Divider />
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
            <div className="w-1/2">
              {/* Work Experience */}
              <div>
                <Typography.Title level={4} className="font-bold">
                  Work Experience
                </Typography.Title>
                <Divider />
                {userInfo?.workexperiences.map((exp: any) => (
                  <>
                    <Typography.Paragraph className="text-bold mb-0">
                      {exp.position} - {exp.company} | {exp.city}, {exp.country}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      {new Date(exp.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}{" "}
                      -{" "}
                      {new Date(exp.endDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      <div
                        dangerouslySetInnerHTML={{ __html: exp?.description }}
                      />
                    </Typography.Paragraph>
                  </>
                ))}
              </div>
              {/* Education */}
              <div className="mt-8">
                <Typography.Title level={4} className="font-bold">
                  Education
                </Typography.Title>
                <Divider />
                {userInfo?.education.map((edu: any) => (
                  <>
                    <Typography.Paragraph className="text-bold mb-0">
                      {edu.collegeName} | {edu.degree}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      {edu.fromYear} - {edu.endYear}
                      {/* {new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })} - {new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })} */}
                    </Typography.Paragraph>
                  </>
                ))}
              </div>
              {/* IT Services */}
              <div className="mt-8">
                <Typography.Title level={4} className="font-bold">
                  PROFESSIONAL CERTIFICATES
                </Typography.Title>
                <Divider />
                <Typography.Paragraph>
                  {userInfo?.professionalcertificates.map(
                    (cert: any, index: number) => (
                      <Typography.Paragraph key={index}>
                        {cert.title} - {cert.year}
                      </Typography.Paragraph>
                    )
                  )}
                </Typography.Paragraph>
              </div>
            </div>
          </div>
          {/* Skills and Expertise */}
          <div className="mt-8">
            <Typography.Paragraph className="p-2 bg-[#D2C5FD] font-bold uppercase">
              Skills & Expertises
            </Typography.Paragraph>
            <div>
              <Typography.Paragraph className="font-semibold text-gray-500 uppercase">
                Tech and Media
              </Typography.Paragraph>
              <div>
                <Tag className="text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-4 py-1">
                  Backend Development
                </Tag>
                <Tag className="text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-4 py-1">
                  Web Development
                </Tag>
                <Tag className="text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-4 py-1">
                  Cyber Security
                </Tag>
              </div>
            </div>
            <div className="mt-8">
              <Typography.Paragraph className="font-semibold text-gray-500 uppercase">
                Design
              </Typography.Paragraph>
              <div>
                <Tag className="text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-4 py-1">
                  Fashion Design
                </Tag>
                <Tag className="text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-4 py-1">
                  UI/UX Design
                </Tag>
                <Tag className="text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-4 py-1">
                  Graphic Design
                </Tag>
                <Tag className="text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-4 py-1">
                  Logo Design
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserProfile;
