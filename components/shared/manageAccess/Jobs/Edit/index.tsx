"use client";
import EditJob1 from "./EditJob1";
import { editJobContext, editDefault } from "./editContext";
import { EditJobCompType } from "./Datatype";

const EditJobComp = (inputObj: EditJobCompType = editDefault) => {
  return (
    <>
      <editJobContext.Provider value={inputObj}>
        <EditJob1 />
      </editJobContext.Provider>
    </>
  );
};

export default EditJobComp;
