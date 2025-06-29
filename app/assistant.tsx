"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";

export function Assistant() {
  const [songUrl, setSongUrl] = useState<string | null>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    async onFinish(message) {
      const moodText = message.content;

      // Gemini AI se mood analyze
      const res = await fetch("/api/chat/music", {
        method: "POST",
        body: JSON.stringify({ mood: moodText }),
      });
      const geminiData = await res.json();

      // YouTube API se song
      const ytRes = await fetch("/api/youtube", {
        method: "POST",
        body: JSON.stringify({ query: geminiData?.mood || moodText }),
      });
      const ytData = await ytRes.json();
      setSongUrl(ytData?.url || null);
    },
  });

  const handleMoodSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages([]);
    setSongUrl(null);
    handleSubmit(e);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 space-y-4">
      <form onSubmit={handleMoodSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Tell me your mood or situation..."
          className="flex-1 p-3 rounded-md border bg-background border-border"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Thinking..." : "Find Song"}
        </Button>
      </form>

      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <strong>{m.role === "user" ? "You" : "AI"}:</strong> {m.content}
          </div>
        ))}

        {songUrl && (
          <div className="mt-4">
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${songUrl}`}
              title="YouTube Song"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-xl shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
