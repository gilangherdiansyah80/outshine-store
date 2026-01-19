import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@outshine/lib/utils";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  iconClassName?: string;
}

export const AccordionItem = ({
  title,
  children,
  isOpen,
  onClick,
  className,
  titleClassName,
  contentClassName,
  iconClassName,
}: AccordionItemProps) => {
  return (
    <div className={cn("border-t border-white/10", className)}>
      <button
        onClick={onClick}
        className="w-full py-6 flex justify-between items-center text-left"
      >
        <span
          className={cn(
            "text-sm font-bold tracking-widest text-white uppercase",
            titleClassName,
          )}
        >
          {title}
        </span>
        {isOpen ? (
          <ChevronUp className={cn("w-5 h-5 text-white", iconClassName)} />
        ) : (
          <ChevronDown className={cn("w-5 h-5 text-white", iconClassName)} />
        )}
      </button>
      {isOpen && (
        <div
          className={cn(
            "pb-8 animate-in fade-in slide-in-from-top-2 duration-300",
            contentClassName,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
