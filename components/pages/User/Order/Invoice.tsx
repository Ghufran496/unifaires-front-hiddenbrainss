"use client";
import { Button, Form, Input, Select } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ChevronRight } from "react-iconly";
import image from "@/public/images/orderimage.png";

const AllOrders = () => {
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);

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
              <p className="cursor-pointer font-semibold text-xl">
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
      </div>
    </div>
  );
};

export default AllOrders;
