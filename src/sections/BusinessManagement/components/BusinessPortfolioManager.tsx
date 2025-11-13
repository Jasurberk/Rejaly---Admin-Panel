import React, { useState, useEffect } from 'react';
import { Business, PortfolioItem } from '../../../types';
import { generateId } from '../../../utils/data';
import { UploadMediaModal } from '../../../components/common/UploadMediaModal';
import { PortfolioItemForm } from '../../../forms/PortfolioItemForm';

interface BusinessPortfolioManagerProps {
    business: Business;
    onClose: () => void;
    onSavePortfolio: (updatedPortfolio: PortfolioItem[]) => void;
}

export const BusinessPortfolioManager: React.FC<BusinessPortfolioManagerProps> = ({ business, onClose, onSavePortfolio }) => {
    const [currentPortfolio, setCurrentPortfolio] = useState<PortfolioItem[]>(business.portfolio || []);
    const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isImageUploadModalOpen, setIsImageUploadModalOpen] = useState(false);

    useEffect(() => {
        setCurrentPortfolio(business.portfolio || []);
        setEditingItem(null);
        setIsAddingNew(false);
        setIsImageUploadModalOpen(false);
    }, [business]);

    const openForm = (itemToEdit: PortfolioItem | null, isNewItem: boolean) => {
        setEditingItem(itemToEdit);
        setIsAddingNew(isNewItem);
    };

    const handleAddItemClick = () => {
        setIsAddingNew(true);
        setEditingItem({
            id: generateId(),
            imageUrl: '',
            caption: '',
        });
        setIsImageUploadModalOpen(true);
    };

    const handleEditItemClick = (item: PortfolioItem) => {
        openForm({ ...item }, false);
    };

    const handleDeleteItem = (id: string) => {
        if (window.confirm('Are you sure you want to delete this portfolio item?')) {
            setCurrentPortfolio(prev => prev.filter(item => item.id !== id));
        }
    };

    const handleImageUploaded = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const newImageUrl = reader.result as string;
            if (editingItem) {
                 setEditingItem(prev => ({ ...prev!, imageUrl: newImageUrl }));
            } else {
                setEditingItem({ id: generateId(), imageUrl: newImageUrl, caption: '' });
            }
            setIsImageUploadModalOpen(false);
            if (isAddingNew && !editingItem?.imageUrl) {
                openForm(editingItem ? { ...editingItem, imageUrl: newImageUrl } : { id: generateId(), imageUrl: newImageUrl, caption: '' }, true);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSaveItem = (item: PortfolioItem) => {
        if (isAddingNew) {
            setCurrentPortfolio(prev => [...prev, item]);
        } else {
            setCurrentPortfolio(prev => prev.map(s => (s.id === item.id ? item : s)));
        }
        setEditingItem(null);
        setIsAddingNew(false);
    };

    const handleCancelForm = () => {
        setEditingItem(null);
        setIsAddingNew(false);
        setIsImageUploadModalOpen(false);
    };

    const requestImageUpload = () => {
        setIsImageUploadModalOpen(true);
    };

    const handleFinalSave = () => {
        onSavePortfolio(currentPortfolio);
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
                Manage Portfolio for {business.name}
            </h4>

            {editingItem && (isAddingNew || editingItem.imageUrl) && !isImageUploadModalOpen ? (
                <PortfolioItemForm
                    item={editingItem}
                    onSave={handleSaveItem}
                    onCancel={handleCancelForm}
                    isNew={isAddingNew}
                    onUploadImage={requestImageUpload}
                />
            ) : (
                <>
                    <button onClick={handleAddItemClick} style={{ marginBottom: '20px' }} aria-label="Add new portfolio item">
                        Add New Portfolio Item
                    </button>

                    {currentPortfolio.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                            gap: '20px',
                            maxHeight: '500px',
                            overflowY: 'auto',
                            paddingRight: '10px',
                        }}>
                            {currentPortfolio.map(item => (
                                <div key={item.id} style={{
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    backgroundColor: 'var(--background-color)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                }}>
                                    <div style={{ width: '100%', height: '180px', overflow: 'hidden', backgroundColor: 'var(--border-color)' }}>
                                        <img src={item.imageUrl} alt={item.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ padding: '15px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <p style={{ margin: '0 0 10px 0', fontSize: '0.95em', flexGrow: 1 }}>{item.caption}</p>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                                            <button className="btn-secondary" onClick={() => handleEditItemClick(item)} style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`Edit ${item.caption}`}>Edit</button>
                                            <button className="btn-danger" onClick={() => handleDeleteItem(item.id)} style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`Delete ${item.caption}`}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ opacity: 0.8 }}>No portfolio items found for this business.</p>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px' }}>
                        <button className="btn-secondary" onClick={onClose} aria-label="Go Back from portfolio management">Go Back</button>
                        <button onClick={handleFinalSave} aria-label="Save all portfolio changes">Save All Changes</button>
                    </div>
                </>
            )}

            <UploadMediaModal
                isOpen={isImageUploadModalOpen}
                onClose={handleCancelForm}
                onUpload={handleImageUploaded}
                title={isAddingNew ? "Upload Portfolio Image" : "Change Portfolio Image"}
                currentImageUrl={editingItem?.imageUrl || undefined}
            />
        </div>
    );
};
