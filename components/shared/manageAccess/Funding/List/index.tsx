import { fundingListContext } from "./FundingListContext";
import FundingListSub from "./ListSub";
import { FundingListCompType } from "./Datatypes";

const FundingList = (inputCompObj: FundingListCompType) => {
  return (
    <fundingListContext.Provider value={inputCompObj}>
      <FundingListSub />
    </fundingListContext.Provider>
  );
};

export default FundingList;
