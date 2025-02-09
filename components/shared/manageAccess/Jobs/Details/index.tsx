"use client";
import JobDetails from "./JobDetails";
import { jobDetailsContext, defaultValues } from "./JobDetailsContext";
import { JobDetailsCompType } from "./Datatypes";

const JobsView = (inputObj: JobDetailsCompType = defaultValues) => {
  return (
    <>
      <jobDetailsContext.Provider value={inputObj}>
        <JobDetails />
      </jobDetailsContext.Provider>
    </>
  );
};

export default JobsView;
