
import React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps {
  name: string;
  image?: string;
  isSinging?: boolean;
  size?: "sm" | "md" | "lg";
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const getRandomColor = (name: string) => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];
  
  const hashCode = name.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  return colors[Math.abs(hashCode) % colors.length];
};

const Avatar: React.FC<AvatarProps> = ({ 
  name, 
  image, 
  isSinging = false,
  size = "md" 
}) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base"
  };
  
  return (
    <div className={cn(
      "relative flex-shrink-0",
      isSinging && "singing-avatar"
    )}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center text-white font-bold",
          sizeClasses[size],
          getRandomColor(name)
        )}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          getInitials(name)
        )}
      </div>
      
      {isSinging && (
        <div className="absolute -bottom-1 -right-1 bg-accent rounded-full p-1">
          <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-white">
            <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2"/>
            <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      )}
    </div>
  );
};

export default Avatar;
