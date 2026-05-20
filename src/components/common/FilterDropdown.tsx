import { useState } from 'react'
import { Filter, ChevronDown } from 'lucide-react'

interface FilterDropdownProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function FilterDropdown({ options, value, onChange, placeholder = '筛选' }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option: string) => {
    onChange(option === '全部' ? '' : option)
    setIsOpen(false)
  }

  const displayValue = value || placeholder

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Filter className="w-5 h-5 text-gray-500" />
        <span>{displayValue}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                value === option || (!value && option === '全部')
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}