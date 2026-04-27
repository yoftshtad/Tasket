'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import AuthModal from './AuthModal';
import { Button } from '@/components/ui/button';

interface DownloadButtonProps {
  fileUrl: string;
  title: string;
}

export default function DownloadButton({ fileUrl, title }: DownloadButtonProps) {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<string | null>(null);

  const handleDownload = () => {
    if (user) {
      // User is logged in - start download
      window.open(fileUrl, '_blank');
    } else {
      // Store the URL for after login
      setPendingDownload(fileUrl);
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    // After successful login, trigger the pending download
    if (pendingDownload) {
      window.open(pendingDownload, '_blank');
      setPendingDownload(null);
    }
  };

  return (
    <>
      <Button
        onClick={handleDownload}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        📥 Download
      </Button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          setPendingDownload(null);
        }}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}