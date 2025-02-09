/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { handleAxiosError } from "@/app/utils/axiosError";
import axiosAccessInstance from "@/app/utils/businessAccess-axios-config";
import { useManageUserPermission } from "@/app/utils/hooks/useManageUserPermission";
import FundingList from "@/components/shared/manageAccess/Funding/List";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  FundingTabType,
  FundingListStatusDataType,
  FundingListDataType,
  PageMenuKeyType,
} from "@/components/shared/manageAccess/Funding/List/Datatypes";

const Funding = () => {
  const { hasAcessFunctionality } = useManageUserPermission();
  const router = useRouter();
  const pageSize = 10;
  const [fundingList, setFundingList] = useState<Array<FundingListDataType>>(
    []
  );
  const [currentPageNo, setCurrentPageNo] = useState<number>(1);
  const [totalFundings, setTotalFundings] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [fundingListStatus, setFundingListStatus] =
    useState<FundingListStatusDataType>("active");
  const [activeMenuName, setActiveMenuName]: any =
    useState<PageMenuKeyType>("myFunding");
  const [menuPageTitle, setMenuPageTitle] = useState<string>("Funding");

  const fetchFunding = async (inputObj: {
    page: number;
    status: string;
    searchTxt: string;
  }) => {
    try {
      setLoading(true);
      const searchTerm1 =
        typeof inputObj?.searchTxt === "string" &&
        inputObj.searchTxt.trim() !== ""
          ? inputObj.searchTxt.trim()
          : undefined;
      const res = await axiosAccessInstance.get(`/manage-funding/user`, {
        params: {
          title: searchTerm1,
          page: inputObj?.page,
          limit: pageSize,
          status: inputObj?.status,
        },
      });

      if (res?.data?.data) {
        const listArr = Array.isArray(res?.data?.data?.fundings)
          ? res.data.data.fundings
          : [];
        const count = !Number.isNaN(parseInt(res?.data?.data?.count))
          ? parseInt(res.data.data.count)
          : 0;
        const curPage = !Number.isNaN(parseInt(res?.data?.data?.currentPage))
          ? parseInt(res.data.data.currentPage)
          : 1;
        setFundingList(listArr);
        setTotalFundings(count);
        setCurrentPageNo(curPage);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle fund edit
   */
  const handleFundEdit = (fundId: string = ""): void => {
    router.push(`/user/business-access/funding/create/${fundId}`);
  };

  /**
   * Handling Archieve item
   */
  const handleArchive = async (fundId: string = "") => {
    try {
      setLoading(true);
      const res = await axiosAccessInstance.put(
        `/manage-funding/user/${fundId}`,
        {
          status: "archive",
        }
      );

      if (res.status) {
        fetchFunding({
          page: currentPageNo,
          searchTxt: searchTerms,
          status: fundingListStatus,
        });
        toast.success("Funding Archived Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handling approve item
   */
  const handleApprove = async (fundId: string = "") => {
    try {
      setLoading(true);
      const res = await axiosAccessInstance.put(
        `/manage-funding/user/${fundId}`,
        {
          status: "approve",
        }
      );

      if (res.status) {
        fetchFunding({
          page: currentPageNo,
          searchTxt: searchTerms,
          status: fundingListStatus,
        });
        toast.success("Funding approved Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle funding item delete
   */
  const handleDelete = async (fundingId: string = ""): Promise<void> => {
    try {
      setLoading(true);
      let deleteEndpoint: string = "";
      if (activeMenuName === "archive") {
        deleteEndpoint = "archieve-funding/user";
      } else {
        deleteEndpoint = "manage-funding";
      }
      const response = await axiosAccessInstance.delete(
        `/${deleteEndpoint}/${fundingId}`
      );
      if (response.status) {
        fetchFunding({
          page: currentPageNo,
          searchTxt: searchTerms,
          status: fundingListStatus,
        });
        toast.success("Funding Deleted Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle unarchive funding
   */
  const handleUnarchive = async (fundingId: string = "") => {
    try {
      setLoading(true);
      const res = await axiosAccessInstance.put(
        `/manage-funding/user/${fundingId}`,
        {
          status: "active",
        }
      );

      if (res.status) {
        fetchFunding({
          page: currentPageNo,
          searchTxt: searchTerms,
          status: fundingListStatus,
        });
        toast.success("Funding Unarchived Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle create funding link
   */
  const handleCreate = () => {
    router.push("/user/business-access/funding/create");
  };

  const handleView = (fundingId: string="") =>{
    router.push(`/user/business-access/funding/${fundingId}`);
  };

  /**
   * Get tag menus
   */
  const getTagMenus = (): Array<FundingTabType> => {
    const result: Array<FundingTabType> = [];

    result.push({
      label: <>My Funding</>,
      key: "myFunding",
      onClick: () => {
        setActiveMenuName("myFunding");
        setMenuPageTitle("Funding");
        setCurrentPageNo(1);
        setSearchTerms("");
        setFundingListStatus("active");
        fetchFunding({
          page: 1,
          status: "active",
          searchTxt: "",
        });
      },
    });
    result.push({
      label: <>Waiting for approval</>,
      key: "pendingFunding",
      onClick: () => {
        setActiveMenuName("pendingFunding");
        setMenuPageTitle("Waiting For Approval Funding");
        setCurrentPageNo(1);
        setSearchTerms("");
        setFundingListStatus("pending");
        fetchFunding({
          page: 1,
          status: "pending",
          searchTxt: "",
        });
      },
    });
    result.push({
      label: <>Archived</>,
      key: "archivedFunding",
      onClick: () => {
        setActiveMenuName("archivedFunding");
        setMenuPageTitle("Archive Funding");
        setCurrentPageNo(1);
        setSearchTerms("");
        setFundingListStatus("archive");
        fetchFunding({
          page: 1,
          status: "archive",
          searchTxt: "",
        });
      },
    });

    return result;
  };

  useEffect(() => {
    fetchFunding({
      page: currentPageNo,
      searchTxt: searchTerms,
      status: fundingListStatus,
    });
  }, []);

  return (
    <>
      <FundingList
        listDatas={fundingList}
        handleCreateUrl={handleCreate}
        permission={{
          funding_create: hasAcessFunctionality({ name: "funding_create" }),
          funding_edit: hasAcessFunctionality({ name: "funding_edit" }),
          funding_view: hasAcessFunctionality({ name: "funding_view" }),
          funding_analytics: hasAcessFunctionality({
            name: "funding_analytics",
          }),
          funding_delete: hasAcessFunctionality({ name: "funding_delete" }),
          funding_approve: hasAcessFunctionality({ name: "funding_approve" }),
        }}
        pageLoading={loading}
        fetchList={({ page = 1, status = "active", searchTxt = "" }) => {
          fetchFunding({ page, status, searchTxt });
          setFundingListStatus(status);
        }}
        pagination={{
          currentPage: currentPageNo,
          pageSize,
          total: totalFundings,
          setCurrentPage: (pageNo: number = 0) => {
            setCurrentPageNo(pageNo);
          },
        }}
        searchTxt={searchTerms}
        setSearchTxt={(txt1) => {
          setSearchTerms(txt1);
        }}
        menu={{
          items: getTagMenus(),
          activeKey: activeMenuName,
          setActiveMenu: (menuTxt: string): void => {
            setActiveMenuName(menuTxt);
          },
        }}
        handleEditUrl={handleFundEdit}
        handleArchiveFunding={handleArchive}
        handleDeleteFunding={handleDelete}
        handleUnarchiveFunding={handleUnarchive}
        handleApproveFunding={handleApprove}
        listPageTitle={menuPageTitle}
        handleViewFunding={handleView}
      />
    </>
  );
};

export default Funding;
