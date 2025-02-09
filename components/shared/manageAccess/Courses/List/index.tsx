import { courseListContext, defaultDatas } from "./couseListContext";
import { CouseListCompType } from "./Datatypes";
import MainList from "./MainList";

const MainListComp = (inputObj: CouseListCompType = defaultDatas) => {
  return (
    <>
      <courseListContext.Provider value={inputObj}>
        <MainList />
      </courseListContext.Provider>
    </>
  );
};

export default MainListComp;
