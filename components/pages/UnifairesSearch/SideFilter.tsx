"use client";
import { CloseOutlined, LeftOutlined, SearchOutlined } from "@ant-design/icons";

import { Col, Typography, Collapse, Radio, DatePicker, Grid } from "antd";
import Panel from "antd/es/cascader/Panel";
import datePicker from "antd/es/date-picker";
import { Title } from "chart.js";
import { Fragment, useState } from "react";
import axiosInstance from "@/app/utils/axios-config";
import { useRouter } from "next/navigation";
import { handleAxiosError } from "@/app/utils/axiosError";

const SideFilter = ({ category }: any) => {
  const screens = Grid.useBreakpoint();
  const router = useRouter();

  const handleCategoryClick = (id: any, name: string) => {
    router.push(`/search?categoryId=${id}`);
  };

  // console.log("here is ", category);
  return (
    <Fragment>
      <Col xl={6} sm={24} xs={24} className="lg:pr-10 md:pr-6 pr-4">
        <div>
          <Typography.Title level={3} className="pl-2 pt-2">
            Categories
          </Typography.Title>
        </div>
        <div className="max-h-[500px] overflow-y-scroll custom-scrollbar">
          {category && !Array.isArray(category) ? (
            <div>
              <div>
                <LeftOutlined />
                <Typography.Link
                  className="text-black hover:font-semibold"
                  onClick={() => router.push("/search")}
                >
                  All
                </Typography.Link>
              </div>
              <div>
                {category.ancestors &&
                  category.ancestors !== null &&
                  category.ancestors.map((parent: any) => {
                    return (
                      <div key={parent.id} className="flex flex-row gap-2 ">
                        <LeftOutlined />
                        <Typography.Link
                          className="text-black hover:font-semibold"
                          onClick={() =>
                            handleCategoryClick(parent.id, parent.name)
                          }
                        >
                          {parent.name}
                        </Typography.Link>
                      </div>
                    );
                  })}
              </div>
              <div className="flex flex-row gap-2 ">
                <Typography.Paragraph className="font-bold mb-0">
                  {category.name}
                </Typography.Paragraph>
              </div>
              {category?.children &&
                category?.children.map((child: any) => {
                  return (
                    <div key={child.id} className="ml-4">
                      <Typography.Link
                        className="text-black hover:font-semibold"
                        onClick={() =>
                          handleCategoryClick(child.id, child.name)
                        }
                      >
                        {child.name}
                      </Typography.Link>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div>
              <div className="ml-4">
                {/* <LeftOutlined /> */}
                <Typography.Link
                  className="text-black font-bold hover:text-blue-600"
                  onClick={() => router.push("/search")}
                >
                  All
                </Typography.Link>
              </div>
              {category &&
                category.map((eachCategory: any) => {
                  return (
                    <div key={eachCategory?.id} className="ml-4">
                      <Typography.Link
                        className="text-black hover:font-semibold"
                        onClick={() =>
                          handleCategoryClick(
                            eachCategory.id,
                            eachCategory.name
                          )
                        }
                      >
                        {eachCategory?.name}
                      </Typography.Link>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </Col>
    </Fragment>
  );
};

export default SideFilter;
