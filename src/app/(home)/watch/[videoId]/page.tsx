interface WatchPageProps {
  params: Promise<{
    videoId: string;
  }>;
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { videoId } = await params;

  return (
    <div>
      <h1>Watch page</h1>
      <h2>Video ID: {videoId}</h2>
    </div>
  );
}
