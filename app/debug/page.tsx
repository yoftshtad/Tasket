'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    async function getDebug() {
      // Get session
      const { data: { session } } = await supabase.auth.getSession();
      
      // Get profile
      let profile = null;
      if (session?.user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        profile = data;
      }
      
      setDebugInfo({
        hasSession: !!session,
        user: session?.user?.email || 'No user',
        userId: session?.user?.id || 'N/A',
        profile: profile,
      });
    }
    
    getDebug();
  }, []);

  if (!debugInfo) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Info</h1>
      
      <div className="space-y-2">
        <p><strong>Has Session?</strong> {debugInfo.hasSession ? 'Yes' : 'No'}</p>
        <p><strong>User Email:</strong> {debugInfo.user}</p>
        <p><strong>User ID:</strong> {debugInfo.userId}</p>
        <p><strong>Profile:</strong></p>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(debugInfo.profile, null, 2)}
        </pre>
      </div>
    </div>
  );
}