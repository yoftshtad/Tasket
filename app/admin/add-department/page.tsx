'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AddDepartment() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.from('departments').insert({
      name,
      description,
    });
    
    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Department added!');
      setName('');
      setDescription('');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-xl border p-8">
          <h1 className="text-2xl font-bold mb-6">Add New Department</h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Department Name</label>
              <input
                type="text"
                required
                className="w-full border rounded-lg px-4 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description (optional)</label>
              <textarea
                className="w-full border rounded-lg px-4 py-2"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
            >
              {loading ? 'Adding...' : 'Add Department'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}