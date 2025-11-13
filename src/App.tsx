import React, { useState, useEffect, useMemo } from 'react';
import { User, Business, AdminCredentials, Booking, StaffMember } from './types';
import { generateRandomUser, businessActivities, generateRandomBusiness, GENDER_OPTIONS } from './utils/data';

import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { ContentArea } from './components/common/ContentArea';
import { SettingsModal } from './components/settings/SettingsModal';
import { LoginScreen } from './components/auth/LoginScreen';

import { UserManagement } from './sections/UserManagement/UserManagement';
import { UserProfileEditor } from './sections/UserManagement/components/UserProfileEditor';
import { UserActivityViewer } from './sections/UserManagement/components/UserActivityViewer';
import { UserPasswordReset } from './sections/UserManagement/components/UserPasswordReset';

import { BusinessManagement } from './sections/BusinessManagement/BusinessManagement';
import { BusinessProfileEditor } from './sections/BusinessManagement/components/BusinessProfileEditor';
import { BusinessStaffManager } from './sections/BusinessManagement/components/BusinessStaffManager';
import { BusinessActivityViewer } from './sections/BusinessManagement/components/BusinessActivityViewer';
import { BusinessPasswordReset } from './sections/BusinessManagement/components/BusinessPasswordReset';
import { BusinessServiceOffersManager } from './sections/BusinessManagement/components/BusinessServiceOffersManager';
import { BusinessClientManager } from './sections/BusinessManagement/components/BusinessClientManager';
import { BusinessPortfolioManager } from './sections/BusinessManagement/components/BusinessPortfolioManager';
import { BusinessReviewsViewer } from './sections/BusinessManagement/components/BusinessReviewsViewer';

import { BookingManagement } from './sections/BookingManagement/BookingManagement';
import { BookingEditor } from './sections/BookingManagement/components/BookingEditor';

import { PaymentsTransactions } from './sections/PaymentsTransactions/PaymentsTransactions';
import { ReviewsRatingsReports } from './sections/ReviewsRatingsReports/ReviewsRatingsReports';
import { AnalyticsDashboard } from './sections/AnalyticsDashboard/AnalyticsDashboard';
import { NotificationsCommunication } from './sections/NotificationsCommunication/NotificationsCommunication';
import { PlatformConfiguration } from './sections/PlatformConfiguration/PlatformConfiguration';
import { SupportIssueResolution } from './sections/SupportIssueResolution/SupportIssueResolution';
import { DeveloperMaintenanceTools } from './sections/DeveloperMaintenanceTools/DeveloperMaintenanceTools';

// --- Main App Component ---

