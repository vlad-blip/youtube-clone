interface IShortsPage {
  params: Promise<{
    shortsId: string;
  }>;
}
export default async function ShortsPage({ params }: IShortsPage) {
  const { shortsId } = await params;

  return (
    <div>
      <h1>Shorts page</h1>
      <h2>Shorts id: {shortsId}</h2>
    </div>
  );
}
