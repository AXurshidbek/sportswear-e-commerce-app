"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface SearchContextType {
  recentSearches: string[]
  addRecentSearch: (query: string) => void
  clearRecentSearches: () => void
  removeRecentSearch: (query: string) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("recentSearches")
    if (stored) {
      setRecentSearches(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches))
  }, [recentSearches])

  const addRecentSearch = (query: string) => {
    if (!query.trim()) return
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== query.toLowerCase())
      return [query, ...filtered].slice(0, 10)
    })
  }

  const clearRecentSearches = () => setRecentSearches([])

  const removeRecentSearch = (query: string) => {
    setRecentSearches((prev) => prev.filter((s) => s !== query))
  }

  return (
    <SearchContext.Provider value={{ recentSearches, addRecentSearch, clearRecentSearches, removeRecentSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) throw new Error("useSearch must be used within SearchProvider")
  return context
}
