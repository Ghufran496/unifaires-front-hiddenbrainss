"use client";
import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import {
  MailOutlined,
  SendOutlined,
  SearchOutlined,
  CommentOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Delete, EditSquare } from "react-iconly";
import AllMessages from "../AllMessages";
// import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import url from "url";

const MessageSections = ({ setViewMessage }: any) => {
  const [form] = Form.useForm();
  const [createChat, setCreateChat] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const router = useRouter();
  const pathname = usePathname();

  const handleContact = () => {
    if (pathname) {
      const contact = url.resolve(pathname, "/user/messages/contact");
      router.push(contact);
    }
  };

  const items = [
    // {
    //   index: 0,
    //   label: "New Messages",
    //   key: "new-messages",
    //   icon: <EditSquare style={{ marginTop: "4px" }} size={16} />,
    //   component: <NewMessage />,
    // },
    {
      index: 1,
      label: "All Messages",
      key: "messages",
      icon: <CommentOutlined />,
      component: <AllMessages setViewMessage={setViewMessage} />,
    },
    // {
    //   index: 2,
    //   label: "Unread",
    //   key: "unread",
    //   icon: <MailOutlined />,
    //   component: <AllMessages />,
    // },
    // {
    //   index: 3,
    //   label: "Sent",
    //   key: "sent",
    //   icon: <SendOutlined rotate={-45} />,
    //   component: <AllMessages />,
    // },
    // {
    //   index: 4,
    //   label: "Archive",
    //   key: "archive",
    //   icon: <BsArchiveFill style={{ marginTop: "5px" }} rotate={-45} />,
    //   component: <AllMessages />,
    // },
    // {
    //   index: 5,
    //   label: "Draft",
    //   key: "draft",
    //   icon: <TbGitPullRequestDraft style={{ marginTop: "5px" }} rotate={-45} />,
    //   component: <AllMessages />,
    // },
    // {
    //   index: 6,
    //   label: "Delete",
    //   key: "delete",
    //   icon: <Delete />,
    //   component: <AllMessages />,
    // },
  ];

  return (
    <div className="p-5 bg-white border-x">
      <Form form={form} className="">
        <Input
          size="large"
          className="rounded-[34px] w-[377px] md:w-[349px] h-[40px]"
          placeholder="Search Messages"
          prefix={<SearchOutlined />}
        />
        <div className="flex gap-6">
          <div className="flex items-center gap-4 mt-4">
            <p className="text-xl md:text-sm font-medium whitespace-nowrap ">
              {activeIndex === 0 ? "" : "Sort by"}
            </p>
            {activeIndex === 0 ? (
              ""
            ) : (
              <select
                className="w-30 h-[49px] rounded-full bg-[#5832DA] bg-opacity-5 text-purple-50 text-base font-medium leading-[19.2px] py-2 px-2"
                defaultValue="recent"
              >
                <option value="recent">Recent Access</option>
              </select>
            )}
          </div>

          {/* <Button
            onClick={handleContact}
            className="w-[138px] h-[49px] mt-4 rounded-[80px] bg-purple-50 bg-opacity-5 text-purple-50 text-base font-medium leading-[19.2px] py-2 px-2"
          >
            Contact List
          </Button> */}
        </div>
      </Form>
      {/* <div>
        {createChat ? (
          <Form className="flex gap-4">
            <Form.Item className="w-full">
              <Input placeholder="Enter user username..." size="large" />
            </Form.Item>

            <div>
              <Button
                size="large"
                className=" rounded-full"
                type="primary"
                icon={<CommentOutlined />}
                onClick={() => setCreateChat(false)}
              />
            </div>
          </Form>
        ) : (
          <div>
            <Button
              size="large"
              className="flex ml-auto items-center justify-center rounded-full"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateChat(true)}
            />
          </div>
        )}
      </div> */}
      <div className="py-4 gap-4 whitespace-nowrap text-sm flex overflow-x-scroll leading-[16.8px] font-medium ">
        {items.map((data, index) => (
          <div
            className={`${
              data.index === activeIndex ? "text-purple-50" : ""
            } cursor-pointer`}
            key={index}
            onClick={() => setActiveIndex(index)}
          >
            <p className="flex">
              {data.icon}
              <span className="mt-1 ml-2">{data.label}</span>
            </p>
          </div>
        ))}
      </div>
      {items[activeIndex].component}
    </div>
  );
};

export default MessageSections;
