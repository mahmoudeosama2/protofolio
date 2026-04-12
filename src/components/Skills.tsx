import { useEffect, useRef, useState } from 'react';

const skills = [
  { name: 'Figma', percentage: 100 },
  { name: 'Adobe XD', percentage: 100 },
  { name: 'Adobe Photoshop', percentage: 80 },
  { name: 'Adobe Illustrator', percentage: 40 },
  { name: 'Adobe Premiere', percentage: 70 },
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
      <p className="text-gray-300 text-sm font-medium text-center">{name}</p>
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
    <section className="bg-[#111111] py-16">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
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
