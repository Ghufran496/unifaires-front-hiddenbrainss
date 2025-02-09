"use client";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Space, Tag, Typography } from "antd";
import { Title } from "chart.js";
import { Fragment } from "react";
import {
  BsEnvelope,
  BsEnvelopeExclamation,
  BsMailbox,
  BsMap,
  BsPhone,
  BsPinMap,
  BsVoicemail,
} from "react-icons/bs";

const ProfilePreview = ({ setProfilePreview, resumeDetails }: any) => {
  return (
    <Fragment>
      <div>
        <div className="flex lg:flex-row md:flex-row flex-col justify-between">
          <Typography.Title level={3}>My Profile</Typography.Title>
          <div className="flex flex-row gap-4 items-center">
            <Button
              type="default"
              size="middle"
              className="rounded-sm"
              onClick={() => setProfilePreview(false)}
            >
              Edit Profile
            </Button>
            <Button type="text" className="underline">
              Download PDF
            </Button>
          </div>
        </div>
        <div className="mt-4">
          {/* Header */}
          <div>
            <Space size={25}>
              <Avatar size={80} icon={<UserOutlined />} />
              <Typography className="my-4">
                <Typography.Title level={5}>John Doe</Typography.Title>
                <Typography.Paragraph className="text-gray-500">
                  Software Engineer
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae, ipsam? Fugiat sunt qui officiis accusamus nemo sit
                  vero nisi, quis numquam impedit in iste est reiciendis
                  repellat modi commodi. Repudiandae! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Vel iure vitae ipsa id
                  voluptatum nesciunt suscipit quae voluptatibus qui
                  reprehenderit. Earum delectus sunt ex distinctio facere,
                  dolorum eligendi commodi quidem!
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                  saepe iste laborum omnis. Aliquam eaque iusto consequuntur
                  harum, voluptates veniam impedit, at quos obcaecati possimus
                  saepe cum ipsa et nobis!
                </Typography.Paragraph>
              </div>
              {/* Contact */}
              <div className="mt-8">
                <Typography.Title level={4} className="font-bold">
                  Contact
                </Typography.Title>
                <Divider />
                <div className="flex flex-row gap-4 items-center">
                  <BsPhone size={25} color="blue" />
                  <Typography.Paragraph className="mt-4">
                    +234 9495 93483
                  </Typography.Paragraph>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <BsPinMap size={25} color="blue" />
                  <Typography.Paragraph className="mt-4">
                    Germany
                  </Typography.Paragraph>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <BsEnvelope size={25} color="blue" />
                  <Typography.Paragraph className="mt-4">
                    example@gmail.com
                  </Typography.Paragraph>
                </div>
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
                <Typography.Paragraph>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae, ipsam? Fugiat sunt qui officiis accusamus nemo sit
                  vero nisi, quis numquam impedit in iste est reiciendis
                  repellat modi commodi. Repudiandae! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Vel iure vitae ipsa id
                  voluptatum nesciunt suscipit quae voluptatibus qui
                  reprehenderit. Earum delectus sunt ex distinctio facere,
                  dolorum eligendi commodi quidem!
                </Typography.Paragraph>
              </div>
              {/* Education */}
              <div className="mt-8">
                <Typography.Title level={4} className="font-bold">
                  Education
                </Typography.Title>
                <Divider />
                <Typography.Paragraph>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae, ipsam? Fugiat sunt qui officiis accusamus nemo sit
                  vero nisi, quis numquam impedit in iste est reiciendis
                  repellat modi commodi. Repudiandae! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Vel iure vitae ipsa id
                  voluptatum nesciunt suscipit quae voluptatibus qui
                  reprehenderit. Earum delectus sunt ex distinctio facere,
                  dolorum eligendi commodi quidem!
                </Typography.Paragraph>
              </div>
              {/* IT Services */}
              <div className="mt-8">
                <Typography.Title level={4} className="font-bold">
                  IT Services
                </Typography.Title>
                <Divider />
                <Typography.Paragraph>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae, ipsam? Fugiat sunt qui officiis accusamus nemo sit
                  vero nisi, quis numquam impedit in iste est reiciendis
                  repellat modi commodi. Repudiandae! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Vel iure vitae ipsa id
                  voluptatum nesciunt suscipit quae voluptatibus qui
                  reprehenderit. Earum delectus sunt ex distinctio facere,
                  dolorum eligendi commodi quidem!
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

export default ProfilePreview;
