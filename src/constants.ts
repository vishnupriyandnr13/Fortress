import { Transaction, FraudCase, Dispute } from './types';

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'TX-9021',
    date: '2026-05-14T14:30:00Z',
    merchant: 'Apple Store Online',
    amount: 1499.00,
    category: 'Electronics',
    status: 'completed',
    location: 'Cupertino, CA',
    riskScore: 12
  },
  {
    id: 'TX-9022',
    date: '2026-05-15T02:15:00Z',
    merchant: 'Unknown Electronic Store',
    amount: 2500.00,
    category: 'Electronics',
    status: 'disputed',
    location: 'Lagos, Nigeria',
    riskScore: 92,
    anomaly: 'Location deviation'
  },
  {
    id: 'TX-9023',
    date: '2026-05-15T08:45:00Z',
    merchant: 'Starbucks Coffee',
    amount: 6.50,
    category: 'Food & Drink',
    status: 'pending',
    location: 'New York, NY',
    riskScore: 2
  },
  {
    id: 'TX-9024',
    date: '2026-05-15T09:12:00Z',
    merchant: 'Luxury Watches Co',
    amount: 5400.00,
    category: 'Shopping',
    status: 'completed',
    location: 'Zürich, Switzerland',
    riskScore: 85,
    anomaly: 'High amount for user segment'
  },
  {
    id: 'TX-9025',
    date: '2026-05-15T10:00:00Z',
    merchant: 'Gas Station #442',
    amount: 45.32,
    category: 'Travel',
    status: 'completed',
    location: 'New York, NY',
    riskScore: 5
  }
];

export const MOCK_CASES: FraudCase[] = [
  {
    id: 'CASE-7712',
    customerId: 'CUST-102',
    customerName: 'Sarah Jenkins',
    openedDate: '2026-05-15T03:00:00Z',
    type: 'Card Not Present',
    status: 'Open',
    priority: 'High',
    assignedTo: 'Alex Miller',
    riskScore: 88,
    description: 'Multiple high-value electronics purchases from overseas locations within 2 hours.',
    transactions: [MOCK_TRANSACTIONS[1], MOCK_TRANSACTIONS[3]]
  },
  {
    id: 'CASE-7713',
    customerId: 'CUST-305',
    customerName: 'Michael Chen',
    openedDate: '2026-05-14T20:15:00Z',
    type: 'Account Takeover',
    status: 'Under Review',
    priority: 'Critical',
    assignedTo: 'Elena Rossi',
    riskScore: 95,
    description: 'Simultaneous logins from two different IP addresses in separate continents.',
    transactions: []
  }
];

export const MOCK_DISPUTES: Dispute[] = [
  {
    id: 'DSP-4401',
    caseId: 'CASE-7712',
    transactionId: 'TX-9022',
    customerStatement: 'I did not make this purchase. I was at home in New York during this time.',
    status: 'Under Review',
    evidenceUrls: ['evidence_receipt.pdf'],
    timeline: [
      { date: '2026-05-15T03:10:00Z', event: 'Dispute filed by customer', actor: 'Sarah Jenkins' },
      { date: '2026-05-15T04:15:00Z', event: 'AI Risk Score: 92 (High)', actor: 'Fortress AI' },
      { date: '2026-05-15T09:00:00Z', event: 'Assigned to analyst', actor: 'System' }
    ]
  }
];
