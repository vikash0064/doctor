import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Smile, Zap, Shield, Activity, PenTool, ArrowRight,
    Hammer, Calendar, CheckCircle, ArrowUpRight, Users,
    Award, Clock, Heart, Search, MapPin, Phone
} from 'lucide-react';

// Import local treatment images
import dentalCrownsImg from '../assets/treatment/Dental crowns.jpg';
import dentureImg from '../assets/treatment/Denture.jpg';
import alignerImg from '../assets/treatment/clear aligner.jpg';
import fillingImg from '../assets/treatment/dental filling.jpg';
import implantImg from '../assets/treatment/implant.jpg';
import laserImg from '../assets/treatment/laser Densitry.jpg';
import rctImg from '../assets/treatment/root canal.jpg';
import wisdomImg from '../assets/treatment/wisdom teeth.jpg';

// Counter Component for animation
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

gsap.registerPlugin(ScrollTrigger);

// Dental treatment images (Local)
const treatmentImages = {
    rct: rctImg,
    crowns: dentalCrownsImg,
    laser: laserImg,
    aligners: alignerImg,
    fillings: fillingImg,
    wisdom: wisdomImg,
    implants: implantImg,
    dentures: dentureImg,
    kids: fillingImg, // Fallback
    ulcers: laserImg, // Fallback
    gum: rctImg,    // Fallback
    checkup: implantImg // Fallback
};

const treatments = [
    {
        name: "Root Canal",
        fullName: "Root Canal Treatment (RCT)",
        icon: CheckCircle,
        link: "/treatments#rct",
        description: "Pain-free treatment with advanced technology",
        image: treatmentImages.rct,
        color: "bg-blue-50",
        borderColor: "border-blue-100",
        textColor: "text-blue-900",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600"
    },
    {
        name: "Dental Crowns",
        fullName: "Dental Crowns",
        icon: Shield,
        link: "/treatments#crowns",
        description: "Premium ceramic crowns",
        image: treatmentImages.crowns,
        color: "bg-emerald-50",
        borderColor: "border-emerald-100",
        textColor: "text-emerald-900",
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600"
    },
    {
        name: "Laser Dentistry",
        fullName: "Laser Dentistry",
        icon: Zap,
        link: "/treatments#laser",
        description: "Pain-free laser treatments",
        image: treatmentImages.laser,
        color: "bg-purple-50",
        borderColor: "border-purple-100",
        textColor: "text-purple-900",
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600"
    },
    {
        name: "Clear Aligners",
        fullName: "Clear Aligners / Invisible Braces",
        icon: Smile,
        link: "/treatments#aligners",
        description: "Invisible teeth straightening",
        image: treatmentImages.aligners,
        color: "bg-cyan-50",
        borderColor: "border-cyan-100",
        textColor: "text-cyan-900",
        iconBg: "bg-cyan-100",
        iconColor: "text-cyan-600"
    },
    {
        name: "Dental Fillings",
        fullName: "Dental Fillings",
        icon: PenTool,
        link: "/treatments#fillings",
        description: "Tooth-colored composite",
        image: treatmentImages.fillings,
        color: "bg-amber-50",
        borderColor: "border-amber-100",
        textColor: "text-amber-900",
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600"
    },
    {
        name: "Wisdom Teeth",
        fullName: "Wisdom Teeth Removal",
        icon: Hammer,
        link: "/treatments#wisdom",
        description: "Surgical extraction",
        image: treatmentImages.wisdom,
        color: "bg-red-50",
        borderColor: "border-red-100",
        textColor: "text-red-900",
        iconBg: "bg-red-100",
        iconColor: "text-red-600"
    },
    {
        name: "Implants",
        fullName: "Dental Implants",
        icon: Activity,
        link: "/treatments#implants",
        description: "Permanent tooth replacement",
        image: treatmentImages.implants,
        color: "bg-indigo-50",
        borderColor: "border-indigo-100",
        textColor: "text-indigo-900",
        iconBg: "bg-indigo-100",
        iconColor: "text-indigo-600"
    },
    {
        name: "Dentures",
        fullName: "Dentures",
        icon: Users,
        link: "/treatments#dentures",
        description: "Custom-fitted removable",
        image: treatmentImages.dentures,
        color: "bg-green-50",
        borderColor: "border-green-100",
        textColor: "text-green-900",
        iconBg: "bg-green-100",
        iconColor: "text-green-600"
    }
];

