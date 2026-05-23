import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import { gsap } from 'gsap'
import Navbar from './Navbar'

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'
const ROLES = ['Creative', 'Fullstack', 'Founder', 'Scholar']

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)

  // HLS video setup
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(HLS_SRC)
      hls.attachMedia(video)
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SRC
    }
  }, [])

  // Role cycling
  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex(i => (i + 1) % ROLES.length)
    }, 2000)
    return () => clearInterval(id)
  }, [])

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ ease: 'power3.out' })
      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 },
      ).fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1, delay: 0.1 },
        '<0.3',
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <Navbar />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        {/* Eyebrow */}
        <span className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8 opacity-0">
          COLLECTION '26
        </span>

        {/* Name */}
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 opacity-0">
          Michael Smith
        </h1>

        {/* Role line */}
        <p className="blur-in text-base md:text-lg text-muted mb-4 opacity-0">
          A{' '}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary inline-block animate-role-fade-in"
          >
            {ROLES[roleIndex]}
          </span>
          {' '}lives in Chicago.
        </p>

        {/* Description */}
        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12 opacity-0">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        {/* CTA buttons */}
        <div className="blur-in inline-flex gap-4 opacity-0">
          <CTAButton variant="solid" href="#works">See Works</CTAButton>
          <CTAButton variant="outline" href="#contact">Reach out...</CTAButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">SCROLL</span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-muted animate-scroll-down" />
        </div>
      </div>
    </section>
  )
}

function CTAButton({
  variant,
  href,
  children,
}: {
  variant: 'solid' | 'outline'
  href: string
  children: React.ReactNode
}) {
  const base =
    'relative group rounded-full text-sm px-7 py-3.5 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2'
  const solid =
    'bg-text-primary text-bg font-medium'
  const outline =
    'border-2 border-stroke bg-bg text-text-primary'

  return (
    <a href={href} className={`${base} ${variant === 'solid' ? solid : outline}`}>
      {/* Gradient border ring on hover */}
      <span
        className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }}
      />
      {variant === 'solid' ? (
        <span className="relative z-10 flex items-center gap-2">
          {children}
          <span className="group-hover:bg-bg group-hover:text-text-primary rounded-full px-3 py-3.5 -mx-7 -my-3.5 transition-colors duration-300" />
        </span>
      ) : (
        <span className="relative z-10">{children}</span>
      )}
    </a>
  )
}
