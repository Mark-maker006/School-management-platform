import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, BookOpen, Clock, Calendar } from 'lucide-react'
import { courses } from '../data/mockData'
import type { Course } from '../types'
import { formatStatus, getStatusColor } from '../utils/format'
import { SearchInput } from '../components/common/SearchInput'
import { FilterDropdown } from '../components/common/FilterDropdown'
import { Modal } from '../components/common/Modal'
import { Button } from '../components/common/Button'

function CourseManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const statuses = ['全部', '进行中', '已完成', '待开始']

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.includes(searchTerm) || course.subject.includes(searchTerm) || course.teacherName.includes(searchTerm)
    const matchesStatus = !selectedStatus || selectedStatus === '全部' || formatStatus(course.status, 'course') === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleView = (course: Course) => {
    setSelectedCourse(course)
    setShowModal(true)
  }

  const handleDelete = (_id: string) => {
    if (window.confirm('确定要删除该课程吗？')) {
      // Handle delete logic here
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">课程管理</h1>
          <p className="text-gray-500 mt-1">管理课程安排和课表设置</p>
        </div>
        <Button>
          <Plus className="w-5 h-5" />
          添加课程
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <SearchInput 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="搜索课程名称、学科或教师..."
          />
          <FilterDropdown 
            options={statuses} 
            value={selectedStatus} 
            onChange={setSelectedStatus} 
            placeholder="状态筛选"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">课程名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">学科</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">授课教师</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">班级</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">课时</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCourses.map(course => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary-600" />
                    </div>
                    <span className="font-medium text-gray-800">{course.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{course.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{course.teacherName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{course.className}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{course.schedule}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(course.status, 'course')}`}>
                    {formatStatus(course.status, 'course')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => handleView(course)} className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleView(course)} className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(course.id)} className="p-2 text-gray-500 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">本周课表预览</h2>
        <div className="grid grid-cols-7 gap-2">
          {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map(day => (
            <div key={day} className="bg-gray-50 rounded-lg p-3 text-center">
              <span className="text-sm font-medium text-gray-700">{day}</span>
            </div>
          ))}
          {courses.slice(0, 7).map((course) => (
            <div key={course.id} className="bg-primary-50 rounded-lg p-2 text-center">
              <p className="text-xs font-medium text-primary-700">{course.subject}</p>
              <p className="text-xs text-primary-500">{course.className}</p>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="课程详情">
        {selectedCourse && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{selectedCourse.name}</h3>
                <p className="text-sm text-gray-500">{selectedCourse.subject}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">授课教师</label>
                <input type="text" defaultValue={selectedCourse.teacherName} className="w-full px-3 py-2 border border-gray-200 rounded-lg" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">授课班级</label>
                <input type="text" defaultValue={selectedCourse.className} className="w-full px-3 py-2 border border-gray-200 rounded-lg" readOnly />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">上课时间</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{selectedCourse.schedule}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">学分</label>
                <input type="number" defaultValue={selectedCourse.credit} className="w-full px-3 py-2 border border-gray-200 rounded-lg" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
                <span className={`inline-block px-3 py-1 text-sm rounded-full ${getStatusColor(selectedCourse.status, 'course')}`}>
                  {formatStatus(selectedCourse.status, 'course')}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default CourseManagement