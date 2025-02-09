"use client";
import Link from "next/link";
import React from "react";
import { Avatar, Button, List, Tag, Typography } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const AllMessages = ({ setViewMessage }: any) => {
  const data = [
    {
      title: "Anna Smith",
    },
    {
      title: "Anna Smith",
    },
    {
      title: "Anna Smith",
    },
    {
      title: "Anna Smith",
    },
    {
      title: "Anna Smith",
    },
    {
      title: "Anna Smith",
    },
    {
      title: "Anna Smith",
    },
    {
      title: "Anna Smith",
    },
  ];

  return (
    <div className=" ">
      <List
        dataSource={data}
        itemLayout="horizontal"
        className="divide-y  divide-blue-200"
        renderItem={(item, index) => {
          return (
            <List.Item
              className="flex rounded-lg relative group/item transition-all hover:bg-[#5832DA] hover:bg-opacity-10 hover:text-[#5832DA]"
              onClick={() => setViewMessage(true)}
            >
              <div className="flex w-full p-2 items-start gap-4">
                <Avatar alt="dp" src="dp" size={50} />
                <div className="flex flex-col gap-2 grow">
                  <div className="flex items-center gap-[50px] mb-0">
                    <Link href={`/business/messages/${index}`}>
                      <Typography.Title
                        level={5}
                        ellipsis
                        className=" text-base font-semibold leading-[19.2px] mb-0 grow"
                      >
                        {item.title}
                      </Typography.Title>
                    </Link>
                    {/* <div className="flex">
                        <p className="text-gray-500 ml-15 text-base font-medium leading-[19.2px]">
                          Aug
                        </p>
                        <Button
                          type="text"
                          className="relative z-[2] grid place-items-center"
                          icon={
                            <EllipsisOutlined
                              width={30}
                              height={23}
                              rotate={90}
                              className="pb-2"
                            />
                          }
                        />
                      </div> */}
                  </div>
                  <div className="flex items-center gap-2 ">
                    <Link href={`/business/messages/${index}`}>
                      <Typography.Link
                        ellipsis
                        className="stretched-link text-gray-500 text-base font-normal grow"
                      >
                        Hey, what’s the update ...
                      </Typography.Link>
                    </Link>
                    <Tag className="text-white bg-purple-500 rounded-full">
                      2
                    </Tag>
                  </div>
                </div>
              </div>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default AllMessages;
