"use client";
import React, { useState } from "react";
// import DateRangePicker from "date-range-picker";
import "date-range-picker/dist/styles.css"; // Import the CSS for styling
import { DatePicker } from "antd";

const RangeDatePicker: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<Date[] | null>(null);
  const { RangePicker } = DatePicker;
  return (
    <div>
      <h2>Select Date Range</h2>
      <RangePicker
      // onChange={(range: React.SetStateAction<Date[] | null>) =>
      //   setSelectedRange(range)
      // }
      // value={selectedRange}
      />
    </div>
  );
};

export default RangeDatePicker;
