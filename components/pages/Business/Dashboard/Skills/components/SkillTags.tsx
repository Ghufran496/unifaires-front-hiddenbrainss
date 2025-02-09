"use client";
import React from "react";
import SkillTag from "./SkillTag";

function SkillTags({ categories, categoriesPicked, handleSkill }: any) {
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
            <SkillTag skill={skill} key={index} handleSkill={handleSkill} />
          );
        })}
      </div>
    )
  );
}

export default SkillTags;
