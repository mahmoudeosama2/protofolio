import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import myProfileImage from '../assets/images/my_image.png';
export default function About() {
  return (
    <section id="about" className="bg-[#141414] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">About Me</h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 rounded-[2rem] bg-primary/20 translate-x-4 translate-y-4 transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6" />
              <img
                src={myProfileImage}
                alt="About Mahmoud Osama"
                className="relative rounded-[2rem] w-full max-w-sm object-cover grayscale transition-all duration-500 group-hover:grayscale-0 border border-white/10"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <p className="text-gray-300 text-base leading-relaxed tracking-wide">
              I am Mahmoud Osama, a passionate Mobile App Developer specializing in Flutter. 
              I design and develop high-performance, cross-platform mobile applications for both iOS and Android. 
              My expertise lies in building intuitive user interfaces, integrating robust backend services, and ensuring seamless user experiences. 
              With a strong eye for detail and commitment to quality, I strive to transform innovative ideas into reality. 
              Whether it's creating sleek mobile layouts or optimizing app performance, I am dedicated to delivering top-tier digital products.
            </p>

            <button className="bg-primary hover:bg-primary/80 text-[#111111] font-extrabold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(253,111,0,0.5)] flex items-center gap-2 w-fit transform hover:-translate-y-1">
              <Download size={18} />
              Download CV
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
