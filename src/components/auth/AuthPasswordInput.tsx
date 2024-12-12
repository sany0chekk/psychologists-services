import React, { useState } from "react";
import Input from "../ui/Input";

interface Props {
  name: string;
  placeholder: string;
  className?: string;
}

export default function AuthPasswordInput({
  name,
  placeholder,
  className,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <Input
        name={name}
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
      />
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="absolute top-1/2 -translate-y-1/2 right-4 transition-opacity hover:opacity-70"
      >
        {isVisible ? (
          <svg className="w-5 h-5 fill-none stroke-dark">
            <use href="./svg/icons.svg#icon-eye"></use>
          </svg>
        ) : (
          <svg className="w-5 h-5 fill-none stroke-dark">
            <use href="./svg/icons.svg#icon-eye-off"></use>
          </svg>
        )}
      </button>
    </div>
  );
}
