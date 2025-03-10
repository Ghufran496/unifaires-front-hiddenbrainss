"use client";
import { useParams, useRouter } from "next/navigation";
import Container from "@/components/shared/container";
import DashboardHeader from "@/components/shared/dashboardHeader";
import { Card, Typography, Space, Breadcrumb, Tag, Select, Button } from "antd";
import {
  Call,
  Message,
  Location,
  ArrowLeft,
  CaretLeft,
  ChevronRight,
} from "react-iconly";
import { TbAngle, TbMathGreater, TbWorld } from "react-icons/tb";
import Link from "next/link";
const Details = () => {
  const router = useRouter();
  const params = useParams();
  const talentId = params?.talentId as string;
  const { Text, Title } = Typography;
  const { Item } = Breadcrumb;
  const options = [
    { value: "Flora Miles", label: "Flora Miles" },
    { value: "Flora Mile", label: "Flora Mile" },
  ];
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <Container>
      <DashboardHeader
        title="Vetted Talent Program"
        para=" Check out Organisations that are making the most impact"
        para2="on Funding, Grants, & Scholarships"
      />

      <div className="flex">
        <Link
          href="/user/vetted-talent-program"
          className="font-semibold text-base"
        >
          <p>Vetted Talent Request</p>
        </Link>
        <ChevronRight />

        <Link
          href={`/user/vetted-talent-program/${talentId}`}
          className="text-purple-50 text-base font-semibold"
        >
          <p>Request Details</p>
        </Link>
      </div>
      <Title level={4} className="my-6 font-semibold text-[32px]   ">
        Frontend Developer
        <Tag className="bg-gray-200 px-4 rounded-full ml-4 font-semibold text-[12px] border-none">
          5 years experience
        </Tag>
      </Title>
      <Space size={50} className="mb-6">
        <Title level={5} className="text-base font-semibold  ">
          Requester Business Unit:
          <Select
            defaultValue={options[0].value}
            style={{ width: 120 }}
            onChange={handleChange}
            options={options}
            className="rounded-[30px] text-base font-semibold ml-3"
          />
        </Title>
        <Title level={5} className="text-base font-semibold">
          Requester:
          <Select
            defaultValue={options[0].value}
            style={{ width: 120 }}
            onChange={handleChange}
            options={options}
            className="rounded-[30px] text-base font-semibold ml-3"
          />
        </Title>
      </Space>
      <Card className="border-purple-50 bg-gray-100 w-2/3">
        <Title className="text-base font-semibold" level={5}>
          Unifares Account Manager:&nbsp;{" "}
          <Tag className="rounded-full text-base font-semibold px-5">
            Osho Matt
          </Tag>
        </Title>
        <Space size={30} className="my-6 ">
          <Text className="flex gap-2 text-base font-medium items-center">
            <Call set="bold" primaryColor="#5832DA" size={14} />
            +49 5853 2453
          </Text>
          <Text className="flex gap-2 text-base font-medium items-center">
            <Message set="bold" primaryColor="#5832DA" size={14} />
            osho.matt@unifaires.com
          </Text>
          <Text className="flex text-base font-medium gap-2 items-center">
            <TbWorld size={14} color="#5832DA" />
            www.unifaires.com
          </Text>
        </Space>
        <Space>
          <Text className="flex gap-2 text-base font-medium items-center">
            <Location set="bold" primaryColor="#5832DA" size={14} />
            5th Avenue, Morgan Street San Francisco, USA
          </Text>
        </Space>
      </Card>
      <Button
        type="primary"
        className="border-purple-50 border-2 bg-transparent py-[20px] text-center items-center px-10 text-purple-50 my-8 font-base font-bold flex justify-center"
      >
        See Job Details
      </Button>
    </Container>
  );
};

export default Details;
