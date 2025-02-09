import { createContext } from "react";
import { FundingListCompType } from "./Datatypes";

export const defaultValues: FundingListCompType = {
  handleCreateUrl: () => {},
  pageLoading: false,
  fetchList: () => {},
  listDatas: [],
  permission: {
    funding_analytics: true,
    funding_create: true,
    funding_delete: true,
    funding_edit: true,
    funding_view: true,
    funding_approve: false,
  },
  pagination: {
    currentPage: 1,
    pageSize: 10,
    setCurrentPage: () => {},
    total: 0,
  },
  searchTxt: "",
  setSearchTxt: (txt1: string) => {},
  menu: {
    items: [],
    activeKey: "myFunding",
    setActiveMenu: (menuName: string = "") => {},
  },
  handleEditUrl: (fundId = "") => {},
  handleArchiveFunding: (fundId = "") => {},
  handleDeleteFunding: (fundId = "") => {},
  handleUnarchiveFunding: (fundId = "") => {},
  handleApproveFunding: () => {},
  listPageTitle: "",
  handleViewFunding: () => {},
};

export const fundingListContext = createContext(defaultValues);
