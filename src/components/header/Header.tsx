import React, { useState } from "react";
import Container from "../layouts/Container";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectIsAuthorized } from "../../redux/user/selectors";
import AuthHeader from "../auth/AuthHeader";
import UserHeader from "../user/UserHeader";
import HeaderNav from "./HeaderNav";
import MobileMenu from "./MobileMenu";
import AuthLoginModal from "../auth/AuthLoginModal";
import AuthRegistrationModal from "../auth/AuthRegistrationModal";

export default function Header() {
  // const isAuthorized = useSelector(selectIsAuthorized);
  const isAuthorized = false;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isRegistrationVisible, setIsRegistrationVisible] = useState(false);

  const handleLoginOpen = () => {
    setIsLoginVisible(true);
  };
  const handeLoginClose = () => setIsLoginVisible(false);

  const handleRegistrationOpen = () => setIsRegistrationVisible(true);
  const handleRegistrationClose = () => setIsRegistrationVisible(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = "hidden";
  };
  const handleMenuClose = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <header className="py-6 border-b">
        <Container className="flex items-center justify-between">
          <Link to="/" className="text-dark">
            <span className="text-green">psychologists</span>.services
          </Link>
          <div className="hidden laptop:block">
            <HeaderNav />
          </div>

          <div className="hidden laptop:block">
            {isAuthorized ? (
              <UserHeader />
            ) : (
              <AuthHeader
                onLoginOpen={handleLoginOpen}
                onRegistrationOpen={handleRegistrationOpen}
              />
            )}
          </div>
          <button
            className="laptop:hidden w-6 flex flex-col gap-1"
            onClick={handleMenuOpen}
          >
            <span className="w-full h-[2px] bg-dark"></span>
            <span className="w-full h-[2px] bg-dark"></span>
            <span className="w-full h-[2px] bg-dark"></span>
          </button>
        </Container>
      </header>
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
        onLoginOpen={handleLoginOpen}
        onRegistrationOpen={handleRegistrationOpen}
      />
      <AuthLoginModal isOpen={isLoginVisible} closeModal={handeLoginClose} />
      <AuthRegistrationModal
        isOpen={isRegistrationVisible}
        closeModal={handleRegistrationClose}
      />
    </>
  );
}
