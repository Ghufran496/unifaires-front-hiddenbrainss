"use client";

import { Button, Card, Result, Spin, Typography } from "antd";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import logo from "@/public/images/logo 224.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { handleAxiosError } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import { toast } from "react-toastify";
import Link from "next/link";
const VerifyTokenPage = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const verificationToken = params && params.token;
  const userEmail = searchParams && searchParams.get("email");
  const [verifying, setVerifying] = useState(true);
  const [verifyFailed, setVerifyFailed] = useState(false);

  const verifyAccount = async () => {
    try {
      const res = await axiosInstance.post("/auth/verify-user-email", {
        token: verificationToken,
        email: userEmail,
      });

      if (res.status) {
        setVerifying(false);
        toast.success("Account Verified");
        router.push("/login");
      }
    } catch (error) {
      setVerifyFailed(true);
      handleAxiosError(error);
    }
  };

  useEffect(() => {
    if (verificationToken) {
      verifyAccount();
    }
  }, [verificationToken]);
  return (
    <div>
      <div className="flex justify-center xl:px-96 px-5 xl:py-20 py-5 ">
        <Card className="shadow-4xl xl:px-5 rounded-xl text-center w-[500px]">
          <div className="flex justify-center my-4">
            <Image src={logo} alt="logo" width={150} />
          </div>
          {verifying && !verifyFailed ? (
            <div>
              <Typography.Paragraph className="m-0 italic font-semibold text-gray-600">
                Please wait while we verify your account{" "}
              </Typography.Paragraph>

              <div className="my-10">
                <Spin tip="Verifying" size="large" />
                <Typography.Paragraph className="text-center pt-2 text-base italic text-gray-500">
                  Verifying
                </Typography.Paragraph>
              </div>
            </div>
          ) : !verifying && !verifyFailed ? (
            <div>
              <Result
                status="success"
                title="Account Verified Successfully!"
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
                Verification Failed
              </Typography.Paragraph>

              <div className="my-10">
                <Typography.Paragraph className="text-center pt-2 italic text-gray-500">
                  click{" "}
                  <span className="text-blue-700 font-bold hover:cursor-pointer hover:underline">
                    <Link href="/verify">here</Link>
                  </span>{" "}
                  to reset link
                </Typography.Paragraph>
              </div>
            </div>
          )}
          {/* {verifyFailed && (

          )} */}
        </Card>
      </div>
    </div>
  );
};

export default VerifyTokenPage;
