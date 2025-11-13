import React from 'react';

export const ContentArea: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <main style={{
        flexGrow: 1,
        padding: '20px',
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)',
        overflowY: 'auto',
    }}>
        {children}
    </main>
);
