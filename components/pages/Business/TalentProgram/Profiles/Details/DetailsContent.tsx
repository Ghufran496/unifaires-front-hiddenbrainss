"use client";
import React from "react";
// next
// antd and Icon components
import { Tag, Col, Divider, Row, Typography } from "antd";
import { MailOutlined, PhoneOutlined, GlobalOutlined } from "@ant-design/icons";
// app components

const DetailsContent = () => {
  return (
    <section className="">
      <Row className="mb-8">
        <Col lg={12}>
          <Typography.Title level={4}>About me</Typography.Title>
          <Typography.Paragraph className="leading-6">
            IBM is recognized as a cognitive solutions and cloud platform
            company with one purpose - to be essential to the world. We do this
            in part through innovative learning and credentialing programs that
            help develop and recognize the talent that fuels innovation to
            change the world. IBM&apos;s Digital Badge Program represents our
            latest endeavor for recognizing this talent through secure,
            verifiable digital credentials representing skill, achievement, and
            contribution. Earn and share your badge today!
          </Typography.Paragraph>

          <div className="mb-8">
            <Typography.Title level={4} className="">
              Languages:
            </Typography.Title>
            <ul className="list-disc">
              <li className="ml-4 mb-2">English - Professional</li>
              <li className="ml-4 mb-2">German - Intermediate</li>
            </ul>
          </div>
          <div className="mb-8">
            <Typography.Title level={4} className="">
              Personality & Hobbies:
            </Typography.Title>
            <ul className="list-disc">
              <li className="ml-4 mb-2">Music</li>
              <li className="ml-4 mb-2">Reading</li>
            </ul>
          </div>
          <div className="mb-8">
            <Typography.Title level={4} className="">
              What will you learn:
            </Typography.Title>
            <ul className="list-disc">
              <li className="ml-4 mb-2">The basics of HTML and CSS.</li>
              <li className="ml-4 mb-2">
                The core concepts in Javascript & Web development.
              </li>
            </ul>
          </div>
          <div className="mb-8">
            <Typography.Title level={4}>Contact</Typography.Title>
            <div className="flex flex-col gap-3 mb-4">
              <Typography.Text className="flex items-center gap-1 flex-nowrap text-base">
                <PhoneOutlined type="secondary" /> +49 5853 2453
              </Typography.Text>
              <Typography.Text className="flex items-center gap-1 flex-nowrap text-base">
                <MailOutlined type="secondary" />
                davemilly@gmail.com
              </Typography.Text>
              <Typography.Text className="flex items-center gap-1 flex-nowrap text-base">
                <GlobalOutlined type="secondary" /> 5th Avenue, Morgan Street
                San Francisco, USA
              </Typography.Text>
            </div>
          </div>
        </Col>
        <Col lg={12}>
          <div className="mb-8">
            <Typography.Title level={4} className="">
              Work Experience
            </Typography.Title>
            <ul className="list-disc">
              <li className="ml-4 mb-2">
                Quam nam elit ultricies quam quis aliquet quis. Sed dui diam
                eleifend nulla. Habitasse elit cursus ornare gravida nunc. Quam
                nunc massa cursus bibendum quam malesuada et, nunc ut. Massa est
                ipsum at est, amet, dictumst. Mauris sit in fringilla enim et a.
                Quam nam elit ultricies
              </li>
              <li className="ml-4 mb-2">
                quam quis aliquet quis. Sed dui diam eleifend nulla. Habitasse
                elit cursus ornare gravida nunc. Quam nunc massa cursus bibendum
                quam malesuada et, nunc ut. Massa est ipsum at est, amet,
                dictumst. Mauris sit in fringilla enim et a
              </li>
            </ul>
            <Typography.Title level={4} className="">
              Education
            </Typography.Title>
            <ul className="list-disc">
              <li className="ml-4 mb-2">
                Quam nam elit ultricies quam quis aliquet quis. Sed dui diam
                eleifend nulla. Habitasse elit cursus ornare gravida nunc. Quam
                nunc massa cursus bibendum quam malesuada et, nunc ut. Massa est
                ipsum at est, amet, dictumst. Mauris sit in fringilla enim et a.
                Quam nam elit ultricies
              </li>
              <li className="ml-4 mb-2">
                quam quis aliquet quis. Sed dui diam eleifend nulla. Habitasse
                elit cursus ornare gravida nunc. Quam nunc massa cursus bibendum
                quam malesuada et, nunc ut. Massa est ipsum at est, amet,
                dictumst. Mauris sit in fringilla enim et a
              </li>
            </ul>
            <Typography.Title level={4} className="">
              IT Service
            </Typography.Title>
            <ul className="list-disc">
              <li className="ml-4 mb-2">
                Quam nam elit ultricies quam quis aliquet quis. Sed dui diam
                eleifend nulla. Habitasse elit cursus ornare gravida nunc. Quam
                nunc massa cursus bibendum quam malesuada et, nunc ut. Massa est
                ipsum at est, amet, dictumst. Mauris sit in fringilla enim et a.
                Quam nam elit ultricies
              </li>
              <li className="ml-4 mb-2">
                quam quis aliquet quis. Sed dui diam eleifend nulla. Habitasse
                elit cursus ornare gravida nunc. Quam nunc massa cursus bibendum
                quam malesuada et, nunc ut. Massa est ipsum at est, amet,
                dictumst. Mauris sit in fringilla enim et a
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      <div className="mb-8">
        <Typography.Title level={4} className="">
          SKILLS & EXPERTISE
        </Typography.Title>
        <Divider />
        <Typography.Title level={5}>HI-FI Design</Typography.Title>
        <div className="flex flex-wrap gap-2 mb-6">
          <Tag className="rounded-full">Teamwork</Tag>
          <Tag className="rounded-full">Flexibility</Tag>
          <Tag className="rounded-full">Leadership</Tag>
          <Tag className="rounded-full">Communication</Tag>
          <Tag className="rounded-full">Problem-Solving</Tag>
          <Tag className="rounded-full">Adaptability</Tag>
          <Tag className="rounded-full">Creativity</Tag>
        </div>
        <Typography.Title level={5}>Wire-frame</Typography.Title>
        <div className="flex flex-wrap gap-2 mb-6">
          <Tag className="rounded-full">Teamwork</Tag>
          <Tag className="rounded-full">Flexibility</Tag>
          <Tag className="rounded-full">Communication</Tag>
          <Tag className="rounded-full">Problem-Solving</Tag>
          <Tag className="rounded-full">Creativity</Tag>
        </div>
        <Typography.Title level={4} className="mb-6">
          CAREER MAJOR PROGRAM
        </Typography.Title>
        <Divider />
        <div className="flex flex-wrap gap-2 mb-6">
          <Tag className="rounded-full">Teamwork</Tag>
          <Tag className="rounded-full">Flexibility</Tag>
          <Tag className="rounded-full">Leadership</Tag>
          <Tag className="rounded-full">Communication</Tag>
          <Tag className="rounded-full">Problem-Solving</Tag>
          <Tag className="rounded-full">Adaptability</Tag>
          <Tag className="rounded-full">Creativity</Tag>
        </div>
      </div>
    </section>
  );
};

export default DetailsContent;
