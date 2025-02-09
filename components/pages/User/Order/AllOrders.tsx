"use client";
import { Button, Card, Form, Input, Modal, Select, Table } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ChevronRight } from "react-iconly";
import image from "@/public/images/orderimage.png";
import logo from "@/public/images/logo 224.png";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  description: string;
}

const AllOrders = () => {
  const [open, setOpen] = useState(false);

  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);
  const tableHeader = (
    <div className="flex justify-between bg-[#ADB5BD] p-4 bg-opacity-50">
      <h1 className="text-xl font-semibold">City</h1>
      <h1 className="text-xl font-semibold">Description</h1>
      <h1 className="text-xl font-semibold">UnitPrice(excl,VAT)</h1>
      <h1 className="text-xl font-semibold">Vat Rate</h1>
      <h1 className="text-xl font-semibold">Unit Price (Incl,VAT)</h1>
      <h1 className="text-xl font-semibold">Total Price (Incl,VAT)</h1>
    </div>
  );

  return (
    <div className="mt-8 ">
      <div className="flex">
        <div className="flex justify-between w-full">
          <div className="flex">
            <Link href="#" className="font-semibold text-[14px]">
              <p>Your Account</p>
            </Link>
            <div className="mt-[2px] px-2">
              <ChevronRight size={18} />
            </div>
            <Link href="#" className="text-purple-50 text-[14px] font-semibold">
              <p>Your Order</p>
            </Link>
          </div>
          <div>
            <Search
              className="mb-0 flex justify-end"
              placeholder="Search All Orders"
              onSearch={onSearch}
              enterButton
              size="large"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-6 mt-4">
        <p className="mt-2 text-base font-bold">
          3 Orders <span className="text-[#6c757d]">Placed in</span>{" "}
        </p>
        <Form.Item className="mb-0">
          <Select
            size="large"
            showSearch
            placeholder="Last 3 Months"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "last-3-months",
                label: "Last 3 Months",
              },
              {
                value: "last-month",
                label: "Last Month",
              },
            ]}
          />
        </Form.Item>
      </div>
      <div className="px-[10px] rounded-[16px] mt-[45px] mb-[45px]">
        <div className="flex justify-between gap-1 p-8 rounded-t-[16px] border-b-[#ADB5BD] bg-[#DEE2E680] ">
          <div>
            <p className="font-medium text-[#495057] text-xl">
              <span className="font-semibold text-[#212529] text-xl">
                Order Placed:
              </span>{" "}
              June 28, 2022
            </p>
          </div>
          <div>
            <p className="font-medium text-[#495057] text-xl">
              <span className="font-semibold text-[#495057] text-xl">
                Total:
              </span>{" "}
              $10.35
            </p>
          </div>
          <div>
            <p className="font-medium text-[#495057] text-xl">
              <span className="font-semibold text-[#495057] text-xl">
                Ship To:
              </span>{" "}
              Stormstr westfalen <br />
              472625, Germany
            </p>
          </div>
          <div>
            <p className="font-medium text-[#495057] text-xl">
              ORDER # 12823-73672432
            </p>
            <div className="text-[#5F38DD] flex gap-10 mt-2">
              <p className="cursor-pointer font-semibold  text-xl">
                View Order Details
              </p>
              <p
                onClick={() => setOpen(true)}
                className="cursor-pointer font-semibold text-xl"
              >
                View Invoice
              </p>
            </div>
          </div>
        </div>
        <div className=" rounded-b-[16px] border  bg-[#F8F9FA] ">
          <div className="flex justify-between border-b p-10">
            <div className="flex gap-6">
              <Image src={image} alt="..." />
              <div className="">
                <div className="mt-3">
                  <p className="font-semibold text-[22px] ">
                    Unifaires Learning
                  </p>
                  <p className="bg-[#343A40] font-medium bg-opacity-5 w-fit text-base  px-2 py-1 rounded-[26px] mt-4">
                    Unpaid
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-[#5F38DD] text-xl font-medium">
                <span className="font-semibold text-black text-xl">
                  Status:
                </span>{" "}
                Applied
              </p>
            </div>
            <div className="mt-3">
              <Button
                size="large"
                className="border-[#5F38DD] text-base font-medium text-[#5F38DD]"
              >
                Contact Seller
              </Button>
            </div>
          </div>
          <p className="text-[#5F38DD] text-xl font-semibold px-10 py-1">
            Archive Order
          </p>
        </div>

        <Modal
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
        >
          <div className="flex">
            <Image src={logo} alt="invoice logo" />
            <p className="text-2xl font-semibold">.com</p>
          </div>
          <h1 className="text-[32px] font-bold mt-2 text-center  ">INVOICE</h1>
          <div className="flex justify-between ">
            <div>
              <p className="text-lg font-semibold">
                Order Date:{" "}
                <span className="text-lg font-light ">28.08.2022</span>{" "}
              </p>
              <p className="text-lg font-semibold">
                Date of Supply:{" "}
                <span className="text-lg font-light ">28.08.2022</span>{" "}
              </p>
              <p className="text-lg font-semibold">
                Order ID:{" "}
                <span className="text-lg font-light ">
                  {" "}
                  DO1-73625425-65254424
                </span>{" "}
              </p>
              <p className="text-lg font-semibold">
                Order Date:{" "}
                <span className="text-lg font-light ">28.08.2022</span>{" "}
              </p>
              <p className="text-lg font-semibold mt-11">
                Invoice Date:{" "}
                <span className="text-lg font-light ">28.08.2022</span>{" "}
              </p>
              <p className="text-lg font-semibold">
                Invoice Number:{" "}
                <span className="text-lg font-light ">
                  ASL-INW-DE-2022-324763
                </span>{" "}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold">
                Unifaires.com Services LLC
              </p>
              <p className="text-lg font-semibold">
                202 Stormstr westfalen, Germany
              </p>
              <p className="text-lg font-semibold">VAT Number: EU82725424157</p>
              <Card className="rounded-2xl mt-11 ">
                <h1 className="text-lg font-semibold">Issued to:</h1>
                <p className="font-medium text-base">Samuel Jake</p>
                <p className="font-medium text-base">Stormstr 17</p>
                <p className="font-medium text-base">
                  NorthRhain-Westfalen 50997
                </p>
              </Card>
            </div>
          </div>
          <Card title={tableHeader}>
            <div className="flex justify-center ">
              <h1 className="text-xl font-semibold">1</h1>
              <h1 className="text-xl font-semibold">Prime Student Fee</h1>
              <h1 className="text-xl font-semibold">$7.49</h1>
              <h1 className="text-xl font-semibold">0%</h1>
              <h1 className="text-xl font-semibold">$7.49</h1>
              <h1 className="text-xl font-semibold">$7.49</h1>
            </div>
          </Card>
        </Modal>
      </div>
    </div>
  );
};

export default AllOrders;
