import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DownloadButton from '@/components/DownloadButton';

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ courseId: string }>
}

function getTypeBadge(type: string) {
  const styles: Record<string, string> = {
    exam: 'bg-red-100 text-red-800',
    module: 'bg-blue-100 text-blue-800',
    lecture_note: 'bg-green-100 text-green-800',
  }
  const labels: Record<string, string> = {
    exam: 'Exam',
    module: 'Module',
    lecture_note: 'Lecture Note',
  }
  return {
    className: styles[type] || 'bg-gray-100 text-gray-800',
    label: labels[type] || type,
  }
}

export default async function CourseDocumentsPage({ params }: PageProps) {
  const { courseId } = await params
  const courseIdNum = parseInt(courseId)

  console.log('Looking for course with ID:', courseIdNum)

  // Fetch course
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseIdNum)
    .single()

  if (courseError) {
    console.error('Course fetch error:', courseError)
    console.log('Course ID', courseIdNum, 'not found in database')
    notFound()
  }

  if (!course) {
    console.log('No course found for ID:', courseIdNum)
    notFound()
  }

  // Fetch year and department info
  const { data: year } = await supabase
    .from('years')
    .select('year_number, department_id')
    .eq('id', course.year_id)
    .single()

  let department = null
  if (year) {
    const { data: dept } = await supabase
      .from('departments')
      .select('id, name')
      .eq('id', year.department_id)
      .single()
    department = dept
  }

  // Fetch documents for this course
  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .eq('course_id', courseIdNum)
    .order('type', { ascending: true })

  console.log('Found documents:', documents?.length)

  // Fetch all departments for sidebar
  const { data: allDepartments } = await supabase
    .from('departments')
    .select('id, name')
    .order('name')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <Link 
            href={`/year/${course.year_id}`} 
            className="text-purple-600 hover:underline inline-block mb-4"
          >
            ← Back to Courses
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{course.name}</h1>
          {department && year && (
            <p className="text-xl text-gray-600">
              {department.name} - Year {year.year_number}
            </p>
          )}
          <p className="text-gray-500 mt-2 max-w-2xl">
            {course.description || 'Access lecture notes, past exams, and study materials for this course.'}
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border p-4 sticky top-8">
              <h2 className="font-semibold text-lg mb-3">All Departments</h2>
              <ul className="space-y-2">
                {allDepartments?.map((dept) => (
                  <li key={dept.id}>
                    <Link
                      href={`/department/${dept.id}`}
                      className={`block py-1 text-gray-700 hover:text-blue-600 hover:underline ${
                        dept.id === department?.id ? 'text-blue-600 font-medium' : ''
                      }`}
                    >
                      {dept.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <h2 className="text-2xl font-semibold mb-6">Study Materials</h2>

            {!documents || documents.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border">
                <p className="text-gray-500">No documents available for this course yet.</p>
                <p className="text-gray-400 text-sm mt-2">Course ID: {courseIdNum}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {documents.map((doc) => {
                  const badge = getTypeBadge(doc.type)
                  return (
                    <div
                      key={doc.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="mb-3 sm:mb-0">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {doc.title}
                        </h3>
                        <span className={`inline-block text-xs px-2 py-1 rounded mt-2 ${badge.className}`}>
                          {badge.label}
                        </span>
                      </div>
                      <DownloadButton fileUrl={doc.file_url} title={doc.title} />
                    </div>
                  )
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}