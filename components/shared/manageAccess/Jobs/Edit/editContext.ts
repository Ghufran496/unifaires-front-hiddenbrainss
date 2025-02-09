import { createContext } from "react";
import { EditJobCompType } from "./Datatype";

export const editDefault: EditJobCompType = {
  breadCombs: {
    items: [{ title: "Jobs" }, { title: "Create Jobs" }],
  },
  steps: {
    current: 1,
    setCurrent: () => {},
  },
  pageLoading: false,
  setPageLoading: () => {},
  handleSave: () => {},
  jobInfo: undefined,
  fetchDatas: () => {},
  makePayment: () => {},
};

export const editJobContext = createContext(editDefault);
