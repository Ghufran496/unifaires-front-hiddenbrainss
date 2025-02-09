"use client";
import { Fragment } from "react";
import { Typography, Divider, Button } from "antd";

interface BillingInt {
  next: Function;
  totalPrice: number;
}

const Summary = ({ next, totalPrice }: BillingInt) => {
  return (
    <Fragment>
      <div>
        <Typography.Title level={2} className="text-purple-600">
          Summary
        </Typography.Title>
        <Divider className="text-purple-500 border-1 mt-0 border-purple-600" />
        <div className="mt-8">
          <Typography.Paragraph className="mb-0">
            Your order summary
          </Typography.Paragraph>
          <Typography.Title level={3} className="m-0 font-bold">
            Total
          </Typography.Title>
          <div className="flex lg:flex-row justify-between md:flex-col sm:flex-col">
            <div>
              {/* <Typography.Paragraph className="m-0">
                User Invitation fee is 5 USD per User
              </Typography.Paragraph> */}
              <Typography.Paragraph className="font-semibold text-blue-500 text-lg m-0">
                {totalPrice}.00 USD
              </Typography.Paragraph>
              {/* <Typography.Paragraph className="m-0">
                User invite will be available for 1 month only - Please
                endeavour to update accordingly.
              </Typography.Paragraph> */}
            </div>
            <div className="border-2 border-blue-500 px-4 py-8 rounded-md">
              <Typography.Paragraph className="mb-0">
                Your order summary
              </Typography.Paragraph>
              <Typography.Paragraph className="font-bold text-lg m-0 text-blue-700">
                TOTAL: {totalPrice}.00 USD
              </Typography.Paragraph>
              {/* <Typography.Paragraph className="m-0 font-semibold">
                Standard User Invitation
              </Typography.Paragraph> */}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-4">
          <Button
            size="large"
            type="primary"
            className="ml-auto"
            onClick={() => next()}
            // loading={loading}
          >
            Proceed
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Summary;
