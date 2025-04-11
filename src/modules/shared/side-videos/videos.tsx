import SideVideo from "./video";

import type { IVideo } from "../types";

interface VideosProps {
  items: IVideo[];
}

export default function SideVideos({ items }: VideosProps) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item: IVideo) => (
        <li key={item.id}>
          <SideVideo {...item} className="flex" />
        </li>
      ))}
    </ul>
  );
}
