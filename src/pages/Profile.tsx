
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock user data
const user = {
  name: "Alex Johnson",
  username: "alexj",
  image: "https://i.pravatar.cc/150?img=3",
  bio: "Karaoke enthusiast and weekend rock star. 🎤",
  followers: 134,
  following: 87,
  badges: [
    { id: "b1", name: "Party Host", description: "Hosted 10+ parties" },
    { id: "b2", name: "Rock Legend", description: "Rocked 50+ rock songs" },
    { id: "b3", name: "Duet Master", description: "Completed 25+ duets" },
  ],
  stats: {
    partiesHosted: 12,
    partiesJoined: 47,
    songsPerformed: 68,
    topGenre: "Rock",
  },
  recentSongs: [
    { 
      id: "rs1", 
      title: "Bohemian Rhapsody", 
      artist: "Queen", 
      performedAt: "Friday Night Karaoke Jam",
      date: "2 days ago",
      likes: 24
    },
    { 
      id: "rs2", 
      title: "Sweet Child O' Mine", 
      artist: "Guns N' Roses", 
      performedAt: "Rock Legends Tribute",
      date: "1 week ago",
      likes: 18
    },
    { 
      id: "rs3", 
      title: "Don't Stop Believin'", 
      artist: "Journey", 
      performedAt: "80s Night Party",
      date: "2 weeks ago",
      likes: 31
    },
  ],
};

const Profile = () => {
  return (
    <MainLayout>
      <div className="container py-6 space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-card">
              <img
                src={user.image}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Crown for premium users */}
            <div className="absolute -top-2 -right-2 bg-karaoke-accent rounded-full p-1">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white">
                <path fill="currentColor" d="M12 6l3 4.5L12 15l-3-4.5L12 6zm0-2L7 9l2 3L6 15l3 4h6l3-4-3-3 2-3-5-5z" />
              </svg>
            </div>
          </div>
          
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            <p className="mt-2 text-sm">{user.bio}</p>
            
            <div className="flex justify-center sm:justify-start gap-6 mt-3">
              <div className="text-center">
                <p className="font-bold">{user.followers}</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold">{user.following}</p>
                <p className="text-xs text-muted-foreground">Following</p>
              </div>
              <div className="text-center">
                <p className="font-bold">{user.stats.songsPerformed}</p>
                <p className="text-xs text-muted-foreground">Songs</p>
              </div>
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={() => toast.info("Edit profile coming soon!")}>
            Edit Profile
          </Button>
        </div>
        
        {/* Profile Content */}
        <Tabs defaultValue="activity">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="space-y-4 mt-4">
            <h2 className="text-lg font-semibold">Recent Performances</h2>
            
            {user.recentSongs.map((song) => (
              <Card key={song.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{song.title}</h3>
                        <p className="text-sm text-muted-foreground">{song.artist}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <svg viewBox="0 0 24 24" className="w-4 h-4">
                          <path
                            fill="currentColor"
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          />
                        </svg>
                        {song.likes}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div className="text-xs text-muted-foreground">
                        Performed at <span className="font-medium">{song.performedAt}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{song.date}</div>
                    </div>
                  </div>
                  
                  <div className="border-t border-border p-2 flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-8"
                      onClick={() => toast.info("Play recording feature coming soon!")}
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 mr-1">
                        <path fill="currentColor" d="M8 5v14l11-7z" />
                      </svg>
                      Play Recording
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-8"
                      onClick={() => toast.info("Share feature coming soon!")}
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 mr-1">
                        <path
                          fill="currentColor"
                          d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
                        />
                      </svg>
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="text-center">
              <Button variant="outline" onClick={() => toast.info("View more recordings coming soon!")}>
                View More
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="badges" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.badges.map((badge) => (
                <Card key={badge.id} className="overflow-hidden">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-karaoke-primary to-karaoke-accent flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                        <path
                          fill="currentColor"
                          d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm3.5 12.09l-1.41 1.41L12 13.42 9.91 15.5 8.5 14.09 10.59 12 8.5 9.91 9.91 8.5 12 10.59l2.09-2.09 1.41 1.41L13.42 12l2.08 2.09z"
                        />
                      </svg>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="overflow-hidden border-dashed">
                <CardContent className="p-4 flex items-center justify-center h-full min-h-[76px]">
                  <Button variant="ghost" onClick={() => toast.info("Unlock more badges by singing more songs!")}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                      <path
                        fill="currentColor"
                        d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                      />
                    </svg>
                    Unlock More Badges
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="stats" className="mt-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-3xl font-bold">{user.stats.partiesHosted}</p>
                    <p className="text-sm text-muted-foreground">Parties Hosted</p>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-3xl font-bold">{user.stats.partiesJoined}</p>
                    <p className="text-sm text-muted-foreground">Parties Joined</p>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-3xl font-bold">{user.stats.songsPerformed}</p>
                    <p className="text-sm text-muted-foreground">Songs Performed</p>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-3xl font-bold">{user.stats.topGenre}</p>
                    <p className="text-sm text-muted-foreground">Top Genre</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Top Skills</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Pitch Accuracy</span>
                        <span>78%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-karaoke-primary rounded-full" style={{ width: "78%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tempo Control</span>
                        <span>92%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-karaoke-primary rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Vocal Range</span>
                        <span>65%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-karaoke-primary rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Top Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-karaoke-primary hover:bg-karaoke-secondary">Rock (24)</Badge>
                    <Badge className="bg-karaoke-primary hover:bg-karaoke-secondary">Pop (19)</Badge>
                    <Badge className="bg-karaoke-primary hover:bg-karaoke-secondary">R&B (12)</Badge>
                    <Badge className="bg-karaoke-primary hover:bg-karaoke-secondary">Country (8)</Badge>
                    <Badge className="bg-karaoke-primary hover:bg-karaoke-secondary">Alternative (5)</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Profile;
