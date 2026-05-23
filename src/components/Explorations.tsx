import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    rotation: -3,
    col: 0,
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    rotation: 2,
    col: 1,
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=600&q=80',
    rotation: -2,
    col: 0,
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80',
    rotation: 3,
    col: 1,
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80',
    rotation: -1,
    col: 0,
  },
  {
    id: 6,
    img: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=80',
    rotation: 1,
    col: 1,
  },
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

    const tl0 = gsap.to(col0, {
      y: -200,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    })

    const tl1 = gsap.to(col1, {
      y: 200,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    })

    return () => {
      pin.kill()
      tl0.kill()
      tl1.kill()
    }
  }, [])

  const col0Items = ITEMS.filter(i => i.col === 0)
  const col1Items = ITEMS.filter(i => i.col === 1)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[300vh] bg-bg overflow-hidden"
    >
      {/* Layer 1: Pinned center content */}
      <div
        ref={contentRef}
        className="relative z-10 h-screen flex items-center justify-center"
      >
        <div className="text-center px-6 max-w-lg">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-body font-light text-text-primary mb-4">
            Visual <em className="font-display italic">playground</em>
          </h2>
          <p className="text-sm text-muted mb-8">
            Experiments, explorations, and creative tangents outside of client work.
          </p>
          <div className="relative group inline-flex">
            <span
              className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }}
            />
            <a
              href="#"
              className="relative z-10 inline-flex items-center gap-2 rounded-full border border-stroke bg-bg text-sm text-muted hover:text-text-primary px-6 py-3 transition-colors duration-200"
            >
              View on Dribbble &#8599;
            </a>
          </div>
        </div>
      </div>

      {/* Layer 2: Parallax columns */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
        <div className="w-full max-w-[1400px] px-8 grid grid-cols-2 gap-12 md:gap-40">
          {/* Column 0 — moves up */}
          <div ref={col0Ref} className="flex flex-col gap-8 pt-32">
            {col0Items.map(item => (
              <ExplorationCard key={item.id} item={item} />
            ))}
          </div>
          {/* Column 1 — moves down */}
          <div ref={col1Ref} className="flex flex-col gap-8 pt-64">
            {col1Items.map(item => (
              <ExplorationCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ExplorationCard({ item }: { item: (typeof ITEMS)[0] }) {
  return (
    <div
      className="relative aspect-square max-w-[320px] rounded-2xl overflow-hidden border border-stroke cursor-pointer pointer-events-auto"
      style={{ transform: `rotate(${item.rotation}deg)` }}
    >
      <img
        src={item.img}
        alt="Exploration"
        className="w-full h-full object-cover"
      />
    </div>
  )
}
