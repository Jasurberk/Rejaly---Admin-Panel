import React, { useState, useEffect } from 'react';
import { ServiceOffer } from '../types';

interface ServiceOfferFormProps {
    service: ServiceOffer;
    onSave: (service: ServiceOffer) => void;
    onCancel: () => void;
    isNew: boolean;
}

export const ServiceOfferForm: React.FC<ServiceOfferFormProps> = ({ service, onSave, onCancel, isNew }) => {
    const [formData, setFormData] = useState<ServiceOffer>(service);

    useEffect(() => {
        setFormData(service);
    }, [service]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value,
        }));
    };

    const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => {
            if (name === 'discountPercentage') {
                return {
                    ...prev,
                    discountPercentage: type === 'number' && value ? parseFloat(value) : undefined,
                    discountAmount: undefined, // Clear other discount type
                };
            } else if (name === 'discountAmount') {
                return {
                    ...prev,
                    discountAmount: type === 'number' && value ? parseFloat(value) : undefined,
                    discountPercentage: undefined, // Clear other discount type
                };
            }
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.price <= 0 || isNaN(formData.price)) {
            alert('Price must be a positive number.');
            return;
        }
        if (formData.durationMinutes <= 0 || isNaN(formData.durationMinutes)) {
            alert('Duration must be a positive number.');
            return;
        }
        if (formData.discountPercentage && (formData.discountPercentage < 0 || formData.discountPercentage > 100)) {
            alert('Discount Percentage must be between 0 and 100.');
            return;
        }
        if (formData.discountAmount && formData.discountAmount < 0) {
            alert('Discount Amount cannot be negative.');
            return;
        }
        if ((formData.discountStartDate && !formData.discountEndDate) || (!formData.discountStartDate && formData.discountEndDate)) {
            alert('Both discount start and end dates must be provided if one is entered.');
            return;
        }
        if (formData.discountStartDate && formData.discountEndDate && formData.discountStartDate > formData.discountEndDate) {
            alert('Discount End Date cannot be before Start Date.');
            return;
        }

        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h5 style={{ marginTop: 0, marginBottom: '10px', color: 'var(--primary-color)' }}>{isNew ? 'Add New Service Offer' : `Edit Service: ${service.title}`}</h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px 20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="serviceTitle" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Title:</label>
                    <input type="text" id="serviceTitle" name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%' }} aria-label="Service title" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="servicePrice" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Price ($):</label>
                    <input type="number" id="servicePrice" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" required style={{ width: '100%' }} aria-label="Service price" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="serviceDuration" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Duration (minutes):</label>
                    <input type="number" id="serviceDuration" name="durationMinutes" value={formData.durationMinutes} onChange={handleChange} min="1" required style={{ width: '100%' }} aria-label="Service duration in minutes" />
                </div>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="serviceDescription" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Description:</label>
                <textarea id="serviceDescription" name="description" value={formData.description} onChange={handleChange} rows={3} style={{ width: '100%' }} aria-label="Service description"></textarea>
            </div>

            <h5 style={{ marginTop: '10px', marginBottom: '5px', color: 'var(--primary-color)' }}>Discount Options (Optional)</h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px 20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="discountPercentage" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Discount Percentage (%):</label>
                    <input
                        type="number"
                        id="discountPercentage"
                        name="discountPercentage"
                        value={formData.discountPercentage !== undefined ? formData.discountPercentage : ''}
                        onChange={handleDiscountChange}
                        min="0"
                        max="100"
                        disabled={formData.discountAmount !== undefined} // Disable if amount is set
                        style={{ width: '100%' }}
                        aria-label="Discount percentage"
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="discountAmount" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Discount Amount ($):</label>
                    <input
                        type="number"
                        id="discountAmount"
                        name="discountAmount"
                        value={formData.discountAmount !== undefined ? formData.discountAmount : ''}
                        onChange={handleDiscountChange}
                        min="0"
                        step="0.01"
                        disabled={formData.discountPercentage !== undefined} // Disable if percentage is set
                        style={{ width: '100%' }}
                        aria-label="Discount amount"
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="discountStartDate" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Discount Start Date:</label>
                    <input type="date" id="discountStartDate" name="discountStartDate" value={formData.discountStartDate || ''} onChange={handleChange} style={{ width: '100%' }} aria-label="Discount start date" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="discountEndDate" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Discount End Date:</label>
                    <input type="date" id="discountEndDate" name="discountEndDate" value={formData.discountEndDate || ''} onChange={handleChange} style={{ width: '100%' }} aria-label="Discount end date" />
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="btn-secondary" onClick={onCancel} aria-label="Cancel editing service">Cancel</button>
                <button type="submit" aria-label="Save service offer">{isNew ? 'Add Service' : 'Update Service'}</button>
            </div>
        </form>
    );
};
