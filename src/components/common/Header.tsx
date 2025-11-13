import React from 'react';

export const Header: React.FC<{ currentSectionTitle: string; titleOverride?: string; onGoBack?: () => void; showBackButton?: boolean }> = ({ currentSectionTitle, titleOverride, onGoBack, showBackButton }) => (
    <header style={{
        backgroundColor: 'var(--header-bg)',
        padding: '15px 20px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between', // Align items on both ends
        alignItems: 'center',
        color: 'var(--text-color)',
        minHeight: '60px', // Ensure consistent height
        flexShrink: 0, // Prevent header from shrinking
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {showBackButton && onGoBack && (
                <button
                    onClick={onGoBack}
                    className="btn-secondary"
                    style={{ padding: '8px 12px', fontSize: '1em' }}
                    aria-label="Go back"
                >
                    &larr; Back
                </button>
            )}
            <h1 style={{ margin: 0, fontSize: '1.5em' }}>{titleOverride || currentSectionTitle}</h1>
        </div>
    </header>
);
