"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Award, GraduationCap, Users, Clock } from "lucide-react";
import Image from "next/image";

const prefix = process.env.NODE_ENV === 'production' ? '/AuraDent-Studio' : '';

const stats = [
  { icon: Clock, value: 15, suffix: "+", label: "Years Experience" },
  { icon: Users, value: 5000, suffix: "+", label: "Patients Treated" },
  { icon: Award, value: 50, suffix: "+", label: "Awards Won" },
  { icon: GraduationCap, value: 12, suffix: "", label: "Certifications" },
];

function CountUpNumber({ end, duration }: { end: number; duration: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration, hasAnimated]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

const timeline = [
  { year: "2009", event: "Graduated Harvard School of Dental Medicine" },
  { year: "2012", event: "Specialized in Prosthodontics at NYU" },
  { year: "2015", event: "Opened AuraDent Smile Studio" },
  { year: "2018", event: "Introduced 3D-guided implant surgery" },
  { year: "2022", event: "Recognized as Top Dentist by Dental Association" },
  { year: "2024", event: "Expanded to second location" },
];

export default function AboutDoctor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={containerRef} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <motion.div
            style={{ y, opacity }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-dental-500/10 to-purple-500/10 mix-blend-overlay z-10 pointer-events-none" />

              <Image
                src={`${prefix}/images/doctor.png`}
                alt="Dr. Sarah Mitchell"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />

              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/20 z-20 pointer-events-none" />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 lg:bottom-8 lg:-right-8 glass gradient-border px-6 py-4 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="font-bold">Top Rated</div>
                  <div className="text-sm text-muted-foreground">2024 Best Dentist</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-dental-100 dark:bg-dental-900/30 text-dental-700 dark:text-dental-300 text-sm font-medium mb-4">
                Meet the Doctor
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
                Dr. Sarah Mitchell,{" "}
                <span className="bg-gradient-to-r from-dental-500 to-dental-700 bg-clip-text text-transparent">
                  DMD
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                With over 15 years of experience in cosmetic and restorative dentistry, 
                Dr. Mitchell combines clinical excellence with an artistic eye. She believes 
                every patient deserves a smile that reflects their true confidence.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="p-4 rounded-2xl bg-muted/50 dark:bg-muted/20"
                >
                  <stat.icon className="w-5 h-5 text-dental-500 mb-2" />
                  <div className="text-2xl font-bold">
                    <CountUpNumber end={stat.value} duration={2} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-16 text-sm font-bold text-dental-600 dark:text-dental-400 pt-0.5">
                    {item.year}
                  </div>
                  <div className="flex-1 pb-4 border-l-2 border-dental-200 dark:border-dental-800 pl-4 relative">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-dental-500 group-hover:scale-150 transition-transform" />
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {item.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
