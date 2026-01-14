import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  activeClassName?: string;
  className?: string;
}

/**
 * A custom NavLink component for React Router that handles active states.
 * Designed to look premium and feel responsive.
 */
const NavLink = ({
  href,
  children,
  activeClassName = "text-[#135BEC] after:scale-x-100",
  className,
}: NavLinkProps) => {
  const { pathname } = useLocation();
  const isActive = pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "relative text-sm font-semibold text-[#0A2665]/70 transition-all duration-300 hover:text-[#0A2665] py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#135BEC] after:origin-left after:transition-transform after:duration-300 after:scale-x-0 group",
        isActive && activeClassName,
        className
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
