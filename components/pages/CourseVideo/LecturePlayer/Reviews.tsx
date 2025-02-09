"use client";
import React, { useEffect, useState } from "react";
// ant components
import {
  Rate,
  List,
  Input,
  Select,
  Avatar,
  Progress,
  Typography,
  Pagination,
  Spin,
} from "antd";
import { CheckOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
// app components
import Container from "@/components/shared/container";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";

export const reviews = Array.from({ length: 3 }).map((_, index) => ({
  id: `${index}`,
  title: "Mary Lee ",
}));

const Reviews = ({ course }: any) => {
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [courseReviews, setCourseReviews] = useState();
  const [searchTerms, setSearchTerms] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalReviews, setTotalReviews] = useState(0);

  const totalRating =
    course &&
    course?.ratingsCount?.one +
      course?.ratingsCount?.two +
      course?.ratingsCount?.three +
      course?.ratingsCount?.four +
      course?.ratingsCount?.five;

  const fetchCourseReviews = async (page: any) => {
    if (course) {
      try {
        setLoadingReviews(true);
        const query = buildQuery({
          review: searchTerms,
          page,
          limit: pageSize,
        });
        const res = await axiosInstance.get(
          `/courses-reviews/course/${course.id}${query}`
        );

        if (res.status) {
          const data = res.data.data.reviews;
          setCourseReviews(data);
          setTotalReviews(data.total_reviews);
          setCurrentPage(data.current_page);
        }
      } catch (error) {
        handleAxiosError(error);
      } finally {
        setLoadingReviews(false);
      }
    }
  };

  const buildQuery = (params: { [key: string]: any }) => {
    const query = Object.entries(params)
      .filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    return query ? `?${query}` : "";
  };

  useEffect(() => {
    fetchCourseReviews(currentPage);
  }, [course, currentPage, searchTerms]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <div>
        <Typography.Title level={3}>Student Feedback</Typography.Title>
        <div className="flex w-full items-center justify-center lg:flex-row md:flex-row flex-col  gap-4">
          <div className="">
            <Typography.Title level={2} className="text-center text-6xl mb-2">
              {course?.averageRating || 0}
            </Typography.Title>
            <div className="flex justify-center">
              <Rate disabled value={course?.averageRating || 0} />
            </div>
            <Typography.Title level={5} className="text-center">
              Course Rating
            </Typography.Title>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 mb-0 ">
              <Rate disabled value={5} className="[&>li]:mr-1" />
              <Typography.Text type="warning">
                {(
                  totalRating &&
                  (course?.ratingsCount?.five / totalRating) * 100
                ).toFixed(2)}
                %
              </Typography.Text>
            </div>
            <div className="flex items-center gap-1 mb-0 ">
              <Rate disabled value={4} className="[&>li]:mr-1" />
              <Typography.Text type="warning">
                {(
                  totalRating &&
                  (course?.ratingsCount?.four / totalRating) * 100
                ).toFixed(2)}
                %
              </Typography.Text>
            </div>
            <div className="flex items-center gap-1 mb-0 ">
              <Rate disabled value={3} className="[&>li]:mr-1" />
              <Typography.Text type="warning">
                {(
                  totalRating &&
                  (course?.ratingsCount?.three / totalRating) * 100
                ).toFixed(2)}
                %
              </Typography.Text>
            </div>
            <div className="flex items-center gap-1 mb-0 ">
              <Rate disabled value={2} className="[&>li]:mr-1" />
              <Typography.Text type="warning">
                {(
                  totalRating && (course?.ratingsCount?.two / totalRating) * 100
                ).toFixed(2)}
                %
              </Typography.Text>
            </div>
            <div className="flex items-center gap-1 mb-0 ">
              <Rate disabled value={1} className="[&>li]:mr-1" />
              <Typography.Text type="warning">
                {(
                  totalRating && (course?.ratingsCount?.one / totalRating) * 100
                ).toFixed(2)}
                %
              </Typography.Text>
            </div>
          </div>
        </div>

        <div className="py-6">
          <Typography.Title level={4}>Reviews</Typography.Title>
          <div className="review-header flex gap-4 items-center justify-between mb-6">
            <div className="grow">
              <Input.Search
                size="large"
                enterButton
                placeholder="Search reviews"
                value={searchTerms}
                onChange={(e) => setSearchTerms(e.target.value)}
                onSearch={(value) => setSearchTerms(value)}
              />
            </div>
          </div>
          <div className="review-list">
            <Spin spinning={loadingReviews}>
              <List
                itemLayout="horizontal"
                dataSource={courseReviews}
                renderItem={(item: any) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar size={48} className="bg-purple-400">
                          <UserOutlined />
                        </Avatar>
                      }
                      title={
                        <div className="">
                          <div className="review-header flex items-center gap-2 mb-1">
                            <Typography.Title level={5} className="mb-0">
                              {item.user.firstname} {item.user.lastname}
                            </Typography.Title>
                          </div>
                          <Rate disabled value={item.rating} />
                        </div>
                      }
                      description={
                        <div className="">
                          <Typography.Paragraph>
                            {item.review}
                          </Typography.Paragraph>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Spin>
            <div className=" flex justify-center items-center mt-2">
              <Pagination
                current={currentPage}
                total={totalReviews}
                pageSize={pageSize}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
