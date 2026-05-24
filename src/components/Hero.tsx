import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import { gsap } from 'gsap'
import Navbar from './Navbar'

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'
const ROLES = ['Sourcing', 'Supplying', 'Delivering', 'Building']

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)

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

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex(i => (i + 1) % ROLES.length)
    }, 2000)
    return () => clearInterval(id)
  }, [])

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
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <Navbar />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        <span className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8 opacity-0">
          Sourced Globally. Built Locally.
        </span>

        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 opacity-0">
          Source Build
        </h1>

        <p className="blur-in text-base md:text-lg text-muted mb-4 opacity-0">
          <span
            key={roleIndex}
            className="font-display italic text-text-primary inline-block animate-role-fade-in"
          >
            {ROLES[roleIndex]}
          </span>
          {' '}premium building materials across Australia.
        </p>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12 opacity-0">
          We import and supply premium cabinetry, windows, sanitaryware, flooring,
          fixtures, and construction finishes — factory-direct to your project site.
        </p>

        <div className="blur-in inline-flex gap-4 opacity-0">
          <CTAButton variant="solid" href="#works">View Products</CTAButton>
          <CTAButton variant="outline" href="#contact">Get a Supply Proposal</CTAButton>
        </div>
      </div>

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
  const solid = 'bg-text-primary text-bg font-medium'
  const outline = 'border-2 border-stroke bg-bg text-text-primary'

  return (
    <a href={href} className={`${base} ${variant === 'solid' ? solid : outline}`}>
      <span
        className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{ background: 'linear-gradient(90deg, #F26522 0%, #D4561A 100%)' }}
      />
      <span className="relative z-10">{children}</span>
    </a>
  )
}
