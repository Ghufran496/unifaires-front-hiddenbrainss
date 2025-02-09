"use client";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Typography } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Popup = ({ subPopUp, setSubPopUp }: any) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSubscribe = () => {
    if (status === "authenticated") {
      router.push("/user/payments/subscription");
    } else {
      router.push("/login");
    }
  };

  const closeModal = () => {
    setSubPopUp(false);
  };
  return (
    <div className=" ">
      <Modal
        open={subPopUp}
        // onCancel={closeModal}
        closable={false}
        onOk={closeModal}
        footer={false}
        styles={{
          body: {
            marginInline: -25,
            marginTop: -25,
          },
        }}
        closeIcon={<CloseOutlined className="text-white font-bold text-2xl" />}
        width={1000}
      >
        <div className="flex bg-[#495057] gap-10 p-4">
          <Typography.Title level={3} className="text-white font-semibold mr-4">
            Get ahead, Get more labor market intelligence & insights
          </Typography.Title>
        </div>

        <div className="p-[5%]">
          <Typography.Paragraph className="text-base text-center font-normal mt-4 px-10 leading-[22.4px] text-[#12355B] ">
            Jobs, education and funding opportunities from a diverse and curated
            selection of sources combined with labor intelligence, advanced
            skills matching, and gap analytics you need to succeed!
          </Typography.Paragraph>
          <div className="flex lg:flex-row md:flex-col flex-col justify-center gap-7">
            <Card className="lg:w-1/2 md:w-full w-full rounded-md shadow-lg p-2">
              <div className="h-full">
                <Typography.Paragraph className="font-bold text-lg m-0">
                  Pro Access
                </Typography.Paragraph>
                <Typography.Paragraph className="font-bold text-lg m-0">
                  For Individual & Consultants
                </Typography.Paragraph>
                <Typography.Title
                  level={3}
                  className="mt-4 text-purple-50 font-semibold  "
                >
                  $3/Year
                </Typography.Title>
                <Typography.Title level={3} className="font-bold ">
                  Billed annually
                </Typography.Title>
                <Typography.Paragraph className="text-base font-normal leading-[22.4px] text-[#12355B]">
                  Jobs, education and funding opportunities from a diverse and
                  curated selection of sources combined with labor intelligence,
                  advanced skills matching, and gap analytics
                </Typography.Paragraph>
              </div>
              <div className="flex lg:mt-24 mt-4 ml-auto h-full items-baseline">
                <Button
                  className="flex justify-center items-center text-white font-bold text-base bg-purple-50 rounded-[6.56px] w-full h-[50px]"
                  onClick={handleSubscribe}
                >
                  Subscribe
                </Button>
              </div>
            </Card>
            <Card className="lg:w-1/2 md:w-full w-full rounded-md shadow-lg p-2">
              <Typography.Paragraph className="font-bold text-lg m-0">
                Pro Access
              </Typography.Paragraph>
              <Typography.Title className="font-bold text-lg m-0">
                For Organization
              </Typography.Title>
              <Typography.Title
                level={3}
                className="font-bold mt-4 font-Montserrat "
              >
                Customed Pricing
              </Typography.Title>
              <Typography.Paragraph className="text-base font-normal leading-[22.4px] mt-6 text-[#12355B]">
                Jobs, education and funding opportunities from a diverse and
                curated selection of sources combined with labor intelligence,
                advanced skills matching, and gap analytics. Customize your
                platform to meet your organization’s goals, access our
                proprietary e-learning data bases, and showcase your brands.
                Give your people the opportunity to achieve their potential. We
                offer a holistic approach to the corporate closing of skills and
                talent gaps.
              </Typography.Paragraph>
              <div className="flex mt-4 justify-center">
                <Button
                  href="/contact"
                  size="large"
                  className="flex justify-center items-center text-white font-bold text-base bg-purple-50 rounded-[6.56px] w-full h-[50px]"
                >
                  Request a Demo
                </Button>
              </div>
            </Card>
          </div>
        </div>
        <div className="ml-[72px] text-base font-normal mt-5">
          <p>
            Have a question or need help choosing the best plan?{" "}
            <span className="text-purple-50">
              <Link href={"/contact"}>Contact us</Link>
            </span>{" "}
          </p>
          <p className="mt-5 mb-5">
            Part of a group?{" "}
            <span className="text-purple-50">Access via institution</span>{" "}
          </p>
        </div>
      </Modal>
    </div>
  );
};
export default Popup;
