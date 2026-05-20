import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, User, Award } from 'lucide-react'
import { teachers } from '../data/mockData'
import type { Teacher } from '../types'
import { formatStatus, getStatusColor } from '../utils/format'
import { SearchInput } from '../components/common/SearchInput'
import { FilterDropdown } from '../components/common/FilterDropdown'
import { Modal } from '../components/common/Modal'
import { Button } from '../components/common/Button'

function TeacherManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)

  const departments = ['全部', '理科组', '文科组', '外语组']

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.includes(searchTerm) || teacher.subject.includes(searchTerm)
    const matchesDept = !selectedDepartment || selectedDepartment === '全部' || teacher.department === selectedDepartment
    return matchesSearch && matchesDept
  })

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher)
    setShowModal(true)
  }

  const handleDelete = (_id: string) => {
    if (window.confirm('确定要删除该教师吗？')) {
      // Handle delete logic here
    }
  }

  const handleView = (teacher: Teacher) => {
    setEditingTeacher(teacher)
    setShowModal(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">教师管理</h1>
          <p className="text-gray-500 mt-1">管理教师信息和教学安排</p>
        </div>
        <Button>
          <Plus className="w-5 h-5" />
          添加教师
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <SearchInput 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="搜索教师姓名或学科..."
          />
          <FilterDropdown 
            options={departments} 
            value={selectedDepartment} 
            onChange={setSelectedDepartment} 
            placeholder="教研组筛选"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredTeachers.map(teacher => (
          <div key={teacher.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <User className="w-7 h-7 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800">{teacher.name}</h3>
                  <span className="px-2 py-0.5 text-xs bg-primary-100 text-primary-600 rounded-full">
                    {teacher.title}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{teacher.subject} | {teacher.department}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                  <span>{teacher.phone}</span>
                  <span>{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(teacher.status, 'teacher')}`}>
                    {formatStatus(teacher.status, 'teacher')}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
              <button onClick={() => handleView(teacher)} className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                <Eye className="w-4 h-4" />
              </button>
              <button onClick={() => handleEdit(teacher)} className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(teacher.id)} className="p-2 text-gray-500 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="教师详情">
        {editingTeacher && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
                <User className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{editingTeacher.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Award className="w-4 h-4 text-warning-500" />
                  <span className="text-sm text-gray-500">{editingTeacher.title}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">学科</label>
                <input type="text" defaultValue={editingTeacher.subject} className="w-full px-3 py-2 border border-gray-200 rounded-lg" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">教研组</label>
                <input type="text" defaultValue={editingTeacher.department} className="w-full px-3 py-2 border border-gray-200 rounded-lg" readOnly />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">联系方式</label>
              <input type="text" defaultValue={editingTeacher.phone} className="w-full px-3 py-2 border border-gray-200 rounded-lg" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
              <input type="email" defaultValue={editingTeacher.email} className="w-full px-3 py-2 border border-gray-200 rounded-lg" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
              <span className={`inline-block px-3 py-1 text-sm rounded-full ${getStatusColor(editingTeacher.status, 'teacher')}`}>
                {formatStatus(editingTeacher.status, 'teacher')}
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default TeacherManagement