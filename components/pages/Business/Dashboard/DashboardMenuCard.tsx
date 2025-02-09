"use client";
import React from "react";
// next component
import NextLink from "next/link";
// antd components
import { Card, Typography } from "antd";

export interface DashboardMenuCardPops {
  link: string;
  title: string;
  icon: React.ReactNode;
  description: React.ReactNode;
}

const DashboardMenuCard = ({
  link,
  icon,
  title,
  description,
}: DashboardMenuCardPops) => {
  return (
    <NextLink href={link}>
      <Card hoverable className="h-full text-center rounded-lg">
        <Typography.Title level={1} className="mb-0 text-purple-500">
          {icon}
        </Typography.Title>
        <Typography.Title level={4} className="mt-1">
          {title}
        </Typography.Title>
        <Typography.Paragraph>{description}</Typography.Paragraph>
      </Card>
    </NextLink>
  );
};

export default DashboardMenuCard;
