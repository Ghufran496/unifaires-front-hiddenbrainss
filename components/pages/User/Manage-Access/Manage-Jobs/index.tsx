/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { handleAxiosError } from "@/app/utils/axiosError";
import axiosAccessInstance from "@/app/utils/businessAccess-axios-config";
import { useManageUserPermission } from "@/app/utils/hooks/useManageUserPermission";
import JobList from "@/components/shared/manageAccess/Jobs/List";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { JobTabType } from "@/components/shared/manageAccess/Jobs/List/DataTypes";

const Jobs = () => {
  const [jobList, setJobList] = useState([]);
  const { hasAcessFunctionality } = useManageUserPermission();
  const [pageListStatus, setPageListStatus] = useState("opened");
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const pageSize = 10;
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [jobMenuActive, setJobMenuActive]: any = useState("myJobs");
  const [jobMenuActiveTitle, setJobMenuActiveTitle]: any =
    useState("My Jobs");
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
      const res = await axiosAccessInstance.get(`/manage-jobs/user`, {
        params: {
          title: searchTxt1,
          page: inputObj.page,
          limit: pageSize,
          status: inputObj?.status,
        },
      });

      if (res.status) {
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
      const res = await axiosAccessInstance.put(`/manage-jobs/user/${jobId}`, {
        status: "archive",
      });

      if (res.status) {
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
      let deleteEndpoint;
      if (jobMenuActive === "archived") {
        deleteEndpoint = "archieve-jobs/business";
      } else {
        deleteEndpoint = "manage-jobs";
      }
      const response = await axiosAccessInstance.delete(
        `/${deleteEndpoint}/${jobId}`
      );
      if (response.status) {
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
    router.push(`/user/business-access/jobs/create/${jobId}`);
  };

  /**
   * Handle
   */
  const handleUnarchieveJob = async (jobId: string = ""): Promise<void> => {
    try {
      setLoading(true);
      const res = await axiosAccessInstance.put(`/manage-jobs/user/${jobId}`, {
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
    router.push(`/user/business-access/jobs/${jobId}`);
  };

  /**
   * Handle create job url
   */
  const handleCreateJobUrl = () => {
    router.push("/user/business-access/jobs/create");
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
    if (hasAcessFunctionality({ name: "job_view" })) {
      result.push({
        label: <>Waiting for approval</>,
        key: "pending",
        onClick: () => {
          setJobMenuActive("pending");
          setJobMenuActiveTitle("Waiting For Approval Jobs");
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
    }
    if (hasAcessFunctionality({ name: "job_view" })) {
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
    }

    return result;
  };

  /**
   * Handling approve jobs
   */
  const handleApprove = async (jobId: string = "") => {
    try {
      setLoading(true);
      const res = await axiosAccessInstance.put(`/manage-jobs/user/${jobId}`, {
        status: "approve",
      });

      if (res.status) {
        fetchJob({
          page: currentPageNo,
          status: pageListStatus,
          searchWord: searchText,
        });
        toast.success("Job approved Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
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
        handleApproveJob={handleApprove}
        jobList={jobList}
        pageLoading={loading}
        searchTerms={searchText}
        menuTitle={jobMenuActiveTitle}
        setSearchTerms={(str1: string) => {
          setSearchText(str1);
        }}
        permissions={{
          job_create: hasAcessFunctionality({ name: "job_create" }),
          job_edit: hasAcessFunctionality({ name: "job_edit" }),
          job_delete: hasAcessFunctionality({ name: "job_delete" }),
          job_view: hasAcessFunctionality({ name: "job_view" }),
          job_approve: hasAcessFunctionality({ name: "job_approve" }),
          job_analytics: hasAcessFunctionality({ name: "job_analytics" }),
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
