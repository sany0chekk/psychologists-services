import React from "react";

interface Props {
  children: React.ReactNode;
  variant?: "bordered" | "filled";
  className?: string;
}

export default function Button({
  children,
  variant = "filled",
  className = "",
}: Props) {
  const defaultStyles = "";
  const variantStyles = variant === "filled" ? "" : "";

  return (
    <button className={`${defaultStyles} ${variantStyles} ${className}`}>
      {children}
    </button>
  );
}
