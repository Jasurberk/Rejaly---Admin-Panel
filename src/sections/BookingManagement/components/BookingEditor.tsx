import React, { useState, useMemo } from 'react';
import { Booking, User, Business } from '../../../types';

interface BookingEditorProps {
    booking: Booking;
    onClose: () => void;
    onSave: (updatedBooking: Booking) => void;
    onCancelBooking: (bookingId: string) => void;
    onRefundBooking: (bookingId: string) => void;
    onViewUserProfile: (user: User, origin: 'userManagement' | 'bookingManagement') => void;
    onViewBusinessProfile: (business: Business, origin: 'businessManagement' | 'bookingManagement') => void;
    allUsers: User[];
    allBusinesses: Business[];
}

export const BookingEditor: React.FC<BookingEditorProps> = ({ booking, onClose, onSave, onCancelBooking, onRefundBooking, onViewUserProfile, onViewBusinessProfile, allUsers, allBusinesses }) => {
    const [formData, setFormData] = useState<Booking>(booking);

    const clientUser = useMemo(() => allUsers.find(u => u.id === booking.clientId), [allUsers, booking.clientId]);
    const businessDetail = useMemo(() => allBusinesses.find(b => b.id === booking.businessId), [allBusinesses, booking.businessId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!formData.service.trim() || !formData.date || !formData.time) {
            alert('Service, Date, and Time are required.');
            return;
        }
        onSave(formData);
    };

    const isCancelEnabled = formData.status !== 'Cancelled' && formData.status !== 'Completed';
    const isRefundEnabled = formData.status === 'Completed';

    return (
        <div style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '30px',
            marginBottom: '20px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
            height: 'fit-content',
            overflowY: 'auto',
            boxSizing: 'border-box',
        }}>
            <h4 style={{ marginTop: 0, marginBottom: '20px', textAlign: 'center', color: 'var(--text-color)' }}>
                Edit Booking: {booking.id}
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Booking ID:</label>
                    <input type="text" value={formData.id} readOnly style={{ width: '100%' }} aria-label="Booking ID" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Client:</label>
                    {clientUser ? (
                        <button
                            onClick={() => onViewUserProfile(clientUser, 'bookingManagement')}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: '0',
                                color: 'var(--primary-color)',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                textAlign: 'left',
                                fontSize: '1em',
                            }}
                            aria-label={`View profile for client ${clientUser.firstName} ${clientUser.lastName}`}
                        >
                            {formData.client}
                        </button>
                    ) : (
                        <span style={{ color: 'var(--text-color)' }}>{formData.client} (ID: {formData.clientId})</span>
                    )}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Business:</label>
                    {businessDetail ? (
                        <button
                            onClick={() => onViewBusinessProfile(businessDetail, 'bookingManagement')}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: '0',
                                color: 'var(--primary-color)',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                textAlign: 'left',
                                fontSize: '1em',
                            }}
                            aria-label={`View profile for business ${businessDetail.name}`}
                        >
                            {formData.business}
                        </button>
                    ) : (
                        <span style={{ color: 'var(--text-color)' }}>{formData.business} (ID: {formData.businessId})</span>
                    )}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>City:</label>
                    <input type="text" value={formData.city} readOnly style={{ width: '100%' }} aria-label="City" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="editService" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Service:</label>
                    <input type="text" id="editService" name="service" value={formData.service} onChange={handleChange} style={{ width: '100%' }} aria-label="Service" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="editDate" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Date:</label>
                    <input type="date" id="editDate" name="date" value={formData.date} onChange={handleChange} style={{ width: '100%' }} aria-label="Date" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="editTime" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Time:</label>
                    <input type="time" id="editTime" name="time" value={formData.time} onChange={handleChange} style={{ width: '100%' }} aria-label="Time" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="editStatus" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Status:</label>
                    <select id="editStatus" name="status" value={formData.status} onChange={handleChange} style={{ width: '100%' }} aria-label="Status">
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="No-show">No-show</option>
                    </select>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px', gap: '10px', flexWrap: 'wrap' }}>
                <button className="btn-danger" onClick={() => onCancelBooking(booking.id)} disabled={!isCancelEnabled} style={{ flex: 1, minWidth: '150px' }} aria-label={`Cancel booking ${booking.id}`}>Cancel Booking</button>
                <button className="btn-secondary" onClick={() => onRefundBooking(booking.id)} disabled={!isRefundEnabled} style={{ flex: 1, minWidth: '150px' }} aria-label={`Issue refund for booking ${booking.id}`}>Issue Refund</button>
                <button className="btn-secondary" onClick={onClose} style={{ flex: 1, minWidth: '150px' }} aria-label="Go back to booking list">Go Back</button>
                <button onClick={handleSave} style={{ flex: 1, minWidth: '150px' }} aria-label="Save changes to booking">Save Changes</button>
            </div>
        </div>
    );
};
