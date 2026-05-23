import { motion } from 'framer-motion'

const ENTRIES = [
  {
    id: 1,
    title: 'The intersection of design and engineering',
    readTime: '5 min read',
    date: 'Mar 12, 2026',
    img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=200&q=80',
  },
  {
    id: 2,
    title: 'Building design systems that scale',
    readTime: '8 min read',
    date: 'Feb 28, 2026',
    img: 'https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=200&q=80',
  },
  {
    id: 3,
    title: 'Motion design as communication',
    readTime: '4 min read',
    date: 'Feb 10, 2026',
    img: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=200&q=80',
  },
  {
    id: 4,
    title: 'Why typography is the soul of UI',
    readTime: '6 min read',
    date: 'Jan 25, 2026',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="flex items-start justify-between mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-body font-light text-text-primary mb-2">
              Recent <em className="font-display italic">thoughts</em>
            </h2>
            <p className="text-sm text-muted max-w-sm">
              Ideas, learnings, and reflections from the field.
            </p>
          </div>
          <div className="relative group hidden md:inline-flex">
            <span
              className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }}
            />
            <a
              href="#"
              className="relative z-10 inline-flex items-center gap-2 rounded-full border border-stroke bg-bg text-sm text-muted hover:text-text-primary px-5 py-2 transition-colors duration-200"
            >
              View all &#8594;
            </a>
          </div>
        </motion.div>

        {/* Entries */}
        <div className="flex flex-col gap-3">
          {ENTRIES.map((entry, i) => (
            <motion.a
              key={entry.id}
              href="#"
              className="group flex items-center gap-6 p-4 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-colors duration-300"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.08 }}
            >
              {/* Thumbnail */}
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-stroke">
                <img
                  src={entry.img}
                  alt={entry.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <p className="flex-1 text-sm text-text-primary group-hover:text-text-primary/80 transition-colors line-clamp-1">
                {entry.title}
              </p>

              {/* Meta */}
              <div className="hidden sm:flex items-center gap-4 text-xs text-muted flex-shrink-0">
                <span>{entry.readTime}</span>
                <span className="w-1 h-1 rounded-full bg-stroke" />
                <span>{entry.date}</span>
              </div>

              {/* Arrow */}
              <span className="text-muted group-hover:text-text-primary transition-colors flex-shrink-0">&#8599;</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
