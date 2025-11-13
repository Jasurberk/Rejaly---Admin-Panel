import React, { useState } from 'react';
import { Card } from '../common/Card';

interface LoginScreenProps {
    onLogin: (username: string, password: string) => void;
    loginError: string | null;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, loginError }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100%',
            backgroundColor: 'var(--background-color)',
            color: 'var(--text-color)',
        }}>
            <Card style={{
                width: '90%',
                maxWidth: '400px',
                padding: '40px',
                textAlign: 'center',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    color: 'var(--sidebar-text)',
                    backgroundColor: 'var(--primary-color)',
                    borderRadius: '8px',
                    padding: '10px',
                }}>
                    <span style={{ fontSize: '2.5em', fontWeight: 'bold', marginRight: '10px' }}>R</span>
                    <div>
                        <div style={{ fontSize: '1.4em', fontWeight: 'bold', lineHeight: '1.2' }}>Rejaly.uz</div>
                        <div style={{ fontSize: '0.9em', opacity: 0.8 }}>Admin Panel</div>
                    </div>
                </div>
                <h3 style={{ marginTop: 0, marginBottom: '30px', color: 'var(--text-color)' }}>Admin Login</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label htmlFor="loginUsername" style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Username or Email:</label>
                        <input
                            type="text"
                            id="loginUsername"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ width: '100%' }}
                            placeholder="admin@rejaly.uz"
                            aria-label="Username or Email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="loginPassword" style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Password:</label>
                        <input
                            type="password"
                            id="loginPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%' }}
                            placeholder="password123"
                            aria-label="Password"
                            required
                        />
                    </div>
                    {loginError && (
                        <p style={{ color: 'var(--danger-color)', margin: '-10px 0 0', fontSize: '0.9em' }}>{loginError}</p>
                    )}
                    <button type="submit" style={{ marginTop: '10px' }} aria-label="Login">Login</button>
                </form>
            </Card>
        </div>
    );
};
