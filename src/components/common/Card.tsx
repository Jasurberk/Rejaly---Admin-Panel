import React from 'react';

export const Card: React.FC<{ title?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ title, children, style }) => (
    <div style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        ...style
    }}>
        {title && <h3 style={{ marginTop: 0, marginBottom: '15px', color: 'var(--text-color)' }}>{title}</h3>}
        {children}
    </div>
);
