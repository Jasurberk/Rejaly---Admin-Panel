import React, { useState, useEffect } from 'react';
import { Business, ServiceOffer } from '../../../types';
import { generateId } from '../../../utils/data';
import { ServiceOfferForm } from '../../../forms/ServiceOfferForm';

interface BusinessServiceOffersManagerProps {
    business: Business;
    onClose: () => void;
    onSaveOffers: (updatedOffers: ServiceOffer[]) => void;
}

export const BusinessServiceOffersManager: React.FC<BusinessServiceOffersManagerProps> = ({ business, onClose, onSaveOffers }) => {
    const [currentOffers, setCurrentOffers] = useState<ServiceOffer[]>(business.serviceOffers || []);
    const [editingService, setEditingService] = useState<ServiceOffer | null>(null);
    const [isAddingNew, setIsAddingNew] = useState(false);

    useEffect(() => {
        setCurrentOffers(business.serviceOffers || []);
    }, [business]);

    const handleAddService = () => {
        setIsAddingNew(true);
        setEditingService({
            id: generateId(),
            title: '',
            description: '',
            price: 0,
            durationMinutes: 0,
        });
    };

    const handleEditService = (service: ServiceOffer) => {
        setEditingService({ ...service });
        setIsAddingNew(false);
    };

    const handleDeleteService = (id: string) => {
        if (window.confirm('Are you sure you want to delete this service offer?')) {
            setCurrentOffers(prev => prev.filter(s => s.id !== id));
        }
    };

    const handleSaveService = (service: ServiceOffer) => {
        if (isAddingNew) {
            setCurrentOffers(prev => [...prev, service]);
        } else {
            setCurrentOffers(prev => prev.map(s => (s.id === service.id ? service : s)));
        }
        setEditingService(null);
        setIsAddingNew(false);
    };

    const handleCancelEdit = () => {
        setEditingService(null);
        setIsAddingNew(false);
    };

    const handleFinalSave = () => {
        onSaveOffers(currentOffers);
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
            maxWidth: '1000px',
            margin: '0 auto',
            height: 'fit-content',
            overflowY: 'auto',
            boxSizing: 'border-box',
        }}>
            <h4 style={{ marginTop: 0, marginBottom: '20px', textAlign: 'center', color: 'var(--text-color)' }}>
                Manage Service Offers for {business.name}
            </h4>

            {!editingService ? (
                <>
                    <button onClick={handleAddService} style={{ marginBottom: '20px' }} aria-label="Add new service offer">
                        Add New Service Offer
                    </button>

                    {currentOffers.length > 0 ? (
                        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            {currentOffers.map(service => (
                                <div key={service.id} style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '4px',
                                    padding: '15px',
                                    marginBottom: '10px',
                                    background: 'var(--background-color)',
                                    gap: '10px',
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <strong>{service.title}</strong>
                                        <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                                            ${service.price.toFixed(2)}
                                            {service.discountPercentage !== undefined && <span style={{ color: 'var(--danger-color)', marginLeft: '10px' }}>(-{service.discountPercentage}%)</span>}
                                            {service.discountAmount !== undefined && <span style={{ color: 'var(--danger-color)', marginLeft: '10px' }}>(-${service.discountAmount.toFixed(2)})</span>}
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '0.9em', opacity: 0.8 }}>
                                        {service.description} ({service.durationMinutes} min)
                                    </div>
                                    {(service.discountStartDate && service.discountEndDate) && (
                                        <div style={{ fontSize: '0.8em', color: 'var(--primary-color)' }}>
                                            Discount valid: {service.discountStartDate} to {service.discountEndDate}
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                                        <button className="btn-secondary" onClick={() => handleEditService(service)} style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`Edit ${service.title}`}>Edit</button>
                                        <button className="btn-danger" onClick={() => handleDeleteService(service.id)} style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`Delete ${service.title}`}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ opacity: 0.8 }}>No service offers found for this business.</p>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px' }}>
                        <button className="btn-secondary" onClick={onClose} aria-label="Go Back from service offers">Go Back</button>
                        <button onClick={handleFinalSave} aria-label="Save all service offer changes">Save All Changes</button>
                    </div>
                </>
            ) : (
                <ServiceOfferForm
                    service={editingService}
                    onSave={handleSaveService}
                    onCancel={handleCancelEdit}
                    isNew={isAddingNew}
                />
            )}
        </div>
    );
};
