import { useState, useMemo } from 'react'

export function useSearch<T>(
  data: T[],
  searchFields: (keyof T)[],
  filterFields?: { field: keyof T; value: string }[]
) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = searchTerm === '' ||
        searchFields.some(field => {
          const value = item[field]
          return typeof value === 'string' && value.includes(searchTerm)
        })

      const matchesFilters = !filterFields ||
        filterFields.every(({ field, value }) => {
          if (!value) return true
          return item[field] === value
        })

      return matchesSearch && matchesFilters
    })
  }, [data, searchTerm, searchFields, filterFields])

  return { searchTerm, setSearchTerm, filteredData }
}