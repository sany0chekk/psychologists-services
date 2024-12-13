import React from "react";
import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  variant?: "bordered" | "filled";
  type?: "button" | "submit" | "link";
  href?: string;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "bordered",
  type = "button",
  href = "",
  className = "",
  onClick = () => {},
}: Props) {
  const defaultStyles =
    "inline-flex items-center gap-4 font-medium text-base text-dark rounded-full";
  const variantStyles =
    variant === "filled"
      ? "text-light bg-green transition-colors hover:bg-darkGreen"
      : "border border-1 border-[rgba(25, 26, 21, 0.2)] transition-opacity hover:opacity-50";

  if (type === "link") {
    return (
      <Link
        to={href}
        type={type}
        className={`${defaultStyles} ${variantStyles} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${defaultStyles} ${variantStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
