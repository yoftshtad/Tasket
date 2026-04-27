export interface Department {
  id: number
  name: string
}

export interface Year {
  id: number
  year_number: number
  department_id: number
  departments?: Department
}

export interface Course {
  id: number
  name: string
  year_id: number
  years?: {
    id: number
    year_number: number
    departments: Department
  }
}

export interface Document {
  id: number
  title: string
  type: 'exam' | 'module' | 'lecture_note'
  file_url: string
  course_id: number
}