const TreatmentGrid = () => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(headerRef.current,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Grid items animation
            gsap.fromTo(".treatment-card",
                {
                    y: 30,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.04,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative pt-12 pb-8 md:py-12 bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Compact Header */}
                <div ref={headerRef} className="text-center mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Our <span className="text-blue-600 dark:text-blue-400">Treatments</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                        Expert dental care for all your needs
                    </p>
                </div>

                {/* Desktop View - Compact Grid */}
                <div className="hidden md:block">
                    <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {treatments.map((treatment, index) => (
                            <Link
                                key={index}
                                to={treatment.link}
                                className={`treatment-card group relative rounded-lg border ${treatment.borderColor} dark:border-slate-700 transition-all duration-300 hover:shadow-md hover:-translate-y-1 active:translate-y-0 overflow-hidden h-48`}
                            >
                                {/* Main Image - More Visible */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <img
                                        src={treatment.image}
                                        alt={treatment.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                                    <div className={`absolute inset-0 ${treatment.color.replace('bg-', 'bg-')}/30 dark:bg-slate-900/50`}></div>
                                </div>

                                {/* Content - More Compact */}
                                <div className="relative z-10 h-full flex flex-col p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className={`p-1.5 rounded-lg ${treatment.iconBg} dark:bg-slate-800 backdrop-blur-sm`}>
                                            <treatment.icon size={18} className={`${treatment.iconColor} dark:text-white`} />
                                        </div>
                                        <ArrowUpRight size={14} className="text-white bg-black/30 rounded p-0.5" />
                                    </div>

                                    <div className="mt-auto">
                                        <h3 className="font-bold text-white text-lg mb-1 drop-shadow-lg">
                                            {treatment.name}
                                        </h3>
                                        <p className="text-white/90 text-xs mb-2 drop-shadow">
                                            {treatment.description}
                                        </p>
                                        <div className="pt-2 border-t border-white/20">
                                            <span className="text-white/80 text-[10px] font-medium">
                                                Learn more →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile View - More Compact */}
                <div className="md:hidden">
                    <div ref={gridRef} className="grid grid-cols-2 gap-2">
                        {treatments.map((treatment, index) => (
                            <Link
                                key={index}
                                to={treatment.link}
                                className={`treatment-card group relative rounded-lg border ${treatment.borderColor} dark:border-slate-700 transition-all duration-300 hover:shadow-sm active:scale-[0.98] overflow-hidden h-44`}
                            >
                                {/* Image - More Visible */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <img
                                        src={treatment.image}
                                        alt={treatment.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                </div>

                                {/* Compact Content */}
                                <div className="relative z-10 h-full flex flex-col p-3">
                                    <div className="flex items-start justify-between">
                                        <div className={`p-1 rounded ${treatment.iconBg} dark:bg-slate-800 backdrop-blur-sm`}>
                                            <treatment.icon size={14} className={`${treatment.iconColor} dark:text-white`} />
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <h3 className="font-bold text-white text-sm mb-0.5 leading-tight">
                                            {treatment.name}
                                        </h3>
                                        <p className="text-white/80 text-[10px] leading-tight mb-2">
                                            {treatment.description}
                                        </p>
                                        <div className="pt-1.5 border-t border-white/20 flex items-center gap-1">
                                            <span className="text-white/90 text-[10px] font-medium">
                                                Learn more
                                            </span>
                                            <ArrowRight size={10} className="text-white" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>


                </div>

                {/* Compact Stats Section */}
                <div className="mt-6 md:mt-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                            <p className="text-lg font-bold text-blue-700 dark:text-blue-400">
                                <Counter end={30} suffix="L+" />
                            </p>
                            <p className="text-xs text-blue-600 dark:text-blue-300">Patients</p>
                        </div>
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 text-center">
                            <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                                <Counter end={1500} suffix="+" />
                            </p>
                            <p className="text-xs text-emerald-600 dark:text-emerald-300">Dentists</p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
                            <p className="text-lg font-bold text-purple-700 dark:text-purple-400">
                                <Counter end={650} suffix="+" />
                            </p>
                            <p className="text-xs text-purple-600 dark:text-purple-300">Clinics</p>
                        </div>
                        <div className="bg-rose-50 dark:bg-rose-900/20 rounded-lg p-3 text-center">
                            <p className="text-lg font-bold text-rose-700 dark:text-rose-400">
                                <Counter end={4.9} suffix="/5" decimals={1} />
                            </p>
                            <p className="text-xs text-rose-600 dark:text-rose-300">Rating</p>
                        </div>
                    </div>
                </div>

                {/* Compact CTA */}
                <div className="mt-6 text-center">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-800 dark:text-white mb-3">
                            Need help choosing a treatment?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                            <Link
                                to="/appointment"
                                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Free Consultation
                            </Link>
                            <a
                                href="tel:+918401783154"
                                className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Navigation - More Compact */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 pb-safe">
                <div className="flex items-center justify-around py-3">
                    <Link to="/treatments" className="flex flex-col items-center group">
                        <div className="w-8 h-8 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-slate-700 transition-colors">
                            <Search size={16} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300 mt-1">Treatments</span>
                    </Link>

                    <Link to="/appointment" className="flex flex-col items-center -mt-6">
                        <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20 animate-bounce-subtle">
                            <Calendar size={20} className="text-white" />
                        </div>
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 mt-1">Book Now</span>
                    </Link>

                    <a href="tel:+918401783154" className="flex flex-col items-center group">
                        <div className="w-8 h-8 bg-emerald-50 dark:bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-emerald-100 dark:group-hover:bg-slate-700 transition-colors">
                            <Phone size={16} className="text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300 mt-1">Call Us</span>
                    </a>
                </div>
            </div>

            <style>{`
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 2s infinite;
                }
                .pb-safe {
                    padding-bottom: env(safe-area-inset-bottom);
                }
            `}</style>
        </section>
    );
};

export default TreatmentGrid;