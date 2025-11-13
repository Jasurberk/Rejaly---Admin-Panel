import { Business, Client, CustomerReview, PortfolioItem, ServiceOffer, StaffMember, User } from '../types';

// --- Helper Functions and Mock Data ---

export const cities = ['Tashkent', 'Samarkand', 'Bukhara', 'Khiva', 'Fergana', 'Andijan', 'Namangan', 'Nukus', 'Termez', 'Urgench'];
export const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
export const firstNames = ['John', 'Jane', 'Alex', 'Sarah', 'Michael', 'Emily', 'David', 'Sophia', 'Chris', 'Olivia'];
export const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez'];
export const roles = ['Stylist', 'Barber', 'Technician', 'Instructor', 'Administrator', 'Manager'];

export const mockCoverPhotoUrls = [
    'https://via.placeholder.com/600x400/FF5733/FFFFFF?text=CoverPhoto1',
    'https://via.placeholder.com/600x400/33FF57/FFFFFF?text=CoverPhoto2',
    'https://via.placeholder.com/600x400/3357FF/FFFFFF?text=CoverPhoto3',
    'https://via.placeholder.com/600x400/FFFF33/000000?text=CoverPhoto4',
    'https://via.placeholder.com/600x400/FF33FF/FFFFFF?text=CoverPhoto5',
];

export const mockPortfolioImageUrls = [
    'https://via.placeholder.com/400x300/8B4513/FFFFFF?text=Portfolio1',
    'https://via.placeholder.com/400x300/20B2AA/FFFFFF?text=Portfolio2',
    'https://via.placeholder.com/400x300/6A5ACD/FFFFFF?text=Portfolio3',
    'https://via.placeholder.com/400x300/BA55D3/FFFFFF?text=Portfolio4',
    'https://via.placeholder.com/400x300/4682B4/FFFFFF?text=Portfolio5',
];

export const GENDER_OPTIONS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

export const businessActivities = [
    'Barbershop', 'Hair and Make Up Salon', 'Nail Salon',
    'Football Field Rentals', 'Dental Clinics', 'Videogaming Clubs', 'Spa', 'Others'
];

// Helper to generate a unique ID
export const generateId = (): string => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export const generateFiveDigitNumber = (): string => Math.floor(10000 + Math.random() * 90000).toString();

export const generateBusinessId = (activity: string): string => `biz-${activity.toLowerCase().replace(/\s/g, '-')}-${generateFiveDigitNumber()}`;

export const getRandomCity = (): string => cities[Math.floor(Math.random() * cities.length)];

export const getRandomDate = (start: Date, end: Date): string => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
};

export const getRandomPhoneNumber = (): string => `+998${Math.floor(100000000 + Math.random() * 900000000)}`; // Uzbek phone format

export const getRandomAddress = (): string => `${Math.floor(Math.random() * 100) + 1} ${['Main St', 'Park Ave', 'Highland Rd', 'Oak Ln'][Math.floor(Math.random() * 4)]}`;

