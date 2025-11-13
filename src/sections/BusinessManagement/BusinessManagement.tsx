import React, { useState, useMemo } from 'react';
import { Business } from '../../types';
import { Card } from '../../components/common/Card';
import { businessActivities } from '../../utils/data';

interface BusinessManagementProps {
    businesses: Business[];
    setBusinesses: React.Dispatch<React.SetStateAction<Business[]>>;
    onEditBusiness: (business: Business, origin: 'businessManagement' | 'bookingManagement') => void;
    onManageStaff: (business: Business) => void;
    onViewActivity: (business: Business, origin: 'businessManagement' | 'bookingManagement') => void;
    onResetPassword: (business: Business, origin: 'businessManagement' | 'bookingManagement') => void;
    onManageServiceOffers: (business: Business) => void;
    onManageClients: (business: Business) => void;
    onManagePortfolio: (business: Business) => void;
    onViewReviews: (business: Business) => void;
}

export const BusinessManagement: React.FC<BusinessManagementProps> = ({ businesses, setBusinesses, onEditBusiness, onManageStaff, onViewActivity, onResetPassword, onManageServiceOffers, onManageClients, onManagePortfolio, onViewReviews }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterActivity, setFilterActivity] = useState('All');
    const [filterCity, setFilterCity] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortBy, setSortBy] = useState<'name' | 'activity' | 'dateAdded'>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');


    const uniqueActivities = useMemo(() => ['All', ...new Set(businesses.map(b => b.activity))].sort(), [businesses]);
    const uniqueCities = useMemo(() => ['All', ...new Set(businesses.map(b => b.city))].sort(), [businesses]);

    const handleEditBusinessClick = (business: Business) => {
        onEditBusiness(business, 'businessManagement');
    };

    const handleOpenManageStaffClick = (business: Business) => {
        onManageStaff(business);
    };

    const handleOpenBusinessActivityClick = (business: Business) => {
        onViewActivity(business, 'businessManagement');
    };

    const handleOpenResetBusinessPasswordClick = (business: Business) => {
        onResetPassword(business, 'businessManagement');
    };

    const handleOpenManageServiceOffersClick = (business: Business) => {
        onManageServiceOffers(business);
    };

    const handleOpenManageClientsClick = (business: Business) => {
        onManageClients(business);
    };

    const handleOpenManagePortfolioClick = (business: Business) => {
        onManagePortfolio(business);
    };

    const handleOpenViewReviewsClick = (business: Business) => {
        onViewReviews(business);
    };

    const getFilteredAndSortedBusinesses = useMemo(() => {
        let filtered = businesses;

        if (searchTerm) {
            filtered = filtered.filter(biz =>
                biz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                biz.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                biz.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                biz.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                biz.phone.includes(searchTerm)
            );
        }

        if (filterActivity !== 'All') {
            filtered = filtered.filter(biz => biz.activity === filterActivity);
        }
        if (filterCity !== 'All') {
            filtered = filtered.filter(biz => biz.city === filterCity);
        }
        if (filterStatus !== 'All') {
            filtered = filtered.filter(biz => biz.status === filterStatus);
        }

        filtered.sort((a, b) => {
            let compareA: string | number;
            let compareB: string | number;

            if (sortBy === 'name') {
                compareA = a.name.toLowerCase();
                compareB = b.name.toLowerCase();
            } else if (sortBy === 'activity') {
                compareA = a.activity.toLowerCase();
                compareB = b.activity.toLowerCase();
            } else if (sortBy === 'dateAdded') {
                compareA = a.dateAdded;
                compareB = b.dateAdded;
            } else {
                return 0;
            }

            if (compareA < compareB) return sortOrder === 'asc' ? -1 : 1;
            if (compareA > compareB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [businesses, searchTerm, filterActivity, filterCity, filterStatus, sortBy, sortOrder]);


    return (
        <div>
            <Card title="Business Search">
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Search by name, address, city, email, or phone"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ flexGrow: 1 }}
                        aria-label="Search businesses"
                    />
                    <button aria-label="Perform business search">Search</button>
                </div>
            </Card>
            <Card title="Business Filters & Sort">
                <div style={{ marginBottom: '15px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <select value={filterActivity} onChange={(e) => setFilterActivity(e.target.value)} style={{ minWidth: '120px' }} aria-label="Filter by activity">
                        {uniqueActivities.map(activity => (
                            <option key={activity} value={activity}>{activity}</option>
                        ))}
                    </select>

                    <select value={filterCity} onChange={(e) => setFilterCity(e.target.value)} style={{ minWidth: '120px' }} aria-label="Filter by city">
                        {uniqueCities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>

                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ minWidth: '120px' }} aria-label="Filter by status">
                        <option value="All">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                    </select>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: 'auto' }}>
                        <label htmlFor="sort-by-select" style={{ whiteSpace: 'nowrap' }}>Sort by:</label>
                        <select
                            id="sort-by-select"
                            value={`${sortBy}-${sortOrder}`}
                            onChange={(e) => {
                                const [by, order] = e.target.value.split('-');
                                setSortBy(by as 'name' | 'activity' | 'dateAdded');
                                setSortOrder(order as 'asc' | 'desc');
                            }}
                            style={{ minWidth: '120px' }}
                            aria-label="Sort businesses by"
                        >
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                            <option value="activity-asc">Activity (A-Z)</option>
                            <option value="activity-desc">Activity (Z-A)</option>
                            <option value="dateAdded-asc">Date Added (Oldest first)</option>
                            <option value="dateAdded-desc">Date Added (Newest first)</option>
                        </select>
                    </div>
                </div>
            </Card>

            <Card title="All Businesses">
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }} aria-label="Business list">
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Business ID</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Activity</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>City</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Date Added</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Reviews</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getFilteredAndSortedBusinesses.map(business => (
                            <tr key={business.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '8px' }}>{business.id}</td>
                                <td style={{ padding: '8px' }}>{business.name}</td>
                                <td style={{ padding: '8px' }}>{business.activity}</td>
                                <td style={{ padding: '8px' }}>{business.city}</td>
                                <td style={{ padding: '8px' }}>{business.dateAdded}</td>
                                <td style={{ padding: '8px' }}>{business.status}</td>
                                <td style={{ padding: '8px' }}>{business.reviews}</td>
                                <td style={{ padding: '8px' }}>
                                    <button onClick={() => handleEditBusinessClick(business)} aria-label={`Edit profile for ${business.name}`}>Edit Profile</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <Card title="Business Analytics">
                    <p>Revenue: $XXXX.XX</p>
                    <p>Booking Volume: XXX</p>
                    <p>Average Rating: X.X</p>
                    <p>Payout Details: (Placeholder)</p>
                </Card>
                <Card title="Optional Features">
                    <p>Manage "Featured" Businesses: (UI Placeholder)</p>
                </Card>
            </div>
        </div>
    );
};
