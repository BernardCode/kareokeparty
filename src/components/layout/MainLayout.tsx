
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>
      
      <footer className="sticky bottom-0 w-full bg-card py-2 border-t border-border">
        <Tabs defaultValue={currentPath} className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="/" asChild>
              <Link to="/" className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <span className="text-xs">Home</span>
              </Link>
            </TabsTrigger>
            
            <TabsTrigger value="/explore" asChild>
              <Link to="/explore" className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <span className="text-xs">Explore</span>
              </Link>
            </TabsTrigger>
            
            <TabsTrigger value="/create" asChild>
              <Link to="/create" className="flex flex-col items-center gap-1">
                <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center -mt-3">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-white">
                    <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span className="text-xs">Create</span>
              </Link>
            </TabsTrigger>
            
            <TabsTrigger value="/profile" asChild>
              <Link to="/profile" className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-xs">Profile</span>
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </footer>
    </div>
  );
};

export default MainLayout;
