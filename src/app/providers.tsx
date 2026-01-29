'use client'

import { useEffect, useState } from 'react'
import '@/lib/i18n'
import { DrawerProvider } from '@/contexts/DrawerContext'
import { MobileDrawer } from '@/components/navigation'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    queueMicrotask(() => setMounted(true))
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <DrawerProvider>
      <MobileDrawer showMenuButton={false} />
      {children}
    </DrawerProvider>
  )
}
