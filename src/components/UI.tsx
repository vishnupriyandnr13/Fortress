import React from 'react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const Card = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <div id={id} className={cn("glass rounded-2xl shadow-premium p-6", className)}>
    {children}
  </div>
);

export const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'error' | 'critical' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    error: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400',
    critical: 'bg-red-200 text-red-900 dark:bg-red-950 dark:text-red-300 font-bold',
  };
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold", variants[variant])}>
      {children}
    </span>
  );
};

export const Button = ({ children, onClick, variant = 'primary', className, id }: { children: React.ReactNode, onClick?: () => void, variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger', className?: string, id?: string }) => {
  const variants = {
    primary: 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/20',
    secondary: 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100',
    ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400',
    outline: 'bg-transparent border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white',
  };
  return (
    <button id={id} onClick={onClick} className={cn("px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2", variants[variant], className)}>
      {children}
    </button>
  );
};

export const StatCard = ({ title, value, change, trend, icon: Icon }: { title: string, value: string | number, change?: string, trend?: 'up' | 'down' | 'neutral', icon: any }) => (
  <Card className="hover:scale-[1.02] transition-transform cursor-default">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-brand-50 dark:bg-brand-900/20 rounded-xl">
        <Icon size={24} className="text-brand-600 dark:text-brand-400" />
      </div>
      {change && (
        <span className={cn(
          "text-xs font-medium px-2 py-1 rounded-lg",
          trend === 'up' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 'text-rose-600 bg-rose-50 dark:bg-rose-900/20'
        )}>
          {change}
        </span>
      )}
    </div>
    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{title}</div>
    <div className="text-2xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tight">{value}</div>
  </Card>
);
