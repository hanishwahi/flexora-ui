
import React from "react";

type Variant = "primary" | "secondary" | "danger" | "success" | "outlined";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name?: string;
    variant?: Variant;
    size?: Size;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

function Button({
    name = "Click Me",
    variant = "primary",
    size = "md",
    startIcon,
    endIcon,
    className = "",
    disabled = false,
    ...props
}: ButtonProps) {
    const baseStyles =
        "font-semibold rounded cursor-pointer transition-all duration-200 focus:outline-none flex items-center justify"

    // Variants
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-black hover:bg-gray-300",
        danger: "bg-red-600 text-white hover:bg-red-700",
        success: "bg-green-600 text-white hover:bg-green-700",
        outlined:
            "border border-gray-500 text-gray-700 hover:bg-gray-100 bg-transparent",
    };

    // Sizes
    const sizes = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    // Combine all classes
    const finalClass = `
    ${baseStyles} 
    ${variants[variant]} 
    ${sizes[size]} 
  ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} 
    ${className}
  `;

    return (
        <button
            className={finalClass}
            disabled={disabled}
            aria-label={props["aria-label"] || name}
            {...props}
        >
            {startIcon && <span className="mr-2">{startIcon}</span>}
            {name}
            {endIcon && <span className="ml-2">{endIcon}</span>}
        </button>
    );
}

export default Button;
