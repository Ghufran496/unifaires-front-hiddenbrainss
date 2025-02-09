"use client";
import React, { useEffect } from "react";
// ant components
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchSkills } from "@/redux/features/UserSlice";
import { stat } from "fs";
import { Reducer } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { CountryListOption } from "@/components/shared/CountryList/countryList";
import { experienceLevelOption } from "@/components/Constants";

const FundingApplicantFilterForm = ({
  setSearchTerms,
  setCountry,
  setExperienceLevel,
}: any) => {
  const [form] = Form.useForm();
  const dispatch: any = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSkills());
  }, []);

  const skillsOptions = useAppSelector(
    (state: RootState) => state.user.skillsOption
  );

  return (
    <Form form={form} className="pb-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Form.Item className="mb-0">
            <Input.Search
              size="large"
              placeholder="Search your applicant"
              onChange={(e) => setSearchTerms(e.target.value)}
              onSearch={(value) => setSearchTerms(value)}
            />
          </Form.Item>
        </Col>
        <Col xs={12} lg={6}>
          <Form.Item className="mb-0">
            <Select
              // mode="multiple"
              size="large"
              showSearch
              allowClear
              placeholder="Country"
              maxTagCount="responsive"
              optionFilterProp="children"
              style={{ border: "none" }}
              className="rounded-full bg-white"
              onChange={(e) => setCountry(e)}
              filterOption={(input, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={CountryListOption}
            />
          </Form.Item>
        </Col>
        <Col xs={12} lg={6}>
          <Form.Item className="mb-0">
            <Select
              // mode="multiple"
              size="large"
              showSearch
              allowClear
              placeholder="Experience Level"
              maxTagCount="responsive"
              optionFilterProp="children"
              style={{ border: "none" }}
              className="rounded-full bg-white"
              onChange={(e) => setExperienceLevel(e)}
              filterOption={(input, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={experienceLevelOption}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FundingApplicantFilterForm;
