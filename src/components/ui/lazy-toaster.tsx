'use client'

import dynamic from 'next/dynamic'

const ToasterInner = dynamic(() => import('./toaster').then((m) => m.Toaster), { ssr: false })

export function LazyToaster() {
  return <ToasterInner />
}
