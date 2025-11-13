import React from 'react';
import { Card } from '../../components/common/Card';

export const PlatformConfiguration: React.FC = () => (
    <div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Card title="Service Categories">
                <p>List and manage service categories (e.g., Hair, Nails, Massage)</p>
                <button>Manage Categories</button>
            </Card>
            <Card title="Pricing & Commission Rules">
                <p>Set global pricing rules or commission rates.</p>
                <button>Edit Rules</button>
            </Card>
            <Card title="Cancellation Policies">
                <p>Define platform-wide cancellation policy rules.</p>
                <button>Edit Policies</button>
            </Card>
            <Card title="Payment Gateways">
                <label style={{ display: 'block', marginBottom: '5px' }}><input type="checkbox" style={{ marginRight: '5px' }} /> Enable Stripe</label>
                <label style={{ display: 'block', marginBottom: '5px' }}><input type="checkbox" style={{ marginRight: '5px' }} /> Enable PayPal</label>
            </Card>
            <Card title="Feature Toggles">
                <label style={{ display: 'block', marginBottom: '5px' }}><input type="checkbox" style={{ marginRight: '5px' }} /> Enable Beta Feature X</label>
                <label style={{ display: 'block', marginBottom: '5px' }}><input type="checkbox" style={{ marginRight: '5px' }} /> Enable Google Calendar Sync</label>
            </Card>
            <Card title="Role-Based Permissions">
                <p>Super Admin, Support Agent, Finance Admin (UI Placeholder)</p>
                <button className="btn-secondary">Manage Roles</button>
            </Card>
        </div>
    </div>
);
