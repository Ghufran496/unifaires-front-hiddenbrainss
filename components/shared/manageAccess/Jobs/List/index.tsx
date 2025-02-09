import { defaultValue, JobListContext } from "./JobListContext";
import { JobListType } from "./DataTypes";
import JobListSub from "./JobListSub";

const JobList = (inputCompontValues: JobListType = defaultValue) => {
  return (
    <JobListContext.Provider value={inputCompontValues}>
      <JobListSub />
    </JobListContext.Provider>
  );
};

export default JobList;
