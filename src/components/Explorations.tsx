import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CLIENTS = [
  { id: 1, type: 'Residential Builders', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80', rotation: -2, col: 0 },
  { id: 2, type: 'Commercial Contractors', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80', rotation: 2, col: 1 },
  { id: 3, type: 'Property Developers', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80', rotation: -1, col: 0 },
  { id: 4, type: 'Trade Contractors', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80', rotation: 3, col: 1 },
  { id: 5, type: 'Site & Project Managers', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80', rotation: -2, col: 0 },
  { id: 6, type: 'Civil Contractors', img: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&q=80', rotation: 1, col: 1 },
]

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const col0Ref = useRef<HTMLDivElement>(null)
  const col1Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    const col0 = col0Ref.current
    const col1 = col1Ref.current
    if (!section || !content || !col0 || !col1) return

    const pin = ScrollTrigger.create({
      trigger: content,
      start: 'top top',
      end: () => `+=${section.offsetHeight - window.innerHeight}`,
      pin: true,
      pinSpacing: false,
    })

    const t0 = gsap.to(col0, { y: -200, ease: 'none', scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 1 } })
    const t1 = gsap.to(col1, { y: 200, ease: 'none', scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 1 } })

    return () => { pin.kill(); t0.kill(); t1.kill() }
  }, [])

  const col0Items = CLIENTS.filter(c => c.col === 0)
  const col1Items = CLIENTS.filter(c => c.col === 1)

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] bg-bg overflow-hidden">

      {/* Pinned center */}
      <div ref={contentRef} className="relative z-10 h-screen flex items-center justify-center">
        <div className="text-center px-6 max-w-lg">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Who We Serve</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-body font-light text-text-primary mb-4">
            Built for <em className="font-display italic">every</em> trade
          </h2>
          <p className="text-sm text-muted mb-8">
            From residential builders to civil contractors — if your project needs building materials,
            we have the supply chain to back you.
          </p>
          <div className="relative group inline-flex">
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, #F26522 0%, #D4561A 100%)' }} />
            <a href="#contact"
              className="relative z-10 inline-flex items-center gap-2 rounded-full border border-stroke bg-bg text-sm text-muted hover:text-text-primary px-6 py-3 transition-colors duration-200">
              Get a Supply Proposal &#8599;
            </a>
          </div>
        </div>
      </div>

      {/* Parallax columns */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
        <div className="w-full max-w-[1400px] px-8 grid grid-cols-2 gap-12 md:gap-40">
          <div ref={col0Ref} className="flex flex-col gap-8 pt-32">
            {col0Items.map(item => <ClientCard key={item.id} item={item} />)}
          </div>
          <div ref={col1Ref} className="flex flex-col gap-8 pt-64">
            {col1Items.map(item => <ClientCard key={item.id} item={item} />)}
          </div>
        </div>
      </div>

    </section>
  )
}

function ClientCard({ item }: { item: (typeof CLIENTS)[0] }) {
  return (
    <div className="relative aspect-square max-w-[320px] rounded-2xl overflow-hidden border border-stroke pointer-events-auto"
      style={{ transform: `rotate(${item.rotation}deg)` }}>
      <img src={item.img} alt={item.type} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg/90 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <span className="text-xs font-medium text-text-primary">{item.type}</span>
      </div>
    </div>
  )
}
