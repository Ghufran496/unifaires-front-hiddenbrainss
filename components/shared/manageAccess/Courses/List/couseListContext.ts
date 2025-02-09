import { createContext } from "react";
import { CouseListCompType, CourseItemStatusType } from "./Datatypes";

export const defaultDatas: CouseListCompType = {
  fetchDatas: ({
    page: number,
    status: CourseItemStatusType,
    searchTxt: string,
  }) => {},
  dataList: [],
  pageLoading: false,
  permissions: {
    content_analytics: true,
    content_create: true,
    content_delete: true,
    content_edit: true,
    content_view: true,
    content_approve: true,
  },
  menu: {
    activeKey: "publishedCourses",
    items: [],
    setActiveMenu: (menuTxt: string) => {},
  },
  menuTitle: "",
  pagination: {
    currentPage: 1,
    pageSize: 10,
    total: 0,
    setCurrentPage: (pageNo: number) => {},
  },
  searchTerms: "",
  setSearchTerms: (txt1: string) => {},
  handleCreateUrl: () => {},
  handleViewUrl: () => {},
  handleDeleteCourse: () => {},
  handleEditCourse: () => {},
  handleArchiveCourse: () => {},
  handleUnArchieveCourse: () => {},
  handleApproveCourse: () => {},
};

export const courseListContext = createContext(defaultDatas);
