"use server";

import { type ReactionType } from "@/utils/typeorm/entity/reaction.entity";
import { Reaction } from "@/utils/typeorm/entity/reaction.entity";
import { Video } from "@/utils/typeorm/entity/video.entity";
import { getDataSource } from "@/utils/typeorm/client";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { View } from "@/utils/typeorm/entity/view.entity";
import { Channel } from "@/utils/typeorm/entity/channel.entity";
import { Subscription } from "@/utils/typeorm/entity/subscription.entity";

interface IVideoReaction {
  videoId: number;
  reactionType: ReactionType;
}

export async function videoReaction({ videoId, reactionType }: IVideoReaction) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (!data.user || error) {
    return redirect("/login");
  }

  const dataSource = await getDataSource();

  const [reactionsRepository, videosRepository] = await Promise.all([
    dataSource.getRepository(Reaction),
    dataSource.getRepository(Video),
  ]);

  const video = await videosRepository.findOne({
    where: {
      id: videoId,
    },
  });

  if (!video) {
    throw new Error(`Video with id ${videoId} Not found`);
  }

  const existingReaction = await reactionsRepository.findOne({
    where: {
      video: {
        id: video.id,
      },
      user_id: data.user.id,
    },
    relations: {
      video: true,
    },
  });

  const reaction = new Reaction();

  reaction.video = video;
  reaction.type = reactionType;
  reaction.user_id = data.user.id;

  if (!existingReaction) {
    const savedReaction = await reactionsRepository.insert(reaction);

    return structuredClone(savedReaction);
  } else if (existingReaction.type === reactionType) {
    const removedReaction = await reactionsRepository.remove(existingReaction);

    return structuredClone(removedReaction);
  }

  await reactionsRepository.remove(existingReaction);
  const insertedReaction = await reactionsRepository.insert(reaction);

  return structuredClone(insertedReaction);
}

interface IVideoView {
  videoId: number;
}

export async function videoView({ videoId }: IVideoView) {
  try {
    const supabase = await createClient();

    const { data } = await supabase.auth.getUser();

    const dataSource = await getDataSource();

    const [viewsRepository, videosRepository] = await Promise.all([
      dataSource.getRepository(View),
      dataSource.getRepository(Video),
    ]);

    const existingVideo = await videosRepository.findOne({
      where: {
        id: videoId,
      },
    });

    if (!existingVideo) throw new Error(`Video with id ${videoId} not found`);

    const view = new View();

    view.user_id = data.user?.id;
    view.video = existingVideo;

    await viewsRepository.insert(view);
  } catch (error) {
    console.error(error);
  }
}

export async function subscribeToChannel({ channelId }: { channelId: number }) {
  try {
    const supabase = await createClient();

    const { data } = await supabase.auth.getUser();

    if (!data.user) throw new Error("Unauthorized");

    const dataSource = await getDataSource();

    const [channelRepository, subscriptionRepository] = await Promise.all([
      dataSource.getRepository(Channel),
      dataSource.getRepository(Subscription),
    ]);

    const channel = await channelRepository.findOne({
      where: {
        id: channelId,
      },
    });

    if (!channel) throw new Error(`Channel with id ${channelId} not found`);

    const subscription = new Subscription();

    subscription.channel = channel;
    subscription.user_id = data.user.id;

    const savedSubscription = await subscriptionRepository.save(subscription);

    return savedSubscription.id;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function unsubscribeFromChannel({
  subscriptionId,
}: {
  subscriptionId: number;
}) {
  try {
    const supabase = await createClient();

    const { data } = await supabase.auth.getUser();

    if (!data.user) throw new Error("Unauthorized");

    const dataSource = await getDataSource();

    const subscriptionRepository = await dataSource.getRepository(Subscription);

    const subscription = await subscriptionRepository.findOne({
      where: {
        id: subscriptionId,
      },
      relations: {
        channel: true,
      },
    });

    if (!subscription)
      throw new Error(`Subscription with id ${subscriptionId} not found`);

    const removedSubscription = await subscriptionRepository.remove(
      subscription
    );

    return removedSubscription.id;
  } catch (error) {
    console.error(error);
  }
}
