"use client";

import React, { useEffect } from "react";
// video player
import videojs from "video.js";
import "video.js/dist/video-js.css";
// import "@videojs/themes/dist/city/index.css";

interface IVideoPlayerProps {
  options: videojs.PlayerOptions;
}

const VideoJs: React.FC<IVideoPlayerProps> = ({ options }) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const playerRef = React.useRef<videojs.Player | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    playerRef.current = videojs(videoElement, {
      ...options,
    }).ready(function () {
      // console.log('onPlayerReady', this);
    });
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [options]);

  return (
    <div data-vjs-player className="static">
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered vjs-16-9 vjs-theme-city"
      />
    </div>
  );
};

export default VideoJs;
