import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

// Placeholder standard images for scrolling showcase
const scrollingImages = [
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584036561566-b93a941cd64e?q=80&w=1974&auto=format&fit=crop",
    "https://cdn.pixabay.com/photo/2013/02/09/04/30/dentist-80183_1280.jpg",
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop",
];

const ClinicShowcase = () => {
    const scrollerRef = useRef(null);

    useEffect(() => {
        // Infinite scroll animation
        const scrollerContent = Array.from(scrollerRef.current.children);

        // Clone items for seamless loop
        scrollerContent.forEach(item => {
            const clone = item.cloneNode(true);
            scrollerRef.current.appendChild(clone);
        });

        gsap.to(scrollerRef.current, {
            x: "-50%",
            duration: 20,
            ease: "none",
            repeat: -1,
        });
    }, []);

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Our World Class Clinic</h2>
                <p className="text-gray-600">State-of-the-art facilities designed for your comfort.</p>
            </div>

            <div className="relative w-full overflow-hidden mb-10">
                <div ref={scrollerRef} className="flex gap-6 w-max pl-4">
                    {scrollingImages.map((img, i) => (
                        <div key={i} className="w-[300px] md:w-[400px] h-[250px] rounded-xl overflow-hidden shrink-0 shadow-lg border border-gray-100">
                            <img src={img} alt="Clinic Interior" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>

                {/* Gradients for smooth edges */}
                <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
            </div>

            <div className="text-center">
                <Link to="/gallery" className="bg-primary-500 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-600 transition-all inline-flex items-center gap-2 group">
                    <span>View All Photos</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    );
};

export default ClinicShowcase;
