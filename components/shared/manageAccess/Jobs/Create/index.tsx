"use client";
import { CreateJobCompType } from "./Datatypes";
import { createJobContext, defaultValues } from "./createJobContext";
import CreateJob from "./CreateJob";

/**
 * Create job main file
 */
const CreateJobMain = (inputObj: CreateJobCompType = defaultValues) => {
  return (
    <>
      <createJobContext.Provider value={inputObj}>
        <CreateJob />
      </createJobContext.Provider>
    </>
  );
};

export default CreateJobMain;
