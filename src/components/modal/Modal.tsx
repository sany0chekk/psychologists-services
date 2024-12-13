import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  closeModal: () => void;
}

export default function Modal({
  children,
  className = "",
  isOpen,
  closeModal,
}: Props) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
        document.body.style.overflow = "";
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
      document.body.style.overflow = "";
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className={`${
        isOpen
          ? "visible opacity-100 pointer-events-auto"
          : "invisible opacity-0 pointer-events-none"
      } fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center px-4 bg-dark bg-opacity-60 transition-all`}
    >
      <div
        className={`bg-light p-6 max-md:pt-16 md:p-16 rounded-2xl relative ${className}`}
      >
        <button
          className="absolute top-5 right-5 transition-opacity hover:opacity-70"
          onClick={closeModal}
        >
          <svg className="w-8 h-8 stroke-dark">
            <use href="./svg/icons.svg#icon-close"></use>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
