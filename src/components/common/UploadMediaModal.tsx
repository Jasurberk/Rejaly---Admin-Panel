import React, { useState, useEffect } from 'react';
import { Card } from './Card';

interface UploadMediaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (file: File) => void;
    title: string;
    currentImageUrl?: string;
}

export const UploadMediaModal: React.FC<UploadMediaModalProps> = ({ isOpen, onClose, onUpload, title, currentImageUrl }) => {
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
