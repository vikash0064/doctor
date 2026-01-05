import React from 'react';
import { IMAGES } from '../constants';
import { Link } from 'react-router-dom';

const DoctorProfile = () => {
    return (
        <section className="py-20 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    <div className="md:w-1/2 relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <img src={IMAGES.doctor} alt="Dr. Nimisha Modi" className="w-full h-auto object-cover" />
                        </div>
                        {/* Decorative pattern */}
                        <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 translate-x-1/2">
                            <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <circle cx="2" cy="2" r="2" className="text-blue-100 fill-current" />
                                    </pattern>
                                </defs>
                                <rect width="200" height="200" fill="url(#dotPattern)" />
                            </svg>
                        </div>
                    </div>

                    <div className="md:w-1/2">
                        <h4 className="text-secondary font-bold uppercase tracking-wider mb-2">Meet Our Lead Specialist</h4>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Dr. Nimisha Modi</h2>
                        <p className="text-xl text-gray-600 mb-6 font-medium">B.D.S. | Implantologist | Cosmetic Dentist</p>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            With over 15 years of experience in advanced dentistry, Dr. Nimisha Modi has transformed thousands of smiles. Her expertise lies in painless dental implants and cosmetic makeovers. She is dedicated to providing the highest standard of care in a comfortable and hygienic environment.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div>
                                <h3 className="text-3xl font-bold text-primary mb-1">15+</h3>
                                <p className="text-gray-500 text-sm">Years Experience</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-primary mb-1">10k+</h3>
                                <p className="text-gray-500 text-sm">Happy Patients</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-primary mb-1">50+</h3>
                                <p className="text-gray-500 text-sm">Awards Won</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-primary mb-1">100%</h3>
                                <p className="text-gray-500 text-sm">Case Success</p>
                            </div>
                        </div>

                        <Link to="/doctors/dr-nimisha-modi" className="inline-block bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                            Read Full Profile
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DoctorProfile;
