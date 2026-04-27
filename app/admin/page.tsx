'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Not logged in - redirect to home
        router.push('/');
        return;
      }
      
      // Check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      if (profile?.role === 'admin') {
        setIsAdmin(true);
        setLoading(false);
      } else {
        // Not admin - redirect to home
        router.push('/');
      }
    }
    
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Checking admin access...</div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/admin/upload" className="block p-6 bg-white rounded-xl border hover:shadow-lg">
            <div className="text-3xl mb-3">📤</div>
            <h2 className="text-xl font-semibold">Upload Document</h2>
            <p className="text-gray-500 text-sm mt-1">Add new PDFs to courses</p>
          </Link>
          
          <Link href="/admin/add-course" className="block p-6 bg-white rounded-xl border hover:shadow-lg">
            <div className="text-3xl mb-3">📚</div>
            <h2 className="text-xl font-semibold">Add Course</h2>
            <p className="text-gray-500 text-sm mt-1">Create new courses</p>
          </Link>
          
          <Link href="/admin/add-year" className="block p-6 bg-white rounded-xl border hover:shadow-lg">
            <div className="text-3xl mb-3">📅</div>
            <h2 className="text-xl font-semibold">Add Year</h2>
            <p className="text-gray-500 text-sm mt-1">Add years to departments</p>
          </Link>
          
          <Link href="/admin/add-department" className="block p-6 bg-white rounded-xl border hover:shadow-lg">
            <div className="text-3xl mb-3">🏛️</div>
            <h2 className="text-xl font-semibold">Add Department</h2>
            <p className="text-gray-500 text-sm mt-1">Create new departments</p>
          </Link>
        </div>
      </div>
    </div>
  );
}