"use client";
import React from "react";
// next
// import NextLink from "next/link";
// antd and Icon components
import { Card, Button, Typography } from "antd";
import {
  GlobalOutlined,
  MobileOutlined,
  FileTextOutlined,
  DownloadOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  VideoCameraOutlined,
  TranslationOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
// app components
import VideoJs from "@/components/shared/video/VideoJs";
import { useParams, useRouter } from "next/navigation";
import { json } from "stream/consumers";
import Link from "next/link";

const DetailsCard = () => {
  // const playerRef = React.useRef(null);
  const router = useRouter();
  const params = useParams();

  const propsString: any = params.props;
  if (!propsString) {
    return;
  }
  const CourseProps = JSON.parse(propsString);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "//vjs.zencdn.net/v/oceans.mp4",
        type: "video/mp4",
      },
    ],
  };

  return (
    <Card className="lg:-mt-64 shadow-sm sticky mb-6 top-0">
      <VideoJs options={videoJsOptions} />
      <div className="mt-6">
        <Typography.Title level={2} className="mb-0">
          $600{" "}
          <Typography.Text type="secondary" delete>
            $750
          </Typography.Text>
        </Typography.Title>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <Link href={`${CourseProps.courseUrl || "#"}`} target="_blank" passHref>
          <Button block type="primary" size="large">
            Buy Now
          </Button>
        </Link>
        {/* <Button block type="default" size="large">
          Start free month
        </Button> */}
      </div>
      <div className="mt-6">
        <Typography.Title level={4}>This course includes:</Typography.Title>
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
          <VideoCameraOutlined /> 46.5 hours on-demand video
        </Typography.Paragraph>
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
          <FileTextOutlined /> 77 articles
        </Typography.Paragraph>
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
          <DownloadOutlined /> 85 downloadable resources
        </Typography.Paragraph>
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
          <ClockCircleOutlined className="" /> Full time access
        </Typography.Paragraph>
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
          <MobileOutlined /> Access on mobile and Tablet
        </Typography.Paragraph>
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
          <SafetyCertificateOutlined /> Certificate of Completion
        </Typography.Paragraph>

        <Typography.Title level={5}>Meta Data:</Typography.Title>
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
          <GlobalOutlined /> Language - English
        </Typography.Paragraph>
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
          <TranslationOutlined /> Subtitles - Portuguese
        </Typography.Paragraph>
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap">
          <CalendarOutlined /> Last Updated - 09/06/2022
        </Typography.Paragraph>
      </div>
    </Card>
  );
};

export default DetailsCard;
