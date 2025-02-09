"use client";
import React, { useState } from "react";
import { Form, Input } from "antd";
import { SearchOutlined, CommentOutlined } from "@ant-design/icons";

import AllMessages from "../AllMessages";

import { useAppDispatch } from "@/redux/hooks";
import {
  resetContacts,
  searchContacts,
} from "@/redux/features/messages/chatsSlices";

const MessageSections = () => {
  const [form] = Form.useForm();
  const [activeIndex, setActiveIndex] = useState(0);

  const dispatch = useAppDispatch();
  const items = [
    {
      index: 1,
      label: "All Messages",
      key: "messages",
      icon: <CommentOutlined />,
      component: <AllMessages />,
    },
  ];

  return (
    <div className="p-5 bg-white border-x">
      <Form form={form} className="">
        <Input
          size="large"
          className="rounded-[34px] w-[377px] md:w-[349px] h-[40px]"
          placeholder="Search Messages"
          prefix={<SearchOutlined />}
          onChange={(e) => {
            const name = e.target.value;

            if (name.trim().length > 0) {
              dispatch(searchContacts(name));
            } else {
              dispatch(resetContacts());
            }
          }}
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
        </div>
      </Form>

      <div className="py-4 gap-4 whitespace-nowrap text-sm flex overflow-x-scroll leading-[16.8px] font-medium"></div>
      {items[activeIndex].component}
    </div>
  );
};

export default MessageSections;
