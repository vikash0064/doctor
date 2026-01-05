import React, { useRef, useEffect } from 'react';
import { IMAGES } from '../constants';
import gsap from 'gsap';
import { Check } from 'lucide-react';

const WhyTrust = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(sectionRef.current.querySelectorAll('.trust-card'),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
        );
    }, []);

    return (
        <section ref={sectionRef} className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 animate-fade-in px-2">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-3 text-[10px] sm:text-xs font-extrabold tracking-[0.2em] text-primary-600 uppercase bg-primary-50 rounded-full border border-primary-100 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                        Trusted by 10,000+ Families
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 relative leading-tight tracking-tight text-gray-900">
                        Why Choose <span className="bg-gradient-to-br from-primary-700 via-primary-500 to-primary-400 bg-clip-text text-transparent">Dent O Care?</span>
                    </h2>
                    <p className="text-sm sm:text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium px-4">
                        Experience expert dental care and clinical excellence. We are Surat's trusted choice for a healthy, beautiful smile.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Left Image */}
                    <div className="lg:w-5/12 relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop"
                                alt="Doctor and Patient"
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent flex items-end p-8">
                                <div className="text-white">
                                    <p className="font-bold text-xl">Dr. Nimisha Modi</p>
                                    <p className="text-blue-100 text-sm">Lead Specialist</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Grid */}
                    <div className="lg:w-7/12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                            {/* Item 1 */}
                            <div className="trust-card">
                                <h3 className="text-xl font-bold text-blue-900 mb-4 border-b-2 border-primary-400 inline-block pb-1">World Class Treatment</h3>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex gap-2"><Check size={18} className="text-green-500 mt-1 shrink-0" /> <span>Only clinic in Palanpur Patia with Advanced Laser Tech</span></li>
                                    <li className="flex gap-2"><Check size={18} className="text-green-500 mt-1 shrink-0" /> <span>Globally certified implant materials</span></li>
                                    <li className="flex gap-2"><Check size={18} className="text-green-500 mt-1 shrink-0" /> <span>3D Intraoral Scanning for precision</span></li>
                                </ul>
                            </div>

                            {/* Item 2 */}
                            <div className="trust-card">
                                <h3 className="text-xl font-bold text-blue-900 mb-4 border-b-2 border-primary-400 inline-block pb-1">Doctor-Led Patient Care</h3>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex gap-2"><Check size={18} className="text-green-500 mt-1 shrink-0" /> <span>Direct consultation with Dr. Nimisha Modi</span></li>
                                    <li className="flex gap-2"><Check size={18} className="text-green-500 mt-1 shrink-0" /> <span>Personalized treatment plans</span></li>
                                    <li className="flex gap-2"><Check size={18} className="text-green-500 mt-1 shrink-0" /> <span>Post-treatment follow-up calls</span></li>
                                </ul>
                            </div>

                            {/* Item 3 */}
                            <div className="trust-card">
                                <h3 className="text-xl font-bold text-blue-900 mb-4 border-b-2 border-primary-400 inline-block pb-1">15+ Years Experience</h3>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex gap-2"><Check size={18} className="text-green-500 mt-1 shrink-0" /> <span>10,000+ happy smiles delivered</span></li>
                                    <li className="flex gap-2"><Check size={18} className="text-green-500 mt-1 shrink-0" /> <span>Expert in complex full mouth rehabs</span></li>
                                    <li className="flex gap-2"><Check size={18} className="text-green-500 mt-1 shrink-0" /> <span>5000+ Implants placed successfully</span></li>
                                </ul>
                            </div>

                            {/* Item 4 */}
                            <div className="trust-card">
                                <h3 className="text-xl font-bold text-blue-900 mb-4 border-b-2 border-primary-400 inline-block pb-1">Unmatched Safety</h3>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex gap-2"><Check size={18} className="text-green-500 mt-1 shrink-0" /> <span>10X safety protocols (ISO Standards)</span></li>
                                    <li className="flex gap-2"><Check size={18} className="text-green-500 mt-1 shrink-0" /> <span>4-step sterilization process</span></li>
                                    <li className="flex gap-2"><Check size={18} className="text-green-500 mt-1 shrink-0" /> <span>Daily fumigation & spotlessly clean clinic</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyTrust;
