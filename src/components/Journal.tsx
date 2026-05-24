import { motion } from 'framer-motion'

const WHAT_WE_NEED = ['Specifications', 'Quantities', 'Budget', 'Delivery Date']

const STEPS = [
  { id: '01', title: 'Specification', desc: 'Tell us exactly what you need — product type, tolerances, performance requirements, and project scope.' },
  { id: '02', title: 'Sourcing', desc: 'We leverage our national supplier network and handle all procurement logistics to find the best match for your spec.' },
  { id: '03', title: 'Manufacture', desc: 'Factory production with hold-point inspections, third-party QA, and full certification documentation included.' },
  { id: '04', title: 'Logistics', desc: 'We manage customs, freight, insurance, and compliance — one point of contact, real-time tracking end to end.' },
  { id: '05', title: 'Delivery', desc: 'Products land on site labelled, staged, and sequenced — install-ready on day one, no rework required.' },
  { id: '06', title: 'Support', desc: 'Post-install, we own the outcome — warranty management, defect response, and full project close-out support.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div className="flex items-start justify-between mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-body font-light text-text-primary mb-2">
              How we <em className="font-display italic">work</em>
            </h2>
            <p className="text-sm text-muted max-w-sm">Six steps. Zero surprises. Full accountability from spec to site.</p>
          </div>
          <div className="relative group hidden md:inline-flex">
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, #F26522 0%, #D4561A 100%)' }} />
            <a href="#contact" className="relative z-10 inline-flex items-center gap-2 rounded-full border border-stroke bg-bg text-sm text-muted hover:text-text-primary px-5 py-2 transition-colors duration-200">Start a project &#8594;</a>
          </div>
        </motion.div>

        <motion.div className="mb-8 p-6 rounded-3xl border border-stroke bg-surface/40"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-4">What we need from you</p>
          <div className="flex flex-wrap gap-3">
            {WHAT_WE_NEED.map((item, i) => (
              <div key={item} className="flex items-center gap-2">
                <span className="text-xs font-mono" style={{ color: '#F26522' }}>0{i + 1}</span>
                <span className="text-sm text-text-primary font-medium">{item}</span>
                {i < WHAT_WE_NEED.length - 1 && <span className="text-stroke ml-1">·</span>}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted mt-4">That’s all we need. We handle everything else — procurement, logistics, quality checks, and delivery.</p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {STEPS.map((step, i) => (
            <motion.div key={step.id}
              className="group flex items-center gap-6 p-4 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-colors duration-300 cursor-default"
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-30px' }} transition={{ delay: i * 0.07 }}>
              <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center border border-stroke bg-bg">
                <span className="text-xs font-mono" style={{ color: '#F26522' }}>{step.id}</span>
              </div>
              <p className="w-32 flex-shrink-0 text-sm font-medium text-text-primary">{step.title}</p>
              <p className="hidden md:block flex-1 text-xs text-muted line-clamp-1">{step.desc}</p>
              <span className="text-muted group-hover:text-text-primary transition-colors flex-shrink-0">&#8599;</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
