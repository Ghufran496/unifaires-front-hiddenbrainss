"use client";
import React from "react";
// ant components
import { Input, Select, Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
// app components
import Container from "@/components/shared/container";

const Notes = () => {
  return (
    <div className="pb-8">
      <Container>
        <Typography.Title level={4}>Lecture Notes</Typography.Title>
        <div className="mb-6 pb-6 border-b">
          <Input.TextArea
            rows={4}
            className="mb-6"
            placeholder="Create a new note at 0:15 "
          />
          <Button
            size="large"
            type="primary"
            icon={<PlusOutlined />}
            className="flex items-center text-right"
          >
            Add Note
          </Button>
        </div>
        <div className="note-header flex gap-4 items-center justify-between mb-6">
          <div className="grow">
            <Input.Search size="large" enterButton placeholder="Search notes" />
          </div>
          <div className="shrink-0">
            <Select
              size="large"
              defaultValue="all"
              style={{ width: 160 }}
              options={[
                {
                  value: "all",
                  label: "All notes",
                },
                {
                  value: "lectures",
                  label: "Lectures",
                },
              ]}
            />
          </div>
        </div>
        <div className="py-6 border-t">
          <div className="mb-6">
            <Typography.Title level={5}>
              Course Overview{" "}
              <span className="text-purple-500"> [00:00:00]</span>
            </Typography.Title>
            <Typography.Paragraph>
              My name is John Deo and I work as human duct tape at Gatsby, that
              means that I do a lot of different things. Everything from dev
              roll to writing content to writing code. And I used to work as an
              architect at IBM. I live in Portland, Oregon.
            </Typography.Paragraph>
          </div>
          <div className="mb-6">
            <Typography.Title level={5}>
              Introduction <span className="text-purple-500"> [00:00:50]</span>
            </Typography.Title>
            <Typography.Paragraph>
              My name is John Deo and I work as human duct tape at Gatsby, that
              means that I do a lot of different things. Everything from dev
              roll to writing content to writing code. And I used to work as an
              architect at IBM. I live in Portland, Oregon. My name is John Deo
              and I work as human duct tape at Gatsby, that means that I do a
              lot of different things. Everything from dev roll to writing
              content to writing code. And I used to work as an architect at
              IBM. I live in Portland, Oregon.
            </Typography.Paragraph>
          </div>
          <div className="mb-6">
            <Typography.Title level={5}>
              A Look at the Demo Application{" "}
              <span className="text-purple-500"> [00:00:45]</span>
            </Typography.Title>
            <Typography.Paragraph>
              My name is John Deo and I work as human duct tape at Gatsby, that
              means that I do a lot of different things. Everything from dev
              roll to writing content to writing code. And I used to work as an
              architect at IBM. I live in Portland, Oregon.
            </Typography.Paragraph>
            <Typography.Paragraph>
              My name is John Deo and I work as human duct tape at Gatsby, that
              means that I do a lot of different things. Everything from dev
              roll to writing content to writing code. And I used to work as an
              architect at IBM. I live in Portland, Oregon.
            </Typography.Paragraph>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Notes;
