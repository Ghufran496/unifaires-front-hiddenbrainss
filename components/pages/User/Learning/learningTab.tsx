"use client";
import {
  Card,
  Typography,
  Row,
  Col,
  Progress,
  Rate,
  Button,
  Dropdown,
  Menu,
  Input,
  Form,
  Spin,
  MenuProps,
  Popover,
  Modal,
  message,
  Skeleton,
  Popconfirm,
  Pagination,
} from "antd";
import { useEffect, useState } from "react";

import TabForm from "./components/tabForm";
import {
  BsChevronDown,
  BsEnvelope,
  BsFacebook,
  BsLinkedin,
  BsThreeDotsVertical,
  BsTwitter,
} from "react-icons/bs";
// import { Bookmark } from "react-iconly";

import CustomModal from "@/components/shared/CustomModal/CustomModal";
import { useRouter } from "next/navigation";
import { CreateArchiveCourse } from "../api";
import { toast } from "react-toastify";
import Image from "next/image";
import axiosInstance from "@/app/utils/axios-config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  course,
  deleteMyCourse,
  fetchCourseProgress,
} from "@/redux/features/CoursesSlice";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import { RootState } from "@/redux/store";
import ImageComponent from "@/components/shared/image";
import { buildQuery } from "@/app/utils/buildQuery";
import Link from "next/link";
import config from "@/app/utils/config";

interface allCourseInt {
  course: LearningDataProps;
  id: any;
}

export interface LearningDataProps {
  coursesreviews: any;
  courseProgress: any;
  id?: number;
  title?: string;
  meta: string;
  image: string;
  description?: string;
  organizationName?: string;
  aboutOrganization?: string;
  scope?: string;
  requirement?: string;
  target?: string;
  lang?: string;
  slug: any;
  level?: string;
  skills?: Array<string>;
  welcomeMessage?: string;
  congratulationMessage?: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: number;
}

