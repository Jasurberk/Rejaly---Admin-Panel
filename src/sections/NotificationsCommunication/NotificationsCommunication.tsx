import React from 'react';
import { Card } from '../../components/common/Card';

export const NotificationsCommunication: React.FC = () => (
    <div>
        <Card title="Send Notification">
            <label htmlFor="recipient-type" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Recipient:</label>
            <select id="recipient-type" style={{ width: '100%', marginBottom: '8px' }} aria-label="Notification recipient type">
                <option>All Users</option>
                <option>All Businesses</option>
                <option>Specific User</option>
                <option>Specific Business</option>
            </select>
            <label htmlFor="message-subject" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Subject:</label>
            <input type="text" id="message-subject" placeholder="Notification Subject" style={{ width: '100%', marginBottom: '8px' }} aria-label="Notification subject" />
            <label htmlFor="message-body" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Message Body:</label>
            <textarea id="message-body" rows={5} placeholder="Your message here..." style={{ width: '100%', marginBottom: '10px' }} aria-label="Notification message body"></textarea>
            <button aria-label="Send notification">Send Notification</button>
        </Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Card title="Manage System Templates">
                <ul>
                    <li>Booking Confirmed Email</li>
                    <li>Payment Received SMS</li>
                    <li>Password Reset Email</li>
                </ul>
                <button className="btn-secondary">Edit Templates</button>
            </Card>
            <Card title="Delivery Logs">
                <p>View history of sent notifications: (Table Placeholder)</p>
                <p>Optional: Built-in email editor + preview (UI Placeholder)</p>
            </Card>
        </div>
    </div>
);
