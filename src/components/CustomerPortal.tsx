import React from 'react';
import { Card, Badge, Button } from './UI';
import { MOCK_TRANSACTIONS, MOCK_DISPUTES } from '../constants';
import { CreditCard, AlertCircle, TrendingUp, History, Shield, BrainCircuit, Upload, MessageSquare } from 'lucide-react';
import { formatCurrency, formatDate, cn } from '../lib/utils';
import { motion } from 'motion/react';

export const CustomerPortal = () => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto py-8 px-4">
      {/* Header section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Welcome back, Sarah</h1>
          <p className="text-slate-500 dark:text-slate-400">Managing your accounts and security</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Upload size={18} /> Upload Documents
          </Button>
          <Button className="gap-2">
            <AlertCircle size={18} /> Report Fraud
          </Button>
        </div>
      </section>

      {/* Account Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-brand-700 to-brand-900 text-white border-0">
          <div className="flex justify-between mb-8">
            <Shield size={32} />
            <span className="font-mono text-sm">**** 4412</span>
          </div>
          <div className="mb-1 text-brand-200 text-sm font-medium">Available Balance</div>
          <div className="text-3xl font-display font-bold mb-6">$12,450.00</div>
          <div className="flex items-center gap-2 text-xs text-brand-200">
            <Shield size={12} fill="currentColor" /> Protected by Fortress AI
          </div>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <BrainCircuit className="text-brand-600" /> Active Disputes
            </h3>
            <Badge variant="warning">{MOCK_DISPUTES.length} In Progress</Badge>
          </div>
          <div className="space-y-4">
            {MOCK_DISPUTES.map(dispute => (
              <div key={dispute.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">External Payment Dispute</div>
                    <div className="text-xs text-slate-500">{dispute.id} • Started {formatDate(dispute.timeline[0].date)}</div>
                  </div>
                  <Badge variant="warning">{dispute.status}</Badge>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-4 overflow-hidden">
                  <div className="bg-brand-500 h-full w-[60%] rounded-full shadow-[0_0_8px_rgba(14,165,233,0.5)]"></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Transactions */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <History className="text-slate-400" /> Recent Transactions
          </h3>
          <Button variant="ghost" className="text-xs font-bold uppercase tracking-wider">View All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-100 dark:border-slate-800">
              <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-widest">
                <th className="pb-4 pt-2">Transaction</th>
                <th className="pb-4 pt-2">Category</th>
                <th className="pb-4 pt-2">Amount</th>
                <th className="pb-4 pt-2">Status</th>
                <th className="pb-4 pt-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {MOCK_TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-4">
                    <div className="font-medium text-slate-900 dark:text-white">{tx.merchant}</div>
                    <div className="text-xs text-slate-500">{formatDate(tx.date)} • {tx.location}</div>
                  </td>
                  <td className="py-4">
                    <Badge variant="default">{tx.category}</Badge>
                  </td>
                  <td className="py-4">
                    <span className={cn("font-display font-bold", tx.status === 'disputed' ? 'text-rose-600' : 'text-slate-900 dark:text-white')}>
                      {formatCurrency(tx.amount)}
                    </span>
                  </td>
                  <td className="py-4">
                    <Badge variant={tx.status === 'disputed' ? 'error' : tx.status === 'pending' ? 'warning' : 'success'}>
                      {tx.status}
                    </Badge>
                  </td>
                  <td className="py-4 text-right">
                    <Button variant="ghost" className="p-2">
                       <MessageSquare size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* AI Assistant FAB / Bubble */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="bg-brand-600 text-white p-4 rounded-2xl shadow-2xl shadow-brand-500/50 cursor-pointer flex items-center gap-3 active:scale-95 transition-transform"
        >
          <BrainCircuit size={24} />
          <div className="text-sm font-bold pr-2">Ask Fortress AI</div>
        </motion.div>
      </div>
    </div>
  );
};
