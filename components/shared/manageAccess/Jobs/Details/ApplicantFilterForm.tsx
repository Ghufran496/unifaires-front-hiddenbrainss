/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useContext } from "react";
import { Col, Form, Input, Row, Select } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchSkills } from "@/redux/features/UserSlice";
import { RootState } from "@/redux/store";
import { CountryListOption } from "@/components/shared/CountryList/countryList";
import { experienceLevelOption } from "@/components/Constants";
import { jobDetailsContext } from "./JobDetailsContext";
import { SearchInputType } from "./Datatypes";

const JobApplicantFilterForm = () => {
  const jobContext = useContext(jobDetailsContext);
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
              placeholder="Search your jobs"
              onChange={(event) => {
                const searchObj: SearchInputType = {
                  ...jobContext?.searchParam,
                  searchTxt: event?.target?.value,
                };
                jobContext?.setSearchParam?.(searchObj);
                jobContext?.getApplicantList?.(searchObj);
              }}
              onSearch={(value) => {
                const searchObj: SearchInputType = {
                  ...jobContext?.searchParam,
                  searchTxt: value,
                };
                jobContext?.setSearchParam?.(searchObj);
                jobContext?.getApplicantList?.(searchObj);
              }}
              value={jobContext?.searchParam?.searchTxt}
            />
          </Form.Item>
        </Col>
        <Col xs={12} lg={6}>
          <Form.Item className="mb-0">
            <Select
              size="large"
              showSearch
              allowClear
              placeholder="Country"
              maxTagCount="responsive"
              optionFilterProp="children"
              style={{ border: "none" }}
              className="rounded-full bg-white"
              onChange={(value) => {
                const searchObj: SearchInputType = {
                  ...jobContext?.searchParam,
                  country: value,
                };
                jobContext?.setSearchParam?.(searchObj);
                jobContext?.getApplicantList?.(searchObj);
              }}
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
              mode="multiple"
              size="large"
              showSearch
              allowClear
              placeholder="Skills"
              maxTagCount="responsive"
              optionFilterProp="children"
              style={{ border: "none" }}
              className="rounded-full bg-white"
              onChange={(value) => {
                const searchObj: SearchInputType = {
                  ...jobContext?.searchParam,
                  skills: value,
                };
                jobContext?.setSearchParam?.(searchObj);
                jobContext?.getApplicantList?.(searchObj);
              }}
              filterOption={(input, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={skillsOptions}
            />
          </Form.Item>
        </Col>
        <Col xs={12} lg={6}>
          <Form.Item className="mb-0">
            <Select
              size="large"
              showSearch
              allowClear
              placeholder="Experience Level"
              maxTagCount="responsive"
              optionFilterProp="children"
              style={{ border: "none" }}
              className="rounded-full bg-white"
              onChange={(value) => {
                const searchObj: SearchInputType = {
                  ...jobContext?.searchParam,
                  experienceLevel: value,
                };
                jobContext?.setSearchParam?.(searchObj);
                jobContext?.getApplicantList?.(searchObj);
              }}
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

export default JobApplicantFilterForm;
