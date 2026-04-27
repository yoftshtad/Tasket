import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Department {
  id: number
  name: string
  description: string | null
}

export default async function DepartmentsPage() {
  // Fetch all departments
  const { data: departments, error } = await supabase
    .from('departments')
    .select('id, name, description')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching departments:', error)
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-600">Failed to load departments.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-25">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-8">
            <span className="font-medium">Departments</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Academic Courses</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore curated materials, lecture notes, and practice exams across all departments. 
            Powered by student momentum.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - All Departments */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border p-4 sticky top-8">
              <h2 className="font-semibold text-lg mb-3">All Departments</h2>
              <ul className="space-y-2">
                {departments?.map((dept) => (
                  <li key={dept.id}>
                    <Link
                      href={`/department/${dept.id}`}
                      className="text-gray-700 hover:text-blue-600 hover:underline block py-1"
                    >
                      {dept.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content - Department Cards */}
          <main className="flex-1">
            {/* Sort dropdown */}
            <div className="flex justify-end mb-6">
              <select className="border rounded-lg px-4 py-2 bg-white text-sm">
                <option>Sort by: Recent</option>
                <option>Sort by: Name</option>
              </select>
            </div>

            {/* Department Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departments?.map((department) => (
                <div
                  key={department.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {department.name}
                    </h2>
                    <p className="text-gray-600 mt-2 mb-4 line-clamp-3">
                      {department.description || 'Access course materials, lecture notes, and past exams for all subjects in this department.'}
                    </p>
                    <Link
                      href={`/department/${department.id}`}
                      className="inline-flex items-center text-purple-600 font-medium hover:text-blue-800"
                    >
                      View Documents →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {(!departments || departments.length === 0) && (
              <div className="text-center py-12 bg-white rounded-lg border">
                <p className="text-gray-500">No departments available yet.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}