import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, ArrowRight, ShieldCheck, Star, Activity, Heart, Users, Award, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);
import heroBg from '../assets/hero-bg.png';


// Import PNG images
import doctorPng from '../assets/gallery/doctor.png';
import dentPng from '../assets/gallery/dent.png';
import dent2Png from '../assets/gallery/dent2.png';
import dent3Png from '../assets/gallery/dent3.png';

// Dynamic gallery images
const galleryImages = [
    {
        src: doctorPng,
        label: "Meet Our Doctor",
        description: "Experienced dental professional"
    },
    {
        src: dentPng,
        label: "Dental Clinic",
        description: "Modern dental facility"
    },
    {
        src: dent2Png,
        label: "Advanced Equipment",
        description: "State-of-the-art dental technology"
    },
    {
        src: dent3Png,
        label: "Patient Care",
        description: "Comfortable treatment environment"
    }
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

const Hero = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const imageContainerRef = useRef(null);
    const imageRef = useRef(null);
    const progressBarRef = useRef(null);

    // Auto-Swap Images (Swiper Effect)
    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                const nextIndex = (currentImageIndex + 1) % galleryImages.length;
                setCurrentImageIndex(nextIndex);
            }, 4000);
        }
        return () => clearInterval(interval);
    }, [currentImageIndex, isAutoPlaying]);

    // Progress bar animation
    useEffect(() => {
        if (progressBarRef.current) {
            gsap.to(progressBarRef.current, {
                width: '100%',
                duration: 4,
                ease: "none"
            });
        }
    }, [currentImageIndex]);

    // Image Transition Animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(imageRef.current,
                { scale: 1.1, opacity: 0, rotateY: -10 },
                { scale: 1, opacity: 1, rotateY: 0, duration: 1.5, ease: "power3.out" }
            );

            // Floating badge animation
            gsap.fromTo('.floating-badge',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "back.out(1.7)" }
            );

            // Counter animation
            gsap.fromTo('.counter-item',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.15, delay: 0.8 }
            );
        }, imageContainerRef);
        return () => ctx.revert();
    }, [currentImageIndex]);

    // Entrance Animation (Text)
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(textRef.current.children,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.3 }
            );

            // Floating shapes animation
            gsap.to('.floating-shape-1', {
                y: 20,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            gsap.to('.floating-shape-2', {
                y: -20,
                duration: 3.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 0.5
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
        resetProgressBar();
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
        resetProgressBar();
    };

    const resetProgressBar = () => {
        if (progressBarRef.current) {
            gsap.killTweensOf(progressBarRef.current);
            gsap.set(progressBarRef.current, { width: '0%' });
        }
    };

    const handleDotClick = (index) => {
        setCurrentImageIndex(index);
        resetProgressBar();
    };

    const stats = [
        { icon: Users, value: "10", suffix: "K+", label: "Happy Patients", color: "text-blue-600", bg: "bg-blue-50" },
        { icon: Award, value: "25", suffix: "+", label: "Years Experience", color: "text-amber-600", bg: "bg-amber-50" },
        { icon: Heart, value: "98", suffix: "%", label: "Success Rate", color: "text-rose-600", bg: "bg-rose-50" },
        { icon: Clock, value: "24", suffix: "/7", label: "Emergency Care", color: "text-emerald-600", bg: "bg-emerald-50" }
    ];

    return (
        <section ref={containerRef} className="relative overflow-hidden min-h-[100dvh] lg:min-h-[800px] flex items-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-slate-900 pb-12 md:pb-0">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-white to-blue-50/30 dark:from-primary-950/30 dark:via-slate-950 dark:to-blue-950/30"></div>

                {/* Animated floating shapes */}
                <div className="floating-shape-1 absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-br from-primary-200/20 to-blue-300/10 dark:from-primary-500/10 dark:to-blue-500/10 rounded-full blur-3xl"></div>
                <div className="floating-shape-2 absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-tr from-emerald-200/15 to-cyan-300/10 dark:from-emerald-500/10 dark:to-cyan-500/10 rounded-full blur-3xl"></div>

                {/* Geometric pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #4f46e5 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24">

                    {/* Left Content */}
                    <div ref={textRef} className="lg:w-1/2 pt-16 lg:pt-0">
                        {/* Animated Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/20 dark:border-slate-700/50 shadow-xl rounded-xl mb-6 animate-float">
                            <div className="relative">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-30"></div>
                            </div>
                            <span className="text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-[0.2em]">
                                <span className="bg-gradient-to-r from-primary-600 to-emerald-600 dark:from-primary-400 dark:to-emerald-400 bg-clip-text text-transparent">
                                    Advanced & Painless
                                </span>
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-gray-900 dark:text-white mb-4 leading-[1.1] tracking-tight">
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                    World-Class
                                </span>
                                <svg className="absolute -bottom-1 left-0 w-full h-2 text-primary-400/40 hidden sm:block" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0,5 C30,10 70,0 100,5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                                </svg>
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-emerald-600 dark:from-primary-400 dark:via-primary-300 dark:to-emerald-400 bg-clip-text text-transparent">
                                Dental Care
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-xl font-medium bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-sm">
                            Experience revolutionary dental care with our cutting-edge technology.
                            From <span className="font-bold text-primary-600 dark:text-primary-400">AI-smile design</span> to
                            <span className="font-bold text-emerald-600 dark:text-emerald-400"> pain-free laser</span>.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 items-center mb-12">
                            <Link
                                to="/appointment"
                                className="group relative bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-4 rounded-full font-bold shadow-2xl shadow-primary-500/30 transition-all duration-300 flex items-center gap-3 transform hover:-translate-y-1 hover:shadow-primary-500/50 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <Calendar size={20} />
                                    Book Appointment Now
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>

                            <Link
                                to="/treatments"
                                className="group bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-slate-600 hover:border-primary-300 dark:hover:border-primary-500 px-8 py-4 rounded-full font-bold shadow-lg shadow-gray-200/30 dark:shadow-black/20 transition-all duration-300 flex items-center gap-3"
                            >
                                <span className="flex items-center gap-3">
                                    Explore Services
                                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                                </span>
                            </Link>
                        </div>

                        {/* Stats Counters */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="counter-item">
                                    <div className={`bg-white/60 dark:bg-slate-800/60 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/20 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300`}>
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div className={`p-1.5 sm:p-2 rounded-lg ${stat.bg} dark:bg-slate-700 border border-gray-100 dark:border-slate-600`}>
                                                <stat.icon size={16} className={`${stat.color} dark:text-white`} />
                                            </div>
                                            <div>
                                                <p className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white leading-none">
                                                    <Counter end={parseFloat(stat.value)} suffix={stat.suffix} />
                                                </p>
                                                <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">{stat.label}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Image Gallery */}
                    <div className="lg:w-1/2 w-full relative h-[500px] sm:h-[600px] flex items-center justify-center">
                        <div className="relative w-full h-full max-w-[550px]">
                            {/* Main Image Container */}
                            <div
                                ref={imageContainerRef}
                                className="relative w-full h-full rounded-[3.5rem] lg:rounded-[4.5rem] overflow-hidden shadow-2xl shadow-primary-500/20 border-8 border-white dark:border-slate-800"
                                onMouseEnter={() => setIsAutoPlaying(false)}
                                onMouseLeave={() => setIsAutoPlaying(true)}
                            >
                                <img
                                    ref={imageRef}
                                    key={currentImageIndex}
                                    src={galleryImages[currentImageIndex].src}
                                    alt={galleryImages[currentImageIndex].label}
                                    className="w-full h-full object-cover"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                {/* Image Info */}
                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                {galleryImages[currentImageIndex].label}
                                            </h3>
                                            <p className="text-white/90 font-medium">
                                                {galleryImages[currentImageIndex].description}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                                <span className="text-white font-bold">
                                                    {currentImageIndex + 1}
                                                </span>
                                                <span className="text-white/70">/</span>
                                                <span className="text-white/70">{galleryImages.length}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
                                        <div
                                            ref={progressBarRef}
                                            className="h-full bg-gradient-to-r from-white to-primary-200 rounded-full"
                                            style={{ width: '0%' }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-3 rounded-full shadow-2xl hover:shadow-primary-500/30 hover:scale-110 transition-all duration-300 group"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400" />
                            </button>

                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-3 rounded-full shadow-2xl hover:shadow-primary-500/30 hover:scale-110 transition-all duration-300 group"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400" />
                            </button>

                            {/* Dots Navigation */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {galleryImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleDotClick(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                                            ? 'w-8 bg-gradient-to-r from-white to-primary-200'
                                            : 'bg-white/50 hover:bg-white/80'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Floating Badge */}
                            <div className="floating-badge absolute -top-6 -right-4 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 p-5 rounded-2xl shadow-2xl shadow-primary-500/20 z-20 border border-gray-100/50 dark:border-slate-700 backdrop-blur-sm">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="bg-gradient-to-r from-primary-500 to-emerald-500 p-3 rounded-full">
                                            <Activity size={22} className="text-white" />
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-800"></div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Featured</p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap">Latest Technology</p>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badges - Hidden on mobile to prevent overlap */}
                            <div className="absolute -bottom-6 left-8 hidden sm:flex items-center gap-4">
                                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-xl border border-gray-100/50 dark:border-slate-700">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-50 dark:bg-slate-700 p-2 rounded-lg">
                                            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Certified</p>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">JCI Accredited</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-xl border border-gray-100/50 dark:border-slate-700">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-amber-50 dark:bg-slate-700 p-2 rounded-lg">
                                            <Star className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Top Rated</p>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">4.9/5 Reviews</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Scroll</span>
                    <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-gradient-to-b from-primary-500 to-primary-300 rounded-full mt-2 animate-scroll"></div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes scroll {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(10px); opacity: 0; }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                .animate-scroll {
                    animation: scroll 2s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default Hero;