"use client";
import { UserOutlined } from "@ant-design/icons";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";
import { Typography, Button, Space, Avatar, Divider, Tag } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsPhone, BsPinMap, BsEnvelope } from "react-icons/bs";

const UserPublicProfile = () => {
  const [userInfo, setUserInfo] = useState<any>();
  const router = useRouter();
  const params = useParams();
  const username = params.username;

  const fetchUserProfile = async () => {
    try {
      const res = await axiosInstance.get(`/users/profile/${username}`);

      if (res.status) {
        // console.log(res);
        setUserInfo(res.data.data);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  useEffect(() => {
    if (username) {
      fetchUserProfile();
    }
  }, [username]);
  return (
    <div>
      <div className="p-8">
        <div className="mt-4 pdfDiv">
          {/* Header */}
          <div>
            <Space size={25}>
              <Avatar size={80} icon={<UserOutlined />} />
              <Typography className="my-4">
                <Typography.Title level={3}>
                  {userInfo?.firstname} {userInfo?.lastname}
                </Typography.Title>
                <Typography.Paragraph className="text-gray-500 capitalize text-base italic">
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
                  English - Proficient
                </Typography.Paragraph>
                <Typography.Paragraph>
                  Germany - Intermidate
                </Typography.Paragraph>
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
            {userInfo &&
              userInfo?.userskills &&
              userInfo.userskills.map((skill: any) => {
                const mySkill = skill.skill;
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
    </div>
  );
};

export default UserPublicProfile;
