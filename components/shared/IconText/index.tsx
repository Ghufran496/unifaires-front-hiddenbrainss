import React from "react";

const IconText = ({
  icon,
  text,
  title,
  className,
}: {
  title?: string;
  className?: string;
  text: React.ReactNode;
  icon: React.ReactNode;
}) => (
  <div title={title} className={`flex items-center gap-1 ${className}`}>
    {icon}
    {text}
  </div>
);

export default IconText;
