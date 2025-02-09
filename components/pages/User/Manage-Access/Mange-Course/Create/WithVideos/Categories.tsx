/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import config from "@/app/utils/config";
import { Button, Radio, Tag, Typography, message } from "antd";
import axios from "axios";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { RadioChangeEvent } from "antd/lib";
import { CourseContext } from "../CourseContext";
import axiosAccessInstance from "@/app/utils/businessAccess-axios-config";
import { toast } from "react-toastify";
import { handleAxiosError } from "@/app/utils/axiosError";

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
            <Radio value={category?.id}>
              {category?.name}
              <PlusOutlined
                onClick={() => handleToggle(category?.id)}
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
              {category?.name}
              <MinusOutlined
                onClick={() => handleUntoggle(category?.id)}
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
            <div className="ml-4" key={child?.id}>
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
        <Radio value={category?.id}>{category?.name}</Radio>
      </div>
    );
  }
};

interface CategoryStateInt {
  id: number;
  name: string;
}

const Categories = ({ prev, requestBody }: any) => {
  const router = useRouter();
  const params = useParams();
  const { fetchCourseData, courseData } = useContext(CourseContext);
  const [Categories, setCategories] = useState<Array<CategoryStateInt>>();
  const [categoryPicked, setCategoryPicked] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const [categoryName, setCategoryName] = useState();
  const CourseId = params.CourseId;

  useEffect(() => {
    if (
      typeof courseData?.data?.categoryId === "string" &&
      courseData.data.categoryId.trim() !== ""
    ) {
      setCategoryId(courseData.data.categoryId);
      axios
        .get(`${config.API.API_URL}/category/${courseData.data.categoryId}`)
        .then((res) => {
          setCategoryName(res?.data?.data?.name);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [courseData]);

  useEffect(() => {
    axios
      .get(`${config.API.API_URL}/category`)
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
        categoryId: categoryPicked,
      };
      const res = await axiosAccessInstance.put(`/manage-course/${CourseId}`, {
        ...categoryUpdate,
      });
      if (res?.status) {
        fetchCourseData();
        toast.success("Category Updated Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async () => {
    try {
      setLoading(true);
      requestBody["categoryId"] = categoryId;
      const res = await axiosAccessInstance.post("/manage-course", {
        ...requestBody,
      });

      if (res?.status) {
        message.success("Course Saved Successfully");
        if (requestBody?.isExternal) {
          router.push("/user/business-access/courses");
        } else {
          router.push(
            "/user/business-access/course/withvideos/" + res?.data?.data?.id
          );
        }
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {CourseId && (
        <div className=" mb-8">
          <Typography.Paragraph className="text-base font-semibold ">
            Category Picked -{" "}
          </Typography.Paragraph>
          {categoryName && (
            <Tag className="text-[#5832DA] ml-6 bg-[#D2C5FD] rounded-full border-none px-4 py-1">
              {categoryName}
            </Tag>
          )}
        </div>
      )}
      <Typography.Paragraph className="font-bold text-lg">
        Select Category
      </Typography.Paragraph>

      <div className="mt-2">
        <Radio.Group value={categoryPicked} onChange={onChange}>
          {Categories?.map((category) => {
            return (
              <TreeNode
                key={category?.id}
                category={category}
                categoryPicked={categoryPicked}
                onChange={onChange}
              />
            );
          })}
        </Radio.Group>
      </div>
      <div>
        {CourseId && (
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
        {!CourseId && (
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

export default Categories;
