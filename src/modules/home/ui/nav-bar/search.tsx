"use client";

import { Search as LucideSearch } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { FormEvent, KeyboardEvent, useState } from "react";

interface ISearchProps {
  className?: string;
}

export default function Search({ className }: ISearchProps) {
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  const [search, setSearch] = useState(params.get("search") ?? "");
  const router = useRouter();
  const pathname = usePathname();

  function searchHandler() {
    if (!search) {
      params.delete("search");
    } else {
      params.set("search", search);
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  function submitHandler(e: FormEvent) {
    e.preventDefault();

    searchHandler();
  }

  function keydownHandler(e: KeyboardEvent) {
    console.log("key", e.key);

    if (e.key === "Enter") {
      searchHandler();
    }
  }

  return (
    <form className={`${className}`} onSubmit={submitHandler}>
      <div className="flex items-center h-10 w-full">
        <input
          value={search}
          className="border-neutral-700 border-2 rounded-l-full w-full px-4 py-2 h-full"
          type="text"
          placeholder="Search"
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={keydownHandler}
        />
        <button
          className="bg-neutral-700 h-full w-12 flex justify-center items-center rounded-r-full"
          type="submit"
        >
          <LucideSearch className="cursor-pointer" />
        </button>
      </div>
    </form>
  );
}
