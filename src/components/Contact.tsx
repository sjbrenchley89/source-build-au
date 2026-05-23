import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'
const SOCIAL_LINKS = [
  { label: 'Twitter', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Dribbble', href: '#' },
  { label: 'GitHub', href: '#' },
]
const MARQUEE_TEXT = 'BUILDING THE FUTURE • '

export default function Contact() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  // HLS video setup
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(HLS_SRC)
      hls.attachMedia(video)
      return () => { hls.destroy() }
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SRC
    }
  }, [])

  // GSAP marquee
  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return
    const tween = gsap.to(marquee, {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1,
    })
    return () => { tween.kill() }
  }, [])

  return (
    <section
      id="contact"
      className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden"
    >
      {/* Background video (flipped vertically) */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
          style={{ transform: 'translateX(-50%) translateY(-50%) scaleY(-1)' }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10">
        {/* Marquee */}
        <div className="overflow-hidden mb-16 md:mb-24">
          <div ref={marqueeRef} className="flex whitespace-nowrap" style={{ width: '200%' }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/20 mr-8 flex-shrink-0"
              >
                {MARQUEE_TEXT}
              </span>
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={`dup-${i}`}
                className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/20 mr-8 flex-shrink-0"
              >
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center px-6 mb-20 md:mb-28"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-4">Let's work together</p>
          <h2 className="text-4xl md:text-6xl font-display italic text-text-primary mb-10">
            Say hello.
          </h2>
          <div className="relative group inline-flex">
            <span
              className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }}
            />
            <a
              href="mailto:hello@michaelsmith.com"
              className="relative z-10 inline-flex items-center gap-2 rounded-full border border-stroke bg-bg/80 backdrop-blur-sm text-text-primary px-8 py-4 text-sm hover:bg-bg transition-colors duration-200"
            >
              hello@michaelsmith.com &#8599;
            </a>
          </div>
        </motion.div>

        {/* Footer bar */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="border-t border-stroke pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Social links */}
            <div className="flex items-center gap-6">
              {SOCIAL_LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-muted hover:text-text-primary transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs text-muted">Available for projects</span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-muted/40">&copy; 2026 Michael Smith. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
