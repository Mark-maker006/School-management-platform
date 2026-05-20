import { useState } from 'react'
import { Calendar, AlertTriangle, CheckCircle, XCircle, Clock, User } from 'lucide-react'
import { attendanceRecords } from '../data/mockData'
import { formatAttendanceStatus, getStatusColor } from '../utils/format'
import { SearchInput } from '../components/common/SearchInput'

function AttendanceManagement() {
  const [selectedDate, setSelectedDate] = useState('2024-01-15')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.studentName.includes(searchTerm) || record.className.includes(searchTerm)
    const matchesDate = record.date === selectedDate
    return matchesSearch && matchesDate
  })

  const stats = [
    { label: '应到人数', value: 1256, unit: '人' },
    { label: '实到人数', value: 1212, unit: '人' },
    { label: '缺勤人数', value: 23, unit: '人' },
    { label: '出勤率', value: 96.5, unit: '%' },
  ]

  const statusConfig = {
    present: { icon: CheckCircle, color: 'text-success-500' },
    absent: { icon: XCircle, color: 'text-danger-500' },
    late: { icon: Clock, color: 'text-warning-500' },
    leave: { icon: AlertTriangle, color: 'text-primary-500' },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">考勤管理</h1>
          <p className="text-gray-500 mt-1">查看和管理学生出勤记录</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent border-none outline-none text-gray-700"
            />
          </div>
        </div>
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
        <SearchInput 
          value={searchTerm} 
          onChange={setSearchTerm} 
          placeholder="搜索学生姓名或班级..."
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">学生</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">班级</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">备注</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredRecords.map(record => {
              const config = statusConfig[record.status as keyof typeof statusConfig]
              const StatusIcon = config.icon
              return (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-600" />
                      </div>
                      <span className="font-medium text-gray-800">{record.studentName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{record.className}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{record.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      <span className={`flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(record.status, 'attendance')}`}>
                        <StatusIcon className="w-3 h-3" />
                        {formatAttendanceStatus(record.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {record.reason || '-'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">考勤异常预警</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-danger-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-danger-500 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">王五 连续3天缺勤</p>
                <p className="text-xs text-gray-500">建议联系家长确认情况</p>
              </div>
              <span className="text-xs px-2 py-1 bg-danger-100 text-danger-600 rounded-full">紧急</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-warning-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-warning-500 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">李四 本周迟到2次</p>
                <p className="text-xs text-gray-500">已发送提醒通知</p>
              </div>
              <span className="text-xs px-2 py-1 bg-warning-100 text-warning-600 rounded-full">提醒</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">赵六 请假申请待审批</p>
                <p className="text-xs text-gray-500">请假时间：1月16日-1月18日</p>
              </div>
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">待处理</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">今日出勤统计</h2>
          <div className="space-y-4">
            {Object.entries(statusConfig).map(([key, config]) => {
              const count = attendanceRecords.filter(r => r.status === key).length
              const percentage = ((count / attendanceRecords.length) * 100).toFixed(1)
              const StatusIcon = config.icon
              return (
                <div key={key}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-2">
                      <StatusIcon className={`w-4 h-4 ${config.color}`} />
                      <span className="text-gray-600">{formatAttendanceStatus(key)}</span>
                    </div>
                    <span className="font-medium text-gray-800">{count}人 ({percentage}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${config.color.replace('text-', 'bg-')}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttendanceManagement