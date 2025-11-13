import React, { useState, useEffect } from 'react';
import { Business, StaffMember } from '../../../types';
import { StaffProfileEditor } from './StaffProfileEditor';
import { StaffPasswordReset } from './StaffPasswordReset';
import { generateId } from '../../../utils/data';

interface BusinessStaffManagerProps {
    business: Business;
    onClose: () => void;
    onSaveStaff: (businessId: string, updatedStaff: StaffMember[]) => void;
    onUploadStaffMedia: (file: File, staffId: string, businessId: string) => void;
}

export const BusinessStaffManager: React.FC<BusinessStaffManagerProps> = ({ business, onClose, onSaveStaff, onUploadStaffMedia }) => {
    const [currentStaff, setCurrentStaff] = useState<StaffMember[]>(business.staff || []);
    const [staffManagementSubView, setStaffManagementSubView] = useState<'list' | 'editStaff' | 'resetStaffPassword'>('list');
    const [selectedStaffMember, setSelectedStaffMember] = useState<StaffMember | null>(null);

    useEffect(() => {
        setCurrentStaff(business.staff || []);
        setStaffManagementSubView('list');
        setSelectedStaffMember(null);
    }, [business]);

    const handleAddStaff = () => {
        alert('Add Staff functionality is not yet implemented.');
    };

    const handleEditStaff = (staff: StaffMember) => {
        setSelectedStaffMember(staff);
        setStaffManagementSubView('editStaff');
    };

    const handleDeactivateActivateStaff = (id: string, activate: boolean) => {
        setCurrentStaff(prevStaff => prevStaff.map(staff =>
            staff.id === id ? { ...staff, active: activate } : staff
        ));
    };

    const handleRemoveStaff = (id: string) => {
        if (window.confirm('Are you sure you want to remove this staff member? This action cannot be undone.')) {
            setCurrentStaff(prevStaff => prevStaff.filter(staff => staff.id !== id));
        }
    };

    const handleResetStaffPassword = (staff: StaffMember) => {
        setSelectedStaffMember(staff);
        setStaffManagementSubView('resetStaffPassword');
    };

    const handleStaffProfileEditorClose = () => {
        setSelectedStaffMember(null);
        setStaffManagementSubView('list');
    };

    const handleStaffPasswordResetClose = () => {
        setSelectedStaffMember(null);
        setStaffManagementSubView('list');
    };

    const handleSaveStaff = (updatedStaff: StaffMember) => {
        setCurrentStaff(prev => prev.map(s => (s.id === updatedStaff.id ? updatedStaff : s)));
        handleStaffProfileEditorClose();
    };

    const handleStaffPhotoUpload = (file: File) => {
        if (selectedStaffMember) {
            onUploadStaffMedia(file, selectedStaffMember.id, business.id);
        }
    };

    const handleFinalSave = () => {
        onSaveStaff(business.id, currentStaff);
        onClose();
    };

    if (staffManagementSubView === 'editStaff' && selectedStaffMember) {
        return (
            <StaffProfileEditor
                staffMember={selectedStaffMember}
                onClose={handleStaffProfileEditorClose}
                onSave={handleSaveStaff}
                onUploadProfilePhoto={handleStaffPhotoUpload}
                onResetPassword={handleResetStaffPassword}
            />
        );
    }

    if (staffManagementSubView === 'resetStaffPassword' && selectedStaffMember) {
        return (
            <StaffPasswordReset
                staffMember={selectedStaffMember}
                onClose={handleStaffPasswordResetClose}
            />
        );
    }

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
            <h4 style={{ marginTop: 0, marginBottom: '20px', textAlign: 'center', color: 'var(--text-color)' }}>Manage Staff for {business.name}</h4>
            <p style={{ textAlign: 'center', marginBottom: '20px', opacity: 0.8 }}>Add, edit, and deactivate staff members.</p>

            <button onClick={handleAddStaff} style={{ marginBottom: '20px' }} aria-label="Add new staff member">Add New Staff</button>

            {currentStaff && currentStaff.length > 0 ? (
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {currentStaff.map(staff => (
                        <div key={staff.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid var(--border-color)',
                            borderRadius: '4px',
                            padding: '10px',
                            marginBottom: '10px',
                            background: 'var(--background-color)',
                            gap: '10px',
                        }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--border-color)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5em',
                                color: 'var(--primary-color)',
                                overflow: 'hidden',
                                flexShrink: 0,
                            }}>
                                {staff.profilePhotoUrl ? (
                                    <img src={staff.profilePhotoUrl} alt="Staff Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    staff.firstName.charAt(0).toUpperCase()
                                )}
                            </div>
                            <div style={{ flexGrow: 1 }}>
                                <strong>{staff.firstName} {staff.lastName}</strong> - {staff.role}
                                <div style={{ fontSize: '0.9em', opacity: 0.8 }}>{staff.email} | {staff.phone}</div>
                                <div style={{ fontSize: '0.8em', color: staff.active ? 'var(--success-color)' : 'var(--danger-color)' }}>{staff.active ? 'Active' : 'Inactive'}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '5px', flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                <button className="btn-secondary" onClick={() => handleEditStaff(staff)} style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`Edit ${staff.firstName}`}>Edit</button>
                                <button className="btn-danger" onClick={() => handleResetStaffPassword(staff)} style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`Reset password for ${staff.firstName}`}>Reset Password</button>
                                <button className={staff.active ? "btn-danger" : "btn-success"} onClick={() => handleDeactivateActivateStaff(staff.id, !staff.active)} style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`${staff.active ? 'Deactivate' : 'Activate'} ${staff.firstName}`}>
                                    {staff.active ? 'Deactivate' : 'Activate'}
                                </button>
                                <button className="btn-danger" onClick={() => handleRemoveStaff(staff.id)} style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`Remove ${staff.firstName}`}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <p style={{ opacity: 0.8 }}>No staff members found for this business.</p>}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px' }}>
                <button className="btn-secondary" onClick={onClose} aria-label="Go Back from staff management">Go Back</button>
                <button onClick={handleFinalSave} aria-label="Save all staff changes">Save All Changes</button>
            </div>
        </div>
    );
};
