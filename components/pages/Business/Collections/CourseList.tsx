"use client";
import React, { Fragment } from "react";
// ant components
import { Col, Row, Button, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// App components
import CollectionSearchForm from "./CollectionSearchForm";

const courses = Array.from({ length: 20 }).map((_, index) => ({
  id: `${index}`,
  title: `Product of a rigorous system design  ${index}`,
  slug: `product-of-a-rigorous-system-design-${index}`,
  creator: "Samuel Jackson",
  students: 240,
  price: `${1 + index}5${index + 2}0`,
  rating: 4.5,
  ratingsCount: 550,
  organizationName: "unifaires",
  type: "free",
  instructors: [{}],
  meta: "",
  pricing: [],
  image: "/images/courses/laravel.jpg",
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
}));

const CourseList: React.FC = () => {
  return (
    <Fragment>
      <CollectionSearchForm />
      <div className="flex items-center gap-2 mb-2">
        <Typography.Title level={5}>Samuel Jake</Typography.Title>
        <Button
          type="text"
          shape="circle"
          title="Edit Collection"
          icon={<EditOutlined />}
        />
        <Button
          type="text"
          shape="circle"
          title="Delete Collection"
          icon={<DeleteOutlined />}
        />
      </div>
      <Row gutter={[16, 16]} className="mb-8">
        {courses.slice(0, 4).map((course) => {
          return (
            <Col key={`course-item-${course.id}`} md={12} lg={8} xl={6}>
              {/* <CourseCard {...course} /> */}
            </Col>
          );
        })}
      </Row>
      <div className="flex items-center gap-2 mb-2">
        <Typography.Title level={5}>Literature in English</Typography.Title>
        <Button
          type="text"
          shape="circle"
          title="Edit Collection"
          icon={<EditOutlined />}
        />
        <Button
          type="text"
          shape="circle"
          title="Delete Collection"
          icon={<DeleteOutlined />}
        />
      </div>
      <Row gutter={[16, 16]} className="mb-8">
        {courses.slice(0, 4).map((course) => {
          return (
            <Col key={`course-item-${course.id}`} md={12} lg={8} xl={6}>
              {/* <CourseCard {...course} /> */}
            </Col>
          );
        })}
      </Row>
    </Fragment>
  );
};

export default CourseList;
