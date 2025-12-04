import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface BrandTagProps {
  children: React.ReactNode;
  variant?: "blue" | "green";
  className?: string;
  style?: CSSProperties;
}

const BrandTag = ({ children, variant = "blue", className, style }: BrandTagProps) => {
  return (
    <span
      className={cn(
        "inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-primary-foreground uppercase tracking-wider",
        variant === "blue" ? "gradient-brand-horizontal" : "gradient-accent-horizontal",
        className
      )}
      style={style}
    >
      {children}
    </span>
  );
};

export default BrandTag;
