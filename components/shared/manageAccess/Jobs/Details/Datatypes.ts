import { JobListDataType, PermissionDataType } from "@/app/utils/interface";

export type JobInfoType = JobListDataType | undefined;
export type SearchInputType = {
  searchTxt: string;
  country: string;
  experienceLevel: string;
  skills: Array<string>;
};

type BreadCombsDataType = Array<{
  title: string;
  href?: string;
  onClick?: () => any;
  className?: string;
}>;

export type EnrollJobStatusType =
  | "interviewing"
  | "hiring"
  | "cancelled"
  | "closed"
  | "pending"
  | "accepted"
  | "rejected";

export type PageLoadingType = {
  pageDetails: boolean;
  tableContent: boolean;
};

export type JobDetailsCompType = {
  breadCombs: {
    items: {
      applicants: BreadCombsDataType;
      candidateProfile: BreadCombsDataType;
    };
  };
  jobInfo: JobInfoType;
  pageLoading: PageLoadingType;
  setPageLoading: (loadingObj: PageLoadingType) => any;
  isShowProfile: boolean;
  setIsShowProfile: (isShow: boolean) => any;
  searchParam: SearchInputType;
  setSearchParam: (inputObj: SearchInputType) => any;
  applicantList: Array<any>;
  interviewingList: Array<any>;
  acceptedList: Array<any>;
  rejectedList: Array<any>;
  getApplicantList: (inputObj: SearchInputType) => any;
  candidateProfile: any;
  setCandidateProfile: (inputObj: any) => any;
  fetchCandidateProfile: (userName: string) => any;
  changeJobStatus: (inputObj: {
    enrollId: string;
    jobStatus: EnrollJobStatusType;
  }) => any;
  permissions: Partial<PermissionDataType>;
};
