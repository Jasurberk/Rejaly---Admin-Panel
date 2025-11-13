import React, { useState } from 'react';
import { User } from '../../../types';

interface UserPasswordResetProps {
    user: User;
    onClose: () => void;
}

export const UserPasswordReset: React.FC<UserPasswordResetProps> = ({ user, onClose }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSetNewPassword = () => {
        if (newPassword !== confirmPassword) {
            alert('New password and confirm password do not match.');
            return;
        }
        if (!newPassword) {
            alert('Password cannot be empty.');
            return;
        }
        // In a real app, this would be an API call to set the new password
        alert(`Password for ${user.email || user.phone} has been manually updated to: ${newPassword}! (Placeholder)`);
        setNewPassword('');
        setConfirmPassword('');
        onClose();
    };

    const handleSendEmailReset = () => {
        if (user.email) {
            alert(`Password reset link sent to ${user.email}! (Placeholder)`);
            onClose();
        } else {
            alert('User does not have an email address to send a reset link.');
        }
    };

    const handleSendSmsReset = () => {
        if (user.phone) {
            alert(`Password reset link sent to ${user.phone} via SMS! (Placeholder)`);
            onClose();
        } else {
            alert('User does not have a phone number to send a reset link.');
        }
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
            maxWidth: '400px',
            margin: '0 auto',
            height: 'fit-content',
            overflowY: 'auto',
            boxSizing: 'border-box',
        }}>
            <h4 style={{ marginTop: 0, marginBottom: '20px', textAlign: 'center', color: 'var(--text-color)' }}>Reset Password for {user.firstName} {user.lastName}</h4>
            <p style={{ textAlign: 'center', marginBottom: '20px', opacity: 0.8 }}>Admin override options</p>

            <p style={{marginBottom: '15px'}}><strong>Login Identifier:</strong> {user.email || user.phone || 'N/A'}</p>

            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="newPassword" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>New Password:</label>
                <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ width: '100%' }} aria-label="New Password" />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Confirm New Password:</label>
                <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ width: '100%' }} aria-label="Confirm New Password" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={handleSetNewPassword} aria-label="Set new password manually">Set New Password (Admin)</button>
                <button className="btn-secondary" onClick={handleSendEmailReset} disabled={!user.email} aria-label="Send password reset link to email">Send Email Reset Link</button>
                <button className="btn-secondary" onClick={handleSendSmsReset} disabled={!user.phone} aria-label="Send password reset link to phone via SMS">Send SMS Reset Link</button>
                <button className="btn-secondary" onClick={onClose} aria-label="Go Back from password reset">Go Back</button>
            </div>
        </div>
    );
};
