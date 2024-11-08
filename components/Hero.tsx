"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";

export interface Playlist {
  name: string;
  artist: string;
  album?: string;
  year?: number;
  genres?: string[];
  explanation?: string;
}

const Hero = () => {
  const [inputSong, setInputSong] = useState("");
  const [playlist, setPlaylist] = useState<[Playlist]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Playlist[]>([]);
  const [noInputSong, setNoInputSong] = useState<string | null>(null);

  const suggestionSongs = [
    { name: "Blinding Lights", artist: "The Weeknd" },
    { name: "Levitating", artist: "Dua Lipa" },
    { name: "Night Changes", artist: "One Direction" },
    { name: "Baby", artist: "Justin Bieber" },
    { name: "As It Was", artist: "Harry Styles" },
    { name: "Stitches", artist: "Shawn Mendes" },
    { name: "Attention", artist: "Charlie Puth" },
    { name: "Shape of You", artist: "Ed Sheeran" },
  ];

  const generatePlaylist = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputSong === "") {
      setNoInputSong("Please enter a song name");
      return;
    }
    setNoInputSong(null);

    try {
      setLoading(true);
      const response = await fetch("/api/generate-playlist", {
        method: "POST",
        body: JSON.stringify({ song: inputSong }),
      });

      if (!response.ok) {
        setError("Something went wrong");
        return;
      }
      const data = await response.json();
      setPlaylist(data.playlist);
      setLoading(false);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-10 w-full h-full flex flex-col justify-center items-center">
      <div className="flex flex-col gap-6 justify-center items-center">
        <section className="text-center space-y-4">
          <h1 className="hero-text text-6xl font-bold max-md:text-4xl">
            Generate AI Playlist <br /> in seconds
          </h1>
          <p className="text-gray-400">
            Create personalized playlists based on your
            <br className="hidden max-md:block" /> favourite artists
            <br className="max-md:hidden" />
            and songs using AI.
          </p>
        </section>
        <section className="w-full">
          <form className="form" onSubmit={generatePlaylist}>
            <input
              type="text"
              placeholder="Enter a song name"
              value={inputSong}
              onChange={(e) => setInputSong(e.target.value)}
              className="input"
            />
            <button type="submit" disabled={loading} className="generate-btn">
              {loading ? (
                <Loader2 className="animate-spin size-5" />
              ) : (
                "Generate"
              )}
            </button>
          </form>
          {noInputSong && (
            <p className="text-red-500 px-4 py-2">{noInputSong}</p>
          )}
        </section>
        <section>
          {playlist.length > 0 ? null : (
            <div className="flex flex-col items-center gap-4">
              <h3 className="font-semibold text-gray-300">
                Try these suggestions
              </h3>
              <div className="flex flex-wrap justify-center w-[700px] max-lg:w-[500px] max-md:w-[400px] max-sm:w-[320px] gap-2">
                {suggestionSongs.map((suggestion, index) => (
                  <div key={index}>
                    <button
                      onClick={() =>
                        setInputSong(
                          `${suggestion.name} by ${suggestion.artist}`
                        )
                      }
                      key={index}
                      className="suggestion-btn max-sm:hidden"
                    >
                      {suggestion.name} by {suggestion.artist}
                    </button>
                    <button
                      onClick={() => setInputSong(suggestion.name)}
                      className="suggestion-btn hidden max-sm:block"
                    >
                      {suggestion.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Hero;
