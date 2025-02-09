"use client";
import React, { useEffect, useState } from "react";
import Categories from "./components/Categories";
import SkillTags from "./components/SkillTags";

import { data_categories } from "./dummy/index";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchSkills, fetchUserSkills } from "@/redux/features/UserSlice";
import { handleAxiosError } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import { toast } from "react-toastify";
import { Button, Input, Tag, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function SkillsAndExpertise({
  categoriesPicked,
  setCategoriesPicked,
  skillsPicked,
  setSkillsPicked,
}: any) {
  const dispatch: any = useAppDispatch();
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchSkills());
  }, []);

  const skillsCategories = useAppSelector((state: any) => state.user.allSkills);

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

  const filteredSkillsCategories =
    skillsCategories &&
    skillsCategories.filter((skill: any) =>
      skill.name.toLowerCase().includes(searchTerms.toLowerCase())
    );

  return (
    <div className="w-full max-[830px]:min-w-[100%] max-[830px]:max-w-[100%] max-[830px]:mb-[50px]">
      <h2 className="text-[1.25rem] font-semibold leading-none mb-[15px]">
        Add Skills & Expertise
      </h2>
      <div className="mt-2">
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
        categories={filteredSkillsCategories}
        handleCategory={handleCategory}
      />

      {categoriesPicked.length > 0 && (
        <SkillTags
          categories={filteredSkillsCategories}
          categoriesPicked={categoriesPicked}
          handleSkill={handleSkill}
        />
      )}
    </div>
  );
}

export default SkillsAndExpertise;
