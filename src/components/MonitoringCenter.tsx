import React from 'react';
import { Card, Badge, Button } from './UI';
import { Shield, MapPin, Globe, Activity, Terminal, AlertTriangle, Cpu, Radio } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';
import { cn } from '../lib/utils';

const LIVE_STREAM_MOCK = [
  { id: 1, type: 'ALERT', msg: 'Suspicious device ID detected in Manila, PH', level: 'HIGH' },
  { id: 2, type: 'INFO', msg: 'System check: Fraud model v2.4 initialized', level: 'LOW' },
  { id: 3, type: 'ALERT', msg: 'Multiple rapid login attempts: U-9021', level: 'CRITICAL' },
  { id: 4, type: 'WARN', msg: 'Delayed API response from regional node', level: 'MEDIUM' },
  { id: 5, type: 'ALERT', msg: 'High velocity transaction detected: $4.5k', level: 'HIGH' },
];

export const MonitoringCenter = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 space-y-8 font-mono">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            <h1 className="text-2xl font-bold tracking-tighter uppercase">Fortress Live Ops</h1>
          </div>
          <div className="flex gap-4 text-xs text-slate-500 uppercase tracking-widest">
            <span>Uptime: 99.998%</span>
            <span>Latency: 12ms</span>
            <span>Global Node: NYC-4</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="bg-slate-900 border border-slate-800 text-xs">
            <Terminal size={14} className="mr-2" /> Global CLI
          </Button>
          <Button variant="primary" className="bg-emerald-600 hover:bg-emerald-700 text-xs text-white">
            <Activity size={14} className="mr-2" /> Live Status
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Metrics and Stream */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="bg-slate-900/50 border-slate-800 p-4">
             <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-4">Real-time Stream</div>
             <div className="space-y-4 max-h-[400px] overflow-hidden relative">
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none"></div>
                {LIVE_STREAM_MOCK.map((log) => (
                  <div key={log.id} className="text-xs group cursor-default">
                    <span className={cn(
                      "font-bold mr-2",
                      log.level === 'CRITICAL' ? 'text-red-500' : log.level === 'HIGH' ? 'text-amber-500' : 'text-sky-500'
                    )}>[{log.type}]</span>
                    <span className="text-slate-400 group-hover:text-slate-200 transition-colors">{log.msg}</span>
                  </div>
                ))}
             </div>
          </Card>

          <Card className="p-4 bg-slate-900/50 border-slate-800">
             <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-4">Traffic Nodes</div>
             <div className="space-y-6">
                {[
                  { region: 'North America', p: 85, status: 'online' },
                  { region: 'Europe', p: 92, status: 'online' },
                  { region: 'Asia Pacific', p: 45, status: 'warning' },
                  { region: 'LATAM', p: 12, status: 'online' },
                ].map(node => (
                  <div key={node.region} className="flex items-center gap-4">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      node.status === 'online' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500 animate-pulse shadow-[0_0_8px_#f59e0b]'
                    )}></div>
                    <div className="flex-1">
                      <div className="flex justify-between text-[10px] font-bold mb-1 uppercase tracking-tight">
                        <span className="text-slate-400">{node.region}</span>
                        <span>{node.p}% load</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                        <div className="bg-slate-400 h-full" style={{ width: `${node.p}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </Card>
        </div>

        {/* Center: Live Map Visualization */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-900/50 border-slate-800 h-full flex flex-col relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-slate-700)_1px,_transparent_1px)] bg-[size:24px_24px]"></div>
             </div>
             
             <div className="p-6 relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Globe size={18} className="text-brand-500" /> Global Threat Landscape
                  </h3>
                  <div className="flex items-center gap-4 text-[10px]">
                     <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full"></span> Suspicious</span>
                     <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Verified</span>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center relative min-h-[400px]">
                   {/* This would ideally be a real interactive SVG map, but we'll simulate the "feeling" with visuals */}
                   <div className="relative w-full h-full flex items-center justify-center p-8">
                      <div className="absolute w-[80%] h-[80%] border-2 border-slate-800/50 rounded-full animate-[spin_20s_linear_infinite]"></div>
                      <div className="absolute w-[60%] h-[60%] border border-slate-800/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                      <div className="z-10 text-center">
                         <div className="text-5xl font-display font-black text-slate-100 mb-2 uppercase italic tracking-tighter">Monitoring</div>
                         <div className="text-slate-500 text-xs uppercase tracking-[0.4em]">Active Scanning in Progress</div>
                      </div>

                      {/* Random "pings" around the map */}
                      <div className="absolute top-[20%] left-[30%] flex flex-col items-center">
                         <div className="w-4 h-4 bg-red-500/40 rounded-full animate-ping mb-2"></div>
                         <Badge variant="error" className="text-[8px] bg-red-950 text-red-400 border border-red-900 pointer-events-none">CRITICAL ANOMALY: LON-4</Badge>
                      </div>
                      <div className="absolute bottom-[25%] right-[20%] flex flex-col items-center">
                         <div className="w-3 h-3 bg-emerald-500/40 rounded-full animate-ping mb-2"></div>
                         <Badge className="text-[8px] bg-emerald-950 text-emerald-400 border border-emerald-900 pointer-events-none">NODE-JP SECURE</Badge>
                      </div>
                   </div>
                </div>

                <div className="mt-auto grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/50">
                   <div className="text-center">
                      <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Alerts / Min</div>
                      <div className="text-2xl font-bold tracking-tight">142</div>
                   </div>
                   <div className="text-center border-x border-slate-800/50">
                      <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Scanned Blocks</div>
                      <div className="text-2xl font-bold tracking-tight">8.4M</div>
                   </div>
                   <div className="text-center">
                      <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Defense Level</div>
                      <div className="text-2xl font-bold text-emerald-500 tracking-tight">ALPHA</div>
                   </div>
                </div>
             </div>
          </Card>
        </div>

        {/* Right Column: Hardware / System Health */}
        <div className="lg:col-span-1 space-y-8">
           <Card className="bg-slate-900/50 border-slate-800 p-4">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Model Confidence</span>
                <Radio size={14} className="text-emerald-500 animate-pulse" />
              </div>
              <div className="flex flex-col items-center justify-center py-4">
                 <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                       <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                       <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="364.4" strokeDashoffset="36.4" className="text-emerald-500" strokeLinecap="round" />
                    </svg>
                    <div className="absolute text-center">
                       <span className="text-2xl font-bold">94%</span>
                       <div className="text-[8px] text-slate-500 uppercase">Certainty</div>
                    </div>
                 </div>
                 <div className="mt-4 text-[10px] text-center text-slate-500">ML Engine optimized for zero-day fraud patterns</div>
              </div>
           </Card>

           <Card className="bg-slate-900/50 border-slate-800 p-4">
              <div className="flex items-center gap-2 mb-4 text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                 <Cpu size={14} /> Cluster Performance
              </div>
              <div className="space-y-4">
                 {[
                   { id: 'CPU-A', val: 24 },
                   { id: 'MEM-0', val: 78 },
                   { id: 'GPU-B', val: 45 },
                 ].map(stat => (
                   <div key={stat.id}>
                      <div className="flex justify-between text-[10px] mb-1 uppercase tracking-tighter">
                         <span className="text-slate-400">{stat.id}</span>
                         <span>{stat.val}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full bg-brand-500" style={{ width: `${stat.val}%` }}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};
