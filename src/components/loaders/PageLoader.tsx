import React from "react";

export default function PageLoader() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-lg z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green mx-auto"></div>
        <h2 className="font-bold text-dark mt-4 text-2xl">Loading...</h2>
        <p className="font-semibold text-lg text-grey">
          Your adventure is about to begin
        </p>
      </div>
    </div>
  );
}
