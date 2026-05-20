export interface Student {
  id: string
  name: string
  avatar: string
  className: string
  grade: string
  gender: 'male' | 'female'
  age: number
  phone: string
  email: string
  status: 'active' | 'inactive'
}

export interface Teacher {
  id: string
  name: string
  avatar: string
  subject: string
  department: string
  title: string
  phone: string
  email: string
  status: 'active' | 'inactive'
}

export interface Course {
  id: string
  name: string
  subject: string
  teacherName: string
  teacherId: string
  className: string
  schedule: string
  credit: number
  status: 'ongoing' | 'completed' | 'pending'
}

export interface AttendanceRecord {
  id: string
  studentId: string
  studentName: string
  className: string
  date: string
  status: 'present' | 'absent' | 'late' | 'leave'
  reason?: string
}

export interface GradeRecord {
  id: string
  studentId: string
  studentName: string
  className: string
  subject: string
  score: number
  totalScore: number
  examName: string
  examDate: string
}

export interface DashboardStats {
  totalStudents: number
  totalTeachers: number
  totalCourses: number
  todayAttendanceRate: number
  weeklyAttendanceTrend: number[]
  gradeDistribution: Array<{ name: string; value: number; color: string }>
  subjectScores: Array<{ name: string; score: number }>
}