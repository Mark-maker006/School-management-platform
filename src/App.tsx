import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import StudentManagement from './pages/StudentManagement'
import TeacherManagement from './pages/TeacherManagement'
import CourseManagement from './pages/CourseManagement'
import AttendanceManagement from './pages/AttendanceManagement'
import GradeManagement from './pages/GradeManagement'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<StudentManagement />} />
        <Route path="teachers" element={<TeacherManagement />} />
        <Route path="courses" element={<CourseManagement />} />
        <Route path="attendance" element={<AttendanceManagement />} />
        <Route path="grades" element={<GradeManagement />} />
      </Route>
    </Routes>
  )
}

export default App
