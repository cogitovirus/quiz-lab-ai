import React from 'react';

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function PrimaryButton({
  children,
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={`px-5 py-2.5 text-white rounded-lg transition-all duration-200 ease-in-out
        bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
        disabled:bg-gray-400 disabled:cursor-not-allowed
        focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800
        shadow-md hover:shadow-lg active:shadow-none ${className}`}
    >
      {children}
    </button>
  );
}
