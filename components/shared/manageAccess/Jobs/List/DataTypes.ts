import { JobListDataType, PermissionDataType } from "@/app/utils/interface";

export type JobTabType = { label: any; key: string; onClick: () => any };
export type JobStatusType =
  | "opened"
  | "archive"
  | "deactivate"
  | "interviewing"
  | "hired"
  | "closed"
  | "pending";

export type JobListType = {
  jobList: Array<JobListDataType>;
  pagination: {
    total: number;
    pageSize: number;
    currentPage: number;
    setCurrentPage: any;
  };
  searchTerms: string;
  menuTitle: string;
  setSearchTerms: (txt1: string) => any;
  pageLoading: boolean;
  permissions: Partial<PermissionDataType>;
  fetchJobs: (inputObj: {
    page: number;
    status: string;
    searchTxt: string;
  }) => void;
  menu: {
    items: Array<JobTabType>;
    activeKey: "myJobs" | "archived" | "pending";
    setActiveMenu: (menuTxt: string) => any;
  };
  handleEditJob: (jobId: string) => any;
  handleDeleteJob: (jobId: string) => any;
  handleArchiveJob: (jobId: string) => any;
  handleUnArchiveJob: (jobId: string) => any;
  handleViewJob: (jobId: string) => any;
  handleCreateJobUrl: () => any;
  handleApproveJob?: (jobId: string) => any;
};