export const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('user-management');
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const initialUsersData: User[] = useMemo(() => Array.from({ length: 6 }, generateRandomUser), []);
    const [allUsers, setAllUsers] = useState<User[]>(initialUsersData);

    const initialBusinessesData: Business[] = useMemo(() =>
        businessActivities.map(activity => generateRandomBusiness(activity))
    , []);
    const [allBusinesses, setAllBusinesses] = useState<Business[]>(initialBusinessesData);

    const [userSubView, setUserSubView] = useState<'list' | 'editProfile' | 'viewActivity' | 'resetPassword'>('list');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [userNavOrigin, setUserNavOrigin] = useState<'userManagement' | 'bookingManagement' | null>(null);

    const [businessSubView, setBusinessSubView] = useState<'list' | 'editProfile' | 'manageStaff' | 'viewActivity' | 'resetPassword' | 'manageServiceOffers' | 'manageClients' | 'managePortfolio' | 'viewReviews'>('list');
    const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
    const [businessNavOrigin, setBusinessNavOrigin] = useState<'businessManagement' | 'bookingManagement' | null>(null);

    const [selectedBookingForEdit, setSelectedBookingForEdit] = useState<Booking | null>(null);

    const [isSettingsModalOpen, setIsSettingsModal] = useState(false);
    const [adminCredentials, setAdminCredentials] = useState<AdminCredentials>({
        username: 'admin',
        email: 'admin@rejaly.uz',
    });
    const [adminPassword, setAdminPassword] = useState<string>('password123');
    const [loginError, setLoginError] = useState<string | null>(null);


    const sectionNames: { [key: string]: string } = {
        'user-management': '🧍‍♂️ User Management',
        'business-management': '💈 Business Management',
        'booking-management': '📅 Booking Management',
        'notifications-communication': '⚡ Notifications & Communication',
        'reviews-ratings-reports': '💬 Reviews, Ratings, and Reports',
        'analytics-dashboard': '📊 Analytics Dashboard',
        'payments-transactions': '💰 Payments & Transactions',
        'platform-configuration': '🧱 Platform Configuration',
        'support-issue-resolution': '🚨 Support & Issue Resolution',
        'developer-maintenance': '🧰 Developer & Maintenance Tools',
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.body.setAttribute('data-theme', 'dark');
        } else {
            setIsDarkMode(false);
            document.body.removeAttribute('data-theme');
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => {
            const newMode = !prevMode;
            if (newMode) {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            }
            return newMode;
        });
    };

    const handleLogin = (usernameInput: string, passwordInput: string) => {
        setLoginError(null);
        if (usernameInput === adminCredentials.email && passwordInput === adminPassword) {
            setIsLoggedIn(true);
            setActiveSection('user-management');
        } else {
            setLoginError('Invalid username/email or password.');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setLoginError(null);
        setActiveSection('user-management');
    };

    const handleOpenSettings = () => {
        setIsSettingsModal(true);
    };

    const handleCloseSettings = () => {
        setIsSettingsModal(false);
    };

    const handleUpdateAdminLogin = (newUsername: string, newEmail: string) => {
        setAdminCredentials({ username: newUsername, email: newEmail });
        alert('Admin login details updated successfully! (Placeholder)');
        handleCloseSettings();
    };

    const handleUpdateAdminPassword = (currentPass: string, newPass: string) => {
        if (currentPass === adminPassword) {
            setAdminPassword(newPass);
            alert('Admin password updated successfully! (Placeholder)');
            handleCloseSettings();
        } else {
            alert('Incorrect current password.');
        }
    };

    const handleResetAdminPasswordRequest = (email: string) => {
        alert(`Password reset link sent to admin email: ${email}! (Placeholder)`);
        handleCloseSettings();
    };


    const handleSelectUserForEdit = (user: User, origin: 'userManagement' | 'bookingManagement' = 'userManagement') => {
        setSelectedUser(user);
        setUserSubView('editProfile');
        setActiveSection(origin === 'bookingManagement' ? activeSection : 'user-management');
        setUserNavOrigin(origin);
    };
    const handleViewUserActivity = (user: User, origin: 'userManagement' | 'bookingManagement' = 'userManagement') => {
        setSelectedUser(user);
        setUserSubView('viewActivity');
        setActiveSection(origin === 'bookingManagement' ? activeSection : 'user-management');
        setUserNavOrigin(origin);
    };
    const handleResetUserPassword = (user: User, origin: 'userManagement' | 'bookingManagement' = 'userManagement') => {
        setSelectedUser(user);
        setUserSubView('resetPassword');
        setActiveSection(origin === 'bookingManagement' ? activeSection : 'user-management');
        setUserNavOrigin(origin);
    };

    const handleUserSubViewClose = () => {
        if (userNavOrigin === 'bookingManagement') {
            setActiveSection('booking-management');
        } else {
            setActiveSection('user-management');
        }
        setSelectedUser(null);
        setUserSubView('list');
        setUserNavOrigin(null);
    };

    const handleUserPhotoUpload = (file: File, userId: string) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setAllUsers(prevUsers => prevUsers.map(u => u.id === userId ? { ...u, profilePhotoUrl: reader.result as string } : u));
            setSelectedUser(prev => prev ? { ...prev, profilePhotoUrl: reader.result as string } : null);
        };
        reader.readAsDataURL(file);
    };

    const handleSelectBusinessForEdit = (business: Business, origin: 'businessManagement' | 'bookingManagement' = 'businessManagement') => {
        setSelectedBusiness(business);
        setBusinessSubView('editProfile');
        setActiveSection(origin === 'bookingManagement' ? activeSection : 'business-management');
        setBusinessNavOrigin(origin);
    };
    const handleManageBusinessStaff = (business: Business) => {
        setSelectedBusiness(business);
        setBusinessSubView('manageStaff');
        setActiveSection('business-management');
    };
    const handleViewBusinessActivity = (business: Business, origin: 'businessManagement' | 'bookingManagement' = 'businessManagement') => {
        setSelectedBusiness(business);
        setBusinessSubView('viewActivity');
        setActiveSection(origin === 'bookingManagement' ? activeSection : 'business-management');
        setBusinessNavOrigin(origin);
    };
    const handleResetBusinessPassword = (business: Business, origin: 'businessManagement' | 'bookingManagement' = 'businessManagement') => {
        setSelectedBusiness(business);
        setBusinessSubView('resetPassword');
        setActiveSection(origin === 'bookingManagement' ? activeSection : 'business-management');
        setBusinessNavOrigin(origin);
    };
    const handleManageBusinessServiceOffers = (business: Business) => {
        setSelectedBusiness(business);
        setBusinessSubView('manageServiceOffers');
        setActiveSection('business-management');
    };
    const handleManageBusinessClients = (business: Business) => {
        setSelectedBusiness(business);
        setBusinessSubView('manageClients');
        setActiveSection('business-management');
    };
    const handleManageBusinessPortfolio = (business: Business) => {
        setSelectedBusiness(business);
        setBusinessSubView('managePortfolio');
        setActiveSection('business-management');
    };
    const handleViewBusinessReviews = (business: Business) => {
        setSelectedBusiness(business);
        setBusinessSubView('viewReviews');
        setActiveSection('business-management');
    };
    const handleBusinessSubViewClose = () => {
        if (businessNavOrigin === 'bookingManagement') {
            setActiveSection('booking-management');
        } else {
            setActiveSection('business-management');
        }
        setSelectedBusiness(null);
        setBusinessSubView('list');
        setBusinessNavOrigin(null);
    };

    const handleBusinessCoverPhotoUpload = (file: File, businessId: string) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setAllBusinesses(prevBusinesses => prevBusinesses.map(b => {
                if (b.id === businessId) {
                    if ((b.coverPhotoUrls?.length || 0) < 5) {
                        return { ...b, coverPhotoUrls: [...(b.coverPhotoUrls || []), reader.result as string] };
                    } else {
                        alert('Maximum 5 cover photos allowed.');
                    }
                }
                return b;
            }));
            setSelectedBusiness(prev => {
                if (prev && (prev.coverPhotoUrls?.length || 0) < 5) {
                    return { ...prev, coverPhotoUrls: [...(prev.coverPhotoUrls || []), reader.result as string] };
                }
                return prev;
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSaveBusinessStaff = (businessId: string, updatedStaff: StaffMember[]) => {
        setAllBusinesses(prevBusinesses => prevBusinesses.map(b => b.id === businessId ? { ...b, staff: updatedStaff } : b));
        setSelectedBusiness(prev => prev ? { ...prev, staff: updatedStaff } : null);
    };

    const handleBusinessStaffPhotoUpload = (file: File, staffId: string, businessId: string) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setAllBusinesses(prevBusinesses => prevBusinesses.map(b => {
                if (b.id === businessId) {
                    return {
                        ...b,
                        staff: (b.staff || []).map(s => s.id === staffId ? { ...s, profilePhotoUrl: reader.result as string } : s)
                    };
                }
                return b;
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleEditBookingFromMgmt = (booking: Booking) => {
        setSelectedBookingForEdit(booking);
        setActiveSection('booking-management');
    };

    const handleCloseBookingEditor = () => {
        setSelectedBookingForEdit(null);
        setActiveSection('booking-management');
    };

    const getHeaderTitleAndGoBack = () => {
        let titleOverride = undefined;
        let onGoBack = undefined;
        let showBackButton = false;

        if (!isLoggedIn) {
            return { titleOverride: undefined, onGoBack: undefined, showBackButton: false };
        }

        if (isSettingsModalOpen) {
            showBackButton = true;
            onGoBack = handleCloseSettings;
            titleOverride = 'Settings';
        }
        else if (selectedUser && userSubView !== 'list' && (activeSection === 'user-management' || userNavOrigin === 'bookingManagement')) {
            showBackButton = true;
            onGoBack = handleUserSubViewClose;
            switch (userSubView) {
                case 'editProfile': titleOverride = 'Edit User Profile'; break;
                case 'viewActivity': titleOverride = 'User Activity History'; break;
                case 'resetPassword': titleOverride = 'Reset User Password'; break;
            }
        }
        else if (selectedBusiness && businessSubView !== 'list' && (activeSection === 'business-management' || businessNavOrigin === 'bookingManagement')) {
            showBackButton = true;
            onGoBack = handleBusinessSubViewClose;
            switch (businessSubView) {
                case 'editProfile': titleOverride = 'Edit Business Profile'; break;
                case 'manageStaff': titleOverride = 'Manage Business Staff'; break;
                case 'viewActivity': titleOverride = 'Business Activity History'; break;
                case 'resetPassword': titleOverride = 'Reset Business Password'; break;
                case 'manageServiceOffers': titleOverride = 'Manage Service Offers'; break;
                case 'manageClients': titleOverride = 'Manage Business Clients'; break;
                case 'managePortfolio': titleOverride = 'Manage Business Portfolio'; break;
                case 'viewReviews': titleOverride = 'View Business Reviews'; break;
            }
        }
        else if (selectedBookingForEdit) {
            showBackButton = true;
            onGoBack = handleCloseBookingEditor;
            titleOverride = `Edit Booking: ${selectedBookingForEdit.id}`;
        }
        return { titleOverride, onGoBack, showBackButton };
    };

    const { titleOverride, onGoBack, showBackButton } = getHeaderTitleAndGoBack();


    const renderContent = () => {
        if (!isLoggedIn) {
            return <LoginScreen onLogin={handleLogin} loginError={loginError} />;
        }

        if (selectedUser && userSubView !== 'list') {
            if (userSubView === 'editProfile') {
                return (
                    <UserProfileEditor
                        user={selectedUser}
                        onClose={handleUserSubViewClose}
                        onSave={(updatedUser) => {
                            setAllUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
                            setSelectedUser(updatedUser);
                            handleUserSubViewClose();
                        }}
                        uniqueCities={Array.from(new Set(allUsers.map(u => u.city))).sort()}
                        uniqueGenders={GENDER_OPTIONS}
                        onViewActivity={(user) => handleViewUserActivity(user, userNavOrigin || 'userManagement')}
                        onResetPassword={(user) => handleResetUserPassword(user, userNavOrigin || 'userManagement')}
                        onUploadProfilePhoto={handleUserPhotoUpload}
                    />
                );
            } else if (userSubView === 'viewActivity') {
                return <UserActivityViewer user={selectedUser} onClose={handleUserSubViewClose} />;
            } else if (userSubView === 'resetPassword') {
                return <UserPasswordReset user={selectedUser} onClose={handleUserSubViewClose} />;
            }
        }
        if (selectedBusiness && businessSubView !== 'list') {
            if (businessSubView === 'editProfile') {
                return (
                    <BusinessProfileEditor
                        business={selectedBusiness}
                        onClose={handleBusinessSubViewClose}
                        onSave={(updatedBusiness) => {
                            setAllBusinesses(prevBusinesses => prevBusinesses.map(b => b.id === updatedBusiness.id ? updatedBusiness : b));
                            setSelectedBusiness(updatedBusiness);
                            handleBusinessSubViewClose();
                        }}
                        uniqueCities={Array.from(new Set(allBusinesses.map(b => b.city))).sort()}
                        uniqueActivities={businessActivities.filter(a => a !== 'All')}
                        onViewStaff={handleManageBusinessStaff}
                        onViewActivity={(business) => handleViewBusinessActivity(business, businessNavOrigin || 'businessManagement')}
                        onResetPassword={(business) => handleResetBusinessPassword(business, businessNavOrigin || 'businessManagement')}
                        onUploadCoverPhoto={handleBusinessCoverPhotoUpload}
                        onManageServiceOffers={handleManageBusinessServiceOffers}
                        onManageClients={handleManageBusinessClients}
                        onManagePortfolio={handleManageBusinessPortfolio}
                        onViewReviews={handleViewBusinessReviews}
                    />
                );
            } else if (businessSubView === 'manageStaff') {
                return (
                    <BusinessStaffManager
                        business={selectedBusiness}
                        onClose={handleBusinessSubViewClose}
                        onSaveStaff={handleSaveBusinessStaff}
                        onUploadStaffMedia={handleBusinessStaffPhotoUpload}
                    />
                );
            } else if (businessSubView === 'viewActivity') {
                return <BusinessActivityViewer business={selectedBusiness} onClose={handleBusinessSubViewClose} />;
            } else if (businessSubView === 'resetPassword') {
                return <BusinessPasswordReset business={selectedBusiness} onClose={handleBusinessSubViewClose} />;
            } else if (businessSubView === 'manageServiceOffers') {
                return (
                    <BusinessServiceOffersManager
                        business={selectedBusiness}
                        onClose={handleBusinessSubViewClose}
                        onSaveOffers={(updatedOffers) => {
                            setAllBusinesses(prevBusinesses => prevBusinesses.map(b => b.id === selectedBusiness.id ? { ...b, serviceOffers: updatedOffers } : b));
                            setSelectedBusiness(prev => prev ? { ...prev, serviceOffers: updatedOffers } : null);
                        }}
                    />
                );
            } else if (businessSubView === 'manageClients') {
                return (
                    <BusinessClientManager
                        business={selectedBusiness}
                        onClose={handleBusinessSubViewClose}
                        onSaveClients={(updatedClients) => {
                            setAllBusinesses(prevBusinesses => prevBusinesses.map(b => b.id === selectedBusiness.id ? { ...b, clients: updatedClients } : b));
                            setSelectedBusiness(prev => prev ? { ...prev, clients: updatedClients } : null);
                        }}
                    />
                );
            } else if (businessSubView === 'managePortfolio') {
                return (
                    <BusinessPortfolioManager
                        business={selectedBusiness}
                        onClose={handleBusinessSubViewClose}
                        onSavePortfolio={(updatedPortfolio) => {
                            setAllBusinesses(prevBusinesses => prevBusinesses.map(b => b.id === selectedBusiness.id ? { ...b, portfolio: updatedPortfolio } : b));
                            setSelectedBusiness(prev => prev ? { ...prev, portfolio: updatedPortfolio } : null);
                        }}
                    />
                );
            } else if (businessSubView === 'viewReviews') {
                return (
                    <BusinessReviewsViewer
                        business={selectedBusiness}
                        onClose={handleBusinessSubViewClose}
                        onSaveReviews={(updatedReviews) => {
                            setAllBusinesses(prevBusinesses => prevBusinesses.map(b => b.id === selectedBusiness.id ? { ...b, customerReviews: updatedReviews } : b));
                            setSelectedBusiness(prev => prev ? { ...prev, customerReviews: updatedReviews } : null);
                        }}
                    />
                );
            }
        }

        if (selectedBookingForEdit) {
            return (
                <BookingEditor
                    booking={selectedBookingForEdit}
                    onClose={handleCloseBookingEditor}
                    onSave={(updatedBooking) => {
                        setAllBusinesses(prev => prev.map(biz => {
                            if (biz.id === updatedBooking.businessId && biz.clients) {
                                return {
                                    ...biz,
                                    clients: biz.clients.map(client => client.id === updatedBooking.clientId ? { ...client, lastVisitDate: updatedBooking.date, upcomingVisitDate: updatedBooking.status === 'Confirmed' ? updatedBooking.date : client.upcomingVisitDate } : client)
                                };
                            }
                            return biz;
                        }));
                        handleCloseBookingEditor();
                    }}
                    onCancelBooking={(bookingId) => {
                        alert(`Booking ${bookingId} has been cancelled. (Placeholder)`);
                        handleCloseBookingEditor();
                    }}
                    onRefundBooking={(bookingId) => {
                        alert(`Refund initiated for booking ${bookingId}! (Placeholder)`);
                        handleCloseBookingEditor();
                    }}
                    onViewUserProfile={handleSelectUserForEdit}
                    onViewBusinessProfile={handleSelectBusinessForEdit}
                    allUsers={allUsers}
                    allBusinesses={allBusinesses}
                />
            );
        }

        switch (activeSection) {
            case 'user-management':
                return (
                    <UserManagement
                        users={allUsers}
                        setUsers={setAllUsers}
                        onEditUser={handleSelectUserForEdit}
                        onViewActivity={handleViewUserActivity}
                        onResetPassword={handleResetUserPassword}
                    />
                );
            case 'business-management':
                return (
                    <BusinessManagement
                        businesses={allBusinesses}
                        setBusinesses={setAllBusinesses}
                        onEditBusiness={handleSelectBusinessForEdit}
                        onManageStaff={handleManageBusinessStaff}
                        onViewActivity={handleViewBusinessActivity}
                        onResetPassword={handleResetBusinessPassword}
                        onManageServiceOffers={handleManageBusinessServiceOffers}
                        onManageClients={handleManageBusinessClients}
                        onManagePortfolio={handleManageBusinessPortfolio}
                        onViewReviews={handleViewBusinessReviews}
                    />
                );
            case 'booking-management':
                return (
                    <BookingManagement
                        allBusinesses={allBusinesses}
                        allUsers={allUsers}
                        onViewUserProfile={handleSelectUserForEdit}
                        onViewBusinessProfile={handleSelectBusinessForEdit}
                        onEditBookingFromMgmt={handleEditBookingFromMgmt}
                        onCloseBookingEditor={handleCloseBookingEditor}
                    />
                );
            case 'payments-transactions':
                return <PaymentsTransactions />;
            case 'reviews-ratings-reports':
                return <ReviewsRatingsReports />;
            case 'analytics-dashboard':
                return <AnalyticsDashboard />;
            case 'notifications-communication':
                return <NotificationsCommunication />;
            case 'platform-configuration':
                return <PlatformConfiguration />;
            case 'support-issue-resolution':
                return <SupportIssueResolution />;
            case 'developer-maintenance':
                return <DeveloperMaintenanceTools />;
            default:
                return <p>Select a section from the sidebar.</p>;
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
            {isLoggedIn && (
                <Sidebar activeSection={activeSection} onSelectSection={setActiveSection} onOpenSettings={handleOpenSettings} onLogout={handleLogout} />
            )}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {isLoggedIn && (
                    <Header
                        currentSectionTitle={sectionNames[activeSection]}
                        titleOverride={titleOverride}
                        onGoBack={onGoBack}
                        showBackButton={showBackButton}
                    />
                )}
                <ContentArea>
                    {renderContent()}
                </ContentArea>
            </div>
            {isLoggedIn && (
                <SettingsModal
                    isOpen={isSettingsModalOpen}
                    onClose={handleCloseSettings}
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={toggleDarkMode}
                    adminCredentials={adminCredentials}
                    adminPassword={adminPassword}
                    onUpdateAdminLogin={handleUpdateAdminLogin}
                    onUpdateAdminPassword={handleUpdateAdminPassword}
                    onResetAdminPasswordRequest={handleResetAdminPasswordRequest}
                />
            )}
        </div>
    );
};
