
"use client";

import { Button } from "@/components/ui/core";
import { Activity, ShieldCheck, Zap, Navigation, Users, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="min-h-screen -ml-64 -m-8 relative overflow-hidden bg-[#0A0E17]">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest mb-8">
          <Activity className="w-4 h-4 text-primary" /> The Future of Event Operations
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
          CROWD<span className="text-primary">PULSE</span>
        </h1>
        
        <p className="text-xl text-white/60 max-w-2xl mb-12 leading-relaxed">
          The ultimate real-time platform for large-scale sporting venues. Optimize movement, reduce wait times, and enhance every fan's experience with AI-driven crowd intelligence.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          <Link href="/dashboard">
            <Button className="px-12 py-8 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              FAN DASHBOARD <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="outline" className="px-12 py-8 text-lg font-bold rounded-2xl border-white/10 hover:bg-white/5 transition-all">
              OPERATIONS SUITE
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="relative py-20 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Live Heatmaps",
            desc: "Visualise crowd pressure across gates, concourses, and seating zones in real-time.",
            icon: Navigation,
            color: "text-primary"
          },
          {
            title: "Smart Routing",
            desc: "Dynamic navigation suggestions that avoid bottlenecks and reduce congestion.",
            icon: Zap,
            color: "text-warning"
          },
          {
            title: "Emergency Sync",
            desc: "One-click evacuation protocols and prioritized emergency broadcasts to every device.",
            icon: ShieldCheck,
            color: "text-danger"
          }
        ].map((feature, i) => (
          <div key={i} className="glass p-10 rounded-3xl group hover:border-primary/40 transition-all hover:-translate-y-2">
            <div className={cn("w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", feature.color)}>
              <feature.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-white/40 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <h4 className="text-4xl font-black text-primary mb-2">30%</h4>
            <p className="text-xs uppercase tracking-widest text-white/40 font-bold">Reduction in Wait Times</p>
          </div>
          <div>
            <h4 className="text-4xl font-black text-secondary mb-2">10k+</h4>
            <p className="text-xs uppercase tracking-widest text-white/40 font-bold">Active Users Per Event</p>
          </div>
          <div>
            <h4 className="text-4xl font-black text-warning mb-2">15s</h4>
            <p className="text-xs uppercase tracking-widest text-white/40 font-bold">Alert Response Speed</p>
          </div>
          <div>
            <h4 className="text-4xl font-black text-accent mb-2">100%</h4>
            <p className="text-xs uppercase tracking-widest text-white/40 font-bold">Venue Coverage</p>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center opacity-40 hover:opacity-100 transition-opacity">
        <p className="text-sm font-bold tracking-widest uppercase mb-4">Built for the Ultimate Game Day</p>
        <div className="flex justify-center gap-8 grayscale">
          <span className="font-black text-2xl tracking-tighter">NIKE</span>
          <span className="font-black text-2xl tracking-tighter">VISA</span>
          <span className="font-black text-2xl tracking-tighter">COCA-COLA</span>
        </div>
      </footer>
    </div>
  );
}

