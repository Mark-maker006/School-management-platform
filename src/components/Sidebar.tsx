import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardList,
  Award,
  Settings,
  HelpCircle,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const menuItems = [
  { icon: LayoutDashboard, label: '首页', path: '/' },
  { icon: Users, label: '学生管理', path: '/students' },
  { icon: GraduationCap, label: '教师管理', path: '/teachers' },
  { icon: BookOpen, label: '课程管理', path: '/courses' },
  { icon: ClipboardList, label: '考勤管理', path: '/attendance' },
  { icon: Award, label: '成绩管理', path: '/grades' },
]

const bottomItems = [
  { icon: Settings, label: '系统设置', path: '/settings' },
  { icon: HelpCircle, label: '帮助中心', path: '/help' },
]

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">智慧校园</h1>
            <p className="text-xs text-gray-500">管理系统</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <ul className="space-y-2">
          {bottomItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors duration-200"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
