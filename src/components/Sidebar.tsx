
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Map as MapIcon, Users, Bell, Settings, BarChart3, Clock, AlertTriangle, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const attendeeLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/map", label: "Venue Map", icon: MapIcon },
  { href: "/queues", label: "Live Queues", icon: Clock },
  { href: "/group", label: "Meet Group", icon: Users },
  { href: "/alerts", label: "Alerts", icon: Bell },
];

const organizerLinks = [
  { href: "/admin", label: "Admin Panel", icon: BarChart3 },
  { href: "/admin/alerts", label: "Broadcast", icon: AlertTriangle },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = pathname.startsWith("/admin");
  const links = isAdmin ? organizerLinks : attendeeLinks;

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-surface border border-white/10 rounded-xl text-white shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "w-64 h-screen border-r border-white/10 bg-surface/50 backdrop-blur-xl flex flex-col fixed left-0 top-0 z-40 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            CrowdPulse
          </h1>
          <p className="text-xs text-white/40 mt-1 uppercase tracking-widest font-semibold">
            {isAdmin ? "Organizer Suite" : "Attendee App"}
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-primary/20 text-primary border border-primary/20" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "group-hover:text-white")} />
                <span className="font-medium">{link.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <Link
            href={isAdmin ? "/dashboard" : "/admin"}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">
              Switch to {isAdmin ? "Attendee" : "Organizer"}
            </span>
          </Link>
        </div>
      </aside>
    </>
  );
}
