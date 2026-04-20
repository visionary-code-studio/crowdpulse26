
"use client";

import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@/components/ui/core";
import { INITIAL_ZONES } from "@/lib/mock-data";
import { Send, AlertTriangle, Info, Bell, Users, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AdminAlertsPage() {
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('low');

  const toggleZone = (id: string) => {
    setSelectedZones(prev => 
      prev.includes(id) ? prev.filter(z => z !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <header>
        <h2 className="text-3xl font-black">Broadcast Center</h2>
        <p className="text-white/40">Push real-time notifications to selected stadium zones</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg">Compose Announcement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Title</label>
                <input 
                  type="text" 
                  placeholder="e.g., Gate 4 Congestion" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="Tell fans what to do..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Severity Level</label>
                <div className="flex gap-4">
                  {[
                    { id: 'low', label: 'Info', icon: Info, color: 'text-primary', bg: 'bg-primary/10' },
                    { id: 'medium', label: 'Warning', icon: Bell, color: 'text-warning', bg: 'bg-warning/10' },
                    { id: 'high', label: 'Emergency', icon: AlertTriangle, color: 'text-danger', bg: 'bg-danger/10' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSeverity(s.id as any)}
                      className={cn(
                        "flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all",
                        severity === s.id 
                          ? `border-${s.id === 'low' ? 'primary' : s.id === 'medium' ? 'warning' : 'danger'} ${s.bg}` 
                          : "border-white/5 bg-white/5 grayscale hover:grayscale-0"
                      )}
                    >
                      <s.icon className={cn("w-6 h-6", s.color)} />
                      <span className="text-[10px] font-bold uppercase">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button variant="outline"><Trash2 className="w-4 h-4 mr-2" /> DISCARD</Button>
                <Button className="bg-primary px-8">
                  <Send className="w-4 h-4 mr-2" /> SEND TO {selectedZones.length || 'ALL'} ZONES
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Target Zones</CardTitle>
                <Button variant="ghost" className="text-[10px] h-6 px-2" onClick={() => setSelectedZones(INITIAL_ZONES.map(z => z.id))}>Select All</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {INITIAL_ZONES.map((zone) => (
                <div 
                  key={zone.id}
                  onClick={() => toggleZone(zone.id)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all",
                    selectedZones.includes(zone.id) 
                      ? "bg-primary/20 border-primary/40" 
                      : "bg-white/5 border-transparent hover:bg-white/10"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-2 h-2 rounded-full", selectedZones.includes(zone.id) ? "bg-primary" : "bg-white/20")} />
                    <span className="text-sm font-medium">{zone.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-white/40">
                    <Users className="w-3 h-3" /> {zone.activeUsers}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-4 flex gap-3">
              <Eye className="text-primary w-5 h-5 shrink-0" />
              <p className="text-[10px] text-white/60">
                Fans in selected zones will receive a high-priority push notification and a live pulse card on their dashboard.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
