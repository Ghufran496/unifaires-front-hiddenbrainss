import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Config from "@/app/utils/config";

type AllDetailsType = {
  businessAccess: Array<string>;
  roleName: string;
  ownerDetails: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    roleId: string;
  };
};

type HasAccessMenuType = {
  name: "job" | "funding" | "content" | "help_support";
};

type HasAccessFunctionType = {
  name:
    | "job_view"
    | "job_create"
    | "job_edit"
    | "job_delete"
    | "job_approve"
    | "job_analytics"
    | "funding_view"
    | "funding_create"
    | "funding_analytics"
    | "funding_delete"
    | "funding_edit"
    | "content_edit"
    | "content_analytics"
    | "content_create"
    | "content_view"
    | "content_delete"
    | "help_support_assign_ticket"
    | "content_approve"
    | "funding_approve";
};

const useManageUserPermission = () => {
  const { data: session } = useSession();
  const [roleName, setRoleName] = useState<string>("");
  const [permissions, setPermissions] = useState<Array<string>>([]);
  const allDetails = session?.user?.businessAccess;

  /**
   * Extract permission datas
   */
  const extractPermissionDatas = (allDataObj: AllDetailsType): void => {
    const roleTitle: string =
      typeof allDataObj?.roleName === "string" ? allDataObj.roleName : "";
    setRoleName(roleTitle);
    const permissionArr: Array<string> = (
      Array.isArray(allDataObj?.businessAccess) ? allDataObj.businessAccess : []
    ).filter((itemTxt: string) => {
      return typeof itemTxt === "string" && itemTxt.trim() !== "";
    });
    setPermissions(permissionArr);
  };

  /**
   * Check whether the input menu string has access right or not
   */
  const hasAccessMenu = (inputObj: HasAccessMenuType): boolean => {
    const permissionArr: any = Config.ROLE_PERMISSIONS;
    if (!Array.isArray(permissionArr?.[inputObj?.name])) {
      return false;
    }
    const permissionIndex = permissions.findIndex((itemTxt: string) => {
      return (
        typeof itemTxt === "string" && itemTxt.search(inputObj.name) !== -1
      );
    });

    return permissionIndex > -1 ? true : false;
  };

  /**
   * Check whether the functionality has acess or not
   */
  const hasAcessFunctionality = (inputObj: HasAccessFunctionType): boolean => {
    let permissionVals: Array<any> = Object.values(Config.ROLE_PERMISSIONS);
    permissionVals = permissionVals.flatMap((itemObj) => {
      return itemObj;
    });
    if (
      !(
        typeof inputObj?.name === "string" &&
        permissionVals.includes(inputObj.name.toLowerCase().trim())
      ) ||
      !permissions.includes(inputObj.name.toLowerCase().trim())
    ) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (typeof allDetails !== "undefined") {
      extractPermissionDatas(allDetails);
    }
  }, [allDetails]);

  return { roleName, permissions, hasAccessMenu, hasAcessFunctionality };
};

export { useManageUserPermission };
