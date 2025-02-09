"use client";
import DashboardHeader from "@/components/shared/dashboardHeader";
import { Breadcrumb } from "antd";
import VerificationSteps from "./VerificationSteps";

const TwoStepVerification = () => {
  return (
    <div className="px-6">
      <DashboardHeader
        title="2-Step Verification"
        para="Prevent hackers from accessing your account with an addittional layer of security. "
        para2="When you sign in, 2-Step verification helps make sure your personal information stays private, safe and secure."
      />
      <Breadcrumb separator=">" className="my-6">
        <Breadcrumb.Item href="/business/settings" className="bg-transparent">
          Settings
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href="/business/settings/privacy/verification"
          className="text-purple-50 bg-transparent"
        >
          2-Step Verification
        </Breadcrumb.Item>
      </Breadcrumb>
      <VerificationSteps />
    </div>
  );
};

export default TwoStepVerification;
