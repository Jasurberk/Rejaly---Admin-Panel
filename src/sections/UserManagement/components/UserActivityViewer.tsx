import React, { useMemo } from 'react';
import { User } from '../../../types';

interface UserActivityViewerProps {
    user: User;
    onClose: () => void;
}

export const UserActivityViewer: React.FC<UserActivityViewerProps> = ({ user, onClose }) => {
    // Mock data for user activity
    const mockBookings = useMemo(() => [
        { id: 'bkg-001', business: 'Stylin\' Barbershop', service: 'Haircut', date: '2024-07-20', status: 'Visited' },
        { id: 'bkg-002', business: 'Nail Nirvana Salon', service: 'Manicure', date: '2024-07-15', status: 'Cancelled' },
        { id: 'bkg-003', business: 'Goal Getters Arena', service: 'Field Rental', date: '2024-06-28', status: 'Visited' },
        { id: 'bkg-004', business: 'Zen Retreat', service: 'Massage', date: '2024-06-10', status: 'No-show' },
    ], []);

    const mockIssues = useMemo(() => [
        { id: 'iss-001', type: 'Booking Conflict', date: '2024-07-16', status: 'Resolved', summary: 'Rescheduled Nail Nirvana appointment' },
        { id: 'iss-002', type: 'Service Complaint', date: '2024-06-11', status: 'Open', summary: 'Complaint about massage quality at Zen Retreat' },
    ], []);

    const mockTickets = useMemo(() => [
        { id: 'tkt-001', subject: 'Account Login Issue', date: '2024-07-01', status: 'Closed' },
        { id: 'tkt-002', subject: 'Feature Request: Dark Mode', date: '2024-05-20', status: 'Closed' },
    ], []);

    const mockReviews = useMemo(() => [
        { id: 'rev-001', business: 'Stylin\' Barbershop', rating: 5, comment: 'Best haircut ever! Always friendly and professional.', date: '2024-07-20' },
        { id: 'rev-002', business: 'Goal Getters Arena', rating: 4, comment: 'Great fields, but changing rooms could be cleaner.', date: '2024-06-29' },
        { id: 'rev-003', business: 'Nail Nirvana Salon', rating: 2, comment: 'Had to cancel last minute, process was a bit slow.', date: '2024-07-15' },
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
            <h4 style={{ marginTop: 0, marginBottom: '20px', textAlign: 'center', color: 'var(--text-color)' }}>Activity History for {user.firstName} {user.lastName}</h4>
            <p style={{ textAlign: 'center', marginBottom: '20px', opacity: 0.8 }}>Detailed view of user interactions and events.</p>

            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Bookings</h4>
            {mockBookings.length > 0 ? (
                <div style={{ marginBottom: '20px' }}>
                    {mockBookings.map((booking, index) => (
                        <div key={booking.id} style={{
                            borderLeft: `3px solid ${booking.status === 'Visited' ? 'var(--success-color)' : booking.status === 'Cancelled' ? 'var(--danger-color)' : 'var(--primary-color)'}`,
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
                                <strong>{booking.service} at {booking.business}</strong> on {booking.date}
                                <div style={{ fontSize: '0.9em', opacity: 0.8 }}>Status: {booking.status}</div>
                            </div>
                            <div>
                                <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`View details for booking ${booking.id}`}>View Booking</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <p style={{ opacity: 0.8 }}>No bookings found.</p>}

            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Reviews</h4>
            {mockReviews.length > 0 ? (
                <div style={{ marginBottom: '20px' }}>
                    {mockReviews.map((review, index) => (
                        <div key={review.id} style={{
                            borderLeft: `33px solid ${review.rating >= 4 ? 'var(--success-color)' : review.rating <= 2 ? 'var(--danger-color)' : 'var(--primary-color)'}`,
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
                                <strong>{review.rating}/5</strong> for {review.business} on {review.date}
                                <div style={{ fontSize: '0.9em', opacity: 0.8 }}>"{review.comment}"</div>
                            </div>
                            <div>
                                <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`View details for review ${review.id}`}>View Review</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <p style={{ opacity: 0.8 }}>No reviews found.</p>}


            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Issues</h4>
            {mockIssues.length > 0 ? (
                <div style={{ marginBottom: '20px' }}>
                    {mockIssues.map((issue, index) => (
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
                                <strong>{issue.type}</strong> ({issue.status}) on {issue.date}
                                <div style={{ fontSize: '0.9em', opacity: 0.8 }}>{issue.summary}</div>
                            </div>
                            <div>
                                <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`View details for issue ${issue.id}`}>View Issue</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <p style={{ opacity: 0.8 }}>No issues reported.</p>}

            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Support Tickets</h4>
            {mockTickets.length > 0 ? (
                <div style={{ marginBottom: '20px' }}>
                    {mockTickets.map((ticket, index) => (
                        <div key={ticket.id} style={{
                            borderLeft: `3px solid ${ticket.status === 'Closed' ? 'var(--success-color)' : 'var(--primary-color)'}`,
                            paddingLeft: '15px',
                            marginBottom: '10px',
                            background: 'var(--background-color)',
                            borderRadius: '4px',
                            padding: '10px',
                        }}>
                            <strong>{ticket.subject}</strong> ({ticket.status}) on {ticket.date}
                        </div>
                    ))}
                </div>
            ) : <p style={{ opacity: 0.8 }}>No support tickets opened.</p>}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button className="btn-secondary" onClick={onClose} aria-label="Go Back from activity history">Go Back</button>
            </div>
        </div>
    );
};
