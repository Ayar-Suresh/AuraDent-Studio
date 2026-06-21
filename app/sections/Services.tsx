"use client";

import { useRef, MouseEvent } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Stethoscope, 
  Puzzle, 
  Sparkles, 
  Smile,
  ArrowUpRight
} from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "Root Canal",
    description: "Pain-free micro-endodontic treatment using advanced rotary systems. Save your natural tooth with 98% success rate.",
    color: "from-rose-500/20 to-orange-500/20",
    iconColor: "text-rose-500",
  },
  {
    icon: Puzzle,
    title: "Dental Implants",
    description: "Titanium and zirconia implants with computer-guided placement. Permanent solution that looks and feels natural.",
    color: "from-dental-500/20 to-cyan-500/20",
    iconColor: "text-dental-500",
  },
  {
    icon: Sparkles,
    title: "Teeth Whitening",
    description: "Professional-grade LED-activated whitening. Up to 8 shades lighter in a single 45-minute session.",
    color: "from-amber-500/20 to-yellow-500/20",
    iconColor: "text-amber-500",
  },
  {
    icon: Smile,
    title: "Smile Designing",
    description: "Digital smile simulation and porcelain veneers. Craft your perfect smile before any procedure begins.",
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`
          relative p-8 rounded-3xl glass gradient-border overflow-hidden
          transition-shadow duration-500
          hover:shadow-2xl hover:shadow-dental-500/20
        `}
      >
        {/* Background gradient on hover */}
        <div className={`
          absolute inset-0 bg-gradient-to-br ${service.color} 
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
        `} />

        <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
          <div className={`
            w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-6
            group-hover:scale-110 transition-transform duration-500
            group-hover:shadow-lg
          `}>
            <service.icon className={`w-7 h-7 ${service.iconColor}`} />
          </div>

          <h3 className="text-xl font-bold mb-3 group-hover:text-dental-600 dark:group-hover:text-dental-400 transition-colors">
            {service.title}
          </h3>

          <p className="text-muted-foreground leading-relaxed mb-6">
            {service.description}
          </p>

          <div className="flex items-center gap-2 text-sm font-medium text-dental-600 dark:text-dental-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            Learn more
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Corner glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="services" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-dental-100 dark:bg-dental-900/30 text-dental-700 dark:text-dental-300 text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
            Precision care for every{" "}
            <span className="bg-gradient-to-r from-dental-500 to-dental-700 bg-clip-text text-transparent">
              smile
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From routine care to complete smile transformations, we combine artistry 
            with the latest dental technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
