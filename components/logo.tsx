import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center space-x-4">
      <Image src="/public/logo.png" alt="MoodTunes" width={60} height={60} />
      <div>
        <h1 className="text-pink-500 text-3xl font-bold">MoodTunes</h1>
        <p className="text-purple-300 text-sm">Let Your Emotions Pick the Song</p>
      </div>
    </div>
  );
}
