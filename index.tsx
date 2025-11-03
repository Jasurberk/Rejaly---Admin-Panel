import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// Helper for unique IDs (not robust, for demo purposes)
let nextId = 1;
const generateId = () => `item-${nextId++}`;

// Helper to generate a 5-digit number
const generateFiveDigitNumber = () => Math.floor(10000 + Math.random() * 90000);

// Helper to generate business ID based on activity
const generateBusinessId = (activity: string) => {
    let prefixLetter = 'X'; // Default for 'Others'
    switch (activity.toLowerCase()) {
        case 'barbershop':
            prefixLetter = 'B';
            break;
        case 'hair and make up salon':
            prefixLetter = 'G';
            break;
        case 'nail salon':
            prefixLetter = 'N';
            break;
        case 'football field rentals':
            prefixLetter = 'F';
            break;
        case 'dental clinics':
            prefixLetter = 'D';
            break;
        case 'videogaming clubs':
            prefixLetter = 'V';
            break;
        case 'spa':
            prefixLetter = 'S';
            break;
        default:
            prefixLetter = 'X';
    }
    return `${prefixLetter}-${generateFiveDigitNumber()}`;
};

// Helper to generate a random date for "Date Added"
const getRandomDate = (start: Date, end: Date) => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

// Helper to generate a random city
const getRandomCity = () => {
    const cities = ['Tashkent', 'Samarkand', 'Bukhara', 'Khiva', 'Andijan', 'Fergana'];
    return cities[Math.floor(Math.random() * cities.length)];
};

// Define core gender options for consistency
const GENDER_OPTIONS = ['Male', 'Female', 'Prefer not to say'];

// Helper to generate a random gender from the defined options
const getRandomGender = () => {
    return GENDER_OPTIONS[Math.floor(Math.random() * GENDER_OPTIONS.length)];
};

// Helper to generate a random birthday
const getRandomBirthday = () => {
    const start = new Date(1970, 0, 1);
    const end = new Date(2005, 11, 31);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

// Helper to generate a random address
const getRandomAddress = () => {
    const streetNames = ['Main St', 'Oak Ave', 'Pine Ln', 'Elm Rd', 'Maple Dr'];
    const streetTypes = ['St', 'Ave', 'Rd', 'Ln', 'Dr'];
    const buildingNumbers = Math.floor(Math.random() * 900) + 100;
    const apartmentNumber = Math.random() > 0.5 ? ` Apt ${Math.floor(Math.random() * 100) + 1}` : '';
    return `${buildingNumbers} ${streetNames[Math.floor(Math.random() * streetNames.length)]}${apartmentNumber}`;
};

// Helper to generate a random favorite service type
const getRandomFavoriteServiceType = () => {
    const services = ['Haircut', 'Manicure', 'Facial', 'Massage', 'Barbershop', 'Pedicure', 'Gaming Session'];
    return services[Math.floor(Math.random() * services.length)];
};

// Helper to generate random first names
const getRandomFirstName = () => {
    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
    return names[Math.floor(Math.random() * names.length)];
};

// Helper to generate random last names
const getRandomLastName = () => {
    const names = ['Smith', 'Johnson', 'Brown', 'Prince', 'Davis', 'White', 'Miller', 'Jones'];
    return names[Math.floor(Math.random() * names.length)];
};

// Helper to generate random phone numbers
const getRandomPhoneNumber = () => {
    const prefix = ['111', '444', '777', '123', '987', '555'];
    const middle = Math.floor(100 + Math.random() * 900);
    const last = Math.floor(1000 + Math.random() * 9000);
    return `${prefix[Math.floor(Math.random() * prefix.length)]}-${middle}-${last}`;
};

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: 'Active' | 'Inactive';
    flagged: boolean;
    city: string;
    gender: string;
    birthday: string;
    address?: string;
    favoriteServiceType?: string;
    dateJoined: string;
    // For demonstration, not for real-world storage
    passwordHash?: string; // Placeholder for security, never stored in plain text
    profilePhotoUrl?: string; // New field for profile photo
}

// Helper to generate a full random user
const generateRandomUser = (): User => {
    const firstName = getRandomFirstName();
    const lastName = getRandomLastName();
    const city = getRandomCity();
    const gender = getRandomGender();
    const dateJoined = getRandomDate(new Date(2022, 0, 1), new Date());
    return {
        id: generateId(),
        firstName,
        lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
        phone: getRandomPhoneNumber(),
        status: Math.random() > 0.8 ? 'Inactive' : 'Active',
        flagged: Math.random() > 0.9,
        city,
        gender,
        birthday: getRandomBirthday(),
        address: getRandomAddress(),
        favoriteServiceType: getRandomFavoriteServiceType(),
        dateJoined,
        passwordHash: 'dummy_user_hash', // In a real app, this would be a secure hash
        profilePhotoUrl: undefined,
    };
};

interface StaffMember {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    phone: string;
    active: boolean;
    profilePhotoUrl?: string;
}

const mockStaffProfileImageUrls: string[] = [
    'https://via.placeholder.com/80/FF5733/FFFFFF?text=Staff1',
    'https://via.placeholder.com/80/33FF57/FFFFFF?text=Staff2',
    'https://via.placeholder.com/80/3357FF/FFFFFF?text=Staff3',
    'https://via.placeholder.com/80/F5FF33/000000?text=Staff4',
    'https://via.placeholder.com/80/FF33F5/FFFFFF?text=Staff5',
];

