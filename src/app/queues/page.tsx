
"use client";

import { INITIAL_POIS } from "@/lib/mock-data";
import { Badge, Card, CardContent } from "@/components/ui/core";
import { Clock, Coffee, Pizza, Utensils, Zap, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function QueuesPage() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Live Queue Times</h2>
          <p className="text-white/40">Updated every 30 seconds from venue sensors</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-primary/20 text-primary border-primary/20 cursor-pointer">ALL</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-white/5">FOOD</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-white/5">GATES</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-white/5">RESTROOMS</Badge>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {INITIAL_POIS.map((poi) => (
          <Card key={poi.id} className="glass group overflow-hidden relative">
            {/* Visual Indicator Background */}
            <div 
              className={cn(
                "absolute bottom-0 left-0 h-1 transition-all duration-1000",
                poi.waitTime < 10 ? "bg-secondary w-full" : poi.waitTime < 20 ? "bg-warning w-3/4" : "bg-danger w-1/2"
              )} 
            />
            
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  {poi.type === 'food' ? <Utensils className="text-white/60 group-hover:text-primary" /> : 
                   poi.type === 'restroom' ? <span className="text-xl">🚻</span> : <Zap className="text-white/60" />}
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-2xl font-black">
                    {poi.waitTime} <span className="text-xs font-normal text-white/40">mins</span>
                  </div>
                  <p className="text-[10px] text-white/40 uppercase tracking-tighter">Est. Wait Time</p>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{poi.name}</h4>
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <Clock className="w-3 h-3" />
                  <span>Located in {poi.zoneId.replace('-', ' ').toUpperCase()}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                <Badge variant={poi.waitTime < 10 ? 'success' : poi.waitTime < 20 ? 'warning' : 'danger'}>
                  {poi.waitTime < 10 ? 'MOVING FAST' : poi.waitTime < 20 ? 'STEADY' : 'HEAVY FLOW'}
                </Badge>
                <button className="text-xs font-bold text-primary hover:underline">Get Directions →</button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pro Tip */}
      <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30">
        <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-3xl">💡</div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold">Hackathon Tip: Pre-order via App</h3>
            <p className="text-white/60 max-w-lg">Skip the line entirely! Orders from <strong>Apex Burgers</strong> can now be pre-ordered and picked up at the Express Lane in Zone B.</p>
          </div>
          <button className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all">Order Now</button>
        </CardContent>
      </Card>
    </div>
  );
}
