"use client";
import { useState } from "react";
import { Typography, Button, Modal, Form, Row, Col, Input, Select } from "antd";
import Container from "@/components/shared/container";
import { PlusCircleFilled } from "@ant-design/icons";
// import LearningScheduleForm from "@/components/pages/Admin/Tools/LearningScheduleForm";
import CountryCode from "./CountryCode";
import Country from "@/components/shared/CountryList/countryList";

const LearningToolsTab = () => {
  const [openScheduleForm, setOpenScheduleForm] = useState(false);

  const getCountryOptions = () => {
    return (Country || []).map((country) => ({
      label: country.dial_code + " " + country.name,
      value: country.dial_code,
    }));
  };
  return (
    <>
      <section className="content-body">
        <Container className="mt-6 container-fluid">
          <Typography.Title
            className="text-[35px] font-bold leading-[42px]"
            level={3}
          >
            Learning Reminders
          </Typography.Title>
          <Typography.Title
            className="text-[25px] font-semibold leading-[30px]"
            level={5}
          >
            Calender events
          </Typography.Title>
          <Typography.Paragraph className="text-lg leadning-[28.71px] font-medium">
            Learning a little each day adds up. Research shows that students who
            make learning a habit are more likely to reach their goals. Set time
            aside to learn and get reminders using your learning scheduler.
          </Typography.Paragraph>
          <div className="mb-6">
            {/* schedule form */}
            <Typography.Text
              type="secondary"
              className="block my-4 text-sm leading-[22.33px] font-normal "
            >
              Requires Google Calendar, Apple Calendar, or Outlook
            </Typography.Text>
            <Button
              // size="large"
              type="primary"
              onClick={() => setOpenScheduleForm(true)}
              className="flex items-center w-[370px] h-[70px] text-xl font-bold leading-[31.9px] rounded-[5px] gap-[52px]"
            >
              Schedule learning time
              <PlusCircleFilled rev={undefined} />
            </Button>
            <Modal
              centered
              footer={null}
              open={openScheduleForm}
              title="Create learning schedule"
              onOk={() => setOpenScheduleForm(false)}
              onCancel={() => setOpenScheduleForm(false)}
            >
              {/* <LearningScheduleForm /> */}
            </Modal>
          </div>
          <Typography.Title
            className="text-[25px] font-semibold leading-[30px] "
            level={4}
          >
            Push notifications
          </Typography.Title>
          <Typography.Paragraph className="text-lg leadning-[28.71px] font-medium  ">
            Don&apos;t want to schedule time blocks? Set a learning reminder to
            get push notifications from the Unifaires mobile app.
          </Typography.Paragraph>
          <Typography.Title
            level={5}
            className="text-base leading-[19.2px] font-bold my-4"
          >
            Text me a link to download the app
          </Typography.Title>
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            className="lg:w-1/2"
          >
            <Row gutter={[8, 4]}>
              <Col xl={24} sm={24} xs={24} className="pt-5">
                <Form.Item
                  name="countryCode"
                  rules={[
                    {
                      message: "This field cannot be empty!",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={getCountryOptions()}
                  />
                </Form.Item>
              </Col>

              <Col xl={24} xs={24}>
                <Form.Item
                  name="description"
                  rules={[
                    {
                      message: "This field cannot be empty!",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    className=" py-3 "
                    placeholder="1234567890"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Typography.Paragraph className="text-lg font-normal leading-[28.71px]  ">
            By providing your phone number, you agree to receive a one-time
            automated text message with a link to get app. Standard messaging
            rates may apply
          </Typography.Paragraph>
        </Container>
      </section>
    </>
  );
};

export default LearningToolsTab;
