import { motion } from 'framer-motion'

const PROJECTS = [
  {
    id: 1,
    title: 'Automotive Motion',
    tag: 'Motion Design',
    span: 7,
    aspect: 'aspect-[4/3]',
    img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
  },
  {
    id: 2,
    title: 'Urban Architecture',
    tag: 'Photography',
    span: 5,
    aspect: 'aspect-[4/3]',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    id: 3,
    title: 'Human Perspective',
    tag: 'Portrait',
    span: 5,
    aspect: 'aspect-[4/3]',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
  },
  {
    id: 4,
    title: 'Brand Identity',
    tag: 'Branding',
    span: 7,
    aspect: 'aspect-[4/3]',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
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

export default function SelectedWorks() {
  return (
    <section id="works" className="bg-bg py-12 md:py-16">
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
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-body font-light text-text-primary mb-2">
              Featured <em className="font-display italic">projects</em>
            </h2>
            <p className="text-sm text-muted max-w-sm">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>
          <GradientBorderButton className="hidden md:inline-flex" href="#">
            View all work &#8594;
          </GradientBorderButton>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              className={`md:col-span-${project.span}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-stroke bg-surface cursor-pointer ${project.aspect}`}
    >
      {/* Background image */}
      <img
        src={project.img}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Halftone overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '4px 4px',
        }}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-lg" />

      {/* Hover label */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="relative">
          <span
            className="absolute inset-[-2px] rounded-full"
            style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }}
          />
          <span className="relative flex items-center gap-2 bg-white text-bg rounded-full px-5 py-2 text-sm font-medium">
            View — <em className="font-display italic">{project.title}</em>
          </span>
        </div>
      </div>

      {/* Tag */}
      <div className="absolute top-4 left-4">
        <span className="text-xs text-muted bg-bg/80 backdrop-blur-sm rounded-full px-3 py-1 border border-stroke">
          {project.tag}
        </span>
      </div>
    </div>
  )
}

function GradientBorderButton({
  children,
  href,
  className = '',
}: {
  children: React.ReactNode
  href: string
  className?: string
}) {
  return (
    <div className={`relative group ${className}`}>
      <span
        className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }}
      />
      <a
        href={href}
        className="relative z-10 inline-flex items-center gap-2 rounded-full border border-stroke bg-bg text-sm text-muted hover:text-text-primary px-5 py-2 transition-colors duration-200"
      >
        {children}
      </a>
    </div>
  )
}
