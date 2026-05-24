import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'

const BG_IMG = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80'
const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Facebook', href: '#' },
]
const MARQUEE_TEXT = 'SOURCED GLOBALLY • BUILT LOCALLY • COMPLETE SATISFACTION GUARANTEED • '

export default function Contact() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return
    const tween = gsap.to(marquee, { xPercent: -50, duration: 60, ease: 'none', repeat: -1 })
    return () => { tween.kill() }
  }, [])

  return (
    <section id="contact" className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img src={BG_IMG} alt="" className="absolute inset-0 w-full h-full object-cover animate-subtle-zoom" />
        {/* Blueprint grid overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(242,101,34,0.04) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(242,101,34,0.04) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }} />
        {/* Heavier base overlay */}
        <div className="absolute inset-0 bg-black/88" />
        {/* Extra dark halo centred on the text */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 60%, rgba(0,0,0,0.55) 0%, transparent 100%)' }} />
        {/* Orange accent glow */}
        <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] rounded-full pointer-events-none -translate-y-1/2 animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, rgba(242,101,34,0.1) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10">
        {/* Marquee — reduced opacity so it doesn't compete with body text */}
        <div className="overflow-hidden mb-16 md:mb-20">
          <div ref={marqueeRef} className="flex whitespace-nowrap" style={{ width: '200%' }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="text-2xl md:text-4xl lg:text-5xl font-display italic text-white/10 mr-8 flex-shrink-0">
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div className="text-center px-6 mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }} viewport={{ once: true }}>
          <p className="text-xs text-white/50 uppercase tracking-[0.3em] mb-4 font-medium">
            Start your next project
          </p>
          <h2 className="text-5xl md:text-7xl font-display italic text-white mb-5 leading-tight"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.9)' }}>
            Get a proposal.
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-md mx-auto mb-10 leading-relaxed">
            Send us your specifications, quantities, budget and delivery date.
            We'll handle everything else — procurement, logistics, quality checks and delivery,
            Australia wide.
          </p>
          <div className="relative group inline-flex">
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, #F26522 0%, #D4561A 100%)' }} />
            <a href="mailto:info@sourcebuildaustralia.com.au"
              className="relative z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white px-8 py-4 text-sm font-medium hover:bg-white/15 transition-colors duration-200">
              info@sourcebuildaustralia.com.au &#8599;
            </a>
          </div>
        </motion.div>

        {/* Footer bar */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              {SOCIAL_LINKS.map(link => (
                <a key={link.label} href={link.href}
                  className="text-xs text-white/40 hover:text-white transition-colors duration-200">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs text-white/50">Taking new project enquiries</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-white/25">&copy; 2026 Source Build Australia. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
