import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "primary" | "accent";
  className?: string;
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  variant = "primary",
  className,
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "group p-8 rounded-xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      <div
        className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110",
          variant === "primary"
            ? "bg-secondary text-primary"
            : "bg-accent/10 text-accent"
        )}
      >
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
