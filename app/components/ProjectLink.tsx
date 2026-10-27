import Link from "next/link";
import type { ReactNode } from "react";

export interface ProjectLinkProps {
  title: string;
  href: string;
  icon?: ReactNode;
}

export default function ProjectLink({ title, href, icon }: ProjectLinkProps) {
  return (
    <Link
      href={href}
      className="flex aspect-square w-full max-w-40 items-center justify-center border-gray-500 p-4 text-center hover:bg-gray-800 transition-colors duration-100"
    >
      <span className="flex flex-col items-center justify-center gap-3">
        {icon ? <span aria-hidden="true">{icon}</span> : null}
        <span>{title}</span>
      </span>
    </Link>
  );
}
