import Image from "next/image";
import { MoreVertical } from "lucide-react";
import { type IVideo } from "../types";
import Link from "next/link";

export default function Video(props: IVideo & { className?: string }) {
  return (
    <Link href={`/watch/${props.id}`} prefetch={true}>
      <div
        className={`${props.className} hover:bg-neutral-800 group p-2 transition-all duration-700`}
      >
        <div className="relative h-full rounded-xl overflow-hidden group-hover:rounded-none aspect-video">
          <Image
            className="w-full object-cover"
            src={props.thumbnail}
            alt={`${props.title} thumbnail`}
            fill
          />
        </div>
        <div className="flex gap-4 items-start p-4 w-full h-full">
          <Image
            src={"/globe.svg"}
            alt={`${props.channel?.title} avatar`}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="w-full">
            <h3 className="font-bold">{props.title}</h3>
            <div className="mt-1">
              <h4 className="text-neutral-300">{props.channel?.title}</h4>
              <span className="text-neutral-300">{`${props.views} • ${props.date}`}</span>
            </div>
          </div>
          <MoreVertical />
        </div>
      </div>
    </Link>
  );
}
