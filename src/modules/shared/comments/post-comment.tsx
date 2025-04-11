"use client";

import { User } from "lucide-react";
import { FormEvent, useState } from "react";

export default function PostComment() {
  const [active, setActive] = useState(false);
  const [comment, setComment] = useState("");
  const commentValid = comment.length > 0;

  function submitHandler(e: FormEvent) {
    e.preventDefault();
  }

  function cancelHandler() {
    setActive(false);
    setComment("");
  }

  return (
    <form className="py-4" onSubmit={submitHandler}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <User />
          <input
            className="border-b-1 border-b-neutral-500 w-full py-2"
            placeholder="Add a comment"
            value={comment}
            onFocus={() => setActive(true)}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        {active && (
          <div className="flex gap-2 self-end">
            <button
              onClick={cancelHandler}
              className="px-4 py-2 rounded-full hover:bg-neutral-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              disabled={!commentValid}
              className="bg-blue-500 text-black px-4 py-2 rounded-full hover:bg-blue-300 cursor-pointer disabled:bg-neutral-600 disabled:cursor-default"
            >
              Comment
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
