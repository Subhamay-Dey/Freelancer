"use client"

import { ReactLenis } from 'lenis/react'

function SmoothScroll({children}: {children?: React.ReactNode}) {

  return (
    <>
      <ReactLenis root={true} options={{
        lerp: 0.07,
        duration: 2,
        smoothWheel: true,
      }}>
        {children}
      </ReactLenis>
    </>
  )
}

export default SmoothScroll;