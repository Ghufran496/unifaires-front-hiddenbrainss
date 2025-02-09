"use client";
import { Button, Input, Radio, Tag, Typography } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { useParams } from "next/navigation";
import { RadioChangeEvent } from "antd/lib";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { editJobContext } from "./editContext";

const TreeNode = ({ category, categoryPicked, onChange }: any) => {
  const [showCheckbox, setShowCheckbox] = useState(true);
  const [showChild, setShowChild] = useState(false);

  const handleToggle = () => {
    setShowCheckbox(!showCheckbox);
    setShowChild(!showChild);
  };

  if (category?.children && category.next_child_count > 0) {
    return (
      <div className=" p-2">
        {showCheckbox ? (
          <div className="flex flex-row">
            <Typography.Paragraph>
              {category.name} ({category.next_child_count})
              <PlusOutlined
                onClick={handleToggle}
                className="ml-4 text-blue-800"
              />
            </Typography.Paragraph>
          </div>
        ) : (
          <div className="flex flex-row">
            <Typography.Paragraph>
              {category.name} ({category.next_child_count})
              <MinusOutlined
                onClick={() => handleToggle()}
                className="pb-2 pl-4 text-blue-800"
              />
            </Typography.Paragraph>
          </div>
        )}
        {showChild &&
          category?.children.map((child: any) => {
            return (
              <div className="ml-4" key={child.id}>
                {showChild && (
                  <div>
                    <TreeNode
                      category={child}
                      categoryPicked={categoryPicked}
                      onChange={onChange}
                    />
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

const JobCategories = () => {
  const jobContext = useContext(editJobContext);
  const { jobCategories } = useSelector(
    (state: RootState) => state.jobCategory
  );
  const [categoryPicked, setCategoryPicked] = useState(null);
  const categoryName = jobContext?.jobInfo?.jobcategory?.name;
  const params = useParams();
  const JobId = params?.JobId;
  const [searchTerms, setSearchTerms] = useState<string>("");

  const onChange = (e: RadioChangeEvent) => {
    setCategoryPicked(e.target.value);
  };

  const handleUpdate = async () => {
    const categoryUpdate = {
      jobcategoryId: categoryPicked,
    };
    jobContext?.handleSave(categoryUpdate);
  };

  const filteredCategories = (
    Array.isArray(jobCategories) ? jobCategories : []
  ).filter((cat: any) =>
    (typeof cat?.name === "string" ? cat.name : "")
      .toLowerCase()
      .includes(
        (typeof searchTerms === "string" ? searchTerms : "").toLowerCase()
      )
  );

  return (
    <div>
      {JobId && (
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
        <div className="steps-action mt-4 flex justify-between items-center">
          <Button
            size="large"
            type="primary"
            icon={<PlusOutlined />}
            className="rounded-md ml-auto flex justify-end items-center"
            onClick={handleUpdate}
            loading={jobContext?.pageLoading}
          >
            Update
          </Button>
        </div>
        <div className="steps-action mt-4 flex justify-between items-center">
          <Button
            size="large"
            type="primary"
            icon={<PlusOutlined />}
            className="rounded-md ml-auto flex justify-end items-center"
            onClick={(event) => {
              event.preventDefault();
              const stepNo =
                typeof jobContext?.steps?.current === "number"
                  ? jobContext.steps.current
                  : 0;
              jobContext?.steps?.setCurrent(stepNo + 1);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCategories;
