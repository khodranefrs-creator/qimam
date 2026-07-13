'use client'

import dynamic from 'next/dynamic'

const ScrollToTopInner = dynamic(() => import('./scroll-to-top'), { ssr: false })

export function LazyScrollTop() {
  return <ScrollToTopInner />
}
