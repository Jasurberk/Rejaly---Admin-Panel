import React, { useState, useEffect } from 'react';
import { Business, Client } from '../../../types';
import { generateId } from '../../../utils/data';
import { ClientForm } from '../../../forms/ClientForm';

interface BusinessClientManagerProps {
    business: Business;
    onClose: () => void;
    onSaveClients: (updatedClients: Client[]) => void;
}

export const BusinessClientManager: React.FC<BusinessClientManagerProps> = ({ business, onClose, onSaveClients }) => {
    const [currentClients, setCurrentClients] = useState<Client[]>(business.clients || []);
    const [editingClient, setEditingClient] = useState<Client | null>(null);
    const [isAddingNew, setIsAddingNew] = useState(false);

    useEffect(() => {
        setCurrentClients(business.clients || []);
    }, [business]);

    const handleAddClient = () => {
        setIsAddingNew(true);
        setEditingClient({
            id: generateId(),
            firstName: '',
            lastName: '',
            phone: '',
        });
    };

    const handleEditClient = (client: Client) => {
        setEditingClient({ ...client });
        setIsAddingNew(false);
    };

    const handleDeleteClient = (id: string) => {
        if (window.confirm('Are you sure you want to delete this client?')) {
            setCurrentClients(prev => prev.filter(c => c.id !== id));
        }
    };

    const handleSaveClient = (client: Client) => {
        if (isAddingNew) {
            setCurrentClients(prev => [...prev, client]);
        } else {
            setCurrentClients(prev => prev.map(c => (c.id === client.id ? client : c)));
        }
        setEditingClient(null);
        setIsAddingNew(false);
    };

    const handleCancelEdit = () => {
        setEditingClient(null);
        setIsAddingNew(false);
    };

    const handleFinalSave = () => {
        onSaveClients(currentClients);
        onClose();
    };

    return (
        <div style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '30px',
            marginBottom: '20px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            height: 'fit-content',
            overflowY: 'auto',
            boxSizing: 'border-box',
        }}>
            <h4 style={{ marginTop: 0, marginBottom: '20px', textAlign: 'center', color: 'var(--text-color)' }}>
                Manage Clients for {business.name}
            </h4>

            {!editingClient ? (
                <>
                    <button onClick={handleAddClient} style={{ marginBottom: '20px' }} aria-label="Add new client">
                        Add New Client
                    </button>

                    {currentClients.length > 0 ? (
                        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }} aria-label="Business client list">
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Email</th>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Phone</th>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Last Visit</th>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Upcoming Visit</th>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentClients.map(client => (
                                        <tr key={client.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '8px' }}>{client.firstName} {client.lastName}</td>
                                            <td style={{ padding: '8px' }}>{client.email || 'N/A'}</td>
                                            <td style={{ padding: '8px' }}>{client.phone}</td>
                                            <td style={{ padding: '8px' }}>{client.lastVisitDate || 'N/A'}</td>
                                            <td style={{ padding: '8px' }}>{client.upcomingVisitDate || 'N/A'}</td>
                                            <td style={{ padding: '8px' }}>
                                                <button className="btn-secondary" onClick={() => handleEditClient(client)} style={{ marginRight: '5px', padding: '5px 10px', fontSize: '0.8em' }} aria-label={`Edit ${client.firstName}`}>Edit</button>
                                                <button className="btn-danger" onClick={() => handleDeleteClient(client.id)} style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`Delete ${client.firstName}`}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p style={{ opacity: 0.8 }}>No clients found for this business.</p>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px' }}>
                        <button className="btn-secondary" onClick={onClose} aria-label="Go Back from client management">Go Back</button>
                        <button onClick={handleFinalSave} aria-label="Save all client changes">Save All Changes</button>
                    </div>
                </>
            ) : (
                <ClientForm
                    client={editingClient}
                    onSave={handleSaveClient}
                    onCancel={handleCancelEdit}
                    isNew={isAddingNew}
                />
            )}
        </div>
    );
};
