"use client";
import React from "react";
//
import VideoJs from "@/components/shared/video/VideoJs";

const VideoPlayer = () => {
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
    <div className="max-w-4xl mx-auto">
      <VideoJs options={videoJsOptions} />
    </div>
  );
};

export default VideoPlayer;
