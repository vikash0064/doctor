import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Smile, Award, Building2, Hammer, Star, Trophy } from 'lucide-react';

const stats = [
    { icon: Smile, label: "Happy Patients", value: "10k+" },
    { icon: Award, label: "Years Experience", value: "15+" },
    { icon: Building2, label: "Modern Clinic", value: "1" },
    { icon: Hammer, label: "Implants Done", value: "5000+" },
    { icon: Star, label: "Google Rating", value: "5.0" },
    { icon: Trophy, label: "Awards Won", value: "20+" },
];

const StatsStrip = () => {
    const stripRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(stripRef.current, {
                opacity: 0,
                y: 20,
                duration: 1,
                scrollTrigger: {
                    trigger: stripRef.current,
                    start: "top 95%",
                }
            });
        }, stripRef);
        return () => ctx.revert();
    }, []);

    // Duplicate stats for seamless looping
    const extendedStats = [...stats, ...stats, ...stats];

    return (
        <div ref={stripRef} className="bg-primary-50 border-y border-primary-100 py-6 overflow-hidden relative">
            {/* Soft Edge Fades */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-primary-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-primary-50 to-transparent z-10 pointer-events-none"></div>

            <div
                className="flex items-center gap-12 sm:gap-24 animate-marquee hover:[animation-play-state:paused] w-max px-12"
            >
                {extendedStats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer whitespace-nowrap">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary-500 shadow-sm border border-primary-100 group-hover:scale-110 transition-transform duration-300">
                            <stat.icon size={28} strokeWidth={1.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-primary-600 text-xl sm:text-2xl leading-none tracking-tight">{stat.value}</span>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(calc(-33.33% - 8px));
                    }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default StatsStrip;
