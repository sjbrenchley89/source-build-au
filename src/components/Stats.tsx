import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const STATS = [
  { numeric: null, display: 'All States', suffix: '', label: '& Territories — Australia Wide' },
  { numeric: 10, display: null, suffix: '+', label: 'Product Categories Supplied' },
  { numeric: 100, display: null, suffix: '%', label: 'Satisfaction Guaranteed' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
}

function AnimatedStat({ numeric, display, suffix }: { numeric: number | null; display: string | null; suffix: string }) {
  const [count, setCount] = useState(0)
  const [triggered, setTriggered] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true) },
      { threshold: 0.6 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!triggered || numeric === null) return
    const duration = 1800
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * numeric))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [triggered, numeric])

  const gradientStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, #F26522 0%, #D4561A 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-display italic mb-2 block" style={gradientStyle}>
      {display ?? `${count}${suffix}`}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(242,101,34,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">

        {/* Guarantee banner */}
        <motion.div className="mb-12 p-6 md:p-8 rounded-3xl border border-stroke bg-surface/40 flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
          <div className="flex-shrink-0">
            <span className="text-2xl md:text-3xl font-display italic" style={{ color: '#F26522' }}>✓</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary mb-1">Complete Satisfaction Supply Guarantee</p>
            <p className="text-xs text-muted">
              We deliver on time, to specification, within budget — or we make it right.
              Every proposal we issue is backed by our Complete Satisfaction Supply Guarantee.
            </p>
          </div>
          <div className="md:ml-auto flex-shrink-0">
            <div className="relative group">
              <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, #F26522 0%, #D4561A 100%)' }} />
              <a href="#contact"
                className="relative z-10 inline-flex items-center gap-2 rounded-full border border-stroke bg-bg text-sm text-muted hover:text-text-primary px-5 py-2 transition-colors duration-200 whitespace-nowrap">
                Get a Proposal &#8594;
              </a>
            </div>
          </div>
        </motion.div>

        {/* Stat grid with animated counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label}
              className="flex flex-col items-center md:items-start text-center md:text-left border-t border-stroke pt-8"
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-50px' }} transition={{ delay: i * 0.15 }}>
              <AnimatedStat numeric={stat.numeric} display={stat.display} suffix={stat.suffix} />
              <span className="text-sm text-muted">{stat.label}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
