import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Play } from 'lucide-react';

const videos = [
    { id: 1, name: "Avantika", location: "Indore", treatment: "Aligners", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&h=400&fit=crop" },
    { id: 2, name: "Neha", location: "Delhi", treatment: "Aligners", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&h=400&fit=crop" },
    { id: 3, name: "Pulak", location: "Surat", treatment: "Dental Implants", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&h=400&fit=crop" },
    { id: 4, name: "Patyush", location: "Bangalore", treatment: "Aligners", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=400&fit=crop" },
    { id: 5, name: "Ayushi", location: "Pune", treatment: "Aligners", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&h=400&fit=crop" },
    { id: 6, name: "Gurkiran", location: "Delhi", treatment: "Dental Implants", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=300&h=400&fit=crop" },
];

const VideoTestimonials = () => {
    const containerRef = useRef(null);
    const scrollerRef = useRef(null);

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        // Clone children for infinite loop
        const scrollerContent = Array.from(scroller.children);
        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scroller.appendChild(duplicatedItem);
        });

        // Animate
        const totalWidth = scroller.scrollWidth / 2;

        gsap.to(scroller, {
            x: -totalWidth,
            duration: 30, // Adjust speed here
            ease: "none",
            repeat: -1,
        });

        // Hover pause
        const pause = () => gsap.globalTimeline.pause();
        const resume = () => gsap.globalTimeline.play();

        scroller.addEventListener("mouseenter", pause);
        scroller.addEventListener("mouseleave", resume);

        return () => {
            scroller.removeEventListener("mouseenter", pause);
            scroller.removeEventListener("mouseleave", resume);
        };
    }, []);

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 mb-10 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Patient Speaks</h2>
                <p className="text-gray-500">Hear what our happy patients have to say about their treatments</p>
            </div>

            <div ref={containerRef} className="w-full overflow-hidden">
                <div ref={scrollerRef} className="flex gap-6 w-max pl-4">
                    {videos.map((v, i) => (
                        <div key={`${v.id}-${i}`} className="relative w-[280px] h-[400px] flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow">
                            <img src={v.img} alt={v.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <Play fill="white" className="text-white ml-1" size={32} />
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                                <h3 className="text-2xl font-bold uppercase mb-1">{v.name}</h3>
                                <p className="text-gray-300 text-xs tracking-wider uppercase mb-3">PATIENT</p>
                                <div className="flex justify-between items-end border-t border-white/30 pt-3">
                                    <div>
                                        <p className="font-semibold text-sm">{v.name}</p>
                                        <p className="text-xs text-gray-400">{v.location}</p>
                                    </div>
                                    <span className="text-primary-400 font-medium text-sm">{v.treatment}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center mt-12">
                <a href="#" className="inline-flex items-center text-primary-500 font-bold hover:underline">
                    View More <span className="ml-2">→</span>
                </a>
            </div>
        </section>
    );
};

export default VideoTestimonials;
