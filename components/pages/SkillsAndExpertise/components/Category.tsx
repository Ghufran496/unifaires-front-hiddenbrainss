"use client";
import React from "react";
import { Checkbox } from "antd";

function SkillCheckbox({ data }: any) {
  const [checked, setChecked] = React.useState(() => data.defaultChecked);

  function toggleCheck() {
    setChecked(!checked);
  }

  return (
    <div className="flex gap-[10px] ">
      <Checkbox checked={checked} onChange={toggleCheck} />
      <p className="">{data.value}</p>
    </div>
  );
}

export default SkillCheckbox;
