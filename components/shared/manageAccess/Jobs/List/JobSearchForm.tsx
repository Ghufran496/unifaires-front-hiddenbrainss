/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useContext, useEffect } from "react";
import { Form, Input } from "antd";
import { JobListContext } from "./JobListContext";
import { debounce } from "throttle-debounce";

const JobSearchForm = () => {
  const [form] = Form.useForm();
  const jobContext = useContext(JobListContext);

  /**
   * Debounce handler
   */
  const debouncedChangeHandler = debounce(500, (value: string = "") => {
    if (jobContext?.setSearchTerms) {
      jobContext.setSearchTerms(value);
    }
    performSearch(value);
  });

  /**
   * Perform searching
   */
  const performSearch = (searchVal: string = ""): void => {
    let status1 = "opened";
    if (jobContext?.menu?.activeKey === "archived") {
      status1 = "archived";
    } else if (jobContext?.menu?.activeKey === "pending") {
      status1 = "pending";
    }
    if (jobContext?.fetchJobs) {
      jobContext.fetchJobs({
        page: 1,
        status: status1,
        searchTxt: searchVal,
      });
    }
  };

  useEffect(() => {
    if (
      ["archived", "myJobs", "pending"].includes(jobContext?.menu?.activeKey)
    ) {
      form.resetFields(["jobSTxt"]);
    }
  }, [jobContext?.menu?.activeKey]);

  return (
    <Form form={form} className="pb-6">
      <Form.Item name="jobSTxt" className="mb-0">
        <Input.Search
          size="large"
          placeholder="Search your jobs"
          onSearch={(value) => {
            debouncedChangeHandler(value);
          }}
          onChange={(event) => {
            debouncedChangeHandler(event?.target?.value);
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default JobSearchForm;
