import { Field } from "formik";
import React from "react";

interface Props {
  name: string;
  type: string;
  placeholder: string;
  className?: string;
}

export default function Input({ name, type, placeholder, className }: Props) {
  return (
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      className={`outline-none p-4 border border-1 border-[rgba(25, 26, 21, 0.1)] rounded-2xl w-full transition-all focus:border-dark focus:border-opacity-30 ${className}`}
    />
  );
}
