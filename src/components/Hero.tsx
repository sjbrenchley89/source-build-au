import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Navbar from './Navbar'

const ROLES = ['Builders', 'Developers', 'Contractors', 'Trade Partners']
const BG_IMG = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80'

const FLOAT_CARDS = [
  { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=80', label: 'Cabinetry', rot: -7, delay: 0, side: 'left' as const, top: '22%', dur: 7 },
  { src: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=300&q=80', label: 'Stone Benchtops', rot: 5, delay: 1.8, side: 'left' as const, top: '56%', dur: 9 },
  { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=300&q=80', label: 'Bathrooms', rot: 8, delay: 0.6, side: 'right' as const, top: '20%', dur: 8 },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80', label: 'Windows', rot: -5, delay: 2.2, side: 'right' as const, top: '57%', dur: 10 },
]

const CHIPS = ['Cabinetry', 'Windows & Glazing', 'Stone Benchtops', 'Roofing', 'Flooring', 'Tiles', 'Doors', 'Plumbing']

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()
    window.addEventListener('resize', setSize)

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number }
    const pts: P[] = Array.from({ length: 65 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.4 + 0.4,
      a: Math.random() * 0.28 + 0.04,
    }))

    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of pts) {
        p.x = (p.x + p.vx + canvas.width) % canvas.width
        p.y = (p.y + p.vy + canvas.height) % canvas.height
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(242,101,34,${p.a})`
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', setSize)
    }
  }, [])

  useEffect(() => {
    const id = setInterval(() => setRoleIndex(i => (i + 1) % ROLES.length), 2200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ ease: 'power3.out' })
        .fromTo('.hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3 })
        .fromTo('.hero-title', { opacity: 0, y: 70, skewY: 2 }, { opacity: 1, y: 0, skewY: 0, duration: 1.5 }, '<0.2')
        .fromTo('.hero-body', { opacity: 0, filter: 'blur(12px)', y: 20 }, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1 }, '<0.4')
        .fromTo('.hero-chip', { opacity: 0, y: 14, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05 }, '<0.4')
        .fromTo('.float-card', { opacity: 0, scale: 0.88, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, stagger: 0.2, ease: 'power2.out' }, '<0.3')
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background stack */}
      <div className="absolute inset-0">
        <img src={BG_IMG} alt="" className="absolute inset-0 w-full h-full object-cover animate-subtle-zoom" />
        {/* Blueprint grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(242,101,34,0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(242,101,34,0.05) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }} />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(8,6,4,0.2) 0%, rgba(8,6,4,0.7) 100%)' }} />
        {/* Orange accent glow */}
        <div className="absolute bottom-1/4 right-1/3 w-[520px] h-[520px] rounded-full pointer-events-none animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, rgba(242,101,34,0.13) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 inset-x-0 h-52 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[1] pointer-events-none" />

      {/* Floating product cards — desktop only */}
      {FLOAT_CARDS.map((card, i) => (
        <div key={i}
          className="float-card opacity-0 absolute z-[2] hidden xl:block pointer-events-none"
          style={{ [card.side]: '3.5%', top: card.top }}>
          <div style={{ transform: `rotate(${card.rot}deg)` }}>
            <div style={{ animation: `float-card ${card.dur}s ease-in-out infinite ${card.delay}s` }}
              className="w-36 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <img src={card.src} alt={card.label} className="w-full aspect-[4/3] object-cover" />
              <div className="bg-bg/90 backdrop-blur-sm px-2 py-1.5 border-t border-white/5">
                <span className="text-[9px] text-muted/80 uppercase tracking-wider">{card.label}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Navbar />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl w-full">
        <span className="hero-eyebrow opacity-0 text-xs text-muted uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
          <span className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #F26522, transparent)' }} />
          Australia Wide · Sourced Globally
          <span className="w-8 h-px" style={{ background: 'linear-gradient(270deg, #F26522, transparent)' }} />
        </span>

        <h1 className="hero-title opacity-0 text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Source Build
        </h1>

        <p className="hero-body opacity-0 text-base md:text-lg text-muted mb-4">
          Your specialist supply partner for{' '}
          <span key={roleIndex} className="font-display italic text-text-primary inline-block animate-role-fade-in">
            {ROLES[roleIndex]}
          </span>
          {' '}across Australia.
        </p>

        <p className="hero-body opacity-0 text-sm md:text-base text-muted max-w-lg mb-10">
          We source, coordinate and supply the right building products — to your specifications,
          within your budget, by your delivery date. Backed by our{' '}
          <span className="text-text-primary/80">Complete Satisfaction Supply Guarantee</span>.
        </p>

        <div className="hero-body opacity-0 inline-flex flex-wrap justify-center gap-4 mb-12">
          <CTAButton variant="solid" href="#contact">Get a Supply Proposal</CTAButton>
          <CTAButton variant="outline" href="#works">View Products</CTAButton>
        </div>

        <div className="flex flex-wrap justify-center gap-2 max-w-xl">
          {CHIPS.map(chip => (
            <span key={chip} className="hero-chip opacity-0 text-[10px] text-muted/60 border border-stroke/50 rounded-full px-3 py-1 bg-bg/40 backdrop-blur-sm hover:border-[#F26522]/50 hover:text-muted/90 transition-colors duration-200 cursor-default">
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">SCROLL</span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-muted animate-scroll-down" />
        </div>
      </div>
    </section>
  )
}

function CTAButton({ variant, href, children }: { variant: 'solid' | 'outline'; href: string; children: React.ReactNode }) {
  const base = 'relative group rounded-full text-sm px-7 py-3.5 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2'
  return (
    <a href={href} className={`${base} ${variant === 'solid' ? 'bg-text-primary text-bg font-medium' : 'border-2 border-stroke bg-bg text-text-primary'}`}>
      <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{ background: 'linear-gradient(90deg, #F26522 0%, #D4561A 100%)' }} />
      <span className="relative z-10">{children}</span>
    </a>
  )
}
