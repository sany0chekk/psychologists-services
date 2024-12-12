import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function FormTitle({ children, className = "" }: Props) {
  return (
    <h2 className={`font-medium text-[40px] text-dark ${className}`}>
      {children}
    </h2>
  );
}
