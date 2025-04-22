import SideVideo from "./video";

import type { IVideo } from "../types";

interface VideosProps {
  itemsPromise: Promise<IVideo[]>;
}

export default async function SideVideos({ itemsPromise }: VideosProps) {
  const items = await itemsPromise;
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
