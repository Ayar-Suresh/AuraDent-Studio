"use client";

import Hero from "./sections/Hero";
import Services from "./sections/Services";
import AboutDoctor from "./sections/AboutDoctor";
import Appointment from "./sections/Appointment";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AboutDoctor />
      <Appointment />
      <Testimonials />
      <Contact />
    </>
  );
}
