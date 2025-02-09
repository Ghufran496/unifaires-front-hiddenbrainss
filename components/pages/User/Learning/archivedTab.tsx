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
  Skeleton,
  Popover,
  Menu,
  Popconfirm,
  Input,
} from "antd";
import ImageComponent from "@/components/shared/image";
import CourseImage from "@/public/books.png";
import TabForm from "./components/tabForm";
import { useEffect, useState } from "react";
import { DeleteArchiveCourse, GetCourses } from "../api";
import { useRouter } from "next/navigation";
import {
  BsChevronDown,
  BsEnvelope,
  BsFacebook,
  BsThreeDotsVertical,
  BsTwitter,
} from "react-icons/bs";
import { LearningDataProps } from "./learningTab";
import axiosInstance from "@/app/utils/axios-config";
import Image from "next/image";
import { toast } from "react-toastify";
import CustomModal from "@/components/shared/CustomModal/CustomModal";
import config from "@/app/utils/config";

const ArchievedTab = ({ activeTab }: any) => {
  const [courseData, setCourseData] = useState<any>([]);
  const [fetchingCourse, setFetchingCourse] = useState(true);
  const [shareLink, setShareLink] = useState("");
  const [shareModal, setShareModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);

  const router = useRouter();

  const getArchievedCourse = async () => {
    await axiosInstance
      .get("/archieve-course/user")
      .then((res) => {
        setCourseData(res.data.data);
        setFetchingCourse(false);

        // console.log("Here is the archieve courses", res.data);
      })
      .catch((error) => {
        console.log("Here is the error", error);
      });
  };
  useEffect(() => {
    getArchievedCourse();
  }, [activeTab]);

  const handleMenuClick = (key: any, id: any) => {
    setShareLink(`${config.API.FRONT_END_URL}/courses/${id}`);
    if (key === "share") {
      setShareModal(true);
    }
    if (key.includes("create")) {
      setCreateModal(true);
    }
  };

  const cancel = (e: any) => {
    console.log(e);
  };

  const deleteArchiveCourse = (courseId: any) => {
    DeleteArchiveCourse(courseId)
      .then((res) => {
        console.log(res);
        if (res.status === false) {
          toast.error(res.message, { theme: "colored" });
        } else {
          toast.success(res.message, { theme: "colored" });
          getArchievedCourse();
        }
      })
      .catch((error) => {
        toast.error(error.response?.message);
        console.log(error);
      });
  };

  const MenuItem = ({ allCourse }: any) => {
    const course = allCourse?.course;
    return (
      <Menu className="text-4 border-none font-medium text-[#2D2D2D]">
        <Menu.Item
          className="h-[43px] "
          key="share"
          onClick={() => handleMenuClick("share", course.id)}
        >
          <span className="flex items-center justify-between">
            Share
            <BsChevronDown className="" />
          </span>
        </Menu.Item>
        {/* <Menu.Item
          className="h-[43px]"
          onClick={() => handleWishList(course.id)}
          key="favorite"
        >
          Favorite
        </Menu.Item> */}

        <Menu.Item className="h-[43px] text-red-500" key="favorite">
          <Popconfirm
            title="Delete Course"
            description="Are you sure you want to delete this course?"
            onConfirm={() => deleteArchiveCourse(allCourse.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            Unarchive
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );
  };

  const { Search } = Input;
  const onSearch = async (value: string) => {
    await navigator.clipboard.writeText(value);
    toast.success("Link Copied Successfully");
  };

  return (
    <>
      <TabForm />

      <Skeleton active loading={fetchingCourse}>
        <div className="flex justify-start  lg:flex-row md:flex-row flex-row lg:gap-6 md:gap-6 gap-2 mb-4 w-full flex-wrap">
          {courseData &&
            courseData?.archieves?.map((allCourse: any) => {
              const course = allCourse.course;
              return (
                <Card
                  key={course.id}
                  className="rounded-t-2xl lg:w-[200px] md:w-[230px] w-full [&>div.ant-card-body]:p-0 "
                  hoverable
                >
                  <div className="flex lg:flex-col md:flex-col flex-row relative rounded-xl bg-gray-200">
                    <div className="flex items-center justify-center relative lg:w-full md:w-full w-3/5 aspect-[4/3] ">
                      <div
                        className="flex items-center justify-center"
                        onClick={() => router.push(`/course/${course.id}`)}
                      >
                        <Image
                          width={200}
                          height={200}
                          className="flex items-center justify-center p-2"
                          objectPosition="center"
                          src={
                            course?.image
                              ? course.image
                              : JSON.parse(course.meta).image
                          }
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
                            size="large"
                            icon={
                              <BsThreeDotsVertical size={24} color="white" />
                            }
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              border: "none",
                            }}
                            // onClick={() => setEnrolId(allCourse.id)}
                          />
                        </Popover>
                      </div>
                    </div>
                    <div className="relative p-4 bg-white rounded-xl w-full">
                      <div>
                        <Typography.Title
                          onClick={() => router.push(`/courses/${course.id}`)}
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
                    </div>
                  </div>
                </Card>
              );
            })}
          {courseData.archieves && courseData.archieves.length < 1 && (
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
              <BsFacebook size={30} color="blue" />
              <BsTwitter size={30} color="blue" />
              <BsEnvelope size={30} color="blue" />
            </div>
          </Typography.Paragraph>
        </Typography>
      </CustomModal>
    </>
  );
};

export default ArchievedTab;
