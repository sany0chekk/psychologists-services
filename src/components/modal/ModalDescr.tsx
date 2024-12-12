import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function ModalDescr({ children, className = "" }: Props) {
  return (
    <p className={`font-normal text-base text-dark opacity-50 ${className}`}>
      {children}
    </p>
  );
}
