"use client";
import React, { useState } from "react";
import { Button, message, Steps } from "antd";
import LoginStep from "./VerificationSteps/Login";
import AddPhoneStep from "./VerificationSteps/AddPhone";
import VerifyNumber from "./VerificationSteps/VerifyNumber";
import VerificationSuccess from "./VerificationSteps/SuccessfulVerification";
import { useRouter } from "next/navigation";

const VerificationSteps: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const router = useRouter();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Login",
      content: <LoginStep />,
    },
    {
      title: "Add Number",
      content: <AddPhoneStep />,
    },
    {
      title: "Verify Number",
      content: <VerifyNumber />,
    },
    {
      title: "Verified",
      content: <VerificationSuccess />,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  return (
    <>
      <Steps current={current} items={items} />
      <div>{steps[current].content}</div>
      <div className="mb-6 flex justify-center">
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              return (
                message.success("Verification completed!"),
                router.push("/user/settings/privacy")
              );
            }}
          >
            Done
          </Button>
        )}
      </div>
    </>
  );
};

export default VerificationSteps;
