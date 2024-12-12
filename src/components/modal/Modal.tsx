import React from "react";

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
  const handleClose = () => {
    closeModal();
  };

  return (
    <div
      className={`${
        isOpen
          ? "visible opacity-100 pointer-events-auto"
          : "invisible opacity-0 pointer-events-none"
      } absolute top-0 left-0 z-50 w-full h-full flex items-center justify-center px-4 bg-dark bg-opacity-60 transition-all`}
    >
      <div className={`bg-light p-16 rounded-2xl relative ${className}`}>
        <button
          className="absolute top-5 right-5 transition-opacity hover:opacity-70"
          onClick={handleClose}
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
