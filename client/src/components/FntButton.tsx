// COO Branding: Red #9B2335 button with uppercase text
// Font: DM Sans, tracking-wide
// Responsive: full width on mobile

import { ReactNode } from "react";
import { Link } from "wouter";

interface FntButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  target?: string;
  rel?: string;
  variant?: "primary" | "outline";
}

export default function FntButton({ href, onClick, children, target, rel, variant = "primary" }: FntButtonProps) {
  const isPrimary = variant === "primary";

  const baseClasses =
    "inline-block text-center font-bold text-[13px] sm:text-[15px] tracking-wide uppercase px-5 sm:px-10 py-4 sm:py-5 w-full sm:w-auto transition-all duration-200 no-underline cursor-pointer";

  const bgStyle = isPrimary
    ? { backgroundColor: "#9B2335", color: "#ffffff", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.2 as number, borderRadius: "2px" }
    : { backgroundColor: "transparent", color: "#9B2335", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.2 as number, border: "2px solid #9B2335", borderRadius: "2px" };

  const hoverIn = (e: React.MouseEvent<HTMLElement>) => {
    if (isPrimary) {
      (e.currentTarget as HTMLElement).style.backgroundColor = "#8a0710";
    } else {
      (e.currentTarget as HTMLElement).style.backgroundColor = "#9B2335";
      (e.currentTarget as HTMLElement).style.color = "#ffffff";
    }
  };
  const hoverOut = (e: React.MouseEvent<HTMLElement>) => {
    if (isPrimary) {
      (e.currentTarget as HTMLElement).style.backgroundColor = "#9B2335";
    } else {
      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
      (e.currentTarget as HTMLElement).style.color = "#9B2335";
    }
  };

  // Internal route
  if (href && !target && href.startsWith("/")) {
    return (
      <Link href={href}>
        <span className={baseClasses} style={bgStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
          {children}
        </span>
      </Link>
    );
  }

  // External link
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        style={bgStyle}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={baseClasses}
      style={bgStyle}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
    >
      {children}
    </button>
  );
}
