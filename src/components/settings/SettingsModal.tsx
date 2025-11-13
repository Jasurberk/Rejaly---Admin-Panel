import React, { useState, useEffect } from 'react';
import { AdminCredentials } from '../../types';
import { Card } from '../common/Card';
import { AdminCredentialsEditor } from './AdminCredentialsEditor';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
    adminCredentials: AdminCredentials;
    adminPassword: string; // Pass for verification
    onUpdateAdminLogin: (newUsername: string, newEmail: string) => void;
    onUpdateAdminPassword: (currentPass: string, newPass: string) => void;
    onResetAdminPasswordRequest: (email: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, isDarkMode, onToggleDarkMode, adminCredentials, adminPassword, onUpdateAdminLogin, onUpdateAdminPassword, onResetAdminPasswordRequest }) => {
    const [currentSettingsView, setCurrentSettingsView] = useState<'main' | 'adminCredentials'>('main');

    useEffect(() => {
        if (!isOpen) {
            setCurrentSettingsView('main'); // Reset view when modal closes
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackToMainSettings = () => {
        setCurrentSettingsView('main');
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001,
            backdropFilter: 'blur(2px)'
        }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <Card style={{
                width: '90%',
                maxWidth: '600px',
                padding: '0', // Remove internal padding as sub-components have it
                maxHeight: '80vh', // Limit height for scrollability
                overflowY: 'auto',
                position: 'relative',
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5em',
                        color: 'var(--text-color-light-gray)',
                        cursor: 'pointer',
                        padding: '5px',
                        lineHeight: '1',
                        zIndex: 10,
                    }}
                    aria-label="Close settings"
                >
                    &times;
                </button>
                {currentSettingsView === 'main' && (
                    <div style={{ padding: '30px' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '25px', color: 'var(--text-color)' }}>Settings</h3>
                        <div style={{ marginBottom: '20px' }}>
                            <h5 style={{ marginBottom: '10px', color: 'var(--primary-color)' }}>Appearance</h5>
                            <button onClick={onToggleDarkMode} style={{
                                width: '100%',
                                background: 'none',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-color)',
                                padding: '12px 15px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                fontSize: '1.1em',
                                transition: 'background-color 0.2s, border-color 0.2s',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <span>{isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
                                <span style={{ opacity: 0.7, fontSize: '0.9em' }}>Toggle theme</span>
                            </button>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <h5 style={{ marginBottom: '10px', color: 'var(--primary-color)' }}>Account</h5>
                            <button onClick={() => setCurrentSettingsView('adminCredentials')} style={{
                                width: '100%',
                                background: 'none',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-color)',
                                padding: '12px 15px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                fontSize: '1.1em',
                                transition: 'background-color 0.2s, border-color 0.2s',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <span>Admin Login Credentials</span>
                                <span style={{ opacity: 0.7, fontSize: '0.9em' }}>Change login & password &rarr;</span>
                            </button>
                        </div>
                    </div>
                )}
                {currentSettingsView === 'adminCredentials' && (
                    <AdminCredentialsEditor
                        adminCredentials={adminCredentials}
                        adminPassword={adminPassword}
                        onUpdateLogin={onUpdateAdminLogin}
                        onUpdatePassword={onUpdateAdminPassword}
                        onResetPasswordRequest={onResetAdminPasswordRequest}
                        onBack={handleBackToMainSettings}
                    />
                )}
            </Card>
        </div>
    );
};
