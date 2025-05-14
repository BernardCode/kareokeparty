
import React from "react";
import { cn } from "@/lib/utils";

interface SongItemProps {
  id: string;
  title: string;
  artist: string;
  album?: string;
  albumCover?: string;
  duration?: number;
  isPlaying?: boolean;
  isQueued?: boolean;
  onPlay?: () => void;
  onQueue?: () => void;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const SongItem: React.FC<SongItemProps> = ({
  title,
  artist,
  album,
  albumCover,
  duration,
  isPlaying = false,
  isQueued = false,
  onPlay,
  onQueue,
}) => {
  return (
    <div 
      className={cn(
        "flex items-center gap-3 p-2 rounded-md",
        isPlaying ? "bg-muted" : "hover:bg-muted/50",
        "transition-colors duration-200"
      )}
    >
      <div className="relative flex-shrink-0 w-12 h-12">
        {albumCover ? (
          <img
            src={albumCover}
            alt={album || title}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-muted-foreground">
              <path
                fill="currentColor"
                d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
              />
            </svg>
          </div>
        )}
        
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
            <div className="flex items-end justify-center h-6 gap-[2px]">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="equalizer-bar w-1 bg-white rounded-t-sm"
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
        <h4 className="font-medium truncate">{title}</h4>
        <p className="text-sm text-muted-foreground truncate">{artist}</p>
      </div>
      
      <div className="flex items-center gap-2">
        {duration && (
          <span className="text-xs text-muted-foreground">
            {formatTime(duration)}
          </span>
        )}
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQueue?.();
          }}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            isQueued ? "text-accent" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {isQueued ? (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          )}
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlay?.();
          }}
          className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SongItem;