const getRandomStaffMember = (businessName: string): StaffMember => {
    const firstName = getRandomFirstName();
    const lastName = getRandomLastName();
    const roles = ['Stylist', 'Barber', 'Technician', 'Manager', 'Assistant'];
    return {
        id: generateId(),
        firstName,
        lastName,
        role: roles[Math.floor(Math.random() * roles.length)],
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${businessName.toLowerCase().replace(/\s/g, '')}.com`,
        phone: getRandomPhoneNumber(),
        active: Math.random() > 0.2,
        profilePhotoUrl: Math.random() > 0.5 ? mockStaffProfileImageUrls[Math.floor(Math.random() * mockStaffProfileImageUrls.length)] : undefined,
    };
};

interface ServiceOffer {
    id: string;
    title: string;
    description: string;
    price: number; // Stored in smallest currency unit (e.g., cents) or just as number for simplicity
    durationMinutes: number;
    discountPercentage?: number; // 0-100
    discountAmount?: number; // Absolute discount value
    discountStartDate?: string; // YYYY-MM-DD
    discountEndDate?: string; // YYYY-MM-DD
}

interface Client {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone: string;
    lastVisitDate?: string; // YYYY-MM-DD
    upcomingVisitDate?: string; // YYYY-MM-DD
}

interface PortfolioItem {
    id: string;
    imageUrl: string;
    caption: string;
}

interface CustomerReview {
    id: string;
    clientId: string; // ID of the user who left the review
    clientName: string; // Name of the user (for display)
    rating: number; // 1-5 stars
    comment: string;
    date: string; // YYYY-MM-DD
    status: 'Active' | 'Flagged' | 'Hidden';
    response?: {
        adminId: string; // ID of the admin who responded
        adminName: string;
        text: string;
        date: string;
    };
}

interface Booking {
    id: string;
    businessId: string; // New field
    client: string;
    business: string; // Business Name
    city: string; // New field
    service: string;
    date: string;
    time: string;
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' | 'No-show';
}

interface Business {
    id: string;
    name: string;
    activity: string;
    address: string;
    city: string;
    status: 'Active' | 'Inactive' | 'Pending';
    reviews: number; // Placeholder for aggregate rating
    dateAdded: string;
    email: string; // New: for contact, password reset
    phone: string; // New: for contact, password reset
    description?: string; // New: additional info
    website?: string; // New: business website
    logoUrl?: string; // New: business logo
    staff?: StaffMember[]; // List of staff members
    passwordHash?: string; // For demonstration, not real storage
    coverPhotoUrls?: string[]; // New: list of cover photos
    serviceOffers?: ServiceOffer[]; // New: list of service offers
    clients?: Client[]; // New: list of clients
    portfolio?: PortfolioItem[]; // New: list of portfolio items
    customerReviews?: CustomerReview[]; // New: list of customer reviews
}

// Helper for mock cover photo URLs
const mockCoverPhotoUrls: string[] = [
    'https://via.placeholder.com/150/FF5733/FFFFFF?text=Photo1',
    'https://via.placeholder.com/150/33FF57/FFFFFF?text=Photo2',
    'https://via.placeholder.com/150/3357FF/FFFFFF?text=Photo3',
    'https://via.placeholder.com/150/F5FF33/000000?text=Photo4',
    'https://via.placeholder.com/150/FF33F5/FFFFFF?text=Photo5',
];

// Helper for mock portfolio images
const mockPortfolioImageUrls: string[] = [
    'https://via.placeholder.com/300/FF5733/FFFFFF?text=Style1',
    'https://via.placeholder.com/300/33FF57/FFFFFF?text=Style2',
    'https://via.placeholder.com/300/3357FF/FFFFFF?text=Result1',
    'https://via.placeholder.com/300/F5FF33/000000?text=Work2',
    'https://via.placeholder.com/300/FF33F5/FFFFFF?text=BeforeAfter',
];


// Helper to generate a random service offer for a given activity
const generateRandomServiceOffer = (activity: string): ServiceOffer => {
    const serviceTemplates: { [key: string]: { title: string; description: string; basePrice: number; duration: number }[] } = {
        'Barbershop': [
            { title: 'Haircut', description: 'Standard men\'s haircut', basePrice: 25, duration: 30 },
            { title: 'Beard Trim', description: 'Precision beard shaping and trimming', basePrice: 15, duration: 15 },
            { title: 'Hair & Beard Trim', description: 'Full haircut and beard service', basePrice: 35, duration: 45 },
            { title: 'Head Shave', description: 'Close head shave with hot towel', basePrice: 20, duration: 25 },
        ],
        'Hair and Make Up Salon': [
            { title: 'Women\'s Haircut', description: 'Styling, wash, and cut', basePrice: 60, duration: 60 },
            { title: 'Hair Coloring', description: 'Full hair color, includes wash and blow dry', basePrice: 120, duration: 120 },
            { title: 'Makeup Application', description: 'Professional makeup for special occasions', basePrice: 80, duration: 45 },
            { title: 'Updo', description: 'Elegant updo for events', basePrice: 75, duration: 60 },
        ],
        'Nail Salon': [
            { title: 'Manicure', description: 'Classic manicure with polish', basePrice: 30, duration: 40 },
            { title: 'Pedicure', description: 'Relaxing pedicure with foot massage', basePrice: 45, duration: 50 },
            { title: 'Gel Manicure', description: 'Long-lasting gel polish application', basePrice: 40, duration: 55 },
        ],
        'Football Field Rentals': [
            { title: '1 Hour Rental', description: 'Full size football field rental for 1 hour', basePrice: 100, duration: 60 },
            { title: '2 Hour Rental', description: 'Full size football field rental for 2 hours', basePrice: 180, duration: 120 },
        ],
        'Dental Clinics': [
            { title: 'Check-up & Cleaning', description: 'Comprehensive dental examination and cleaning', basePrice: 80, duration: 45 },
            { title: 'Teeth Whitening', description: 'Professional in-office teeth whitening', basePrice: 300, duration: 90 },
        ],
        'Videogaming Clubs': [
            { title: '1 Hour PC Rental', description: 'High-end PC rental for 1 hour', basePrice: 10, duration: 60 },
            { title: 'All Day Pass', description: 'Unlimited PC access for a full day', basePrice: 40, duration: 480 },
        ],
        'Spa': [
            { title: 'Relaxation Massage', description: 'Full body relaxation massage', basePrice: 90, duration: 60 },
            { title: 'Hot Stone Massage', description: 'Therapeutic massage with heated stones', basePrice: 120, duration: 75 },
            { title: 'Facial Treatment', description: 'Customized facial for skin rejuvenation', basePrice: 70, duration: 60 },
        ],
        'Others': [
            { title: 'Consultation', description: 'General consultation service', basePrice: 50, duration: 30 },
            { title: 'Special Service', description: 'Customizable special service', basePrice: 100, duration: 60 },
        ]
    };

    const templates = serviceTemplates[activity] || serviceTemplates['Others'];
    const template = templates[Math.floor(Math.random() * templates.length)];

    const hasDiscount = Math.random() > 0.7; // 30% chance for a discount
    let discount: Partial<ServiceOffer> = {};
    if (hasDiscount) {
        if (Math.random() > 0.5) { // 50% chance for percentage discount
            discount.discountPercentage = Math.floor(Math.random() * 20) + 5; // 5-25% discount
            discount.discountAmount = undefined;
        } else { // 50% chance for fixed amount discount
            discount.discountAmount = Math.floor(Math.random() * 10) + 5; // $5-15 discount
            discount.discountPercentage = undefined;
        }
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 7); // Discount ends in 1-4 weeks
        discount.discountStartDate = today.toISOString().split('T')[0];
        discount.discountEndDate = futureDate.toISOString().split('T')[0];
    }

    return {
        id: generateId(),
        title: template.title,
        description: template.description,
        price: template.basePrice,
        durationMinutes: template.duration,
        ...discount,
    };
};

const generateRandomServiceOffers = (activity: string, count: number): ServiceOffer[] => {
    return Array.from({ length: count }, () => generateRandomServiceOffer(activity));
};

const generateRandomClient = (): Client => {
    const firstName = getRandomFirstName();
    const lastName = getRandomLastName();
    const hasEmail = Math.random() > 0.3; // 70% chance to have an email
    const hasUpcomingVisit = Math.random() > 0.6; // 40% chance for an upcoming visit

    const lastVisitDate = getRandomDate(new Date(2023, 0, 1), new Date());
    let upcomingVisitDate: string | undefined;
    if (hasUpcomingVisit) {
        upcomingVisitDate = getRandomDate(new Date(), new Date(new Date().getFullYear(), new Date().getMonth() + 3, 0));
    }

    return {
        id: generateId(),
        firstName,
        lastName,
        email: hasEmail ? `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com` : undefined,
        phone: getRandomPhoneNumber(),
        lastVisitDate,
        upcomingVisitDate,
    };
};

const generateRandomClients = (count: number): Client[] => {
    return Array.from({ length: count }, generateRandomClient);
};

const getRandomReviewComment = (rating: number): string => {
    const comments = {
        1: ['Terrible experience, would not recommend.', 'Very disappointed with the service.', 'Awful, avoid this place.'],
        2: ['Not great, could be much better.', 'Mediocre service, left feeling unsatisfied.', 'Below average.'],
        3: ['It was okay, nothing special.', 'Decent enough, but room for improvement.', 'Average experience.'],
        4: ['Good service, happy with the outcome.', 'Enjoyable visit, might return.', 'Pretty good!'],
        5: ['Excellent! Highly recommend!', 'Fantastic experience, will definitely be back!', 'Best in town, superb service!'],
    };
    const options = comments[rating] || comments[3]; // Fallback to 3-star comments
    return options[Math.floor(Math.random() * options.length)];
};

const generateRandomCustomerReview = (): CustomerReview => {
    const firstName = getRandomFirstName();
    const lastName = getRandomLastName();
    const rating = Math.floor(Math.random() * 5) + 1; // 1 to 5
    const comment = getRandomReviewComment(rating);
    const date = getRandomDate(new Date(2023, 6, 1), new Date()); // Reviews from last year

    return {
        id: generateId(),
        clientId: generateId(), // Mock client ID
        clientName: `${firstName} ${lastName}`,
        rating,
        comment,
        date,
        status: Math.random() > 0.9 ? 'Flagged' : 'Active', // 10% flagged
        response: Math.random() > 0.7 ? { // 30% have a response
            adminId: 'admin-001',
            adminName: 'Admin Joe',
            text: 'Thank you for your feedback! We appreciate your business.',
            date: getRandomDate(new Date(date), new Date()),
        } : undefined,
    };
};


// Helper to generate a full random business
const generateRandomBusiness = (activity: string): Business => {
    const businessName = `${activity.split(' ')[0]} ${Math.random() > 0.5 ? 'Pro' : 'Hub'}`;
    const city = getRandomCity();
    const dateAdded = getRandomDate(new Date(2023, 0, 1), new Date());
    const email = `${businessName.toLowerCase().replace(/\s/g, '')}@example.com`;
    const phone = getRandomPhoneNumber();
    const description = `A leading ${activity} in ${city}, offering top-notch services with experienced professionals.`;
    const website = `www.${businessName.toLowerCase().replace(/\s/g, '')}.com`;

    const staffCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 staff members
    const staff = Array.from({ length: staffCount }, () => getRandomStaffMember(businessName));

    const numCoverPhotos = Math.floor(Math.random() * 3) + 1; // 1 to 3 initial cover photos
    const coverPhotoUrls = Array.from({ length: numCoverPhotos }, (_, i) => mockCoverPhotoUrls[i % mockCoverPhotoUrls.length]);

    const numServices = Math.floor(Math.random() * 3) + 2; // 2 to 4 services
    const serviceOffers = generateRandomServiceOffers(activity, numServices);

    const numClients = Math.floor(Math.random() * 5) + 3; // 3 to 7 clients
    const clients = generateRandomClients(numClients);

    const numPortfolioItems = Math.floor(Math.random() * 4) + 2; // 2 to 5 portfolio items
    const portfolio: PortfolioItem[] = Array.from({ length: numPortfolioItems }, (_, i) => ({
        id: generateId(),
        imageUrl: mockPortfolioImageUrls[i % mockPortfolioImageUrls.length],
        caption: `A stylish ${activity.toLowerCase()} result from our expert.`,
    }));

    const numCustomerReviews = Math.floor(Math.random() * 7) + 3; // 3 to 9 reviews
    const customerReviews = Array.from({ length: numCustomerReviews }, generateRandomCustomerReview);


    return {
        id: generateBusinessId(activity),
        name: businessName,
        activity,
        address: getRandomAddress(),
        city,
        status: ['Active', 'Pending', 'Inactive'][Math.floor(Math.random() * 3)] as Business['status'],
        reviews: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
        dateAdded,
        email,
        phone,
        description,
        website,
        logoUrl: undefined,
        staff,
        passwordHash: 'dummy_business_hash',
        coverPhotoUrls,
        serviceOffers,
        clients,
        portfolio,
        customerReviews,
    };
};


// --- Core UI Components ---

const Header: React.FC<{ currentSectionTitle: string; titleOverride?: string; onGoBack?: () => void; showBackButton?: boolean }> = ({ currentSectionTitle, titleOverride, onGoBack, showBackButton }) => (
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

const Sidebar: React.FC<{ activeSection: string; onSelectSection: (section: string) => void; onToggleDarkMode: () => void; isDarkMode: boolean }> = ({ activeSection, onSelectSection, onToggleDarkMode, isDarkMode }) => {
    const sections = [
        { id: 'user-management', name: '🧍‍♂️ User Management' },
        { id: 'business-management', name: '💈 Business Management' },
        { id: 'booking-management', name: '📅 Booking Management' },
        { id: 'payments-transactions', name: '💰 Payments & Transactions' },
        { id: 'reviews-ratings-reports', name: '💬 Reviews & Reports' },
        { id: 'analytics-dashboard', name: '📊 Analytics Dashboard' },
        { id: 'notifications-communication', name: '⚡ Notifications' },
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
            height: '100vh', // Ensure it takes full viewport height
            overflowY: 'hidden', // Prevent overall sidebar scrolling
        }}>
            {/* Rejaly.uz Admin Panel Header */}
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

            {/* Scrollable sections list */}
            <div style={{
                flexGrow: 1, // Allows this div to take up available space
                overflowY: 'auto', // Enables scrolling for the menu items
                padding: '20px 0', // Apply vertical padding here
                // Hide scrollbar for Webkit browsers
                // scrollbarWidth: 'none', /* Firefox */
                // msOverflowStyle: 'none',  /* IE and Edge */
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

            {/* Dark Mode and Logout at the bottom */}
            <div style={{
                padding: '20px',
                borderTop: '1px solid var(--border-color)',
                marginTop: 'auto',
                flexShrink: 0, // Prevent footer from shrinking
            }}>
                <button onClick={onToggleDarkMode} style={{
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
                    {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
                <button
                    onClick={() => console.log('Logout clicked')} // Placeholder for logout functionality
                    style={{
                        width: '100%',
                        background: 'none',
                        border: '1px solid var(--border-color)',
                        color: 'var(--danger-color)', // Logout button often has a distinct color
                        padding: '10px 12px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontSize: '0.9em',
                        transition: 'background-color 0.2s, border-color 0.2s',
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

const ContentArea: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <main style={{
        flexGrow: 1,
        padding: '20px',
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)',
        overflowY: 'auto', // Allow content area to scroll
        // scrollbarWidth: 'none', /* Firefox */
        // msOverflowStyle: 'none',  /* IE and Edge */
    }}>
        {/* Hide scrollbar for Webkit browsers */}
        {/* <style>{`
            main::-webkit-scrollbar {
                display: none;
            }
        `}</style> */}
        {children}
    </main>
);

const Card: React.FC<{ title?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ title, children, style }) => (
    <div style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '10px', /* Slightly softer edges */
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)', /* Slightly stronger shadow */
        ...style
    }}>
        {title && <h3 style={{ marginTop: 0, marginBottom: '15px', color: 'var(--text-color)' }}>{title}</h3>}
        {children}
    </div>
);


interface UploadMediaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (file: File) => void;
    title: string;
    currentImageUrl?: string;
}

const UploadMediaModal: React.FC<UploadMediaModalProps> = ({ isOpen, onClose, onUpload, title, currentImageUrl }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);

    useEffect(() => {
        setPreviewUrl(currentImageUrl || null);
    }, [currentImageUrl]);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setSelectedFile(null);
            setPreviewUrl(currentImageUrl || null);
        }
    };

    const handleUploadClick = () => {
        if (selectedFile) {
            onUpload(selectedFile);
            setSelectedFile(null);
            setPreviewUrl(null); // Clear preview after upload
            onClose();
        } else {
            alert('Please select a file to upload.');
        }
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
            zIndex: 1002,
            backdropFilter: 'blur(2px)'
        }}>
            <Card style={{
                width: '90%',
                maxWidth: '400px',
                padding: '30px',
                textAlign: 'center',
            }}>
                <h3 style={{ marginTop: 0, marginBottom: '20px', color: 'var(--text-color)' }}>{title}</h3>
                {previewUrl && (
                    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                        <img src={previewUrl} alt="Preview" style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }} />
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ marginBottom: '20px', display: 'block', width: '100%', color: 'var(--text-color)' }}
                    aria-label="Select file to upload"
                />
                {selectedFile && (
                    <p style={{ fontSize: '0.9em', opacity: 0.8, marginBottom: '20px' }}>Selected: {selectedFile.name}</p>
                )}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button className="btn-secondary" onClick={onClose} aria-label="Cancel upload">Cancel</button>
                    <button onClick={handleUploadClick} disabled={!selectedFile} aria-label="Upload selected file">Upload</button>
                </div>
            </Card>
        </div>
    );
};


interface UserProfileEditorProps {
    user: User;
    onClose: () => void;
    onSave: (updatedUser: User) => void;
    uniqueCities: string[];
    uniqueGenders: string[];
    onViewActivity: (user: User) => void;
    onResetPassword: (user: User) => void;
    onUploadProfilePhoto: (file: File, userId: string) => void; // Renamed
}

const UserProfileEditor: React.FC<UserProfileEditorProps> = ({ user, onClose, onSave, uniqueCities, uniqueGenders, onViewActivity, onResetPassword, onUploadProfilePhoto }) => {
    const [formData, setFormData] = useState<User>(user);
    const [isUploadMediaModalOpen, setIsUploadMediaModalOpen] = useState(false);

    useEffect(() => {
        setFormData(user);
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    const handlePhotoUpload = (file: File) => {
        onUploadProfilePhoto(file, user.id); // Notify parent of actual upload event
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
            maxWidth: '900px', // Restrict max width to prevent stretching
            margin: '0 auto',   // Center the editor
            height: 'fit-content',
            overflowY: 'auto',
            boxSizing: 'border-box', // Ensure padding is included in width
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '25px' }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3em',
                    color: 'var(--primary-color)',
                    marginBottom: '10px',
                    overflow: 'hidden',
                    border: '2px solid var(--primary-color)'
                }} aria-label="User profile photo placeholder">
                    {formData.profilePhotoUrl ? (
                        <img src={formData.profilePhotoUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        formData.firstName ? formData.firstName.charAt(0).toUpperCase() : '👤'
                    )}
                </div>
                <button className="btn-secondary" onClick={() => setIsUploadMediaModalOpen(true)} style={{ fontSize: '0.8em', padding: '5px 10px' }}>Upload Photo</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px 20px' }}> {/* Responsive columns, reduced gap-row */}
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="firstName" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} style={{ width: '100%' }} aria-label="First Name" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="lastName" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Last Name:</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} style={{ width: '100%' }} aria-label="Last Name" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="gender" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Gender:</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange} style={{ width: '100%' }} aria-label="Gender">
                        {uniqueGenders.map(gender => (<option key={gender} value={gender}>{gender}</option>))}
                    </select>
                </div>
                {/* Second Row */}
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%' }} aria-label="Email" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="phone" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Phone Number:</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%' }} aria-label="Phone Number" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="birthday" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Birthday:</label>
                    <input type="date" id="birthday" name="birthday" value={formData.birthday} onChange={handleChange} style={{ width: '100%' }} aria-label="Birthday" />
                </div>
                {/* Third Row */}
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="city" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>City:</label>
                    <select id="city" name="city" value={formData.city} onChange={handleChange} style={{ width: '100%' }} aria-label="City">
                        {uniqueCities.map(city => (<option key={city} value={city}>{city}</option>))}
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="address" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Address (Optional):</label>
                    <textarea id="address" name="address" value={formData.address || ''} onChange={handleChange} rows={2} style={{ width: '100%' }} aria-label="Address"></textarea>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="favoriteServiceType" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Favorite Service Type (Optional):</label>
                    <input type="text" id="favoriteServiceType" name="favoriteServiceType" value={formData.favoriteServiceType || ''} onChange={handleChange} style={{ width: '100%' }} aria-label="Favorite Service Type" />
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px', gap: '10px' }}>
                <button className="btn-secondary" onClick={() => onViewActivity(user)} style={{ flex: 1 }} aria-label="View User Activity">View Activity</button>
                <button className="btn-danger" onClick={() => onResetPassword(user)} style={{ flex: 1 }} aria-label="Reset User Password">Reset Password</button>
                <button className="btn-secondary" onClick={onClose} style={{ flex: 1 }} aria-label="Go Back to user list">Go Back</button>
                <button onClick={handleSave} style={{ flex: 1 }} aria-label="Save Changes">Save Changes</button>
            </div>
            <UploadMediaModal
                isOpen={isUploadMediaModalOpen}
                onClose={() => setIsUploadMediaModalOpen(false)}
                onUpload={handlePhotoUpload}
                title="Upload Profile Photo"
                currentImageUrl={formData.profilePhotoUrl}
            />
        </div>
    );
};

interface UserPasswordResetProps {
    user: User;
    onClose: () => void;
}

const UserPasswordReset: React.FC<UserPasswordResetProps> = ({ user, onClose }) => {
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
            maxWidth: '400px', // Keep some max-width for smaller forms
            margin: '0 auto', // Center the form
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


interface UserActivityViewerProps {
    user: User;
    onClose: () => void;
}

const UserActivityViewer: React.FC<UserActivityViewerProps> = ({ user, onClose }) => {
    // Mock data for user activity
    const mockBookings = useMemo(() => [
        { id: 'bkg-001', business: 'Stylin\' Barbershop', service: 'Haircut', date: '2024-07-20', status: 'Visited' },
        { id: 'bkg-002', business: 'Nail Nirvana Salon', service: 'Manicure', date: '2024-07-15', status: 'Cancelled' },
        { id: 'bkg-003', business: 'Goal Getters Arena', service: 'Field Rental', date: '2024-06-28', status: 'Visited' },
        { id: 'bkg-004', business: 'Zen Retreat', service: 'Massage', date: '2024-06-10', status: 'No-show' },
    ], []);

    const mockIssues = useMemo(() => [
        { id: 'iss-001', type: 'Booking Conflict', date: '2024-07-16', status: 'Resolved', summary: 'Rescheduled Nail Nirvana appointment' },
        { id: 'iss-002', type: 'Service Complaint', date: '2024-06-11', status: 'Open', summary: 'Complaint about massage quality at Zen Retreat' },
    ], []);

    const mockTickets = useMemo(() => [
        { id: 'tkt-001', subject: 'Account Login Issue', date: '2024-07-01', status: 'Closed' },
        { id: 'tkt-002', subject: 'Feature Request: Dark Mode', date: '2024-05-20', status: 'Closed' },
    ], []);

    const mockReviews = useMemo(() => [
        { id: 'rev-001', business: 'Stylin\' Barbershop', rating: 5, comment: 'Best haircut ever! Always friendly and professional.', date: '2024-07-20' },
        { id: 'rev-002', business: 'Goal Getters Arena', rating: 4, comment: 'Great fields, but changing rooms could be cleaner.', date: '2024-06-29' },
        { id: 'rev-003', business: 'Nail Nirvana Salon', rating: 2, comment: 'Had to cancel last minute, process was a bit slow.', date: '2024-07-15' },
    ], []);


    return (
        <div style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '30px',
            marginBottom: '20px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            width: '100%',
            maxWidth: '700px', // Keep some max-width for readability
            margin: '0 auto', // Center the content
            height: 'fit-content',
            overflowY: 'auto',
            boxSizing: 'border-box',
        }}>
            <h4 style={{ marginTop: 0, marginBottom: '20px', textAlign: 'center', color: 'var(--text-color)' }}>Activity History for {user.firstName} {user.lastName}</h4>
            <p style={{ textAlign: 'center', marginBottom: '20px', opacity: 0.8 }}>Detailed view of user interactions and events.</p>

            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Bookings</h4>
            {mockBookings.length > 0 ? (
                <div style={{ marginBottom: '20px' }}>
                    {mockBookings.map((booking, index) => (
                        <div key={booking.id} style={{
                            borderLeft: `3px solid ${booking.status === 'Visited' ? 'var(--success-color)' : booking.status === 'Cancelled' ? 'var(--danger-color)' : 'var(--primary-color)'}`,
                            paddingLeft: '15px',
                            marginBottom: '10px',
                            background: 'var(--background-color)',
                            borderRadius: '4px',
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <div>
                                <strong>{booking.service} at {booking.business}</strong> on {booking.date}
                                <div style={{ fontSize: '0.9em', opacity: 0.8 }}>Status: {booking.status}</div>
                            </div>
                            <div>
                                <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`View details for booking ${booking.id}`}>View Booking</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <p style={{ opacity: 0.8 }}>No bookings found.</p>}

            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Reviews</h4>
            {mockReviews.length > 0 ? (
                <div style={{ marginBottom: '20px' }}>
                    {mockReviews.map((review, index) => (
                        <div key={review.id} style={{
                            borderLeft: `3px solid ${review.rating >= 4 ? 'var(--success-color)' : review.rating <= 2 ? 'var(--danger-color)' : 'var(--primary-color)'}`,
                            paddingLeft: '15px',
                            marginBottom: '10px',
                            background: 'var(--background-color)',
                            borderRadius: '4px',
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <div>
                                <strong>{review.rating}/5</strong> for {review.business} on {review.date}
                                <div style={{ fontSize: '0.9em', opacity: 0.8 }}>"{review.comment}"</div>
                            </div>
                            <div>
                                <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`View details for review ${review.id}`}>View Review</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <p style={{ opacity: 0.8 }}>No reviews found.</p>}


            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Issues</h4>
            {mockIssues.length > 0 ? (
                <div style={{ marginBottom: '20px' }}>
                    {mockIssues.map((issue, index) => (
                        <div key={issue.id} style={{
                            borderLeft: `3px solid ${issue.status === 'Resolved' ? 'var(--success-color)' : 'var(--danger-color)'}`,
                            paddingLeft: '15px',
                            marginBottom: '10px',
                            background: 'var(--background-color)',
                            borderRadius: '4px',
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <div>
                                <strong>{issue.type}</strong> ({issue.status}) on {issue.date}
                                <div style={{ fontSize: '0.9em', opacity: 0.8 }}>{issue.summary}</div>
                            </div>
                            <div>
                                <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`View details for issue ${issue.id}`}>View Issue</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <p style={{ opacity: 0.8 }}>No issues reported.</p>}

            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Support Tickets</h4>
            {mockTickets.length > 0 ? (
                <div style={{ marginBottom: '20px' }}>
                    {mockTickets.map((ticket, index) => (
                        <div key={ticket.id} style={{
                            borderLeft: `3px solid ${ticket.status === 'Closed' ? 'var(--success-color)' : 'var(--primary-color)'}`,
                            paddingLeft: '15px',
                            marginBottom: '10px',
                            background: 'var(--background-color)',
                            borderRadius: '4px',
                            padding: '10px',
                        }}>
                            <strong>{ticket.subject}</strong> ({ticket.status}) on {ticket.date}
                        </div>
                    ))}
                </div>
            ) : <p style={{ opacity: 0.8 }}>No support tickets opened.</p>}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button className="btn-secondary" onClick={onClose} aria-label="Go Back from activity history">Go Back</button>
            </div>
        </div>
    );
};

interface StaffProfileEditorProps {
    staffMember: StaffMember;
    onClose: () => void;
    onSave: (updatedStaff: StaffMember) => void;
    onUploadProfilePhoto: (file: File, staffId: string) => void;
    onResetPassword: (staffMember: StaffMember) => void;
}

const StaffProfileEditor: React.FC<StaffProfileEditorProps> = ({ staffMember, onClose, onSave, onUploadProfilePhoto, onResetPassword }) => {
    const [formData, setFormData] = useState<StaffMember>(staffMember);
    const [isUploadMediaModalOpen, setIsUploadMediaModalOpen] = useState(false);

    useEffect(() => {
        setFormData(staffMember);
    }, [staffMember]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    const handlePhotoUpload = (file: File) => {
        onUploadProfilePhoto(file, staffMember.id);
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
            maxWidth: '600px',
            margin: '0 auto',
            height: 'fit-content',
            overflowY: 'auto',
            boxSizing: 'border-box',
        }}>
            <h4 style={{ marginTop: 0, marginBottom: '20px', textAlign: 'center', color: 'var(--text-color)' }}>Edit Staff Profile: {staffMember.firstName} {staffMember.lastName}</h4>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '25px' }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3em',
                    color: 'var(--primary-color)',
                    marginBottom: '10px',
                    overflow: 'hidden',
                    border: '2px solid var(--primary-color)'
                }} aria-label="Staff profile photo placeholder">
                    {formData.profilePhotoUrl ? (
                        <img src={formData.profilePhotoUrl} alt="Staff Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        formData.firstName ? formData.firstName.charAt(0).toUpperCase() : '👤'
                    )}
                </div>
                <button className="btn-secondary" onClick={() => setIsUploadMediaModalOpen(true)} style={{ fontSize: '0.8em', padding: '5px 10px' }}>Upload Photo</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="staffFirstName" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>First Name:</label>
                    <input type="text" id="staffFirstName" name="firstName" value={formData.firstName} onChange={handleChange} style={{ width: '100%' }} aria-label="Staff First Name" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="staffLastName" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Last Name:</label>
                    <input type="text" id="staffLastName" name="lastName" value={formData.lastName} onChange={handleChange} style={{ width: '100%' }} aria-label="Staff Last Name" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="staffRole" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Role:</label>
                    <input type="text" id="staffRole" name="role" value={formData.role} onChange={handleChange} style={{ width: '100%' }} aria-label="Staff Role" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="staffEmail" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Email:</label>
                    <input type="email" id="staffEmail" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%' }} aria-label="Staff Email" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="staffPhone" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Phone Number:</label>
                    <input type="tel" id="staffPhone" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%' }} aria-label="Staff Phone Number" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="staffStatus" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Status:</label>
                    <select id="staffStatus" name="active" value={formData.active ? 'Active' : 'Inactive'} onChange={e => handleChange({ ...e, target: { ...e.target, value: e.target.value === 'Active' ? true : false, type: 'checkbox' } as HTMLSelectElement })} style={{ width: '100%' }} aria-label="Staff Status">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px', gap: '10px' }}>
                <button className="btn-danger" onClick={() => onResetPassword(staffMember)} style={{ flex: 1 }} aria-label="Reset Staff Password">Reset Password</button>
                <button className="btn-secondary" onClick={onClose} style={{ flex: 1 }} aria-label="Go Back to staff list">Go Back</button>
                <button onClick={handleSave} style={{ flex: 1 }} aria-label="Save Changes">Save Changes</button>
            </div>
            <UploadMediaModal
                isOpen={isUploadMediaModalOpen}
                onClose={() => setIsUploadMediaModalOpen(false)}
                onUpload={handlePhotoUpload}
                title="Upload Staff Photo"
                currentImageUrl={formData.profilePhotoUrl}
            />
        </div>
    );
};

interface StaffPasswordResetProps {
    staffMember: StaffMember;
    onClose: () => void;
}

const StaffPasswordReset: React.FC<StaffPasswordResetProps> = ({ staffMember, onClose }) => {
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
        alert(`Password for ${staffMember.email || staffMember.phone} has been manually updated to: ${newPassword}! (Placeholder)`);
        setNewPassword('');
        setConfirmPassword('');
        onClose();
    };

    const handleSendEmailReset = () => {
        if (staffMember.email) {
            alert(`Password reset link sent to ${staffMember.email}! (Placeholder)`);
            onClose();
        } else {
            alert('Staff member does not have an email address to send a reset link.');
        }
    };

    const handleSendSmsReset = () => {
        if (staffMember.phone) {
            alert(`Password reset link sent to ${staffMember.phone} via SMS! (Placeholder)`);
            onClose();
        } else {
            alert('Staff member does not have a phone number to send a reset link.');
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
            <h4 style={{ marginTop: 0, marginBottom: '20px', textAlign: 'center', color: 'var(--text-color)' }}>Reset Password for {staffMember.firstName} {staffMember.lastName}</h4>
            <p style={{ textAlign: 'center', marginBottom: '20px', opacity: 0.8 }}>Admin override options</p>

            <p style={{marginBottom: '15px'}}><strong>Login Identifier:</strong> {staffMember.email || staffMember.phone || 'N/A'}</p>

            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="staffNewPassword" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>New Password:</label>
                <input type="password" id="staffNewPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ width: '100%' }} aria-label="New Password" />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="staffConfirmPassword" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Confirm New Password:</label>
                <input type="password" id="staffConfirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ width: '100%' }} aria-label="Confirm New Password" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={handleSetNewPassword} aria-label="Set new password manually">Set New Password (Admin)</button>
                <button className="btn-secondary" onClick={handleSendEmailReset} disabled={!staffMember.email} aria-label="Send password reset link to email">Send Email Reset Link</button>
                <button className="btn-secondary" onClick={handleSendSmsReset} disabled={!staffMember.phone} aria-label="Send password reset link to phone via SMS">Send SMS Reset Link</button>
                <button className="btn-secondary" onClick={onClose} aria-label="Go Back from password reset">Go Back</button>
            </div>
        </div>
    );
};


interface BusinessStaffManagerProps {
    business: Business;
    onClose: () => void;
    onSaveStaff: (businessId: string, updatedStaff: StaffMember[]) => void;
    onUploadStaffMedia: (file: File, staffId: string, businessId: string) => void;
}

const BusinessStaffManager: React.FC<BusinessStaffManagerProps> = ({ business, onClose, onSaveStaff, onUploadStaffMedia }) => {
    const [currentStaff, setCurrentStaff] = useState<StaffMember[]>(business.staff || []);
    const [staffManagementSubView, setStaffManagementSubView] = useState<'list' | 'editStaff' | 'resetStaffPassword'>('list');
    const [selectedStaffMember, setSelectedStaffMember] = useState<StaffMember | null>(null);

    useEffect(() => {
        setCurrentStaff(business.staff || []);
        // Reset sub-views when business prop changes
        setStaffManagementSubView('list');
        setSelectedStaffMember(null);
    }, [business]);

    const handleAddStaff = () => {
        // Implement add staff logic here
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

    const handleStaffPhotoUpload = (file: File, staffId: string) => {
        onUploadStaffMedia(file, staffId, business.id);
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
            maxWidth: '900px', // Adjusted max-width for better display of action buttons
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

interface BusinessServiceOffersManagerProps {
    business: Business;
    onClose: () => void;
    onSaveOffers: (updatedOffers: ServiceOffer[]) => void;
}

const BusinessServiceOffersManager: React.FC<BusinessServiceOffersManagerProps> = ({ business, onClose, onSaveOffers }) => {
    const [currentOffers, setCurrentOffers] = useState<ServiceOffer[]>(business.serviceOffers || []);
    const [editingService, setEditingService] = useState<ServiceOffer | null>(null);
    const [isAddingNew, setIsAddingNew] = useState(false);

    useEffect(() => {
        setCurrentOffers(business.serviceOffers || []);
    }, [business]);

    const handleAddService = () => {
        setIsAddingNew(true);
        setEditingService({
            id: generateId(),
            title: '',
            description: '',
            price: 0,
            durationMinutes: 0,
        });
    };

    const handleEditService = (service: ServiceOffer) => {
        setEditingService({ ...service });
        setIsAddingNew(false);
    };

    const handleDeleteService = (id: string) => {
        if (window.confirm('Are you sure you want to delete this service offer?')) {
            setCurrentOffers(prev => prev.filter(s => s.id !== id));
        }
    };

    const handleSaveService = (service: ServiceOffer) => {
        if (isAddingNew) {
            setCurrentOffers(prev => [...prev, service]);
        } else {
            setCurrentOffers(prev => prev.map(s => (s.id === service.id ? service : s)));
        }
        setEditingService(null);
        setIsAddingNew(false);
    };

    const handleCancelEdit = () => {
        setEditingService(null);
        setIsAddingNew(false);
    };

    const handleFinalSave = () => {
        onSaveOffers(currentOffers);
        onClose();
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
            maxWidth: '1000px',
            margin: '0 auto',
            height: 'fit-content',
            overflowY: 'auto',
            boxSizing: 'border-box',
        }}>
            <h4 style={{ marginTop: 0, marginBottom: '20px', textAlign: 'center', color: 'var(--text-color)' }}>
                Manage Service Offers for {business.name}
            </h4>

            {!editingService ? (
                <>
                    <button onClick={handleAddService} style={{ marginBottom: '20px' }} aria-label="Add new service offer">
                        Add New Service Offer
                    </button>

                    {currentOffers.length > 0 ? (
                        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            {currentOffers.map(service => (
                                <div key={service.id} style={{
                                    display: 'flex',
                                    flexDirection: 'column', // Stack info vertically
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '4px',
                                    padding: '15px',
                                    marginBottom: '10px',
                                    background: 'var(--background-color)',
                                    gap: '10px',
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <strong>{service.title}</strong>
                                        <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                                            ${service.price.toFixed(2)}
                                            {service.discountPercentage !== undefined && <span style={{ color: 'var(--danger-color)', marginLeft: '10px' }}>(-{service.discountPercentage}%)</span>}
                                            {service.discountAmount !== undefined && <span style={{ color: 'var(--danger-color)', marginLeft: '10px' }}>(-${service.discountAmount.toFixed(2)})</span>}
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '0.9em', opacity: 0.8 }}>
                                        {service.description} ({service.durationMinutes} min)
                                    </div>
                                    {(service.discountStartDate && service.discountEndDate) && (
                                        <div style={{ fontSize: '0.8em', color: 'var(--primary-color)' }}>
                                            Discount valid: {service.discountStartDate} to {service.discountEndDate}
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                                        <button className="btn-secondary" onClick={() => handleEditService(service)} style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`Edit ${service.title}`}>Edit</button>
                                        <button className="btn-danger" onClick={() => handleDeleteService(service.id)} style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`Delete ${service.title}`}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ opacity: 0.8 }}>No service offers found for this business.</p>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px' }}>
                        <button className="btn-secondary" onClick={onClose} aria-label="Go Back from service offers">Go Back</button>
                        <button onClick={handleFinalSave} aria-label="Save all service offer changes">Save All Changes</button>
                    </div>
                </>
            ) : (
                <ServiceOfferForm
                    service={editingService}
                    onSave={handleSaveService}
                    onCancel={handleCancelEdit}
                    isNew={isAddingNew}
                />
            )}
        </div>
    );
};

interface ServiceOfferFormProps {
    service: ServiceOffer;
    onSave: (service: ServiceOffer) => void;
    onCancel: () => void;
    isNew: boolean;
}

const ServiceOfferForm: React.FC<ServiceOfferFormProps> = ({ service, onSave, onCancel, isNew }) => {
    const [formData, setFormData] = useState<ServiceOffer>(service);

    useEffect(() => {
        setFormData(service);
    }, [service]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value,
        }));
    };

    const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => {
            if (name === 'discountPercentage') {
                return {
                    ...prev,
                    discountPercentage: type === 'number' && value ? parseFloat(value) : undefined,
                    discountAmount: undefined, // Clear other discount type
                };
            } else if (name === 'discountAmount') {
                return {
                    ...prev,
                    discountAmount: type === 'number' && value ? parseFloat(value) : undefined,
                    discountPercentage: undefined, // Clear other discount type
                };
            }
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.price <= 0 || isNaN(formData.price)) {
            alert('Price must be a positive number.');
            return;
        }
        if (formData.durationMinutes <= 0 || isNaN(formData.durationMinutes)) {
            alert('Duration must be a positive number.');
            return;
        }
        if (formData.discountPercentage && (formData.discountPercentage < 0 || formData.discountPercentage > 100)) {
            alert('Discount Percentage must be between 0 and 100.');
            return;
        }
        if (formData.discountAmount && formData.discountAmount < 0) {
            alert('Discount Amount cannot be negative.');
            return;
        }
        if ((formData.discountStartDate && !formData.discountEndDate) || (!formData.discountStartDate && formData.discountEndDate)) {
            alert('Both discount start and end dates must be provided if one is entered.');
            return;
        }
        if (formData.discountStartDate && formData.discountEndDate && formData.discountStartDate > formData.discountEndDate) {
            alert('Discount End Date cannot be before Start Date.');
            return;
        }

        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h5 style={{ marginTop: 0, marginBottom: '10px', color: 'var(--primary-color)' }}>{isNew ? 'Add New Service Offer' : `Edit Service: ${service.title}`}</h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px 20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="serviceTitle" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Title:</label>
                    <input type="text" id="serviceTitle" name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%' }} aria-label="Service title" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="servicePrice" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Price ($):</label>
                    <input type="number" id="servicePrice" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" required style={{ width: '100%' }} aria-label="Service price" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="serviceDuration" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Duration (minutes):</label>
                    <input type="number" id="serviceDuration" name="durationMinutes" value={formData.durationMinutes} onChange={handleChange} min="1" required style={{ width: '100%' }} aria-label="Service duration in minutes" />
                </div>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="serviceDescription" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Description:</label>
                <textarea id="serviceDescription" name="description" value={formData.description} onChange={handleChange} rows={3} style={{ width: '100%' }} aria-label="Service description"></textarea>
            </div>

            <h5 style={{ marginTop: '10px', marginBottom: '5px', color: 'var(--primary-color)' }}>Discount Options (Optional)</h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px 20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="discountPercentage" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Discount Percentage (%):</label>
                    <input
                        type="number"
                        id="discountPercentage"
                        name="discountPercentage"
                        value={formData.discountPercentage !== undefined ? formData.discountPercentage : ''}
                        onChange={handleDiscountChange}
                        min="0"
                        max="100"
                        disabled={formData.discountAmount !== undefined} // Disable if amount is set
                        style={{ width: '100%' }}
                        aria-label="Discount percentage"
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="discountAmount" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Discount Amount ($):</label>
                    <input
                        type="number"
                        id="discountAmount"
                        name="discountAmount"
                        value={formData.discountAmount !== undefined ? formData.discountAmount : ''}
                        onChange={handleDiscountChange}
                        min="0"
                        step="0.01"
                        disabled={formData.discountPercentage !== undefined} // Disable if percentage is set
                        style={{ width: '100%' }}
                        aria-label="Discount amount"
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="discountStartDate" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Discount Start Date:</label>
                    <input type="date" id="discountStartDate" name="discountStartDate" value={formData.discountStartDate || ''} onChange={handleChange} style={{ width: '100%' }} aria-label="Discount start date" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="discountEndDate" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Discount End Date:</label>
                    <input type="date" id="discountEndDate" name="discountEndDate" value={formData.discountEndDate || ''} onChange={handleChange} style={{ width: '100%' }} aria-label="Discount end date" />
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="btn-secondary" onClick={onCancel} aria-label="Cancel editing service">Cancel</button>
                <button type="submit" aria-label="Save service offer">{isNew ? 'Add Service' : 'Update Service'}</button>
            </div>
        </form>
    );
};

interface ClientFormProps {
    client: Client;
    onSave: (client: Client) => void;
    onCancel: () => void;
    isNew: boolean;
}

const ClientForm: React.FC<ClientFormProps> = ({ client, onSave, onCancel, isNew }) => {
    const [formData, setFormData] = useState<Client>(client);

    useEffect(() => {
        setFormData(client);
    }, [client]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.phone) {
            alert('First Name, Last Name, and Phone are required.');
            return;
        }
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'var(--background-color)' }}>
            <h5 style={{ marginTop: 0, marginBottom: '10px', color: 'var(--primary-color)' }}>{isNew ? 'Add New Client' : `Edit Client: ${client.firstName} ${client.lastName}`}</h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px 20px' }}>
                <div>
                    <label htmlFor="clientFirstName" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>First Name:</label>
                    <input type="text" id="clientFirstName" name="firstName" value={formData.firstName} onChange={handleChange} required style={{ width: '100%' }} aria-label="Client first name" />
                </div>
                <div>
                    <label htmlFor="clientLastName" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Last Name:</label>
                    <input type="text" id="clientLastName" name="lastName" value={formData.lastName} onChange={handleChange} required style={{ width: '100%' }} aria-label="Client last name" />
                </div>
                <div>
                    <label htmlFor="clientEmail" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Email (Optional):</label>
                    <input type="email" id="clientEmail" name="email" value={formData.email || ''} onChange={handleChange} style={{ width: '100%' }} aria-label="Client email" />
                </div>
                <div>
                    <label htmlFor="clientPhone" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Phone Number:</label>
                    <input type="tel" id="clientPhone" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%' }} aria-label="Client phone number" />
                </div>
                <div>
                    <label htmlFor="clientLastVisit" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Last Visit:</label>
                    <input type="date" id="clientLastVisit" name="lastVisitDate" value={formData.lastVisitDate || ''} onChange={handleChange} style={{ width: '100%' }} aria-label="Client last visit date" />
                </div>
                <div>
                    <label htmlFor="clientUpcomingVisit" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Upcoming Visit:</label>
                    <input type="date" id="clientUpcomingVisit" name="upcomingVisitDate" value={formData.upcomingVisitDate || ''} onChange={handleChange} style={{ width: '100%' }} aria-label="Client upcoming visit date" />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="btn-secondary" onClick={onCancel} aria-label="Cancel editing client">Cancel</button>
                <button type="submit" aria-label="Save client details">{isNew ? 'Add Client' : 'Update Client'}</button>
            </div>
        </form>
    );
};

interface BusinessClientManagerProps {
    business: Business;
    onClose: () => void;
    onSaveClients: (updatedClients: Client[]) => void;
}

const BusinessClientManager: React.FC<BusinessClientManagerProps> = ({ business, onClose, onSaveClients }) => {
    const [currentClients, setCurrentClients] = useState<Client[]>(business.clients || []);
    const [editingClient, setEditingClient] = useState<Client | null>(null);
    const [isAddingNew, setIsAddingNew] = useState(false);

    useEffect(() => {
        setCurrentClients(business.clients || []);
    }, [business]);

    const handleAddClient = () => {
        setIsAddingNew(true);
        setEditingClient({
            id: generateId(),
            firstName: '',
            lastName: '',
            phone: '',
        });
    };

    const handleEditClient = (client: Client) => {
        setEditingClient({ ...client });
        setIsAddingNew(false);
    };

    const handleDeleteClient = (id: string) => {
        if (window.confirm('Are you sure you want to delete this client?')) {
            setCurrentClients(prev => prev.filter(c => c.id !== id));
        }
    };

    const handleSaveClient = (client: Client) => {
        if (isAddingNew) {
            setCurrentClients(prev => [...prev, client]);
        } else {
            setCurrentClients(prev => prev.map(c => (c.id === client.id ? client : c)));
        }
        setEditingClient(null);
        setIsAddingNew(false);
    };

    const handleCancelEdit = () => {
        setEditingClient(null);
        setIsAddingNew(false);
    };

    const handleFinalSave = () => {
        onSaveClients(currentClients);
        onClose();
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
            maxWidth: '1200px',
            margin: '0 auto',
            height: 'fit-content',
            overflowY: 'auto',
            boxSizing: 'border-box',
        }}>
            <h4 style={{ marginTop: 0, marginBottom: '20px', textAlign: 'center', color: 'var(--text-color)' }}>
                Manage Clients for {business.name}
            </h4>

            {!editingClient ? (
                <>
                    <button onClick={handleAddClient} style={{ marginBottom: '20px' }} aria-label="Add new client">
                        Add New Client
                    </button>

                    {currentClients.length > 0 ? (
                        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }} aria-label="Business client list">
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Email</th>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Phone</th>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Last Visit</th>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Upcoming Visit</th>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentClients.map(client => (
                                        <tr key={client.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '8px' }}>{client.firstName} {client.lastName}</td>
                                            <td style={{ padding: '8px' }}>{client.email || 'N/A'}</td>
                                            <td style={{ padding: '8px' }}>{client.phone}</td>
                                            <td style={{ padding: '8px' }}>{client.lastVisitDate || 'N/A'}</td>
                                            <td style={{ padding: '8px' }}>{client.upcomingVisitDate || 'N/A'}</td>
                                            <td style={{ padding: '8px' }}>
                                                <button className="btn-secondary" onClick={() => handleEditClient(client)} style={{ marginRight: '5px', padding: '5px 10px', fontSize: '0.8em' }} aria-label={`Edit ${client.firstName}`}>Edit</button>
                                                <button className="btn-danger" onClick={() => handleDeleteClient(client.id)} style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`Delete ${client.firstName}`}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p style={{ opacity: 0.8 }}>No clients found for this business.</p>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px' }}>
                        <button className="btn-secondary" onClick={onClose} aria-label="Go Back from client management">Go Back</button>
                        <button onClick={handleFinalSave} aria-label="Save all client changes">Save All Changes</button>
                    </div>
                </>
            ) : (
                <ClientForm
                    client={editingClient}
                    onSave={handleSaveClient}
                    onCancel={handleCancelEdit}
                    isNew={isAddingNew}
                />
            )}
        </div>
    );
};


interface BusinessActivityViewerProps {
    business: Business;
    onClose: () => void;
}

const BusinessActivityViewer: React.FC<BusinessActivityViewerProps> = ({ business, onClose }) => {
    // Mock data for business activity
    const mockBookings = useMemo(() => [
        { id: 'bbkg-001', client: 'Alice Smith', service: 'Haircut', date: '2024-07-20', status: 'Completed' },
        { id: 'bbkg-002', client: 'Charlie Brown', service: 'Manicure', date: '2024-07-18', status: 'Cancelled' },
        { id: 'bbkg-003', client: 'Diana Prince', service: 'Facial', date: '2024-07-12', status: 'Completed' },
    ], []);

    const mockReviewsReceived = useMemo(() => [
        { id: 'brev-001', client: 'Alice Smith', rating: 5, comment: 'Excellent service and friendly staff!', date: '2024-07-21' },
        { id: 'brev-002', client: 'Eve Johnson', rating: 4, comment: 'Good experience, but a bit pricey.', date: '2024-07-10' },
    ], []);

    const mockIssuesReported = useMemo(() => [
        { id: 'biss-001', reporter: 'Client A', type: 'Service Quality', date: '2024-07-15', status: 'In Progress', summary: 'Complaint about a specific stylist' },
        { id: 'biss-002', reporter: 'System', type: 'Payment Processing Error', date: '2024-07-05', status: 'Resolved', summary: 'Transaction failed for booking BBKG-002' },
    ], []);

    const mockPayouts = useMemo(() => [
        { id: 'pay-001', date: '2024-07-25', amount: '$500.00', status: 'Paid' },
        { id: 'pay-002', date: '2024-06-25', amount: '$450.00', status: 'Paid' },
    ], []);

    return (
        <div style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '30px',
            marginBottom: '20px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            width: '100%',
            maxWidth: '700px', // Keep some max-width for readability
            margin: '0 auto', // Center the content
            height: 'fit-content',
            overflowY: 'auto',
            boxSizing: 'border-box',
        }}>
            <h4 style={{ marginTop: 0, marginBottom: '20px', textAlign: 'center', color: 'var(--text-color)' }}>Activity History for {business.name}</h4>
            <p style={{ textAlign: 'center', marginBottom: '20px', opacity: 0.8 }}>Detailed view of business operations and client interactions.</p>

            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Bookings</h4>
            {mockBookings.length > 0 ? (
                <div style={{ marginBottom: '20px' }}>
                    {mockBookings.map((booking, index) => (
                        <div key={booking.id} style={{
                            borderLeft: `3px solid ${booking.status === 'Completed' ? 'var(--success-color)' : booking.status === 'Cancelled' ? 'var(--danger-color)' : 'var(--primary-color)'}`,
                            paddingLeft: '15px',
                            marginBottom: '10px',
                            background: 'var(--background-color)',
                            borderRadius: '4px',
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <div>
                                <strong>{booking.service}</strong> by {booking.client} on {booking.date}
                                <div style={{ fontSize: '0.9em', opacity: 0.8 }}>Status: {booking.status}</div>
                            </div>
                            <div>
                                <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`View details for booking ${booking.id}`}>View Booking</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <p style={{ opacity: 0.8 }}>No bookings found for this business.</p>}

            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Reviews Received</h4>
            {mockReviewsReceived.length > 0 ? (
                <div style={{ marginBottom: '20px' }}>
                    {mockReviewsReceived.map((review, index) => (
                        <div key={review.id} style={{
                            borderLeft: `3px solid ${review.rating >= 4 ? 'var(--success-color)' : review.rating <= 2 ? 'var(--danger-color)' : 'var(--primary-color)'}`,
                            paddingLeft: '15px',
                            marginBottom: '10px',
                            background: 'var(--background-color)',
                            borderRadius: '4px',
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <div>
                                <strong>{review.rating}/5</strong> by {review.client} on {review.date}
                                <div style={{ fontSize: '0.9em', opacity: 0.8 }}>"{review.comment}"</div>
                            </div>
                            <div>
                                <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`View details for review ${review.id}`}>View Review</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <p style={{ opacity: 0.8 }}>No reviews received for this business.</p>}


            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Issues Reported</h4>
            {mockIssuesReported.length > 0 ? (
                <div style={{ marginBottom: '20px' }}>
                    {mockIssuesReported.map((issue, index) => (
                        <div key={issue.id} style={{
                            borderLeft: `3px solid ${issue.status === 'Resolved' ? 'var(--success-color)' : 'var(--danger-color)'}`,
                            paddingLeft: '15px',
                            marginBottom: '10px',
                            background: 'var(--background-color)',
                            borderRadius: '4px',
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <div>
                                <strong>{issue.type}</strong> ({issue.status}) by {issue.reporter} on {issue.date}
                                <div style={{ fontSize: '0.9em', opacity: 0.8 }}>{issue.summary}</div>
                            </div>
                            <div>
                                <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`View details for issue ${issue.id}`}>View Issue</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <p style={{ opacity: 0.8 }}>No issues reported for this business.</p>}

            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Recent Payouts</h4>
            {mockPayouts.length > 0 ? (
                <div style={{ marginBottom: '20px' }}>
                    {mockPayouts.map((payout, index) => (
                        <div key={payout.id} style={{
                            borderLeft: `3px solid ${payout.status === 'Paid' ? 'var(--success-color)' : 'var(--danger-color)'}`,
                            paddingLeft: '15px',
                            marginBottom: '10px',
                            background: 'var(--background-color)',
                            borderRadius: '4px',
                            padding: '10px',
                        }}>
                            <strong>{payout.amount}</strong> on {payout.date} ({payout.status})
                        </div>
                    ))}
                </div>
            ) : <p style={{ opacity: 0.8 }}>No recent payouts for this business.</p>}


            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button className="btn-secondary" onClick={onClose} aria-label="Go Back from activity history">Go Back</button>
            </div>
        </div>
    );
};

interface BusinessPasswordResetProps {
    business: Business;
    onClose: () => void;
}

const BusinessPasswordReset: React.FC<BusinessPasswordResetProps> = ({ business, onClose }) => {
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
        alert(`Password for ${business.email || business.phone} has been manually updated to: ${newPassword}! (Placeholder)`);
        setNewPassword('');
        setConfirmPassword('');
        onClose();
    };

    const handleSendEmailReset = () => {
        if (business.email) {
            alert(`Password reset link sent to ${business.email}! (Placeholder)`);
            onClose();
        } else {
            alert('Business does not have an email address to send a reset link.');
        }
    };

    const handleSendSmsReset = () => {
        if (business.phone) {
            alert(`Password reset link sent to ${business.phone} via SMS! (Placeholder)`);
            onClose();
        } else {
            alert('Business does not have a phone number to send a reset link.');
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
            maxWidth: '400px', // Keep some max-width for smaller forms
            margin: '0 auto', // Center the form
            height: 'fit-content',
            overflowY: 'auto',
            boxSizing: 'border-sizing',
        }}>
            <h4 style={{ marginTop: 0, marginBottom: '20px', textAlign: 'center', color: 'var(--text-color)' }}>Reset Password for {business.name}</h4>
            <p style={{ textAlign: 'center', marginBottom: '20px', opacity: 0.8 }}>Admin override options</p>

            <p style={{marginBottom: '15px'}}><strong>Login Identifier:</strong> {business.email || business.phone || 'N/A'}</p>

            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="bizNewPassword" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>New Password:</label>
                <input type="password" id="bizNewPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ width: '100%' }} aria-label="New Password" />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="bizConfirmPassword" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Confirm New Password:</label>
                <input type="password" id="bizConfirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ width: '100%' }} aria-label="Confirm New Password" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={handleSetNewPassword} aria-label="Set new password manually">Set New Password (Admin)</button>
                <button className="btn-secondary" onClick={handleSendEmailReset} disabled={!business.email} aria-label="Send password reset link to email">Send Email Reset Link</button>
                <button className="btn-secondary" onClick={handleSendSmsReset} disabled={!business.phone} aria-label="Send password reset link to phone via SMS">Send SMS Reset Link</button>
                <button className="btn-secondary" onClick={onClose} aria-label="Go Back from password reset">Go Back</button>
            </div>
        </div>
    );
};

interface BusinessProfileEditorProps {
    business: Business;
    onClose: () => void;
    onSave: (updatedBusiness: Business) => void;
    uniqueCities: string[];
    uniqueActivities: string[];
    onViewStaff: (business: Business) => void;
    onViewActivity: (business: Business) => void;
    onResetPassword: (business: Business) => void;
    onUploadCoverPhoto: (file: File, businessId: string) => void; // Updated prop type
    onManageServiceOffers: (business: Business) => void;
    onManageClients: (business: Business) => void; // New prop
    onManagePortfolio: (business: Business) => void; // New prop
    onViewReviews: (business: Business) => void; // New prop
}

const BusinessProfileEditor: React.FC<BusinessProfileEditorProps> = ({ business, onClose, onSave, uniqueCities, uniqueActivities, onViewStaff, onViewActivity, onResetPassword, onUploadCoverPhoto, onManageServiceOffers, onManageClients, onManagePortfolio, onViewReviews }) => {
    const [formData, setFormData] = useState<Business>(business);
    const [isUploadCoverPhotoModalOpen, setIsUploadCoverPhotoModalOpen] = useState(false);
    const [isDeletingCoverPhotos, setIsDeletingCoverPhotos] = useState(false);
    const [selectedCoverPhotosForDeletion, setSelectedCoverPhotosForDeletion] = useState<Set<string>>(new Set());

    const coverPhotosRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setFormData(business);
        setIsDeletingCoverPhotos(false);
        setSelectedCoverPhotosForDeletion(new Set());
    }, [business]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    const handleCoverPhotoUpload = (file: File) => {
        if ((formData.coverPhotoUrls?.length || 0) >= 5) {
            alert('You can upload a maximum of 5 cover photos.');
            return;
        }
        onUploadCoverPhoto(file, business.id); // Notify parent of actual upload event
    };

    const togglePhotoSelection = (url: string) => {
        setSelectedCoverPhotosForDeletion(prev => {
            const newSet = new Set(prev);
            if (newSet.has(url)) {
                newSet.delete(url);
            } else {
                newSet.add(url);
            }
            return newSet;
        });
    };

    const confirmDeleteSelectedPhotos = () => {
        setFormData(prev => ({
            ...prev,
            coverPhotoUrls: (prev.coverPhotoUrls || []).filter(url => !selectedCoverPhotosForDeletion.has(url))
        }));
        setIsDeletingCoverPhotos(false);
        setSelectedCoverPhotosForDeletion(new Set());
    };

    const cancelDeletePhotos = () => {
        setIsDeletingCoverPhotos(false);
        setSelectedCoverPhotosForDeletion(new Set());
    };

    const scrollCoverPhotos = (direction: 'left' | 'right') => {
        if (coverPhotosRef.current) {
            const scrollAmount = coverPhotosRef.current.offsetWidth * 0.7; // Scroll 70% of visible width
            if (direction === 'left') {
                coverPhotosRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                coverPhotosRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    const canUploadMorePhotos = (formData.coverPhotoUrls?.length || 0) < 5;


    return (
        <div style={{ // This is the main container for the editor
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '30px',
            marginBottom: '20px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            width: '100%',
            maxWidth: '1000px', // Restrict max width
            margin: '0 auto',   // Center it
            height: 'fit-content',
            overflowY: 'auto',
            boxSizing: 'border-box',
        }}>
            {/* Removed the redundant h3 header "Edit Business Profile" */}

            {/* NEW Flex container for MAIN CONTENT AREA (Cover Photos + Form Fields) and ACTION BUTTONS */}
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}> {/* wrap to keep content first, buttons second on small screens */}

                {/* LEFT/MAIN CONTENT AREA (Cover Photos + Form Fields) */}
                <div style={{ flex: '1 1 70%', minWidth: '450px', maxWidth: '750px' }}> {/* Adjust flex-basis and max-width as needed */}
                    {/* Cover Photos section */}
                    <div style={{ marginBottom: '30px', paddingBottom: '10px' }}>
                        <h4 style={{ marginTop: 0, marginBottom: '15px', color: 'var(--primary-color)' }}>Cover Photos (Max 5)</h4>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}> {/* Container for gallery + buttons */}
                            {/* Buttons section (moved to the left) */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0, minWidth: '150px' }}>
                                {!isDeletingCoverPhotos ? (
                                    <>
                                        <button
                                            className="btn-secondary"
                                            onClick={() => setIsUploadCoverPhotoModalOpen(true)}
                                            disabled={!canUploadMorePhotos}
                                            aria-label="Upload new cover photo"
                                        >
                                            Upload Photo
                                        </button>
                                        <button
                                            className="btn-danger"
                                            onClick={() => setIsDeletingCoverPhotos(true)}
                                            disabled={!formData.coverPhotoUrls || formData.coverPhotoUrls.length === 0}
                                            aria-label="Delete cover photos"
                                        >
                                            Delete Photos
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn-success" onClick={confirmDeleteSelectedPhotos} disabled={selectedCoverPhotosForDeletion.size === 0} aria-label="Confirm delete selected photos">Confirm Deletion ({selectedCoverPhotosForDeletion.size})</button>
                                        <button className="btn-secondary" onClick={cancelDeletePhotos} aria-label="Cancel deletion">Cancel</button>
                                    </>
                                )}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexGrow: 1 }}> {/* Gallery itself */}
                                <button onClick={() => scrollCoverPhotos('left')} aria-label="Scroll cover photos left" className="btn-icon" style={{ padding: '8px', flexShrink: 0 }}>
                                    &#9664; {/* Left arrow */}
                                </button>
                                <div ref={coverPhotosRef} style={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    overflowX: 'auto',
                                    whiteSpace: 'nowrap',
                                    gap: '10px',
                                    padding: '10px 0',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border-color)',
                                    backgroundColor: 'var(--background-color)',
                                    scrollBehavior: 'smooth',
                                    scrollbarWidth: 'none', /* Firefox */
                                    msOverflowStyle: 'none',  /* IE and Edge */
                                }}>
                                    {/* Hide scrollbar for Webkit browsers */}
                                    <style>{`
                                        div::-webkit-scrollbar {
                                            display: none;
                                        }
                                    `}</style>
                                    {(formData.coverPhotoUrls && formData.coverPhotoUrls.length > 0) ? (
                                        formData.coverPhotoUrls.map((url, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    position: 'relative',
                                                    display: 'inline-block',
                                                    width: '120px',
                                                    height: '90px',
                                                    flexShrink: 0,
                                                    borderRadius: '4px',
                                                    overflow: 'hidden',
                                                    border: isDeletingCoverPhotos && selectedCoverPhotosForDeletion.has(url) ? '2px solid var(--danger-color)' : '1px solid var(--border-color)',
                                                    cursor: isDeletingCoverPhotos ? 'pointer' : 'default',
                                                    transition: 'border-color 0.2s',
                                                }}
                                                onClick={() => isDeletingCoverPhotos && togglePhotoSelection(url)}
                                                aria-label={`Cover photo ${index + 1}`}
                                            >
                                                <img src={url} alt={`Cover ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                {isDeletingCoverPhotos && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        backgroundColor: selectedCoverPhotosForDeletion.has(url) ? 'rgba(220, 53, 69, 0.5)' : 'rgba(0,0,0,0.3)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: 'white',
                                                        fontSize: '1.5em',
                                                    }} aria-hidden="true">
                                                        {selectedCoverPhotosForDeletion.has(url) ? '🗑️' : 'Click to select'}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p style={{ color: 'var(--text-color)', opacity: 0.7, padding: '0 10px', whiteSpace: 'normal' }}>No cover photos uploaded yet.</p>
                                    )}
                                </div>
                                <button onClick={() => scrollCoverPhotos('right')} aria-label="Scroll cover photos right" className="btn-icon" style={{ padding: '8px', flexShrink: 0 }}>
                                    &#9654; {/* Right arrow */}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Restructured form fields */}
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '20px' }}>
                        {/* Left Column */}
                        <div style={{ flex: '1 1 48%', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="bizName" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Business Name:</label>
                                <input type="text" id="bizName" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%' }} aria-label="Business Name" />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="bizPhone" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Phone Number:</label>
                                <input type="tel" id="bizPhone" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%' }} aria-label="Business Phone Number" />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="bizEmail" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Email:</label>
                                <input type="email" id="bizEmail" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%' }} aria-label="Business Email" />
                            </div>
                            {/* Address field here */}
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="bizAddress" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Address:</label>
                                <textarea id="bizAddress" name="address" value={formData.address || ''} onChange={handleChange} rows={2} style={{ width: '100%' }} aria-label="Business Address"></textarea>
                            </div>
                            {/* City field here */}
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="bizCity" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>City:</label>
                                <select id="bizCity" name="city" value={formData.city} onChange={handleChange} style={{ width: '100%' }} aria-label="Business City">
                                    {uniqueCities.filter(city => city !== 'All').map(city => (<option key={city} value={city}>{city}</option>))}
                                </select>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div style={{ flex: '1 1 48%', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="bizActivity" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Activity Type:</label>
                                <select id="bizActivity" name="activity" value={formData.activity} onChange={handleChange} style={{ width: '100%' }} aria-label="Activity Type">
                                    {uniqueActivities.filter(a => a !== 'All').map(activity => (<option key={activity} value={activity}>{activity}</option>))}
                                </select>
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="bizWebsite" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Website (Optional):</label>
                                <input type="url" id="bizWebsite" name="website" value={formData.website || ''} onChange={handleChange} style={{ width: '100%' }} aria-label="Business Website" />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="bizDescription" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Description (Optional):</label>
                                <textarea id="bizDescription" name="description" value={formData.description || ''} onChange={handleChange} rows={5} style={{ width: '100%' }} aria-label="Business Description"></textarea>
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="bizStatus" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Status:</label>
                                <select id="bizStatus" name="status" value={formData.status} onChange={handleChange} style={{ width: '100%' }} aria-label="Business Status">
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT ACTION BUTTONS COLUMN */}
                <div style={{
                    flex: '0 0 200px', // Fixed width for buttons column
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    alignSelf: 'flex-start', // Align to the top of the flex container
                    flexShrink: 0, // Prevent footer from shrinking
                    // paddingTop: '30px', // Removed, alignSelf should handle it
                    borderLeft: '1px solid var(--border-color)', // Add a separator for the button bar
                    paddingLeft: '25px', // Spacing from the separator
                }}>
                    <button className="btn-secondary" onClick={() => onViewStaff(business)} style={{ width: '100%' }} aria-label="View and Manage Staff">View & Manage Staff</button>
                    <button className="btn-secondary" onClick={() => onManageServiceOffers(business)} style={{ width: '100%' }} aria-label="Manage Service Offers">Manage Service Offers</button>
                    <button className="btn-secondary" onClick={() => onManageClients(business)} style={{ width: '100%' }} aria-label="Manage Clients">Manage Clients</button> {/* New button */}
                    <button className="btn-secondary" onClick={() => onManagePortfolio(business)} style={{ width: '100%' }} aria-label="Manage Portfolio">Manage Portfolio</button> {/* New button */}
                    <button className="btn-secondary" onClick={() => onViewReviews(business)} style={{ width: '100%' }} aria-label="View Reviews">View Reviews</button> {/* New button */}
                    <button className="btn-secondary" onClick={() => onViewActivity(business)} style={{ width: '100%' }} aria-label="View Business Activity">View Activity</button>
                    <button className="btn-danger" onClick={() => onResetPassword(business)} style={{ width: '100%' }} aria-label="Reset Business Password">Reset Password</button>
                    <div style={{ borderTop: '1px solid var(--border-color)', width: '100%', margin: '10px 0' }} /> {/* Separator */}
                    <button className="btn-secondary" onClick={onClose} style={{ width: '100%' }} aria-label="Go Back to business list">Go Back</button>
                    <button onClick={handleSave} style={{ width: '100%' }} aria-label="Save Changes">Save Changes</button>
                </div>
            </div> {/* End of NEW Flex container */}

            <UploadMediaModal
                isOpen={isUploadCoverPhotoModalOpen}
                onClose={() => setIsUploadCoverPhotoModalOpen(false)}
                onUpload={handleCoverPhotoUpload}
                title={`Upload Cover Photo (${formData.coverPhotoUrls?.length || 0}/5)`}
            />
        </div>
    );
};


// New component for managing portfolio items
interface BusinessPortfolioManagerProps {
    business: Business;
    onClose: () => void;
    onSavePortfolio: (updatedPortfolio: PortfolioItem[]) => void;
}

const BusinessPortfolioManager: React.FC<BusinessPortfolioManagerProps> = ({ business, onClose, onSavePortfolio }) => {
    const [currentPortfolio, setCurrentPortfolio] = useState<PortfolioItem[]>(business.portfolio || []);
    const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isImageUploadModalOpen, setIsImageUploadModalOpen] = useState(false); // Renamed for clarity

    useEffect(() => {
        setCurrentPortfolio(business.portfolio || []);
        // Reset editing state when business changes
        setEditingItem(null);
        setIsAddingNew(false);
        setIsImageUploadModalOpen(false);
    }, [business]);

    // Function to handle opening the form for a new item or editing an existing one
    const openForm = (itemToEdit: PortfolioItem | null, isNewItem: boolean) => {
        setEditingItem(itemToEdit);
        setIsAddingNew(isNewItem);
    };

    const handleAddItemClick = () => {
        // First step: open image upload modal to get the image
        setIsAddingNew(true);
        setEditingItem({ // Temporary item, image will be added by modal
            id: generateId(),
            imageUrl: '',
            caption: '',
        });
        setIsImageUploadModalOpen(true);
    };

    const handleEditItemClick = (item: PortfolioItem) => {
        openForm({ ...item }, false); // Directly open form for existing item
    };

    const handleDeleteItem = (id: string) => {
        if (window.confirm('Are you sure you want to delete this portfolio item?')) {
            setCurrentPortfolio(prev => prev.filter(item => item.id !== id));
        }
    };

    // Callback from UploadMediaModal when an image is selected/uploaded
    const handleImageUploaded = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const newImageUrl = reader.result as string;
            // Update the editingItem with the new image URL
            if (editingItem) {
                 setEditingItem(prev => ({ ...prev!, imageUrl: newImageUrl }));
            } else {
                // This case should ideally not happen with current flow, but as a fallback
                setEditingItem({ id: generateId(), imageUrl: newImageUrl, caption: '' });
            }
            setIsImageUploadModalOpen(false); // Close the image upload modal
            // If it was a new item, now open the PortfolioItemForm
            if (isAddingNew && !editingItem?.imageUrl) { // Only if this is the initial image upload for a new item
                openForm(editingItem ? { ...editingItem, imageUrl: newImageUrl } : { id: generateId(), imageUrl: newImageUrl, caption: '' }, true);
            }
        };
        reader.readAsDataURL(file);
    };

    // Callback from PortfolioItemForm when save button is clicked
    const handleSaveItem = (item: PortfolioItem) => {
        if (isAddingNew) {
            setCurrentPortfolio(prev => [...prev, item]);
        } else {
            setCurrentPortfolio(prev => prev.map(s => (s.id === item.id ? item : s)));
        }
        setEditingItem(null);
        setIsAddingNew(false);
    };

    // Callback from PortfolioItemForm when cancel button is clicked
    const handleCancelForm = () => {
        setEditingItem(null);
        setIsAddingNew(false);
        setIsImageUploadModalOpen(false); // Ensure modal is closed if it was open
    };

    // Handler to open the image upload modal when requested from PortfolioItemForm (e.g., Change Image button)
    const requestImageUpload = () => {
        setIsImageUploadModalOpen(true);
    };

    const handleFinalSave = () => {
        onSavePortfolio(currentPortfolio);
        onClose();
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
            maxWidth: '1200px',
            margin: '0 auto',
            height: 'fit-content',
            overflowY: 'auto',
            boxSizing: 'border-box',
        }}>
            <h4 style={{ marginTop: 0, marginBottom: '20px', textAlign: 'center', color: 'var(--text-color)' }}>
                Manage Portfolio for {business.name}
            </h4>

            {editingItem && (isAddingNew || editingItem.imageUrl) && !isImageUploadModalOpen ? ( // Only show form if an item is being edited/added AND image modal is closed
                <PortfolioItemForm
                    item={editingItem}
                    onSave={handleSaveItem}
                    onCancel={handleCancelForm}
                    isNew={isAddingNew}
                    onUploadImage={requestImageUpload} // Pass the handler to open the image upload modal
                />
            ) : ( // Show list view or initial add button
                <>
                    <button onClick={handleAddItemClick} style={{ marginBottom: '20px' }} aria-label="Add new portfolio item">
                        Add New Portfolio Item
                    </button>

                    {currentPortfolio.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                            gap: '20px',
                            maxHeight: '500px',
                            overflowY: 'auto',
                            paddingRight: '10px',
                        }}>
                            {currentPortfolio.map(item => (
                                <div key={item.id} style={{
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    backgroundColor: 'var(--background-color)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                }}>
                                    <div style={{ width: '100%', height: '180px', overflow: 'hidden', backgroundColor: 'var(--border-color)' }}>
                                        <img src={item.imageUrl} alt={item.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ padding: '15px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <p style={{ margin: '0 0 10px 0', fontSize: '0.95em', flexGrow: 1 }}>{item.caption}</p>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                                            <button className="btn-secondary" onClick={() => handleEditItemClick(item)} style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`Edit ${item.caption}`}>Edit</button>
                                            <button className="btn-danger" onClick={() => handleDeleteItem(item.id)} style={{ padding: '5px 10px', fontSize: '0.8em' }} aria-label={`Delete ${item.caption}`}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ opacity: 0.8 }}>No portfolio items found for this business.</p>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px' }}>
                        <button className="btn-secondary" onClick={onClose} aria-label="Go Back from portfolio management">Go Back</button>
                        <button onClick={handleFinalSave} aria-label="Save all portfolio changes">Save All Changes</button>
                    </div>
                </>
            )}

            {/* This modal is rendered conditionally for both adding a new image or changing an existing one */}
            <UploadMediaModal
                isOpen={isImageUploadModalOpen}
                onClose={handleCancelForm} // If user cancels upload, cancel the whole form
                onUpload={handleImageUploaded}
                title={isAddingNew ? "Upload Portfolio Image" : "Change Portfolio Image"}
                currentImageUrl={editingItem?.imageUrl || undefined} // Show current image in modal if available
            />
        </div>
    );
};

interface PortfolioItemFormProps {
    item: PortfolioItem;
    onSave: (item: PortfolioItem) => void;
    onCancel: () => void;
    isNew: boolean;
    onUploadImage: () => void; // Callback to trigger image upload modal
}

const PortfolioItemForm: React.FC<PortfolioItemFormProps> = ({ item, onSave, onCancel, isNew, onUploadImage }) => {
    const [formData, setFormData] = useState<PortfolioItem>(item);

    useEffect(() => {
        setFormData(item);
    }, [item]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.imageUrl) {
            alert('An image is required for portfolio items.');
            return;
        }
        if (!formData.caption.trim()) {
            alert('A caption is required for portfolio items.');
            return;
        }
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'var(--background-color)' }}>
            <h5 style={{ marginTop: 0, marginBottom: '10px', color: 'var(--primary-color)' }}>{isNew ? 'Add New Portfolio Item' : `Edit Portfolio Item`}</h5>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                <div style={{
                    width: '150px',
                    height: '100px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--border-color)',
                }}>
                    {formData.imageUrl ? (
                        <img src={formData.imageUrl} alt="Portfolio preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <span style={{ color: 'var(--text-color-light-gray)' }}>No Image</span>
                    )}
                </div>
                <button type="button" className="btn-secondary" onClick={onUploadImage} aria-label="Upload or change image">
                    {formData.imageUrl ? 'Change Image' : 'Upload Image'}
                </button>
            </div>

            <div>
                <label htmlFor="portfolioCaption" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Caption:</label>
                <textarea id="portfolioCaption" name="caption" value={formData.caption} onChange={handleChange} rows={3} required style={{ width: '100%' }} aria-label="Portfolio item caption"></textarea>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="btn-secondary" onClick={onCancel} aria-label="Cancel editing portfolio item">Cancel</button>
                <button type="submit" aria-label="Save portfolio item">{isNew ? 'Add Item' : 'Update Item'}</button>
            </div>
        </form>
    );
};

