import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
} from "typeorm";

import { Channel } from "../entity/channel.entity";
import { Subscription } from "../entity/subscription.entity";

@EventSubscriber()
export class SubscriptionSubscriber
  implements EntitySubscriberInterface<Subscription>
{
  async afterInsert(event: InsertEvent<Subscription>): Promise<void> {
    if (!event.entity.channel) return;

    await event.manager.increment(
      Channel,
      { id: event.entity.channel.id },
      "subscriber_count",
      1
    );
  }

  async afterRemove(event: RemoveEvent<Subscription>): Promise<void> {
    if (!event.entity) return;

    await event.manager.decrement(
      Channel,
      { id: event.entity.channel.id },
      "subscriber_count",
      1
    );
  }
}
