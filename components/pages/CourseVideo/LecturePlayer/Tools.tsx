"use client";
import React, { Fragment, useState } from "react";
import { Modal, Button, Typography } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
// app components
import Container from "@/components/shared/container";
import LearningScheduleForm from "./LearningScheduleForm";

const Tools = () => {
  const [openScheduleForm, setOpenScheduleForm] = useState(false);

  return (
    <Fragment>
      <Container className="pb-8">
        <Typography.Title level={2}>Learning reminders</Typography.Title>

        <Typography.Title level={4}>Calender events</Typography.Title>
        <Typography.Paragraph>
          Learning a little each day adds up. Research shows that students who
          make learning a habit are more likely to reach their goals. Set time
          aside to learn and get reminders using your learning scheduler.
        </Typography.Paragraph>
        <div className="mb-6">
          {/* schedule form */}
          <Typography.Text type="secondary" className="block mb-2">
            Requires Google Calendar, Apple Calendar, or Outlook
          </Typography.Text>
          <Button
            size="large"
            type="primary"
            onClick={() => setOpenScheduleForm(true)}
            className="flex items-center rounded-md"
          >
            Schedule learning time
            <PlusCircleFilled />
          </Button>
          <Modal
            centered
            footer={null}
            open={openScheduleForm}
            title="Create learning schedule"
            onOk={() => setOpenScheduleForm(false)}
            onCancel={() => setOpenScheduleForm(false)}
          >
            <LearningScheduleForm />
          </Modal>
        </div>
        <Typography.Title level={4}>Push notifications</Typography.Title>
        <Typography.Paragraph>
          Don’t want to schedule time blocks? Set a learning reminder to get
          push notifications from the Unifaires mobile app.
        </Typography.Paragraph>
        <Typography.Title level={5}>
          Text me a link to download the app
        </Typography.Title>
        <Typography.Paragraph>
          By providing your phone number, you agree to receive a one-time
          automated text message with a link to get app. Standard messaging
          rates may apply
        </Typography.Paragraph>
      </Container>
    </Fragment>
  );
};

export default Tools;
