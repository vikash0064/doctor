import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Award, Users, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MeetTheDoctor = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
            }
        });

        tl.fromTo(contentRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8 }
        )
            .fromTo(imageRef.current,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8 },
                "-=0.6"
            );
    }, []);

    return (
        <section ref={sectionRef} className="py-16 md:py-20 bg-gradient-to-b from-white to-primary-50/30 overflow-hidden relative">
            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0"></div>

            <div className="container mx-auto px-4 relative z-10 max-w-5xl">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                    {/* Text Content */}
                    <div ref={contentRef} className="lg:w-1/2">
                        <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase mb-4">
                            <Award size={14} /> Meet Our Lead Specialist
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-1 leading-tight">
                            Dr. Nimisha <span className="text-primary-500">Modi</span>
                        </h2>
                        <h3 className="text-lg text-gray-600 mb-6 font-medium flex items-center gap-2">
                            B.D.S. | Implantologist | Cosmetic Dentist
                        </h3>

                        <p className="text-gray-600 mb-6 leading-relaxed text-base border-l-4 border-primary-200 pl-4 italic">
                            "Dr. Nimisha Modi is a renowned dental surgeon in Surat with over 15+ years of experience. She is known for her gentle approach and expertise in painless dental treatments. As the sole proprietor and lead dentist at Dent O Care, she personally ensures that every patient receives the highest standard of care using world-class technology."
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="flex flex-col">
                                <span className="text-3xl font-extrabold text-gray-900 mb-1">15+</span>
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Years Experience</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-extrabold text-primary-500 mb-1">10k+</span>
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Happy Patients</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link to="/appointment" className="bg-primary-500 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-primary-600 transition-all shadow-lg hover:shadow-primary-500/30 flex items-center gap-2 transform hover:-translate-y-1">
                                Book Consultation <ChevronRight size={16} />
                            </Link>
                            <Link to="/doctors" className="bg-white border-2 border-primary-100 text-gray-700 px-6 py-3 rounded-full font-bold text-sm hover:border-primary-500 hover:text-primary-500 transition-all shadow-sm hover:shadow-md">
                                View Qualifications
                            </Link>
                        </div>
                    </div>

                    {/* Image */}
                    <div ref={imageRef} className="lg:w-1/2 relative flex justify-center">
                        <div className="relative z-10 w-full max-w-sm">
                            {/* Decorative Frame */}
                            <div className="absolute inset-0 border-2 border-primary-200 rounded-[2rem] transform rotate-6 scale-105 z-0"></div>

                            <div className="relative bg-white p-2 rounded-[1.5rem] shadow-2xl overflow-hidden z-10 w-full aspect-[4/5]">
                                <img
                                    src={IMAGES.doctor}
                                    alt="Dr. Nimisha Modi"
                                    className="w-full h-full object-cover rounded-[1rem] hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute top-6 -left-4 bg-white p-3 rounded-xl shadow-xl z-20 animate-bounce-slow max-w-[140px]">
                                <div className="flex items-center gap-1 mb-1">
                                    <Users size={16} className="text-blue-500" />
                                    <span className="font-bold text-gray-900 text-xs">Patient's Choice</span>
                                </div>
                                <div className="text-[10px] text-gray-500 leading-tight">Trusted by 1000s of families in Surat.</div>
                            </div>
                        </div>

                        {/* Background Elements */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary-500/5 rounded-full blur-3xl -z-10"></div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MeetTheDoctor;
