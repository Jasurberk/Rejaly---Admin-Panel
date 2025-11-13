import React, { useState, useEffect, useRef } from 'react';
import { Business } from '../../../types';
import { UploadMediaModal } from '../../../components/common/UploadMediaModal';

interface BusinessProfileEditorProps {
    business: Business;
    onClose: () => void;
    onSave: (updatedBusiness: Business) => void;
    uniqueCities: string[];
    uniqueActivities: string[];
    onViewStaff: (business: Business) => void;
    onViewActivity: (business: Business) => void;
    onResetPassword: (business: Business) => void;
    onUploadCoverPhoto: (file: File, businessId: string) => void;
    onManageServiceOffers: (business: Business) => void;
    onManageClients: (business: Business) => void;
    onManagePortfolio: (business: Business) => void;
    onViewReviews: (business: Business) => void;
}

export const BusinessProfileEditor: React.FC<BusinessProfileEditorProps> = ({ business, onClose, onSave, uniqueCities, uniqueActivities, onViewStaff, onViewActivity, onResetPassword, onUploadCoverPhoto, onManageServiceOffers, onManageClients, onManagePortfolio, onViewReviews }) => {
    const [formData, setFormData] = useState<Business>(business);
    const [isUploadCoverPhotoModalOpen, setIsUploadCoverPhotoModalOpen] = useState(false);
    const [isDeletingCoverPhotos, setIsDeletingCoverPhotos] = useState(false);
    const [selectedCoverPhotosForDeletion, setSelectedCoverPhotosForDeletion] = useState<Set<string>>(new Set());

    const coverPhotosRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setFormData(business);
        setIsDeletingCoverPhotos(false);
        setSelectedCoverPhotosForDeletion(new Set());
    }, [business]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    const handleCoverPhotoUpload = (file: File) => {
        if ((formData.coverPhotoUrls?.length || 0) >= 5) {
            alert('You can upload a maximum of 5 cover photos.');
            return;
        }
        onUploadCoverPhoto(file, business.id);
    };

    const togglePhotoSelection = (url: string) => {
        setSelectedCoverPhotosForDeletion(prev => {
            const newSet = new Set(prev);
            if (newSet.has(url)) {
                newSet.delete(url);
            } else {
                newSet.add(url);
            }
            return newSet;
        });
    };

    const confirmDeleteSelectedPhotos = () => {
        setFormData(prev => ({
            ...prev,
            coverPhotoUrls: (prev.coverPhotoUrls || []).filter(url => !selectedCoverPhotosForDeletion.has(url))
        }));
        setIsDeletingCoverPhotos(false);
        setSelectedCoverPhotosForDeletion(new Set());
    };

    const cancelDeletePhotos = () => {
        setIsDeletingCoverPhotos(false);
        setSelectedCoverPhotosForDeletion(new Set());
    };

    const scrollCoverPhotos = (direction: 'left' | 'right') => {
        if (coverPhotosRef.current) {
            const scrollAmount = coverPhotosRef.current.offsetWidth * 0.7;
            if (direction === 'left') {
                coverPhotosRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                coverPhotosRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    const canUploadMorePhotos = (formData.coverPhotoUrls?.length || 0) < 5;


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
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>

                <div style={{ flex: '1 1 70%', minWidth: '450px', maxWidth: '750px' }}>
                    <div style={{ marginBottom: '30px', paddingBottom: '10px' }}>
                        <h4 style={{ marginTop: 0, marginBottom: '15px', color: 'var(--primary-color)' }}>Cover Photos (Max 5)</h4>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0, minWidth: '150px' }}>
                                {!isDeletingCoverPhotos ? (
                                    <>
                                        <button
                                            className="btn-secondary"
                                            onClick={() => setIsUploadCoverPhotoModalOpen(true)}
                                            disabled={!canUploadMorePhotos}
                                            aria-label="Upload new cover photo"
                                        >
                                            Upload Photo
                                        </button>
                                        <button
                                            className="btn-danger"
                                            onClick={() => setIsDeletingCoverPhotos(true)}
                                            disabled={!formData.coverPhotoUrls || formData.coverPhotoUrls.length === 0}
                                            aria-label="Delete cover photos"
                                        >
                                            Delete Photos
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn-success" onClick={confirmDeleteSelectedPhotos} disabled={selectedCoverPhotosForDeletion.size === 0} aria-label="Confirm delete selected photos">Confirm Deletion ({selectedCoverPhotosForDeletion.size})</button>
                                        <button className="btn-secondary" onClick={cancelDeletePhotos} aria-label="Cancel deletion">Cancel</button>
                                    </>
                                )}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexGrow: 1 }}>
                                <button onClick={() => scrollCoverPhotos('left')} aria-label="Scroll cover photos left" className="btn-icon" style={{ padding: '8px', flexShrink: 0 }}>
                                    &#9664;
                                </button>
                                <div ref={coverPhotosRef} style={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    overflowX: 'auto',
                                    whiteSpace: 'nowrap',
                                    gap: '10px',
                                    padding: '10px 0',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border-color)',
                                    backgroundColor: 'var(--background-color)',
                                    scrollBehavior: 'smooth',
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                }}>
                                    <style>{`
                                        div::-webkit-scrollbar {
                                            display: none;
                                        }
                                    `}</style>
                                    {(formData.coverPhotoUrls && formData.coverPhotoUrls.length > 0) ? (
                                        formData.coverPhotoUrls.map((url, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    position: 'relative',
                                                    display: 'inline-block',
                                                    width: '120px',
                                                    height: '90px',
                                                    flexShrink: 0,
                                                    borderRadius: '4px',
                                                    overflow: 'hidden',
                                                    border: isDeletingCoverPhotos && selectedCoverPhotosForDeletion.has(url) ? '2px solid var(--danger-color)' : '1px solid var(--border-color)',
                                                    cursor: isDeletingCoverPhotos ? 'pointer' : 'default',
                                                    transition: 'border-color 0.2s',
                                                }}
                                                onClick={() => isDeletingCoverPhotos && togglePhotoSelection(url)}
                                                aria-label={`Cover photo ${index + 1}`}
                                            >
                                                <img src={url} alt={`Cover ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                {isDeletingCoverPhotos && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        backgroundColor: selectedCoverPhotosForDeletion.has(url) ? 'rgba(220, 53, 69, 0.5)' : 'rgba(0,0,0,0.3)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: 'white',
                                                        fontSize: '1.5em',
                                                    }} aria-hidden="true">
                                                        {selectedCoverPhotosForDeletion.has(url) ? '🗑️' : 'Click to select'}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p style={{ color: 'var(--text-color)', opacity: 0.7, padding: '0 10px', whiteSpace: 'normal' }}>No cover photos uploaded yet.</p>
                                    )}
                                </div>
                                <button onClick={() => scrollCoverPhotos('right')} aria-label="Scroll cover photos right" className="btn-icon" style={{ padding: '8px', flexShrink: 0 }}>
                                    &#9654;
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div style={{ flex: '1 1 48%', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="bizName" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Business Name:</label>
                                <input type="text" id="bizName" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%' }} aria-label="Business Name" />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="bizPhone" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Phone Number:</label>
                                <input type="tel" id="bizPhone" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%' }} aria-label="Business Phone Number" />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="bizEmail" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Email:</label>
                                <input type="email" id="bizEmail" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%' }} aria-label="Business Email" />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="bizAddress" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Address:</label>
                                <textarea id="bizAddress" name="address" value={formData.address || ''} onChange={handleChange} rows={2} style={{ width: '100%' }} aria-label="Business Address"></textarea>
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="bizCity" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>City:</label>
                                <select id="bizCity" name="city" value={formData.city} onChange={handleChange} style={{ width: '100%' }} aria-label="Business City">
                                    {uniqueCities.filter(city => city !== 'All').map(city => (<option key={city} value={city}>{city}</option>))}
                                </select>
                            </div>
                        </div>

                        <div style={{ flex: '1 1 48%', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="bizActivity" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Activity Type:</label>
                                <select id="bizActivity" name="activity" value={formData.activity} onChange={handleChange} style={{ width: '100%' }} aria-label="Activity Type">
                                    {uniqueActivities.filter(a => a !== 'All').map(activity => (<option key={activity} value={activity}>{activity}</option>))}
                                </select>
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="bizWebsite" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Website (Optional):</label>
                                <input type="url" id="bizWebsite" name="website" value={formData.website || ''} onChange={handleChange} style={{ width: '100%' }} aria-label="Business Website" />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="bizDescription" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Description (Optional):</label>
                                <textarea id="bizDescription" name="description" value={formData.description || ''} onChange={handleChange} rows={5} style={{ width: '100%' }} aria-label="Business Description"></textarea>
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="bizStatus" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Status:</label>
                                <select id="bizStatus" name="status" value={formData.status} onChange={handleChange} style={{ width: '100%' }} aria-label="Business Status">
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    flex: '0 0 200px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    alignSelf: 'flex-start',
                    flexShrink: 0,
                    borderLeft: '1px solid var(--border-color)',
                    paddingLeft: '25px',
                }}>
                    <button className="btn-secondary" onClick={() => onViewStaff(business)} style={{ width: '100%' }} aria-label="View and Manage Staff">View & Manage Staff</button>
                    <button className="btn-secondary" onClick={() => onManageServiceOffers(business)} style={{ width: '100%' }} aria-label="Manage Service Offers">Manage Service Offers</button>
                    <button className="btn-secondary" onClick={() => onManageClients(business)} style={{ width: '100%' }} aria-label="Manage Clients">Manage Clients</button>
                    <button className="btn-secondary" onClick={() => onManagePortfolio(business)} style={{ width: '100%' }} aria-label="Manage Portfolio">Manage Portfolio</button>
                    <button className="btn-secondary" onClick={() => onViewReviews(business)} style={{ width: '100%' }} aria-label="View Reviews">View Reviews</button>
                    <button className="btn-secondary" onClick={() => onViewActivity(business)} style={{ width: '100%' }} aria-label="View Business Activity">View Activity</button>
                    <button className="btn-danger" onClick={() => onResetPassword(business)} style={{ width: '100%' }} aria-label="Reset Business Password">Reset Password</button>
                    <div style={{ borderTop: '1px solid var(--border-color)', width: '100%', margin: '10px 0' }}></div>
                    <button className="btn-secondary" onClick={onClose} style={{ width: '100%' }} aria-label="Go Back to business list">Go Back</button>
                    <button onClick={handleSave} style={{ width: '100%' }} aria-label="Save Changes">Save Changes</button>
                </div>
            </div>

            <UploadMediaModal
                isOpen={isUploadCoverPhotoModalOpen}
                onClose={() => setIsUploadCoverPhotoModalOpen(false)}
                onUpload={handleCoverPhotoUpload}
                title={`Upload Cover Photo (${formData.coverPhotoUrls?.length || 0}/5)`}
            />
        </div>
    );
};
