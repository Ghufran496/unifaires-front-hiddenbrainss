"use client";
import React, { forwardRef, ComponentPropsWithoutRef } from "react";

export interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  fluid?: boolean | "sm" | "md" | "lg" | "xl" | "xxl";
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, fluid, ...props }, ref) => {
    const containerDefaultClass = fluid
      ? typeof fluid === "string"
        ? `${fluid}:container`
        : "w-full"
      : "container";

    return (
      <div
        {...props}
        ref={ref}
        className={`${containerDefaultClass} ${
          props.className ? props.className : ""
        }`}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;
