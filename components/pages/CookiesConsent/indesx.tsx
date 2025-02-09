"use clients";
import { Button, Checkbox, Typography } from "antd";
import React, { useState, useEffect } from "react";
import type { GetProp } from "antd";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [manage, setManage] = useState(false);
  const [defaultOptions, setDefaultOptions] = useState<any>([
    "Functionality",
    "Analytics",
  ]);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    console.log("checked = ", checkedValues);
    setDefaultOptions(checkedValues);
  };

  const options = [
    {
      label: "Essential Purposes",
      value: "Essential",
      disabled: true,
    },
    { label: "Functionality", value: "Functionality" },
    { label: "Analytics", value: "Analytics" },
    { label: "Advertising", value: "Advertising" },
  ];

  return (
    <div className="flex justify-center">
      <div className="fixed bottom-6 p-6 z-10 bg-purple-70 rounded-lg max-w-[600px] ">
        {!manage ? (
          <div className="flex lg:flex-row md:flex-row flex-col gap-4 items-center justify-between">
            <p>
              We use cookies to ensure you get the best experience on our
              website.{" "}
              <Typography.Link href="/privacy" className="font-semibold">
                Learn more
              </Typography.Link>
            </p>
            <div className="flex gap-2 justify-center items-center">
              <Button
                onClick={handleAccept}
                className="border-blue-300 rounded-full border-2 flex items-center justify-center"
              >
                Accept
              </Button>
              <Button
                className="border-blue-300 rounded-full border-2 flex items-center justify-center"
                onClick={() => setManage(true)}
              >
                Manage
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <Typography.Paragraph className="font-bold text-base text-center">
              What can we use your data for?
            </Typography.Paragraph>
            <Checkbox.Group
              options={options}
              defaultValue={["Essential", ...defaultOptions]}
              onChange={onChange}
            />
            <Button
              onClick={() => setManage(false)}
              className="border-blue-300 rounded-full border-2 mt-4 flex items-center justify-center"
            >
              Confirm
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
