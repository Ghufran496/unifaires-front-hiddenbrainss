"use client";
import React, { useEffect, useState } from "react";
import SidebarSearch from "../SidebarSearch";
import Categories from "./components/Categories";
import SkillTags from "./components/SkillTags";

import { data_categories } from "./dummy/index";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchSkills, fetchUserSkills } from "@/redux/features/UserSlice";
import { handleAxiosError } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import { toast } from "react-toastify";
import { Button, Tag, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function Skills() {
  const dispatch: any = useAppDispatch();
  const [categoriesPicked, setCategoriesPicked] = React.useState<any[]>([]);
  const [skillsPicked, setSkillsPicked] = React.useState<any[]>([]);
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchSkills());
    dispatch(fetchUserSkills());
  }, []);

  const skillsCategories = useAppSelector((state: any) => state.user.allSkills);
  const mySkills = useAppSelector((state: any) => state.user.mySkills);

  // console.log(skillsCategories);

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

  // console.log(skillsPicked);

  function handleCancel() {
    setCategoriesPicked([]);
    setSkillsPicked([]);
  }

  async function handleSaveSkill() {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/users-skills", {
        skills: skillsPicked,
      });

      if (res.status) {
        toast.success("Skill added Succesfully");
        dispatch(fetchUserSkills());
        handleCancel();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteSkill(id: any) {
    try {
      const res = await axiosInstance.delete(`/users-skills/${id}`);

      if (res.status) {
        toast.success("Skill Deleted Succesfully");
        dispatch(fetchUserSkills());
      }
    } catch (error) {
      handleAxiosError(error);
    }
  }

  const filteredSkillsCategories =
    skillsCategories &&
    skillsCategories.filter((skill: any) =>
      skill.name.toLowerCase().includes(searchTerms.toLowerCase())
    );

  return (
    <div className="min-w-[301px] max-w-[301px] max-[830px]:min-w-[100%] max-[830px]:max-w-[100%] max-[830px]:mb-[50px]">
      <div className="mb-6 max-h-[300px] overflow-y-scroll custom-scrollbar">
        <h2 className="text-[1.25rem] font-semibold leading-none mb-[15px]">
          My Skills
        </h2>
        <div className="flex gap-2 flex-wrap ">
          {mySkills &&
            mySkills.map((skill: any) => {
              const mySkill = skill.skill;
              return (
                <Tag
                  key={skill.id}
                  className="flex items-center gap-2 text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-4 py-2 mb-2"
                >
                  {mySkill.name}
                  <DeleteOutlined
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="hover:cursor-pointer text-base hover:font-extrabold hover:text-red-700 font-bold"
                  />
                </Tag>
              );
            })}
        </div>
        {mySkills.length < 1 && (
          <Typography.Paragraph className="text-center text-lg text-[#5832DA] py-4 font-bold">
            No Skills
          </Typography.Paragraph>
        )}
      </div>
      <h2 className="text-[1.25rem] font-semibold leading-none mb-[15px]">
        Add Skills & Expertise
      </h2>
      <div className="mb-[20px]">
        <SidebarSearch
          placeholder="Search Skills..."
          onChange={(e: any) => setSearchTerms(e.target.value)}
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
      {categoriesPicked.length > 0 && skillsPicked.length > 0 && (
        <div className="flex gap-[20px]">
          <Button
            onClick={handleSaveSkill}
            loading={loading}
            size="large"
            className=" flex ml-auto items-center px-6 bg-purple-600 text-white border-none rounded-[5px]"
          >
            Save
          </Button>
          <button className=" text-purple-600" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Skills;
