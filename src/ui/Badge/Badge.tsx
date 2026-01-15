import { cn } from "@outshine/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "info"
    | "dark";
  className?: string;
  size?: "sm" | "md";
}

const Badge = ({
  children,
  variant = "primary",
  className,
  size = "sm",
}: BadgeProps) => {
  const variants = {
    primary: "bg-[#0A2665] text-white", // Brand Blue
    secondary: "bg-gray-100 text-gray-800",
    danger: "bg-red-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-500 text-white",
    dark: "bg-[#1E1B4B] text-white", // Dark Navy
  };

  const sizes = {
    sm: "text-[10px] px-2 py-1",
    md: "text-xs px-2.5 py-1",
  };

  return (
    <span
      className={cn(
        "font-bold rounded shadow-sm inline-flex items-center justify-center",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
