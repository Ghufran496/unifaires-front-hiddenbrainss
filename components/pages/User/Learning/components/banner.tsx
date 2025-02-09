"use client";
import { Card, Space, Button, Typography, Divider } from "antd";
import { BsAlarm } from "react-icons/bs";
import { GiAlarmClock } from "react-icons/gi";
import { TbAlarm } from "react-icons/tb";

type BannerProps = {
  getStartedHandler: () => void;
  closeHandler: () => void;
};

const Banner = ({ getStartedHandler, closeHandler }: BannerProps) => {
  const { Text, Title } = Typography;
  return (
    <>
      <div className="xs:mx-auto rounded-[10px] border-[2px] w-[90%] border-[#000]">
        <div className="md:flex text-start  gap-8 p-4">
          <TbAlarm size={100} className=" " />
          <div>
            <div>
              <Title className="font-bold leading-[28.8px]" level={4}>
                Schedule learning time
              </Title>
              <Text className="font-medium font-Montserrat text-[#2F2E41]  ">
                Learning a little each day adds up. Research shows that students
                who make learning a habit are more likely to reach their goals.
                Set time aside to learn and get reminders using your learning
                scheduler.
              </Text>
            </div>
            <div className="flex md:justify-start gap-3 items-center justify-center md:gap-3 mt-8">
              <Button
                type="primary"
                className="flex items-center rounded-md flex-shrink-0 font-semibold leading-[28.71px]"
                onClick={getStartedHandler}
                size="large"
              >
                Get Started
              </Button>
              <Button
                className="flex items-center hover:rounded-md rounded-md text-black shadow-md font-semibold leading-6  bg-white"
                onClick={closeHandler}
                type="default"
                size="large"
              >
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default Banner;
