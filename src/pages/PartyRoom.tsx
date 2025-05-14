
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SongItem from "@/components/party/SongItem";
import SongQueue from "@/components/party/SongQueue";
import Avatar from "@/components/party/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock data
const mockSongs = [
  {
    id: "s1",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    albumCover: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cXVlZW4lMjBiYW5kfGVufDB8fDB8fHww",
    duration: 354,
  },
  {
    id: "s2",
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    albumCover: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3VucyUyMG4lMjByb3Nlc3xlbnwwfHwwfHx8MA%3D%3D",
    duration: 356,
  },
  {
    id: "s3",
    title: "Billie Jean",
    artist: "Michael Jackson",
    albumCover: "https://images.unsplash.com/photo-1583795484071-3c453e3a7c71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWljaGFlbCUyMGphY2tzb258ZW58MHx8MHx8fDA%3D",
    duration: 294,
  },
  {
    id: "s4",
    title: "I Will Always Love You",
    artist: "Whitney Houston",
    duration: 273,
  },
  {
    id: "s5",
    title: "Shallow",
    artist: "Lady Gaga & Bradley Cooper",
    duration: 216,
  },
];

const mockParticipants = [
  { id: "u1", name: "Mike Johnson", image: "https://i.pravatar.cc/150?img=1" },
  { id: "u2", name: "Sarah Davis", image: "https://i.pravatar.cc/150?img=5" },
  { id: "u3", name: "Alex Wong" },
  { id: "u4", name: "Jessica Kim", image: "https://i.pravatar.cc/150?img=9" },
  { id: "u5", name: "David Brown" },
];

// Mock queue
const initialQueue = [
  {
    id: "q1",
    title: "Don't Stop Believin'",
    artist: "Journey",
    albumCover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8am91cm5leXxlbnwwfHwwfHx8MA%3D%3D",
    singer: mockParticipants[1],
  },
  {
    id: "q2",
    title: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    singer: mockParticipants[2],
  },
];

const emojis = ["👏", "🎵", "🔥", "💃", "🕺", "❤️", "🙌", "😍"];

const PartyRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [queue, setQueue] = useState(initialQueue);
  const [queuedSongs, setQueuedSongs] = useState<string[]>([]);
  const [currentSong, setCurrentSong] = useState<string | null>("q1");
  const [searchTerm, setSearchTerm] = useState("");
  const [showEmojis, setShowEmojis] = useState<{emoji: string, id: number, x: number, y: number}[]>([]);
  
  // Filter songs based on search term
  const filteredSongs = mockSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQueueSong = (songId: string) => {
    if (queuedSongs.includes(songId)) {
      toast.error("This song is already in your queue");
      return;
    }
    
    const songToQueue = mockSongs.find((s) => s.id === songId);
    if (songToQueue) {
      const newQueueItem = {
        id: `q${Date.now()}`,
        title: songToQueue.title,
        artist: songToQueue.artist,
        albumCover: songToQueue.albumCover,
        singer: mockParticipants[0], // Current user
      };
      
      setQueue([...queue, newQueueItem]);
      setQueuedSongs([...queuedSongs, songId]);
      toast.success("Song added to queue!");
    }
  };

  const handleSendEmoji = (emoji: string) => {
    const id = Date.now();
    const x = 40 + Math.random() * 60; // Random horizontal position (40-100%)
    const y = 70 + Math.random() * 20; // Random vertical start position (70-90%)
    
    setShowEmojis([...showEmojis, { emoji, id, x, y }]);
    
    // Remove emoji after animation
    setTimeout(() => {
      setShowEmojis((current) => current.filter((e) => e.id !== id));
    }, 3000);
  };

  useEffect(() => {
    // Simulate a song change every 15 seconds
    const interval = setInterval(() => {
      if (queue.length > 1) {
        setCurrentSong(queue[1].id);
        setQueue((prev) => {
          const newQueue = [...prev];
          newQueue.shift();
          return newQueue;
        });
      }
    }, 15000);
    
    return () => clearInterval(interval);
  }, [queue]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border p-4 flex items-center justify-between">
        <button 
          onClick={() => navigate("/")}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <h1 className="font-bold text-lg">
          {id === "new-party" ? "My Karaoke Party" : "Friday Night Karaoke Jam"}
        </h1>
        
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-red-500 text-white flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse"></span>
            LIVE
          </span>
          <span className="text-xs bg-muted px-2 py-1 rounded-full">{mockParticipants.length} singers</span>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Current song area */}
        <div className="relative h-1/3 min-h-[200px] overflow-hidden bg-muted">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
          
          {currentSong && (
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8am91cm5leXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Cover art"
                className="w-full h-full object-cover opacity-50"
              />
            </div>
          )}
          
          {/* Song information */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-4 text-center">
            {currentSong ? (
              <>
                <h3 className="font-bold text-xl">Don't Stop Believin'</h3>
                <p className="text-muted-foreground">Journey</p>
                
                <div className="flex items-center justify-center mt-2">
                  <Avatar 
                    name="Sarah Davis" 
                    image="https://i.pravatar.cc/150?img=5"
                    isSinging
                    size="md"
                  />
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <h3 className="font-bold text-xl">Waiting for first singer...</h3>
                <p className="text-muted-foreground">Add songs to the queue to get started</p>
              </div>
            )}
          </div>
          
          {/* Floating emojis */}
          {showEmojis.map(({ emoji, id, x, y }) => (
            <div
              key={id}
              className="absolute emoji-reaction text-2xl"
              style={{
                left: `${x}%`,
                bottom: `${y}%`,
                transform: "translateX(-50%)",
                animation: "float 3s ease-in-out forwards",
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
        
        {/* Tabs area */}
        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="songs" className="p-4">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="songs">Songs</TabsTrigger>
              <TabsTrigger value="queue">Queue</TabsTrigger>
              <TabsTrigger value="singers">Singers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="songs" className="space-y-4">
              <div className="relative">
                <Input
                  placeholder="Search songs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-muted-foreground">
                    <path
                      fill="currentColor"
                      d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                    />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-2">
                {filteredSongs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No songs found matching "{searchTerm}"
                  </div>
                ) : (
                  filteredSongs.map((song) => (
                    <SongItem
                      key={song.id}
                      {...song}
                      isQueued={queuedSongs.includes(song.id)}
                      onQueue={() => handleQueueSong(song.id)}
                    />
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="queue">
              <SongQueue 
                songs={queue} 
                currentSongId={currentSong} 
              />
            </TabsContent>
            
            <TabsContent value="singers">
              <div className="grid grid-cols-3 gap-4">
                {mockParticipants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex flex-col items-center gap-2 p-2"
                  >
                    <Avatar
                      name={participant.name}
                      image={participant.image}
                      isSinging={currentSong === "q1" && participant.id === "u2"}
                      size="lg"
                    />
                    <span className="text-sm text-center font-medium truncate w-full">
                      {participant.name}
                    </span>
                    {participant.id === "u1" && (
                      <span className="text-xs bg-primary/25 text-primary-foreground px-2 py-0.5 rounded-full">
                        Host
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Control bar */}
      <div className="sticky bottom-0 z-10 bg-card border-t border-border p-3">
        <div className="flex justify-center mb-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleSendEmoji(emoji)}
                className="text-2xl p-1 hover:scale-110 transition"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            className="w-32"
            onClick={() => toast.info("Coming soon: Quick chat feature!")}
          >
            Quick Chat
          </Button>
          
          <Button
            variant="default"
            size="sm"
            className="w-32 bg-karaoke-primary hover:bg-karaoke-secondary"
            onClick={() => toast.info("Coming soon: Record your voice!")}
          >
            Sing Now!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PartyRoom;
