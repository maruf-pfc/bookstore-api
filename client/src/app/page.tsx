async function getPing() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/ping`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const ping = await getPing();

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Bookstore — Frontend</h1>
      {!ping?.ok ? (
        <div className="text-red-600">
          Ping failed: {ping?.error ?? "unknown error"}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-sm">Backend status: {ping.upstreamStatus}</div>
          <pre className="text-xs p-3 rounded-lg border overflow-auto">
            {JSON.stringify(ping.sample, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}
