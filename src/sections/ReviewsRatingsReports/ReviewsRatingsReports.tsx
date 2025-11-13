import React from 'react';
import { Card } from '../../components/common/Card';
import { generateId } from '../../utils/data';

export const ReviewsRatingsReports: React.FC = () => (
    <div>
        <Card title="Reviews & Ratings Moderation">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                <input type="text" placeholder="Search by review content, user, or business" style={{ flexGrow: 1 }} aria-label="Search reviews" />
                <select aria-label="Filter review status"><option>All Statuses</option><option>Active</option><option>Flagged</option><option>Hidden</option></select>
                <button aria-label="Apply review filters">Filter</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }} aria-label="Review and rating moderation table">
                <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Review ID</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>User</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Business</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Rating</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Content</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: '8px' }}>{generateId()}</td>
                        <td style={{ padding: '8px' }}>Client A</td>
                        <td style={{ padding: '8px' }}>Business X</td>
                        <td style={{ padding: '8px' }}>5/5</td>
                        <td style={{ padding: '8px' }}>"Great service!"</td>
                        <td style={{ padding: '8px' }}>Active</td>
                        <td style={{ padding: '8px' }}>
                            <button className="btn-danger" style={{ marginRight: '5px' }} aria-label="Flag review">Flag</button>
                            <button className="btn-secondary" style={{ marginRight: '5px' }} aria-label="Hide review">Hide</button>
                            <button className="btn-success" aria-label="Restore review">Restore</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
        <Card title="Report Reasons">
            <p>List of reported content with reasons (e.g., "offensive", "fake") (UI Placeholder)</p>
            <p>Optional: AI-powered review scanning (UI Placeholder)</p>
        </Card>
    </div>
);
