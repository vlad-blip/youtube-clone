import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
} from "typeorm";

import { Reaction, ReactionType } from "../entity/reaction.entity";
import { Video } from "../entity/video.entity";

const ReactionColumn: Record<ReactionType, string> = {
  [ReactionType.DISLIKE]: "dislike_count",
  [ReactionType.LIKE]: "like_count",
};

@EventSubscriber()
export class ReactionSubscriber implements EntitySubscriberInterface<Reaction> {
  async afterInsert(event: InsertEvent<Reaction>): Promise<void> {
    if (!event?.entity?.type) return;

    await event.manager.increment(
      Video,
      { id: event.entity.video.id },
      ReactionColumn[event.entity.type],
      1
    );
  }

  async afterRemove(event: RemoveEvent<Reaction>): Promise<void> {
    if (!event.entity?.video) return;

    await event.manager.decrement(
      Video,
      { id: event.entity.video.id },
      ReactionColumn[event.entity.type],
      1
    );
  }
}
