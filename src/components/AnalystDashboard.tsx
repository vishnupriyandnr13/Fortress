import React from 'react';
import { Card, Badge, Button, StatCard } from './UI';
import { MOCK_CASES, MOCK_TRANSACTIONS } from '../constants';
import { ShieldAlert, Users, Clock, CheckCircle2, ChevronRight, Filter, Search, Brain, Zap, ArrowUpRight } from 'lucide-react';
import { formatCurrency, formatDate, cn } from '../lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const CHART_DATA = [
  { name: '08:00', value: 12 },
  { name: '10:00', value: 25 },
  { name: '12:00', value: 18 },
  { name: '14:00', value: 45 },
  { name: '16:00', value: 30 },
  { name: '18:00', value: 55 },
  { name: '20:00', value: 40 },
];

export const AnalystDashboard = () => {
  return (
    <div className="space-y-8 py-8 px-4 w-full">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Fraud Operations Control</h1>
          <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Global monitoring active
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Case ID, User, or Card..." 
              className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none w-64 text-sm"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter size={18} /> Advanced
          </Button>
        </div>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Investigations" value={MOCK_CASES.length} change="+12%" trend="up" icon={ShieldAlert} />
        <StatCard title="High Risk Alerts" value={42} change="+5%" trend="up" icon={Zap} />
        <StatCard title="Total Disputes" value={156} change="-2%" trend="down" icon={Clock} />
        <StatCard title="Auto-Resolved" value="84%" change="+8%" trend="up" icon={CheckCircle2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Queue */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-xl text-slate-900 dark:text-white">Investigation Queue</h3>
            <div className="flex gap-2">
              <Badge variant="error" className="cursor-pointer">Critical (2)</Badge>
              <Badge variant="warning" className="cursor-pointer">High (5)</Badge>
            </div>
          </div>
          <div className="space-y-4">
            {MOCK_CASES.map((item) => (
              <div key={item.id} className="p-5 border border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                      item.priority === 'Critical' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
                    )}>
                      {item.priority === 'Critical' ? <ShieldAlert size={24} /> : <Clock size={24} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900 dark:text-white uppercase tracking-tight">{item.id}</span>
                        <Badge variant={item.priority === 'Critical' ? 'critical' : 'warning'}>{item.priority}</Badge>
                      </div>
                      <div className="text-sm font-medium text-slate-600 dark:text-slate-300">{item.customerName}</div>
                      <div className="text-xs text-slate-400 mt-1">{item.type} • Opened {formatDate(item.openedDate)}</div>
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col items-end justify-between sm:justify-center gap-2">
                     <div className="flex items-center gap-2 text-right">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Risk Score</div>
                        <span className={cn(
                          "text-xl font-display font-black",
                          item.riskScore > 90 ? 'text-rose-600' : 'text-amber-600'
                        )}>{item.riskScore}</span>
                     </div>
                     <ChevronRight className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-bold">JD</div>
                    ))}
                    <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-bold">+2</div>
                  </div>
                  <Button variant="ghost" className="text-xs uppercase font-bold tracking-widest text-brand-600 h-8">
                     Quick Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Monitoring / Insights */}
        <div className="space-y-8">
          <Card className="bg-slate-900 text-white border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Brain className="text-brand-400" size={20} /> AI Agent Efficiency
              </h3>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHART_DATA}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorVal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-3 rounded-xl">
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Time Saved</div>
                  <div className="text-xl font-bold font-display">124h</div>
                </div>
                <div className="bg-slate-800/50 p-3 rounded-xl">
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Accuracy</div>
                  <div className="text-xl font-bold font-display">99.2%</div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
             <h3 className="font-bold text-lg mb-4">Anomaly Heatmap</h3>
             <div className="space-y-3">
                {[
                  { label: 'ATM Skimming', count: 12, trend: 15 },
                  { label: 'CNP Fraud', count: 45, trend: -5 },
                  { label: 'Bot Activity', count: 8, trend: 110 },
                  { label: 'Account Takeover', count: 22, trend: 2 },
                ].map(trend => (
                  <div key={trend.label}>
                    <div className="flex justify-between text-xs font-bold mb-1 uppercase tracking-tight">
                      <span className="text-slate-600 dark:text-slate-400">{trend.label}</span>
                      <span className={trend.trend > 10 ? 'text-rose-600' : 'text-emerald-600'}>
                        {trend.trend > 0 ? '+' : ''}{trend.trend}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full", trend.trend > 10 ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]' : 'bg-brand-500')} 
                        style={{ width: `${Math.min(trend.count * 2, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
             </div>
             <Button variant="outline" className="w-full mt-6 gap-2">
                Detailed Forensic Report <ArrowUpRight size={16} />
             </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
