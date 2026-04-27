'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Facebook, Linkedin, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NewsletterSignup from '@/components/NewsletterSignup';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription
    setEmail('');
  };

  return (
    <footer 
      className="text-gray-300 py-16 px-4 relative overflow-hidden"
      style={{
        backgroundImage: 
          'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        backgroundColor: '#111827'
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 pb-16 border-b border-gray-800">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="w-6 h-6 text-white" />
            <span>Tasket</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              The all-in-one platform for university students.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition">
                <Facebook className="w-5 h-5 text-white" />
              </button>
              <button className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition">
                <span className="text-white text-lg font-bold">𝕏</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition">
                <Linkedin className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white transition">Departments</Link></li>
              <li><Link href="#" className="hover:text-white transition">Search material</Link></li>
              <li><Link href="#" className="hover:text-white transition">Help</Link></li>
              
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Available Departments</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white transition">Accounting and Finance</Link></li>
              <li><Link href="#" className="hover:text-white transition">Computer Science</Link></li>
              <li><Link href="#" className="hover:text-white transition">Economics</Link></li>
              <li><Link href="#" className="hover:text-white transition">Management</Link></li>
              <li><Link href="#" className="hover:text-white transition">Marketing</Link></li>
              <li><Link href="#" className="hover:text-white transition">Tourism & Hospitality Management</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white transition">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white transition">FAQs</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <NewsletterSignup />
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 Tasket. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
