"use client";
import React from "react";
// antd components
import { Avatar, Button, Grid, Typography } from "antd";
import {
  PhoneOutlined,
  EllipsisOutlined,
  VideoCameraOutlined,
  SendOutlined,
  LeftOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { BsCalendar2 } from "react-icons/bs";

const ChatSection = ({ setViewMessage }: any) => {
  const screens = Grid.useBreakpoint();
  return (
    <div className="w-full flex flex-col h-full">
      <div className="py-2 px-3 bg-white border-b flex gap-[50px] flex-grow flex-row justify-between items-center">
        <div className="flex gap-3 items-center">
          {(screens.xs || (screens.sm && !screens.md)) && (
            <Button
              type="text"
              icon={<LeftOutlined className="font-bold text-xl" />}
              onClick={() => setViewMessage(false)}
            />
          )}
          <Avatar
            size={50}
            className="  grid place-items-center rounded-[74px] bg-purple-500"
          >
            AS
          </Avatar>
          <div className="ml-4">
            <Typography.Title
              level={5}
              className=" font-semibold text-xl md:text-lg md:font-bold m-0  "
            >
              Anna Smith
            </Typography.Title>
            <Typography.Text className="text-[#808080] text-base md:text-sm font-medium">
              Active Now
            </Typography.Text>
          </div>
        </div>

        {/* Chat Functions like Video Call */}
        {/* <div className="flex space-x-4">
          <div className="">
            <Button
              type="text"
              size="large"
              color="#5832DA"
              icon={<EllipsisOutlined rotate={90} />}
              className="rounded-full grid place-items-center "
            />
          </div>
          <div className="flex">
            <Button
              type="text"
              color="#5832DA"
              size="large"
              title="Schedule a meeting"
              icon={<BsCalendar2 rotate={90} />}
              className="rounded-full grid text-[#5832DA] place-items-center"
            />
            <p className="mt-3 hidden md:block">Schedule a meeting</p>
          </div>
          <div className="hidden md:block">
            <Button
              size="large"
              icon={<PhoneOutlined />}
              className="rounded-full grid place-items-center bg-purple-60 text-purple-500"
            />
          </div>
          <div className="hidden md:block">
            <Button
              danger
              type="text"
              size="large"
              icon={<VideoCameraOutlined />}
              className="rounded-full grid place-items-center bg-red-50"
            />
          </div>
        </div> */}
      </div>
      <div className="custom-scrollbar flex flex-col flex-grow p-4 overflow-auto">
        <div className="flex w-full mt-2 space-x-3 max-w-xs">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-grey-200"></div>
          <div>
            <div className="bg-grey-200 p-3 rounded-r-lg rounded-bl-lg">
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <span className="text-xs text-gray-500 leading-none">
              2 min ago
            </span>
          </div>
        </div>
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
          <div>
            <div className="bg-purple-500 text-white p-3 rounded-l-lg rounded-br-lg">
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod.
              </p>
            </div>
            <span className="text-xs text-gray-500 leading-none">
              2 min ago
            </span>
          </div>
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-grey-200"></div>
        </div>
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
          <div>
            <div className="bg-purple-500 text-white p-3 rounded-l-lg rounded-br-lg">
              <p className="text-sm">Lorem ipsum dolor sit amet.</p>
            </div>
            <span className="text-xs text-gray-500 leading-none">
              2 min ago
            </span>
          </div>
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-grey-200"></div>
        </div>
        <div className="flex w-full mt-2 space-x-3 max-w-xs">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-grey-200"></div>
          <div>
            <div className="bg-grey-200 p-3 rounded-r-lg rounded-bl-lg">
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </div>
            <span className="text-xs text-gray-500 leading-none">
              2 min ago
            </span>
          </div>
        </div>
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
          <div>
            <div className="bg-purple-500 text-white p-3 rounded-l-lg rounded-br-lg">
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </div>
            <span className="text-xs text-gray-500 leading-none">
              2 min ago
            </span>
          </div>
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-grey-200"></div>
        </div>
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
          <div>
            <div className="bg-purple-500 text-white p-3 rounded-l-lg rounded-br-lg">
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
            <span className="text-xs text-gray-500 leading-none">
              2 min ago
            </span>
          </div>
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-grey-200"></div>
        </div>
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
          <div>
            <div className="bg-purple-500 text-white p-3 rounded-l-lg rounded-br-lg">
              <p className="text-sm">Lorem ipsum dolor sit amet.</p>
            </div>
            <span className="text-xs text-gray-500 leading-none">
              2 min ago
            </span>
          </div>
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-grey-200"></div>
        </div>
        <div className="flex w-full mt-2 space-x-3 max-w-xs">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-grey-200"></div>
          <div>
            <div className="bg-grey-200 p-3 rounded-r-lg rounded-bl-lg">
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </div>
            <span className="text-xs text-gray-500 leading-none">
              2 min ago
            </span>
          </div>
        </div>
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
          <div>
            <div className="bg-purple-500 text-white p-3 rounded-l-lg rounded-br-lg">
              <p className="text-sm">Lorem ipsum dolor sit.</p>
            </div>
            <span className="text-xs text-gray-500 leading-none">
              2 min ago
            </span>
          </div>
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-grey-200"></div>
        </div>
      </div>
      <div className="bg-white border-t px-4 py-4 flex items-center">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              opacity=".45"
              fill="#263238"
              d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"
            ></path>
          </svg>
        </div>
        <div className="flex-1 mx-4">
          <input className="w-full border rounded px-2 py-2" type="text" />
        </div>
        <div className="flex gap-2">
          <UploadOutlined className="text-xl hover:cursor-pointer hover:text-purple-500 font-bold" />
          <SendOutlined className="text-xl hover:cursor-pointer hover:text-purple-500 font-bold" />
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
