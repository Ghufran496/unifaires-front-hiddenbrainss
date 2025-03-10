/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import config from "@/app/utils/config";
import { Button, Input, Radio, Tag, Typography, message } from "antd";
import axios from "axios";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { RadioChangeEvent } from "antd/lib";
import { FundingContext } from "../FundingContext";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getCookie } from "cookies-next";
import logo from "@/public/images/logo.png";

let selectedCategories: Array<number> = [];

const TreeNode = ({ category, categoryPicked, onChange }: any) => {
  const [showCheckbox, setShowCheckbox] = useState(true);
  const [showChild, setShowChild] = useState(false);

  // const onChange = (e: CheckboxChangeEvent, id: number) => {
  //   if (e.target.checked) {
  //     selectedCategories.push(id);
  //     console.log("here is the selected categories", selectedCategories);
  //   } else {
  //     const index = selectedCategories.indexOf(id);
  //     selectedCategories.splice(index, 1);
  //   }
  // };

  const handleToggle = (id: number) => {
    setShowCheckbox(!showCheckbox);
    setShowChild(!showChild);
    const index = selectedCategories.indexOf(id);

    selectedCategories.splice(index, 1);
  };
  const handleUntoggle = (id: number) => {
    setShowCheckbox(!showCheckbox);
    setShowChild(!showChild);
  };
  if (category?.children) {
    return (
      <div className=" p-2">
        {showCheckbox ? (
          <div>
            {/* <Radio value={1}>
              show me <PlusOutlined />
            </Radio>
            <Radio value={2}>get out</Radio>
            <Radio value={3}>How are</Radio> */}
            <Radio value={category.id}>
              {category.name}
              <PlusOutlined
                onClick={() => handleToggle(category.id)}
                className=" ml-4 text-blue-800"
              />
            </Radio>
            {/* <PlusOutlined
              onClick={() => handleToggle(category.id)}
              className="text-blue-800"
            /> */}
          </div>
        ) : (
          <div className="flex flex-row">
            <Typography.Paragraph>
              {category.name}
              <MinusOutlined
                onClick={() => handleUntoggle(category.id)}
                className="pb-2 pl-4 text-blue-800"
              />
            </Typography.Paragraph>
            {/* <MinusOutlined
              onClick={() => handleUntoggle(category.id)}
              className="pb-2 pl-4 text-blue-800"
            /> */}
          </div>
        )}
        {category?.children.map((child: any) => {
          return (
            <div className="ml-4" key={child.id}>
              {showChild && (
                <div>
                  {/* <Radio.Group value={categoryPicked} onChange={onChange}> */}
                  <TreeNode
                    category={child}
                    // onChange={onChange}
                    // categoryPicked={categoryPicked}
                  />
                  {/* </Radio.Group> */}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="p-2">
        <Radio value={category.id}>{category.name}</Radio>
      </div>
    );
  }
};

interface CategoryStateInt {
  id: number;
  name: string;
}

const FundingCategories = ({ prev, requestBody, next }: any) => {
  const router = useRouter();
  const { fetchFundingData, fundingData } = useContext(FundingContext);
  const [Categories, setCategories] = useState<Array<CategoryStateInt>>();
  const [categoryPicked, setCategoryPicked] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const params = useParams();
  const FundingId = params?.FundingId;
  const [searchTerms, setSearchTerms] = useState<string>("");
  const myProfile: any = useAppSelector(
    (state: RootState) => state.user.myProfile
  );

  useEffect(() => {
    axios
      .get(`${config.API.API_URL}/funding-category`)
      .then((res) => {
        setCategories(res?.data?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onChange = (e: RadioChangeEvent) => {
    setCategoryPicked(e?.target?.value);
    setCategoryId(e?.target?.value);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const categoryUpdate = {
        fundingcategoryId: categoryPicked,
      };
      const res = await axiosInstance.put(`/funding/business/${FundingId}`, {
        ...categoryUpdate,
      });
      if (res.status) {
        fetchFundingData();
        showSuccess("Category Updated Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const getFullUrl = (relativePath: any) => {
    const host =
      (typeof window !== "undefined" && window.location.origin) ||
      "http://localhost:3000"; // Fallback to localhost
    return `${host}${
      relativePath.startsWith("/") ? relativePath : `/${relativePath}`
    }`;
  };

  /**
   * Get JSON parse
   */
  const getContactJSONParse = (inputStr: string = ""): any => {
    try {
      const result = JSON.parse(inputStr);
      return {
        address1:
          typeof result?.data?.regionName === "string" &&
          result.data.regionName.trim() !== ""
            ? result.data.regionName
            : "NA",
        city:
          typeof result?.data?.city === "string" &&
          result.data.city.trim() !== ""
            ? result.data.city
            : "NA",
        state:
          typeof result?.data?.regionName === "string" &&
          result.data.regionName.trim() !== ""
            ? result.data.regionName
            : "NA",
        zipcode:
          typeof result?.data?.zip === "string" && result.data.zip.trim() !== ""
            ? result.data.zip
            : "NA",
        country:
          typeof result?.data?.country === "string" &&
          result.data.country.trim() !== ""
            ? result.data.country
            : "NA",
      };
    } catch (error) {
      return {
        address1: "NA",
        city: "NA",
        state: "NA",
        zipcode: "NA",
        country: "NA",
      };
    }
  };

  const handleFinish = async () => {
    try {
      setLoading(true);
      requestBody["fundingcategoryId"] = categoryId;
      let data = {
        ...requestBody,
      };
      data.contact = [
        {
          firstname: myProfile?.firstname,
          lastname: myProfile?.lastname,
          email: myProfile?.email,
          profileMediaUrl:
            typeof myProfile?.imageUrl === "string" &&
            myProfile.imageUrl.trim() !== ""
              ? myProfile.imageUrl
              : getFullUrl(logo?.src),
          ...getContactJSONParse(getCookie("ipInfo")),
        },
      ];
      const res = await axiosInstance.post("/funding", data);

      if (res?.data?.data?.id) {
        message.success("Funding Saved Successfully");
        router.push("/business/funding/create/" + res.data.data.id);
      } else {
        message.error("Validation Error. Select a Category");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories =
    Categories &&
    Categories.filter((cat: any) =>
      cat.name.toLowerCase().includes(searchTerms.toLowerCase())
    );

  return (
    <div>
      {FundingId && (
        <div className=" mb-8">
          <Typography.Paragraph className="text-base font-semibold ">
            Category Picked -{" "}
          </Typography.Paragraph>
          {typeof fundingData?.data?.fundingCategory?.name === "string" &&
            fundingData.data.fundingCategory.name.trim() !== "" && (
              <Tag className="text-[#5832DA] ml-6 bg-[#D2C5FD] rounded-full border-none px-4 py-1">
                {fundingData.data.fundingCategory.name}
              </Tag>
            )}
        </div>
      )}
      <div className="max-h-[500px] overflow-y-scroll custom-scrollbar">
        <Typography.Paragraph className="font-bold text-lg">
          Select Category
        </Typography.Paragraph>
        <div className="p-2">
          <Input.Search
            size="large"
            className=""
            placeholder="Search..."
            enterButton
            allowClear
            onChange={(e) => setSearchTerms(e.target.value)}
            onSearch={(value) => setSearchTerms(value)}
          />
        </div>

        <div className="mt-2">
          <Radio.Group value={categoryPicked} onChange={onChange}>
            {filteredCategories?.map((category) => {
              return (
                <TreeNode
                  key={category.id}
                  category={category}
                  categoryPicked={categoryPicked}
                  onChange={onChange}
                />
              );
            })}
          </Radio.Group>
        </div>
      </div>
      <div>
        {FundingId && (
          <div className="steps-action mt-4 flex justify-between items-center">
            <Button
              size="large"
              type="primary"
              icon={<PlusOutlined />}
              className="rounded-md ml-auto flex justify-end items-center"
              onClick={handleUpdate}
              loading={loading}
            >
              Update
            </Button>
          </div>
        )}
        {FundingId && (
          <div className="steps-action mt-4 flex justify-between items-center">
            <Button
              size="large"
              type="primary"
              icon={<PlusOutlined />}
              className="rounded-md ml-auto flex justify-end items-center"
              onClick={() => next()}
            >
              Next
            </Button>
          </div>
        )}
        {!FundingId && (
          <div className="steps-action mt-4 flex justify-between items-center">
            <Button size="large" onClick={() => prev()}>
              Previous
            </Button>
            <Button
              size="large"
              type="primary"
              icon={<PlusOutlined />}
              className="rounded-md ml-auto flex justify-end items-center"
              onClick={handleFinish}
              loading={loading}
            >
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FundingCategories;
