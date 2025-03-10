/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRef } from "react";
import { Button, Card, Result, Spin, Typography } from "antd";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import logo from "@/public/images/logo 224.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { handleAxiosError } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import { toast } from "react-hot-toast";
import config from "@/app/utils/config";
import ResetPassword from "./ResetPassword";

const VerifyInviteToken = () => {
  const router = useRouter();
  const params = useSearchParams();
  const urlPathname = usePathname();
  const userEmail = params && params?.get("email");
  const [verifying, setVerifying] = useState(true);
  const [verifyFailed, setVerifyFailed] = useState(false);
  const callCountRef = useRef(0);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [acceptTimer, setAcceptTimer] = useState<any>(undefined);
  const [responseErrorMsg, setResponseErrorMsg] = useState<string>("");

  const verifyAccount = async (verificationToken: string) => {
    try {
      const res = await axiosInstance.post("/invite/accept-invite", {
        token: verificationToken,
        email: userEmail,
      });
      if (res?.status) {
        toast.success("Invitation Accepted");
        if (!res?.data?.data?.isUserExist) {
          getPasswordResetToken();
        } else {
          const timer1 = setTimeout(() => {
            router.push("/login");
          }, 2000);
          setAcceptTimer(timer1);
        }
      }
    } catch (error) {
      const msg1 = handleAxiosError(error);
      if (typeof msg1 === "string" && msg1.trim() !== "") {
        setResponseErrorMsg(msg1);
      } else {
        setResponseErrorMsg("Acceptance Failed");
      }
      setVerifyFailed(true);
    }
  };

  /**
   * Send reset password email
   */
  async function getPasswordResetToken() {
    try {
      const response = await axiosInstance.post(
        `${config.API.API_URL}/auth/reset-user-token`,
        { email: userEmail }
      );

      if (response.status) {
        setIsTokenModalOpen(true);
      }
    } catch (error) {
      const msg1 = handleAxiosError(error);
      if (typeof msg1 === "string" && msg1.trim() !== "") {
        setResponseErrorMsg(msg1);
      } else {
        setResponseErrorMsg("Acceptance Failed");
      }
      setVerifyFailed(true);
    }
  }

  useEffect(() => {
    if (
      typeof urlPathname === "string" &&
      urlPathname.trim() !== "" &&
      callCountRef.current === 0
    ) {
      callCountRef.current = 1;
      let verificationToken: any =
        typeof urlPathname === "string" ? urlPathname : "";
      verificationToken = verificationToken.split("/");
      verificationToken =
        typeof verificationToken?.[2] === "string" ? verificationToken[2] : "";
      verifyAccount(verificationToken);
    }
  }, [urlPathname]);

  useEffect(() => {
    return () => {
      if (acceptTimer) {
        clearTimeout(acceptTimer);
      }
    };
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-center xl:px-96 px-5 xl:py-20 py-5 ">
          <Card className="shadow-4xl xl:px-5 rounded-xl text-center w-[500px]">
            <div className="flex justify-center my-4">
              <Image src={logo} alt="logo" width={150} />
            </div>
            {verifying && !verifyFailed ? (
              <div>
                <Typography.Paragraph className="m-0 italic font-semibold text-gray-600">
                  Please wait while we process your acceptance{" "}
                </Typography.Paragraph>

                <div className="my-10">
                  <Spin tip="Verifying" size="large" />
                  <Typography.Paragraph className="text-center pt-2 text-base italic text-gray-500">
                    Accepting
                  </Typography.Paragraph>
                </div>
              </div>
            ) : !verifying && !verifyFailed ? (
              <div>
                <Result
                  status="success"
                  title="Invitation Accepted Successfully!"
                  subTitle="Please procceed to Login"
                  extra={[
                    <Button key="login" href="/login">
                      Login
                    </Button>,
                  ]}
                />
              </div>
            ) : (
              <div>
                <Typography.Paragraph className="m-0 italic font-semibold text-gray-600 text-lg">
                  {responseErrorMsg}
                </Typography.Paragraph>
              </div>
            )}
          </Card>
        </div>
      </div>
      <ResetPassword
        isTokenModalOpen={isTokenModalOpen}
        setIsTokenModalOpen={(isOpen: boolean) => {
          setIsTokenModalOpen(isOpen);
        }}
        email={userEmail}
        setVerifyStatus={(statusVal: boolean) => {
          setVerifying(statusVal);
        }}
        setVerifyFails={(statusVal: boolean) => {
          setVerifyFailed(statusVal);
        }}
      />
    </>
  );
};

export default VerifyInviteToken;
