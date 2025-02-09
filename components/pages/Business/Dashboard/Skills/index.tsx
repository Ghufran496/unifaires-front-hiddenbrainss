"use client";
import React from "react";
import SidebarSearch from "../SidebarSearch";
import Categories from "./components/Categories";
import SkillTags from "./components/SkillTags";

import { data_categories } from "./dummy/index";

function Skills() {
  const [categoriesPicked, setCategoriesPicked] = React.useState<any[]>([]);
  const [skillsPicked, setSkillsPicked] = React.useState<any[]>([]);

  function handleCategory(event: any) {
    if (event.target.checked) {
      const nextCategoriesPicked = [...categoriesPicked];
      nextCategoriesPicked.push(event.target.value);

      setCategoriesPicked(nextCategoriesPicked);
    }

    if (!event.target.checked) {
      const categoryIndex = categoriesPicked.indexOf(event.target.value);
      const nextCategoriesPicked = [...categoriesPicked];

      nextCategoriesPicked.splice(categoryIndex, 1);
      setCategoriesPicked(nextCategoriesPicked);

      const removedCategorySkills = data_categories.find(
        (c) => c.name === event.target.value
      )?.skills;

      const nextSkillsPicked = [...skillsPicked];

      for (let skill of skillsPicked) {
        if (removedCategorySkills?.includes(skill)) {
          const skillIndex = nextSkillsPicked.indexOf(skill);
          nextSkillsPicked.splice(skillIndex, 1);
        }
      }

      setSkillsPicked(nextSkillsPicked);
    }
  }

  function handleSkill(event: any) {
    if (event.target.checked) {
      const nextSkillsPicked = [...skillsPicked];
      nextSkillsPicked.push(event.target.value);

      setSkillsPicked(nextSkillsPicked);
    }

    if (!event.target.checked) {
      const skillIndex = skillsPicked.indexOf(event.target.value);
      const nextSkillsPicked = [...skillsPicked];

      nextSkillsPicked.splice(skillIndex, 1);
      setSkillsPicked(nextSkillsPicked);
    }
  }

  return (
    <div className="min-w-[250px] mt-2 max-w-[250px] max-[830px]:min-w-[100%] max-[830px]:max-w-[100%] max-[830px]:mb-[50px]">
      <h2 className="text-[1.25rem] font-semibold leading-none mb-[15px]">
        Skills & Expertise
      </h2>
      <div className="mb-[20px]">
        <SidebarSearch placeholder="Search Skills..." />
      </div>
      <Categories
        categories={data_categories}
        handleCategory={handleCategory}
      />
      {categoriesPicked.length > 0 && (
        <SkillTags
          categories={data_categories}
          categoriesPicked={categoriesPicked}
          handleSkill={handleSkill}
        />
      )}
      {categoriesPicked.length > 0 && skillsPicked.length > 0 && (
        <div className="flex gap-[20px]">
          <button className="py-[10px] px-[30px] bg-purple-600 text-white border-none rounded-[5px]">
            Save
          </button>
          <button className=" text-purple-600">Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Skills;
