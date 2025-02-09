"use client";
import { useContext, useEffect } from "react";
import { Col, Form, Input, Row } from "antd";
import { fundingListContext } from "./FundingListContext";
import { debounce } from "throttle-debounce";

const FundingSearchForm = () => {
  const [form] = Form.useForm();
  const fundingContext = useContext(fundingListContext);

  /**
   * Debounce handler
   */
  const debouncedChangeHandler = debounce(500, (value: string = ""): void => {
    if (fundingContext?.setSearchTxt) {
      fundingContext.setSearchTxt(value);
    }
    performSearch(value);
  });

  /**
   * Perform searching
   */
  const performSearch = (searchVal: string = ""): void => {
    const status1 =
      fundingContext?.menu?.activeKey === "myFunding" ? "active" : "archive";
    if (fundingContext?.fetchList) {
      fundingContext.fetchList({
        page: 1,
        status: status1,
        searchTxt: searchVal,
      });
    }
  };

  useEffect(() => {
    if (
      ["myFunding", "archivedFunding"].includes(fundingContext?.menu?.activeKey)
    ) {
      form.resetFields(["fundingSTxt"]);
    }
  }, [fundingContext?.menu?.activeKey]);

  return (
    <Form form={form} className="pb-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={24}>
          <Form.Item name="fundingSTxt" className="mb-0">
            <Input.Search
              size="large"
              placeholder="Search your funding"
              onSearch={(value) => {
                debouncedChangeHandler(value);
              }}
              onChange={(event) => {
                debouncedChangeHandler(event?.target?.value);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FundingSearchForm;
