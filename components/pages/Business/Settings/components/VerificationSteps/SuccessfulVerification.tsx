"use client";
import { Typography, Card, Button } from "antd";
import Link from "next/link";

const VerificationSuccess = () => {
  const { Title, Paragraph } = Typography;
  return (
    <div>
      <Card className="flex flex-col py-6 w-1/2 px-8 mx-auto text-center mt-16 mb-8 shadow-[0px_4px_24px_rgba(52,52,52,0.1)]">
        <Title level={5} className="text-purple-50 my-4">
          2-Step Verification Successful
        </Title>

        <Paragraph className="text-md my-6">
          Now that you&apos;ve seen how it works, click on the toogle to turn on
          2-step verification for your Unifaires Account
        </Paragraph>
        <Link href="/business/settings/privacy">
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className="my-4"
          >
            Back to settings
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default VerificationSuccess;
