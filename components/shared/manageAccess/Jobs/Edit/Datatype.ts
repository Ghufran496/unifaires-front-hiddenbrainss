export type EditJobCompType = {
  breadCombs: { items: Array<{ title: string; href?: string }> };
  steps: {
    current: number;
    setCurrent: (stepNo: number) => any;
  };
  pageLoading: boolean;
  setPageLoading: (loadStatus: boolean) => any;
  handleSave: (inputObj: any) => any;
  jobInfo: any;
  fetchDatas: () => any;
  makePayment: (jobPayment: any) => any;
};
