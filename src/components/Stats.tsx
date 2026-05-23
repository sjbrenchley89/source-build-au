import { motion } from 'framer-motion'

const STATS = [
  { value: '500+', label: 'Projects Supplied' },
  { value: '10+', label: 'Years Experience' },
  { value: '100%', label: 'AU/NZ Compliant' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center md:items-start text-center md:text-left border-t border-stroke pt-8"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15 }}
            >
              <span
                className="text-5xl md:text-6xl font-display italic mb-2"
                style={{
                  background: 'linear-gradient(90deg, #F26522 0%, #D4561A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </span>
              <span className="text-sm text-muted uppercase tracking-[0.2em]">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
