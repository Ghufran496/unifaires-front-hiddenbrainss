import { createContext } from "react";
import { JobDetailsCompType } from "./Datatypes";

export const defaultValues: JobDetailsCompType = {
  breadCombs: {
    items: {
      applicants: [{ title: "Jobs" }, { title: "Applicants" }],
      candidateProfile: [{ title: "Jobs" }, { title: "Applicants" }],
    },
  },
  jobInfo: undefined,
  pageLoading: { pageDetails: false, tableContent: false },
  setPageLoading: () => {},
  isShowProfile: false,
  setIsShowProfile: () => {},
  searchParam: {
    country: "",
    experienceLevel: "",
    searchTxt: "",
    skills: [],
  },
  setSearchParam: () => {},
  applicantList: [],
  acceptedList: [],
  interviewingList: [],
  rejectedList: [],
  getApplicantList: () => {},
  candidateProfile: undefined,
  setCandidateProfile: () => {},
  fetchCandidateProfile: () => {},
  changeJobStatus: () => {},
  permissions: {
    job_view: true,
    job_create: true,
    job_edit: true,
    job_delete: true,
    job_approve: true,
    job_analytics: true,
  },
};

export const jobDetailsContext = createContext(defaultValues);
