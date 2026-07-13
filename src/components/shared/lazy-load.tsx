'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) {
  return dynamic(importFn, { ssr: false })
}
