/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import DrawerCategorySelector from "@/components/shared/DrawerCategorySelector";
import type { DataListItemMainType } from "@/components/shared/DrawerCategorySelector/DataTypes";
import config from "@/app/utils/config";

const JobCategories = ({ closeAllDrawer }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<Array<DataListItemMainType>>(
    []
  );
  const categoryId: any = useMemo(() => {
    if (
      typeof pathName === "string" &&
      pathName.toLowerCase().trim() === "/career" &&
      typeof searchParams?.get("categoryId") === "string"
    ) {
      return searchParams?.get("categoryId");
    }

    return "";
  }, [searchParams?.get("categoryId"), pathName]);

  /**
   * Handle redirect url
   */
  const handleRedirect = ({ id }: { id: string } = { id: "" }) => {
    router.push(`/career?categoryId=${id}`);
  };

  async function getAllCategory() {
    try {
      setIsLoading(true);
      const result = await axios.get(`${config.API.API_URL}/job-category`, {
        params: { action: "header" },
      });
      const catArr = Array.isArray(result?.data?.data) ? result.data.data : [];
      setCategoryList(catArr);
    } catch (error) {
      setCategoryList([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div>
      <div className="mt-2">
        <DrawerCategorySelector
          dataList={categoryList}
          isLoading={isLoading}
          setIsLoading={(isLoad: boolean) => {
            setIsLoading(isLoad);
          }}
          handleMenuClick={(selectedItem: DataListItemMainType) => {
            handleRedirect({ id: selectedItem?.id });
            closeAllDrawer();
          }}
          selectedItemId={categoryId}
        />
      </div>
    </div>
  );
};

export default JobCategories;
