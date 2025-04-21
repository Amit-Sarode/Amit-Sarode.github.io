import {  useRef, ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface Tilt3DProps {
    children: ReactNode;
    className?: string;
   strength?:number;
  }

const MagneticDiv =({ children, className = "", strength = 30, }: Tilt3DProps) => {
  const ref =useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e:any) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    mouseX.set(x / strength)
    mouseY.set(y / strength)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: smoothX,
        y: smoothY,
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default MagneticDiv
