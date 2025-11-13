import React from 'react';
import { Card } from '../../components/common/Card';
import { generateId } from '../../utils/data';

export const SupportIssueResolution: React.FC = () => (
    <div>
        <Card title="Open Issues/Tickets">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                <input type="text" placeholder="Search by user, booking, or issue description" style={{ flexGrow: 1 }} aria-label="Search issues" />
                <button aria-label="Search issues">Search</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }} aria-label="Open issues and tickets table">
                <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Issue ID</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Regarding</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Summary</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: '8px' }}>{generateId()}</td>
                        <td style={{ padding: '8px' }}>Booking 123 (Client A)</td>
                        <td style={{ padding: '8px' }}>Client wants to reschedule</td>
                        <td style={{ padding: '8px' }}>New</td>
                        <td style={{ padding: '8px' }}>
                            <button style={{ marginRight: '5px' }} aria-label="View issue details">View Details</button>
                            <button className="btn-secondary" aria-label="Assign issue">Assign</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
        <Card title="Issue Details & Actions (Selected Issue)">
            <h4>Issue: Client wants to reschedule Booking 123</h4>
            <p><strong>Internal Notes:</strong></p>
            <textarea rows={3} placeholder="Add internal notes here..." style={{ width: '100%', marginBottom: '10px' }} aria-label="Internal notes for issue"></textarea>
            <p><strong>Message/Chat Logs:</strong></p>
            <div style={{ border: '1px solid var(--border-color)', padding: '10px', minHeight: '80px', marginBottom: '10px', backgroundColor: 'var(--background-color)' }}>
                <em>Chat log with Client A and Business X...</em>
            </div>
            <p><strong>Tags:</strong> <input type="text" placeholder="e.g., VIP Client, Problematic Barber" style={{ width: '100%' }} aria-label="Issue tags" /></p>
            <input type="file" style={{ display: 'block', marginBottom: '10px', color: 'var(--text-color)' }} aria-label="Attach file to issue" />
            <button className="btn-danger" style={{ marginRight: '5px' }} aria-label="Issue refund or voucher">Issue Refund/Voucher</button>
            <button className="btn-secondary" aria-label="Export case details">Export Case</button>
        </Card>
    </div>
);
