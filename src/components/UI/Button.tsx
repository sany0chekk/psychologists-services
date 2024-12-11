import React from "react";

interface Props {
  children: React.ReactNode;
  variant?: "bordered" | "filled";
  className?: string;
}

export default function Button({
  children,
  variant = "bordered",
  className = "",
}: Props) {
  const defaultStyles =
    "flex items-center gap-4 font-medium text-base text-dark rounded-full";
  const variantStyles =
    variant === "filled"
      ? "text-light bg-green transition-colors hover:bg-darkGreen"
      : "border border-1 border-[rgba(25, 26, 21, 0.2)] transition-opacity hover:opacity-50";

  return (
    <button className={`${defaultStyles} ${variantStyles} ${className}`}>
      {children}
    </button>
  );
}
