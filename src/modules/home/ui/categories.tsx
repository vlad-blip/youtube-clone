"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

const items = [
  "All",
  "Music",
  "Gaming",
  "News",
  "Sports",
  "Live",
  "Fashion",
  "Learning",
  "Movies",
  "Shows",
  "Entertainment",
  "Science & Technology",
  "Autos & Vehicles",
];

export default function Categories() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const activeCategory = category || "All";

  const params = new URLSearchParams(searchParams.toString());

  function categorieClickHanndler(category: string) {
    const previousCategory = params.get("category");

    if (previousCategory === category) {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <ul className="flex gap-2 overflow-x-auto">
      {items.map((item) => {
        const active = item === activeCategory;
        return (
          <li key={item} className="flex items-center gap-2">
            <button
              className={`cursor-pointer bg-neutral-800 py-1 px-3 rounded-md text-nowrap hover:text-white ${
                active ? "text-white" : "text-neutral-400"
              }`}
              onClick={() => categorieClickHanndler(item)}
            >
              {item}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
