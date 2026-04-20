
"use client";

import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui/core";
import { INITIAL_ZONES, INITIAL_ALERTS } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { AlertTriangle, TrendingUp, Users, Activity, Send, Settings, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const chartData = [
  { time: '18:00', users: 12000 },
  { time: '18:30', users: 18000 },
  { time: '19:00', users: 25000 },
  { time: '19:30', users: 42000 },
  { time: '20:00', users: 38000 },
  { time: '20:30', users: 45000 },
];

const zonePressureData = INITIAL_ZONES.map(z => ({
  name: z.name.split(' ')[0],
  pressure: Math.round((z.activeUsers / z.capacity) * 100),
}));

export default function AdminDashboard() {
  const [emergencyMode, setEmergencyMode] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black flex items-center gap-3">
            <Activity className="text-primary" /> Operations Control
          </h2>
          <p className="text-white/40">Real-time stadium telemetry and crowd intelligence</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            variant={emergencyMode ? "danger" : "outline"} 
            className={cn("flex-1 md:flex-none font-bold", emergencyMode && "animate-pulse")}
            onClick={() => setEmergencyMode(!emergencyMode)}
          >
            <ShieldAlert className="w-4 h-4 mr-2" /> 
            {emergencyMode ? "DEACTIVATE EMERGENCY" : "EMERGENCY MODE"}
          </Button>
          <Button className="flex-1 md:flex-none bg-primary text-white font-bold">
            <Send className="w-4 h-4 mr-2" /> BROADCAST ALERT
          </Button>
        </div>
      </header>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass border-primary/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Active Devices</p>
                <h4 className="text-3xl font-black mt-1">42,892</h4>
              </div>
              <div className="p-2 bg-primary/20 rounded-lg"><Users className="text-primary w-5 h-5" /></div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-secondary">
              <TrendingUp className="w-3 h-3" /> +12% from last game
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-warning/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Avg. Pressure</p>
                <h4 className="text-3xl font-black mt-1">64%</h4>
              </div>
              <div className="p-2 bg-warning/20 rounded-lg"><Activity className="text-warning w-5 h-5" /></div>
            </div>
            <div className="mt-4 w-full bg-white/5 h-1.5 rounded-full">
              <div className="bg-warning h-full w-[64%] rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-danger/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Active Bottlenecks</p>
                <h4 className="text-3xl font-black mt-1 text-danger">3</h4>
              </div>
              <div className="p-2 bg-danger/20 rounded-lg"><AlertTriangle className="text-danger w-5 h-5" /></div>
            </div>
            <div className="mt-4 flex gap-1">
              <Badge variant="danger" className="text-[10px]">Zone D</Badge>
              <Badge variant="danger" className="text-[10px]">Gate 1</Badge>
              <Badge variant="danger" className="text-[10px]">Stall 4</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-accent/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest">System Health</p>
                <h4 className="text-3xl font-black mt-1">99.8%</h4>
              </div>
              <div className="p-2 bg-accent/20 rounded-lg"><Settings className="text-accent w-5 h-5" /></div>
            </div>
            <p className="text-[10px] text-white/40 mt-4">All sensors reporting</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Crowd Growth Chart */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg">Crowd Density Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="time" stroke="#ffffff40" fontSize={12} />
                <YAxis stroke="#ffffff40" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161B28', border: '1px solid #ffffff10', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="users" stroke="#3B82F6" fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Zone Pressure Bar Chart */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg">Real-time Zone Pressure (%)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zonePressureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} />
                <YAxis stroke="#ffffff40" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161B28', border: '1px solid #ffffff10', borderRadius: '8px' }}
                  cursor={{ fill: '#ffffff05' }}
                />
                <Bar dataKey="pressure" radius={[4, 4, 0, 0]}>
                  {zonePressureData.map((entry, index) => (
                    <circle key={`cell-${index}`} fill={entry.pressure > 80 ? '#EF4444' : entry.pressure > 50 ? '#F59E0B' : '#10B981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Zone Management Table */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold">Zone Status Management</h3>
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface/30 backdrop-blur-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 font-bold uppercase tracking-widest text-[10px] text-white/40">Zone Name</th>
                <th className="p-4 font-bold uppercase tracking-widest text-[10px] text-white/40">Load Level</th>
                <th className="p-4 font-bold uppercase tracking-widest text-[10px] text-white/40">Active/Cap</th>
                <th className="p-4 font-bold uppercase tracking-widest text-[10px] text-white/40">Avg Wait</th>
                <th className="p-4 font-bold uppercase tracking-widest text-[10px] text-white/40">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {INITIAL_ZONES.map((zone) => (
                <tr key={zone.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="font-bold group-hover:text-primary transition-colors">{zone.name}</div>
                    <div className="text-[10px] text-white/40">{zone.type.toUpperCase()}</div>
                  </td>
                  <td className="p-4">
                    <Badge variant={zone.congestion === 'low' ? 'success' : zone.congestion === 'medium' ? 'warning' : 'danger'}>
                      {zone.congestion.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="p-4 font-mono">
                    {zone.activeUsers} / {zone.capacity}
                  </td>
                  <td className="p-4 font-bold text-primary">
                    {Math.floor(Math.random() * 20)}m
                  </td>
                  <td className="p-4">
                    <button className="text-[10px] font-bold px-3 py-1 bg-white/5 border border-white/10 rounded hover:bg-primary hover:border-primary transition-all">MANAGE</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
