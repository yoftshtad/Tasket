'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }
    
    setStatus('loading');
    setMessage('');
    
    // Save to Supabase
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email: email.toLowerCase().trim() }]);
    
    if (error) {
      if (error.code === '23505') { // Unique violation
        setStatus('error');
        setMessage('This email is already subscribed!');
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    } else {
      setStatus('success');
      setMessage('Thanks for subscribing! 🎉');
      setEmail('');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
      <p className="text-gray-400 text-sm mb-4">
        Get the latest tips and updates for your courses.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500 bg-white text-gray-900"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      
      {message && (
        <p className={`text-sm mt-3 ${
          status === 'success' ? 'text-green-500' : 'text-red-500'
        }`}>
          {message}
        </p>
      )}
    </div>
  );
}