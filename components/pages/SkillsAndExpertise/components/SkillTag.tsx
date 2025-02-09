"use client";

import React from "react";
import { PlusOutlined } from "@ant-design/icons";

function SkillTag({ skill, handleSkill }: any) {
  const [checked, setChecked] = React.useState(false);

  function toggleCheck(event: any) {
    setChecked(!checked);

    handleSkill(event);
  }

  return (
    <div className="relative">
      <input
        type="checkbox"
        className=" block w-[100%] h-[100%] absolute top-[0px] left-[0px] opacity-0 cursor-pointer"
        checked={checked}
        onChange={toggleCheck}
        value={skill.id}
      />
      <div
        className={`py-[5px] px-[10px] border-x-[1px] border-y-[1px] ${
          checked ? "border-purple-700 bg-purple-60" : ""
        } rounded-[1000px] w-[fit-content] flex gap-[5px] `}
      >
        <PlusOutlined
          className={`transition-transform ${
            checked ? "rotate-[45deg] text-purple-700" : ""
          }`}
        />
        <span className={checked ? " text-purple-700" : ""}>{skill.name}</span>
      </div>
    </div>
  );
}

export default SkillTag;
