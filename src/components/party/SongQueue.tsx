
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Avatar from "./Avatar";

interface QueuedSong {
  id: string;
  title: string;
  artist: string;
  albumCover?: string;
  singer: {
    id: string;
    name: string;
    image?: string;
  };
}

interface SongQueueProps {
  songs: QueuedSong[];
  currentSongId?: string;
}

const SongQueue: React.FC<SongQueueProps> = ({ songs, currentSongId }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Party Queue</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {songs.length === 0 ? (
          <div className="py-6 text-center text-muted-foreground">
            <p>No songs in the queue yet!</p>
            <p className="text-sm mt-1">Add songs to get the party started</p>
          </div>
        ) : (
          songs.map((song) => (
            <div
              key={song.id}
              className={`flex items-center gap-3 p-2 rounded-md ${
                song.id === currentSongId
                  ? "bg-muted"
                  : "hover:bg-muted/50"
              }`}
            >
              <div className="relative flex-shrink-0 w-10 h-10">
                {song.albumCover ? (
                  <img
                    src={song.albumCover}
                    alt={song.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-muted-foreground">
                      <path
                        fill="currentColor"
                        d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                      />
                    </svg>
                  </div>
                )}
                
                {song.id === currentSongId && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                    <div className="flex items-end justify-center h-5 gap-[2px]">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="equalizer-bar w-[2px] bg-white rounded-t-sm"
                          style={{
                            animationDelay: `${i * 0.1}s`,
                            height: "20%"
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{song.title}</h4>
                <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
              </div>
              
              <Avatar name={song.singer.name} image={song.singer.image} size="sm" />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default SongQueue;
