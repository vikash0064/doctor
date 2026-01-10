import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smile, Award, Building2, Hammer, Star, Trophy, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { icon: Smile, label: "Patients", value: "30", suffix: "L+" },
    { icon: Users, label: "Dentists", value: "1500", suffix: "+" },
    { icon: Building2, label: "Clinics", value: "650", suffix: "+" },
    { icon: Star, label: "Rating", value: "4.9", suffix: "/5", decimals: 1 },
    { icon: Hammer, label: "Implants Done", value: "5000", suffix: "+" },
    { icon: Trophy, label: "Awards Won", value: "20", suffix: "+" },
];

const Counter = ({ end, suffix = "", decimals = 0 }) => {
    const [count, setCount] = useState(0);
    const nodeRef = useRef(null);

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        const obj = { value: 0 };
        const tl = gsap.to(obj, {
            value: end,
            duration: 4,
            ease: "power2.out",
            scrollTrigger: {
                trigger: node,
                start: "top 95%",
                toggleActions: "play none none none"
            },
            onUpdate: () => {
                setCount(obj.value);
            }
        });

        return () => {
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
            tl.kill();
        };
    }, [end]);

    return (
        <span ref={nodeRef}>
            {count.toFixed(decimals)}{suffix}
        </span>
    );
};

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
        <div ref={stripRef} className="bg-primary-50 dark:bg-slate-900/50 border-y border-primary-100 dark:border-slate-800 py-6 overflow-hidden relative transition-colors duration-300">
            {/* Soft Edge Fades */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-primary-50 to-transparent dark:from-slate-900 dark:to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-primary-50 to-transparent dark:from-slate-900 dark:to-transparent z-10 pointer-events-none"></div>

            <div
                className="flex items-center gap-12 sm:gap-24 animate-marquee hover:[animation-play-state:paused] w-max px-12"
            >
                {extendedStats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer whitespace-nowrap">
                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary-500 dark:text-primary-400 shadow-sm border border-primary-100 dark:border-slate-700 group-hover:scale-110 transition-transform duration-300">
                            <stat.icon size={28} strokeWidth={1.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-primary-600 dark:text-primary-400 text-xl sm:text-2xl leading-none tracking-tight">
                                <Counter end={parseFloat(stat.value)} suffix={stat.suffix} decimals={stat.decimals} />
                            </span>
                            <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">{stat.label}</span>
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
                    animation: marquee 60s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default StatsStrip;
