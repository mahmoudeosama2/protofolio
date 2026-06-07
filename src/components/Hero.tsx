import { Linkedin, MessageCircle, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import myProfileImage from '../assets/images/my_image.webp';
import cvPdf from '../assets/cv.pdf';

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
      {/* Ambient background glows */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-primary/10 blur-[120px] animate-float-slow pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[150px] animate-float pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div>
            <p className="text-gray-400 text-lg mb-1 tracking-wide">Hi I am</p>
            <p className="text-white text-2xl font-semibold mb-2">Mahmoud Osama</p>
            <h1 className="text-5xl md:text-7xl font-extrabold text-primary leading-tight drop-shadow-lg">
              Flutter <br /> Developer
            </h1>
          </div>

          <div className="flex items-center gap-3 mt-2">
            {[
              { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/mahmoud-osama-6030a52a3/' },
              { icon: <MessageCircle size={18} />, href: 'https://wa.me/201154506642' },
              { icon: <Github size={18} />, href: '#' },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => scrollTo('#contact')}
              className="bg-primary hover:bg-primary/80 text-[#111111] font-bold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(253,111,0,0.5)] transform hover:-translate-y-1"
            >
              Hire Me
            </button>
            <a 
              href={cvPdf}
              download="Mahmoud_Osama_CV.pdf"
              className="border border-white/20 hover:border-primary text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:text-primary backdrop-blur-sm bg-white/5 hover:bg-white/10 flex items-center justify-center"
            >
              Download CV
            </a>
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
          className="relative flex justify-center items-center group cursor-pointer"
        >
          {/* Glowing background aura */}
          <div className="absolute w-[340px] h-[340px] md:w-[440px] md:h-[440px] rounded-[2.5rem] bg-gradient-to-tr from-primary/20 via-transparent to-primary/5 blur-3xl opacity-60 transition-all duration-500 group-hover:opacity-80" />
          
          {/* Rotating decorative border */}
          <div className="absolute w-[340px] h-[340px] md:w-[440px] md:h-[440px] rounded-[2.5rem] border border-white/10 rotate-6 transition-all duration-500 group-hover:rotate-0 group-hover:border-primary/30" />
          
          {/* Secondary offset border */}
          <div className="absolute w-[340px] h-[340px] md:w-[440px] md:h-[440px] rounded-[2.5rem] border border-primary/20 -rotate-3 transition-all duration-500 group-hover:rotate-0" />

          {/* Main Image */}
          <motion.img
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            src={myProfileImage}
            alt="Mahmoud Osama - Flutter Developer"
            className="relative z-10 w-[340px] md:w-[440px] aspect-square rounded-[2.5rem] object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10 group-hover:border-primary/40 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
