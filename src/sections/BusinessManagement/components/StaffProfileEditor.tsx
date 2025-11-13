import React, { useState, useEffect } from 'react';
import { StaffMember } from '../../../types';
import { UploadMediaModal } from '../../../components/common/UploadMediaModal';

interface StaffProfileEditorProps {
    staffMember: StaffMember;
    onClose: () => void;
    onSave: (updatedStaff: StaffMember) => void;
    onUploadProfilePhoto: (file: File, staffId: string) => void;
    onResetPassword: (staffMember: StaffMember) => void;
}

export const StaffProfileEditor: React.FC<StaffProfileEditorProps> = ({ staffMember, onClose, onSave, onUploadProfilePhoto, onResetPassword }) => {
    const [formData, setFormData] = useState<StaffMember>(staffMember);
    const [isUploadMediaModalOpen, setIsUploadMediaModalOpen] = useState(false);

    useEffect(() => {
        setFormData(staffMember);
    }, [staffMember]);

    // Fix: Refactored handleChange to correctly handle boolean 'active' from select and avoid 'checked' property error.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'active') { // Specific handling for the status select
            setFormData(prev => ({
                ...prev,
                active: value === 'Active', // Convert string 'Active'/'Inactive' to boolean
            }));
        } else if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: e.target.checked,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSave = () => {
        onSave(formData);
    };

    const handlePhotoUpload = (file: File) => {
        onUploadProfilePhoto(file, staffMember.id);
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
            maxWidth: '600px',
            margin: '0 auto',
            height: 'fit-content',
            overflowY: 'auto',
            boxSizing: 'border-box',
        }}>
            <h4 style={{ marginTop: 0, marginBottom: '20px', textAlign: 'center', color: 'var(--text-color)' }}>Edit Staff Profile: {staffMember.firstName} {staffMember.lastName}</h4>

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
                }} aria-label="Staff profile photo placeholder">
                    {formData.profilePhotoUrl ? (
                        <img src={formData.profilePhotoUrl} alt="Staff Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        formData.firstName ? formData.firstName.charAt(0).toUpperCase() : '👤'
                    )}
                </div>
                <button className="btn-secondary" onClick={() => setIsUploadMediaModalOpen(true)} style={{ fontSize: '0.8em', padding: '5px 10px' }}>Upload Photo</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="staffFirstName" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>First Name:</label>
                    <input type="text" id="staffFirstName" name="firstName" value={formData.firstName} onChange={handleChange} style={{ width: '100%' }} aria-label="Staff First Name" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="staffLastName" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Last Name:</label>
                    <input type="text" id="staffLastName" name="lastName" value={formData.lastName} onChange={handleChange} style={{ width: '100%' }} aria-label="Staff Last Name" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="staffRole" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Role:</label>
                    <input type="text" id="staffRole" name="role" value={formData.role} onChange={handleChange} style={{ width: '100%' }} aria-label="Staff Role" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="staffEmail" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Email:</label>
                    <input type="email" id="staffEmail" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%' }} aria-label="Staff Email" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="staffPhone" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Phone Number:</label>
                    <input type="tel" id="staffPhone" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%' }} aria-label="Staff Phone Number" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="staffStatus" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Status:</label>
                    {/* Fix: Simplified onChange to use the refactored handleChange */}
                    <select id="staffStatus" name="active" value={formData.active ? 'Active' : 'Inactive'} onChange={handleChange} style={{ width: '100%' }} aria-label="Staff Status">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px', gap: '10px' }}>
                <button className="btn-danger" onClick={() => onResetPassword(staffMember)} style={{ flex: 1 }} aria-label="Reset Staff Password">Reset Password</button>
                <button className="btn-secondary" onClick={onClose} style={{ flex: 1 }} aria-label="Go Back to staff list">Go Back</button>
                <button onClick={handleSave} style={{ flex: 1 }} aria-label="Save Changes">Save Changes</button>
            </div>
            <UploadMediaModal
                isOpen={isUploadMediaModalOpen}
                onClose={() => setIsUploadMediaModalOpen(false)}
                onUpload={handlePhotoUpload}
                title="Upload Staff Photo"
                currentImageUrl={formData.profilePhotoUrl}
            />
        </div>
    );
};