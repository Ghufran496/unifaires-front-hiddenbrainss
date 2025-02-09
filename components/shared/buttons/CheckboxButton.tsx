"use client";
import React, { useState } from "react";
//
// import { CheckboxProps } from "antd/lib/checkbox";

const getUniqueId = (() => {
  const now = Date.now();
  let seed = 0;
  return () => `checkbox-button-${now}-${seed++}`;
})();

export const checkBoxButtonLabelClass =
  "group transition inline-flex justify-between items-center cursor-pointer rounded-full px-4 py-1 border peer-checked:bg-purple-60 peer-checked:text-purple-500 peer-checked:border-purple-500";

const CheckboxButton = ({ value, label }: { value: string; label: string }) => {
  const uid = getUniqueId();

  const [checked, setChecked] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target, e.target.value, e.target.checked);
    setChecked(e.target.checked);
  }

  const cls = `checkbox-button ${checked ? "checkbox-button-checked" : ""}`;

  return (
    <div className="checkbox-button-wrapper">
      <input
        type="checkbox"
        value={value}
        id={uid}
        className="checkbox-button-hidden"
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor={uid} className={cls}>
        {label}
      </label>
    </div>
  );
};

export default CheckboxButton;
