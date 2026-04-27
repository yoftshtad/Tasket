import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ deptId: string }>
}

export default async function DepartmentYearsPage({ params }: PageProps) {
  const { deptId } = await params
  const departmentId = parseInt(deptId)

  // Fetch department info
  const { data: department } = await supabase
    .from('departments')
    .select('id, name, description')
    .eq('id', departmentId)
    .single()

  if (!department) notFound()

  // Fetch years for this department
  const { data: years } = await supabase
    .from('years')
    .select('id, year_number')
    .eq('department_id', departmentId)
    .order('year_number', { ascending: true })

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
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{department.name}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {department.description || 'Select your year to access course materials, lecture notes, and past exams.'}
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - All Departments */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border p-4 sticky top-8">
              <h2 className="font-semibold text-lg mb-3">All Departments</h2>
              <ul className="space-y-2">
                {allDepartments?.map((dept) => (
                  <li key={dept.id}>
                    <Link
                      href={`/department/${dept.id}`}
                      className={`block py-1 text-gray-700 hover:text-blue-600 hover:underline ${
                        dept.id === departmentId ? 'text-blue-600 font-medium' : ''
                      }`}
                    >
                      {dept.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content - Year Cards */}
          <main className="flex-1">
            <div className="flex justify-end mb-6">
              <select className="border rounded-lg px-4 py-2 bg-white text-sm">
                <option>Sort by: Year</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {years?.map((year) => (
                <Link
                  key={year.id}
                  href={`/year/${year.id}`}
                  className="group block bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-purple-600 overflow-hidden"
                >
                  <div className="p-8 text-center">
                    <span className="text-5xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                      {year.year_number}
                    </span>
                    <p className="text-gray-500 mt-2">
                      {year.year_number === 1 ? 'st' : 
                       year.year_number === 2 ? 'nd' : 
                       year.year_number === 3 ? 'rd' : 'th'} Year
                    </p>
                    <p className="text-purple-600 mt-4 text-sm font-medium group-hover:underline">
                      View Courses →
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {(!years || years.length === 0) && (
              <div className="text-center py-12 bg-white rounded-lg border">
                <p className="text-gray-500">No years available for this department yet.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}