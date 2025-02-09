/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/utils/axios-config";
import JobList from "@/components/shared/manageAccess/Jobs/List";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { handleAxiosError } from "@/app/utils/axiosError";
import { JobTabType } from "@/components/shared/manageAccess/Jobs/List/DataTypes";

const Jobs = () => {
  const [jobList, setJobList] = useState([]);
  const [pageListStatus, setPageListStatus] = useState("opened");
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const pageSize = 10;
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [jobMenuActive, setJobMenuActive]: any = useState("myJobs");
  const [jobMenuActiveTitle, setJobMenuActiveTitle]: any = useState("My Jobs");
  const router = useRouter();

  /**
   * Fetch job list
   */
  const fetchJob = async (
    inputObj: { page: number; status: string; searchWord: string } = {
      page: 1,
      status: "opened",
      searchWord: "",
    }
  ): Promise<void> => {
    try {
      setLoading(true);
      const searchTxt1 =
        typeof inputObj?.searchWord === "string" &&
        inputObj.searchWord.trim() !== ""
          ? inputObj.searchWord.trim()
          : undefined;
      const res = await axiosInstance.get(`/jobs/business`, {
        params: {
          title: searchTxt1,
          page: inputObj.page,
          limit: pageSize,
          status: inputObj?.status,
        },
      });

      if (res?.status) {
        setLoading(false);
        const jobs = Array.isArray(res?.data?.data?.jobs)
          ? res.data.data.jobs
          : [];
        const total = !Number.isNaN(parseInt(res?.data?.data?.count))
          ? res.data.data.count
          : 0;
        const currentPage = !Number.isNaN(
          parseInt(res?.data?.data?.currentPage)
        )
          ? res.data.data.currentPage
          : 1;
        setJobList(jobs);
        setTotalJobs(total);
        setCurrentPageNo(currentPage);
      }
    } catch (error) {
      console.log(error);
      handleAxiosError(error);
    }
    {
      setLoading(false);
    }
  };

  /**
   * Handling archive jobs
   */
  const handleArchiveJob = async (jobId: string = "") => {
    try {
      setLoading(true);
      const res = await axiosInstance.put(`/jobs/business/${jobId}`, {
        status: "archive",
      });

      if (res?.status) {
        fetchJob({
          page: currentPageNo,
          status: pageListStatus,
          searchWord: searchText,
        });
        toast.success("Job Archived Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   *
   */
  const handleDelete = async (jobId: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(
        `/jobs/${jobId}`
      );
      if (response?.status) {
        fetchJob({
          page: currentPageNo,
          status: pageListStatus,
          searchWord: searchText,
        });
        toast.success("Job deleted successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle job edit
   */
  const handleEdit = (jobId: string): void => {
    router.push(`/business/jobs/create/${jobId}`);
  };

  /**
   * Handle
   */
  const handleUnarchieveJob = async (jobId: string = ""): Promise<void> => {
    try {
      setLoading(true);
      const res = await axiosInstance.put(`/jobs/business/${jobId}`, {
        status: "opened",
      });

      if (res.status) {
        fetchJob({
          page: currentPageNo,
          status: pageListStatus,
          searchWord: searchText,
        });
        toast.success("Job Unarchived Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle job view
   */
  const handleViewJob = (jobId: string = "") => {
    router.push(`/business/jobs/${jobId}`);
  };

  /**
   * Handle create job url
   */
  const handleCreateJobUrl = () => {
    router.push("/business/jobs/create");
  };

  /**
   * Get tag menus
   */
  const getTagMenus = (): Array<JobTabType> => {
    const result: Array<JobTabType> = [];

    result.push({
      label: <>My Jobs</>,
      key: "myJobs",
      onClick: () => {
        setJobMenuActive("myJobs");
        setJobMenuActiveTitle("My Jobs");
        setCurrentPageNo(1);
        setSearchText("");
        setPageListStatus("opened");
        fetchJob({
          page: 1,
          status: "opened",
          searchWord: "",
        });
      },
    });

    result.push({
      label: <>Pending</>,
      key: "pending",
      onClick: () => {
        setJobMenuActive("pending");
        setJobMenuActiveTitle("Pending Jobs");
        setCurrentPageNo(1);
        setSearchText("");
        setPageListStatus("pending");
        fetchJob({
          page: 1,
          status: "pending",
          searchWord: "",
        });
      },
    });

    result.push({
      label: <>Archived</>,
      key: "archived",
      onClick: () => {
        setJobMenuActive("archived");
        setJobMenuActiveTitle("Archived Jobs");
        setCurrentPageNo(1);
        setSearchText("");
        setPageListStatus("archive");
        fetchJob({
          page: 1,
          status: "archive",
          searchWord: "",
        });
      },
    });

    return result;
  };

  useEffect(() => {
    fetchJob({
      page: currentPageNo,
      status: pageListStatus,
      searchWord: searchText,
    });
  }, []);

  return (
    <>
      <JobList
        fetchJobs={({ page = 1, status = "opened", searchTxt = "" }) => {
          fetchJob({ page, status, searchWord: searchTxt });
          setPageListStatus(status);
        }}
        handleArchiveJob={handleArchiveJob}
        handleDeleteJob={handleDelete}
        handleEditJob={handleEdit}
        handleUnArchiveJob={handleUnarchieveJob}
        handleViewJob={handleViewJob}
        handleCreateJobUrl={handleCreateJobUrl}
        handleApproveJob={()=>{}}
        jobList={jobList}
        pageLoading={loading}
        searchTerms={searchText}
        menuTitle={jobMenuActiveTitle}
        setSearchTerms={(str1: string) => {
          setSearchText(str1);
        }}
        permissions={{
          job_create: true,
          job_edit: true,
          job_delete: true,
          job_view: true,
          job_approve: false,
          job_analytics: true,
        }}
        menu={{
          items: getTagMenus(),
          activeKey: jobMenuActive,
          setActiveMenu: (menuTxt: string) => {
            setJobMenuActive(menuTxt);
          },
        }}
        pagination={{
          currentPage: currentPageNo,
          pageSize: pageSize,
          total: totalJobs,
          setCurrentPage: (pageNo: number) => {
            setCurrentPageNo(pageNo);
          },
        }}
      />
    </>
  );
};

export default Jobs;
