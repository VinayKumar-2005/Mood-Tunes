import { NextResponse } from "next/server";

interface YouTubeSearchResponse {
  items: {
    id: {
      videoId: string;
    };
  }[];
}

export async function POST(req: Request) {
  const { query } = await req.json();
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    query
  )}&key=${YOUTUBE_API_KEY}&type=video&maxResults=5`;

  const res = await fetch(url);
  const data: YouTubeSearchResponse = await res.json();

  if (!data.items || data.items.length === 0) {
    return NextResponse.json({ error: "No video found" }, { status: 404 });
  }

  const videoUrls = data.items.map(
    (item) => `https://www.youtube.com/watch?v=${item.id.videoId}`
  );

  return NextResponse.json({ videoUrls });
}
