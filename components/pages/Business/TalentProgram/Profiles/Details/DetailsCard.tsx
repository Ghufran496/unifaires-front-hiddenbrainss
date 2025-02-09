"use client";
import React from "react";
// next
// antd and Icon components
import { Card, Button } from "antd";
// app components

const DetailsCard = () => {
  return (
    <Card className="shadow-sm sticky mb-6 top-0">
      <div className="flex flex-col gap-4 mt-6">
        <Button block type="primary" size="large">
          1st person Interview
        </Button>
        <Button block type="default" danger size="large">
          Reject
        </Button>
      </div>
    </Card>
  );
};

export default DetailsCard;
