import React, { useState, useMemo } from 'react';
import { Booking, Business, User } from '../../types';
import { Card } from '../../components/common/Card';
import { generateBookingId, getRandomDate } from '../../utils/data';

interface BookingManagementProps {
    allBusinesses: Business[];
    allUsers: User[];
    onViewUserProfile: (user: User, origin: 'userManagement' | 'bookingManagement') => void;
    onViewBusinessProfile: (business: Business, origin: 'businessManagement' | 'bookingManagement') => void;
    onEditBookingFromMgmt: (booking: Booking) => void;
    onCloseBookingEditor: () => void;
}

export const BookingManagement: React.FC<BookingManagementProps> = ({ allBusinesses, allUsers, onViewUserProfile, onViewBusinessProfile, onEditBookingFromMgmt, onCloseBookingEditor }) => {
    const initialBookings = useMemo(() => {
        if (allBusinesses.length === 0 || allUsers.length === 0) return [];
        return Array.from({ length: 6 }, () => {
            const randomBusiness = allBusinesses[Math.floor(Math.random() * allBusinesses.length)];
            const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
            const clientName = `${randomUser.firstName} ${randomUser.lastName}`;
            const serviceOptions = randomBusiness.serviceOffers?.map(s => s.title) || ['General Service'];
            const randomService = serviceOptions[Math.floor(Math.random() * serviceOptions.length)];

            return {
                id: generateBookingId(randomBusiness.id),
                businessId: randomBusiness.id,
                clientId: randomUser.id,
                client: clientName,
                business: randomBusiness.name,
                city: randomBusiness.city,
                service: randomService,
                date: getRandomDate(new Date(2024, 6, 1), new Date(2024, 8, 30)),
                time: `${Math.floor(Math.random() * 10) + 9}:00 AM`,
                status: ['Confirmed', 'Pending', 'Completed', 'Cancelled', 'No-show'][Math.floor(Math.random() * 5)] as Booking['status'],
            };
        });
    }, [allBusinesses, allUsers]);

    const [bookings, setBookings] = useState<Booking[]>(initialBookings);

    const handleEditBooking = (booking: Booking) => {
        onEditBookingFromMgmt(booking);
    };

    const handleSaveBooking = (updatedBooking: Booking) => {
        setBookings(prev => prev.map(b => (b.id === updatedBooking.id ? updatedBooking : b)));
        onCloseBookingEditor();
        alert(`Booking ${updatedBooking.id} updated successfully!`);
    };

    const handleCancelBookingAction = (bookingId: string) => {
        if (window.confirm(`Are you sure you want to cancel booking ${bookingId}?`)) {
            setBookings(prev => prev.map(b => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b)));
            alert(`Booking ${bookingId} has been cancelled.`);
            onCloseBookingEditor();
        }
    };

    const handleRefundBookingAction = (bookingId: string) => {
        if (window.confirm(`Are you sure you want to issue a refund for booking ${bookingId}?`)) {
            alert(`Refund initiated for booking ${bookingId}! (Placeholder)`);
            onCloseBookingEditor();
        }
    };

    return (
        <div>
            <Card title="Booking Explorer & Filters">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <input type="text" placeholder="Search by client or business" style={{ flexGrow: 1 }} aria-label="Search bookings by client or business" />
                    <input type="date" aria-label="Filter bookings by date" />
                    <select aria-label="Filter bookings by status">
                        <option>All Statuses</option>
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                    </select>
                    <button aria-label="Apply booking filters">Filter</button>
                </div>
            </Card>

            <Card title="All Bookings">
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }} aria-label="Booking list">
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ padding: '8px', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Client</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Business</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>City</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Service</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Date/Time</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '8px' }}>{booking.id}</td>
                                <td style={{ padding: '8px' }}>{booking.client}</td>
                                <td style={{ padding: '8px' }}>{booking.business}</td>
                                <td style={{ padding: '8px' }}>{booking.city}</td>
                                <td style={{ padding: '8px' }}>{booking.service}</td>
                                <td style={{ padding: '8px' }}>{booking.date} {booking.time}</td>
                                <td style={{ padding: '8px' }}>{booking.status}</td>
                                <td style={{ padding: '8px' }}>
                                    <button onClick={() => handleEditBooking(booking)} style={{ marginRight: '5px' }} aria-label={`Edit booking ${booking.id}`}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <Card title="Create / Modify Booking">
                    <p>Manual booking form placeholder</p>
                </Card>
                <Card title="Conflict Resolution Dashboard">
                    <p>Show overlapping or failed bookings: (UI Placeholder)</p>
                </Card>
            </div>
        </div>
    );
};
