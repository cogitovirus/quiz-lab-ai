// src/app/components/ui/PrimaryButton.tsx
import React from 'react';

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function PrimaryButton({
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
    >
      {children}
    </button>
  );
}
