"use client";
import React from "react";
import { Row, Col, Typography, Select, Card, Button, Radio, Space } from "antd";
import type { RadioChangeEvent } from "antd";

const LanguagePage = () => {
  const { Paragraph, Title } = Typography;
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
  };

  return (
    <div>
      <section className="lg:px-20 px-5 py-20">
        <Row gutter={[16, 32]}>
          <Col xl={14} sm={24} xs={24}>
            <Row>
              <Col xl={24} sm={24} xs={24}>
                <Title level={4}>Language Settings</Title>
              </Col>

              <Col xl={24} sm={24} xs={24}>
                <Paragraph>
                  Select the language you prefer for browsing, shopping, and
                  communications.
                </Paragraph>
              </Col>

              <Col xl={24} sm={24} xs={24}>
                <Radio.Group onChange={onChange}>
                  <Space direction="vertical">
                    <Radio value={1}>English</Radio>
                    <Radio value={2}>Espanol</Radio>
                    <Radio value={3}>Deutsch</Radio>
                    <Radio value={4}>Portuges</Radio>
                    <Radio value={5}>Japanese</Radio>
                    <Radio value={6}>Francias</Radio>
                  </Space>
                </Radio.Group>
              </Col>
            </Row>
          </Col>

          <Col xl={10} sm={24} xs={24}>
            <Row>
              <Col xl={24} sm={24} xs={24}>
                <Card className="bg-grey-50 rounded-xl">
                  <Paragraph>
                    We will translate the most important information for your
                    browsing, shopping, and communications. Our translations are
                    provided for your convinience. The english version of
                    Unifaires.com, including our conditions of use, is the
                    definitive version. Learn more.
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </Col>

          <Col xl={24} sm={24} xs={24} className="py-5">
            <Row>
              <Col xl={24} sm={24} xs={24}>
                <Title level={4}>Currency Settings</Title>
              </Col>

              <Col xl={24} sm={24} xs={24}>
                <Paragraph>
                  Select the currency you prefer shopping with
                </Paragraph>
              </Col>
              <Col xl={8} sm={24} xs={24}>
                <Select
                  defaultValue="USD - US Dollar (Default)"
                  options={[
                    {
                      value: "USD - US Dollar (Default)",
                      label: "USD - US Dollar (Default)",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "disabled",
                      disabled: true,
                      label: "Disabled",
                    },
                    {
                      value: "Yiminghe",
                      label: "yiminghe",
                    },
                  ]}
                />
              </Col>
            </Row>
          </Col>

          <Col xl={4}>
            <Button block size="large" className="rounded-lg">
              Cancel
            </Button>
          </Col>

          <Col xl={4}>
            <Button type="primary" size="large" block className="rounded-lg">
              Save Changes
            </Button>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default LanguagePage;
