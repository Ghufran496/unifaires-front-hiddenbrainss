"use client";
import type { NextPage } from "next";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import {
  EyeOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import "react-quill/dist/quill.snow.css";
import { useState } from "react";

import ProfilePreview from "../ProfilePreview";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";

import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchUserProfile, fetchUserSkills } from "@/redux/features/UserSlice";
import axiosInstance from "@/app/utils/axios-config";
import SettingsBasicInfo from "./BasicInfo";
import SettingsContactDetails from "./ContactDetails";
import SettingsLicenses from "./Licenses";
import UserLanguages from "./UserLanguages";
import UserWorkExperience from "./WorkExperience";
import UserEducationalQualification from "./EducationQualification";
import UserHobbies from "./Hobbies";
import { RootState } from "@/redux/store";
import UserProfessionalCertificate from "./ProfessionalCertificate";

const Profile: NextPage = () => {
  const [form] = Form.useForm();
  const { Title, Text } = Typography;
  const { Panel } = Collapse;
  const [resumeDetails, setResumeDetails] = useState();
  const [profilePreview, setProfilePreview] = useState(false);
  const dispatch: any = useAppDispatch();

  const handlePreview = () => {
    const formData = form.getFieldsValue();
    setResumeDetails(formData);
    setProfilePreview(true);
  };

  useEffect(() => {
    dispatch(fetchUserSkills());
    dispatch(fetchUserProfile("user"));
  }, []);

  const userInfo = useAppSelector((state: RootState) => state.user.myProfile);

  const mySkills = useAppSelector((state: any) => state.user.mySkills);

  return (
    <>
      {!profilePreview && (
        <div>
          <div className="flex justify-between">
            <Title level={5}>My Profile</Title>
            <Button
              icon={<EyeOutlined />}
              className="text-purple-50 border-purple-50"
              onClick={handlePreview}
            >
              Preview Profile
            </Button>
          </div>

          <Collapse
            className="sm:w-[100%] lg:w-[70%] bg-transparent"
            bordered={false}
            accordion
          >
            <Panel className="font-bold" header="Basic Info" key="1">
              <SettingsBasicInfo />
            </Panel>
            <Panel className="font-bold" header="Contact Details" key="2">
              <SettingsContactDetails />
            </Panel>
            <Panel className="font-bold" header="Licenses" key="7">
              <SettingsLicenses />
            </Panel>
            <Panel className="font-bold" header="Languages" key="6">
              <UserLanguages />
            </Panel>
            <Panel className="font-bold" header="Work Experience" key="3">
              <UserWorkExperience />
            </Panel>
            <Panel
              className="font-bold"
              header="Education & Qualification"
              key="4"
            >
              <UserEducationalQualification />
            </Panel>
            <Panel
              className="font-bold"
              header="Professional Certificate & Licenses"
              key="5"
            >
              <UserProfessionalCertificate />
            </Panel>

            {/* <Panel className="font-bold" header="Personality & Hobbies" key="8">
              <UserHobbies />
            </Panel> */}
          </Collapse>
        </div>
      )}
      {profilePreview && (
        <ProfilePreview
          mySkills={mySkills}
          setProfilePreview={setProfilePreview}
          resumeDetails={resumeDetails}
          userInfo={userInfo}
        />
      )}
    </>
  );
};

export default Profile;
