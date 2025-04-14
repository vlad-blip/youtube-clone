"use server";

import { notFound, redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getDataSource } from "@/utils/typeorm/client";
import { Channel } from "@/utils/typeorm/entity/channel.entity";

export async function getUserChannel() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (!data.user || error) {
      return redirect("/login");
    }

    const dataSource = await getDataSource();
    const channelsRepository = await dataSource.getRepository(Channel);

    const existingChannel = await channelsRepository.findOne({
      where: {
        user: data.user.id,
      },
    });

    if (!existingChannel) {
      notFound();
    }

    return existingChannel;
  } catch (error) {
    if (error instanceof Error && error?.message === "NEXT_REDIRECT") {
      throw error;
    }

    console.error("[server getUserChannel]", error);

    return null;
  }
}
