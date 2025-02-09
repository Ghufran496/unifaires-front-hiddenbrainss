"use client";
import { Button, Input, Radio, Tag, Typography } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { RadioChangeEvent } from "antd/lib";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { createJobContext } from "./createJobContext";

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
  const addJobContext = useContext(createJobContext);
  const { jobCategories } = useSelector(
    (state: RootState) => state.jobCategory
  );
  const [categoryPicked, setCategoryPicked] = useState(null);
  const [searchTerms, setSearchTerms] = useState<string>("");

  const onChange = (event: RadioChangeEvent) => {
    setCategoryPicked(event?.target?.value);
    addJobContext?.setJobCategoryId(event?.target?.value);
  };

  const filteredCategories =
    jobCategories &&
    jobCategories.filter((cat: any) =>
      cat.name.toLowerCase().includes(searchTerms.toLowerCase())
    );

  return (
    <div>
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
            onChange={(event) => setSearchTerms(event?.target?.value)}
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
            onClick={(event) => {
              event.preventDefault();
              addJobContext?.steps?.prevPage?.();
            }}
          >
            Previous
          </Button>
          <Button
            size="large"
            type="primary"
            icon={<PlusOutlined />}
            className="rounded-md ml-auto flex justify-end items-center"
            onClick={addJobContext?.handleSave}
            loading={addJobContext?.pageLoading}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCategories;
