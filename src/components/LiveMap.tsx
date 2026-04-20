
"use client";

import { useState } from "react";
import { INITIAL_ZONES } from "@/lib/mock-data";
import { getCongestionColor } from "@/lib/crowd-engine";
import { cn } from "@/lib/utils";
import { Badge, Card } from "./ui/core";
import { Users, Info } from "lucide-react";

export function LiveMap() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const activeZoneData = INITIAL_ZONES.find(z => z.id === selectedZone);

  return (
    <div className="relative w-full aspect-[4/3] bg-surface/30 rounded-3xl border border-white/5 overflow-hidden">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full p-8"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stadium Background */}
        <ellipse cx="400" cy="300" rx="350" ry="250" fill="none" stroke="white" strokeWidth="1" strokeDasharray="10 5" opacity="0.2" />
        <ellipse cx="400" cy="300" rx="200" ry="120" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="2" opacity="0.4" />
        
        {/* Pitch / Center */}
        <rect x="300" y="240" width="200" height="120" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
        
        {/* Zones */}
        {/* Zone A - West */}
        <path
          d="M150,150 Q100,300 150,450 L250,400 Q220,300 250,200 Z"
          fill={getCongestionColor(INITIAL_ZONES.find(z => z.id === 'zone-a')?.congestion || 'low')}
          fillOpacity={selectedZone === 'zone-a' ? "0.8" : "0.4"}
          className="cursor-pointer transition-all hover:fill-opacity-70"
          onClick={() => setSelectedZone('zone-a')}
        />
        
        {/* Zone B - East */}
        <path
          d="M650,150 Q700,300 650,450 L550,400 Q580,300 550,200 Z"
          fill={getCongestionColor(INITIAL_ZONES.find(z => z.id === 'zone-b')?.congestion || 'low')}
          fillOpacity={selectedZone === 'zone-b' ? "0.8" : "0.4"}
          className="cursor-pointer transition-all hover:fill-opacity-70"
          onClick={() => setSelectedZone('zone-b')}
        />

        {/* Zone C - North */}
        <path
          d="M200,100 Q400,50 600,100 L550,200 Q400,170 250,200 Z"
          fill={getCongestionColor(INITIAL_ZONES.find(z => z.id === 'zone-c')?.congestion || 'low')}
          fillOpacity={selectedZone === 'zone-c' ? "0.8" : "0.4"}
          className="cursor-pointer transition-all hover:fill-opacity-70"
          onClick={() => setSelectedZone('zone-c')}
        />

        {/* Zone D - South */}
        <path
          d="M200,500 Q400,550 600,500 L550,400 Q400,430 250,400 Z"
          fill={getCongestionColor(INITIAL_ZONES.find(z => z.id === 'zone-d')?.congestion || 'low')}
          fillOpacity={selectedZone === 'zone-d' ? "0.8" : "0.4"}
          className="cursor-pointer transition-all hover:fill-opacity-70"
          onClick={() => setSelectedZone('zone-d')}
        />

        {/* Labels */}
        <text x="170" y="300" fill="white" fontSize="12" fontWeight="bold" className="pointer-events-none">ZONE A</text>
        <text x="590" y="300" fill="white" fontSize="12" fontWeight="bold" className="pointer-events-none">ZONE B</text>
        <text x="380" y="130" fill="white" fontSize="12" fontWeight="bold" className="pointer-events-none">ZONE C</text>
        <text x="380" y="480" fill="white" fontSize="12" fontWeight="bold" className="pointer-events-none">ZONE D</text>
      </svg>

      {/* Info Overlay */}
      {activeZoneData && (
        <Card className="absolute bottom-6 left-6 right-6 lg:left-auto lg:w-80 glass p-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-bold text-lg">{activeZoneData.name}</h4>
              <p className="text-xs text-white/60">Currently {activeZoneData.congestion} pressure</p>
            </div>
            <Badge variant={activeZoneData.congestion === 'low' ? 'success' : activeZoneData.congestion === 'medium' ? 'warning' : 'danger'}>
              {activeZoneData.congestion.toUpperCase()}
            </Badge>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-white/60"><Users className="w-4 h-4" /> Active Fans</span>
              <span className="font-mono">{activeZoneData.activeUsers} / {activeZoneData.capacity}</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  activeZoneData.congestion === 'low' ? 'bg-secondary' : activeZoneData.congestion === 'medium' ? 'bg-warning' : 'bg-danger'
                )} 
                style={{ width: `${(activeZoneData.activeUsers / activeZoneData.capacity) * 100}%` }} 
              />
            </div>
            <div className="flex gap-2">
              <button className="flex-1 text-[10px] py-1 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors">
                FIND RESTROOM
              </button>
              <button className="flex-1 text-[10px] py-1 bg-primary/20 text-primary rounded border border-primary/20 hover:bg-primary/30 transition-colors">
                EXIT ROUTE
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Legend */}
      <div className="absolute top-6 right-6 glass p-3 flex flex-col gap-2 text-[10px]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-secondary" /> <span>Low Congestion</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning" /> <span>Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-danger" /> <span>High / Critical</span>
        </div>
      </div>
    </div>
  );
}
