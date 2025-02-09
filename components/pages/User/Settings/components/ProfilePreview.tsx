"use client";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Divider,
  Space,
  Tag,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import { Title } from "chart.js";
import { Fragment, useEffect, useRef, useState } from "react";
import config from "@/app/utils/config";
import {
  BsEnvelope,
  BsEnvelopeExclamation,
  BsMailbox,
  BsMap,
  BsPhone,
  BsPinMap,
  BsVoicemail,
} from "react-icons/bs";
import { useSession } from "next-auth/react";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";
import { uploadToAPI } from "@/app/utils/mediaUpload";
import {
  handleAxiosError,
  showError,
  showSuccess,
} from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import { useAppDispatch } from "@/redux/hooks";
import { fetchUserProfile } from "@/redux/features/UserSlice";
import ImgCrop from "antd-img-crop";
import Image from "next/image";

const ProfilePreview = ({
  setProfilePreview,
  resumeDetails,
  mySkills,
  userInfo,
}: any) => {
  const { data: session, status } = useSession();
  const dispatch: any = useAppDispatch();
  const userId = session?.user.id;
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  // const [mediaUrl, setMediaUrl] = useState();
  const imageUrl = userInfo && userInfo.imageUrl;
  const pdfDivRef = useRef(null);

  // const printDocument = () => {
  //   const doc = new JsPDF({
  //     orientation: "p",
  //     unit: "px",
  //     format: "a4",
  //     putOnlyUsedFonts: true,
  //   });
  //   doc.setTextColor(40);

  //   doc.html(document.querySelector("#pdfDiv"), {
  //     callback: function (doc) {
  //       // Save the document after rendering the HTML content
  //       doc.save("MyResume.pdf");
  //     },
  //     x: 20,
  //     y: 40,
  //     margin: [2, 2, 2, 2], // Set margins if needed
  //     html2canvas: {
  //       scale: 0.5, // Adjust the scale if necessary to fit the content
  //     },
  //   });
  // };

  const printDocument = async () => {
    setDownloading(true);
    const pdfDiv: any = document.querySelector("#pdfDiv"); // Or pdfDivRef.current if using a ref
    const doc = new JsPDF("portrait", "px", "a4");

    // Converting HTML to canvas with higher scale for better quality
    const canvas = await html2canvas(pdfDiv, {
      scale: 3,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const imgWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    while (heightLeft > 0) {
      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      if (heightLeft > 0) {
        position -= pageHeight;
        doc.addPage();
      }
    }

    doc.save("MyResume(Unifaires).pdf");
    showSuccess("Downloading");
    setDownloading(false);
  };

  const updateProfileImage = async (url: any) => {
    try {
      const res = await axiosInstance.put(`/user/${userId}`, {
        imageUrl: url,
      });
      if (res.status) {
        showSuccess("Profile Image Updated");
        dispatch(fetchUserProfile("user"));
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleChange: UploadProps["onChange"] = async (info) => {
    try {
      setLoading(true);
      const { status } = info.file;

      if (status === "uploading") {
        // check if it already sent
        if (!isUploading) {
          const uploadedFile = info.file.originFileObj;

          if (uploadedFile) {
            // check if is alrady set don't set
            setIsUploading(true);
            uploadToAPI(uploadedFile).then((res) => {
              updateProfileImage(res);
              // setMediaUrl(res);
              setLoading(false);
              setIsUploading(false);
            });
          }
        }
      } else if (status === "error") {
        showError(`${info.file.name} file upload failed.`);
        setLoading(false);
      }
    } catch (error) {
      console.log("image uploade error", error);
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      showError("You can only upload JPG/PNG file!");
    }
    const isLt12M = file.size / 1024 / 1024 < 12;
    if (!isLt12M) {
      showError("Image must be smaller than 12MB!");
    }
    return isJpgOrPng && isLt12M;
  };
  // console.log(userInfo);

  return (
    <Fragment>
      <div>
        <div className="flex lg:flex-row md:flex-row flex-col justify-between">
          <Typography.Title level={3}>My Profile</Typography.Title>
          <div className="flex flex-row gap-4 items-center">
            <Button
              type="default"
              size="middle"
              className="rounded-sm"
              onClick={() => setProfilePreview(false)}
            >
              Edit Profile
            </Button>
            <Button
              type="text"
              className="underline flex items-center"
              onClick={() => printDocument()}
              loading={downloading}
            >
              Download PDF
            </Button>
          </div>
        </div>
        <div
          id="pdfDiv"
          ref={pdfDivRef}
          className="mt-4 bg-white rounded-md px-6 py-6"
        >
          {/* Header */}
          <div>
            <Space size={25}>
              <ImgCrop>
                <Upload
                  listType="text"
                  // className="avatar-uploader"
                  className="hover:cursor-pointer "
                  beforeUpload={beforeUpload}
                  showUploadList={false}
                  onChange={handleChange}
                  onPreview={() => false}
                >
                  {imageUrl ? (
                    <div className="">
                      <Avatar
                        size={80}
                        icon={
                          <Image
                            src={imageUrl}
                            alt="profile picture"
                            className="rounded-full justify-self-start"
                            width={80}
                            height={80}
                          />
                        }
                      />
                    </div>
                  ) : (
                    <Avatar
                      size={80}
                      icon={loading ? <LoadingOutlined /> : <UserOutlined />}
                    />
                  )}
                </Upload>
              </ImgCrop>

              <Typography className="my-4">
                <Typography.Title level={5}>
                  {userInfo?.firstname} {userInfo?.lastname}
                </Typography.Title>
                <Typography.Paragraph className="text-gray-500 capitalize">
                  {userInfo?.currentProfessionalRole}
                </Typography.Paragraph>
              </Typography>
            </Space>
          </div>
          <div className="flex lg:flex-row md:flex-row flex-col mt-12 gap-10">
            {/* Left hand side */}
            <div className="lg:w-1/2 md:w-1/2 w-full">
              {/* About Me */}
              <div>
                <Typography.Title level={4} className="font-bold ">
                  About Me
                </Typography.Title>
                <Divider className=" border-black border-2" />
                <Typography.Paragraph>
                  <div
                    dangerouslySetInnerHTML={{ __html: userInfo?.aboutMe }}
                  />
                </Typography.Paragraph>
              </div>
              {/* Languages */}
              <div className="mt-8">
                <Typography.Title level={4} className="font-bold">
                  Languages
                </Typography.Title>
                <Divider className=" border-black border-2" />
                {userInfo?.userlanguages.map((lang: any) => {
                  return (
                    <Typography.Paragraph key={lang.id} className="m-0">
                      <span className=" font-semibold">{lang.language} </span>-{" "}
                      {lang.proficiency}
                    </Typography.Paragraph>
                  );
                })}
              </div>
              {/* Personality and Hobbies */}
              {/* <div className="mt-8">
                <Typography.Title level={4} className="font-bold">
                  Personality and Hobbies
                </Typography.Title>
                <Divider />
                <Typography.Paragraph>
                  <div
                    dangerouslySetInnerHTML={{ __html: userInfo?.personality }}
                  />
                </Typography.Paragraph>
              </div> */}
              {/* Contact */}
              <div className="mt-8">
                <Typography.Title level={4} className="font-bold">
                  Contact
                </Typography.Title>
                <Divider className=" border-black border-2" />
                {userInfo?.userContacts.map((contact: any) => (
                  <>
                    <div className="flex flex-row gap-4 items-center">
                      <BsPhone size={20} color="blue" />
                      <Typography.Paragraph className="mb-0">
                        {userInfo?.userContacts[0].phoneNumber}
                      </Typography.Paragraph>
                    </div>
                    <div className="flex flex-row gap-4 items-center my-1">
                      <BsPinMap size={20} color="blue" />
                      <Typography.Paragraph className="mb-0">
                        {userInfo?.userContacts[0].portfolioUrl}
                      </Typography.Paragraph>
                    </div>
                    <div className="flex flex-row gap-4 items-center mb-4">
                      <BsEnvelope size={20} color="blue" />
                      <Typography.Paragraph className="mb-0">
                        {userInfo?.userContacts[0].email}
                      </Typography.Paragraph>
                    </div>
                  </>
                ))}
              </div>
            </div>
            {/* Righ handside */}
            <div className="lg:w-1/2 md:w-1/2 w-full">
              {/* Work Experience */}
              <div>
                <Typography.Title level={4} className="font-bold">
                  Work Experience
                </Typography.Title>
                <Divider className=" border-black border-2" />
                <ul className="list-disc ml-4">
                  {userInfo?.workexperiences.map((exp: any) => (
                    <li key={exp.id}>
                      <Typography.Paragraph className="font-bold mb-0">
                        {exp.position} - {exp.company} |{" "}
                        <span className="italic text-gray-500">
                          {exp.city}, {exp.country}
                        </span>
                      </Typography.Paragraph>
                      <Typography.Paragraph className="italic text-gray-500">
                        {new Date(exp.startDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}{" "}
                        -{" "}
                        {exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                            })
                          : "Present"}
                      </Typography.Paragraph>
                      <Typography.Paragraph>
                        <div
                          dangerouslySetInnerHTML={{ __html: exp?.description }}
                        />
                      </Typography.Paragraph>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Education */}
              <div className="mt-8">
                <Typography.Title level={4} className="font-bold">
                  Education
                </Typography.Title>
                <Divider className=" border-black border-2" />
                <ul className="list-disc ml-4">
                  {userInfo?.education.map((edu: any) => (
                    <li key={edu.id}>
                      <Typography.Paragraph className="font-bold mb-0">
                        {edu.collegeName} |{" "}
                        <span className="italic text-gray-500">
                          {edu.degree}
                        </span>
                      </Typography.Paragraph>
                      <Typography.Paragraph className="italic text-gray-500">
                        {new Date(edu.fromYear).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}{" "}
                        -{" "}
                        {edu.endYear
                          ? new Date(edu.endYear).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                            })
                          : "Present"}
                      </Typography.Paragraph>
                    </li>
                  ))}
                </ul>
              </div>
              {/* IT Services */}
              <div className="mt-8">
                <Typography.Title level={4} className="font-bold">
                  Professional Certificates
                </Typography.Title>
                <Divider className=" border-black border-2" />
                <ul className="list-disc ml-4">
                  {userInfo?.professionalcertificates.map(
                    (cert: any, index: number) => (
                      <li key={index} className="font-bold">
                        {cert.title} -{" "}
                        <span className="italic text-gray-500 font-normal">
                          {new Date(cert.year).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          })}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
          {/* Skills and Expertise */}
          <div className="mt-8">
            <Typography.Paragraph className="p-2 bg-[#D2C5FD] font-bold uppercase">
              Skills & Expertises
            </Typography.Paragraph>
            {mySkills &&
              mySkills.map((skill: any) => {
                const mySkill = skill.skill;
                return (
                  <Tag
                    key={skill.id}
                    className="text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-4 py-1"
                  >
                    {mySkill.name}
                  </Tag>
                );
              })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfilePreview;
