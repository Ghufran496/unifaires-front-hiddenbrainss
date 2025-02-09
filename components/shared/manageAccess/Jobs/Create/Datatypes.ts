export type CreateJobCompType = {
  breadCombs: { items: Array<{ title: string; href?: string }> };
  steps: {
    current: number;
    setCurrent: (stepNo: number) => any;
    requestBody: any;
    setRequestBody: (reqObj: any) => any;
    nextPage?: () => any;
    prevPage?: () => any;
  };
  pageLoading: boolean;
  setPageLoading: (loadStatus: boolean) => any;
  handleSave: () => any;
  setJobCategoryId: (categoryId: string) => any;
};
