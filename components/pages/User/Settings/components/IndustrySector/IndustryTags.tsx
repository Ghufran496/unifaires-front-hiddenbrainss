"use client";
import React from "react";
import IndustryTag from "./IndusTag";

// interface ISector {
//   name: string;
//   skills: Array<string>;
// }

function IndustryTags({ categories, categoriesPicked, handleSkill }: any) {
  const skills = React.useMemo(
    function () {
      const skills = [];

      for (let categoryPicked of categoriesPicked) {
        const category = categories.find(
          (category: any) => category.name === categoryPicked
        );

        category?.skills && skills.push(...category.skills);
      }

      return skills;
    },
    [categories, categoriesPicked]
  );

  return (
    skills.length > 0 && (
      <div className="rounded-[10px] mb-[50px] flex gap-[10px] flex-wrap max-h-[130px] overflow-y-auto">
        {skills.map(function (skill, index) {
          return (
            <IndustryTag skill={skill} key={index} handleSkill={handleSkill} />
          );
        })}
      </div>
    )
  );
}

export default IndustryTags;
