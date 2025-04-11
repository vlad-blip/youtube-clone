"use client";

import Image from "next/image";
import { Video } from "@/utils/typeorm/entity/video.entity";
import Link from "next/link";
import { Download, ThumbsDown, ThumbsUp } from "lucide-react";
import { useReducer } from "react";

interface IState {
  likes: number;
  dislikes: number;
  prevAction: "like" | "dislike" | null;
}

interface IAction {
  type: "like" | "dislike";
}

function impressionReducer(state: IState, { type }: IAction): IState {
  switch (type) {
    case "like":
      if (state.prevAction === "like")
        return {
          ...state,
          prevAction: null,
          likes: state.likes - 1,
        };
      if (state.prevAction === "dislike")
        return {
          prevAction: "like",
          dislikes: state.dislikes - 1,
          likes: state.likes + 1,
        };

      return { ...state, prevAction: "like", likes: state.likes + 1 };
    case "dislike":
      if (state.prevAction === "dislike")
        return {
          ...state,
          prevAction: null,
          dislikes: state.dislikes - 1,
        };
      if (state.prevAction === "like")
        return {
          prevAction: "dislike",
          dislikes: state.dislikes + 1,
          likes: state.likes - 1,
        };

      return { ...state, prevAction: "dislike", dislikes: state.dislikes + 1 };
    default:
      return state;
  }
}

export default function VideoActions({
  video,
  videoUrl,
}: {
  video: Video;
  videoUrl: string;
}) {
  const [impression, setImpression] = useReducer(impressionReducer, {
    likes: video.like_count,
    dislikes: video.dislike_count,
    prevAction: null,
  });

  return (
    <div className="flex gap-4 justify-between items-center">
      <div>
        <div className="flex gap-4">
          <Link href={`/channel/${video.channel.id}`}>
            {" "}
            <Image
              src={"/globe.svg"}
              alt={`${video.channel.title} avatar`}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h3 className="font-bold">{video.channel.title}</h3>
              <p>{video.channel.subscriber_count} subscribers</p>
            </div>
          </Link>
          <button className="cursor-pointer text-[16px] bg-white px-4 py-0.5 text-black rounded-full hover:bg-gray-200">
            Subscribe
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex">
          <button
            onClick={() => setImpression({ type: "like" })}
            className={`${
              impression.prevAction === "like"
                ? "bg-white text-neutral-800"
                : ""
            } font-bold flex gap-2 items-center bg-neutral-800 pl-4 pr-2 py-2 rounded-l-full cursor-pointer hover:bg-neutral-600`}
          >
            <ThumbsUp /> {impression.likes}
          </button>
          <button
            onClick={() => setImpression({ type: "dislike" })}
            className={`${
              impression.prevAction === "dislike"
                ? "bg-white text-neutral-800"
                : ""
            } font-bold flex gap-2 items-center bg-neutral-800 pr-4 pl-2 py-2 rounded-r-full cursor-pointer hover:bg-neutral-600`}
          >
            <ThumbsDown /> {impression.dislikes}
          </button>
        </div>
        <Link
          href={videoUrl}
          className="flex gap-2 items-center py-2 px-4 bg-neutral-800 cursor-pointer rounded-full hover:bg-neutral-600"
        >
          <Download /> Download
        </Link>
      </div>
    </div>
  );
}
