"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Calendar, Phone, User, MessageSquare, Check, Loader2 } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Appointment() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Valid 10-digit phone required";
    }
    if (!formData.date) newErrors.date = "Please select a date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setFormStatus("success");

    setTimeout(() => {
      setFormStatus("idle");
      setFormData({ name: "", phone: "", date: "", message: "" });
    }, 3000);
  };

  const inputClasses = (field: string) => `
    w-full px-4 py-3.5 rounded-xl bg-white/50 dark:bg-black/30 
    border ${errors[field] ? "border-red-500" : "border-white/20 dark:border-white/10"}
    focus:border-dental-500 focus:ring-2 focus:ring-dental-500/20
    outline-none transition-all placeholder:text-muted-foreground/50
    text-foreground
  `;

  return (
    <section id="appointment" ref={sectionRef} className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dental-50/50 dark:via-dental-950/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-dental-100 dark:bg-dental-900/30 text-dental-700 dark:text-dental-300 text-sm font-medium mb-4">
              Book a Visit
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
              Ready to transform your{" "}
              <span className="bg-gradient-to-r from-dental-500 to-dental-700 bg-clip-text text-transparent">
                smile?
              </span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Schedule your consultation today. Our team will confirm your appointment 
              within 2 hours during business hours.
            </p>

            <div className="space-y-4">
              {[
                { icon: Calendar, text: "Same-week appointments available" },
                { icon: Phone, text: "Free initial consultation" },
                { icon: Check, text: "Insurance accepted" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-dental-100 dark:bg-dental-900/30 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-dental-600 dark:text-dental-400" />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-strong rounded-3xl p-8 lg:p-10 shadow-2xl">
              <AnimatePresence mode="wait">
                {formStatus === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6"
                    >
                      <Check className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Appointment Requested!</h3>
                    <p className="text-muted-foreground">
                      We will contact you shortly to confirm your booking.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-sm font-medium mb-2 ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`${inputClasses("name")} pl-12`}
                          placeholder="John Doe"
                        />
                      </div>
                      <AnimatePresence>
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-500 text-sm mt-1 ml-1"
                          >
                            {errors.name}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 ml-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`${inputClasses("phone")} pl-12`}
                          placeholder="(555) 000-0000"
                        />
                      </div>
                      <AnimatePresence>
                        {errors.phone && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-500 text-sm mt-1 ml-1"
                          >
                            {errors.phone}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 ml-1">Preferred Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className={`${inputClasses("date")} pl-12`}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <AnimatePresence>
                        {errors.date && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-500 text-sm mt-1 ml-1"
                          >
                            {errors.date}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 ml-1">Message (Optional)</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground/50" />
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className={`${inputClasses("message")} pl-12 min-h-[100px] resize-none`}
                          placeholder="Tell us about your concerns..."
                        />
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        w-full py-4 rounded-xl font-semibold text-lg
                        flex items-center justify-center gap-2
                        transition-all duration-300
                        ${formStatus === "submitting" 
                          ? "bg-muted text-muted-foreground cursor-not-allowed" 
                          : "bg-foreground text-background hover:opacity-90 shadow-xl shadow-foreground/10"
                        }
                      `}
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Booking...
                        </>
                      ) : (
                        "Request Appointment"
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
