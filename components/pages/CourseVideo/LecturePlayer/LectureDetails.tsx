"use client";
import React, { useEffect, useState } from "react";
// ant components
import { Tabs } from "antd";
// app components
import Tools from "./Tools";
import Notes from "./Notes";
import Content from "./Content";
import Reviews from "./Reviews";
import Overview from "./Overview";
import Announcements from "./Announcements";
import axiosInstance from "@/app/utils/axios-config";
import QuestionAndAnswers from "./Question";
import CourseAssignment from "./Assignment";
import { getUserType } from "@/app/utils/globalStates";
import { useSession } from "next-auth/react";

const LectureDetails = ({
  course,
  setLectureType,
  setSelectedLecture,
  setCurrentLectureIndex,
}: any) => {
  const { data: session } = useSession();
  const [userType, setUserType] = useState();

  useEffect(() => {
    getUserType().then((res) => {
      setUserType(res);
    });
  }, [session]);

  const items = [
    {
      label: "Overview",
      key: "overview",
      children: <Overview course={course} />,
    }, // remember to pass the key prop
    {
      label: "Q/A",
      key: "question",
      children: <QuestionAndAnswers course={course} />,
    }, // remember to pass the key prop
    {
      label: "Content",
      key: "content",
      children: (
        <Content
          setLectureType={setLectureType}
          setSelectedLecture={setSelectedLecture}
          course={course}
          setCurrentLectureIndex={setCurrentLectureIndex}
        />
      ),
    },
    // { label: "Notes", key: "notes", children: <Notes /> },
    {
      label: "Announcements",
      key: "announcements",
      children: <Announcements course={course} userType={userType} />,
    },
    {
      label: "Reviews",
      key: "reviews",
      children: <Reviews course={course} />,
    },
    // { label: "Learning Tools", key: "tools", children: <Tools /> },
    {
      label: "Assignment",
      key: "assignment",
      children: <CourseAssignment userType={userType} course={course} />,
    },
  ];

  return (
    <Tabs
      size="large"
      items={items}
      tabBarExtraContent={{
        left: <span className="pl-6"></span>,
        right: <span className="pr-6"></span>,
      }}
    />
  );
};

export default LectureDetails;
