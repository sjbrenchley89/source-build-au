import { motion } from 'framer-motion'

const STATS = [
  { value: 'All States', label: '& Territories — Australia Wide' },
  { value: '10+', label: 'Product Categories Supplied' },
  { value: '100%', label: 'Satisfaction Guaranteed' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div className="mb-12 p-6 md:p-8 rounded-3xl border border-stroke bg-surface/40 flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
          <div className="flex-shrink-0">
            <span className="text-2xl md:text-3xl font-display italic" style={{ color: '#F26522' }}>✓</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary mb-1">Complete Satisfaction Supply Guarantee</p>
            <p className="text-xs text-muted">We deliver on time, to specification, within budget — or we make it right. Every proposal we issue is backed by our Complete Satisfaction Supply Guarantee.</p>
          </div>
          <div className="md:ml-auto flex-shrink-0">
            <div className="relative group">
              <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, #F26522 0%, #D4561A 100%)' }} />
              <a href="#contact" className="relative z-10 inline-flex items-center gap-2 rounded-full border border-stroke bg-bg text-sm text-muted hover:text-text-primary px-5 py-2 transition-colors duration-200 whitespace-nowrap">Get a Proposal &#8594;</a>
            </div>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} className="flex flex-col items-center md:items-start text-center md:text-left border-t border-stroke pt-8"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} transition={{ delay: i * 0.15 }}>
              <span className="text-4xl md:text-5xl font-display italic mb-2"
                style={{ background: 'linear-gradient(90deg, #F26522 0%, #D4561A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {stat.value}
              </span>
              <span className="text-sm text-muted">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
