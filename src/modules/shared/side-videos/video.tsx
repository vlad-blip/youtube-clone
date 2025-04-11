import Image from "next/image";
import { MoreVertical } from "lucide-react";
import { type IVideo } from "../types";
import Link from "next/link";

export default function SideVideo(props: IVideo & { className?: string }) {
  return (
    <Link href={`/watch/${props.id}`}>
      <div className="grid grid-cols-[.6fr_1fr] gap-2">
        <div className="relative">
          <Image
            className="h-25 object-cover rounded-xl w-full"
            src={props.thumbnail}
            alt={`${props.title} thumbnail`}
            width={200}
            height={100}
          />
          <div className="absolute right-1 bottom-1 bg-neutral-800 p-1 text-[10px] rounded-sm">
            10:12
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <h3 className="font-bold text-wrap">
              {props.title.length > 20
                ? `${props.title.substring(0, 20)}...`
                : props.title}
            </h3>
            <div className="mt-1">
              <h4 className="text-neutral-300">{props.channel.title}</h4>
              <span className="text-neutral-300">{`${props.views} views • ${props.date}`}</span>
            </div>
          </div>
          <MoreVertical />
        </div>
      </div>
    </Link>
  );
}
