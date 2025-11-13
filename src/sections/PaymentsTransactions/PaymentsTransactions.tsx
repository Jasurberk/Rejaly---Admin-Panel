import React from 'react';
import { Card } from '../../components/common/Card';

export const PaymentsTransactions: React.FC = () => (
    <div>
        <Card title="Payment & Refund Log">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                <input type="text" placeholder="Search by user, business, or ID" style={{ flexGrow: 1 }} aria-label="Search transactions" />
                <select aria-label="Filter transactions by type"><option>All Types</option><option>Payment</option><option>Refund</option></select>
                <input type="date" placeholder="From Date" aria-label="Filter from date" />
                <input type="date" placeholder="To Date" aria-label="Filter to date" />
                <button aria-label="Apply transaction filters">Filter</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }} aria-label="Payment and refund log">
                <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Txn ID</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Client</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Business</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Amount</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Type</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td colSpan={7} style={{ padding: '8px', textAlign: 'center' }}><em>No transactions to display.</em></td></tr>
                </tbody>
            </table>
        </Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Card title="Issue Refund / Credit">
                <p>Form to manually issue refunds or credits (Placeholder)</p>
            </Card>
            <Card title="Revenue Reports">
                <p>Total Revenue: $XXX,XXX.XX</p>
                <p>Monthly Revenue: $XX,XXX.XX</p>
                <button className="btn-secondary">Download Financial Statements (CSV/PDF)</button>
            </Card>
        </div>
    </div>
);
