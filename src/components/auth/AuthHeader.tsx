import React from "react";
import Button from "../ui/Button";

export default function AuthHeader() {
  return (
    <ul className="flex items-center gap-2">
      <li>
        <Button variant="bordered" className="py-3.5 px-10">
          Log In
        </Button>
      </li>
      <li>
        <Button variant="filled" className="py-3.5 px-10">
          Registration
        </Button>
      </li>
    </ul>
  );
}
