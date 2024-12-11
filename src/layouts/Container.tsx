import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: Props) {
  return (
    <div
      className={`max-w-screen-sm md:max-w-screen-md laptop:max-w-screen-laptop mx-auto px-4 ${className}`}
    >
      {children}
    </div>
  );
}
