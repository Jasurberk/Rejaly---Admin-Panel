import React, { useState, useEffect } from 'react';
import { Business, CustomerReview } from '../../../types';

interface BusinessReviewsViewerProps {
    business: Business;
    onClose: () => void;
    onSaveReviews: (updatedReviews: CustomerReview[]) => void;
}

export const BusinessReviewsViewer: React.FC<BusinessReviewsViewerProps> = ({ business, onClose, onSaveReviews }) => {
    const [currentReviews, setCurrentReviews] = useState<CustomerReview[]>(business.customerReviews || []);
    const [respondingTo, setRespondingTo] = useState<string | null>(null);
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
