import type { Student, Teacher, Course, AttendanceRecord, GradeRecord, DashboardStats } from '../types'

export const students: Student[] = [
  { id: '1', name: '张三', avatar: 'ZS', className: '高一(1)班', grade: '高一', gender: 'male', age: 16, phone: '13800138001', email: 'zhangsan@school.com', status: 'active' },
  { id: '2', name: '李四', avatar: 'LS', className: '高一(1)班', grade: '高一', gender: 'female', age: 15, phone: '13800138002', email: 'lisi@school.com', status: 'active' },
  { id: '3', name: '王五', avatar: 'WW', className: '高一(2)班', grade: '高一', gender: 'male', age: 16, phone: '13800138003', email: 'wangwu@school.com', status: 'active' },
  { id: '4', name: '赵六', avatar: 'ZL', className: '高二(1)班', grade: '高二', gender: 'female', age: 17, phone: '13800138004', email: 'zhaoliu@school.com', status: 'active' },
  { id: '5', name: '钱七', avatar: 'QQ', className: '高二(2)班', grade: '高二', gender: 'male', age: 17, phone: '13800138005', email: 'qianqi@school.com', status: 'inactive' },
]

export const teachers: Teacher[] = [
  { id: '1', name: '陈老师', avatar: 'CL', subject: '数学', department: '理科组', title: '高级教师', phone: '13900139001', email: 'chen@school.com', status: 'active' },
  { id: '2', name: '刘老师', avatar: 'LL', subject: '语文', department: '文科组', title: '一级教师', phone: '13900139002', email: 'liu@school.com', status: 'active' },
  { id: '3', name: '王老师', avatar: 'WL', subject: '英语', department: '外语组', title: '高级教师', phone: '13900139003', email: 'wang@school.com', status: 'active' },
  { id: '4', name: '张老师', avatar: 'ZL', subject: '物理', department: '理科组', title: '一级教师', phone: '13900139004', email: 'zhang@school.com', status: 'active' },
  { id: '5', name: '李老师', avatar: 'LL', subject: '化学', department: '理科组', title: '二级教师', phone: '13900139005', email: 'li@school.com', status: 'inactive' },
]

export const courses: Course[] = [
  { id: '1', name: '高一数学', subject: '数学', teacherName: '陈老师', teacherId: '1', className: '高一(1)班', schedule: '周一 08:00-09:40', credit: 4, status: 'ongoing' },
  { id: '2', name: '高一语文', subject: '语文', teacherName: '刘老师', teacherId: '2', className: '高一(1)班', schedule: '周二 10:00-11:40', credit: 4, status: 'ongoing' },
  { id: '3', name: '高一英语', subject: '英语', teacherName: '王老师', teacherId: '3', className: '高一(2)班', schedule: '周三 14:00-15:40', credit: 4, status: 'ongoing' },
  { id: '4', name: '高二物理', subject: '物理', teacherName: '张老师', teacherId: '4', className: '高二(1)班', schedule: '周四 08:00-09:40', credit: 3, status: 'ongoing' },
  { id: '5', name: '高二化学', subject: '化学', teacherName: '李老师', teacherId: '5', className: '高二(2)班', schedule: '周五 10:00-11:40', credit: 3, status: 'pending' },
]

export const attendanceRecords: AttendanceRecord[] = [
  { id: '1', studentId: '1', studentName: '张三', className: '高一(1)班', date: '2024-01-15', status: 'present' },
  { id: '2', studentId: '2', studentName: '李四', className: '高一(1)班', date: '2024-01-15', status: 'late' },
  { id: '3', studentId: '3', studentName: '王五', className: '高一(2)班', date: '2024-01-15', status: 'absent', reason: '生病' },
  { id: '4', studentId: '4', studentName: '赵六', className: '高二(1)班', date: '2024-01-15', status: 'leave', reason: '事假' },
  { id: '5', studentId: '5', studentName: '钱七', className: '高二(2)班', date: '2024-01-15', status: 'present' },
]

export const gradeRecords: GradeRecord[] = [
  { id: '1', studentId: '1', studentName: '张三', className: '高一(1)班', subject: '数学', score: 92, totalScore: 100, examName: '期中考试', examDate: '2024-01-10' },
  { id: '2', studentId: '1', studentName: '张三', className: '高一(1)班', subject: '语文', score: 85, totalScore: 100, examName: '期中考试', examDate: '2024-01-10' },
  { id: '3', studentId: '2', studentName: '李四', className: '高一(1)班', subject: '数学', score: 88, totalScore: 100, examName: '期中考试', examDate: '2024-01-10' },
  { id: '4', studentId: '2', studentName: '李四', className: '高一(1)班', subject: '语文', score: 90, totalScore: 100, examName: '期中考试', examDate: '2024-01-10' },
  { id: '5', studentId: '3', studentName: '王五', className: '高一(2)班', subject: '数学', score: 78, totalScore: 100, examName: '期中考试', examDate: '2024-01-10' },
]

export const dashboardStats: DashboardStats = {
  totalStudents: 1256,
  totalTeachers: 86,
  totalCourses: 186,
  todayAttendanceRate: 96.5,
  weeklyAttendanceTrend: [95.2, 96.8, 94.5, 97.2, 96.1, 95.8, 96.5],
  gradeDistribution: [
    { name: '优秀', value: 28, color: '#22c55e' },
    { name: '良好', value: 42, color: '#3b82f6' },
    { name: '中等', value: 20, color: '#f59e0b' },
    { name: '及格', value: 7, color: '#f97316' },
    { name: '不及格', value: 3, color: '#ef4444' },
  ],
  subjectScores: [
    { name: '语文', score: 85.3 },
    { name: '数学', score: 82.1 },
    { name: '英语', score: 88.5 },
    { name: '物理', score: 79.8 },
    { name: '化学', score: 81.2 },
    { name: '生物', score: 84.6 },
  ],
}