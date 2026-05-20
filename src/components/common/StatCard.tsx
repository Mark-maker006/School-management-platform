import type { ReactElement } from 'react'
import { TrendingUp } from 'lucide-react'

interface StatCardProps {
  icon: ReactElement
  label: string
  value: number | string
  unit?: string
  trend?: string
  trendColor?: string
}

export function StatCard({ icon, label, value, unit = '', trend, trendColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gray-800">{value}</span>
            {unit && <span className="text-sm text-gray-500">{unit}</span>}
          </div>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${trendColor}`}>
              <TrendingUp className="w-4 h-4" />
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  )
}