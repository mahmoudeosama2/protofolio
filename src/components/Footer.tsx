import { Instagram, Linkedin, Dribbble, Mail, Phone } from 'lucide-react';

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
          <a href="#home" className="text-2xl font-extrabold text-orange-500 tracking-wider">
            LOGO
          </a>

          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {[
              { icon: <Instagram size={17} />, href: '#' },
              { icon: <Linkedin size={17} />, href: '#' },
              { icon: <Dribbble size={17} />, href: '#' },
              { icon: <span className="text-xs font-bold">Be</span>, href: '#' },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-gray-500 text-sm">
            <a
              href="mailto:mahmoodfazile@gmail.com"
              className="flex items-center gap-2 hover:text-orange-400 transition-colors"
            >
              <Mail size={14} />
              MahmoodFazile@gmail.com
            </a>
            <a
              href="tel:+14001231234"
              className="flex items-center gap-2 hover:text-orange-400 transition-colors"
            >
              <Phone size={14} />
              +1 400 123 1234
            </a>
          </div>

          <div className="w-full border-t border-gray-800 pt-5 text-center">
            <p className="text-gray-600 text-xs">
              © {new Date().getFullYear()} Mahmood Fazile. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
