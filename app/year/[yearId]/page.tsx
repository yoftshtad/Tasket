import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ yearId: string }>
}

export default async function YearCoursesPage({ params }: PageProps) {
  const { yearId } = await params
  const yearIdNum = parseInt(yearId)

  // Fetch year info
  const { data: year, error: yearError } = await supabase
    .from('years')
    .select('year_number, department_id')
    .eq('id', yearIdNum)
    .single()

  if (yearError || !year) {
    console.error('Year fetch error:', yearError)
    notFound()
  }

  // Fetch department name
  const { data: department } = await supabase
    .from('departments')
    .select('id, name')
    .eq('id', year.department_id)
    .single()

  // Fetch courses for this year (simplified - no description)
  const { data: courses, error: coursesError } = await supabase
    .from('courses')
    .select('id, name')
    .eq('year_id', yearIdNum)
    .order('name', { ascending: true })

  console.log('Courses found:', courses?.length)

  if (coursesError) {
    console.error('Courses error:', coursesError)
  }

  // Fetch all departments for sidebar
  const { data: allDepartments } = await supabase
    .from('departments')
    .select('id, name')
    .order('name')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-25">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {department?.name} - Year {year.year_number}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select your course to access lecture notes, past exams, and study materials.
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
                      className={`block py-1 text-gray-700 hover:text-purple-600 hover:underline ${
                        dept.id === department?.id ? 'text-purple-600 font-medium' : ''
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
            <div className="flex justify-end mb-6">
              <select className="border rounded-lg px-4 py-2 bg-white text-sm">
                <option>Sort by: Name</option>
              </select>
            </div>

            {!courses || courses.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border">
                <p className="text-gray-500">No courses available for this year yet.</p>
                <p className="text-gray-400 text-sm mt-2">Year ID: {yearIdNum} | Department: {department?.name}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/course/${course.id}`}
                    className="group block bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-purple-600 overflow-hidden"
                  >
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                        {course.name}
                      </h2>
                      <p className="text-gray-600">
                        Access lecture notes, past exams, and study materials for this course.
                      </p>
                      <p className="text-purple-600 mt-4 text-sm font-medium group-hover:underline">
                        View Documents →
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}