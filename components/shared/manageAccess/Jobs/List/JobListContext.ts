import { createContext } from "react";
import { JobListType } from "./DataTypes";

export const defaultValue: JobListType = {
  jobList: [],
  pagination: {
    total: 0,
    pageSize: 10,
    currentPage: 1,
    setCurrentPage: () => {},
  },
  searchTerms: "",
  menuTitle: "",
  pageLoading: false,
  permissions: {
    job_view: true,
    job_create: true,
    job_edit: true,
    job_delete: true,
    job_approve: true,
    job_analytics: true,
  },
  fetchJobs: () => {},
  menu: {
    items: [],
    activeKey: "myJobs",
    setActiveMenu: () => {},
  },
  setSearchTerms: () => {},
  handleEditJob: () => {},
  handleDeleteJob: () => {},
  handleArchiveJob: () => {},
  handleUnArchiveJob: () => {},
  handleViewJob: () => {},
  handleCreateJobUrl: () => {},
  handleApproveJob: () => {},
};

export const JobListContext = createContext<JobListType>(defaultValue);
