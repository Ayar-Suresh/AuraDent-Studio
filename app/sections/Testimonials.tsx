"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Jennifer Walsh",
    role: "Smile Design Patient",
    content: "I was terrified of dentists my whole life. Dr. Mitchell changed everything. The 3D preview of my new smile made me feel in control. Best decision I ever made.",
    rating: 5,
    image: "/images/patient_jennifer.png",
    initials: "JW",
  },
  {
    name: "Michael Chen",
    role: "Implant Patient",
    content: "The guided implant surgery was seamless. I was back to work the next day. The technology here is truly next-level compared to my previous dentist.",
    rating: 5,
    image: "/images/patient_michael.png",
    initials: "MC",
  },
  {
    name: "Amanda Rodriguez",
    role: "Whitening Patient",
    content: "Went 6 shades lighter in one session. The results are incredible and natural-looking. Everyone keeps asking where I got my teeth done.",
    rating: 5,
    image: "/images/patient_amanda.png",
    initials: "AR",
  },
  {
    name: "David Thompson",
    role: "Root Canal Patient",
    content: "Zero pain during the procedure. I actually fell asleep in the chair. The team is incredibly professional and the office feels like a spa.",
    rating: 5,
    image: "",
    initials: "DT",
  },
  {
    name: "Sarah Kim",
    role: "Regular Patient",
    content: "Finally found a dental office that doesn't feel clinical. From the ambient music to the heated massage chairs, every detail is thoughtful.",
    rating: 5,
    image: "",
    initials: "SK",
  },
];

function StarRating({ rating, animate }: { rating: number; animate: boolean }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={animate ? { opacity: 0, scale: 0 } : false}
          animate={animate ? { opacity: 1, scale: 1 } : false}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
        >
          <Star
            className={`w-4 h-4 ${
              i < rating
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted"
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16"
        >
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-dental-100 dark:bg-dental-900/30 text-dental-700 dark:text-dental-300 text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
              What our patients{" "}
              <span className="bg-gradient-to-r from-dental-500 to-dental-700 bg-clip-text text-transparent">
                say
              </span>
            </h2>
          </div>

          <div className="flex gap-3 mt-8 lg:mt-0">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/50 dark:hover:bg-white/10 transition-colors disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/50 dark:hover:bg-white/10 transition-colors disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
              >
                <div className="glass gradient-border rounded-3xl p-8 h-full flex flex-col hover:shadow-xl hover:shadow-dental-500/5 transition-shadow duration-500">
                  <Quote className="w-10 h-10 text-dental-200 dark:text-dental-800 mb-4" />

                  <p className="text-foreground/90 leading-relaxed mb-6 flex-1">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-dental-400 to-dental-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {testimonial.image ? (
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : (
                          testimonial.initials
                        )}
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                    <StarRating rating={testimonial.rating} animate={isInView} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
