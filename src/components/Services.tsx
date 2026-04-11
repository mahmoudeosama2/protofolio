import { Smartphone, Monitor, Palette, Layers, PenTool, LayoutGrid as Layout } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <Smartphone size={32} />,
    title: 'App Design',
    desc: 'Creating intuitive and engaging mobile app interfaces that deliver seamless user experiences across all platforms.',
  },
  {
    icon: <Monitor size={32} />,
    title: 'Web Design',
    desc: 'Designing modern, responsive websites with clean layouts and compelling visual hierarchies that convert visitors.',
  },
  {
    icon: <Palette size={32} />,
    title: 'Brand Identity',
    desc: 'Building cohesive brand identities with logos, color systems, and visual guidelines that tell your story.',
  },
  {
    icon: <Layers size={32} />,
    title: 'UI Design',
    desc: 'Crafting pixel-perfect user interfaces with attention to detail, consistency, and design system principles.',
  },
  {
    icon: <PenTool size={32} />,
    title: 'UX Research',
    desc: 'Conducting user research, usability testing, and wireframing to create data-driven design solutions.',
  },
  {
    icon: <Layout size={32} />,
    title: 'Prototyping',
    desc: 'Building interactive prototypes that communicate design intent and allow for rapid iteration and testing.',
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#111111] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Services</h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              key={service.title}
              className="bg-dark-100 rounded-2xl p-8 group hover:bg-[#1f1f1f] hover:shadow-[0_0_30px_rgba(255,107,0,0.1)] transition-all duration-300 border border-white/5 hover:border-primary/30 transform hover:-translate-y-1"
            >
              <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300 w-fit p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20">
                {service.icon}
              </div>
              <h3 className="text-white font-semibold text-xl mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
