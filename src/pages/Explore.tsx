
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import PartyCard from "@/components/party/PartyCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Mock data
const trendingParties = [
  {
    id: "7",
    title: "Weekend Vocal Showdown",
    host: { name: "John Legend" },
    participants: 54,
    isLive: true,
    cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvbmNlcnR8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "8",
    title: "Rock Legends Tribute",
    host: { name: "Axl Rose" },
    participants: 37,
    isLive: true,
    cover: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cm9jayUyMGNvbmNlcnR8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "9",
    title: "Pop Stars Night",
    host: { name: "Ariana Grande" },
    participants: 42,
    isLive: true,
    cover: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9wJTIwY29uY2VydHxlbnwwfHwwfHx8MA%3D%3D"
  },
];

const genreParties = {
  pop: [
    {
      id: "10",
      title: "Top 40 Hits Karaoke",
      host: { name: "Charlie Puth" },
      participants: 28,
      isLive: true,
      cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9wJTIwbXVzaWN8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: "11",
      title: "2010s Pop Favorites",
      host: { name: "Katy Perry" },
      participants: 19,
      isLive: false,
      cover: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D"
    },
  ],
  rock: [
    {
      id: "12",
      title: "Classic Rock Anthems",
      host: { name: "Steven Tyler" },
      participants: 24,
      isLive: true,
      cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9jayUyMG11c2ljfGVufDB8fDB8fHww"
    },
    {
      id: "13",
      title: "Alternative Rock Night",
      host: { name: "Dave Grohl" },
      participants: 16,
      isLive: false,
      cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9jayUyMGJhbmR8ZW58MHx8MHx8fDA%3D"
    },
  ],
  rnb: [
    {
      id: "14",
      title: "R&B Smooth Sessions",
      host: { name: "Usher" },
      participants: 22,
      isLive: true,
      cover: "https://images.unsplash.com/photo-1604576264937-52d940a28cb5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm5ifGVufDB8fDB8fHww"
    },
    {
      id: "15",
      title: "Soul & R&B Classics",
      host: { name: "Alicia Keys" },
      participants: 17,
      isLive: false,
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWNvdXN0aWMlMjBndWl0YXJ8ZW58MHx8MHx8fDA%3D"
    },
  ],
};

const Explore = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeGenre, setActiveGenre] = useState("pop");

  const handlePartyClick = (id: string) => {
    navigate(`/party/${id}`);
  };

  // Filter trending parties based on search term
  const filteredTrendingParties = trendingParties.filter(
    (party) =>
      party.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      party.host.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter genre parties based on search term
  const filteredGenreParties = genreParties[activeGenre as keyof typeof genreParties].filter(
    (party) =>
      party.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      party.host.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="container py-6 space-y-6">
        <h1 className="text-2xl font-bold">Explore Parties</h1>

        <div className="relative">
          <Input
            placeholder="Search parties, hosts, genres..."
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

        <div>
          <h2 className="text-xl font-semibold mb-4">Trending Now</h2>
          
          {filteredTrendingParties.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No trending parties found matching "{searchTerm}"
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredTrendingParties.map((party) => (
                <PartyCard
                  key={party.id}
                  {...party}
                  onClick={() => handlePartyClick(party.id)}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">By Genre</h2>
          
          <Tabs defaultValue="pop" onValueChange={setActiveGenre}>
            <TabsList className="mb-4">
              <TabsTrigger value="pop">Pop</TabsTrigger>
              <TabsTrigger value="rock">Rock</TabsTrigger>
              <TabsTrigger value="rnb">R&B</TabsTrigger>
            </TabsList>
            
            {["pop", "rock", "rnb"].map((genre) => (
              <TabsContent key={genre} value={genre}>
                {filteredGenreParties.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No {genre} parties found matching "{searchTerm}"
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredGenreParties.map((party) => (
                      <PartyCard
                        key={party.id}
                        {...party}
                        onClick={() => handlePartyClick(party.id)}
                      />
                    ))}
                  </div>
                )}
                
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" size="sm">
                    View All {genre.toUpperCase()} Parties
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Explore;
