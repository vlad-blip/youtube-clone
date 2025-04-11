interface IChannel {
  params: Promise<{ channelId: string }>;
}

export default async function Channel({ params }: IChannel) {
  const { channelId } = await params;

  return <div></div>;
}
