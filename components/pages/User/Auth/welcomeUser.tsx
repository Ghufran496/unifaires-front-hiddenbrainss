"use client";
import Container from "@/components/shared/container";
import { Button, Card, Typography, Divider } from "antd";
import logo from "@/public/images/purple-logo.svg";
import Image from "next/image";
import PublicLayout from "@/components/layouts/Public";
import { TwoUsers } from "react-iconly";
import { useRouter } from "next/navigation";
import Link from "next/link";

const WelcomeUser = () => {
  const { Title, Paragraph } = Typography;
  const router = useRouter();
  const homeHandler = () => {
    router.push("/user");
  };
  return (
    <PublicLayout>
      <Container className="xl:px-96 px-5 xl:py-20 py-5 text-center">
        <Image src={logo} alt="logo" width={150} />
        <Card className="shadow-4xl [&>div.ant-card-body]:p-0 mt-4 rounded-xl text-center">
          <Typography className="bg-[#F9FBFE] flex flex-col items-center py-6">
            <TwoUsers set="curved" primaryColor="#5832DA" size={64} />
            <Title level={4} className="text-center py-2 text-purple-50">
              Welcome, Ayodele
            </Title>
            <Paragraph className="text-[#343A40] text-left">
              We are excited to have you join the team!
            </Paragraph>
          </Typography>

          <Typography className="text-center pt-6">
            <Paragraph className="text-center text-xs text-purple-50">
              Your first day is:
            </Paragraph>
            <Paragraph className="text-black font-semibold text-xs">
              Tuesday, October 15, 2022 at 12:00pm
            </Paragraph>
            <Paragraph className="text-center text-xs text-purple-50">
              Location:
            </Paragraph>
            <Paragraph className="text-black font-semibold text-xs">
              Home
            </Paragraph>
          </Typography>
          <Divider className="mx-4" />
          <Typography className="text-center">
            <Paragraph className="text-black text-xs">
              We want you to get started outright. Click &nbsp;
              <Link href="/user" className="text-purple-50">
                <strong className="cursor-pointer text-purple-50">
                  Get Started
                </strong>
              </Link>
              <br /> and we will get you up and running at&nbsp;
              <span className="text-purple-50">Unifaires User</span>
            </Paragraph>
            <Button
              type="primary"
              size="large"
              className="my-3"
              onClick={homeHandler}
            >
              Get Started
            </Button>
          </Typography>
        </Card>
      </Container>
    </PublicLayout>
  );
};

export default WelcomeUser;
