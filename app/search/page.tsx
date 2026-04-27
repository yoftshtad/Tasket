'use client';

import { useState, useEffect, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query]);

  async function performSearch() {
    setLoading(true);
    
    console.log('Searching for:', query);
    
    // 1. Search courses
    const { data: courseResults, error: courseError } = await supabase
      .from('courses')
      .select('id, name, year_id')
      .ilike('name', `%${query}%`);
    
    console.log('Course error:', courseError);
    
    // 2. For each course, get year and department info
    const enrichedCourses = [];
    if (courseResults && courseResults.length > 0) {
      for (const course of courseResults) {
        // Get year
        const { data: year } = await supabase
          .from('years')
          .select('id, year_number, department_id')
          .eq('id', course.year_id)
          .single();
        
        // Get department
        let department = null;
        if (year) {
          const { data: dept } = await supabase
            .from('departments')
            .select('id, name')
            .eq('id', year.department_id)
            .single();
          department = dept;
        }
        
        enrichedCourses.push({
          id: course.id,
          name: course.name,
          year_number: year?.year_number,
          department_name: department?.name,
          department_id: department?.id
        });
      }
    }
    
    // 3. Search documents
    const { data: documentResults, error: docError } = await supabase
      .from('documents')
      .select('id, title, type, file_url, course_id')
      .ilike('title', `%${query}%`);
    
    console.log('Document error:', docError);
    
    // 4. For each document, get course, year, department info
    const enrichedDocuments = [];
    if (documentResults && documentResults.length > 0) {
      for (const doc of documentResults) {
        // Get course
        const { data: course } = await supabase
          .from('courses')
          .select('id, name, year_id')
          .eq('id', doc.course_id)
          .single();
        
        let year = null;
        let department = null;
        
        if (course) {
          // Get year
          const { data: y } = await supabase
            .from('years')
            .select('id, year_number, department_id')
            .eq('id', course.year_id)
            .single();
          year = y;
          
          // Get department
          if (year) {
            const { data: dept } = await supabase
              .from('departments')
              .select('id, name')
              .eq('id', year.department_id)
              .single();
            department = dept;
          }
        }
        
        enrichedDocuments.push({
          id: doc.id,
          title: doc.title,
          type: doc.type,
          file_url: doc.file_url,
          course_id: doc.course_id,
          course_name: course?.name,
          year_number: year?.year_number,
          department_name: department?.name,
          department_id: department?.id
        });
      }
    }
    
    setCourses(enrichedCourses);
    setDocuments(enrichedDocuments);
    setLoading(false);
  }

  function getTypeBadge(type: string) {
    const styles: Record<string, string> = {
      exam: 'bg-red-100 text-red-800',
      module: 'bg-blue-100 text-blue-800',
      lecture_note: 'bg-green-100 text-green-800',
    };
    const labels: Record<string, string> = {
      exam: 'Exam',
      module: 'Module',
      lecture_note: 'Lecture Note',
    };
    return {
      className: styles[type] || 'bg-gray-100 text-gray-800',
      label: labels[type] || type,
    };
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Search Header */}
        <div className="mb-8">
          <Link href="/" className="text-purple-600 hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold mt-4">
            Search Results for "{query}"
          </h1>
          <p className="text-gray-600 mt-2">
            Found {courses.length + documents.length} results
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">Searching...</div>
        ) : (
          <>
            {/* Courses Section */}
            {courses.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Courses</h2>
                <div className="space-y-3">
                  {courses.map((course: any) => (
                    <Link
                      key={course.id}
                      href={`/course/${course.id}`}
                      className="block p-4 bg-white border rounded-lg hover:shadow-md transition"
                    >
                      <h3 className="font-semibold text-lg">{course.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {course.department_name} - Year {course.year_number}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Documents Section */}
            {documents.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Documents</h2>
                <div className="space-y-3">
                  {documents.map((doc: any) => {
                    const badge = getTypeBadge(doc.type);
                    return (
                      <div
                        key={doc.id}
                        className="p-4 bg-white border rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <h3 className="font-semibold text-lg">{doc.title}</h3>
                          <p className="text-gray-500 text-sm">
                            {doc.course_name} - {doc.department_name} Year {doc.year_number}
                          </p>
                          <span className={`inline-block text-xs px-2 py-1 rounded mt-2 ${badge.className}`}>
                            {badge.label}
                          </span>
                        </div>
                        <a
                          href={doc.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Download
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No Results */}
            {courses.length === 0 && documents.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg border">
                <p className="text-gray-500">No results found for "{query}"</p>
                <p className="text-gray-400 text-sm mt-2">
                  Try searching for a course name or document title
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Main component with Suspense wrapper
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}