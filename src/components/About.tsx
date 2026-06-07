import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import myProfileImage from '../assets/images/my_image.webp';
import cvPdf from '../assets/cv.pdf';

export default function About() {
  return (
    <section id="about" className="bg-[#141414] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">About Me</h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Experienced Flutter Developer with 3+ years of expertise in cross-platform mobile application development, specializing in building scalable, high-performance applications.
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
              I am Mahmoud Osama, a passionate Multi-Platform App Developer specializing in Flutter. 
              With 3+ years of professional experience, I build scalable, high-performance applications for Android, iOS, Web, and Desktop.
              I have successfully designed and developed multiple apps from scratch, ranging from large-scale social media networks with live streaming and reels (like Niargo) to financial systems (like CashFlow) and real-time mapping platforms (like Brha).
              I focus on clean architecture, SOLID principles, performance optimization, payment integrations, and delivering a smooth, intuitive user experience.
            </p>

            <a 
              href={cvPdf} 
              download="Mahmoud_Osama_CV.pdf"
              className="bg-primary hover:bg-primary/80 text-[#111111] font-extrabold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(253,111,0,0.5)] flex items-center gap-2 w-fit transform hover:-translate-y-1"
            >
              <Download size={18} />
              Download CV
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
