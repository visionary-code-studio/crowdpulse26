
"use client";

import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@/components/ui/core";
import { User, Bell, Shield, Smartphone, Globe, Moon, Accessibility, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [accessibility, setAccessibility] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-black">Account & Settings</h2>
        <p className="text-white/40">Personalize your CrowdPulse experience</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <nav className="space-y-1">
            {[
              { label: "Profile", icon: User, active: true },
              { label: "Notifications", icon: Bell },
              { label: "Privacy & Data", icon: Shield },
              { label: "Devices", icon: Smartphone },
            ].map((item) => (
              <button
                key={item.label}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  item.active ? "bg-primary/20 text-primary" : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="md:col-span-2 space-y-8">
          <section className="space-y-4">
            <h3 className="text-xl font-bold">Preferences</h3>
            <Card className="glass">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold flex items-center gap-2">
                      <Accessibility className="text-primary w-4 h-4" /> Accessibility Mode
                    </h4>
                    <p className="text-xs text-white/40">Optimize routes for ramps and elevators</p>
                  </div>
                  <button 
                    onClick={() => setAccessibility(!accessibility)}
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      accessibility ? "bg-primary" : "bg-white/10"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                      accessibility ? "left-7" : "left-1"
                    )} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold flex items-center gap-2">
                      <Zap className="text-warning w-4 h-4" /> High Refresh Rate
                    </h4>
                    <p className="text-xs text-white/40">Live sensor updates every 5 seconds</p>
                  </div>
                  <Badge variant="success">ACTIVE</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold flex items-center gap-2">
                      <Globe className="text-accent w-4 h-4" /> Language
                    </h4>
                    <p className="text-xs text-white/40">System preferred language</p>
                  </div>
                  <Button variant="outline" className="text-xs h-8">English (US)</Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold">Profile Info</h3>
            <Card className="glass">
              <CardContent className="p-6 flex items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-black">
                  JD
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="text-2xl font-bold">John Doe</h4>
                  <p className="text-sm text-white/40">Gold Member • Section 104 Fan</p>
                </div>
                <Button variant="outline">EDIT</Button>
              </CardContent>
            </Card>
          </section>

          <div className="pt-8 flex justify-end">
            <Button className="bg-primary/20 text-primary border border-primary/20 hover:bg-primary/30 px-12">
              SAVE CHANGES
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
