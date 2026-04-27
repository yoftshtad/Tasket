'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AddCourse() {
  const router = useRouter();
  const [years, setYears] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', year_id: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchYears();
  }, []);

  async function fetchYears() {
    const { data } = await supabase.from('years').select('id, year_number, departments(name)');
    setYears(data || []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.from('courses').insert({
      name: form.name,
      year_id: parseInt(form.year_id),
    });
    
    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Course added!');
      setForm({ name: '', year_id: '' });
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-xl border p-8">
          <h1 className="text-2xl font-bold mb-6">Add New Course</h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Course Name</label>
              <input
                type="text"
                required
                className="w-full border rounded-lg px-4 py-2"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Year</label>
              <select
                required
                className="w-full border rounded-lg px-4 py-2"
                value={form.year_id}
                onChange={(e) => setForm({ ...form, year_id: e.target.value })}
              >
                <option value="">Select a year</option>
                {years.map((year) => (
                  <option key={year.id} value={year.id}>
                    {year.departments?.name} - Year {year.year_number}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
            >
              {loading ? 'Adding...' : 'Add Course'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}