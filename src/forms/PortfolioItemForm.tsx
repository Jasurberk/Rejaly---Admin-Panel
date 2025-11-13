import React, { useState, useEffect } from 'react';
import { PortfolioItem } from '../types';

interface PortfolioItemFormProps {
    item: PortfolioItem;
    onSave: (item: PortfolioItem) => void;
    onCancel: () => void;
    isNew: boolean;
    onUploadImage: () => void; // Callback to trigger image upload modal
}

export const PortfolioItemForm: React.FC<PortfolioItemFormProps> = ({ item, onSave, onCancel, isNew, onUploadImage }) => {
    const [formData, setFormData] = useState<PortfolioItem>(item);

    useEffect(() => {
        setFormData(item);
    }, [item]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.imageUrl) {
            alert('An image is required for portfolio items.');
            return;
        }
        if (!formData.caption.trim()) {
            alert('A caption is required for portfolio items.');
            return;
        }
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'var(--background-color)' }}>
            <h5 style={{ marginTop: 0, marginBottom: '10px', color: 'var(--primary-color)' }}>{isNew ? 'Add New Portfolio Item' : `Edit Portfolio Item`}</h5>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                <div style={{
                    width: '150px',
                    height: '100px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--border-color)',
                }}>
                    {formData.imageUrl ? (
                        <img src={formData.imageUrl} alt="Portfolio preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <span style={{ color: 'var(--text-color-light-gray)' }}>No Image</span>
                    )}
                </div>
                <button type="button" className="btn-secondary" onClick={onUploadImage} aria-label="Upload or change image">
                    {formData.imageUrl ? 'Change Image' : 'Upload Image'}
                </button>
            </div>

            <div>
                <label htmlFor="portfolioCaption" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Caption:</label>
                <textarea id="portfolioCaption" name="caption" value={formData.caption} onChange={handleChange} rows={3} required style={{ width: '100%' }} aria-label="Portfolio item caption"></textarea>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="btn-secondary" onClick={onCancel} aria-label="Cancel editing portfolio item">Cancel</button>
                <button type="submit" aria-label="Save portfolio item">{isNew ? 'Add Item' : 'Update Item'}</button>
            </div>
        </form>
    );
};
