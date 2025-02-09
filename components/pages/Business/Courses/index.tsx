/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/app/utils/axios-config";
import CourseListComp from "@/components/shared/manageAccess/Courses/List";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  CourseListItemType,
  CourseItemStatusType,
  PageMenuKeyType,
  CourseTabType,
} from "@/components/shared/manageAccess/Courses/List/Datatypes";
import { handleAxiosError } from "@/app/utils/axiosError";

const Courses = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<CourseListItemType[]>([]);
  const [courseListStatus, setCourseListStatus] =
    useState<CourseItemStatusType>("active");
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const pageSize = 10;
  const [loading, setLoading] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [activeMenuTitle, setActiveMenuTitle] = useState("My Courses");
  const [activeMenuKeyName, setActiveMenuKeyName] =
    useState<PageMenuKeyType>("publishedCourses");

  /**
   * Get courses
   */
  const fetchCourses = async ({
    page = 1,
    status = "active",
    searchTxt = "",
  }: {
    page: number;
    status: CourseItemStatusType;
    searchTxt: string;
  }): Promise<void> => {
    try {
      setLoading(true);
      const searchTxt1 =
        typeof searchTxt === "string" && searchTxt.trim() !== ""
          ? searchTxt.trim()
          : undefined;
      const res = await axiosInstance.get(`/course/business-courses`, {
        params: { page, limit: pageSize, status, title: searchTxt1 },
      });
      if (res?.data?.data) {
        const resData = res.data.data;
        const courseArr = Array.isArray(resData?.courses)
          ? resData.courses
          : [];
        const total = !Number.isNaN(parseInt(resData?.count))
          ? parseInt(resData.count)
          : 0;
        const pageNo = !Number.isNaN(parseInt(resData?.currentPage))
          ? parseInt(resData.currentPage)
          : 0;
        setCourses(courseArr);
        setTotalCourses(total);
        setCurrentPageNo(pageNo);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get tag menus
   */
  const getTagMenus = (): Array<CourseTabType> => {
    const result: Array<CourseTabType> = [];

    result.push({
      label: <>Published Courses</>,
      key: "publishedCourses",
      onClick: () => {
        setActiveMenuKeyName("publishedCourses");
        setActiveMenuTitle("My Courses");
        setCurrentPageNo(1);
        setSearchWord("");
        setCourseListStatus("active");
        fetchCourses({
          page: 1,
          status: "active",
          searchTxt: "",
        });
      },
    });

    result.push({
      label: <>Archive</>,
      key: "archive",
      onClick: () => {
        setActiveMenuKeyName("archive");
        setActiveMenuTitle("Archive Courses");
        setCurrentPageNo(1);
        setSearchWord("");
        setCourseListStatus("archive");
        fetchCourses({
          page: 1,
          status: "archive",
          searchTxt: "",
        });
      },
    });

    return result;
  };

  /**
   * create course url handling
   */
  const createCourse = (): void => {
    router.push("/business/courses/create");
  };

  /**
   * Handle course view
   */
  const handleCourseView = (courseId: string = ""): void => {
    router.push(`/business/courses/view-course/${courseId}`);
  };

  /**
   * Handle course edit
   */
  const handleCourseEdit = (courseId: string = "") => {
    router.push(`/business/courses/withvideos/${courseId}`);
  };

  /**
   * Delete course item
   */
  const handleDelete = async (courseId: string = "") => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`/course/${courseId}`);
      if (response?.status) {
        fetchCourses({
          page: currentPageNo,
          status: courseListStatus,
          searchTxt: searchWord,
        });
        toast.success("Course deleted successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle archiving course
   */
  const handleArchive = async (courseId: string = "") => {
    try {
      setLoading(true);
      const res = await axiosInstance.put(`/course/${courseId}`, {
        status: "archive",
      });
      if (res?.status) {
        fetchCourses({
          page: currentPageNo,
          status: courseListStatus,
          searchTxt: searchWord,
        });
        toast.success("Archived Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle archiving course
   */
  const handleUnArchive = async (courseId: string = "") => {
    try {
      setLoading(true);
      const res = await axiosInstance.put(`/course/${courseId}`, {
        status: "active",
      });
      if (res?.status) {
        fetchCourses({
          page: currentPageNo,
          status: courseListStatus,
          searchTxt: searchWord,
        });
        toast.success("Activated Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses({
      page: currentPageNo,
      status: courseListStatus,
      searchTxt: searchWord,
    });
  }, []);

  return (
    <>
      <CourseListComp
        dataList={courses}
        fetchDatas={fetchCourses}
        pageLoading={loading}
        permissions={{
          content_analytics: true,
          content_create: true,
          content_delete: true,
          content_edit: true,
          content_view: true,
          content_approve: false,
        }}
        pagination={{
          currentPage: currentPageNo,
          pageSize,
          total: totalCourses,
          setCurrentPage: (pageN: number = 0) => {
            setCurrentPageNo(pageN);
            fetchCourses({
              page: pageN,
              status: courseListStatus,
              searchTxt: searchWord,
            });
          },
        }}
        searchTerms={searchWord}
        setSearchTerms={(inputStr: string = "") => {
          setSearchWord(inputStr);
        }}
        menuTitle={activeMenuTitle}
        menu={{
          activeKey: activeMenuKeyName,
          items: getTagMenus(),
          setActiveMenu: (menuTxt: PageMenuKeyType) => {
            setActiveMenuKeyName(menuTxt);
          },
        }}
        handleCreateUrl={createCourse}
        handleViewUrl={handleCourseView}
        handleDeleteCourse={handleDelete}
        handleEditCourse={handleCourseEdit}
        handleArchiveCourse={handleArchive}
        handleUnArchieveCourse={handleUnArchive}
        handleApproveCourse={()=>{}}
      />
    </>
  );
};

export default Courses;
