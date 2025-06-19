"use client"

import { useLenis } from 'lenis/react'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function ScrollTop() {

const pathname = usePathname()
  const lenis = useLenis()

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
  }, [pathname, lenis])

  return null
}

export default ScrollTop