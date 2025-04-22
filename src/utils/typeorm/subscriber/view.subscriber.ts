import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
} from "typeorm";

import { Video } from "../entity/video.entity";
import { View } from "../entity/view.entity";

@EventSubscriber()
export class ViewSubscriber implements EntitySubscriberInterface<View> {
  async afterInsert(event: InsertEvent<View>): Promise<void> {
    if (!event.entity.video) return;

    await event.manager.increment(
      Video,
      { id: event.entity.video.id },
      "view_count",
      1
    );
  }

  async afterRemove(event: RemoveEvent<View>): Promise<void> {
    if (!event.entity?.video) return;

    await event.manager.decrement(
      Video,
      { id: event.entity.video.id },
      "view_count",
      1
    );
  }
}
