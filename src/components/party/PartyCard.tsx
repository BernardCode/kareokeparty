
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Avatar from "./Avatar";
import { cn } from "@/lib/utils";

interface PartyCardProps {
  id: string;
  title: string;
  host: {
    name: string;
    image?: string;
  };
  participants: number;
  isLive: boolean;
  cover?: string;
  onClick?: () => void;
}

const PartyCard: React.FC<PartyCardProps> = ({
  title,
  host,
  participants,
  isLive,
  cover,
  onClick,
}) => {
  return (
    <Card 
      className={cn(
        "party-card overflow-hidden cursor-pointer",
        "transition-all duration-300 hover:shadow-lg"
      )}
      onClick={onClick}
    >
      <div className="aspect-video relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
        {cover ? (
          <img
            src={cover}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-karaoke-primary to-karaoke-secondary" />
        )}
        
        {isLive && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-20 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse"></span>
            LIVE
          </div>
        )}
      </div>
      
      <CardContent className="pt-4">
        <h3 className="font-bold truncate">{title}</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <Avatar name={host.name} image={host.image} size="sm" />
            <span className="text-sm text-muted-foreground">{host.name}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {participants} {participants === 1 ? "singer" : "singers"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartyCard;
