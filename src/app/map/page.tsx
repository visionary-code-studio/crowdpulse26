
"use client";

import { LiveMap } from "@/components/LiveMap";
import { Badge, Card, CardContent } from "@/components/ui/core";
import { Search, Filter, Compass, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VenueMapPage() {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Interactive Map</h2>
          <p className="text-white/40">Tap a zone to see real-time details</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text" 
              placeholder="Search Gate..." 
              className="bg-surface/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 w-full md:w-64"
            />
          </div>
          <button className="p-2 bg-surface/50 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
            <Filter className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <LiveMap />
        </div>
        
        <div className="space-y-6">
          <Card className="glass border-primary/20">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Compass className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Fastest Path</h4>
                  <p className="text-xs text-white/40">From your location</p>
                </div>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                We recommend taking the <span className="text-primary font-bold">West Concourse</span> route. Zone C is currently congested.
              </p>
              <button className="w-full mt-4 py-2 bg-primary text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                <Navigation className="w-4 h-4" /> START GUIDANCE
              </button>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-widest text-white/40">Points of Interest</h5>
            {[
              { name: "Fan Zone Store", status: "Moderate", icon: "🛍️" },
              { name: "North Refreshments", status: "Busy", icon: "🌭" },
              { name: "South Restrooms", status: "Clear", icon: "🚻" },
            ].map((poi, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                <span className="text-xl">{poi.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">{poi.name}</p>
                  <p className="text-[10px] text-white/40">{poi.status} wait time</p>
                </div>
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  poi.status === "Clear" ? "bg-secondary" : poi.status === "Moderate" ? "bg-warning" : "bg-danger"
                )} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

