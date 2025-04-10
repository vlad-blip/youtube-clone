"use client";

import { Home, Videotape, VideoIcon, UserCircle2 } from "lucide-react";
import { usePathname } from "next/navigation";

import Link from "next/link";

const items = [
  {
    label: "Dashboard",
    link: "/studio/dashboard",
    Icon: Home,
  },
  {
    label: "Content",
    link: "/studio/content",
    Icon: Videotape,
  },
  {
    label: "Comments",
    link: "/studio/comments",
    Icon: VideoIcon,
  },
];

export default function StudioSideBar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2 px-2">
      {items.map((item) => {
        const active =
          (pathname.startsWith(item.link) && item.link !== "/") ||
          item.link === pathname;

        return (
          <Link
            key={item.label}
            href={item.link}
            className={`flex items-center gap-4 p-2 rounded-full hover:bg-gray-200 hover:text-black ${
              active ? "bg-gray-200 text-black" : ""
            }`}
          >
            <item.Icon />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
