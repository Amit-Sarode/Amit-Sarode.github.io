import { useRef } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

import { ReactNode } from "react";

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  perspective?: number;
  rotateFactor?: number;
}

const Tilt3D = ({ children, className = "", perspective = 1000, rotateFactor = 15 }: Tilt3DProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(y, { stiffness: 200, damping: 20 })
  const rotateY = useSpring(x, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e:any) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const percentX = (offsetX - centerX) / centerX
    const percentY = (offsetY - centerY) / centerY

    x.set(percentX * rotateFactor)
    y.set(-percentY * rotateFactor)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default Tilt3D
