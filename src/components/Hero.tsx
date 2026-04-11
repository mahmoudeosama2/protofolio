import { Instagram, Linkedin, Dribbble } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { value: '5+', label: 'Experiences' },
  { value: '20+', label: 'Project done' },
  { value: '80+', label: 'Happy Clients' },
];

export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen bg-[#111111] flex items-center relative overflow-hidden pt-20"
    >
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div>
            <p className="text-gray-400 text-lg mb-1 tracking-wide">Hi I am</p>
            <p className="text-white text-2xl font-semibold mb-2">Mahmood Fazile</p>
            <h1 className="text-5xl md:text-7xl font-extrabold text-primary leading-tight drop-shadow-lg">
              UI/UX <br /> Designer
            </h1>
          </div>

          <div className="flex items-center gap-3 mt-2">
            {[
              { icon: <Instagram size={18} />, href: '#' },
              { icon: <Linkedin size={18} />, href: '#' },
              { icon: <Dribbble size={18} />, href: '#' },
              {
                icon: (
                  <span className="text-xs font-bold leading-none">Be</span>
                ),
                href: '#',
              },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => scrollTo('#contact')}
              className="bg-primary hover:bg-[#e65c00] text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,107,0,0.5)] transform hover:-translate-y-1"
            >
              Hire Me
            </button>
            <button className="border border-white/20 hover:border-primary text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:text-primary backdrop-blur-sm bg-white/5 hover:bg-white/10">
              Download CV
            </button>
          </div>

          <div className="flex items-center gap-0 mt-6 bg-[#1a1a1a]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 w-fit shadow-2xl">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                <div className="px-6 first:pl-0 last:pr-0 text-center">
                  <p className="text-primary text-3xl font-extrabold">{stat.value}</p>
                  <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
                </div>
                {i < stats.length - 1 && (
                  <div className="w-px h-12 bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative flex justify-center items-center"
        >
          <div className="absolute w-[450px] h-[450px] md:w-[550px] md:h-[550px] rounded-full bg-gradient-to-tr from-primary/10 to-transparent border border-white/5" />
          <motion.img
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Mahmood Fazile - UI/UX Designer"
            className="relative z-10 w-[380px] md:w-[480px] object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
            style={{ maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)' }}
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