const MyLearning = ({ activeTab }: any) => {
  const [form] = Form.useForm();
  const [banner, setBanner] = useState(true);
  const [loading, setLoading] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [itemId, setItemId] = useState("");
  const [isMarked, setIsMarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState<any>([]);
  const [rating, setRating] = useState(false);
  const [courseId, setCourseId] = useState();
  const [ratingValue, setRatingValue] = useState(0);
  const [fetchingCourse, setFetchingCourse] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [shareLink, setShareLink] = useState("");
  const [deleteCourse, setDeleteCourse] = useState(false);
  const [enrolId, setEnrolId] = useState();
  const dispatch: any = useAppDispatch();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  // const searchQuery: any = route.query.searchBy;
  const [myCategories, setMyCategories] = useState<any>([]);
  const [myInstructors, setMyInstructors] = useState<any>([]);
  const [categorySelected, setCategorySelected] = useState<any>();
  const [instructorSelected, setInstructorSelected] = useState<any>();
  const [businessList, setBusinessList] = useState<any>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<any>();

  const fetchBusinessList = async () => {
    try {
      const res = await axiosInstance.get(
        "/enrol-course/my-course-organization"
      );
      if (res.status) {
        const resData = res.data.data;
        // console.log("here is the course organization ", res.data.data);
        const businessOptions = resData.map((business: any) => {
          // return business.companyName;
          return {
            label: business,
            value: business,
          };
        });
        setBusinessList(businessOptions);
      }
    } catch (error) {
      // console.log("Here is the error", error);
      return null;
    }
  };

  useEffect(() => {
    fetchBusinessList();
  }, []);

  const fetchMyCourses = async (page: any) => {
    try {
      setFetchingCourse(true);

      // Build the base query string excluding category and instructor
      const queryParams = {
        title: searchQuery,
        page,
        limit: pageSize,
        categoryId: categorySelected,
        organizationName: selectedBusiness,
      };
      const query = buildQuery(queryParams);

      // Construct the base URL
      let url = `/enrol-course/my-course${query}`;

      // Append instructor path if selected
      if (instructorSelected) {
        url = `/enrol-course/my-course/instructor?id=${instructorSelected}`;
      }

      // Fetch the courses
      const res = await axiosInstance.get(url);
      if (res.status) {
        const resData = res.data.data;
        setCourseData(resData.enrolcourse);
        setCurrentPage(resData.currentPage);
        setTotalCourses(resData.count);
        setFetchingCourse(false);
      }
    } catch (error) {
      console.log("error fetching courses", error);
    } finally {
      setFetchingCourse(false);
    }
  };

  useEffect(() => {
    fetchMyCourses(currentPage);
  }, [
    activeTab,
    searchQuery,
    currentPage,
    categorySelected,
    instructorSelected,
    selectedBusiness,
  ]);

  const fetchMyCourseCategories = async () => {
    try {
      const res = await axiosInstance.get("/enrol-course/my-course-categories");

      if (res.status) {
        const resData = res.data.data.categories;
        const categoriesOption =
          resData &&
          resData.map((cat: any) => {
            return {
              label: cat.name,
              value: cat.id,
            };
          });
        setMyCategories(categoriesOption);
        // console.log("here my categories", res);
      }
    } catch (error) {
      console.log("unable to fetch my courses category", error);
    }
  };

  const fetchMyCourseInstructors = async () => {
    try {
      const res = await axiosInstance.get(
        "/enrol-course/my-course-instructors"
      );

      if (res.status) {
        const resData = res.data.data.instructors;
        const instructorsOption =
          resData &&
          resData.map((inst: any) => {
            return {
              label: inst.name,
              value: inst.id,
            };
          });
        setMyInstructors(instructorsOption);
      }
    } catch (error) {
      console.log("unable to fetch my courses category", error);
    }
  };

  useEffect(() => {
    fetchMyCourseCategories();
    fetchMyCourseInstructors();
  }, []);

  const handleDeleteCourse = async () => {
    await dispatch(deleteMyCourse(enrolId)).then((res: any) => {
      if (res.type === "course/deleteMyCourse/fulfilled") {
        toast.success("Course deleted successfully");
        fetchMyCourses(currentPage);
      } else {
        handleAxiosError(res.error);
        toast.error("Unable to delete course");
        console.log("error", res);
      }
    });
  };

  const cancel = (e: any) => {
    console.log(e);
  };
  // console.log("here is the course", courseData);

  const handleArchive = async (id: any) => {
    const payload = {
      courseId: id,
    };

    try {
      const res = await axiosInstance.post("/archieve-course/user", payload);
      if (res.status) {
        showSuccess("Course Archived");
        fetchMyCourses(currentPage);
      }
    } catch (error) {
      handleAxiosError(error);
      console.log(error);
    }
  };

  const { Search } = Input;
  const onSearch = async (value: string) => {
    await navigator.clipboard.writeText(value);
    showSuccess("Link Copied Successfully");
  };
  const onFinish = async (val: any) => {
    console.log(val);
  };

  const getStartedHandler = () => {
    console.log("hi");
  };

  const closeHandler = () => {
    setBanner(false);
  };

  const handleMenuClick = (key: any, course: any) => {
    setShareLink(`${config.API.FRONT_END_URL}/courses/${course.slug}`);
    if (key === "share") {
      setShareModal(true);
    }
    if (key.includes("create")) {
      setCreateModal(true);
    }
  };

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  const MenuItem = ({ allCourse }: any) => {
    const course = allCourse?.course;
    return (
      <Menu className="text-4 border-none font-medium text-[#2D2D2D]">
        <Menu.Item
          className="h-[43px] "
          key="share"
          onClick={() => handleMenuClick("share", course)}
        >
          <span className="flex items-center justify-between">
            Share
            <BsChevronDown className="" />
          </span>
        </Menu.Item>

        <Menu.Item
          onClick={() => handleArchive(course?.id)}
          className="h-[43px]"
          key="archive"
        >
          Archive
        </Menu.Item>

        <Menu.Item className="h-[43px] text-red-500" key="favorite">
          <Popconfirm
            title="Delete Course"
            description="Are you sure you want to delete this course?"
            onConfirm={handleDeleteCourse}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            Delete
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );
  };

  const openRatingModal = (id: any) => {
    setRating(true);
    setCourseId(id);
  };

  const closeRating = () => {
    setRating(false);
  };

  const handleRating = async (value: any) => {
    setRatingValue(value);
  };

  const handleSubmit = async () => {
    const formData = form.getFieldsValue();
    setLoading(true);
    await axiosInstance
      .post("/courses-reviews", {
        courseId: courseId,
        rating: ratingValue,
        ...formData,
      })
      .then((res) => {
        toast.success("Review and Rating submitted successfully");
        setRating(false);
        fetchMyCourses(currentPage);
        form.resetFields();
      })
      .catch((error) => {
        handleAxiosError(error);

        console.log("Here is the error", error);
      });
    setLoading(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const resetFilters = () => {
    fetchMyCourses(currentPage);
    setCategorySelected("");
    setInstructorSelected("");
  };

  return (
    <div className="mb-4">
      {/* {banner && (
        <Banner
          getStartedHandler={getStartedHandler}
          closeHandler={closeHandler}
        />
      )} */}
      <TabForm
        setSearchQuery={setSearchQuery}
        setInstructorSelected={setInstructorSelected}
        setCategorySelected={setCategorySelected}
        setSelectedBusiness={setSelectedBusiness}
        businessList={businessList}
        myInstructors={myInstructors}
        myCategories={myCategories}
        resetFilters={resetFilters}
      />
      <Skeleton active loading={fetchingCourse}>
        <div className="flex justify-start  lg:flex-row md:flex-row flex-row lg:gap-6 md:gap-6 gap-2 mb-4 w-full flex-wrap">
          {courseData?.map((allCourse: allCourseInt) => {
            const course = allCourse.course;
            // console.log(course);
            const courseImage =
              course && course.image
                ? course.image
                : JSON.parse(course.meta).image;
            const courseProgress =
              (course &&
                course.courseProgress.length > 0 &&
                course.courseProgress[0].progress) ||
              0;
            // console.log("allcourse", course);
            return (
              <Card
                key={course.id}
                className="h-full lg:w-[230px] md:w-[230px] w-full rounded-xl overflow-hidden [&>div.ant-card-body]:p-0"
                hoverable
              >
                <div className="flex lg:flex-col md:flex-col flex-row relative rounded-xl">
                  <div className="flex lg:justify-center md:justify-center justify-start lg:items-center md:items-center items-start p-2 rounded-t-xl aspect-[4/3] relative lg:bg-grey-200 md:bg-grey-200 bg-none lg:h-[200px] md:h-[200px]">
                    <div
                      className="flex items-center justify-center"
                      onClick={() =>
                        router.push(
                          `course/${allCourse.id}/lecture/${course.slug}`
                        )
                      }
                    >
                      <ImageComponent
                        width={100}
                        height={100}
                        className="lg:w-full md:w-full"
                        objectPosition="center"
                        src={courseImage}
                        alt="course image"
                        // objectFit="contain"
                      />
                    </div>
                    <div className="absolute top-0 right-0 z-10 mt-[23px] mr-[23px]">
                      <Popover
                        content={<MenuItem allCourse={allCourse} />}
                        placement="bottomLeft"
                        arrow
                        trigger={["click"]}
                      >
                        <Button
                          shape="default"
                          size="middle"
                          icon={<BsThreeDotsVertical size={24} color="white" />}
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            border: "none",
                          }}
                          onClick={() => setEnrolId(allCourse.id)}
                        />
                      </Popover>
                    </div>
                  </div>
                  <div className="relative p-4 mt-0 bg-white rounded-xl lg:w-full md:w-full w-3/4">
                    <div>
                      <Typography.Title
                        onClick={() =>
                          router.push(
                            `course/${allCourse.id}/lecture/${course.slug}`
                          )
                        }
                        ellipsis={{ rows: 1 }}
                        level={5}
                        className=" text-black font-semibold leading-6"
                      >
                        {course.title}
                      </Typography.Title>
                      <Typography.Paragraph
                        ellipsis
                        className="flex items-center gap-1 mb-1 text-[#888484] text-sm font-medium leading-[16.8px]"
                      >
                        {course.organizationName}
                      </Typography.Paragraph>
                    </div>
                    <div className=" ">
                      <div className="flex flex-col gap-2 my-1">
                        <Typography.Text className="text-sm text-black font-normal leading-[15px]">
                          Leave a rating
                        </Typography.Text>
                        <div onClick={() => openRatingModal(course.id)}>
                          <Rate
                            className="[&>li]:mr-1 text-sm"
                            style={{
                              color: "#F59E0B",
                              fontSize: 18,
                            }}
                            tooltips={desc}
                            value={
                              (course &&
                                course.coursesreviews &&
                                course.coursesreviews.length > 0 &&
                                course.coursesreviews[0].rating) ||
                              0
                            }
                            disabled
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress
                          percent={courseProgress}
                          showInfo={false}
                          strokeWidth={4}
                          className="leading-none mt-2"
                        />
                      </div>
                      <small className="text-[#888484] text-sm font-medium leading-none">{`${courseProgress}% completed`}</small>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
          {courseData && courseData.length < 1 && (
            <div className="w-full flex flex-col items-center justify-center mt-10">
              <div className=" flex flex-col justify-center items-center bg-white p-10">
                <Typography.Paragraph className="m-0 text-2xl font-bold">
                  You Don&apos;t have any Course
                </Typography.Paragraph>
                <Typography.Paragraph className="italic font-semibold m-0">
                  Explore{" "}
                  <Typography.Link href="/courses">courses</Typography.Link>
                </Typography.Paragraph>
              </div>
            </div>
          )}
        </div>
      </Skeleton>

      <div className="flex justify-center items-center mt-2">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalCourses}
          onChange={handlePageChange}
        />
      </div>

      <CustomModal
        className="pt-[55px] w-[1000px]"
        toggleVisibility={setShareModal}
        visibility={shareModal}
      >
        <Typography className="  bg-white pb-12 pt-11 px-10 rounded-lg ">
          <Typography.Paragraph>
            <Typography className="mb-7 text-[20px] font-semibold ">
              Share this Course
            </Typography>
            <Search
              placeholder="https://www.unifaires.com/share/100hjdg7843863t2bnci9973hbdnd9990."
              allowClear
              value={shareLink}
              // width={}
              enterButton="Copy"
              size="large"
              onSearch={onSearch}
            />
            <div className="flex gap-[38px] justify-center mt-[50px]">
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`}
                target="_blank"
              >
                <BsFacebook size={30} color="blue" />
              </Link>
              <Link
                href={`https://twitter.com/intent/tweet?url=${shareLink}`}
                target="_blank"
              >
                <BsTwitter size={30} color="blue" />
              </Link>
              <Link
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareLink}`}
                target="_blank"
              >
                <BsLinkedin size={30} color="blue" />
              </Link>
            </div>
          </Typography.Paragraph>
        </Typography>
      </CustomModal>

      <CustomModal
        className="pt-[55px] w-[1000px]"
        toggleVisibility={setCreateModal}
        visibility={createModal}
      >
        <Typography className="  bg-white pb-12 pt-11 px-10 rounded-lg ">
          <Typography.Paragraph>
            <Typography className="mb-7 text-[20px] font-semibold ">
              Create New List
            </Typography>
            <Form
              name="normal_login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Row gutter={[8, 4]}>
                <Col xl={24} sm={24} xs={24} className="pt-5">
                  <Form.Item
                    name="listName"
                    rules={[
                      {
                        message: "This field cannot be empty!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Name your list e.g. HTML Skills"
                      className="py-4 border-[#343A40]"
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
                    <Input.TextArea
                      className=" border !border-[#343A40]"
                      placeholder="Why are you creating this list? e.g. To start new business, 
To get a new job, To become a web developer"
                      rows={5}
                    />
                  </Form.Item>
                </Col>

                <Col xl={24} xs={24}>
                  {isLoading == true ? (
                    <Spin />
                  ) : (
                    <Typography className="flex justify-end gap-5">
                      <Typography
                        className="mt-2 font-bold cursor-pointer"
                        onClick={() => setCreateModal(false)}
                      >
                        Cancel
                      </Typography>
                      <Button
                        className="font-bold "
                        type="primary"
                        size="middle"
                        htmlType="submit"
                      >
                        Create
                      </Button>
                    </Typography>
                  )}
                </Col>
              </Row>
            </Form>
          </Typography.Paragraph>
        </Typography>
      </CustomModal>
      <Modal
        open={rating}
        onCancel={closeRating}
        onOk={closeRating}
        footer={null}
      >
        <div className="mt-6">
          <Typography.Paragraph className="text-lg font-bold">
            What do you think about this course?
          </Typography.Paragraph>
          <div className="flex gap-2 items-center mb-2 ">
            <Typography.Paragraph className="m-0">
              Leave a Rating:
            </Typography.Paragraph>
            <Rate
              className="text-[20px] "
              value={ratingValue}
              onChange={(e) => handleRating(e)}
              style={{
                color: "#F59E0B",
              }}
            />
          </div>
          <Form
            form={form}
            layout="vertical"
            className="contact-form respondForm__form row y-gap-30 pt-30"
          >
            <Form.Item
              label="Review Content"
              name="review"
              className="tw-mt-0"
              required
              style={{ fontWeight: 600 }}
            >
              <Input.TextArea
                rows={4}
                placeholder="Message"
                className="font-normal"
              />
            </Form.Item>
            <div>
              <Button
                name="submit"
                type="primary"
                size="large"
                id="submit"
                className="flex ml-auto"
                onClick={handleSubmit}
                loading={loading}
              >
                Submit Review
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default MyLearning;
