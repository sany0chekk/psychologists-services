import React from "react";
import Button from "../ui/Button";

export default function UserHeader() {
  return (
    <div className="flex items-center gap-7">
      <div className="flex items-center gap-4">
        <span className="w-10 h-10 bg-green rounded-md flex items-center justify-center">
          <svg className="w-6 h-6 fill-light">
            <use href="./svg/icons.svg#icon-user"></use>
          </svg>
        </span>
        <p className="font-medium">Ilona</p>
      </div>
      <Button className="py-3.5 px-10">Log out</Button>
    </div>
  );
}
