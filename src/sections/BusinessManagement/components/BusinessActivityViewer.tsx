import React, { useMemo } from 'react';
import { Business } from '../../../types';

interface BusinessActivityViewerProps {
    business: Business;
    onClose: () => void;
}

export const BusinessActivityViewer: React.FC<BusinessActivityViewerProps> = ({ business, onClose }) => {
    // Mock data for business activity
    const mockBookings = useMemo(() => [
        { id: 'bbkg-001', client: 'Alice Smith', service: 'Haircut', date: '2024-07-20', status: 'Completed' },
        { id: 'bbkg-002', client: 'Charlie Brown', service: 'Manicure', date: '2024-07-18', status: 'Cancelled' },
        { id: 'bbkg-003', client: 'Diana Prince', service: 'Facial', date: '2024-07-12', status: 'Completed' },
    ], []);

    const mockReviewsReceived = useMemo(() => [
        { id: 'brev-001', client: 'Alice Smith', rating: 5, comment: 'Excellent service and friendly staff!', date: '2024-07-21' },
        { id: 'brev-002', client: 'Eve Johnson', rating: 4, comment: 'Good experience, but a bit pricey.', date: '2024-07-10' },
    ], []);

    const mockIssuesReported = useMemo(() => [
        { id: 'biss-001', reporter: 'Client A', type: 'Service Quality', date: '2024-07-15', status: 'In Progress', summary: 'Complaint about a specific stylist' },
        { id: 'biss-002', reporter: 'System', type: 'Payment Processing Error', date: '2024-07-05', status: 'Resolved', summary: 'Transaction failed for booking BBKG-002' },
    ], []);

    const mockPayouts = useMemo(() => [
        { id: 'pay-001', date: '2024-07-25', amount: '$500.00', status: 'Paid' },
        { id: 'pay-002', date: '2024-06-25', amount: '$450.00', status: 'Paid' },
    ], []);

    return (
        <div style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '30px',
            marginBottom: '20px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            width: '100%',
            maxWidth: '700px',
            margin: '0 auto',
            height: 'fit-content',
            overflowY: 'auto',
            boxSizing: 'border-box',
        }}>
            <h4 style={{ marginTop: 0, marginBottom: '20px', textAlign: 'center', color: 'var(--text-color)' }}>Activity History for {business.name}</h4>
            <p style={{ textAlign: 'center', marginBottom: '20px', opacity: 0.8 }}>Detailed view of business operations and client interactions.</p>

            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Bookings</h4>
            {mockBookings.length > 0 ? (
                <div style={{ marginBottom: '20px' }}>
                    {mockBookings.map((booking, index) => (
                        <div key={booking.id} style={{
                            borderLeft: `3px solid ${booking.status === 'Completed' ? 'var(--success-color)' : booking.status === 'Cancelled' ? 'var(--danger-color)' : 'var(--primary-color)'}`,
                            paddingLeft: '15px',
                            marginBottom: '10px',
                            background: 'var(--background-color)',
                            borderRadius: '4px',
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <div>
                                <strong>{booking.service}</strong> by {booking.client} on {booking.date}
                                <div style={{ fontSize: '0.9em', opacity: 0.8 }}>Status: {booking.status}</div>
                            </div>
                            <div>
                                <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`View details for booking ${booking.id}`}>View Booking</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <p style={{ opacity: 0.8 }}>No bookings found for this business.</p>}

            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Reviews Received</h4>
            {mockReviewsReceived.length > 0 ? (
                <div style={{ marginBottom: '20px' }}>
                    {mockReviewsReceived.map((review, index) => (
                        <div key={review.id} style={{
                            borderLeft: `3px solid ${review.rating >= 4 ? 'var(--success-color)' : review.rating <= 2 ? 'var(--danger-color)' : 'var(--primary-color)'}`,
                            paddingLeft: '15px',
                            marginBottom: '10px',
                            background: 'var(--background-color)',
                            borderRadius: '4px',
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <div>
                                <strong>{review.rating}/5</strong> by {review.client} on {review.date}
                                <div style={{ fontSize: '0.9em', opacity: 0.8 }}>"{review.comment}"</div>
                            </div>
                            <div>
                                <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`View details for review ${review.id}`}>View Review</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <p style={{ opacity: 0.8 }}>No reviews received for this business.</p>}


            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Issues Reported</h4>
            {mockIssuesReported.length > 0 ? (
                <div style={{ marginBottom: '20px' }}>
                    {mockIssuesReported.map((issue, index) => (
                        <div key={issue.id} style={{
                            borderLeft: `3px solid ${issue.status === 'Resolved' ? 'var(--success-color)' : 'var(--danger-color)'}`,
                            paddingLeft: '15px',
                            marginBottom: '10px',
                            background: 'var(--background-color)',
                            borderRadius: '4px',
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <div>
                                <strong>{issue.type}</strong> ({issue.status}) by {issue.reporter} on {issue.date}
                                <div style={{ fontSize: '0.9em', opacity: 0.8 }}>{issue.summary}</div>
                            </div>
                            <div>
                                <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`View details for issue ${issue.id}`}>View Issue</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <p style={{ opacity: 0.8 }}>No issues reported for this business.</p>}

            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Recent Payouts</h4>
            {mockPayouts.length > 0 ? (
                <div style={{ marginBottom: '20px' }}>
                    {mockPayouts.map((payout, index) => (
                        <div key={payout.id} style={{
                            borderLeft: `3px solid ${payout.status === 'Paid' ? 'var(--success-color)' : 'var(--danger-color)'}`,
                            paddingLeft: '15px',
                            marginBottom: '10px',
                            background: 'var(--background-color)',
                            borderRadius: '4px',
                            padding: '10px',
                        }}>
                            <strong>{payout.amount}</strong> on {payout.date} ({payout.status})
                        </div>
                    ))}
                </div>
            ) : <p style={{ opacity: 0.8 }}>No recent payouts for this business.</p>}


            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button className="btn-secondary" onClick={onClose} aria-label="Go Back from activity history">Go Back</button>
            </div>
        </div>
    );
};
