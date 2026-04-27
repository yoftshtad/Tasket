'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import AuthModal from './AuthModal';

export default function Header() {
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    await signOut();
  };

  const getInitials = () => {
    if (!user?.email) return 'U';
    return user.email[0].toUpperCase();
  };

  const openLoginModal = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const openSignupModal = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 pt-4 px-4">
        <div className="max-w-7xl mx-auto rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg px-6 py-4 flex items-center justify-between flex-wrap gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="w-6 h-6 text-purple-600" />
            <span>Tasket</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              name="q"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-gray-400">
              🔍
            </button>
          </form>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/departments" className="text-gray-600 hover:text-black transition">
              Departments
            </Link>
            <Link href="#" className="text-gray-600 hover:text-black transition">
              Study Materials
            </Link>
            <Link href="#" className="text-gray-600 hover:text-black transition">
              Help
            </Link>
          </nav>

          {/* Auth Buttons / Avatar */}
          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer bg-purple-600 hover:bg-purple-700">
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-sm text-gray-500">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = '/admin'}>
                    Admin Panel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-purple-600 hover:text-purple-700"
                  onClick={openLoginModal}
                >
                  Log In
                </Button>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6"
                  onClick={openSignupModal}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          window.location.reload();
        }}
        initialMode={authMode}
      />
    </>
  );
}