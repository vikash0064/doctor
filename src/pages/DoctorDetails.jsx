import React, { useEffect, useRef } from 'react';
import { IMAGES } from '../constants';
import { MapPin, Clock, Star, Award, Stethoscope, ChevronRight, CheckCircle2, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const DoctorDetails = () => {
    const heroRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const tl = gsap.timeline();
        tl.fromTo(heroRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 })
            .fromTo(contentRef.current.children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.4");

    }, []);

    return (
        <main className="bg-gray-50/50">
            {/* Profile Hero */}
            <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary-50 to-transparent z-0 opacity-60"></div>
                <div className="absolute top-20 left-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 z-0"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                        {/* Image Side */}
                        <div className="md:w-1/3 flex justify-center">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary-400 to-primary-200 rounded-[2rem] rotate-6 opacity-40 group-hover:rotate-3 transition-all duration-500 blur-sm"></div>
                                <div className="absolute inset-0 bg-gradient-to-bl from-blue-400 to-blue-200 rounded-[2rem] -rotate-6 opacity-40 group-hover:-rotate-3 transition-all duration-500 blur-sm"></div>
                                <img
                                    src={IMAGES.doctor}
                                    alt="Dr. Nimisha Modi"
                                    className="relative w-72 h-80 md:w-80 md:h-96 object-cover rounded-[2rem] shadow-2xl z-10 transform transition-transform duration-500"
                                />
                                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3 animate-bounce-slow">
                                    <div className="bg-primary-100 p-2 rounded-full">
                                        <Star className="text-primary-500 fill-primary-500" size={24} />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-gray-900 text-lg">5.0</span>
                                        <span className="text-xs text-gray-500 font-medium">624+ Reviews</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Text Side */}
                        <div className="md:w-2/3 text-center md:text-left space-y-6">
                            <div>
                                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-4 border border-blue-100">
                                    <Award size={16} /> Lead Specialist
                                </span>
                                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                                    Dr. Nimisha <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600">Modi</span>
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-600 font-medium mt-2">B.D.S. | Implantologist | Cosmetic Dentist</p>
                            </div>

                            <p className="text-gray-600 leading-relaxed text-lg max-w-2xl mx-auto md:mx-0">
                                Renowned for delivering high-quality care with a personalized touch. Dr. Nimisha Modi has established a strong reputation for excellence in specialized dental treatments and surgeries in Surat, blending artistry with advanced science.
                            </p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                                <a href="https://wa.me/918401783154" className="bg-primary-500 text-white px-8 py-4 rounded-full font-bold hover:bg-primary-600 transition-all shadow-lg hover:shadow-primary-500/30 flex items-center gap-2 transform hover:-translate-y-1">
                                    <span>Book Appointment</span>
                                    <ChevronRight size={18} />
                                </a>
                                <Link to="/contact" className="bg-white text-gray-700 border-2 border-gray-100 px-8 py-4 rounded-full font-bold hover:border-primary-500 hover:text-primary-500 transition-all flex items-center gap-2">
                                    <MapPin size={18} /> Visit Clinic
                                </Link>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-100 mt-8">
                                <div>
                                    <h4 className="text-3xl font-bold text-gray-900">15+</h4>
                                    <span className="text-sm text-gray-500 font-medium">Years Exp.</span>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-gray-900">10k+</h4>
                                    <span className="text-sm text-gray-500 font-medium">Happy Smiles</span>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-gray-900">24/7</h4>
                                    <span className="text-sm text-gray-500 font-medium">Support</span>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-gray-900">100%</h4>
                                    <span className="text-sm text-gray-500 font-medium">Satisfaction</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Info Grid */}
            <section ref={contentRef} className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* Left Column: Qualifications & Services */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Services */}
                            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-gray-100 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
                                        <Stethoscope size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Specialized Services</h2>
                                        <p className="text-sm text-gray-500">Comprehensive treatments offered</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        "Maxillofacial Prosthetics", "Discolored Tooth Restoration", "Wisdom Tooth Extraction",
                                        "Orthognathic Surgery", "Surgical Tooth Extraction", "Oral & Maxillofacial Surgery",
                                        "Braces & Aligners", "Smile Makeovers", "Full Mouth Rehabilitation"
                                    ].map((service, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group cursor-default">
                                            <CheckCircle2 size={18} className="text-green-500 group-hover:text-primary-500 transition-colors" />
                                            <span className="text-gray-700 font-semibold group-hover:text-gray-900">{service}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Biography */}
                            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-gray-100 border border-gray-100">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Professional Journey</h2>
                                        <p className="text-sm text-gray-500">Dedication to Dental Excellence</p>
                                    </div>
                                </div>
                                <div className="prose prose-lg text-gray-600">
                                    <p className="mb-4">
                                        Dr. Nimisha Modi isn't just a dentist; she is a smile architect. With a passion rooted in both medical science and unwavering artistry, she has spent over 15 years refining her craft.
                                    </p>
                                    <p>
                                        Her clinic in Surat is more than a medical facility—it's a sanctuary for dental wellness equipped with state-of-the-art technology comparable to international standards. Whether it's complex surgeries or subtle cosmetic enhancements, Dr. Modi's approach is always patient-centric, prioritizing comfort and long-term health above all else.
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Right Column: Location & Hours */}
                        <div className="space-y-8">
                            <div className="bg-gray-900 text-white rounded-[2rem] p-8 md:p-10 sticky top-28 overflow-hidden relative">
                                {/* Decorative circles */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl -ml-16 -mb-16"></div>

                                <h3 className="text-2xl font-bold mb-8 relative z-10">Visit Us</h3>

                                <div className="space-y-8 relative z-10">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3 text-primary-400">
                                            <MapPin size={20} />
                                            <span className="font-bold uppercase tracking-wider text-sm">Location</span>
                                        </div>
                                        <p className="text-gray-300 pl-8 leading-relaxed">
                                            Shop No. 12, Crystal Plaza,<br />
                                            Near Gayatri Kariyana Store,<br />
                                            New Adajan Road, Palanpur Patia,<br />
                                            Surat, Gujarat.
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-3 mb-3 text-primary-400">
                                            <Phone size={20} />
                                            <span className="font-bold uppercase tracking-wider text-sm">Contact</span>
                                        </div>
                                        <p className="text-gray-300 pl-8 font-mono text-lg">
                                            +91 84017 83154
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-gray-800">
                                        <div className="flex items-center gap-3 mb-4 text-primary-400">
                                            <Clock size={20} />
                                            <span className="font-bold uppercase tracking-wider text-sm">Opening Hours</span>
                                        </div>
                                        <ul className="space-y-3 pl-8 text-sm">
                                            <li className="flex justify-between text-gray-300"><span>Mon - Sat</span> <span className="font-bold text-white">9:00 AM - 9:00 PM</span></li>
                                            <li className="flex justify-between text-gray-300"><span>Sunday</span> <span className="font-bold text-primary-400">By Appointment</span></li>
                                        </ul>
                                    </div>
                                </div>

                                <a href="https://maps.google.com" target="_blank" className="block w-full bg-primary-500 text-white text-center py-4 rounded-xl font-bold mt-8 hover:bg-primary-600 transition-all shadow-lg shadow-primary-900/50 transform hover:-translate-y-1 relative z-10">
                                    Get Directions
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default DoctorDetails;
