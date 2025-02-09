"use client";
import React, { Fragment, useState } from "react";
// antd component
import {
  Form,
  Radio,
  Input,
  Button,
  message,
  TimePicker,
  DatePicker,
  Typography,
} from "antd";
import {
  AppleOutlined,
  SearchOutlined,
  GoogleOutlined,
  WindowsOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const LearningScheduleForm = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const steps = Array.from({ length: 3 });

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <Fragment>
      <Form form={form} layout="vertical" requiredMark>
        <div className="steps-content">
          <Typography.Paragraph type="secondary">
            Step {current + 1} of {steps.length}
          </Typography.Paragraph>
          {current > 0 && (
            <div className="flex gap-2 p-4 border rounded-lg bg-grey-50">
              <CalendarOutlined classID="stroke-purple-500" />
              <div className="flex-grow">
                <Typography.Title level={5} className="leading-none">
                  Time to learn!
                </Typography.Title>
                <Typography.Paragraph className="max-w-4xl">
                  Reminder notification 30min before
                </Typography.Paragraph>
              </div>
            </div>
          )}

          {current === 0 && (
            <>
              <Form.Item
                required
                label="Schedule Name"
                tooltip="Schedule name is required"
              >
                <Input placeholder="Time to learn" />
              </Form.Item>
              <Form.Item label="Choose from your most recent or search for courses">
                <Radio.Group>
                  <div className="flex flex-col gap-2">
                    <Radio value={1}>Feedback is fuel</Radio>
                    <Radio value={2}>None</Radio>
                  </div>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Select course">
                <Input
                  placeholder="Search course"
                  prefix={<SearchOutlined />}
                />
              </Form.Item>
            </>
          )}
          {current === 1 && (
            <div className="mt-4">
              <Form.Item label="Frequency">
                <Radio.Group defaultValue="weekly" buttonStyle="solid">
                  <Radio.Button value="once">Once</Radio.Button>
                  <Radio.Button value="daily">Daily</Radio.Button>
                  <Radio.Button value="weekly">Weekly</Radio.Button>
                  <Radio.Button value="monthly">Monthly</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Duration">
                <Radio.Group defaultValue="30" buttonStyle="solid">
                  <Radio.Button value="5">5 min</Radio.Button>
                  <Radio.Button value="10">10 min</Radio.Button>
                  <Radio.Button value="30">30 min</Radio.Button>
                  <Radio.Button value="60">1 hr</Radio.Button>
                  <Radio.Button value="custom">Custom</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Time">
                <TimePicker
                  use12Hours
                  format="h:mm:ss A"
                  style={{ width: 140 }}
                />
              </Form.Item>
              <Form.Item label="End date">
                <Radio.Group defaultValue={null}>
                  <div className="flex flex-col gap-2">
                    <Radio value={null}>None</Radio>
                    <Radio value={true}>
                      <DatePicker className="ml-1 w-4xl" />
                    </Radio>
                  </div>
                </Radio.Group>
              </Form.Item>
            </div>
          )}
          {current === 2 && (
            <div className="mt-4">
              <Form.Item label="Save your event">
                <Button icon={<GoogleOutlined />}>Sign in with Google</Button>
                <Button icon={<AppleOutlined />} className="mx-2">
                  Apple
                </Button>
                <Button icon={<WindowsOutlined />}>Outlook</Button>
              </Form.Item>
            </div>
          )}
        </div>
        <div className="mt-4 text-right steps-action">
          {current > 0 && (
            <Button className="mx-2" onClick={() => prev()}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button className="mx-2" type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
        </div>
      </Form>
    </Fragment>
  );
};

export default LearningScheduleForm;
