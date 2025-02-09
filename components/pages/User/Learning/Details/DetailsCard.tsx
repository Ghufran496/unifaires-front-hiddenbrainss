"use client";
import React from "react";
// next
// import NextLink from "next/link";
// antd and Icon components
import { Card, Typography } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
// app components
import VideoJs from "@/components/shared/video/VideoJs";
import computer from "@/public/images/Computer.png";
import ImageComponent from "@/components/shared/image";
import { BsPlayCircleFill } from "react-icons/bs";
import { PaperDownload } from "react-iconly";
import { TbScaleOutlineOff, TbTrophyFilled } from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";

const DetailsCard = () => {
  // const playerRef = React.useRef(null);

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
    <div>
      {/* <VideoJs options={videoJsOptions} /> */}
      <ImageComponent src={computer} width={425} height={443} alt={"opened"} />
      <div className="mt-6">
        <Typography.Title level={2} className="mb-0 font-bold ">
          <span className="text-[30px] font-medium ">Price:</span> $94.99
          <Typography.Text type="secondary" delete>
            $750
          </Typography.Text>
        </Typography.Title>
      </div>

      <div className="ml-6 mt-6">
        <Typography.Title className="text-4 font-bold" level={4}>
          This course includes:
        </Typography.Title>
        <Typography.Paragraph className="flex text-center gap-2 flex-nowrap">
          <BsPlayCircleFill size={16} color="#5832DA" className="" /> 46.5 hours
          on-demand video
        </Typography.Paragraph>
        <Typography.Paragraph className="flex text-center gap-2 flex-nowrap">
          <CgFileDocument size={16} color="#5832DA" /> 77 articles
        </Typography.Paragraph>
        <Typography.Paragraph className="flex text-center gap-2 flex-nowrap">
          <PaperDownload size={16} primaryColor="#5832DA" /> 85 downloadable
          resources
        </Typography.Paragraph>
        <Typography.Paragraph className="flex text-center gap-2 flex-nowrap">
          <TbTrophyFilled size={16} color="#5832DA" /> Certificate of Completion
        </Typography.Paragraph>
        <Typography.Paragraph className="flex text-center gap-2 flex-nowrap">
          <TbScaleOutlineOff size={16} color="#5832DA" className="" /> Full time
          access
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default DetailsCard;
