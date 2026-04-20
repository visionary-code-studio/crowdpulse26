
"use client";

import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui/core";
import { INITIAL_ZONES, INITIAL_POIS, INITIAL_ALERTS } from "@/lib/mock-data";
import { getCongestionColor, calculatePressure, getRecommendedRoute } from "@/lib/crowd-engine";
import { Users, Clock, MapPin, Zap, ArrowRight, BellRing } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AttendeeDashboard() {
  const bestFood = getRecommendedRoute(INITIAL_POIS, 'food');
  const bestRestroom = getRecommendedRoute(INITIAL_POIS, 'restroom');

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Apex Stadium</h2>
          <p className="text-white/60 mt-2">Live event: <span className="text-primary font-medium">World Series Finals</span></p>
        </div>
        <Badge variant="success" className="px-4 py-2 text-sm">
          <Zap className="w-4 h-4 mr-2 fill-current" />
          Live Pulse Active
        </Badge>
      </header>

      {/* Emergency / Critical Alerts */}
      {INITIAL_ALERTS.filter(a => a.severity === 'high').map(alert => (
        <Card key={alert.id} className="border-danger/50 bg-danger/10">
          <CardContent className="p-4 flex items-center gap-4">
            <BellRing className="text-danger w-6 h-6 animate-bounce" />
            <div className="flex-1">
              <h4 className="font-bold text-danger">{alert.title}</h4>
              <p className="text-sm text-danger/80">{alert.message}</p>
            </div>
            <Button variant="danger" className="text-xs">View Map</Button>
          </CardContent>
        </Card>
      ))}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass shadow-blue-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/60">Crowd Level</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78% Full</div>
            <p className="text-xs text-white/40 mt-1">High movement in Zone C</p>
            <div className="mt-4 w-full bg-white/5 rounded-full h-2 overflow-hidden">
              <div className="bg-primary h-full transition-all duration-1000" style={{ width: '78%' }} />
            </div>
          </CardContent>
        </Card>

        <Card className="glass shadow-green-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/60">Avg. Queue Time</CardTitle>
            <Clock className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 mins</div>
            <p className="text-xs text-white/40 mt-1">-4 mins since last update</p>
            <div className="mt-4 flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={cn("h-1 flex-1 rounded-full", i <= 3 ? "bg-secondary" : "bg-white/5")} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass shadow-purple-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/60">Nearest Exit</CardTitle>
            <MapPin className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Gate 4</div>
            <p className="text-xs text-white/40 mt-1">Clear path recommended</p>
            <Button variant="outline" className="w-full mt-4 h-8 text-xs group">
              Start Navigation <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="text-warning fill-current" /> Smart Suggestions
          </h3>
          <div className="space-y-4">
            {bestFood && (
              <Card className="glass hover:border-primary/50 transition-colors">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    🍔
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white/40">Hungry? Shortest line at</p>
                    <h4 className="font-bold">{bestFood.name}</h4>
                  </div>
                  <div className="text-right">
                    <Badge variant="success" className="mb-1">{bestFood.waitTime} min wait</Badge>
                    <p className="text-[10px] text-white/40">{bestFood.zoneId}</p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {bestRestroom && (
              <Card className="glass hover:border-primary/50 transition-colors">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                    🚽
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white/40">Avoid the crowd at</p>
                    <h4 className="font-bold">{bestRestroom.name}</h4>
                  </div>
                  <div className="text-right">
                    <Badge variant="success" className="mb-1">{bestRestroom.waitTime} min wait</Badge>
                    <p className="text-[10px] text-white/40">{bestRestroom.zoneId}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-4">Your Seat Pulse</h3>
          <Card className="glass h-[200px] flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 group-hover:opacity-100 opacity-50 transition-opacity" />
            <div className="z-10 text-center">
              <p className="text-sm text-white/60 mb-1">Section 104, Row G</p>
              <h4 className="text-5xl font-extrabold tracking-tighter">Seat 12</h4>
              <Link href="/map">
                <Button className="mt-4 rounded-full px-6">View My Zone Map</Button>
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

