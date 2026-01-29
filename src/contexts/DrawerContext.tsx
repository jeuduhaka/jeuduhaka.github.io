'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface DrawerContextValue {
  isOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

const DrawerContext = createContext<DrawerContextValue | null>(null)

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const openDrawer = useCallback(() => setIsOpen(true), [])
  const closeDrawer = useCallback(() => setIsOpen(false), [])

  return (
    <DrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer }}>
      {children}
    </DrawerContext.Provider>
  )
}

export function useDrawer(): DrawerContextValue {
  const ctx = useContext(DrawerContext)
  if (!ctx) {
    throw new Error('useDrawer must be used within DrawerProvider')
  }
  return ctx
}

export function useDrawerOptional(): DrawerContextValue | null {
  return useContext(DrawerContext)
}
