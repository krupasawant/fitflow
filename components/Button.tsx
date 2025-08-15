'use client';
import Image from "next/image";
import { ReactNode } from "react";



type ButtonProps = {
  type?: 'button' | 'submit';
  children?: ReactNode; 
  title?: string;
  icon?: string;
  className?:string;
   onClick?: () => void;
   disabled?: boolean;
}

const Button = ({ type='button',children, title, icon, className, onClick , disabled}: ButtonProps) => {
  return (
    <button
      type={type} title={title}
      className={`font-semibold py-2 px-4 rounded-md shadow-sm
        transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
        ${className}`}
        disabled={disabled}
        onClick={onClick}
    >
    <span className="flex items-center space-x-2">
        {/* Conditionally render the icon if it exists */}
      {icon && <Image src={icon} alt={title || ""} width={24} height={24} />}
      <span>{children || title}</span>
      </span>
    </button>
  )
}

export default Button