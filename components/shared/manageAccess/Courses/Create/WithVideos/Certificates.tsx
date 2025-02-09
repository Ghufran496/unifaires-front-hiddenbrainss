"use client";
import React, { Fragment, useState } from "react";
import { Button, Card, Col, Row, Typography } from "antd";
import {
  PlusOutlined,
  CloseOutlined,
  SafetyCertificateOutlined,
  MailOutlined,
} from "@ant-design/icons";
import CreateCertificateForm from "./CreateCertificateForm";

const Certificates = () => {
  const [completionAction, setCompletionAction] = useState(false);
  const [certificateSection, setCertificateSection] = useState(false);
  const handleAction = () => {
    setCompletionAction(!completionAction);
    setCertificateSection(false);
  };
  const handleCertificate = () => {
    setCertificateSection(true);
    setCompletionAction(true);
  };
  return (
    <Fragment>
      <div className="flex justify-between">
        <div>
          <Typography.Paragraph className="text-base">
            Completion
          </Typography.Paragraph>
        </div>
        <Button
          size="large"
          type="primary"
          className="rounded-md flex items-center justify-center"
          onClick={handleAction}
        >
          {completionAction || certificateSection ? (
            <CloseOutlined />
          ) : (
            <Fragment>
              <PlusOutlined />
              Add Completion Action
            </Fragment>
          )}
        </Button>
      </div>
      <Typography.Paragraph className="mt-4">
        Completion actions happen when a student completes a course
      </Typography.Paragraph>
      {!completionAction && (
        <div className="bg-gray-200 p-8 flex items-center justify-center rounded-md">
          <SafetyCertificateOutlined
            style={{
              fontSize: "6em",
              color: "purple",
            }}
          />
          <Typography.Paragraph>
            Set up certificate to go out once a student has completed this
            course.
          </Typography.Paragraph>
        </div>
      )}
      {completionAction && !certificateSection && (
        <div className="bg-gray-200 p-6">
          <Row gutter={[16, 16]} className="flex justify-between p-6">
            <Col xs={24} sm={12} lg={6}>
              <Card
                bordered={false}
                hoverable
                className="h-full text-center rounded-lg"
                onClick={handleCertificate}
              >
                <SafetyCertificateOutlined
                  style={{
                    fontSize: "4em",
                    color: "purple",
                  }}
                />
                <Typography.Paragraph className="mt-2">
                  Issue Certificate on Successful Completion
                </Typography.Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                bordered={false}
                hoverable
                className="h-full text-center rounded-lg"
              >
                <MailOutlined
                  style={{
                    fontSize: "4em",
                    color: "purple",
                  }}
                />
                <Typography.Paragraph className="mt-2">
                  Email Student on Completion
                </Typography.Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                bordered={false}
                hoverable
                className="h-full text-center rounded-lg"
              >
                <MailOutlined
                  style={{
                    fontSize: "4em",
                    color: "purple",
                  }}
                />
                <Typography.Paragraph className="mt-2">
                  Email Student on Failed Completion
                </Typography.Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                bordered={false}
                hoverable
                className="h-full text-center rounded-lg"
              >
                <MailOutlined
                  style={{
                    fontSize: "4em",
                    color: "purple",
                  }}
                />
                <Typography.Paragraph className="mt-2">
                  Email Organization on Completion
                </Typography.Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      )}
      {certificateSection && <CreateCertificateForm />}
    </Fragment>
  );
};

export default Certificates;
