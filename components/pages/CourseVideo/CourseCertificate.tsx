"use client";
import { Divider, Modal, QRCode, Typography } from "antd";
import Image from "next/image";
import { Fragment } from "react";
import beginner from "@/public/images/certifcateBadges/beginner.png";
import intermediate from "@/public/images/certifcateBadges/intermediate.png";
import expert from "@/public/images/certifcateBadges/expert.png";
import refresher from "@/public/images/certifcateBadges/refresher.png";
import comprehensive from "@/public/images/certifcateBadges/comprehensive.png";
import projectBased from "@/public/images/certifcateBadges/project-based.png";
import certificateBadge from "@/public/images/CertificateLevelBadge.png";
// import QRCode from "@/public/images/QR Code.png";
import UnifairesLogo from "@/public/images/logo 224.png";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import config from "@/app/utils/config";
const CourseCertificate = ({
  course,
  certificateInfo,
  previewCertificate,
  setPreviewCertificate,
  templateType,
}: any) => {
  const myProfile = useAppSelector((state: any) => state.user.myProfile);
  const metaInfo = certificateInfo && JSON.parse(certificateInfo.meta);
  const currentDate = new Date();
  const badgeImage =
    course && course?.level == "beginner"
      ? beginner
      : course?.level == "intermediate"
      ? intermediate
      : course?.level == "expert"
      ? expert
      : course?.level == "refresher"
      ? refresher
      : course?.level == "comprehensive"
      ? comprehensive
      : projectBased;

  const handleCloseModal = () => {
    setPreviewCertificate(false);
  };

  const defaultAddress = useAppSelector(
    (state: RootState) => state.address.defaultAddress
  );
  return (
    <Fragment>
      <Modal
        open={previewCertificate}
        onCancel={handleCloseModal}
        onOk={handleCloseModal}
        footer={null}
        styles={{
          body: {
            marginInline: -25,
            marginTop: -25,
          },
        }}
        width={800}
      >
        <div>
          {templateType && templateType === "certificate" ? (
            <div>
              {/* certificate template */}
              <div className="bg-[#5832DA]">
                <div className="p-8">
                  {metaInfo && metaInfo.logo ? (
                    <div className="flex gap-2 items-center mb-1">
                      <Image
                        src={badgeImage}
                        alt="badgeImage"
                        width={70}
                        height={70}
                        className="flex items-center justify-center object-center"
                      />
                      <Typography.Title className="m-0 text-white">
                        Certified
                      </Typography.Title>
                    </div>
                  ) : (
                    <Typography.Title className="text-white">
                      {course?.organizationName} Certified
                    </Typography.Title>
                  )}
                  <Typography.Paragraph className="text-white">
                    {course?.title}
                  </Typography.Paragraph>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center p-8">
                <div>
                  <Typography.Title
                    level={1}
                    className="uppercase text-center font-bold"
                  >
                    Certificate
                  </Typography.Title>
                  <Typography.Paragraph className="uppercase text-center font-semibold text-lg">
                    of completion
                  </Typography.Paragraph>
                </div>
                <div>
                  <Typography.Paragraph className="uppercase text-center text-md">
                    This cerificate is presented to
                  </Typography.Paragraph>
                  <Typography.Title level={3} className="uppercase text-center">
                    {myProfile.firstname} {myProfile.lastname}
                  </Typography.Title>
                  <Typography.Paragraph className="uppercase text-center text-xs w-[350px]">
                    Who has successfully completed the requirements to be
                    recognized as a {course?.organizationName} Certified{" "}
                    {course?.title}
                  </Typography.Paragraph>
                </div>
                <div className="mt-4">
                  <Typography.Paragraph className="uppercase text-center text-md font-semibold">
                    Offered By
                  </Typography.Paragraph>
                  <Typography.Title
                    level={3}
                    className="uppercase text-center mt-0 font-bold"
                  >
                    {course?.organizationName}
                  </Typography.Title>
                </div>
                <div>{/* Image */}</div>
                <div className="flex flex-row gap-4 justify-between w-full mt-8">
                  <div className="w-1/3">
                    <Typography.Paragraph className="uppercase mb-2 text-center font-semibold">
                      {currentDate.toDateString()}
                    </Typography.Paragraph>
                    <Divider
                      className="m-2 font-bold"
                      style={{
                        color: "black",
                      }}
                    />
                    <Typography.Paragraph className="capitalize text-center">
                      Date Of achievement
                    </Typography.Paragraph>
                  </div>
                  {metaInfo?.showBadge && (
                    <div className="flex justify-center items-center w-1/3">
                      {/* BAdge Image */}
                      <Image
                        src={badgeImage}
                        alt="badgeImage"
                        width={150}
                        height={150}
                        className="flex items-center justify-center object-center"
                      />
                    </div>
                  )}
                  <div className="w-1/3">
                    {/* Signature Image */}
                    <div className="flex items-center justify-center">
                      <Image
                        src={metaInfo?.signature}
                        width={30}
                        height={30}
                        alt="signature"
                      />
                    </div>
                    <Divider
                      className="m-2 font-bold"
                      style={{
                        color: "black",
                      }}
                    />
                    <Typography.Paragraph className="capitalize mb-0 text-center font-semibold">
                      {metaInfo?.signatoryName}
                    </Typography.Paragraph>
                    <Typography.Paragraph className="capitalize text-center mt-0">
                      {metaInfo?.signatoryPostion}
                    </Typography.Paragraph>
                  </div>
                </div>
              </div>
              {/* Footer */}
              <div className="p-8 pt-0">
                <div className="mb-1">
                  <Image
                    src={UnifairesLogo}
                    alt="logo"
                    width={150}
                    objectFit="contain"
                    objectPosition="center"
                  />
                </div>
                <div className="flex flex-row gap-2">
                  {metaInfo?.showQRCode && (
                    <div>
                      <QRCode
                        errorLevel="H"
                        size={130}
                        value="https://unifaires.com/"
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-center">
                    {metaInfo?.showIssues && (
                      <Typography.Paragraph className="m-2">
                        Issued: {currentDate.toDateString()}
                      </Typography.Paragraph>
                    )}

                    {/* <Typography.Paragraph className="m-2">
                      Certificate No: 4232222
                    </Typography.Paragraph> */}
                    {metaInfo?.showVerifyUrl && (
                      <Typography.Link
                        href={`${config.API.FRONT_END_URL}/verify/${myProfile.username}`}
                        target="_blank"
                        className="m-2"
                      >
                        Verify: https://unifaires.com/verify/
                        {myProfile.username}
                      </Typography.Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12">
              <div className="flex flex-row justify-between">
                <div>
                  <Typography.Paragraph className="m-1 font-semibold text-base">
                    {defaultAddress?.address}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="m-1 font-semibold text-base">
                    {defaultAddress?.country},
                  </Typography.Paragraph>
                  <Typography.Paragraph className="m-1 font-semibold text-base">
                    {defaultAddress?.phoneNumber}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="m-1 font-semibold text-base">
                    {myProfile?.email}
                  </Typography.Paragraph>
                </div>
                <div className="flex flex-col gap-4">
                  {metaInfo && metaInfo.logo ? (
                    <div className="flex gap-2 items-center mb-1">
                      <Image
                        src={badgeImage}
                        alt="badgeImage"
                        width={70}
                        height={70}
                        className="flex items-center justify-center object-center"
                      />
                      <Typography.Title className="m-0 text-white">
                        Certified
                      </Typography.Title>
                    </div>
                  ) : (
                    <Typography.Title className=" font-bold m-0">
                      {course?.organizationName}
                    </Typography.Title>
                  )}

                  <Typography.Paragraph className="text-base text-center">
                    {currentDate.toDateString()}
                  </Typography.Paragraph>
                </div>
              </div>
              <Typography.Title
                level={4}
                className="uppercase font-bold text-center mt-6"
              >
                SUB: INTERNSHIP COMPLETION LETTER
              </Typography.Title>

              <div>
                <Typography.Paragraph>
                  We are glad to inform you that{" "}
                  <span className="font-bold">
                    {myProfile.firstname} {myProfile.lastname}
                  </span>{" "}
                  has successfully completed his internship with{" "}
                  <span className="font-bold">{course?.organizationName}</span>{" "}
                  form{" "}
                  <span className="font-bold">
                    29th June, 2023 - 21st August , 2023.
                  </span>
                </Typography.Paragraph>
                <Typography.Paragraph>
                  During his internship, he was exposed to the various
                  activities related to the course titled{" "}
                  <span className="font-bold">{course?.title}</span>
                </Typography.Paragraph>
                <Typography.Paragraph>
                  We found him extremely inquisitive and hardworking. He was
                  very much interested to learn the functions of our core
                  division and also willing to put his best efforts and get in
                  to the depth of the subject to understand it better. His
                  association with us was very fruitful and we wish him all the
                  best in his future endeavors.
                </Typography.Paragraph>
                <Typography.Paragraph className="font-bold">
                  For {course?.organizationName}.
                </Typography.Paragraph>
              </div>
              <div className="mt-[4rem] w-[250px]">
                {/* Signature Image */}
                <div className="flex items-center justify-center">
                  <Image
                    src={metaInfo?.signature}
                    width={30}
                    height={30}
                    alt="signature"
                  />
                </div>
                <Divider
                  className="m-2 font-bold"
                  style={{
                    color: "black",
                  }}
                />
                <Typography.Paragraph className="capitalize mb-0 text-center font-bold">
                  {metaInfo?.signatoryName}
                </Typography.Paragraph>
                <Typography.Paragraph className="capitalize text-center mt-0 font-bold">
                  {metaInfo?.signatoryPostion}
                </Typography.Paragraph>
              </div>

              <div className="border-t border-t-black mt-[6rem]">
                <Typography.Paragraph className="text-center font-bold mt-1">
                  Marketing- Internship Organization Industry 2-Internship
                  Organization Industry 3
                </Typography.Paragraph>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </Fragment>
  );
};

export default CourseCertificate;
