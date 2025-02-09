export type FundingCategoryDataType = {
  id: string;
  parentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  hierarchyLevel: number;
};

export type FundingListStatusDataType =
  | "active"
  | "archive"
  | "deactivate"
  | "interviewing"
  | "awarded"
  | "closed"
  | "pending";

export type FundingListDataType = {
  id: string;
  title: string;
  slug: string;
  referenceNo: string;
  size: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  language: string;
  organizationName: string;
  aboutOrganization: string;
  mediaUrl: string;
  details: string;
  isUnifaires: boolean;
  contact: string;
  externalUrl: string;
  type: string;
  fundingPurpose: string;
  deadline: string;
  status: FundingListStatusDataType;
  fundingcategoryId: string;
  createdAt: string;
  updatedAt: string;
  fundingpaymenttypeId: string;
  userId: string;
  businessId: string;
  fundingCategory: FundingCategoryDataType;
  location?: string;
  fundingUrl: string;
};
export type FundingTabType = { label: any; key: string; onClick: () => any };
export type PageMenuKeyType =
  | "myFunding"
  | "archivedFunding"
  | "pendingFunding";

export type FundingListCompType = {
  handleCreateUrl: () => any;
  pageLoading: boolean;
  fetchList: (inputObj: {
    page: number;
    status: FundingListStatusDataType;
    searchTxt: string;
  }) => any;
  listDatas: Array<FundingListDataType>;
  listPageTitle: string;
  permission: {
    funding_view: boolean;
    funding_create: boolean;
    funding_analytics: boolean;
    funding_delete: boolean;
    funding_edit: boolean;
    funding_approve: boolean;
  };
  pagination: {
    total: number;
    pageSize: number;
    currentPage: number;
    setCurrentPage: any;
  };
  searchTxt: string;
  setSearchTxt: (txt1: string) => any;
  menu: {
    items: Array<FundingTabType>;
    activeKey: PageMenuKeyType;
    setActiveMenu: (menuTxt: PageMenuKeyType) => any;
  };
  handleEditUrl: (fundId: string) => any;
  handleArchiveFunding: (fundId: string) => any;
  handleDeleteFunding: (fundId: string) => any;
  handleUnarchiveFunding: (fundId: string) => any;
  handleApproveFunding?: (fundId: string) => any;
  handleViewFunding: (fundId: string) => any;
};
