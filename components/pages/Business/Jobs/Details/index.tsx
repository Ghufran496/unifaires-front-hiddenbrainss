"use client";
"use client";
import { useState, useEffect } from "react";
import JobDetails from "@/components/shared/manageAccess/Jobs/Details";
import {
  JobInfoType,
  SearchInputType,
  EnrollJobStatusType,
  PageLoadingType,
} from "@/components/shared/manageAccess/Jobs/Details/Datatypes";
import axiosInstance from "@/app/utils/axios-config";
import { useParams } from "next/navigation";
import { handleAxiosError } from "@/app/utils/axiosError";
import { toast } from "react-hot-toast";

const JobDetail = () => {
  const [isLoading, setIsLoading] = useState<PageLoadingType>({
    pageDetails: true,
    tableContent: true,
  });
  const [jobData, setJobData] = useState<JobInfoType>(undefined);
  const [isViewProfile, setIsViewProfile] = useState<boolean>(false);
  const [searchObj, setSearchObj] = useState<SearchInputType>({
    country: "",
    experienceLevel: "",
    searchTxt: "",
    skills: [],
  });
  const [applicantArr, setApplicantArr] = useState<Array<any>>([]);
  const [interviewArr, setInterviewArr] = useState<Array<any>>([]);
  const [acceptedArr, setAcceptedArr] = useState<Array<any>>([]);
  const [rejectedArr, setRejectedArr] = useState<Array<any>>([]);
  const [candiateDataObj, setCandiateDataObj] = useState<any>(undefined);
  const params = useParams();
  const jobId = params?.slug;

  /**
   * Get job details
   */
  const fetchJobDetails = async () => {
    try {
      setIsLoading((prevState: PageLoadingType) => {
        return { ...prevState, pageDetails: true, tableContent: false };
      });
      const res = await axiosInstance.get(`/jobs/${jobId}`);

      if (res?.data?.data) {
        setJobData(res.data.data);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading((prevState: PageLoadingType) => {
        return { ...prevState, pageDetails: false, tableContent: false };
      });
    }
  };

  /**
   * Fetch applicant list
   */
  const fetchApplicantList = async (searchInput: SearchInputType) => {
    try {
      setIsLoading((prevState: PageLoadingType) => {
        return { ...prevState, tableContent: true, pageDetails: false };
      });
      let queryParams: any = undefined;
      if (
        typeof searchInput?.searchTxt === "string" &&
        searchInput.searchTxt.trim() !== ""
      ) {
        queryParams = {
          ...queryParams,
          firstname: searchInput.searchTxt.trim(),
          lastname: searchInput.searchTxt.trim(),
        };
      } else {
        queryParams = {
          ...queryParams,
          firstname: undefined,
          lastname: undefined,
        };
      }
      if (
        typeof searchInput?.country === "string" &&
        searchInput.country.trim() !== ""
      ) {
        queryParams = { ...queryParams, country: searchInput.country.trim() };
      } else {
        queryParams = { ...queryParams, country: undefined };
      }

      if (
        typeof searchInput?.experienceLevel === "string" &&
        searchInput.experienceLevel.trim() !== ""
      ) {
        queryParams = {
          ...queryParams,
          experienceLevel: searchInput.experienceLevel.trim(),
        };
      } else {
        queryParams = { ...queryParams, experienceLevel: undefined };
      }

      if (Array.isArray(searchInput?.skills) && searchInput.skills.length > 0) {
        queryParams = {
          ...queryParams,
          skills: searchInput.skills,
        };
      } else {
        queryParams = { ...queryParams, skills: undefined };
      }

      const res = await axiosInstance.get(
        `/jobs/business-job-applicants/${jobId}`,
        { params: queryParams }
      );

      if (Array.isArray(res?.data?.data?.applicants)) {
        const jobEnrols = res.data.data.applicants;
        const pending = jobEnrols.filter((j: any) => {
          if (j?.jobUserStatus === "pending") {
            return j;
          }
          return null;
        });
        const interview = jobEnrols.filter((j: any) => {
          if (j?.jobUserStatus === "interviewing") {
            return j;
          }
          return null;
        });
        const accepted = jobEnrols.filter((j: any) => {
          if (j?.jobUserStatus === "accepted") {
            return j;
          }
          return null;
        });
        const rejected = jobEnrols.filter((j: any) => {
          if (j?.jobUserStatus === "rejected") {
            return j;
          }
          return null;
        });
        setApplicantArr(pending);
        setInterviewArr(interview);
        setAcceptedArr(accepted);
        setRejectedArr(rejected);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading((prevState: PageLoadingType) => {
        return { ...prevState, tableContent: false, pageDetails: false };
      });
    }
  };

  /**
   * Get candidate profile details
   */
  const getCandidateProfile = async (candidateUsername: string = "") => {
    try {
      setIsLoading((prevState: PageLoadingType) => {
        return { ...prevState, pageDetails: false, tableContent: false };
      });
      const res = await axiosInstance.get(
        `/users/profile/${candidateUsername}`
      );
      if (res?.data?.data) {
        setCandiateDataObj(res.data.data);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading((prevState: PageLoadingType) => {
        return { ...prevState, pageDetails: false, tableContent: false };
      });
    }
  };

  /**
   * Change enroll job staus
   */
  const enrollJob = async (inputObj: {
    enrollId: string;
    jobStatus: EnrollJobStatusType;
  }) => {
    try {
      setIsLoading((prevState: PageLoadingType) => {
        return { ...prevState, pageDetails: false, tableContent: true };
      });
      const res = await axiosInstance.put(
        `/enrol-job/status/${inputObj?.enrollId}`,
        {
          jobUserStatus: inputObj?.jobStatus,
        }
      );
      if (res.status) {
        toast.success("Job Status Changed");
        fetchApplicantList(searchObj);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading((prevState: PageLoadingType) => {
        return { ...prevState, pageDetails: false, tableContent: false };
      });
    }
  };

  useEffect(() => {
    if (typeof jobId === "string" && jobId.trim() !== "") {
      fetchJobDetails();
      fetchApplicantList(searchObj);
    }
  }, [jobId]);

  return (
    <>
      <JobDetails
        breadCombs={{
          items: {
            applicants: [
              { title: "Jobs", href: "/user/business-access/jobs" },
              { title: "Applicants" },
            ],
            candidateProfile: [
              { title: "Jobs", href: "/user/business-access/jobs" },
              {
                title: "Applicants",
                onClick: () => {
                  setIsViewProfile(false);
                },
                className: "hover:cursor-pointer",
              },
              { title: "Candidate Profile" },
            ],
          },
        }}
        jobInfo={jobData}
        pageLoading={isLoading}
        setPageLoading={(isLoading: PageLoadingType) => {
          setIsLoading(isLoading);
        }}
        isShowProfile={isViewProfile}
        setIsShowProfile={(isShow: boolean = false) => {
          setIsViewProfile(isShow);
        }}
        searchParam={searchObj}
        setSearchParam={(inputObj: SearchInputType) => {
          setSearchObj((prevState: SearchInputType) => {
            return { ...prevState, ...inputObj };
          });
        }}
        acceptedList={acceptedArr}
        applicantList={applicantArr}
        interviewingList={interviewArr}
        rejectedList={rejectedArr}
        getApplicantList={fetchApplicantList}
        candidateProfile={candiateDataObj}
        setCandidateProfile={(profileObj: any) => {
          setCandiateDataObj(profileObj);
        }}
        fetchCandidateProfile={getCandidateProfile}
        changeJobStatus={enrollJob}
        permissions={{
          job_edit: true,
          job_view: true,
        }}
      />
    </>
  );
};

export default JobDetail;
