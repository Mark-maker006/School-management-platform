import { Users, GraduationCap, BookOpen, ClipboardCheck, Calendar, AlertCircle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { dashboardStats } from '../data/mockData'
import { StatCard } from '../components/common/StatCard'

function Dashboard() {
  const stats = [
    { icon: <Users className="w-6 h-6 text-primary-600" />, label: '在校学生', value: dashboardStats.totalStudents, unit: '人', trend: '+2.3%', trendColor: 'text-success-500' },
    { icon: <GraduationCap className="w-6 h-6 text-primary-600" />, label: '教职工', value: dashboardStats.totalTeachers, unit: '人', trend: '+1.5%', trendColor: 'text-success-500' },
    { icon: <BookOpen className="w-6 h-6 text-primary-600" />, label: '开设课程', value: dashboardStats.totalCourses, unit: '门', trend: '+3.2%', trendColor: 'text-success-500' },
    { icon: <ClipboardCheck className="w-6 h-6 text-primary-600" />, label: '今日出勤率', value: dashboardStats.todayAttendanceRate, unit: '%', trend: '+0.5%', trendColor: 'text-success-500' },
  ]

  const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const weeklyData = weekDays.map((day, index) => ({
    day,
    rate: dashboardStats.weeklyAttendanceTrend[index]
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">欢迎回来</h1>
          <p className="text-gray-500 mt-1">这是您的校园管理数据概览</p>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Calendar className="w-5 h-5" />
          <span>{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">本周出勤趋势</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[90, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, '出勤率']} />
                <Bar dataKey="rate" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">成绩分布</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboardStats.gradeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {dashboardStats.gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, '比例']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">学科平均分</h2>
          <div className="space-y-4">
            {dashboardStats.subjectScores.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.name}</span>
                  <span className="font-medium text-gray-800">{item.score}分</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-500 rounded-full transition-all duration-500"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">待处理事项</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-warning-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-warning-500 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">3名学生连续3天缺勤</p>
                <p className="text-xs text-gray-500">需要联系家长确认情况</p>
              </div>
              <span className="text-xs px-2 py-1 bg-warning-100 text-warning-600 rounded-full">紧急</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">期中考试成绩录入中</p>
                <p className="text-xs text-gray-500">已完成65%，预计今天完成</p>
              </div>
              <span className="text-xs px-2 py-1 bg-primary-100 text-primary-600 rounded-full">进行中</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">新课程表待审核</p>
                <p className="text-xs text-gray-500">请在周五前完成审核</p>
              </div>
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">待审核</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard