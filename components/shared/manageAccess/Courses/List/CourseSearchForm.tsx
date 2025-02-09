/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useContext } from "react";
import { Form, Input } from "antd";
import { courseListContext } from "./couseListContext";
import { debounce } from "throttle-debounce";
import { CourseItemStatusType } from "./Datatypes";

const CourseSearchForm = () => {
  const [form] = Form.useForm();
  const courseContext = useContext(courseListContext);

  /**
   * Debounce handler
   */
  const debouncedChangeHandler = debounce(500, (value: string = "") => {
    if (courseContext?.setSearchTerms) {
      courseContext?.setSearchTerms(value);
    }
    performSearch(value);
  });

  /**
   * Perform searching
   */
  const performSearch = (searchVal: string = ""): void => {
    let status1: CourseItemStatusType = "active";
    if (courseContext?.menu?.activeKey === "archive") {
      status1 = "archive";
    }
    if (courseContext?.fetchDatas) {
      courseContext.fetchDatas({
        page: 1,
        status: status1,
        searchTxt: searchVal,
      });
    }
  };

  useEffect(() => {
    if (
      ["archive", "publishedCourses"].includes(courseContext?.menu?.activeKey)
    ) {
      form.resetFields(["courseSTxt"]);
    }
  }, [courseContext?.menu?.activeKey]);

  return (
    <Form form={form} className="py-6">
      <Form.Item name="courseSTxt" className="mb-0">
        <Input.Search
          size="large"
          placeholder="Search your course"
          onChange={(event) => {
            event.preventDefault();
            debouncedChangeHandler(event?.target?.value);
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default CourseSearchForm;
