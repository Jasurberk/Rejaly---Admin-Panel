import React, { useState, useEffect } from 'react';
import { Client } from '../types';

interface ClientFormProps {
    client: Client;
    onSave: (client: Client) => void;
    onCancel: () => void;
    isNew: boolean;
}

export const ClientForm: React.FC<ClientFormProps> = ({ client, onSave, onCancel, isNew }) => {
    const [formData, setFormData] = useState<Client>(client);

    useEffect(() => {
        setFormData(client);
    }, [client]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.phone) {
            alert('First Name, Last Name, and Phone are required.');
            return;
        }
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'var(--background-color)' }}>
            <h5 style={{ marginTop: 0, marginBottom: '10px', color: 'var(--primary-color)' }}>{isNew ? 'Add New Client' : `Edit Client: ${client.firstName} ${client.lastName}`}</h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px 20px' }}>
                <div>
                    <label htmlFor="clientFirstName" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>First Name:</label>
                    <input type="text" id="clientFirstName" name="firstName" value={formData.firstName} onChange={handleChange} required style={{ width: '100%' }} aria-label="Client first name" />
                </div>
                <div>
                    <label htmlFor="clientLastName" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Last Name:</label>
                    <input type="text" id="clientLastName" name="lastName" value={formData.lastName} onChange={handleChange} required style={{ width: '100%' }} aria-label="Client last name" />
                </div>
                <div>
                    <label htmlFor="clientEmail" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Email (Optional):</label>
                    <input type="email" id="clientEmail" name="email" value={formData.email || ''} onChange={handleChange} style={{ width: '100%' }} aria-label="Client email" />
                </div>
                <div>
                    <label htmlFor="clientPhone" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Phone Number:</label>
                    <input type="tel" id="clientPhone" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%' }} aria-label="Client phone number" />
                </div>
                <div>
                    <label htmlFor="clientLastVisit" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Last Visit:</label>
                    <input type="date" id="clientLastVisit" name="lastVisitDate" value={formData.lastVisitDate || ''} onChange={handleChange} style={{ width: '100%' }} aria-label="Client last visit date" />
                </div>
                <div>
                    <label htmlFor="clientUpcomingVisit" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Upcoming Visit:</label>
                    <input type="date" id="clientUpcomingVisit" name="upcomingVisitDate" value={formData.upcomingVisitDate || ''} onChange={handleChange} style={{ width: '100%' }} aria-label="Client upcoming visit date" />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="btn-secondary" onClick={onCancel} aria-label="Cancel editing client">Cancel</button>
                <button type="submit" aria-label="Save client details">{isNew ? 'Add Client' : 'Update Client'}</button>
            </div>
        </form>
    );
};