interface BusinessReviewsViewerProps {
    business: Business;
    onClose: () => void;
    onSaveReviews: (updatedReviews: CustomerReview[]) => void;
}

const BusinessReviewsViewer: React.FC<BusinessReviewsViewerProps> = ({ business, onClose, onSaveReviews }) => {
    const [currentReviews, setCurrentReviews] = useState<CustomerReview[]>(business.customerReviews || []);
    const [respondingTo, setRespondingTo] = useState<string | null>(null); // ID of the review being responded to
    const [adminResponseText, setAdminResponseText] = useState('');

    useEffect(() => {
        setCurrentReviews(business.customerReviews || []);
    }, [business]);

    const handleDeleteReview = (reviewId: string) => {
        if (window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
            setCurrentReviews(prev => prev.filter(r => r.id !== reviewId));
        }
    };

    const handleRespondToReview = (reviewId: string) => {
        setRespondingTo(reviewId);
        const existingResponse = currentReviews.find(r => r.id === reviewId)?.response?.text || '';
        setAdminResponseText(existingResponse);
    };

    const handleSaveResponse = (reviewId: string) => {
        if (!adminResponseText.trim()) {
            alert('Response cannot be empty.');
            return;
        }
        setCurrentReviews(prev =>
            prev.map(r =>
                r.id === reviewId
                    ? {
                          ...r,
                          response: {
                              adminId: 'admin-001', // Mock admin ID
                              adminName: 'Admin Joe', // Mock admin name
                              text: adminResponseText.trim(),
                              date: new Date().toISOString().split('T')[0],
                          },
                      }
                    : r
            )
        );
        setRespondingTo(null);
        setAdminResponseText('');
    };

    const handleCancelResponse = () => {
        setRespondingTo(null);
        setAdminResponseText('');
    };

    const handleFinalSave = () => {
        onSaveReviews(currentReviews);
        onClose();
    };

    const renderStars = (rating: number) => {
        return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
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
            maxWidth: '900px',
            margin: '0 auto',
            height: 'fit-content',
            overflowY: 'auto',
            boxSizing: 'border-box',
        }}>
            <h4 style={{ marginTop: 0, marginBottom: '20px', textAlign: 'center', color: 'var(--text-color)' }}>
                Customer Reviews for {business.name}
            </h4>

            {currentReviews.length > 0 ? (
                <div style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: '10px' }}>
                    {currentReviews.map(review => (
                        <div key={review.id} style={{
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            padding: '15px',
                            marginBottom: '15px',
                            backgroundColor: 'var(--background-color)',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <strong>{review.clientName}</strong>
                                <span style={{ fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>{review.date}</span>
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <span style={{ color: 'gold' }}>{renderStars(review.rating)}</span> ({review.rating}/5)
                            </div>
                            <p style={{ margin: '0 0 10px 0', fontSize: '1em' }}>"{review.comment}"</p>

                            {review.response && (
                                <div style={{ borderLeft: '3px solid var(--primary-color)', paddingLeft: '10px', marginTop: '15px', background: 'var(--card-bg)', borderRadius: '4px', padding: '10px' }}>
                                    <strong style={{ color: 'var(--primary-color)' }}>Admin Response ({review.response.adminName}):</strong>
                                    <p style={{ margin: '5px 0 0 0', fontSize: '0.9em' }}>{review.response.text}</p>
                                    <span style={{ fontSize: '0.8em', color: 'var(--text-color-light-gray)' }}>{review.response.date}</span>
                                </div>
                            )}

                            {respondingTo === review.id ? (
                                <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <textarea
                                        value={adminResponseText}
                                        onChange={(e) => setAdminResponseText(e.target.value)}
                                        placeholder="Type your response here..."
                                        rows={3}
                                        style={{ width: '100%' }}
                                        aria-label="Admin response text"
                                    ></textarea>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                        <button className="btn-secondary" onClick={handleCancelResponse} aria-label="Cancel response">Cancel</button>
                                        <button onClick={() => handleSaveResponse(review.id)} aria-label="Save response">Save Response</button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px' }}>
                                    <button className="btn-secondary" onClick={() => handleRespondToReview(review.id)} aria-label={`Respond to review by ${review.clientName}`}>
                                        {review.response ? 'Edit Response' : 'Respond'}
                                    </button>
                                    <button className="btn-danger" onClick={() => handleDeleteReview(review.id)} aria-label={`Delete review by ${review.clientName}`}>Delete</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ opacity: 0.8, textAlign: 'center' }}>No customer reviews found for this business yet.</p>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px' }}>
                <button className="btn-secondary" onClick={onClose} aria-label="Go Back from reviews management">Go Back</button>
                <button onClick={handleFinalSave} aria-label="Save all review changes">Save All Changes</button>
            </div>
        </div>
    );
};


// --- Feature Section Components (Placeholders) ---

interface UserManagementProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    onEditUser: (user: User) => void;
    onViewActivity: (user: User) => void;
    onResetPassword: (user: User) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ users, setUsers, onEditUser, onViewActivity, onResetPassword }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [filterCity, setFilterCity] = useState('All');
    const [filterGender, setFilterGender] = useState('All');
    const [sortByUser, setSortByUser] = useState<'name' | 'city' | 'gender' | 'dateJoined' | 'status'>('name');
    const [sortOrderUser, setSortOrderUser] = useState<'asc' | 'desc'>('asc');

    const uniqueCities = useMemo(() => ['All', ...new Set(users.map(u => u.city))].sort(), [users]);
    // Use the defined GENDER_OPTIONS directly for consistency
    const uniqueGenders = useMemo(() => ['All', ...GENDER_OPTIONS].sort(), []);

    const handleDeactivate = (id: string) => {
        setUsers(prevUsers => prevUsers.map(user => user.id === id ? { ...user, status: 'Inactive' } : user));
    };

    const handleEditUserClick = (user: User) => {
        onEditUser(user);
    };

    const handleOpenResetPasswordClick = (user: User) => {
        onResetPassword(user);
    };

    const handleOpenUserActivityClick = (user: User) => {
        onViewActivity(user);
    };

    const getFilteredAndSortedUsers = useMemo(() => {
        let filtered = users;

        // Apply search term
        if (searchTerm) {
            filtered = filtered.filter(user =>
                `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.phone.includes(searchTerm) ||
                user.city.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply filters
        if (filterCity !== 'All') {
            filtered = filtered.filter(user => user.city === filterCity);
        }
        if (filterGender !== 'All') {
            filtered = filtered.filter(user => user.gender === filterGender);
        }

        // Apply sorting
        filtered.sort((a, b) => {
            let compareA: string | number;
            let compareB: string | number;

            if (sortByUser === 'name') {
                compareA = `${a.firstName} ${a.lastName}`.toLowerCase();
                compareB = `${b.firstName} ${b.lastName}`.toLowerCase();
            } else if (sortByUser === 'city') {
                compareA = a.city.toLowerCase();
                compareB = b.city.toLowerCase();
            } else if (sortByUser === 'gender') {
                compareA = a.gender.toLowerCase();
                compareB = b.gender.toLowerCase();
            } else if (sortByUser === 'dateJoined') {
                compareA = a.dateJoined;
                compareB = b.dateJoined;
            } else if (sortByUser === 'status') {
                compareA = a.status.toLowerCase();
                compareB = b.status.toLowerCase();
            } else {
                return 0; // Default no sort
            }

            if (compareA < compareB) return sortOrderUser === 'asc' ? -1 : 1;
            if (compareA > compareB) return sortOrderUser === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [users, searchTerm, filterCity, filterGender, sortByUser, sortOrderUser]);


    return (
        <div>
            <Card title="User Search">
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Search by name, email, phone, or city"
                        style={{ flexGrow: 1 }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Search users"
                    />
                    <button aria-label="Perform search">Search</button>
                </div>
            </Card>

            <Card title="Filters & Sort">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Filters (Left side) */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        <select value={filterCity} onChange={(e) => setFilterCity(e.target.value)} style={{ minWidth: '120px' }} aria-label="Filter by city">
                            <option value="All">All Cities</option>
                            {uniqueCities.filter(city => city !== 'All').map(city => (<option key={city} value={city}>{city}</option>))}
                        </select>
                        <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)} style={{ minWidth: '120px' }} aria-label="Filter by gender">
                            <option value="All">All Genders</option>
                            {uniqueGenders.filter(gender => gender !== 'All').map(gender => (<option key={gender} value={gender}>{gender}</option>))}
                        </select>
                    </div>

                    {/* Sort (Right side) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <label htmlFor="user-sort-by-select" style={{ whiteSpace: 'nowrap' }}>Sort by:</label>
                        <select
                            id="user-sort-by-select"
                            value={`${sortByUser}-${sortOrderUser}`}
                            onChange={(e) => {
                                const [by, order] = e.target.value.split('-');
                                setSortByUser(by as 'name' | 'city' | 'gender' | 'dateJoined' | 'status');
                                setSortOrderUser(order as 'asc' | 'desc');
                            }}
                            style={{ minWidth: '150px' }}
                            aria-label="Sort users by"
                        >
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                            <option value="city-asc">City (A-Z)</option>
                            <option value="city-desc">City (Z-A)</option>
                            <option value="gender-asc">Gender (A-Z)</option>
                            <option value="gender-desc">Gender (Z-A)</option>
                            <option value="dateJoined-asc">Date Joined (Oldest first)</option>
                            <option value="dateJoined-desc">Date Joined (Newest first)</option>
                            <option value="status-asc">Status (A-Z)</option>
                            <option value="status-desc">Status (Z-A)</option>
                        </select>
                    </div>
                </div>
            </Card>

            <Card title="All Users">
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }} aria-label="User list">
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Email</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Phone</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>City</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Gender</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Date Joined</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getFilteredAndSortedUsers.map(user => (
                            <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '8px' }}>{user.firstName} {user.lastName} {user.flagged && <span style={{ color: 'var(--danger-color)', fontSize: '0.8em' }}>(Flagged)</span>}</td>
                                <td style={{ padding: '8px' }}>{user.email}</td>
                                <td style={{ padding: '8px' }}>{user.phone}</td>
                                <td style={{ padding: '8px' }}>{user.city}</td>
                                <td style={{ padding: '8px' }}>{user.gender}</td>
                                <td style={{ padding: '8px' }}>{user.dateJoined}</td>
                                <td style={{ padding: '8px' }}>{user.status}</td>
                                <td style={{ padding: '8px' }}>
                                    <button onClick={() => handleEditUserClick(user)} style={{ marginRight: '5px' }} aria-label={`Edit profile for ${user.firstName} ${user.lastName}`}>Edit Profile</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <Card title="Account Actions">
                    <p>Reset Passwords / Manually Verify Emails: (Form Placeholder)</p>
                    <p>Flagged or Reported Users: (List Placeholder)</p>
                </Card>
                <Card title="Advanced Features">
                    <p>Merge Duplicate Accounts: (Tool Placeholder)</p>
                    <button className="btn-secondary">Impersonate User</button>
                </Card>
            </div>
        </div>
    );
};

interface BusinessManagementProps {
    businesses: Business[];
    setBusinesses: React.Dispatch<React.SetStateAction<Business[]>>;
    onEditBusiness: (business: Business) => void;
    onManageStaff: (business: Business) => void;
    onViewActivity: (business: Business) => void;
    onResetPassword: (business: Business) => void;
    onManageServiceOffers: (business: Business) => void;
    onManageClients: (business: Business) => void; // New prop
    onManagePortfolio: (business: Business) => void; // New prop
    onViewReviews: (business: Business) => void; // New prop
}

const BusinessManagement: React.FC<BusinessManagementProps> = ({ businesses, setBusinesses, onEditBusiness, onManageStaff, onViewActivity, onResetPassword, onManageServiceOffers, onManageClients, onManagePortfolio, onViewReviews }) => {
    const businessActivities = [
        'Barbershop', 'Hair and Make Up Salon', 'Nail Salon',
        'Football Field Rentals', 'Dental Clinics', 'Videogaming Clubs', 'Spa', 'Others'
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [filterActivity, setFilterActivity] = useState('All');
    const [filterCity, setFilterCity] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortBy, setSortBy] = useState<'name' | 'activity' | 'dateAdded'>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');


    const uniqueActivities = useMemo(() => ['All', ...new Set(businesses.map(b => b.activity))].sort(), [businesses]);
    const uniqueCities = useMemo(() => ['All', ...new Set(businesses.map(b => b.city))].sort(), [businesses]);

    const handleEditBusinessClick = (business: Business) => {
        onEditBusiness(business);
    };

    const handleOpenManageStaffClick = (business: Business) => {
        onManageStaff(business);
    };

    const handleOpenBusinessActivityClick = (business: Business) => {
        onViewActivity(business);
    };

    const handleOpenResetBusinessPasswordClick = (business: Business) => {
        onResetPassword(business);
    };

    const handleOpenManageServiceOffersClick = (business: Business) => {
        onManageServiceOffers(business);
    };

    const handleOpenManageClientsClick = (business: Business) => {
        onManageClients(business);
    };

    const handleOpenManagePortfolioClick = (business: Business) => {
        onManagePortfolio(business);
    };

    const handleOpenViewReviewsClick = (business: Business) => {
        onViewReviews(business);
    };

    const getFilteredAndSortedBusinesses = useMemo(() => {
        let filtered = businesses;

        // Apply search term
        if (searchTerm) {
            filtered = filtered.filter(biz =>
                biz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                biz.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                biz.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                biz.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                biz.phone.includes(searchTerm)
            );
        }

        // Apply filters
        if (filterActivity !== 'All') {
            filtered = filtered.filter(biz => biz.activity === filterActivity);
        }
        if (filterCity !== 'All') {
            filtered = filtered.filter(biz => biz.city === filterCity);
        }
        if (filterStatus !== 'All') {
            filtered = filtered.filter(biz => biz.status === filterStatus);
        }

        // Apply sorting
        filtered.sort((a, b) => {
            let compareA: string | number;
            let compareB: string | number;

            if (sortBy === 'name') {
                compareA = a.name.toLowerCase();
                compareB = b.name.toLowerCase();
            } else if (sortBy === 'activity') {
                compareA = a.activity.toLowerCase();
                compareB = b.activity.toLowerCase();
            } else if (sortBy === 'dateAdded') {
                compareA = a.dateAdded;
                compareB = b.dateAdded;
            } else {
                return 0; // Default no sort
            }

            if (compareA < compareB) return sortOrder === 'asc' ? -1 : 1;
            if (compareA > compareB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [businesses, searchTerm, filterActivity, filterCity, filterStatus, sortBy, sortOrder]);


    return (
        <div>
            <Card title="Business Search">
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Search by name, address, city, email, or phone"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ flexGrow: 1 }}
                        aria-label="Search businesses"
                    />
                    <button aria-label="Perform business search">Search</button>
                </div>
            </Card>
            <Card title="Business Filters & Sort">
                <div style={{ marginBottom: '15px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {/* Filters */}
                    <select value={filterActivity} onChange={(e) => setFilterActivity(e.target.value)} style={{ minWidth: '120px' }} aria-label="Filter by activity">
                        {uniqueActivities.map(activity => (
                            <option key={activity} value={activity}>{activity}</option>
                        ))}
                    </select>

                    <select value={filterCity} onChange={(e) => setFilterCity(e.target.value)} style={{ minWidth: '120px' }} aria-label="Filter by city">
                        {uniqueCities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>

                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ minWidth: '120px' }} aria-label="Filter by status">
                        <option value="All">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                    </select>

                    {/* Sort */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: 'auto' }}> {/* Aligns to right */}
                        <label htmlFor="sort-by-select" style={{ whiteSpace: 'nowrap' }}>Sort by:</label>
                        <select
                            id="sort-by-select"
                            value={`${sortBy}-${sortOrder}`}
                            onChange={(e) => {
                                const [by, order] = e.target.value.split('-');
                                setSortBy(by as 'name' | 'activity' | 'dateAdded');
                                setSortOrder(order as 'asc' | 'desc');
                            }}
                            style={{ minWidth: '120px' }}
                            aria-label="Sort businesses by"
                        >
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                            <option value="activity-asc">Activity (A-Z)</option>
                            <option value="activity-desc">Activity (Z-A)</option>
                            <option value="dateAdded-asc">Date Added (Oldest first)</option>
                            <option value="dateAdded-desc">Date Added (Newest first)</option>
                        </select>
                    </div>
                </div>
            </Card>

            <Card title="All Businesses">
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }} aria-label="Business list">
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Business ID</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Activity</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>City</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Date Added</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Reviews</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getFilteredAndSortedBusinesses.map(business => (
                            <tr key={business.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '8px' }}>{business.id}</td>
                                <td style={{ padding: '8px' }}>{business.name}</td>
                                <td style={{ padding: '8px' }}>{business.activity}</td>
                                <td style={{ padding: '8px' }}>{business.city}</td>
                                <td style={{ padding: '8px' }}>{business.dateAdded}</td>
                                <td style={{ padding: '8px' }}>{business.status}</td>
                                <td style={{ padding: '8px' }}>{business.reviews}</td>
                                <td style={{ padding: '8px' }}>
                                    <button onClick={() => handleEditBusinessClick(business)} aria-label={`Edit profile for ${business.name}`}>Edit Profile</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <Card title="Business Analytics">
                    <p>Revenue: $XXXX.XX</p>
                    <p>Booking Volume: XXX</p>
                    <p>Average Rating: X.X</p>
                    <p>Payout Details: (Placeholder)</p>
                </Card>
                <Card title="Optional Features">
                    <p>Manage "Featured" Businesses: (UI Placeholder)</p>
                </Card>
            </div>
        </div>
    );
};

// Helper to generate booking ID
const generateBookingId = (businessId: string) => `${businessId}-${generateFiveDigitNumber()}`;

const BookingEditor: React.FC<{
    booking: Booking;
    onClose: () => void;
    onSave: (updatedBooking: Booking) => void;
    onCancelBooking: (bookingId: string) => void;
    onRefundBooking: (bookingId: string) => void;
}> = ({ booking, onClose, onSave, onCancelBooking, onRefundBooking }) => {
    const [formData, setFormData] = useState<Booking>(booking);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Basic validation
        if (!formData.service.trim() || !formData.date || !formData.time) {
            alert('Service, Date, and Time are required.');
            return;
        }
        onSave(formData);
    };

    const isCancelEnabled = formData.status !== 'Cancelled' && formData.status !== 'Completed';
    const isRefundEnabled = formData.status === 'Completed';

    return (
        <div style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '30px',
            marginBottom: '20px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
            height: 'fit-content',
            overflowY: 'auto',
            boxSizing: 'border-box',
        }}>
            <h4 style={{ marginTop: 0, marginBottom: '20px', textAlign: 'center', color: 'var(--text-color)' }}>
                Edit Booking: {booking.id}
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Booking ID:</label>
                    <input type="text" value={formData.id} readOnly style={{ width: '100%' }} aria-label="Booking ID" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Client:</label>
                    <input type="text" value={formData.client} readOnly style={{ width: '100%' }} aria-label="Client Name" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Business:</label>
                    <input type="text" value={formData.business} readOnly style={{ width: '100%' }} aria-label="Business Name" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>City:</label>
                    <input type="text" value={formData.city} readOnly style={{ width: '100%' }} aria-label="City" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="editService" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Service:</label>
                    <input type="text" id="editService" name="service" value={formData.service} onChange={handleChange} style={{ width: '100%' }} aria-label="Service" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="editDate" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Date:</label>
                    <input type="date" id="editDate" name="date" value={formData.date} onChange={handleChange} style={{ width: '100%' }} aria-label="Date" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="editTime" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Time:</label>
                    <input type="time" id="editTime" name="time" value={formData.time} onChange={handleChange} style={{ width: '100%' }} aria-label="Time" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="editStatus" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Status:</label>
                    <select id="editStatus" name="status" value={formData.status} onChange={handleChange} style={{ width: '100%' }} aria-label="Status">
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="No-show">No-show</option>
                    </select>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px', gap: '10px', flexWrap: 'wrap' }}>
                <button className="btn-danger" onClick={() => onCancelBooking(booking.id)} disabled={!isCancelEnabled} style={{ flex: 1, minWidth: '150px' }} aria-label={`Cancel booking ${booking.id}`}>Cancel Booking</button>
                <button className="btn-secondary" onClick={() => onRefundBooking(booking.id)} disabled={!isRefundEnabled} style={{ flex: 1, minWidth: '150px' }} aria-label={`Issue refund for booking ${booking.id}`}>Issue Refund</button>
                <button className="btn-secondary" onClick={onClose} style={{ flex: 1, minWidth: '150px' }} aria-label="Go back to booking list">Go Back</button>
                <button onClick={handleSave} style={{ flex: 1, minWidth: '150px' }} aria-label="Save changes to booking">Save Changes</button>
            </div>
        </div>
    );
};

interface BookingManagementProps {
    allBusinesses: Business[]; // Pass all businesses for realistic booking generation
}

const BookingManagement: React.FC<BookingManagementProps> = ({ allBusinesses }) => {
    const initialBookings = useMemo(() => {
        if (allBusinesses.length === 0) return [];
        return Array.from({ length: 6 }, () => {
            const randomBusiness = allBusinesses[Math.floor(Math.random() * allBusinesses.length)];
            const clientName = `${getRandomFirstName()} ${getRandomLastName()}`;
            const serviceOptions = randomBusiness.serviceOffers?.map(s => s.title) || ['General Service'];
            const randomService = serviceOptions[Math.floor(Math.random() * serviceOptions.length)];

            return {
                id: generateBookingId(randomBusiness.id),
                businessId: randomBusiness.id,
                client: clientName,
                business: randomBusiness.name,
                city: randomBusiness.city,
                service: randomService,
                date: getRandomDate(new Date(2024, 6, 1), new Date(2024, 8, 30)), // Dates in July-September
                time: `${Math.floor(Math.random() * 10) + 9}:00 AM`, // 9 AM to 6 PM
                status: ['Confirmed', 'Pending', 'Completed', 'Cancelled', 'No-show'][Math.floor(Math.random() * 5)] as Booking['status'],
            };
        });
    }, [allBusinesses]);

    const [bookings, setBookings] = useState<Booking[]>(initialBookings);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [isEditBookingModalOpen, setIsEditBookingModalOpen] = useState(false);

    const handleEditBooking = (booking: Booking) => {
        setSelectedBooking(booking);
        setIsEditBookingModalOpen(true);
    };

    const handleCloseBookingEditor = () => {
        setSelectedBooking(null);
        setIsEditBookingModalOpen(false);
    };

    const handleSaveBooking = (updatedBooking: Booking) => {
        setBookings(prev => prev.map(b => (b.id === updatedBooking.id ? updatedBooking : b)));
        handleCloseBookingEditor();
        alert(`Booking ${updatedBooking.id} updated successfully!`);
    };

    const handleCancelBookingAction = (bookingId: string) => {
        if (window.confirm(`Are you sure you want to cancel booking ${bookingId}?`)) {
            setBookings(prev => prev.map(b => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b)));
            setSelectedBooking(prev => prev ? { ...prev, status: 'Cancelled' } : null); // Update selected booking state
            alert(`Booking ${bookingId} has been cancelled.`);
        }
    };

    const handleRefundBookingAction = (bookingId: string) => {
        if (window.confirm(`Are you sure you want to issue a refund for booking ${bookingId}?`)) {
            // In a real app, this would trigger an actual refund process
            alert(`Refund initiated for booking ${bookingId}! (Placeholder)`);
            // Optionally, update status or add a refund status
            // setBookings(prev => prev.map(b => (b.id === bookingId ? { ...b, status: 'Refunded' } : b)));
            handleCloseBookingEditor();
        }
    };


    if (isEditBookingModalOpen && selectedBooking) {
        return (
            <BookingEditor
                booking={selectedBooking}
                onClose={handleCloseBookingEditor}
                onSave={handleSaveBooking}
                onCancelBooking={handleCancelBookingAction}
                onRefundBooking={handleRefundBookingAction}
            />
        );
    }

    return (
        <div>
            {/* <SectionTitle title="📅 Booking Management" description="View, create, modify, and resolve conflicts for appointments." /> */}
            <Card title="Booking Explorer & Filters">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <input type="text" placeholder="Search by client or business" style={{ flexGrow: 1 }} aria-label="Search bookings by client or business" />
                    <input type="date" aria-label="Filter bookings by date" />
                    <select aria-label="Filter bookings by status">
                        <option>All Statuses</option>
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                    </select>
                    <button aria-label="Apply booking filters">Filter</button>
                </div>
            </Card>

            <Card title="All Bookings">
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }} aria-label="Booking list">
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ padding: '8px', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Client</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Business</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>City</th> {/* New City Column */}
                            <th style={{ padding: '8px', textAlign: 'left' }}>Service</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Date/Time</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '8px' }}>{booking.id}</td>
                                <td style={{ padding: '8px' }}>{booking.client}</td>
                                <td style={{ padding: '8px' }}>{booking.business}</td>
                                <td style={{ padding: '8px' }}>{booking.city}</td> {/* Display City */}
                                <td style={{ padding: '8px' }}>{booking.service}</td>
                                <td style={{ padding: '8px' }}>{booking.date} {booking.time}</td>
                                <td style={{ padding: '8px' }}>{booking.status}</td>
                                <td style={{ padding: '8px' }}>
                                    <button onClick={() => handleEditBooking(booking)} style={{ marginRight: '5px' }} aria-label={`Edit booking ${booking.id}`}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <Card title="Create / Modify Booking">
                    <p>Manual booking form placeholder</p>
                </Card>
                <Card title="Conflict Resolution Dashboard">
                    <p>Show overlapping or failed bookings: (UI Placeholder)</p>
                </Card>
            </div>
        </div>
    );
};

const PaymentsTransactions: React.FC = () => (
    <div>
        {/* <SectionTitle title="💰 Payments & Transactions" description="Monitor all financial transactions, issue refunds, and track revenue." /> */}
        <Card title="Payment & Refund Log">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                <input type="text" placeholder="Search by user, business, or ID" style={{ flexGrow: 1 }} aria-label="Search transactions" />
                <select aria-label="Filter transactions by type"><option>All Types</option><option>Payment</option><option>Refund</option></select>
                <input type="date" placeholder="From Date" aria-label="Filter from date" />
                <input type="date" placeholder="To Date" aria-label="Filter to date" />
                <button aria-label="Apply transaction filters">Filter</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }} aria-label="Payment and refund log">
                <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Txn ID</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Client</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Business</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Amount</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Type</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td colSpan={7} style={{ padding: '8px', textAlign: 'center' }}><em>No transactions to display.</em></td></tr>
                </tbody>
            </table>
        </Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Card title="Issue Refund / Credit">
                <p>Form to manually issue refunds or credits (Placeholder)</p>
            </Card>
            <Card title="Revenue Reports">
                <p>Total Revenue: $XXX,XXX.XX</p>
                <p>Monthly Revenue: $XX,XXX.XX</p>
                <button className="btn-secondary">Download Financial Statements (CSV/PDF)</button>
            </Card>
        </div>
    </div>
);

const ReviewsRatingsReports: React.FC = () => (
    <div>
        {/* <SectionTitle title="💬 Reviews, Ratings, and Reports" description="Moderation tools for user content and reported items." /> */}
        <Card title="Reviews & Ratings Moderation">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                <input type="text" placeholder="Search by review content, user, or business" style={{ flexGrow: 1 }} aria-label="Search reviews" />
                <select aria-label="Filter review status"><option>All Statuses</option><option>Active</option><option>Flagged</option><option>Hidden</option></select>
                <button aria-label="Apply review filters">Filter</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }} aria-label="Review and rating moderation table">
                <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Review ID</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>User</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Business</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Rating</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Content</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: '8px' }}>{generateId()}</td>
                        <td style={{ padding: '8px' }}>Client A</td>
                        <td style={{ padding: '8px' }}>Business X</td>
                        <td style={{ padding: '8px' }}>5/5</td>
                        <td style={{ padding: '8px' }}>"Great service!"</td>
                        <td style={{ padding: '8px' }}>Active</td>
                        <td style={{ padding: '8px' }}>
                            <button className="btn-danger" style={{ marginRight: '5px' }} aria-label="Flag review">Flag</button>
                            <button className="btn-secondary" style={{ marginRight: '5px' }} aria-label="Hide review">Hide</button>
                            <button className="btn-success" aria-label="Restore review">Restore</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
        <Card title="Report Reasons">
            <p>List of reported content with reasons (e.g., "offensive", "fake") (UI Placeholder)</p>
            <p>Optional: AI-powered review scanning (UI Placeholder)</p>
        </Card>
    </div>
);

const AnalyticsDashboard: React.FC = () => (
    <div>
        {/* <SectionTitle title="📊 Analytics Dashboard" description="Overview of key platform metrics and performance." /> */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <Card title="Total Bookings" style={{ textAlign: 'center' }}><h2>1,234</h2></Card>
            <Card title="New Users (Monthly)" style={{ textAlign: 'center' }}><h2>150</h2></Card>
            <Card title="Active Businesses" style={{ textAlign: 'center' }}><h2>50</h2></Card>
            <Card title="Total Revenue" style={{ textAlign: 'center' }}><h2>$125,000</h2></Card>
        </div>
        <Card title="Revenue Trends (Monthly)">
            <div style={{ height: '200px', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-color)' }}>
                <em>Chart Placeholder</em>
            </div>
        </Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Card title="Most Booked Businesses">
                <ul>
                    <li>Stylin' Barbershop (120 bookings)</li>
                    <li>Nail Nirvana Salon (80 bookings)</li>
                </ul>
            </Card>
            <Card title="System Health">
                <p>System Uptime: 99.9%</p>
                <p>Error Logs: (Link/Status Placeholder)</p>
                <p>Optional: Real-time monitoring (UI Placeholder)</p>
            </Card>
        </div>
    </div>
);

const NotificationsCommunication: React.FC = () => (
    <div>
        {/* <SectionTitle title="⚡ Notifications & Communication" description="Send messages and manage system notification templates." /> */}
        <Card title="Send Notification">
            <label htmlFor="recipient-type" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Recipient:</label>
            <select id="recipient-type" style={{ width: '100%', marginBottom: '8px' }} aria-label="Notification recipient type">
                <option>All Users</option>
                <option>All Businesses</option>
                <option>Specific User</option>
                <option>Specific Business</option>
            </select>
            <label htmlFor="message-subject" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Subject:</label>
            <input type="text" id="message-subject" placeholder="Notification Subject" style={{ width: '100%', marginBottom: '8px' }} aria-label="Notification subject" />
            <label htmlFor="message-body" style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em', color: 'var(--text-color-light-gray)' }}>Message Body:</label>
            <textarea id="message-body" rows={5} placeholder="Your message here..." style={{ width: '100%', marginBottom: '10px' }} aria-label="Notification message body"></textarea>
            <button aria-label="Send notification">Send Notification</button>
        </Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Card title="Manage System Templates">
                <ul>
                    <li>Booking Confirmed Email</li>
                    <li>Payment Received SMS</li>
                    <li>Password Reset Email</li>
                </ul>
                <button className="btn-secondary">Edit Templates</button>
            </Card>
            <Card title="Delivery Logs">
                <p>View history of sent notifications: (Table Placeholder)</p>
                <p>Optional: Built-in email editor + preview (UI Placeholder)</p>
            </Card>
        </div>
    </div>
);

const PlatformConfiguration: React.FC = () => (
    <div>
        {/* <SectionTitle title="🧱 Platform Configuration" description="Configure global settings, policies, and integrations." /> */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Card title="Service Categories">
                <p>List and manage service categories (e.g., Hair, Nails, Massage)</p>
                <button>Manage Categories</button>
            </Card>
            <Card title="Pricing & Commission Rules">
                <p>Set global pricing rules or commission rates.</p>
                <button>Edit Rules</button>
            </Card>
            <Card title="Cancellation Policies">
                <p>Define platform-wide cancellation policy rules.</p>
                <button>Edit Policies</button>
            </Card>
            <Card title="Payment Gateways">
                <label style={{ display: 'block', marginBottom: '5px' }}><input type="checkbox" style={{ marginRight: '5px' }} /> Enable Stripe</label>
                <label style={{ display: 'block', marginBottom: '5px' }}><input type="checkbox" style={{ marginRight: '5px' }} /> Enable PayPal</label>
            </Card>
            <Card title="Feature Toggles">
                <label style={{ display: 'block', marginBottom: '5px' }}><input type="checkbox" style={{ marginRight: '5px' }} /> Enable Beta Feature X</label>
                <label style={{ display: 'block', marginBottom: '5px' }}><input type="checkbox" style={{ marginRight: '5px' }} /> Enable Google Calendar Sync</label>
            </Card>
            <Card title="Role-Based Permissions">
                <p>Super Admin, Support Agent, Finance Admin (UI Placeholder)</p>
                <button className="btn-secondary">Manage Roles</button>
            </Card>
        </div>
    </div>
);

const SupportIssueResolution: React.FC = () => (
    <div>
        {/* <SectionTitle title="🚨 Support & Issue Resolution" description="Tools for the support team to resolve client and business issues." /> */}
        <Card title="Open Issues/Tickets">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                <input type="text" placeholder="Search by user, booking, or issue description" style={{ flexGrow: 1 }} aria-label="Search issues" />
                <button aria-label="Search issues">Search</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }} aria-label="Open issues and tickets table">
                <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Issue ID</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Regarding</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Summary</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: '8px' }}>{generateId()}</td>
                        <td style={{ padding: '8px' }}>Booking 123 (Client A)</td>
                        <td style={{ padding: '8px' }}>Client wants to reschedule</td>
                        <td style={{ padding: '8px' }}>New</td>
                        <td style={{ padding: '8px' }}>
                            <button style={{ marginRight: '5px' }} aria-label="View issue details">View Details</button>
                            <button className="btn-secondary" aria-label="Assign issue">Assign</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
        <Card title="Issue Details & Actions (Selected Issue)">
            <h4>Issue: Client wants to reschedule Booking 123</h4>
            <p><strong>Internal Notes:</strong></p>
            <textarea rows={3} placeholder="Add internal notes here..." style={{ width: '100%', marginBottom: '10px' }} aria-label="Internal notes for issue"></textarea>
            <p><strong>Message/Chat Logs:</strong></p>
            <div style={{ border: '1px solid var(--border-color)', padding: '10px', minHeight: '80px', marginBottom: '10px', backgroundColor: 'var(--background-color)' }}>
                <em>Chat log with Client A and Business X...</em>
            </div>
            <p><strong>Tags:</strong> <input type="text" placeholder="e.g., VIP Client, Problematic Barber" style={{ width: '100%' }} aria-label="Issue tags" /></p>
            <input type="file" style={{ display: 'block', marginBottom: '10px', color: 'var(--text-color)' }} aria-label="Attach file to issue" />
            <button className="btn-danger" style={{ marginRight: '5px' }} aria-label="Issue refund or voucher">Issue Refund/Voucher</button>
            <button className="btn-secondary" aria-label="Export case details">Export Case</button>
        </Card>
    </div>
);

const DeveloperMaintenanceTools: React.FC = () => (
    <div>
        {/* <SectionTitle title="🧰 Developer & Maintenance Tools" description="Access system logs, monitor API calls, and manage maintenance modes." /> */}
        <Card title="System Logs">
            <textarea readOnly rows={10} style={{ width: '100%', backgroundColor: 'var(--background-color)', color: 'var(--text-color)', border: '1px solid var(--border-color)' }} value={`[${new Date().toLocaleString()}] INFO: Application started.
[${new Date().toLocaleString()}] WARN: High memory usage detected.
[${new Date().toLocaleString()}] ERROR: Failed to connect to database.`} aria-label="System logs"></textarea>
            <button className="btn-secondary">Refresh Logs</button>
        </Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Card title="API Call Monitor">
                <p>Real-time API traffic and error rates. (UI Placeholder)</p>
            </Card>
            <Card title="Database Management">
                <p>View database snapshots / backups. (UI Placeholder)</p>
                <button className="btn-secondary">Trigger Backup</button>
            </Card>
            <Card title="Release Version & Maintenance">
                <p>Current Version: 1.0.0</p>
                <button className="btn-danger" style={{ marginRight: '10px' }}>Toggle Maintenance Mode</button>
                <button className="btn-secondary">View Release Notes</button>
            </Card>
            <Card title="Optional Features">
                <p>Map view: visualize active businesses or bookings (UI Placeholder)</p>
                <p>Automation rules (UI Placeholder)</p>
                <p>AI insights: detect churn risk (UI Placeholder)</p>
                <button className="btn-danger" style={{ marginRight: '5px' }}>Bulk Actions</button>
                <button className="btn-secondary">Custom Reporting Builder</button>
            </Card>
        </div>
    </div>
);

// --- Main App Component ---

const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('user-management');
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    // Master list of users and businesses, managed by App
    const initialUsersData: User[] = useMemo(() => Array.from({ length: 6 }, generateRandomUser), []);
    const [allUsers, setAllUsers] = useState<User[]>(initialUsersData);

    const businessActivities = [
        'Barbershop', 'Hair and Make Up Salon', 'Nail Salon',
        'Football Field Rentals', 'Dental Clinics', 'Videogaming Clubs', 'Spa', 'Others'
    ];
    const initialBusinessesData: Business[] = useMemo(() =>
        businessActivities.map(activity => generateRandomBusiness(activity))
    , []);
    const [allBusinesses, setAllBusinesses] = useState<Business[]>(initialBusinessesData);


    // State for handling sub-views within User Management
    const [userSubView, setUserSubView] = useState<'list' | 'editProfile' | 'viewActivity' | 'resetPassword'>('list');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // State for handling sub-views within Business Management
    const [businessSubView, setBusinessSubView] = useState<'list' | 'editProfile' | 'manageStaff' | 'viewActivity' | 'resetPassword' | 'manageServiceOffers' | 'manageClients' | 'managePortfolio' | 'viewReviews'>('list');
    const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

    const sectionNames: { [key: string]: string } = {
        'user-management': '🧍‍♂️ User Management',
        'business-management': '💈 Business Management', // Updated title
        'booking-management': '📅 Booking Management',
        'payments-transactions': '💰 Payments & Transactions',
        'reviews-ratings-reports': '💬 Reviews, Ratings, and Reports',
        'analytics-dashboard': '📊 Analytics Dashboard',
        'notifications-communication': '⚡ Notifications & Communication',
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

    // --- User Management Callbacks ---
    const handleSelectUserForEdit = (user: User) => {
        setSelectedUser(user);
        setUserSubView('editProfile');
        // setActiveSection('user-management'); // Ensure correct section is active (already handled by renderContent logic)
    };
    const handleViewUserActivity = (user: User) => {
        setSelectedUser(user);
        setUserSubView('viewActivity');
        // setActiveSection('user-management');
    };
    const handleResetUserPassword = (user: User) => {
        setSelectedUser(user);
        setUserSubView('resetPassword');
        // setActiveSection('user-management');
    };
    const handleUserSubViewClose = () => {
        setSelectedUser(null);
        setUserSubView('list');
    };

    const handleUserPhotoUpload = (file: File, userId: string) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setAllUsers(prevUsers => prevUsers.map(u => u.id === userId ? { ...u, profilePhotoUrl: reader.result as string } : u));
            setSelectedUser(prev => prev ? { ...prev, profilePhotoUrl: reader.result as string } : null); // Update selected user for immediate display
        };
        reader.readAsDataURL(file);
    };

    // --- Business Management Callbacks ---
    const handleSelectBusinessForEdit = (business: Business) => {
        setSelectedBusiness(business);
        setBusinessSubView('editProfile');
        // setActiveSection('business-management'); // Already handled
    };
    const handleManageBusinessStaff = (business: Business) => {
        setSelectedBusiness(business);
        setBusinessSubView('manageStaff');
        // setActiveSection('business-management');
    };
    const handleViewBusinessActivity = (business: Business) => {
        setSelectedBusiness(business);
        setBusinessSubView('viewActivity');
        // setActiveSection('business-management');
    };
    const handleResetBusinessPassword = (business: Business) => {
        setSelectedBusiness(business);
        setBusinessSubView('resetPassword');
        // setActiveSection('business-management');
    };
    const handleManageBusinessServiceOffers = (business: Business) => {
        setSelectedBusiness(business);
        setBusinessSubView('manageServiceOffers');
    };
    const handleManageBusinessClients = (business: Business) => { // New handler
        setSelectedBusiness(business);
        setBusinessSubView('manageClients');
    };
    const handleManageBusinessPortfolio = (business: Business) => { // New handler
        setSelectedBusiness(business);
        setBusinessSubView('managePortfolio');
    };
    const handleViewBusinessReviews = (business: Business) => { // New handler
        setSelectedBusiness(business);
        setBusinessSubView('viewReviews');
    };
    const handleBusinessSubViewClose = () => {
        setSelectedBusiness(null);
        setBusinessSubView('list');
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
            setSelectedBusiness(prev => { // Update selected business for immediate display in editor
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
        setSelectedBusiness(prev => prev ? { ...prev, staff: updatedStaff } : null); // Update selected business in state
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
            // No direct update to selectedStaffMember here, as it's managed internally by BusinessStaffManager
            // and will be re-rendered with new data from updated allBusinesses
        };
        reader.readAsDataURL(file);
    };

    const isSubViewActive = (section: string) => {
        if (section === 'user-management') {
            return userSubView !== 'list';
        }
        if (section === 'business-management') {
            return businessSubView !== 'list';
        }
        return false;
    };

    const getHeaderTitleAndGoBack = () => {
        let titleOverride = undefined;
        let onGoBack = undefined;
        let showBackButton = false;

        if (activeSection === 'user-management' && userSubView !== 'list') {
            showBackButton = true;
            onGoBack = handleUserSubViewClose;
            switch (userSubView) {
                case 'editProfile': titleOverride = 'Edit User Profile'; break;
                case 'viewActivity': titleOverride = 'User Activity History'; break;
                case 'resetPassword': titleOverride = 'Reset User Password'; break;
            }
        } else if (activeSection === 'business-management' && businessSubView !== 'list') {
            showBackButton = true;
            onGoBack = handleBusinessSubViewClose;
            switch (businessSubView) {
                case 'editProfile': titleOverride = 'Edit Business Profile'; break;
                case 'manageStaff': titleOverride = 'Manage Business Staff'; break; // Simplified title
                case 'viewActivity': titleOverride = 'Business Activity History'; break;
                case 'resetPassword': titleOverride = 'Reset Business Password'; break;
                case 'manageServiceOffers': titleOverride = 'Manage Service Offers'; break;
                case 'manageClients': titleOverride = 'Manage Business Clients'; break;
                case 'managePortfolio': titleOverride = 'Manage Business Portfolio'; break; // New title
                case 'viewReviews': titleOverride = 'View Business Reviews'; break; // New title
            }
        }
        return { titleOverride, onGoBack, showBackButton };
    };

    const { titleOverride, onGoBack, showBackButton } = getHeaderTitleAndGoBack();


    const renderContent = () => {
        switch (activeSection) {
            case 'user-management':
                if (userSubView === 'editProfile' && selectedUser) {
                    return (
                        <UserProfileEditor
                            user={selectedUser}
                            onClose={handleUserSubViewClose}
                            onSave={(updatedUser) => {
                                setAllUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
                                setSelectedUser(updatedUser); // Update selected user in state to reflect changes if staying on page
                                handleUserSubViewClose();
                            }}
                            uniqueCities={Array.from(new Set(allUsers.map(u => u.city))).sort()}
                            uniqueGenders={GENDER_OPTIONS}
                            onViewActivity={handleViewUserActivity}
                            onResetPassword={handleResetUserPassword}
                            onUploadProfilePhoto={handleUserPhotoUpload} // Pass the new handler
                        />
                    );
                } else if (userSubView === 'viewActivity' && selectedUser) {
                    return <UserActivityViewer user={selectedUser} onClose={handleUserSubViewClose} />;
                } else if (userSubView === 'resetPassword' && selectedUser) {
                    return <UserPasswordReset user={selectedUser} onClose={handleUserSubViewClose} />;
                } else {
                    return (
                        <UserManagement
                            users={allUsers}
                            setUsers={setAllUsers}
                            onEditUser={handleSelectUserForEdit}
                            onViewActivity={handleViewUserActivity}
                            onResetPassword={handleResetUserPassword}
                        />
                    );
                }
            case 'business-management':
                if (businessSubView === 'editProfile' && selectedBusiness) {
                    return (
                        <BusinessProfileEditor
                            business={selectedBusiness}
                            onClose={handleBusinessSubViewClose}
                            onSave={(updatedBusiness) => {
                                setAllBusinesses(prevBusinesses => prevBusinesses.map(b => b.id === updatedBusiness.id ? updatedBusiness : b));
                                setSelectedBusiness(updatedBusiness); // Update selected business in state to reflect changes
                                handleBusinessSubViewClose();
                            }}
                            uniqueCities={Array.from(new Set(allBusinesses.map(b => b.city))).sort()}
                            uniqueActivities={businessActivities.filter(a => a !== 'All')}
                            onViewStaff={handleManageBusinessStaff}
                            onViewActivity={handleViewBusinessActivity}
                            onResetPassword={handleResetBusinessPassword}
                            onUploadCoverPhoto={handleBusinessCoverPhotoUpload} // Pass the new handler
                            onManageServiceOffers={handleManageBusinessServiceOffers}
                            onManageClients={handleManageBusinessClients} // Pass new callback
                            onManagePortfolio={handleManageBusinessPortfolio} // Pass new callback
                            onViewReviews={handleViewBusinessReviews} // Pass new callback
                        />
                    );
                } else if (businessSubView === 'manageStaff' && selectedBusiness) {
                    return (
                        <BusinessStaffManager
                            business={selectedBusiness}
                            onClose={handleBusinessSubViewClose}
                            onSaveStaff={handleSaveBusinessStaff} // Pass new save handler
                            onUploadStaffMedia={handleBusinessStaffPhotoUpload} // Pass new upload handler
                        />
                    );
                } else if (businessSubView === 'viewActivity' && selectedBusiness) {
                    return <BusinessActivityViewer business={selectedBusiness} onClose={handleBusinessSubViewClose} />;
                } else if (businessSubView === 'resetPassword' && selectedBusiness) {
                    return <BusinessPasswordReset business={selectedBusiness} onClose={handleBusinessSubViewClose} />;
                } else if (businessSubView === 'manageServiceOffers' && selectedBusiness) {
                    return (
                        <BusinessServiceOffersManager
                            business={selectedBusiness}
                            onClose={handleBusinessSubViewClose}
                            onSaveOffers={(updatedOffers) => {
                                setAllBusinesses(prevBusinesses => prevBusinesses.map(b => b.id === selectedBusiness.id ? { ...b, serviceOffers: updatedOffers } : b));
                                setSelectedBusiness(prev => prev ? { ...prev, serviceOffers: updatedOffers } : null); // Update selected business in state
                            }}
                        />
                    );
                } else if (businessSubView === 'manageClients' && selectedBusiness) { // New condition
                    return (
                        <BusinessClientManager
                            business={selectedBusiness}
                            onClose={handleBusinessSubViewClose}
                            onSaveClients={(updatedClients) => {
                                setAllBusinesses(prevBusinesses => prevBusinesses.map(b => b.id === selectedBusiness.id ? { ...b, clients: updatedClients } : b));
                                setSelectedBusiness(prev => prev ? { ...prev, clients: updatedClients } : null); // Update selected business in state
                            }}
                        />
                    );
                } else if (businessSubView === 'managePortfolio' && selectedBusiness) { // New condition
                    return (
                        <BusinessPortfolioManager
                            business={selectedBusiness}
                            onClose={handleBusinessSubViewClose}
                            onSavePortfolio={(updatedPortfolio) => {
                                setAllBusinesses(prevBusinesses => prevBusinesses.map(b => b.id === selectedBusiness.id ? { ...b, portfolio: updatedPortfolio } : b));
                                setSelectedBusiness(prev => prev ? { ...prev, portfolio: updatedPortfolio } : null); // Update selected business in state
                            }}
                        />
                    );
                } else if (businessSubView === 'viewReviews' && selectedBusiness) { // New condition
                    return (
                        <BusinessReviewsViewer
                            business={selectedBusiness}
                            onClose={handleBusinessSubViewClose}
                            onSaveReviews={(updatedReviews) => {
                                setAllBusinesses(prevBusinesses => prevBusinesses.map(b => b.id === selectedBusiness.id ? { ...b, customerReviews: updatedReviews } : b));
                                setSelectedBusiness(prev => prev ? { ...prev, customerReviews: updatedReviews } : null); // Update selected business in state
                            }}
                        />
                    );
                }
                else {
                    return (
                        <BusinessManagement
                            businesses={allBusinesses}
                            setBusinesses={setAllBusinesses}
                            onEditBusiness={handleSelectBusinessForEdit}
                            onManageStaff={handleManageBusinessStaff}
                            onViewActivity={handleViewBusinessActivity}
                            onResetPassword={handleResetBusinessPassword}
                            onManageServiceOffers={handleManageBusinessServiceOffers}
                            onManageClients={handleManageBusinessClients} // Pass to BusinessManagement
                            onManagePortfolio={handleManageBusinessPortfolio} // Pass to BusinessManagement
                            onViewReviews={handleViewBusinessReviews} // Pass to BusinessManagement
                        />
                    );
                }
            case 'booking-management':
                return <BookingManagement allBusinesses={allBusinesses} />;
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
            <Sidebar activeSection={activeSection} onSelectSection={setActiveSection} onToggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
            {/* The right side container for Header and ContentArea */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}> {/* Removed height: 100vh here, letting flex:1 handle height */}
                <Header
                    currentSectionTitle={sectionNames[activeSection]}
                    titleOverride={titleOverride}
                    onGoBack={onGoBack}
                    showBackButton={showBackButton}
                />
                <ContentArea>
                    {renderContent()}
                </ContentArea>
            </div>
        </div>
    );
};

// --- Render the App ---
const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}