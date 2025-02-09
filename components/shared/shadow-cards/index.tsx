"use client";
import { Space, Typography, Card } from "antd";
import React from "react";

type CardProps = {
  cardInfo: { id: string; desc: string; title: string; shadowColor: string }[];
};
const ShadowCard = ({ cardInfo }: CardProps) => {
  const { Title, Text } = Typography;
  return (
    <>
      <Space
        direction="horizontal"
        className="gap-3 px-3 flex justify-center md:justify-start pb-6 flex-wrap"
      >
        {cardInfo.map((details) => (
          <Card
            key={details.id}
            style={{
              width: 144,
              boxShadow: `-12px 0px 1px 0px ${details.shadowColor}`,
            }}
            className="rounded-lg pl-0 border-gray-60 "
          >
            <Text className="text-gray-500 text-[calc(0.6rem_+_0.03vw)] leading-none font-Montserrat">
              {details.desc}
            </Text>
            <Title level={3} className="mt-1 font-Montserrat">
              {details.title}
            </Title>
          </Card>
        ))}
      </Space>
    </>
  );
};

export default ShadowCard;
