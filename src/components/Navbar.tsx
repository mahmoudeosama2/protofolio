import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';


const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About me', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact me', href: '#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (label: string, href: string) => {
    setActive(label);
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#111111]/90 backdrop-blur-md shadow-lg border-b border-white/5' : 'bg-transparent py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="text-2xl font-extrabold text-orange-500 tracking-wider">
          LOGO
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.label, link.href)}
              className={`text-sm font-medium transition-colors duration-200 ${
                active === link.label
                  ? 'text-orange-500'
                  : 'text-gray-300 hover:text-orange-400'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <button
            onClick={() => handleNav('Contact me', '#contact')}
            className="bg-primary hover:bg-[#e65c00] text-white font-semibold px-7 py-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,107,0,0.4)] transform hover:-translate-y-0.5"
          >
            Hire Me
          </button>
        </div>

        <button
          className="md:hidden text-gray-300 hover:text-orange-500 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#1a1a1a] border-t border-gray-800 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.label, link.href)}
              className={`text-left text-sm font-medium transition-colors duration-200 ${
                active === link.label ? 'text-orange-500' : 'text-gray-300 hover:text-orange-400'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('Contact me', '#contact')}
            className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-6 py-2.5 rounded-md transition-all duration-200 w-fit"
          >
            Hire Me
          </button>
        </div>
      )}
    </motion.nav>
  );
}
