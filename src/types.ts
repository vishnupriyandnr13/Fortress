export type Role = 'customer' | 'analyst' | 'monitoring' | 'compliance' | 'admin';

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category: string;
  status: 'completed' | 'pending' | 'disputed' | 'reversed';
  location: string;
  riskScore: number;
  anomaly?: string;
}

export interface FraudCase {
  id: string;
  customerId: string;
  customerName: string;
  openedDate: string;
  type: 'Identity Theft' | 'Account Takeover' | 'Card Not Present' | 'ATM Fraud';
  status: 'Open' | 'Under Review' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignedTo?: string;
  riskScore: number;
  description: string;
  transactions: Transaction[];
}

export interface Dispute {
  id: string;
  caseId: string;
  transactionId: string;
  customerStatement: string;
  status: 'Awaiting Evidence' | 'Under Review' | 'Merchant Responded' | 'Settled' | 'Denied';
  evidenceUrls: string[];
  timeline: {
    date: string;
    event: string;
    actor: string;
  }[];
}
