"use client";
import React from "react";
// next
import NextLink from "next/link";
import { useParams } from "next/navigation";
// antd and Icon components
import { Tag, List, Collapse, Typography } from "antd";
import {
  AudioOutlined,
  FilePdfOutlined,
  PlayCircleFilled,
} from "@ant-design/icons";
// app components
import AuthorCard from "./AuthorCard";

const DetailsContent = () => {
  const params = useParams();
  const slug = params.query;

  return (
    <div className="mb-8">
      <Typography.Title level={1}>Course Overview</Typography.Title>
      <Typography.Paragraph className="leading-6">
        IBM is recognized as a cognitive solutions and cloud platform company
        with one purpose - to be essential to the world. We do this in part
        through innovative learning and credentialing programs that help develop
        and recognize the talent that fuels innovation to change the world.
        IBM&apos;s Digital Badge Program represents our latest endeavor for
        recognizing this talent through secure, verifiable digital credentials
        representing skill, achievement, and contribution. Earn and share your
        badge today!
      </Typography.Paragraph>
      <div className="mb-8">
        <div className=" lg:flex-row gap-4 items-center mb-6">
          <Typography.Title level={4} className="mb-0">
            Course curriculum
          </Typography.Title>
          <Typography.Text className="ml-auto">1 Section . </Typography.Text>
          <Typography.Text className="ml-auto">1 lectures . </Typography.Text>
          <Typography.Text>2 hours total length</Typography.Text>
        </div>
        <div>
          <Collapse
            accordion
            defaultActiveKey={["0"]}
            expandIconPosition="start"
            className="px-3"
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <Collapse.Panel
                key={`${index}`}
                header={
                  <Typography.Paragraph className="mb-0 font-medium">
                    Installing Development Software
                  </Typography.Paragraph>
                }
                className="[&>div.ant-collapse-content>div.ant-collapse-content-box]:p-0"
                extra={
                  <div className="flex gap-3 items-center">
                    <Typography.Text type="secondary" className="ml-auto">
                      5 lectures
                    </Typography.Text>
                    <Typography.Text type="secondary">24:10</Typography.Text>
                  </div>
                }
              >
                <List
                  dataSource={[
                    {
                      title: "Japanese princess to wed commoner.",
                      type: "video",
                    },
                    {
                      title: "Australian walks 100km after outback crash.",
                      type: "video",
                    },
                    {
                      title: "Racing car sprays burning fuel into crowd.",
                      type: "pdf",
                    },
                    {
                      title: "Man charged over missing wedding girl.",
                      type: "audio",
                    },
                  ]}
                  renderItem={(item, index) => (
                    <List.Item>
                      <NextLink
                        href={`/admin/courses/${slug}/lecture/${index}`}
                        passHref
                      >
                        <Typography.Link className="flex items-center gap-4 w-full">
                          {item.type === "video" && (
                            <PlayCircleFilled
                              className="text-gray-400"
                              rev={undefined}
                            />
                          )}
                          {item.type === "audio" && (
                            <AudioOutlined
                              className="text-gray-400"
                              rev={undefined}
                            />
                          )}
                          {item.type === "pdf" && (
                            <FilePdfOutlined
                              className="text-gray-400"
                              rev={undefined}
                            />
                          )}
                          <Typography.Text className=" flex-grow">
                            {item.title}
                          </Typography.Text>
                          <Typography.Text className="ml-auto block">
                            7:50
                          </Typography.Text>
                        </Typography.Link>
                      </NextLink>
                    </List.Item>
                  )}
                />
              </Collapse.Panel>
            ))}
          </Collapse>
        </div>
      </div>
      <div className="mb-8">
        <Typography.Title
          className="font-bold leading-[42px] text-[35px] "
          level={4}
        >
          SKILLS THIS PROGRAM NEEDS
        </Typography.Title>
        <Typography.Text>Skills this program needs</Typography.Text>
        <div className="mt-4 max-w-md font-bold flex gap-2 flex-wrap">
          <Tag className="px-6 py-[10px] rounded-full text-sm" color="#5832DA">
            <NextLink href="#">Java</NextLink>
          </Tag>
          <Tag className="px-6 py-[10px] rounded-full text-sm" color="#5832DA">
            <NextLink href="#">Javascript</NextLink>
          </Tag>
          <Tag className="px-6 py-[10px] rounded-full text-sm" color="#5832DA">
            <NextLink href="#">Html</NextLink>
          </Tag>
          <Tag
            className="px-6 rounded-full py-[10px] text-sm text-purple-500"
            color="#EEEAFB"
          >
            <NextLink href="#">CSS</NextLink>
          </Tag>
          <Tag
            className="px-6 py-[10px] rounded-full text-sm text-[#5832DA]"
            color="#EEEAFB"
          >
            <NextLink href="#">CSS</NextLink>
          </Tag>
          <Tag
            className="px-6 py-[10px] rounded-full text-sm text-[#5832DA]"
            color="#EEEAFB"
          >
            <NextLink href="#">JQuery</NextLink>
          </Tag>
          <Tag
            className="px-6 py-[10px] rounded-full text-sm text-[#5832DA]"
            color="#EEEAFB"
          >
            <NextLink href="#">React</NextLink>
          </Tag>
          <Tag
            className="px-6 py-[10px] rounded-full text-sm text-[#5832DA]"
            color="#EEEAFB"
          >
            <NextLink href="#">MySQL</NextLink>
          </Tag>
          <Tag
            className="px-6 py-[10px] rounded-full text-sm text-[#5832DA]"
            color="#EEEAFB"
          >
            <NextLink href="#">Node Js</NextLink>
          </Tag>
          <Tag
            className="px-6 py-[10px] rounded-full text-sm text-[#5832DA]"
            color="#EEEAFB"
          >
            <NextLink href="#">Vue</NextLink>
          </Tag>
          <Tag
            className="px-6 py-[10px] rounded-full text-sm text-[#5832DA]"
            color="#EEEAFB"
          >
            <NextLink href="#">Python</NextLink>
          </Tag>
        </div>
      </div>
      <div className="mb-8">
        <Typography.Title
          level={4}
          className=" text-2xl font-bold leading-[28.8px]"
        >
          Who is this course for:
        </Typography.Title>
        <ul className="list-disc">
          <li className="ml-4 text-[16px] mb-2">
            Anyone who is interested in learning Javascript from Scratch
          </li>
          <li className="ml-4 mb-2">
            Anyone who is interested in learning Advanced Level Javascript
            concepts
          </li>
          <li className="ml-4 mb-2">
            Anyone who is interested in learning to make Advanced Level
            Applications in Javascript
          </li>
        </ul>
      </div>
      <div className="mb-8">
        <Typography.Title
          level={4}
          className="text-2xl font-bold leading-[28.8px]"
        >
          Requirements:
        </Typography.Title>
        <ul className="list-disc">
          <li className="ml-4 mb-2">
            Macintosh (OSX)/ Windows(Vista and higher) Machine
          </li>
          <li className="ml-4 mb-2">Internet connection</li>
        </ul>
      </div>
      <div className="mb-8">
        <Typography.Title
          level={4}
          className="text-2xl font-bold leading-[28.8px]"
        >
          What will you learn:
        </Typography.Title>
        <ul className="list-disc">
          <li className="ml-4 mb-2">The basics of HTML and CSS.</li>
          <li className="ml-4 mb-2">
            The core concepts in Javascript & Web development.
          </li>
        </ul>
      </div>
      <div className="mb-8">
        <AuthorCard />
      </div>
      <div className="mb-8">
        <Typography.Title
          level={4}
          className="text-[24px] font-bold leading-[28.8px]"
        >
          About Organisation
        </Typography.Title>
        <Typography.Paragraph className="leading-6">
          With about 3.2 million members, NEA is one of the largest
          organizations in the educational field. Its members are drawn from
          every educational level in the teaching profession. Its main calling
          is ensuring that as many Americans as possible get access to quality
          education, while serving as an advocate for teachers all over the
          nation.
        </Typography.Paragraph>
        <Typography.Paragraph className="leading-8 text-[16px] font-normal">
          Every state in America has a separate division of NEA which allows for
          a local touch and enables teachers to deal with immediate issues
          affecting them. Once you join the organization, you will be entitled
          to legal representation and gain access to insurance. In addition, you
          may get scholarships and grants as well access to researched material
          that will enable you to handle any challenges in your place of work,
          according to Forbes. You can also take up online courses that are sure
          to be beneficial when handling such issues as early childhood
          education and bullying in schools.
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default DetailsContent;
