import Player from "next-video/player";

export default function Page({
  videoUrl,
  className,
}: {
  videoUrl: string;
  className?: string;
}) {
  return <Player className={className} src={videoUrl} />;
}
