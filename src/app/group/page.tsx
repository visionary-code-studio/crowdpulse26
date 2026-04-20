
"use client";

import { Badge, Card, CardContent, Button } from "@/components/ui/core";
import { Users, Share2, Plus, MapPin, MessageSquare, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GroupPage() {
  const members = [
    { name: "You", location: "Zone A, Row 12", status: "Here", color: "bg-primary" },
    { name: "Sarah", location: "Apex Burgers", status: "In Queue", color: "bg-warning" },
    { name: "Mike", location: "Gate 1", status: "Walking", color: "bg-accent" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
      <header className="text-center space-y-2">
        <div className="w-20 h-20 rounded-3xl bg-accent/20 flex items-center justify-center mx-auto mb-4 border border-accent/30 shadow-lg shadow-accent/10">
          <Users className="text-accent w-10 h-10" />
        </div>
        <h2 className="text-4xl font-black">Meet My Group</h2>
        <p className="text-white/40">Real-time coordinates with your squad</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xl">Active Group (3)</h3>
            <button className="flex items-center gap-2 text-xs font-bold text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors">
              <Plus className="w-4 h-4" /> INVITE FANS
            </button>
          </div>

          <div className="space-y-3">
            {members.map((member, i) => (
              <Card key={i} className="glass group hover:border-white/20 transition-all cursor-pointer">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm", member.color)}>
                    {member.name[0]}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{member.name}</h4>
                    <p className="text-xs text-white/40 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {member.location}
                    </p>
                  </div>
                  <Badge variant={member.status === "Here" ? "success" : member.status === "In Queue" ? "warning" : "default"}>
                    {member.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button variant="outline" className="w-full py-6 rounded-2xl border-dashed border-white/20 hover:border-primary/50 group">
            <Share2 className="w-5 h-5 mr-2 text-white/40 group-hover:text-primary transition-colors" />
            Share Permanent Group Link
          </Button>
        </div>

        <div className="space-y-6">
          <h3 className="font-bold text-xl">Group Features</h3>
          <div className="grid grid-cols-1 gap-4">
            <Card className="glass p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                  <MapPin className="text-accent" />
                </div>
                <div>
                  <h4 className="font-bold">Set Meeting Point</h4>
                  <p className="text-xs text-white/40">Drop a pin for everyone</p>
                </div>
              </div>
              <Button className="w-full bg-accent hover:bg-accent/90">Drop Meet Pin</Button>
            </Card>

            <Card className="glass p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                  <MessageSquare className="text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Group Quick Chat</h4>
                  <p className="text-xs text-white/40">Pre-set messages for fast comms</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {["I'm at the seat", "Getting food", "In restroom line", "Where are you?"].map(msg => (
                  <button key={msg} className="text-[10px] px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-white/10">
                    {msg}
                  </button>
                ))}
              </div>
            </Card>

            <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 flex items-start gap-3">
              <ShieldCheck className="text-secondary w-5 h-5 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-secondary uppercase tracking-widest">Privacy Active</p>
                <p className="text-[10px] text-white/60">Location is only shared with this specific group and expires after the event ends.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
