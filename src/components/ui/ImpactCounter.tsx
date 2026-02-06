import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { Stethoscope, Users, Globe, Award } from "lucide-react";

interface StatProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
}

const StatItem = ({ icon, value, label, suffix = "+" }: StatProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(latest.toFixed(0));
      }
    });
  }, [springValue]);

  return (
    <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700 group">
      <div className="mb-4 p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span ref={ref} className="text-4xl font-bold text-slate-900 dark:text-white">0</span>
        <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{suffix}</span>
      </div>
      <p className="text-slate-600 dark:text-slate-300 font-medium">{label}</p>
    </div>
  );
};

export const ImpactCounter = () => {
  const stats = [
    {
      icon: <Stethoscope className="w-8 h-8" />,
      value: 5000,
      label: "Animals Treated",
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: 1200,
      label: "Community Members Educated",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      value: 40,
      label: "Villages Served",
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: 15,
      label: "Missions Completed",
    },
  ];

  return (
    <section className="py-12 bg-emerald-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-24 relative z-20">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};
