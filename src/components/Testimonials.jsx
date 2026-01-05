import React, { useRef, useEffect } from 'react';
import { IMAGES } from '../constants';
import gsap from 'gsap';

const testimonials = [
    {
        id: 1,
        name: "Rajesh Kumar",
        location: "Adajan, Surat",
        avatar: IMAGES.avatars[1],
        text: "I was very afraid of dentists, but Dr. Nimisha made the Root Canal treatment completely painless. The clinic is very clean and the staff is supportive. Highly recommended!",
        rating: 5
    },
    {
        id: 2,
        name: "Priya Patel",
        location: "Vesu, Surat",
        avatar: IMAGES.avatars[0],
        text: "Best dental clinic in Surat for implants. My mother got full mouth implants here and she can eat everything now. Thank you Dent O Care team for the excellent service.",
        rating: 5
    },
    {
        id: 3,
        name: "Sneha Gupta",
        location: "Palanpur, Surat",
        avatar: IMAGES.avatars[2],
        text: "Detailed consultation and transparent pricing. No hidden charges. I went for teeth whitening and the results are amazing. My smile has never looked better!",
        rating: 5
    }
];

const Testimonials = () => {
    const scrollRef = useRef(null);

    useEffect(() => {
        // GSAP animation for background elements
        gsap.to('.float-1', {
            y: -30,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });

        gsap.to('.float-2', {
            y: 30,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
    }, []);

    return (
        <section className="py-12 sm:py-16 md:py-20 bg-blue-900 text-white relative overflow-hidden">
            {/* Background decoration with floating animation */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
                <div className="float-1 absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="float-2 absolute bottom-10 right-10 w-80 h-80 bg-blue-400 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Patient Stories</h2>
                    <p className="text-sm sm:text-base text-blue-200">See what our happy patients have to say about their experience with us.</p>
                </div>

                {/* Mobile: Auto-scrolling Carousel */}
                <div className="md:hidden relative overflow-hidden">
                    <div className="flex gap-4 animate-scroll-testimonials">
                        {/* Duplicate testimonials for infinite scroll */}
                        {[...testimonials, ...testimonials].map((t, index) => (
                            <div key={index} className="min-w-[280px] flex-shrink-0 bg-blue-800/50 backdrop-blur-md p-6 rounded-2xl border border-blue-700 hover:bg-blue-800 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300">
                                <div className="flex items-center space-x-3 mb-4">
                                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-primary object-cover" />
                                    <div>
                                        <h4 className="font-bold text-base">{t.name}</h4>
                                        <p className="text-blue-300 text-xs">{t.location}</p>
                                    </div>
                                </div>
                                <div className="flex text-yellow-400 mb-3 text-sm">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                                <p className="text-blue-100 italic leading-relaxed text-sm">"{t.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop: Grid Layout */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {testimonials.map((t) => (
                        <div key={t.id} className="bg-blue-800/50 backdrop-blur-md p-8 rounded-2xl border border-blue-700 hover:bg-blue-800 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 cursor-pointer">
                            <div className="flex items-center space-x-4 mb-6">
                                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full border-2 border-primary object-cover hover:scale-110 transition-transform duration-300" />
                                <div>
                                    <h4 className="font-bold text-lg">{t.name}</h4>
                                    <p className="text-blue-300 text-sm">{t.location}</p>
                                </div>
                            </div>
                            <div className="flex text-yellow-400 mb-4 text-sm">
                                {[...Array(t.rating)].map((_, i) => (
                                    <span key={i} className="hover:scale-125 inline-block transition-transform">★</span>
                                ))}
                            </div>
                            <p className="text-blue-100 italic leading-relaxed">"{t.text}"</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom CSS for auto-scroll animation */}
            <style jsx>{`
                @keyframes scroll-testimonials {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                
                .animate-scroll-testimonials {
                    animation: scroll-testimonials 25s linear infinite;
                    display: flex;
                }
                
                .animate-scroll-testimonials:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
