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

type ButtonCssVars = React.CSSProperties & {
    "--flexora-button-bg"?: string;
    "--flexora-button-color"?: string;
    "--flexora-button-border"?: string;
    "--flexora-button-shadow"?: string;
    "--flexora-button-hover-bg"?: string;
    "--flexora-button-hover-border"?: string;
    "--flexora-button-active-bg"?: string;
};

type VariantStyle = {
    vars: ButtonCssVars;
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
        vars: {
            "--flexora-button-bg": "#2563eb",
            "--flexora-button-color": "#ffffff",
            "--flexora-button-border": "transparent",
            "--flexora-button-shadow": "0 1px 2px rgba(37, 99, 235, 0.24)",
            "--flexora-button-hover-bg": "#1d4ed8",
            "--flexora-button-active-bg": "#1e40af",
        },
    },
    secondary: {
        vars: {
            "--flexora-button-bg": "#f3f4f6",
            "--flexora-button-color": "#111827",
            "--flexora-button-border": "#e5e7eb",
            "--flexora-button-shadow": "none",
            "--flexora-button-hover-bg": "#e5e7eb",
            "--flexora-button-active-bg": "#d1d5db",
        },
    },
    danger: {
        vars: {
            "--flexora-button-bg": "#dc2626",
            "--flexora-button-color": "#ffffff",
            "--flexora-button-border": "transparent",
            "--flexora-button-shadow": "0 1px 2px rgba(220, 38, 38, 0.22)",
            "--flexora-button-hover-bg": "#b91c1c",
            "--flexora-button-active-bg": "#991b1b",
        },
    },
    success: {
        vars: {
            "--flexora-button-bg": "#16a34a",
            "--flexora-button-color": "#ffffff",
            "--flexora-button-border": "transparent",
            "--flexora-button-shadow": "0 1px 2px rgba(22, 163, 74, 0.22)",
            "--flexora-button-hover-bg": "#15803d",
            "--flexora-button-active-bg": "#166534",
        },
    },
    outlined: {
        vars: {
            "--flexora-button-bg": "transparent",
            "--flexora-button-color": "#374151",
            "--flexora-button-border": "#9ca3af",
            "--flexora-button-shadow": "none",
            "--flexora-button-hover-bg": "#f9fafb",
            "--flexora-button-hover-border": "#6b7280",
            "--flexora-button-active-bg": "#f3f4f6",
        },
    },
    ghost: {
        vars: {
            "--flexora-button-bg": "transparent",
            "--flexora-button-color": "#374151",
            "--flexora-button-border": "transparent",
            "--flexora-button-shadow": "none",
            "--flexora-button-hover-bg": "#f3f4f6",
            "--flexora-button-active-bg": "#e5e7eb",
        },
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

const buttonCss = `
.flexora-button {
    background-color: var(--flexora-button-bg);
    border-color: var(--flexora-button-border);
    box-shadow: var(--flexora-button-shadow);
    color: var(--flexora-button-color);
}

.flexora-button:hover:not(:disabled) {
    background-color: var(--flexora-button-hover-bg);
    border-color: var(--flexora-button-hover-border, var(--flexora-button-border));
}

.flexora-button:active:not(:disabled) {
    background-color: var(--flexora-button-active-bg);
    transform: translateY(1px);
}

.flexora-button:focus-visible:not(:disabled) {
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.22);
}
`;

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
            ...props
        },
        ref
    ) => {
        const variantStyle = variantStyles[variant];
        const content = children ?? name;

        const currentStyle: ButtonCssVars = {
            ...baseStyle,
            ...variantStyle.vars,
            ...sizeStyles[size],
            ...(fullWidth ? { width: "100%" } : undefined),
            ...(disabled ? disabledStyle : undefined),
            ...style,
        };

        return (
            <>
                <style>{buttonCss}</style>
                <button
                    ref={ref}
                    type={type}
                    className={["flexora-button", className]
                        .filter(Boolean)
                        .join(" ")}
                    style={currentStyle}
                    disabled={disabled}
                    aria-label={props["aria-label"] || (typeof content === "string" ? content : undefined)}
                    {...props}
                >
                    {startIcon && <span style={iconStyle}>{startIcon}</span>}
                    <span>{content}</span>
                    {endIcon && <span style={iconStyle}>{endIcon}</span>}
                </button>
            </>
        );
    }
);

Button.displayName = "Button";

export default Button;
