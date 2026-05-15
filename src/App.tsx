import React, { useState } from 'react';
import { CustomerPortal } from './components/CustomerPortal';
import { AnalystDashboard } from './components/AnalystDashboard';
import { MonitoringCenter } from './components/MonitoringCenter';
import { ComplianceView } from './components/ComplianceView';
import { Badge, Button } from './components/UI';
import { Shield, LayoutDashboard, Globe, Scale, DollarSign, BrainCircuit, Users, Lock, ChevronRight, Menu, X, Bell, User } from 'lucide-react';
import { Role } from './types';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [role, setRole] = useState<Role>('analyst');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigation = [
    { id: 'analyst', label: 'Fraud Operations', icon: LayoutDashboard, roles: ['analyst', 'admin'] },
    { id: 'monitoring', label: 'Threat Intelligence', icon: Globe, roles: ['monitoring', 'analyst', 'admin'] },
    { id: 'customer', label: 'Customer Portal', icon: User, roles: ['customer', 'admin'] },
    { id: 'compliance', label: 'Compliance & Audit', icon: Scale, roles: ['compliance', 'admin'] },
    { id: 'refund', label: 'Disbursements', icon: DollarSign, roles: ['admin'] },
  ];

  const renderContent = () => {
    switch (role) {
      case 'customer':
        return <CustomerPortal />;
      case 'analyst':
        return <AnalystDashboard />;
      case 'monitoring':
        return <MonitoringCenter />;
      case 'compliance':
        return <ComplianceView />;
      default:
        return (
          <div className="flex items-center justify-center h-[calc(100vh-8rem)] text-slate-400 font-medium">
            <div className="text-center">
               <BrainCircuit size={48} className="mx-auto mb-4 opacity-20" />
               <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2 italic">Module in Development</h2>
               <p>Our AI agents are currently architecting the {role} module.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={cn(
      "min-h-screen flex transition-colors duration-300",
      role === 'monitoring' ? 'bg-slate-950' : 'bg-slate-50 dark:bg-slate-950'
    )}>
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className={cn(
          "h-screen fixed top-0 left-0 z-40 overflow-hidden border-r border-slate-200 dark:border-slate-900 transition-colors duration-300",
          role === 'monitoring' ? 'bg-slate-950 border-slate-800' : 'bg-white dark:bg-slate-900'
        )}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-brand-600 rounded-xl">
              <Shield className="text-white" size={24} />
            </div>
            <span className="text-xl font-display font-black tracking-tighter uppercase dark:text-white">Fortress</span>
          </div>

          <nav className="flex-1 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setRole(item.id as Role)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium group",
                  role === item.id 
                    ? "bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400" 
                    : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400"
                )}
              >
                <item.icon size={20} className={cn(
                  "transition-colors",
                  role === item.id ? "text-brand-600 dark:text-brand-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                )} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-4">
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xs uppercase">VP</div>
                   <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Vishnu Priya</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Senior Ops Admin</div>
                   </div>
                </div>
                <Button variant="ghost" className="w-full text-xs justify-between h-8 hover:bg-slate-100 dark:hover:bg-slate-700">
                   Account Settings <ChevronRight size={14} />
                </Button>
             </div>
             <div className="text-[10px] text-slate-400 text-center uppercase tracking-[0.2em] font-bold">
                Version 4.2.0-Alpha
             </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300 min-h-screen",
        isSidebarOpen ? "ml-[280px]" : "ml-0"
      )}>
        {/* Top Navbar */}
        <header className={cn(
          "h-16 flex items-center justify-between px-6 sticky top-0 z-30 transition-colors duration-300",
          role === 'monitoring' ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 text-white' : 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-900'
        )}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              {isSidebarOpen ? <Menu size={20} /> : <Menu size={20} />}
            </button>
            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800"></div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Lock size={12} fill="currentColor" /> System Status: Secure
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold rounded-full border border-amber-200 dark:border-amber-800 animate-pulse">
               4 HIGH RISK ALERTS
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-600 rounded-full border-2 border-white dark:border-slate-950"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
               <User size={18} />
            </div>
          </div>
        </header>

        <div className="p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
