'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function UploadPage() {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  
  const [form, setForm] = useState({
    title: '',
    type: 'exam',
    course_id: '',
    file: null as File | null,
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    const { data } = await supabase
      .from('courses')
      .select('id, name');
    setCourses(data || []);
    console.log('Courses loaded:', data); // Debug: check console
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.file) return;
    
    setLoading(true);
    
    // Upload to Storage
    const fileName = `${Date.now()}_${form.file.name}`;
    const { data: storageData, error: storageError } = await supabase.storage
      .from('documents')
      .upload(fileName, form.file);
    
    if (storageError) {
      alert('Upload failed: ' + storageError.message);
      setLoading(false);
      return;
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(fileName);
    
    // Save to database
    const { error: dbError } = await supabase.from('documents').insert({
      title: form.title,
      type: form.type,
      file_url: publicUrl,
      course_id: parseInt(form.course_id),
    });
    
    if (dbError) {
      alert('Database error: ' + dbError.message);
    } else {
      alert('Document uploaded successfully!');
      setForm({ title: '', type: 'exam', course_id: '', file: null });
      // Reset file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-xl border p-8">
          <h1 className="text-2xl font-bold mb-6">Upload Document</h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Document Title</label>
              <input
                type="text"
                required
                className="w-full border rounded-lg px-4 py-2"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Document Type</label>
              <select
                className="w-full border rounded-lg px-4 py-2"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="exam">Exam</option>
                <option value="module">Module</option>
                <option value="lecture_note">Lecture Note</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Course</label>
              <select
                required
                className="w-full border rounded-lg px-4 py-2"
                value={form.course_id}
                onChange={(e) => setForm({ ...form, course_id: e.target.value })}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
              {courses.length === 0 && (
                <p className="text-red-500 text-sm mt-1">
                  No courses found. Please add courses first via the "Add Course" page.
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">PDF File</label>
              <input
                id="file-input"
                type="file"
                required
                accept=".pdf"
                className="w-full border rounded-lg px-4 py-2"
                onChange={(e) => setForm({ ...form, file: e.target.files?.[0] || null })}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Uploading...' : 'Upload Document'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}