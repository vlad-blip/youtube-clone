import Image from "next/image";
import { MoreVertical } from "lucide-react";
import { type IVideo } from "./types";
import Link from "next/link";

export default function Video(props: IVideo) {
  return (
    <Link href={`/watch/${props.id}`}>
      <div>
        <Image
          src={"/logo.svg"}
          alt={`${props.title} thumbnail`}
          width={450}
          height={250}
        />
        <div className="flex gap-4 items-start pt-2 w-full">
          <Image
            src={"/globe.svg"}
            alt={`${props.channel.name} avatar`}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="w-full">
            <h3 className="font-bold">{props.title}</h3>
            <div className="mt-1">
              <h4 className="text-neutral-300">{props.channel.name}</h4>
              <span className="text-neutral-300">{`${props.views} • ${props.date}`}</span>
            </div>
          </div>
          <MoreVertical />
        </div>
      </div>
    </Link>
  );
}
