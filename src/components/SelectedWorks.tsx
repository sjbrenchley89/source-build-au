import { motion } from 'framer-motion'

const FEATURED = [
  {
    id: 1,
    title: 'Cabinetry & Joinery',
    tag: 'Custom Supply',
    colSpan: 'md:col-span-7',
    aspect: 'aspect-[4/3]',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  },
  {
    id: 2,
    title: 'Windows & Aluminium Systems',
    tag: 'Glazing & Facades',
    colSpan: 'md:col-span-5',
    aspect: 'aspect-[4/3]',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
  {
    id: 3,
    title: 'Stone Benchtops & Vanities',
    tag: 'Surfaces',
    colSpan: 'md:col-span-5',
    aspect: 'aspect-[4/3]',
    img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80',
  },
  {
    id: 4,
    title: 'Bathrooms & Wet Areas',
    tag: 'Sanitaryware',
    colSpan: 'md:col-span-7',
    aspect: 'aspect-[4/3]',
    img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
  },
]

const ALL_CATEGORIES = [
  'Cabinetry & Joinery',
  'Windows, Glazing & Aluminium Systems',
  'Doors, Hardware & Access',
  'Roofing Systems & Façade Cladding',
  'Stone Benchtops, Countertops & Vanities',
  'Plumbing Fixtures & Sanitaryware',
  'Bathrooms, Kitchens & Wet Areas',
  'Engineered & Floating Timber Flooring',
  'Tiles & Surface Finishes',
  'Specialist & Trade-Specific Supply',
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function SelectedWorks() {
  return (
    <section id="works" className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <motion.div className="flex items-start justify-between mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Product Categories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-body font-light text-text-primary mb-2">
              What we <em className="font-display italic">supply</em>
            </h2>
            <p className="text-sm text-muted max-w-sm">
              Factory-direct building materials sourced globally, supplied to your project site — anywhere in Australia.
            </p>
          </div>
          <GradientBorderButton className="hidden md:inline-flex" href="#contact">
            Get a Proposal &#8594;
          </GradientBorderButton>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 mb-8">
          {FEATURED.map((product, i) => (
            <motion.div key={product.id} className={product.colSpan}
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-50px' }} transition={{ delay: i * 0.1 }}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* All categories pill list */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}>
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-4">All categories</p>
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map(cat => (
              <span key={cat}
                className="text-xs text-muted border border-stroke rounded-full px-4 py-2 hover:text-text-primary hover:border-[#F26522]/50 transition-colors duration-200 cursor-default">
                {cat}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

function ProductCard({ product }: { product: (typeof FEATURED)[0] }) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl border border-stroke bg-surface cursor-pointer ${product.aspect}`}>
      <img src={product.img} alt={product.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
      <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-lg" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="relative">
          <span className="absolute inset-[-2px] rounded-full" style={{ background: 'linear-gradient(90deg, #F26522 0%, #D4561A 100%)' }} />
          <span className="relative flex items-center gap-2 bg-white text-bg rounded-full px-5 py-2 text-sm font-medium">
            Enquire — <em className="font-display italic">{product.title}</em>
          </span>
        </div>
      </div>
      <div className="absolute top-4 left-4">
        <span className="text-xs text-muted bg-bg/80 backdrop-blur-sm rounded-full px-3 py-1 border border-stroke">
          {product.tag}
        </span>
      </div>
    </div>
  )
}

function GradientBorderButton({ children, href, className = '' }: { children: React.ReactNode; href: string; className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, #F26522 0%, #D4561A 100%)' }} />
      <a href={href} className="relative z-10 inline-flex items-center gap-2 rounded-full border border-stroke bg-bg text-sm text-muted hover:text-text-primary px-5 py-2 transition-colors duration-200">
        {children}
      </a>
    </div>
  )
}
