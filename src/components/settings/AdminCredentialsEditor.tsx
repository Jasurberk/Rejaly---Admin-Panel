import React, { useState } from 'react';
import { AdminCredentials } from '../../types';
import { Card } from '../common/Card';

interface AdminCredentialsEditorProps {
    adminCredentials: AdminCredentials;
    adminPassword: string; // Plain password for mock comparison in demo
    onUpdateLogin: (newUsername: string, newEmail: string) => void;
    onUpdatePassword: (currentPass: string, newPass: string) => void;
    onResetPasswordRequest: (email: string) => void;
    onBack: () => void;
}

export const AdminCredentialsEditor: React.FC<AdminCredentialsEditorProps> = ({ adminCredentials, adminPassword, onUpdateLogin, onUpdatePassword, onResetPasswordRequest, onBack }) => {
    const [newUsername, setNewUsername] = useState(adminCredentials.username);
    const [newEmail, setNewEmail] = useState(adminCredentials.email);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    const handleUpdateLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        if (!newUsername.trim() || !newEmail.trim()) {
            setLoginError('Username and Email cannot be empty.');
            return;
        }
        onUpdateLogin(newUsername, newEmail);
    };

    const handleUpdatePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError('');
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setPasswordError('All password fields are required.');
            return;
        }
        if (currentPassword !== adminPassword) { // Mock verification against current admin password
            setPasswordError('Incorrect current password.');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setPasswordError('New password and confirmation do not match.');
            return;
        }
        if (newPassword === currentPassword) {
            setPasswordError('New password cannot be the same as the current password.');
            return;
        }
        onUpdatePassword(currentPassword, newPassword);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h4 style={{ marginTop: 0, marginBottom: '25px', textAlign: 'center', color: 'var(--text-color)' }}>Admin Login Credentials</h4>

            {/* Change Login */}
            <Card title="Change Login Identifier" style={{ marginBottom: '25px' }}>
                <form onSubmit={handleUpdateLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label htmlFor="adminUsername" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Username:</label>
                        <input type="text" id="adminUsername" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} style={{ width: '100%' }} aria-label="Admin username" />
                    </div>
                    <div>
                        <label htmlFor="adminEmail" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Email:</label>
                        <input type="email" id="adminEmail" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} style={{ width: '100%' }} aria-label="Admin email" />
                    </div>
                    {loginError && <p style={{ color: 'var(--danger-color)', margin: '0' }}>{loginError}</p>}
                    <button type="submit" aria-label="Update admin login details">Update Login</button>
                </form>
            </Card>

            {/* Change Password */}
            <Card title="Change Password" style={{ marginBottom: '25px' }}>
                <form onSubmit={handleUpdatePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label htmlFor="currentPassword" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Current Password:</label>
                        <input type="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} style={{ width: '100%' }} aria-label="Current password" />
                    </div>
                    <div>
                        <label htmlFor="newAdminPassword" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>New Password:</label>
                        <input type="password" id="newAdminPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ width: '100%' }} aria-label="New password" />
                    </div>
                    <div>
                        <label htmlFor="confirmNewAdminPassword" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Confirm New Password:</label>
                        <input type="password" id="confirmNewAdminPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} style={{ width: '100%' }} aria-label="Confirm new password" />
                    </div>
                    {passwordError && <p style={{ color: 'var(--danger-color)', margin: '0' }}>{passwordError}</p>}
                    <button type="submit" aria-label="Change admin password">Change Password</button>
                </form>
            </Card>

            {/* Password Reset */}
            <Card title="Request Password Reset">
                <p style={{ opacity: 0.8, marginBottom: '20px' }}>
                    If you forget your password, you can request a reset link to be sent to your registered email.
                </p>
                <button
                    className="btn-secondary"
                    onClick={() => onResetPasswordRequest(adminCredentials.email)}
                    aria-label="Request password reset via email"
                    style={{ width: '100%' }}
                >
                    Send Password Reset Email
                </button>
            </Card>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
                <button className="btn-secondary" onClick={onBack} aria-label="Go back to settings main menu">Go Back</button>
            </div>
        </div>
    );
};
