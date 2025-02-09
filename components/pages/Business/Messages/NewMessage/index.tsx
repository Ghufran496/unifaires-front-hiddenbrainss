"use client";
import React, { useState } from "react";
import { Input, Button, Typography } from "antd";

import { BsPlusCircle } from "react-icons/bs";

const NewMessage = () => {
  return (
    <div className="  bg-white">
      <div>
        <Typography>
          <div className="mb-4">
            <Input
              className="w-full h-[50px]"
              placeholder="To (Email or Number)"
              suffix={
                <Button type="text" size="large" style={{ width: "38px" }}>
                  <BsPlusCircle color="#5832DA" />
                </Button>
              }
            />
          </div>
          <div className="mb-4">
            <Input.TextArea
              className="w-[539px] h-[178px]"
              rows={4}
              size="large"
              placeholder="Message Body"
            />
          </div>
          <Button
            type="primary"
            className="w-[135px] h-[60px] "
            size="large"
            block
          >
            Send Message
          </Button>
        </Typography>
      </div>
    </div>
  );
};

export default NewMessage;
