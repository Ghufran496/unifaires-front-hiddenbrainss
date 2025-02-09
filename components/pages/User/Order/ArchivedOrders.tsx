"use client";
import React from "react";
import { Button, Form, Input, Select } from "antd";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "react-iconly";
import image from "@/public/images/orderimage.png";

const ArchivedOrders = () => {
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);
  return (
    <div>
      <div>
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
                <Link
                  href="#"
                  className="text-purple-50 text-[14px] font-semibold"
                >
                  <p>Archived Order</p>
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
          {/* <div className="flex gap-6 mt-4">
          <p className="mt-2">3 Orders Placed in</p>
          <Form.Item className="mb-0">
            <Select
              size="large"
              showSearch
              placeholder="Last 3 Months"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
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
        </div> */}
          <div className="px-[75px] rounded-[16px] mt-[45px]">
            <div className="flex justify-between p-10 rounded-t-[16px] border-b bg-[#ADB5BD] bg-opacity-50">
              <div>
                <p>
                  <span className="font-semibold">Order Placed:</span> June 28,
                  2022
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">Total:</span> $10.35
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">Ship To:</span> Stormstr
                  westfalen <br />
                  472625, Germany
                </p>
              </div>
              <div>
                <p>ORDER # 12823-73672432</p>
                <div className="text-[#5F38DD] flex gap-10 mt-2">
                  <p className="cursor-pointer">View Order Details</p>
                  <p className="cursor-pointer">View Invoice</p>
                </div>
              </div>
            </div>
            <div className=" rounded-b-[16px] border  bg-[#F8F9FA] ">
              <div className="flex justify-between border-b p-10">
                <div className="flex gap-6">
                  <Image src={image} alt="..." />
                  <div className="">
                    <div>
                      <p>Unifaires Learning</p>
                      <p className="bg-[#00A945] text-[#00A945] bg-opacity-5 w-fit text-[12px] px-2 py-1 rounded-[26px] mt-4">
                        Paid
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-[#5F38DD]">
                    <span className="font-semibold text-black">Status:</span>{" "}
                    Applied
                  </p>
                </div>
                <div>
                  <Button className="border-[#5F38DD] text-[#5F38DD]">
                    Contact Seller
                  </Button>
                </div>
              </div>
              <p className="text-[#5F38DD] px-10 py-1">Unarchive Order</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchivedOrders;
