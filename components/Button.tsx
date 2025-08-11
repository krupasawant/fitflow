import Image from "next/image";

type ButtonProps = {
  type: 'button' | 'submit';
  title: string;
  icon?: string;
  className?:string;
}

const Button = ({ type, title, icon, className }: ButtonProps) => {
  return (
    <button
      type={type} title={title}
      className={`font-semibold py-2 px-4 rounded-md shadow-sm
        transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
        ${className}`}
    >
    <span className="flex items-center space-x-2">
        {/* Conditionally render the icon if it exists */}
      {icon && <Image src={icon} alt={title} width={24} height={24} />}
      <span>{title}</span>
      </span>
    </button>
  )
}

export default Button