import Link from "next/link";
import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 rounded-lg shadow-md shadow-dental-500/5 shrink-0">
                <defs>
                  <linearGradient id="footer-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </linearGradient>
                </defs>
                <rect width="100" height="100" rx="24" fill="url(#footer-logo-grad)" />
                <path d="M50 22C36 22 30 30 30 46C30 59 36 69 42.5 75C44 76.5 45 78 45 81C45 83 43 85 39 85C42 87 46.5 85.5 48.5 83.5C50 85 54.5 87 57.5 85C53.5 85 51.5 83 51.5 81C51.5 78 52.5 76.5 54 75C60.5 69 66.5 59 66.5 46C66.5 30 60 22 46 22Z" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M68 28H76M72 24V32" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
              <span className="font-bold text-lg">AuraDent</span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-6">
              Redefining dental care through precision technology and luxury comfort. 
              Your smile is our masterpiece.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Linkedin, Youtube].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-dental-500 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {["Services", "About Doctor", "Book Appointment", "Testimonials", "Contact"].map((link) => (
                <li key={link}>
                  <Link href={`#${link.toLowerCase().replace(" ", "-")}`} className="hover:text-foreground transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {["Root Canal", "Dental Implants", "Teeth Whitening", "Smile Design", "Invisalign"].map((service) => (
                <li key={service}>
                  <Link href="#services" className="hover:text-foreground transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 AuraDent Smile Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
