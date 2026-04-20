
"use client";

import { Card, CardContent, Badge, Button } from "@/components/ui/core";
import { INITIAL_ALERTS } from "@/lib/mock-data";
import { Bell, Info, ShieldAlert, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AlertsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-top-4 duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black">Pulse Alerts</h2>
          <p className="text-white/40">Official updates from venue operations</p>
        </div>
        <button className="text-xs font-bold text-white/40 hover:text-white transition-colors">Mark all as read</button>
      </header>

      <div className="space-y-4">
        {INITIAL_ALERTS.map((alert) => (
          <Card key={alert.id} className={cn(
            "glass overflow-hidden border-l-4",
            alert.severity === 'high' ? "border-l-danger" : 
            alert.severity === 'medium' ? "border-l-warning" : "border-l-primary"
          )}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                  alert.severity === 'high' ? "bg-danger/20 text-danger" : 
                  alert.severity === 'medium' ? "bg-warning/20 text-warning" : "bg-primary/20 text-primary"
                )}>
                  {alert.severity === 'high' ? <ShieldAlert /> : 
                   alert.severity === 'medium' ? <Bell /> : <Info />}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{alert.title}</h3>
                    <span className="text-[10px] text-white/40 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Just now
                    </span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {alert.message}
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    {alert.zones.map(z => (
                      <Badge key={z} variant="outline" className="text-[10px] uppercase">{z.replace('-', ' ')}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Older Notifications */}
        <div className="relative pt-12 pb-8">
          <div className="absolute top-0 left-0 right-0 flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 whitespace-nowrap">Earlier Today</span>
            <div className="h-px bg-white/10 w-full" />
          </div>
          
          <div className="space-y-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
            <Card className="glass">
              <CardContent className="p-6 flex items-center gap-4">
                <CheckCircle2 className="text-secondary w-8 h-8" />
                <div className="flex-1">
                  <h4 className="font-bold">Welcome to Apex Stadium</h4>
                  <p className="text-sm">Enjoy the game! Connect to Stadium Wi-Fi for better real-time updates.</p>
                </div>
                <span className="text-[10px] font-mono">17:45</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
