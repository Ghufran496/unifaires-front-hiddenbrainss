"use client";
import React, { useEffect, useState } from "react";
import Categories from "./IndustryCategory";
import IndustryTags from "./IndustryTags";

import { industry_categories } from "./dummy";
import { Input, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchSectors, fetchSkills } from "@/redux/features/UserSlice";
import { RootState } from "@/redux/store";

function IndustrySector({
  categoriesPicked,
  setCategoriesPicked,
  sectorPicked,
  setSectorPicked,
}: any) {
  const dispatch: any = useAppDispatch();
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchSectors());
  }, []);

  const sectorCategories = useAppSelector(
    (state: any) => state.user.allSectors
  );

  function handleCategory(event: any) {
    if (event.target.checked) {
      const nextCategoriesPicked = [...categoriesPicked];
      nextCategoriesPicked.push(event.target.value);

      setCategoriesPicked(nextCategoriesPicked);
      // console.log(nextCategoriesPicked);
    }

    if (!event.target.checked) {
      const categoryIndex = categoriesPicked.indexOf(event.target.value);
      const nextCategoriesPicked = [...categoriesPicked];

      nextCategoriesPicked.splice(categoryIndex, 1);
      setCategoriesPicked(nextCategoriesPicked);

      const removedCategorySector = industry_categories.find(
        (c) => c.name === event.target.value
      )?.skills;

      const nextSectorPicked = [...sectorPicked];

      for (let skill of sectorPicked) {
        if (removedCategorySector?.includes(skill)) {
          const sectorIndex = nextSectorPicked.indexOf(skill);
          nextSectorPicked.splice(sectorIndex, 1);
        }
      }

      setSectorPicked(nextSectorPicked);
    }
  }

  function handleSector(event: any) {
    if (event.target.checked) {
      const nextSectorPicked = [...sectorPicked];
      nextSectorPicked.push(event.target.value);

      setSectorPicked(nextSectorPicked);
    }

    if (!event.target.checked) {
      const sectorIndex = sectorPicked.indexOf(event.target.value);
      const nextSectorPicked = [...sectorPicked];

      nextSectorPicked.splice(sectorIndex, 1);
      setSectorPicked(nextSectorPicked);
    }
  }

  const filteredSectorCategories =
    sectorCategories &&
    sectorCategories.filter((sec: any) =>
      sec.name.toLowerCase().includes(searchTerms.toLowerCase())
    );

  return (
    <div className="w-full max-[830px]:min-w-[100%] max-[830px]:max-w-[100%] max-[830px]:mb-[50px]">
      <h2 className="text-[1.25rem] font-semibold leading-none mb-[15px]">
        Industry & Sector
      </h2>
      <div className="mt-2 mb-1">
        <Input.Search
          size="large"
          className=""
          placeholder="Search Skills"
          enterButton
          allowClear
          onChange={(e) => setSearchTerms(e.target.value)}
          onSearch={(value) => setSearchTerms(value)}
        />
      </div>
      <Categories
        categories={filteredSectorCategories}
        handleCategory={handleCategory}
      />
      {categoriesPicked.length > 0 && (
        <IndustryTags
          categories={filteredSectorCategories}
          categoriesPicked={categoriesPicked}
          handleSector={handleSector}
        />
      )}
    </div>
  );
}

export default IndustrySector;
