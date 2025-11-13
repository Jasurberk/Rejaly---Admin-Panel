import React from 'react';
import { Card } from '../../components/common/Card';

export const AnalyticsDashboard: React.FC = () => (
    <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <Card title="Total Bookings" style={{ textAlign: 'center' }}><h2>1,234</h2></Card>
            <Card title="New Users (Monthly)" style={{ textAlign: 'center' }}><h2>150</h2></Card>
            <Card title="Active Businesses" style={{ textAlign: 'center' }}><h2>50</h2></Card>
            <Card title="Total Revenue" style={{ textAlign: 'center' }}><h2>$125,000</h2></Card>
        </div>
        <Card title="Revenue Trends (Monthly)">
            <div style={{ height: '200px', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-color)' }}>
                <em>Chart Placeholder</em>
            </div>
        </Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Card title="Most Booked Businesses">
                <ul>
                    <li>Stylin' Barbershop (120 bookings)</li>
                    <li>Nail Nirvana Salon (80 bookings)</li>
                </ul>
            </Card>
            <Card title="System Health">
                <p>System Uptime: 99.9%</p>
                <p>Error Logs: (Link/Status Placeholder)</p>
                <p>Optional: Real-time monitoring (UI Placeholder)</p>
            </Card>
        </div>
    </div>
);
