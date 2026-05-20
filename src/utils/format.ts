export const formatDate = (dateStr: string, format: 'full' | 'short' = 'short'): string => {
  const date = new Date(dateStr)
  if (format === 'full') {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    })
  }
  return date.toLocaleDateString('zh-CN')
}

export const formatGender = (gender: 'male' | 'female'): string => {
  return gender === 'male' ? '男' : '女'
}

export const formatStatus = (status: string, type: 'student' | 'teacher' | 'course'): string => {
  const statusMap: Record<string, Record<string, string>> = {
    student: {
      active: '在校',
      inactive: '离校',
    },
    teacher: {
      active: '在职',
      inactive: '离职',
    },
    course: {
      ongoing: '进行中',
      completed: '已完成',
      pending: '待开始',
    },
  }
  return statusMap[type][status] || status
}

export const formatAttendanceStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    present: '出勤',
    absent: '缺勤',
    late: '迟到',
    leave: '请假',
  }
  return statusMap[status] || status
}

export const getStatusColor = (status: string, type: string): string => {
  const colorMap: Record<string, Record<string, string>> = {
    student: {
      active: 'bg-success-100 text-success-600',
      inactive: 'bg-gray-100 text-gray-600',
    },
    teacher: {
      active: 'bg-success-100 text-success-600',
      inactive: 'bg-gray-100 text-gray-600',
    },
    course: {
      ongoing: 'bg-success-100 text-success-600',
      completed: 'bg-gray-100 text-gray-600',
      pending: 'bg-warning-100 text-warning-600',
    },
    attendance: {
      present: 'bg-success-100 text-success-600',
      absent: 'bg-danger-100 text-danger-600',
      late: 'bg-warning-100 text-warning-600',
      leave: 'bg-primary-100 text-primary-600',
    },
  }
  return colorMap[type]?.[status] || 'bg-gray-100 text-gray-600'
}

export const getScoreColor = (score: number): string => {
  if (score >= 90) return 'text-success-600'
  if (score >= 80) return 'text-primary-600'
  if (score >= 60) return 'text-warning-600'
  return 'text-danger-600'
}