import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const filters = ['All', 'Website design', 'App Mobile design', 'Mockup', 'Branding'];

const projects = [
  {
    id: 1,
    title: 'Brand Project',
    category: 'Branding',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 2,
    title: 'Brand Project',
    category: 'Website design',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 3,
    title: 'Brand Project',
    category: 'App Mobile design',
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 4,
    title: 'Brand Project',
    category: 'Website design',
    image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 5,
    title: 'Brand Project',
    category: 'Mockup',
    image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 6,
    title: 'Brand Project',
    category: 'App Mobile design',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 7,
    title: 'Brand Project',
    category: 'Branding',
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 8,
    title: 'Brand Project',
    category: 'Website design',
    image: 'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 9,
    title: 'Brand Project',
    category: 'Mockup',
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="bg-[#141414] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">Portfolio</h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-primary text-white shadow-[0_0_20px_rgba(255,107,0,0.4)] transform scale-105'
                  : 'bg-dark-100 text-gray-400 hover:text-primary hover:bg-white/5 border border-transparent hover:border-primary/20'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="relative rounded-2xl overflow-hidden group bg-dark-100 aspect-video border border-white/5 shadow-lg"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-primary text-xs font-semibold tracking-wider mb-1 uppercase">{project.category}</p>
                      <h3 className="text-white font-bold text-lg">{project.title}</h3>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-[#e65c00] transition-colors transform hover:scale-110">
                      <ExternalLink size={16} className="text-white" />
                    </button>
                  </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-gray-300 text-sm font-medium">{project.title}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
