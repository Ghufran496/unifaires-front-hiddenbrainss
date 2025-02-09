"use client";
import React from "react";
import IndustryTag from "./IndusTag";

// interface ISector {
//   name: string;
//   sector: Array<string>;
// }

function IndustryTags({ categories, categoriesPicked, handleSector }: any) {
  const sector = React.useMemo(
    function () {
      const sector = [];

      for (let categoryPicked of categoriesPicked) {
        const category = categories.find(
          (category: any) => category.name === categoryPicked
        );

        const childrenCategory = category?.children;
        const subCat =
          childrenCategory &&
          childrenCategory.map((child: any) => {
            return child;
          });

        subCat && sector.push(...subCat);
      }

      return sector;
    },
    [categories, categoriesPicked]
  );

  return (
    sector.length > 0 && (
      <div className="rounded-[10px] mb-[50px] flex gap-[10px] flex-wrap max-h-[130px] overflow-y-auto custom-scrollbar1`">
        {sector.map(function (sec, index) {
          return (
            <IndustryTag sec={sec} key={index} handleSector={handleSector} />
          );
        })}
      </div>
    )
  );
}

export default IndustryTags;
