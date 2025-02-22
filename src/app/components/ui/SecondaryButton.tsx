import React from "react";

type SecondaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function SecondaryButton({
  children,
  className = "",
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      {...props}
      className={`px-5 py-2.5 text-white rounded-lg transition-all duration-200 ease-in-out
        bg-red-600 hover:bg-red-700 active:bg-red-800
        disabled:bg-gray-400 disabled:cursor-not-allowed
        focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800
        shadow-md hover:shadow-lg active:shadow-none ${className}`}
    >
      {children}
    </button>
  );
}
