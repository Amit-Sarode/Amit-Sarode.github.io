import { useEffect, useRef } from "react"
import gsap from "gsap"

const CustomCursor = () => {
  const cursorRef = useRef(null)

  useEffect(() => {
    const moveCursor = (e:any) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out",
      })
    }

    window.addEventListener("mousemove", moveCursor)

    return () => window.removeEventListener("mousemove", moveCursor)
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 bg-white mix-blend-difference rounded-full pointer-events-none z-[999]"
    />
  )
}

export default CustomCursor
