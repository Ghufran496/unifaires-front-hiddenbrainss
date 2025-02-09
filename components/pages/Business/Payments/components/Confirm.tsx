"use client";
import config from "@/app/utils/config";
import {
  Typography,
  Divider,
  Form,
  Input,
  Button,
  Card,
  Collapse,
  message,
  Modal,
  Result,
} from "antd";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

interface AddressInt {
  id: number;
  address: string;
  country: string;
  city: string;
  fullname: string;
  phoneNumber: string;
  state: string;
}

interface ICard {
  id: string;
  brand: string;
  exp_month: number;
  exp_year: number;
  last4: string;
}

interface InviteInt {
  fullname: string;
  email: string;
  endDate: string;
  price: number;
  startDate: Date;
}
interface IProp {
  billingAddress: AddressInt | undefined;
  prev: Function;
  setCurrent: any;
  totalPrice: any;
  paymentEndPoint: string;
  selectedCard: ICard | undefined;
  requestBody: any;
}

const Confirm = ({
  billingAddress,
  prev,
  setCurrent,
  totalPrice,
  paymentEndPoint,
  selectedCard,
  requestBody,
}: IProp) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleMakePayment = async () => {
    setLoading(true);

    await axios
      .post(
        `${config.API.API_URL}/${paymentEndPoint}`,
        {
          ...requestBody,
        },
        {
          headers: {
            "x-token": session?.user?.token,
          },
        }
      )
      .then((res) => {
        message.success("Payment made Successfully");
        setIsModalOpen(true);
        setTimeout(function () {
          router.push("/business/payments");
        }, 2000);
      })
      .catch((error) => {
        message.error("Unable to Proccess Payment");
        console.log("this is the ", error);
      });

    setLoading(false);
  };
  return (
    <Fragment>
      <div className="flex lg:flex-row md:flex-row flex-col gap-8 p-4">
        <div className="flex-initial w-full">
          <Typography.Title level={3}>Review Your order</Typography.Title>
          <Divider className="mt-0" />
          <div>
            <Typography.Paragraph className="text-lg font-bold">
              Billing Address{" "}
              <span
                className="text-blue-600 font-normal text-sm cursor-pointer pl-2"
                onClick={() => prev()}
              >
                Change
              </span>
            </Typography.Paragraph>
            <Typography.Paragraph className="m-0">
              {billingAddress?.fullname}
            </Typography.Paragraph>
            <Typography.Paragraph className="m-0">
              {billingAddress?.city}
            </Typography.Paragraph>
            <Typography.Paragraph className="m-0">
              {billingAddress?.address}
            </Typography.Paragraph>
            <Typography.Paragraph className="m-0">
              {billingAddress?.country}
            </Typography.Paragraph>
          </div>
          <Divider />
          <div>
            <Typography.Paragraph className="text-lg font-bold">
              Payment method
              <span
                className="text-blue-600 font-normal text-sm cursor-pointer pl-2"
                onClick={() => {
                  setCurrent(1);
                }}
              >
                Change
              </span>
            </Typography.Paragraph>
            <Typography.Paragraph>
              Ending in {selectedCard?.last4}
            </Typography.Paragraph>
          </div>
          <Divider />
          <div>
            <Typography.Paragraph>
              Add a gift card, vourcher or promotional code.
            </Typography.Paragraph>
            <Form.Item name="cupon">
              <div className="flex flex-row gap-6">
                <Input placeholder="Enter a Code" />
                <Button
                  size="large"
                  className="flex flex-row ml-auto bg-gray-200"
                >
                  Apply
                </Button>
              </div>
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-initial items-center px-10 w-[45%]">
          <Card className="w-max bg-gray-50">
            <Button
              type="primary"
              size="large"
              className="flex justify-center items-center w-full mb-4"
              onClick={handleMakePayment}
              loading={loading}
            >
              Place your order in USD
            </Button>
            <Typography.Paragraph className="text-gray-400">
              By clicking to place your order, you agree to unifaires terms of
              use and privacy policy.
            </Typography.Paragraph>
            <Divider />
            <div>
              <Typography.Paragraph className="font-semibold">
                ORDER SUMMARY
              </Typography.Paragraph>
              <Typography.Paragraph className="flex">
                Items:
                <span className="ml-auto text-purple-600 font-bold">
                  ${totalPrice}.00
                </span>
              </Typography.Paragraph>
              <Typography.Paragraph className="flex">
                Shopping & Handling:
                <span className="ml-auto text-purple-600 font-bold">$0.00</span>
              </Typography.Paragraph>
              <Typography.Paragraph className="flex">
                Total before tax:
                <span className="ml-auto text-purple-600 font-bold">
                  ${totalPrice}.00
                </span>
              </Typography.Paragraph>
              <Typography.Paragraph className="flex">
                Estimated tax to be collected:
                <span className="ml-auto text-purple-600 font-bold">$0.00</span>
              </Typography.Paragraph>
              <Divider />
              <div className="w-full">
                <Typography.Title level={4} className=" flex text-red-800">
                  Payment Total:{" "}
                  <span className="text-lg text-purple-600 ml-auto">
                    USD {totalPrice}.00
                  </span>
                </Typography.Title>
                <Collapse ghost size="small">
                  <Collapse.Panel
                    key={"Payment-Currency"}
                    header={
                      <Typography.Paragraph className="mb-0">
                        Selected Payment Currency
                      </Typography.Paragraph>
                    }
                  ></Collapse.Panel>
                  <Collapse.Panel
                    key={"Exchange-Rate"}
                    header={
                      <Typography.Paragraph className="mt-0">
                        Applicable Exchange Rate
                      </Typography.Paragraph>
                    }
                  ></Collapse.Panel>
                </Collapse>
              </div>
            </div>
          </Card>
        </div>
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Result
            status="success"
            title="Payment Successfull"
            subTitle="Please wait while we redirect you"
          />
        </Modal>
      </div>
    </Fragment>
  );
};

export default Confirm;
