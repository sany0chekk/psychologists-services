import React from "react";
import HeaderNav from "./HeaderNav";
import UserHeader from "../user/UserHeader";
import AuthHeader from "../auth/AuthHeader";
import { useSelector } from "react-redux";
import { selectIsAuthorized } from "../../redux/user/selectors";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoginOpen: () => void;
  onRegistrationOpen: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  onLoginOpen,
  onRegistrationOpen,
}: Props) {
  const isAuthorized = useSelector(selectIsAuthorized);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`${
        isOpen
          ? "visible opacity-100 translate-x-0 pointer-events-auto"
          : "invisible opacity-0 translate-x-10 pointer-events-none"
      } laptop:hidden fixed top-0 left-0 w-full h-full z-50 bg-light flex flex-col gap-10 p-4 transition-all`}
      onClick={handleClose}
    >
      <button className="ml-auto top-5 right-5 transition-opacity hover:opacity-70">
        <svg className="w-8 h-8 stroke-dark">
          <use href="./svg/icons.svg#icon-close"></use>
        </svg>
      </button>
      <HeaderNav className="flex-grow flex items-center" />
      {isAuthorized ? (
        <UserHeader />
      ) : (
        <AuthHeader
          onLoginOpen={onLoginOpen}
          onRegistrationOpen={onRegistrationOpen}
        />
      )}
    </div>
  );
}
