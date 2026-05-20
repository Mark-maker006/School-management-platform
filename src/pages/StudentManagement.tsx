import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, User } from 'lucide-react'
import { students } from '../data/mockData'
import type { Student } from '../types'
import { formatGender, formatStatus, getStatusColor } from '../utils/format'
import { SearchInput } from '../components/common/SearchInput'
import { FilterDropdown } from '../components/common/FilterDropdown'
import { Modal } from '../components/common/Modal'
import { Button } from '../components/common/Button'

function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)

  const grades = ['全部', '高一', '高二', '高三']

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.includes(searchTerm) || student.className.includes(searchTerm)
    const matchesGrade = !selectedGrade || selectedGrade === '全部' || student.grade === selectedGrade
    return matchesSearch && matchesGrade
  })

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
    setShowModal(true)
  }

  const handleDelete = (_id: string) => {
    if (window.confirm('确定要删除该学生吗？')) {
      // Handle delete logic here
    }
  }

  const handleView = (student: Student) => {
    setEditingStudent(student)
    setShowModal(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">学生管理</h1>
          <p className="text-gray-500 mt-1">管理学生信息和学籍档案</p>
        </div>
        <Button>
          <Plus className="w-5 h-5" />
          添加学生
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <SearchInput 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="搜索学生姓名或班级..."
          />
          <FilterDropdown 
            options={grades} 
            value={selectedGrade} 
            onChange={setSelectedGrade} 
            placeholder="年级筛选"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">班级</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">年级</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">性别</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">年龄</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredStudents.map(student => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-600" />
                    </div>
                    <span className="font-medium text-gray-800">{student.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{student.className}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{student.grade}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{formatGender(student.gender)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{student.age}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(student.status, 'student')}`}>
                    {formatStatus(student.status, 'student')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => handleView(student)} className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleEdit(student)} className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(student.id)} className="p-2 text-gray-500 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title={editingStudent ? '学生详情' : '添加学生'}
      >
        {editingStudent && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
              <input type="text" defaultValue={editingStudent.name} className="w-full px-3 py-2 border border-gray-200 rounded-lg" readOnly />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">班级</label>
                <input type="text" defaultValue={editingStudent.className} className="w-full px-3 py-2 border border-gray-200 rounded-lg" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">年级</label>
                <input type="text" defaultValue={editingStudent.grade} className="w-full px-3 py-2 border border-gray-200 rounded-lg" readOnly />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">性别</label>
                <input type="text" defaultValue={formatGender(editingStudent.gender)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">年龄</label>
                <input type="number" defaultValue={editingStudent.age} className="w-full px-3 py-2 border border-gray-200 rounded-lg" readOnly />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">联系方式</label>
              <input type="text" defaultValue={editingStudent.phone} className="w-full px-3 py-2 border border-gray-200 rounded-lg" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
              <input type="email" defaultValue={editingStudent.email} className="w-full px-3 py-2 border border-gray-200 rounded-lg" readOnly />
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default StudentManagement