"use client";

import { Search as LucideSearch } from "lucide-react";
import { FormEvent } from "react";

interface ISearchProps {
  className?: string;
}

export default function Search({ className }: ISearchProps) {
  function submitHandler(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <form className={`${className}`} onSubmit={submitHandler}>
      <div className="flex items-center h-10 w-full">
        <input
          className="border-neutral-700 border-2 rounded-l-full w-full px-4 py-2 h-full"
          type="text"
          placeholder="Search"
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
