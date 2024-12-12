import React, { useState } from "react";
import Button from "../ui/Button";
import AuthLoginModal from "./AuthLoginModal";
import AuthRegistrationModal from "./AuthRegistrationModal";

export default function AuthHeader() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isRegistrationVisible, setIsRegistrationVisible] = useState(false);

  const handleLoginOpen = () => setIsLoginVisible(true);
  const handeLoginClose = () => setIsLoginVisible(false);

  const handleRegistrationOpen = () => setIsRegistrationVisible(true);
  const handleRegistrationClose = () => setIsRegistrationVisible(false);

  return (
    <>
      <ul className="flex items-center gap-2">
        <li>
          <Button
            variant="bordered"
            className="py-3.5 px-10"
            onClick={handleLoginOpen}
          >
            Log In
          </Button>
        </li>
        <li>
          <Button
            variant="filled"
            className="py-3.5 px-10"
            onClick={handleRegistrationOpen}
          >
            Registration
          </Button>
        </li>
      </ul>
      <AuthLoginModal isOpen={isLoginVisible} closeModal={handeLoginClose} />
      <AuthRegistrationModal
        isOpen={isRegistrationVisible}
        closeModal={handleRegistrationClose}
      />
    </>
  );
}
