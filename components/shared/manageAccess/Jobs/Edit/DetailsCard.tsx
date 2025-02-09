"use client";
import { useContext } from "react";
import NextLink from "next/link";
import { Avatar, Card, Button, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { editJobContext } from "./editContext";

const DetailsCard = () => {
  const jobContext = useContext(editJobContext);
  const contactInfo = getJSONParse(jobContext?.jobInfo?.contact);

  /**
   * Get parse data
   */
  function getJSONParse(inputStr: any = undefined) {
    try {
      return JSON.parse(inputStr);
    } catch (error) {
      return undefined;
    }
  }

  return (
    <Card className="lg:-mt-40 shadow-sm sticky mb-6 top-0">
      <Typography.Title level={5} className="mb-3">
        Contact the Jobs Poster
      </Typography.Title>
      <div className="mb-4 flex gap-4">
        <Avatar size={48} className="bg-purple-400">
          <UserOutlined />
        </Avatar>
        <div className="">
          <Typography.Title level={5} className="mb-0">
            {contactInfo?.[0]?.firstname} {contactInfo?.[0]?.lastname}
          </Typography.Title>
          <NextLink href={"mailto:sarah.lewis@gmail.com"} passHref>
            <Typography.Link className="">
              {contactInfo?.[0]?.email}
            </Typography.Link>
          </NextLink>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <Button block type="primary" size="large">
          Apply Now
        </Button>
        <Button block type="default" size="large">
          Save for later
        </Button>
      </div>
    </Card>
  );
};

export default DetailsCard;
