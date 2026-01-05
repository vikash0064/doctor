import React, { useRef, useEffect } from 'react';
import { IMAGES } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        id: 1,
        title: "Dental Implants",
        description: "Replace missing teeth with permanent, natural-looking dental implants.",
        icon: "🦷",
        link: "/service/implants"
    },
    {
        id: 2,
        title: "Cosmetic Dentistry",
        description: "Smile makeovers with veneers, whitening, and bonding treatments.",
        icon: "✨",
        link: "/service/cosmetic"
    },
    {
        id: 3,
        title: "Root Canal",
        description: "Pain-free root canal treatments to save your infected teeth.",
        icon: "⚡",
        link: "/service/root-canal"
    },
    {
        id: 4,
        title: "Orthodontics",
        description: "Straighten your teeth with metal braces or invisible aligners.",
        icon: "😬",
        link: "/service/orthodontics"
    },
    {
        id: 5,
        title: "Pediatric Dentistry",
        description: "Gentle and fun dental care specialized for children.",
        icon: "👶",
        link: "/service/kids"
    },
    {
        id: 6,
        title: "Teeth Whitening",
        description: "Professional whitening for a brighter, more confident smile.",
        icon: "💎",
        link: "/service/whitening"
    }
];

const Services = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const cards = sectionRef.current.querySelectorAll('.service-card');

        gsap.fromTo(cards,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            }
        );
    }, []);

    return (
        <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Our Premium Services</h2>
                    <p className="text-sm sm:text-base text-gray-600">Comprehensive dental care utilizing the latest technology for precise and comfortable treatments.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {services.map((service) => (
                        <Link
                            key={service.id}
                            to={service.link}
                            className="service-card bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                        >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 text-2xl sm:text-3xl flex items-center justify-center rounded-xl mb-4 sm:mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">{service.description}</p>
                            <div className="flex items-center text-primary font-semibold text-xs sm:text-sm">
                                <span>Learn More</span>
                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
