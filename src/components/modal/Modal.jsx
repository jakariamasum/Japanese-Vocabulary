/* eslint-disable react/prop-types */
import { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "visible";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto my-8">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold truncate">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4 max-h-[calc(100vh-10rem)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
