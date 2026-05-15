import React from 'react';
import { Card, Badge, StatCard } from './UI';
import { FileText, Search, Download, ShieldCheck, History } from 'lucide-react';
import { formatDate } from '../lib/utils';

export const ComplianceView = () => {
  return (
    <div className="space-y-8 py-8 px-4 max-w-6xl mx-auto">
      <header className="">
        <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Compliance & Audit</h1>
        <p className="text-slate-500 dark:text-slate-400">Reviewing regulatory standards and system integrity logs</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Audit Readiness" value="Level 4" icon={ShieldCheck} />
        <StatCard title="Flagged Logs" value="12" icon={FileText} />
        <StatCard title="Last Backup" value="42m ago" icon={History} />
        <StatCard title="Compliance Score" value="98.4%" icon={ShieldCheck} />
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg">System Access Logs</h3>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
              <Download size={18} />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search logs..." className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg text-sm" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { id: 'LOG-1', event: 'Database Access: PII Decryption', user: 'Elena Rossi', time: '2026-05-15T12:00:00Z', status: 'Authorized' },
            { id: 'LOG-2', event: 'Rule Configuration Update', user: 'System Admin', time: '2026-05-15T11:45:00Z', status: 'Authorized' },
            { id: 'LOG-3', event: 'Bulk Refund Initialization', user: 'Refund Proc #4', time: '2026-05-15T10:30:00Z', status: 'Flagged' },
          ].map(log => (
            <div key={log.id} className="p-4 border border-slate-50 dark:border-slate-800/50 rounded-xl flex justify-between items-center group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tighter">{log.event}</div>
                <div className="text-xs text-slate-500 mt-1">{log.user} • {formatDate(log.time)}</div>
              </div>
              <Badge variant={log.status === 'Authorized' ? 'success' : 'warning'}>{log.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
