"use client";
import { Fragment, useCallback } from "react";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import axios from "axios";

// Throttle function
function throttle(func: Function, delay: any) {
  let lastCall = 0;
  return function (...args: any) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

const VideoPlayer = ({
  videoUrl,
  markLectureCompleted,
  handleNextLecture,
}: any) => {
  const onEnded = (nativeEvent: any) => {
    markLectureCompleted();
    // handleNextLecture();
  };

  const sendProgressUpdate = useCallback(
    throttle((currentTime: any) => {
      console.log("Sending progress update:", currentTime);

      // Replace with your API endpoint and the necessary payload
      // axios
      //   .post("/api/progress", {
      //     videoUrl,
      //     currentTime,
      //   })
      //   .then((response) => {
      //     console.log("Progress update sent:", response.data);
      //   })
      //   .catch((error) => {
      //     console.error("Error sending progress update:", error);
      //   });
    }, 5000),
    [videoUrl]
  ); // Throttling to 5 seconds

  const handleVideoProgress = (e: any) => {
    const currentTime = e.currentTime;
    sendProgressUpdate(currentTime);
  };

  return (
    <Fragment>
      <MediaPlayer
        playsInline
        aspectRatio="16/9"
        onTimeUpdate={(e: any) => handleVideoProgress(e)}
        className="flex items-center justify-center object-cover"
        src={videoUrl}
        onEnded={onEnded}
        autoPlay
      >
        <MediaProvider className="max-h-max max-w-max " />
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </Fragment>
  );
};

export default VideoPlayer;
