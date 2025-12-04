'use client'
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  href: string;
  className?: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function TransitionLink({
  children,
  href,
  className,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const transitionClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (pathname === href) return;

    document.body.classList.add("page-transition");

    await sleep(400);
    router.push(href);

    setTimeout(() => {
      document.body.classList.remove("page-transition");
    }, 400);
  };

  return (
    <Link
      href={href}
      onClick={transitionClick}
      className={className}   // 👈 FIX: apply it here
      {...props}
    >
      {children}
    </Link>
  );
}
