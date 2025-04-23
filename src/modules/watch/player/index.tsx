import Player from "next-video/player";
import { CSSProperties } from "react";

export default function Page({
  videoUrl,
  className,
  style,
}: {
  videoUrl: string;
  className?: string;
  style?: CSSProperties;
}) {
  return <Player className={className} src={videoUrl} style={style} />;
}
