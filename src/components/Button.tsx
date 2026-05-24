
import React from "react";

export type ButtonVariant =
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "outlined"
    | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    fullWidth?: boolean;
}

type VariantStyle = {
    base: React.CSSProperties;
    hover: React.CSSProperties;
    active: React.CSSProperties;
};

const baseStyle: React.CSSProperties = {
    alignItems: "center",
    border: "1px solid transparent",
    borderRadius: "8px",
    boxSizing: "border-box",
    cursor: "pointer",
    display: "inline-flex",
    fontFamily: "inherit",
    fontWeight: 600,
    gap: "8px",
    justifyContent: "center",
    lineHeight: 1.2,
    minHeight: "36px",
    outline: "none",
    textDecoration: "none",
    transition:
        "background-color 160ms ease, border-color 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 120ms ease",
    userSelect: "none",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
};

const variantStyles: Record<ButtonVariant, VariantStyle> = {
    primary: {
        base: {
            backgroundColor: "#2563eb",
            color: "#ffffff",
            boxShadow: "0 1px 2px rgba(37, 99, 235, 0.24)",
        },
        hover: { backgroundColor: "#1d4ed8" },
        active: { backgroundColor: "#1e40af", transform: "translateY(1px)" },
    },
    secondary: {
        base: {
            backgroundColor: "#f3f4f6",
            borderColor: "#e5e7eb",
            color: "#111827",
        },
        hover: { backgroundColor: "#e5e7eb" },
        active: { backgroundColor: "#d1d5db", transform: "translateY(1px)" },
    },
    danger: {
        base: {
            backgroundColor: "#dc2626",
            color: "#ffffff",
            boxShadow: "0 1px 2px rgba(220, 38, 38, 0.22)",
        },
        hover: { backgroundColor: "#b91c1c" },
        active: { backgroundColor: "#991b1b", transform: "translateY(1px)" },
    },
    success: {
        base: {
            backgroundColor: "#16a34a",
            color: "#ffffff",
            boxShadow: "0 1px 2px rgba(22, 163, 74, 0.22)",
        },
        hover: { backgroundColor: "#15803d" },
        active: { backgroundColor: "#166534", transform: "translateY(1px)" },
    },
    outlined: {
        base: {
            backgroundColor: "transparent",
            borderColor: "#9ca3af",
            color: "#374151",
        },
        hover: {
            backgroundColor: "#f9fafb",
            borderColor: "#6b7280",
        },
        active: { backgroundColor: "#f3f4f6", transform: "translateY(1px)" },
    },
    ghost: {
        base: {
            backgroundColor: "transparent",
            color: "#374151",
        },
        hover: { backgroundColor: "#f3f4f6" },
        active: { backgroundColor: "#e5e7eb", transform: "translateY(1px)" },
    },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm: {
        fontSize: "14px",
        minHeight: "32px",
        padding: "7px 12px",
    },
    md: {
        fontSize: "16px",
        minHeight: "40px",
        padding: "10px 16px",
    },
    lg: {
        fontSize: "18px",
        minHeight: "48px",
        padding: "13px 22px",
    },
};

const disabledStyle: React.CSSProperties = {
    boxShadow: "none",
    cursor: "not-allowed",
    opacity: 0.58,
    pointerEvents: "none",
    transform: "none",
};

const iconStyle: React.CSSProperties = {
    alignItems: "center",
    display: "inline-flex",
    flexShrink: 0,
    lineHeight: 0,
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            name = "Click Me",
            variant = "primary",
            size = "md",
            startIcon,
            endIcon,
            fullWidth = false,
            className,
            disabled = false,
            style,
            type = "button",
            onMouseEnter,
            onMouseLeave,
            onMouseDown,
            onMouseUp,
            onFocus,
            onBlur,
            ...props
        },
        ref
    ) => {
        const [interaction, setInteraction] = React.useState<
            "idle" | "hover" | "active"
        >("idle");
        const [isFocused, setIsFocused] = React.useState(false);

        const variantStyle = variantStyles[variant];
        const content = children ?? name;

        const currentStyle: React.CSSProperties = {
            ...baseStyle,
            ...variantStyle.base,
            ...sizeStyles[size],
            ...(fullWidth ? { width: "100%" } : undefined),
            ...(interaction === "hover" ? variantStyle.hover : undefined),
            ...(interaction === "active" ? variantStyle.active : undefined),
            ...(isFocused && !disabled
                ? { boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.22)" }
                : undefined),
            ...(disabled ? disabledStyle : undefined),
            ...style,
        };

        return (
            <button
                ref={ref}
                type={type}
                className={className}
                style={currentStyle}
                disabled={disabled}
                aria-label={props["aria-label"] || (typeof content === "string" ? content : undefined)}
                onMouseEnter={(event) => {
                    if (!disabled) setInteraction("hover");
                    onMouseEnter?.(event);
                }}
                onMouseLeave={(event) => {
                    if (!disabled) setInteraction("idle");
                    onMouseLeave?.(event);
                }}
                onMouseDown={(event) => {
                    if (!disabled) setInteraction("active");
                    onMouseDown?.(event);
                }}
                onMouseUp={(event) => {
                    if (!disabled) setInteraction("hover");
                    onMouseUp?.(event);
                }}
                onFocus={(event) => {
                    setIsFocused(true);
                    onFocus?.(event);
                }}
                onBlur={(event) => {
                    setIsFocused(false);
                    setInteraction("idle");
                    onBlur?.(event);
                }}
                {...props}
            >
                {startIcon && <span style={iconStyle}>{startIcon}</span>}
                <span>{content}</span>
                {endIcon && <span style={iconStyle}>{endIcon}</span>}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;