export const getRandomStaffMember = (businessName: string): StaffMember => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    return {
        id: generateId(),
        firstName,
        lastName,
        role,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${businessName.toLowerCase().replace(/\s/g, '')}.com`,
        phone: getRandomPhoneNumber(),
        active: Math.random() > 0.1, // 90% active
        passwordHash: 'staff_hash',
        profilePhotoUrl: Math.random() > 0.7 ? `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}` : undefined,
    };
};

export const generateRandomServiceOffers = (activity: string, count: number): ServiceOffer[] => {
    const offers: ServiceOffer[] = [];
    const baseServices = {
        'Barbershop': ['Haircut', 'Beard Trim', 'Shave', 'Kids Haircut', 'Coloring'],
        'Hair and Make Up Salon': ['Hair Styling', 'Hair Coloring', 'Make Up Application', 'Bridal Package', 'Hair Treatment'],
        'Nail Salon': ['Manicure', 'Pedicure', 'Gel Nails', 'Acrylic Nails', 'Nail Art'],
        'Football Field Rentals': ['1 Hour Rental', '2 Hour Rental', 'Half-Day Package', 'Full-Day Package'],
        'Dental Clinics': ['Check-up', 'Cleaning', 'Filling', 'Whitening', 'Extraction'],
        'Videogaming Clubs': ['Hourly Pass', 'Half-Day Pass', 'Full-Day Pass', 'VIP Booth'],
        'Spa': ['Massage', 'Facial', 'Body Wrap', 'Sauna Access', 'Couple\'s Package'],
        'Others': ['Consultation', 'Basic Service', 'Premium Package'],
    };
    const availableServices = baseServices[activity as keyof typeof baseServices] || baseServices['Others'];

    for (let i = 0; i < count; i++) {
        const title = availableServices[i % availableServices.length];
        const price = parseFloat((Math.random() * 50 + 20).toFixed(2));
        const durationMinutes = Math.floor(Math.random() * 90) + 30;
        offers.push({
            id: generateId(),
            title: `${title} - ${activity.split(' ')[0]}`,
            description: `Professional ${title.toLowerCase()} service.`,
            price,
            durationMinutes,
        });
    }
    return offers;
};

export const generateRandomClients = (count: number): Client[] => {
    const clients: Client[] = [];
    for (let i = 0; i < count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        clients.push({
            id: generateId(),
            firstName,
            lastName,
            email: Math.random() > 0.3 ? `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com` : undefined,
            phone: getRandomPhoneNumber(),
            lastVisitDate: getRandomDate(new Date(2023, 0, 1), new Date()),
            upcomingVisitDate: Math.random() > 0.5 ? getRandomDate(new Date(), new Date(2025, 0, 1)) : undefined,
        });
    }
    return clients;
};

export const generateRandomCustomerReview = (): CustomerReview => {
    const clientFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const clientLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const rating = Math.floor(Math.random() * 3) + 3; // 3 to 5 stars
    const comments = [
        'Excellent service!', 'Very good experience.', 'Could be better.', 'Friendly staff and great results.',
        'Highly recommend!', 'Quick and efficient.', 'A bit pricy but worth it.', 'Will definitely come back.'
    ];
    const comment = comments[Math.floor(Math.random() * comments.length)];
    const date = getRandomDate(new Date(2024, 0, 1), new Date());

    return {
        id: generateId(),
        clientName: `${clientFirstName} ${clientLastName}`,
        rating,
        comment,
        date,
        response: Math.random() > 0.5 ? {
            adminId: 'admin-001',
            adminName: 'Admin Joe',
            text: 'Thank you for your feedback! We appreciate your business.',
            date: getRandomDate(new Date(date), new Date()),
        } : undefined,
    };
};


export const generateRandomUser = (): User => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const city = getRandomCity();
    const dateJoined = getRandomDate(new Date(2023, 0, 1), new Date());
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    const phone = getRandomPhoneNumber();
    const birthday = getRandomDate(new Date(1970, 0, 1), new Date(2005, 0, 1));
    const status = ['Active', 'Pending', 'Inactive'][Math.floor(Math.random() * 3)] as User['status'];
    const flagged = Math.random() > 0.9; // 10% chance of being flagged

    return {
        id: generateId(),
        firstName,
        lastName,
        gender,
        email,
        phone,
        birthday,
        city,
        address: Math.random() > 0.5 ? getRandomAddress() : undefined,
        favoriteServiceType: Math.random() > 0.5 ? ['Haircut', 'Massage', 'Manicure', 'Dental Checkup'][Math.floor(Math.random() * 4)] : undefined,
        dateJoined,
        status,
        profilePhotoUrl: Math.random() > 0.3 ? `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}` : undefined,
        passwordHash: 'dummy_user_hash',
        flagged,
    };
};


// Helper to generate a full random business
export const generateRandomBusiness = (activity: string): Business => {
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

// Helper to generate booking ID
export const generateBookingId = (entityId: string) => `${entityId}-${generateFiveDigitNumber()}`;
