"use client";
import { useContext } from "react";
import { List, Skeleton } from "antd";
import CourseItem from "./CourseItem";
import CourseSearchForm from "./CourseSearchForm";
import { courseListContext } from "./couseListContext";

export const courses = Array.from({ length: 20 }).map((_, index) => ({
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

const CourseList = () => {
  const courseContext = useContext(courseListContext);

  return (
    <>
      <CourseSearchForm />
      <div className="bg-white rounded-lg pb-3">
        <Skeleton active loading={courseContext?.pageLoading} className="p-4">
          <List
            size="large"
            itemLayout="vertical"
            dataSource={
              Array.isArray(courseContext?.dataList)
                ? courseContext.dataList
                : []
            }
            renderItem={(course) => <CourseItem course={course} />}
          />
        </Skeleton>
      </div>
    </>
  );
};

export default CourseList;
