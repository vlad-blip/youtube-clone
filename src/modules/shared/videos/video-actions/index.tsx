"use client";

import Image from "next/image";
import { type Video } from "@/utils/typeorm/entity/video.entity";
import Link from "next/link";
import { Download, ThumbsDown, ThumbsUp } from "lucide-react";
import {
  videoReaction,
  subscribeToChannel,
  unsubscribeFromChannel,
} from "../actions";
import { useReducer, useState, use } from "react";
import { ReactionType } from "@/utils/typeorm/entity/reaction.entity";

interface IState {
  likes: number;
  dislikes: number;
  prevAction: ReactionType | null;
}

interface IAction {
  type: ReactionType;
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
          prevAction: ReactionType.LIKE,
          dislikes: state.dislikes - 1,
          likes: state.likes + 1,
        };

      return {
        ...state,
        prevAction: ReactionType.LIKE,
        likes: state.likes + 1,
      };
    case "dislike":
      if (state.prevAction === "dislike")
        return {
          ...state,
          prevAction: null,
          dislikes: state.dislikes - 1,
        };
      if (state.prevAction === "like")
        return {
          prevAction: ReactionType.DISLIKE,
          dislikes: state.dislikes + 1,
          likes: state.likes - 1,
        };

      return {
        ...state,
        prevAction: ReactionType.DISLIKE,
        dislikes: state.dislikes + 1,
      };
    default:
      return state;
  }
}

interface IVideoActions {
  video: Video;
  videoUrl: string;
  reactionPromise: Promise<ReactionType | null>;
  subscriptionPromise: Promise<number | null>;
}

export default function VideoActions({
  video,
  videoUrl,
  reactionPromise,
  subscriptionPromise,
}: IVideoActions) {
  const reaction = use(reactionPromise ?? Promise.resolve(null));
  const subscription = use(subscriptionPromise ?? Promise.resolve(null));

  const [impression, setImpression] = useReducer(impressionReducer, {
    likes: Number(video.like_count),
    dislikes: Number(video.dislike_count),
    prevAction: reaction ?? null,
  });

  const [subscriptionStatus, setSubscribtionStatus] = useState(subscription);

  async function likeHandler() {
    setImpression({ type: ReactionType.LIKE });

    await videoReaction({
      videoId: video.id,
      reactionType: ReactionType.LIKE,
    });
  }

  async function dislikeHandler() {
    setImpression({ type: ReactionType.DISLIKE });

    await videoReaction({
      videoId: video.id,
      reactionType: ReactionType.DISLIKE,
    });
  }

  async function subscriptionHandler() {
    if (subscriptionStatus) {
      await unsubscribeFromChannel({
        subscriptionId: subscriptionStatus,
      });

      return setSubscribtionStatus(null);
    }

    const response = await subscribeToChannel({ channelId: video.channel.id });

    setSubscribtionStatus(response);
  }

  return (
    <div className="flex gap-4 justify-between items-center">
      <div className="flex gap-4 items-center">
        <Link href={`/channel/${video.channel.id}`}>
          <Image
            src={"/globe.svg"}
            alt={`${video.channel.title} avatar`}
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
        <div>
          <Link href={`/channel/${video.channel.id}`}>
            <h3 className="font-bold">{video.channel.title}</h3>
          </Link>
          <p>{video.channel.subscriber_count} subscribers</p>
        </div>
        <button
          onClick={subscriptionHandler}
          className={`cursor-pointer text-[16px] px-4 py-2 rounded-full border-1 border-white ${
            subscriptionStatus
              ? "bg-black text-white hover:bg-neutral-700"
              : "bg-white  text-black hover:bg-neutral-300 "
          }`}
        >
          {subscriptionStatus ? "Unsubscribe" : "Subscribe"}
        </button>
      </div>
      <div className="flex gap-2">
        <div className="flex">
          <button
            onClick={likeHandler}
            className={`${
              impression.prevAction === "like"
                ? "bg-white text-neutral-800"
                : ""
            } font-bold flex gap-2 items-center bg-neutral-800 pl-4 pr-2 py-2 rounded-l-full cursor-pointer hover:bg-neutral-600`}
          >
            <ThumbsUp /> {impression.likes}
          </button>
          <button
            onClick={dislikeHandler}
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
