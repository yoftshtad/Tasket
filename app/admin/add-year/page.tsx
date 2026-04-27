'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AddYear() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [form, setForm] = useState({ year_number: '', department_id: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  async function fetchDepartments() {
    const { data } = await supabase.from('departments').select('id, name');
    setDepartments(data || []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.from('years').insert({
      year_number: parseInt(form.year_number),
      department_id: parseInt(form.department_id),
    });
    
    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Year added!');
      setForm({ year_number: '', department_id: '' });
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-xl border p-8">
          <h1 className="text-2xl font-bold mb-6">Add New Year</h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Year Number</label>
              <input
                type="number"
                required
                min="1"
                max="6"
                className="w-full border rounded-lg px-4 py-2"
                value={form.year_number}
                onChange={(e) => setForm({ ...form, year_number: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <select
                required
                className="w-full border rounded-lg px-4 py-2"
                value={form.department_id}
                onChange={(e) => setForm({ ...form, department_id: e.target.value })}
              >
                <option value="">Select a department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
            >
              {loading ? 'Adding...' : 'Add Year'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}