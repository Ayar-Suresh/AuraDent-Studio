"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

const contactInfo = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: "128 Park Avenue, Suite 400\nNew York, NY 10017",
    href: "https://maps.google.com",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "(212) 555-0147",
    href: "tel:+12125550147",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@auradent.studio",
    href: "mailto:hello@auradent.studio",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon-Fri: 8AM - 6PM\nSat: 9AM - 2PM",
    href: null,
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={sectionRef} className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-dental-100 dark:bg-dental-900/30 text-dental-700 dark:text-dental-300 text-sm font-medium mb-4">
            Get in Touch
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
            Start your smile{" "}
            <span className="bg-gradient-to-r from-dental-500 to-dental-700 bg-clip-text text-transparent">
              journey
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    className="flex items-start gap-4 p-5 rounded-2xl glass hover:bg-white/60 dark:hover:bg-white/10 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-dental-100 dark:bg-dental-900/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 text-dental-600 dark:text-dental-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{item.label}</span>
                        {item.href.startsWith("http") && (
                          <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {item.value}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-start gap-4 p-5 rounded-2xl glass">
                    <div className="w-12 h-12 rounded-xl bg-dental-100 dark:bg-dental-900/30 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-dental-600 dark:text-dental-400" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">{item.label}</div>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {item.value}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="https://wa.me/12125550147"
                target="_blank"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-colors shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden glass ring-1 ring-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2!2d-73.9851!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMDYuNCJX!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) contrast(1.1) opacity(0.8)", minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="dark:invert-[0.85]"
              />
              <div className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-inset ring-black/10 dark:ring-white/10" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <motion.a
          href="tel:+12125550147"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow"
          aria-label="Call us"
        >
          <Phone className="w-5 h-5" />
        </motion.a>
        <motion.a
          href="https://wa.me/12125550147"
          target="_blank"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-shadow"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.a>
      </div>
    </section>
  );
}
