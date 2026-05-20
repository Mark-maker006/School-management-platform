import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, Award, BarChart3 } from 'lucide-react'
import { gradeRecords } from '../data/mockData'
import { getScoreColor } from '../utils/format'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { SearchInput } from '../components/common/SearchInput'
import { FilterDropdown } from '../components/common/FilterDropdown'
import { Button } from '../components/common/Button'

function GradeManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')

  const subjects = ['全部', '数学', '语文', '英语', '物理', '化学', '生物']

  const filteredRecords = gradeRecords.filter(record => {
    const matchesSearch = record.studentName.includes(searchTerm) || record.className.includes(searchTerm)
    const matchesSubject = !selectedSubject || selectedSubject === '全部' || record.subject === selectedSubject
    return matchesSearch && matchesSubject
  })

  const subjectScores = subjects.filter(s => s !== '全部').map(subject => {
    const subjectRecords = gradeRecords.filter(r => r.subject === subject)
    const avgScore = subjectRecords.length > 0 
      ? (subjectRecords.reduce((sum, r) => sum + r.score, 0) / subjectRecords.length).toFixed(1)
      : '0'
    return { name: subject, score: parseFloat(avgScore) }
  })

  const stats = [
    { label: '参考人数', value: 1256, unit: '人' },
    { label: '平均分', value: 85.6, unit: '分' },
    { label: '优秀率', value: 28.3, unit: '%' },
    { label: '及格率', value: 96.8, unit: '%' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">成绩管理</h1>
          <p className="text-gray-500 mt-1">管理学生成绩和考试分析</p>
        </div>
        <Button>
          <Plus className="w-5 h-5" />
          录入成绩
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-100 p-6">
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
              {stat.unit && <span className="text-sm text-gray-500">{stat.unit}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <SearchInput 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="搜索学生姓名或班级..."
          />
          <FilterDropdown 
            options={subjects} 
            value={selectedSubject} 
            onChange={setSelectedSubject} 
            placeholder="学科筛选"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">学科平均分对比</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectScores}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[60, 100]} />
                <Tooltip formatter={(value) => [`${value}分`, '平均分']} />
                <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">成绩分布统计</h2>
          <div className="space-y-4">
            {[
              { label: '90-100分', count: 356, color: 'bg-success-500' },
              { label: '80-89分', count: 423, color: 'bg-primary-500' },
              { label: '70-79分', count: 287, color: 'bg-warning-500' },
              { label: '60-69分', count: 124, color: 'bg-orange-500' },
              { label: '60分以下', count: 66, color: 'bg-danger-500' },
            ].map((item, index) => {
              const percentage = ((item.count / 1256) * 100).toFixed(1)
              return (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-medium text-gray-800">{item.count}人 ({percentage}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-800">期中考试成绩列表</span>
          </div>
          <span className="text-sm text-gray-500">考试时间：2024年1月10日</span>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">学生</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">班级</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">学科</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">成绩</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">满分</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredRecords.map(record => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-primary-600" />
                    </div>
                    <span className="font-medium text-gray-800">{record.studentName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{record.className}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{record.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center">
                    <span className={`font-semibold ${getScoreColor(record.score)}`}>
                      {record.score}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-500">{record.totalScore}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GradeManagement