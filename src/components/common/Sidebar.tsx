import React from 'react';

export const Sidebar: React.FC<{ activeSection: string; onSelectSection: (section: string) => void; onOpenSettings: () => void; onLogout: () => void; }> = ({ activeSection, onSelectSection, onOpenSettings, onLogout }) => {
    const sections = [
        { id: 'user-management', name: '🧍‍♂️ User Management' },
        { id: 'business-management', name: '💈 Business Management' },
        { id: 'booking-management', name: '📅 Booking Management' },
        { id: 'notifications-communication', name: '⚡ Notifications' },
        { id: 'reviews-ratings-reports', name: '💬 Reviews & Reports' },
        { id: 'analytics-dashboard', name: '📊 Analytics Dashboard' },
        { id: 'payments-transactions', name: '💰 Payments & Transactions' },
        { id: 'platform-configuration', name: '🧱 Platform Configuration' },
        { id: 'support-issue-resolution', name: '🚨 Support & Issues' },
        { id: 'developer-maintenance', name: '🧰 Dev & Maintenance' },
    ];

    return (
        <nav style={{
            width: '250px',
            backgroundColor: 'var(--sidebar-bg)',
            color: 'var(--sidebar-text)',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid var(--border-color)',
            height: '100vh',
            overflowY: 'hidden',
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '20px 20px 20px 20px',
                borderBottom: '1px solid var(--border-color)',
                color: 'var(--sidebar-text)',
                flexShrink: 0,
            }}>
                <span style={{ fontSize: '2.5em', fontWeight: 'bold', marginRight: '10px', color: 'var(--primary-color)' }}>R</span>
                <div>
                    <div style={{ fontSize: '1.4em', fontWeight: 'bold', lineHeight: '1.2' }}>Rejaly.uz</div>
                    <div style={{ fontSize: '0.9em', opacity: 0.8 }}>Admin Panel</div>
                </div>
            </div>

            <div style={{
                flexGrow: 1,
                overflowY: 'auto',
                padding: '20px 0',
            }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {sections.map(section => (
                        <li key={section.id}>
                            <button
                                onClick={() => onSelectSection(section.id)}
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    padding: '12px 20px',
                                    textAlign: 'left',
                                    background: activeSection === section.id ? 'var(--sidebar-hover-bg)' : 'none',
                                    border: 'none',
                                    color: 'var(--sidebar-text)',
                                    cursor: 'pointer',
                                    fontSize: '1em',
                                    outline: 'none',
                                    transition: 'background-color 0.2s',
                                }}
                                onMouseEnter={(e) => { if (activeSection !== section.id) e.currentTarget.style.backgroundColor = 'var(--sidebar-hover-bg)'; }}
                                onMouseLeave={(e) => { if (activeSection !== section.id) e.currentTarget.style.backgroundColor = 'transparent'; }}
                            >
                                {section.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{
                padding: '20px',
                borderTop: '1px solid var(--border-color)',
                marginTop: 'auto',
                flexShrink: 0,
            }}>
                <button onClick={onOpenSettings} style={{
                    width: '100%',
                    background: 'none',
                    border: '1px solid var(--border-color)',
                    color: 'var(--sidebar-text)',
                    padding: '10px 12px',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '0.9em',
                    transition: 'background-color 0.2s, border-color 0.2s',
                }}>
                    ⚙️ Settings
                </button>
                <button
                    onClick={onLogout}
                    style={{
                        width: '100%',
                        background: 'none',
                        border: '1px solid var(--border-color)',
                        color: 'var(--danger-color)',
                        padding: '10px 12px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontSize: '0.9em',
                        transition: 'background-color 0.2s, border-color 0.2s',
                    }}
                    aria-label="Logout"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};
