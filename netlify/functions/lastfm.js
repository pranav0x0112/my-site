export async function handler() {
  const API_KEY = process.env.LASTFM_API_KEY;
  const USERNAME = "prawns_baka";

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing LASTFM_API_KEY" })
    };
  }

  const url =
    `https://ws.audioscrobbler.com/2.0/?` +
    `method=user.getrecenttracks` +
    `&user=${USERNAME}` +
    `&api_key=${API_KEY}` +
    `&format=json` +
    `&limit=5`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log("FULL LASTFM RESPONSE:", JSON.stringify(data, null, 2));


    let rawTracks = data.recenttracks?.track || [];
    if (!Array.isArray(rawTracks)) {
      rawTracks = [rawTracks];
    }

    const tracks = rawTracks.map(track => ({
      name: track.name,
      artist: track.artist?.["#text"] ?? "",
      album: track.album?.["#text"] ?? "",
      image: track.image?.slice(-1)[0]?.["#text"] || null,
      nowPlaying: track["@attr"]?.nowplaying === "true",
      url: track.url
    }));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify({ tracks })
    };
  } catch (err) {
    console.error("Last.fm function error:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
