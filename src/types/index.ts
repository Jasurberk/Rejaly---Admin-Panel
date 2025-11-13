// --- Type Definitions ---
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    phone: string;
    birthday: string;
    city: string;
    address?: string;
    favoriteServiceType?: string;
    dateJoined: string;
    status: 'Active' | 'Inactive' | 'Pending';
    profilePhotoUrl?: string;
    flagged: boolean;
    passwordHash: string;
}

export interface StaffMember {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    phone: string;
    active: boolean;
    profilePhotoUrl?: string;
    passwordHash: string;
}

export interface ServiceOffer {
    id: string;
    title: string;
    description: string;
    price: number;
    durationMinutes: number;
    discountPercentage?: number;
    discountAmount?: number;
    discountStartDate?: string;
    discountEndDate?: string;
}

export interface Client {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone: string;
    lastVisitDate?: string;
    upcomingVisitDate?: string;
}

export interface PortfolioItem {
    id: string;
    imageUrl: string;
    caption: string;
}

export interface CustomerReviewResponse {
    adminId: string;
    adminName: string;
    text: string;
    date: string;
}

export interface CustomerReview {
    id: string;
    clientName: string;
    rating: number;
    comment: string;
    date: string;
    response?: CustomerReviewResponse;
}

export interface Business {
    id: string;
    name: string;
    activity: string;
    address: string;
    city: string;
    status: 'Active' | 'Pending' | 'Inactive';
    reviews: number;
    dateAdded: string;
    email: string;
    phone: string;
    description: string;
    website?: string;
    logoUrl?: string;
    staff?: StaffMember[];
    passwordHash: string;
    coverPhotoUrls?: string[];
    serviceOffers?: ServiceOffer[];
    clients?: Client[];
    portfolio?: PortfolioItem[];
    customerReviews?: CustomerReview[];
}

export interface Booking {
    id: string;
    businessId: string;
    clientId: string;
    client: string;
    business: string;
    city: string;
    service: string;
    date: string;
    time: string;
    status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled' | 'No-show';
}

export interface AdminCredentials {
    username: string;
    email: string;
}
