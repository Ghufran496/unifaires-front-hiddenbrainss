"use client";
import React, { Fragment } from "react";
// ant components
import { Col, Row } from "antd";
// App components
import WishlistSearchForm from "./WishlistSearchForm";
import CourseCard from "@/components/shared/cards/CourseCard";
// interface and props
import { CourseInt } from "@/app/utils/interface";

interface ICourse {
  id: string;
  title: string;
  slug: string;
  image: string;
  type: string;
  rating: number;
  creator: string;
  organizationName: string;
  students: number;
  progress?: number;
  description: string;
  ratingsCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// eslint-disable-next-line no-unused-vars
export const courses: ICourse[] = Array.from({ length: 20 }).map(
  (_, index) => ({
    id: `${index}`,
    title: `Product of a rigorous system design  ${index}`,
    slug: `product-of-a-rigorous-system-design-${index}`,
    creator: "Samuel Jackson",
    type: "paid",
    students: 240,
    organizationName: "Unifaires",
    welcomeMessage: "welcome",
    congratulationMessage: "welcome",
    price: `${1 + index}5${index + 2}0`,
    rating: 4.5,
    ratingsCount: 550,
    image: "/images/courses/laravel.jpg",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  })
);

const CourseList: React.FC = () => {
  return (
    <Fragment>
      <WishlistSearchForm />
      <Row gutter={[16, 16]}>
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
