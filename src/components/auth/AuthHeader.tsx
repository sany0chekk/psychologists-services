import React from "react";
import Button from "../ui/Button";

interface Props {
  onLoginOpen: () => void;
  onRegistrationOpen: () => void;
}

export default function AuthHeader({ onLoginOpen, onRegistrationOpen }: Props) {
  return (
    <>
      <ul className="flex flex-col sm:flex-row max-laptop:justify-center items-center gap-2">
        <li>
          <Button
            variant="bordered"
            className="py-3.5 px-10"
            onClick={onLoginOpen}
          >
            Log In
          </Button>
        </li>
        <li>
          <Button
            variant="filled"
            className="py-3.5 px-10"
            onClick={onRegistrationOpen}
          >
            Registration
          </Button>
        </li>
      </ul>
    </>
  );
}
