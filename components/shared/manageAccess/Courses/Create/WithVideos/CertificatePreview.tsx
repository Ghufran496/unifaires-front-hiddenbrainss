"use client";
import { Divider, Modal, Typography } from "antd";
import Image from "next/image";
import { Fragment } from "react";
import certificateBadge from "@/public/images/CertificateLevelBadge.png";
import QRCode from "@/public/images/QR Code.png";
import UnifairesLogo from "@/public/images/logo 224.png";
const PreviewCertificate = ({
  previewCertificate,
  setPreviewCertificate,
  templateType,
}: any) => {
  const handleCloseModal = () => {
    setPreviewCertificate(false);
  };
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
                  <Typography.Title className="text-white">
                    {"{{Organisation Logo}}"} Certified
                  </Typography.Title>
                  <Typography.Paragraph className="text-white">
                    {"{{Course Title}}"}
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
                    {"{{Student Name}}"}
                  </Typography.Title>
                  <Typography.Paragraph className="uppercase text-center text-xs w-[350px]">
                    Who has successfully completed the requirements to be
                    recognized as a {"{{Organisation Name}}"} Certified{" "}
                    {"{{Course Title}}"}
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
                    {"{{Organisation Name}}"}
                  </Typography.Title>
                </div>
                <div>{/* Image */}</div>
                <div className="flex flex-row gap-4 justify-between w-full mt-8">
                  <div className="w-1/3">
                    <Typography.Paragraph className="uppercase mb-2 text-center font-semibold">
                      {"{{Completion Date}}"}
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
                  <div className="flex justify-center items-center w-1/3">
                    {/* BAdge Image */}
                    <Image
                      src={certificateBadge}
                      alt="badgeImage"
                      width={150}
                      height={150}
                      className="flex items-center justify-center object-center"
                    />
                  </div>
                  <div className="w-1/3">
                    <Typography.Paragraph className="capitalize text-center font-semibold">
                      {"{{Signature}}"}
                    </Typography.Paragraph>

                    <Divider
                      className="m-2 font-bold"
                      style={{
                        color: "black",
                      }}
                    />
                    <Typography.Paragraph className="capitalize text-center font-semibold">
                      {"{{Signatory Owners Name}}"}
                    </Typography.Paragraph>
                    <Typography.Paragraph className="capitalize text-center">
                      {"{{Position of Signatory Owner}}"}
                    </Typography.Paragraph>
                  </div>
                </div>
              </div>
              {/* Footer */}
              <div className="p-8 pt-0">
                <div className="2-full">
                  <Image
                    src={UnifairesLogo}
                    alt="logo"
                    width={150}
                    objectFit="contain"
                    objectPosition="center"
                  />
                </div>
                <div className="flex flex-row gap-2">
                  <div>
                    <Image src={QRCode} alt="QRCode" width={100} height={100} />
                  </div>
                  <div>
                    <Typography.Paragraph className="m-2">
                      Issued: {"{{Issued Date}}"}
                    </Typography.Paragraph>
                    <Typography.Paragraph className="m-2">
                      Certificate No: {"{{Certificate Date}}"}
                    </Typography.Paragraph>
                    <Typography.Paragraph className="m-2">
                      View: https://verify.unifaires.com/
                      {"{{Student Username}}"}
                    </Typography.Paragraph>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12">
              <div className="flex flex-row justify-between">
                <div>
                  <Typography.Paragraph className="m-1">
                    PO BOX
                  </Typography.Paragraph>
                  <Typography.Paragraph className="m-1">
                    ADDRESS
                  </Typography.Paragraph>
                  <Typography.Paragraph className="m-1">
                    PHONE NUMBER
                  </Typography.Paragraph>
                  <Typography.Paragraph className="m-1">
                    EMAIL ADDRESS
                  </Typography.Paragraph>
                  <Typography.Paragraph className="m-1">
                    WEBSITE
                  </Typography.Paragraph>
                </div>
                <div className="flex flex-col justify-between">
                  <Image
                    src={UnifairesLogo}
                    alt="logo"
                    width={400}
                    objectFit="contain"
                    objectPosition="center"
                  />
                  <Typography.Paragraph className="text-base text-center">
                    {"{{Completion Date}}"}
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
                    {"{{Mr. Mirza Maaz Ali Baig}}"}
                  </span>{" "}
                  has successfully completed his internship at{" "}
                  <span className="font-bold">{"{{Scientechin}}"}</span> from{" "}
                  <span className="font-bold">
                    {"{{29th June, 2023 - 21st August , 2023.}}"}
                  </span>
                </Typography.Paragraph>
                <Typography.Paragraph>
                  During his internship, he was exposed to the various
                  activities in{" "}
                  <span className="font-bold">{"{{Course Title}}"}</span>
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
                  For {"{{Scientechnic}}"}.
                </Typography.Paragraph>
              </div>
              <div className="mt-[4rem] w-[250px]">
                <Typography.Paragraph className="font-bold m-1 text-center">
                  {"{{Signature}}"}
                </Typography.Paragraph>

                <Typography.Paragraph className="font-bold m-1 text-center">
                  Authorized Signatory
                </Typography.Paragraph>
                <Typography.Paragraph className="font-bold m-1 text-center">
                  Human Capital Department
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

export default PreviewCertificate;
