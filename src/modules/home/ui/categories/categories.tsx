"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { getCategories } from "./actions";
import { useEffect, useState } from "react";

const baseOptions = [{ label: "All", value: "_ALL" }];

export default function Categories() {
  const [categories, setCategories] = useState<
    { label: string; value: string }[] | undefined
  >(baseOptions);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const activeCategory = category || "_ALL";

  const params = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    getCategories()
      .then((categoriesResponse) => {
        if (categoriesResponse) {
          return setCategories([...baseOptions, ...categoriesResponse]);
        }

        setCategories(categoriesResponse);
      })
      .catch(console.error);
  }, []);

  function categorieClickHanndler(category: string) {
    const previousCategory = params.get("category");

    if (previousCategory === category || category === "_ALL") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    router.replace(`${pathname}?${params.toString()}`);
  }
  if (!categories) return <div>Loading...</div>;

  return (
    <ul className="flex gap-2 overflow-x-auto">
      {categories.map((item) => {
        const active = item.value === activeCategory;
        return (
          <li key={item.value} className="flex items-center gap-2">
            <button
              className={`cursor-pointer bg-neutral-800 py-1 px-3 rounded-md text-nowrap hover:text-white ${
                active ? "text-white" : "text-neutral-400"
              }`}
              onClick={() => categorieClickHanndler(item.value)}
            >
              {item.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
