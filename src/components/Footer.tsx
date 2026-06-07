import { Linkedin, Mail, Phone, MessageCircle, Github } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About me', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact me', href: '#contact' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0e0e0e] border-t border-gray-800 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6">

          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-gray-400 hover:text-primary text-sm transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {[
              { icon: <Linkedin size={17} />, href: 'https://www.linkedin.com/in/mahmoud-osama-6030a52a3/' },
              { icon: <MessageCircle size={17} />, href: 'https://wa.me/201154506642' },
              { icon: <Github size={17} />, href: '#' },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-gray-500 text-sm">
            <a
              href="mailto:mahmoudeosama2@gmail.com"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail size={14} />
              mahmoudeosama2@gmail.com
            </a>
            <a
              href="tel:+201154506642"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone size={14} />
              +20 115 450 6642
            </a>
          </div>

          <div className="w-full border-t border-gray-800 pt-5 text-center">
            <p className="text-gray-600 text-xs">
              © {new Date().getFullYear()} Mahmoud Osama. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
