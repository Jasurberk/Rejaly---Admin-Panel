import React, { useState, useEffect } from 'react';
import { User } from '../../../types';
import { UploadMediaModal } from '../../../components/common/UploadMediaModal';
import { GENDER_OPTIONS } from '../../../utils/data';

interface UserProfileEditorProps {
    user: User;
    onClose: () => void;
    onSave: (updatedUser: User) => void;
    uniqueCities: string[];
    uniqueGenders: string[];
    onViewActivity: (user: User) => void;
    onResetPassword: (user: User) => void;
    onUploadProfilePhoto: (file: File, userId: string) => void;
}

export const UserProfileEditor: React.FC<UserProfileEditorProps> = ({ user, onClose, onSave, uniqueCities, uniqueGenders, onViewActivity, onResetPassword, onUploadProfilePhoto }) => {
    const [formData, setFormData] = useState<User>(user);
    const [isUploadMediaModalOpen, setIsUploadMediaModalOpen] = useState(false);

    useEffect(() => {
        setFormData(user);
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    const handlePhotoUpload = (file: File) => {
        onUploadProfilePhoto(file, user.id);
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
            maxWidth: '900px',
            margin: '0 auto',
            height: 'fit-content',
            overflowY: 'auto',
            boxSizing: 'border-box',
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '25px' }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3em',
                    color: 'var(--primary-color)',
                    marginBottom: '10px',
                    overflow: 'hidden',
                    border: '2px solid var(--primary-color)'
                }} aria-label="User profile photo placeholder">
                    {formData.profilePhotoUrl ? (
                        <img src={formData.profilePhotoUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        formData.firstName ? formData.firstName.charAt(0).toUpperCase() : '👤'
                    )}
                </div>
                <button className="btn-secondary" onClick={() => setIsUploadMediaModalOpen(true)} style={{ fontSize: '0.8em', padding: '5px 10px' }}>Upload Photo</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px 20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="firstName" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} style={{ width: '100%' }} aria-label="First Name" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="lastName" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Last Name:</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} style={{ width: '100%' }} aria-label="Last Name" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="gender" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Gender:</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange} style={{ width: '100%' }} aria-label="Gender">
                        {uniqueGenders.map(gender => (<option key={gender} value={gender}>{gender}</option>))}
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%' }} aria-label="Email" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="phone" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Phone Number:</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%' }} aria-label="Phone Number" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="birthday" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Birthday:</label>
                    <input type="date" id="birthday" name="birthday" value={formData.birthday} onChange={handleChange} style={{ width: '100%' }} aria-label="Birthday" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="city" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>City:</label>
                    <select id="city" name="city" value={formData.city} onChange={handleChange} style={{ width: '100%' }} aria-label="City">
                        {uniqueCities.map(city => (<option key={city} value={city}>{city}</option>))}
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="address" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Address (Optional):</label>
                    <textarea id="address" name="address" value={formData.address || ''} onChange={handleChange} rows={2} style={{ width: '100%' }} aria-label="Address"></textarea>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="favoriteServiceType" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Favorite Service Type (Optional):</label>
                    <input type="text" id="favoriteServiceType" name="favoriteServiceType" value={formData.favoriteServiceType || ''} onChange={handleChange} style={{ width: '100%' }} aria-label="Favorite Service Type" />
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px', gap: '10px' }}>
                <button className="btn-secondary" onClick={() => onViewActivity(user)} style={{ flex: 1 }} aria-label="View User Activity">View Activity</button>
                <button className="btn-danger" onClick={() => onResetPassword(user)} style={{ flex: 1 }} aria-label="Reset User Password">Reset Password</button>
                <button className="btn-secondary" onClick={onClose} style={{ flex: 1 }} aria-label="Go Back to user list">Go Back</button>
                <button onClick={handleSave} style={{ flex: 1 }} aria-label="Save Changes">Save Changes</button>
            </div>
            <UploadMediaModal
                isOpen={isUploadMediaModalOpen}
                onClose={() => setIsUploadMediaModalOpen(false)}
                onUpload={handlePhotoUpload}
                title="Upload Profile Photo"
                currentImageUrl={formData.profilePhotoUrl}
            />
        </div>
    );
};
