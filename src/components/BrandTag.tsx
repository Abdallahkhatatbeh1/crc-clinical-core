import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface BrandTagProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const BrandTag = ({ children, className, style }: BrandTagProps) => {
  return (
    <span
      className={cn(
        "inline-block gradient-brand-horizontal px-4 py-1.5 rounded-full text-sm font-semibold text-primary-foreground uppercase tracking-wider",
        className
      )}
      style={style}
    >
      {children}
    </span>
  );
};

export default BrandTag;