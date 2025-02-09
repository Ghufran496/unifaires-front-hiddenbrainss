"use client";
import { Input, Select, AutoComplete } from "antd";
import code from "./code.js";

const CountryCode = () => {
  const { Option } = Select;
  return (
    <>
      {code.map((item) => {
        <Input.Group compact key={item.alpha2}>
          <Select defaultValue="+1" style={{ width: "30%" }}>
            <Option
              value={item.code}
            >{`${item.flag} ${item.code} ${item.alpha2}`}</Option>
          </Select>
          <AutoComplete
            style={{ width: "70%" }}
            placeholder="123 456 890"
            // options={[{ value: "text 1" }, { value: "text 2" }]}
          />
        </Input.Group>;
      })}
    </>
  );
};

export default CountryCode;
