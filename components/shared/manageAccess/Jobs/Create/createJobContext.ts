import { createContext } from "react";
import { CreateJobCompType } from "./Datatypes";

export const defaultValues: CreateJobCompType = {
  breadCombs: {
    items: [{ title: "Jobs" }, { title: "Create Jobs" }],
  },
  steps: {
    current: 1,
    setCurrent: () => {},
    requestBody: undefined,
    setRequestBody: () => {},
    nextPage: () => {},
    prevPage: () => {},
  },
  pageLoading: false,
  setPageLoading: () => {},
  handleSave: () => {},
  setJobCategoryId: () => {},
};

export const createJobContext = createContext(defaultValues);
