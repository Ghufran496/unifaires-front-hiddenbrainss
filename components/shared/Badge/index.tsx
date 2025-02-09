"use client";
import { Typography } from "antd";
import React from "react";
import { statusBadgeProps } from "../Models/models";

const Badge = ({
  accepted,
  rejected,
  unaccepted,
  unassigned,
  interview,
}: statusBadgeProps) => {
  return (
    <div>
      <Typography.Text
        className={`whitespace-nowrap !text-[12px] rounded-[30px] px-4 bg-opacity-10 py-[5px] ${
          accepted
            ? "bg-[#59AA1A] text-[#59AA1A]"
            : rejected
            ? "bg-[#FF4A4A] text-[#FF4A4A]"
            : unassigned
            ? "bg-[#3686E4] text-[#3686E4]"
            : interview?.firstpersoninterview
            ? " bg-[#FCBD06] text-[#FCBD06]"
            : interview?.secondpersoninterview
            ? "bg-[#B6DA24] text-[#B6DA24]"
            : interview?.phoneInterview
            ? "bg-[#9424BC] text-[#9424BC]"
            : ""
        }`}
      >
        {accepted
          ? accepted
          : rejected
          ? rejected
          : unassigned
          ? unassigned
          : interview?.phoneInterview
          ? interview.phoneInterview
          : interview?.firstpersoninterview
          ? interview.firstpersoninterview
          : interview?.secondpersoninterview
          ? interview.secondpersoninterview
          : ""}
      </Typography.Text>
    </div>
  );
};

export default Badge;
