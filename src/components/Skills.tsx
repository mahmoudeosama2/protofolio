import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const skills = [
  { name: 'Flutter & Dart', percentage: 95 },
  { name: 'State Management (Bloc / Riverpod)', percentage: 90 },
  { name: 'Firebase & Supabase', percentage: 85 },
  { name: 'REST APIs & WebSockets', percentage: 90 },
  { name: 'CI/CD & Git', percentage: 85 },
  { name: 'UI/UX Design (Figma)', percentage: 80 },
];

interface CircularSkillProps {
  name: string;
  percentage: number;
  animate: boolean;
}

function CircularSkill({ name, percentage, animate }: CircularSkillProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animate ? percentage / 100 : 0) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-28 h-28">
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 110 110"
        >
          <circle
            cx="55"
            cy="55"
            r={radius}
            fill="none"
            stroke="#2a2a2a"
            strokeWidth="8"
          />
          <circle
            cx="55"
            cy="55"
            r={radius}
            fill="none"
            stroke="#FD6F00"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.2s ease-in-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-primary text-xl font-bold">{animate ? percentage : 0}%</span>
        </div>
      </div>
      <p className="text-gray-300 text-sm font-medium text-center max-w-[120px]">{name}</p>
    </div>
  );
}

export default function Skills() {
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="bg-[#141414] py-20 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-[40%] right-[10%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            My <span className="text-primary">Skills</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            My technical skillset focused on building cross-platform, high-performance mobile apps with robust architectures.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-10 md:gap-16">
          {skills.map((skill) => (
            <CircularSkill
              key={skill.name}
              name={skill.name}
              percentage={skill.percentage}
              animate={animate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
