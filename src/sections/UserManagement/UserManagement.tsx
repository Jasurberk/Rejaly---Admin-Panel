import React, { useState, useMemo } from 'react';
import { User } from '../../types';
import { Card } from '../../components/common/Card';
import { GENDER_OPTIONS } from '../../utils/data';

interface UserManagementProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    onEditUser: (user: User) => void;
    onViewActivity: (user: User) => void;
    onResetPassword: (user: User) => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ users, setUsers, onEditUser, onViewActivity, onResetPassword }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [filterCity, setFilterCity] = useState('All');
    const [filterGender, setFilterGender] = useState('All');
    const [sortByUser, setSortByUser] = useState<'name' | 'city' | 'gender' | 'dateJoined' | 'status'>('name');
    const [sortOrderUser, setSortOrderUser] = useState<'asc' | 'desc'>('asc');

    const uniqueCities = useMemo(() => ['All', ...new Set(users.map(u => u.city))].sort(), [users]);
    const uniqueGenders = useMemo(() => ['All', ...GENDER_OPTIONS].sort(), []);

    const handleDeactivate = (id: string) => {
        setUsers(prevUsers => prevUsers.map(user => user.id === id ? { ...user, status: 'Inactive' } : user));
    };

    const handleEditUserClick = (user: User) => {
        onEditUser(user);
    };

    const handleOpenResetPasswordClick = (user: User) => {
        onResetPassword(user);
    };

    const handleOpenUserActivityClick = (user: User) => {
        onViewActivity(user);
    };

    const getFilteredAndSortedUsers = useMemo(() => {
        let filtered = users;

        if (searchTerm) {
            filtered = filtered.filter(user =>
                `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.phone.includes(searchTerm) ||
                user.city.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterCity !== 'All') {
            filtered = filtered.filter(user => user.city === filterCity);
        }
        if (filterGender !== 'All') {
            filtered = filtered.filter(user => user.gender === filterGender);
        }

        filtered.sort((a, b) => {
            let compareA: string | number;
            let compareB: string | number;

            if (sortByUser === 'name') {
                compareA = `${a.firstName} ${a.lastName}`.toLowerCase();
                compareB = `${b.firstName} ${b.lastName}`.toLowerCase();
            } else if (sortByUser === 'city') {
                compareA = a.city.toLowerCase();
                compareB = b.city.toLowerCase();
            } else if (sortByUser === 'gender') {
                compareA = a.gender.toLowerCase();
                compareB = b.gender.toLowerCase();
            } else if (sortByUser === 'dateJoined') {
                compareA = a.dateJoined;
                compareB = b.dateJoined;
            } else if (sortByUser === 'status') {
                compareA = a.status.toLowerCase();
                compareB = b.status.toLowerCase();
            } else {
                return 0;
            }

            if (compareA < compareB) return sortOrderUser === 'asc' ? -1 : 1;
            if (compareA > compareB) return sortOrderUser === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [users, searchTerm, filterCity, filterGender, sortByUser, sortOrderUser]);


    return (
        <div>
            <Card title="User Search">
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Search by name, email, phone, or city"
                        style={{ flexGrow: 1 }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Search users"
                    />
                    <button aria-label="Perform search">Search</button>
                </div>
            </Card>

            <Card title="Filters & Sort">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        <select value={filterCity} onChange={(e) => setFilterCity(e.target.value)} style={{ minWidth: '120px' }} aria-label="Filter by city">
                            <option value="All">All Cities</option>
                            {uniqueCities.filter(city => city !== 'All').map(city => (<option key={city} value={city}>{city}</option>))}
                        </select>
                        <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)} style={{ minWidth: '120px' }} aria-label="Filter by gender">
                            <option value="All">All Genders</option>
                            {uniqueGenders.filter(gender => gender !== 'All').map(gender => (<option key={gender} value={gender}>{gender}</option>))}
                        </select>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <label htmlFor="user-sort-by-select" style={{ whiteSpace: 'nowrap' }}>Sort by:</label>
                        <select
                            id="user-sort-by-select"
                            value={`${sortByUser}-${sortOrderUser}`}
                            onChange={(e) => {
                                const [by, order] = e.target.value.split('-');
                                setSortByUser(by as 'name' | 'city' | 'gender' | 'dateJoined' | 'status');
                                setSortOrderUser(order as 'asc' | 'desc');
                            }}
                            style={{ minWidth: '150px' }}
                            aria-label="Sort users by"
                        >
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                            <option value="city-asc">City (A-Z)</option>
                            <option value="city-desc">City (Z-A)</option>
                            <option value="gender-asc">Gender (A-Z)</option>
                            <option value="gender-desc">Gender (Z-A)</option>
                            <option value="dateJoined-asc">Date Joined (Oldest first)</option>
                            <option value="dateJoined-desc">Date Joined (Newest first)</option>
                            <option value="status-asc">Status (A-Z)</option>
                            <option value="status-desc">Status (Z-A)</option>
                        </select>
                    </div>
                </div>
            </Card>

            <Card title="All Users">
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }} aria-label="User list">
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Email</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Phone</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>City</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Gender</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Date Joined</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getFilteredAndSortedUsers.map(user => (
                            <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '8px' }}>{user.firstName} {user.lastName} {user.flagged && <span style={{ color: 'var(--danger-color)', fontSize: '0.8em' }}>(Flagged)</span>}</td>
                                <td style={{ padding: '8px' }}>{user.email}</td>
                                <td style={{ padding: '8px' }}>{user.phone}</td>
                                <td style={{ padding: '8px' }}>{user.city}</td>
                                <td style={{ padding: '8px' }}>{user.gender}</td>
                                <td style={{ padding: '8px' }}>{user.dateJoined}</td>
                                <td style={{ padding: '8px' }}>{user.status}</td>
                                <td style={{ padding: '8px' }}>
                                    <button onClick={() => handleEditUserClick(user)} style={{ marginRight: '5px' }} aria-label={`Edit profile for ${user.firstName} ${user.lastName}`}>Edit Profile</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <Card title="Account Actions">
                    <p>Reset Passwords / Manually Verify Emails: (Form Placeholder)</p>
                    <p>Flagged or Reported Users: (List Placeholder)</p>
                </Card>
                <Card title="Advanced Features">
                    <p>Merge Duplicate Accounts: (Tool Placeholder)</p>
                    <button className="btn-secondary">Impersonate User</button>
                </Card>
            </div>
        </div>
    );
};
