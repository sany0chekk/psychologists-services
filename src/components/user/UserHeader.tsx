import React from "react";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/user/operations";

export default function UserHeader() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex items-center max-laptop:justify-center gap-7">
      <div className="flex items-center gap-4">
        <span className="w-10 h-10 bg-green rounded-md flex items-center justify-center">
          <svg className="w-6 h-6 fill-light">
            <use href="./svg/icons.svg#icon-user"></use>
          </svg>
        </span>
        <p className="font-medium">{user?.displayName}</p>
      </div>
      <Button className="py-3.5 px-10" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
}
