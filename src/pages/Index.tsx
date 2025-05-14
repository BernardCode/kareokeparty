
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import PartyCard from "@/components/party/PartyCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const featuredParties = [
  {
    id: "1",
    title: "Friday Night Karaoke Jam",
    host: { name: "Mike Johnson" },
    participants: 14,
    isLive: true,
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlnaHRjbHVifGVufDB8fDB8fHww"
  },
  {
    id: "2",
    title: "90s Throwback Session",
    host: { name: "Alicia Keys" },
    participants: 8,
    isLive: true,
    cover: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8OTBzfGVufDB8fDB8fHww"
  },
  {
    id: "3",
    title: "K-Pop Stars Night",
    host: { name: "Jenny Kim" },
    participants: 22,
    isLive: false,
    cover: "https://images.unsplash.com/photo-1611602132589-44e8293bf3c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3BvcHxlbnwwfHwwfHx8MA%3D%3D"
  }
];

const friendsParties = [
  {
    id: "4",
    title: "Rock Classics with Friends",
    host: { name: "Taylor Swift" },
    participants: 5,
    isLive: true,
    cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9jayUyMG11c2ljfGVufDB8fDB8fHww"
  },
  {
    id: "5",
    title: "Acoustic Session",
    host: { name: "Ed Sheeran" },
    participants: 3,
    isLive: false,
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWNvdXN0aWMlMjBndWl0YXJ8ZW58MHx8MHx8fDA%3D"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("featured");

  const handlePartyClick = (id: string) => {
    navigate(`/party/${id}`);
  };

  return (
    <MainLayout>
      <div className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Karaoke Party</h1>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/create")}
          >
            Host a Party
          </Button>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-karaoke-primary via-karaoke-accent to-karaoke-secondary blur-sm opacity-50"></div>
          <div className="relative bg-card p-4 rounded-lg border shadow-md">
            <h2 className="text-lg font-semibold mb-2">🎤 Welcome to Karaoke Party!</h2>
            <p className="text-muted-foreground text-sm">
              Join live parties, sing your heart out, and connect with friends through music. 
              Create your own party or join one of the popular rooms below!
            </p>
          </div>
        </div>

        <Tabs defaultValue="featured" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="featured">Featured Parties</TabsTrigger>
            <TabsTrigger value="friends">Friends' Parties</TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {featuredParties.map((party) => (
                <PartyCard
                  key={party.id}
                  {...party}
                  onClick={() => handlePartyClick(party.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="friends" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {friendsParties.map((party) => (
                <PartyCard
                  key={party.id}
                  {...party}
                  onClick={() => handlePartyClick(party.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Index;
