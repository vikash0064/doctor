import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { IMAGES } from '../constants';
import { ShieldCheck, Calendar, Clock, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-50 dark:bg-[#020617] text-gray-600 dark:text-gray-400 py-10 sm:py-12 md:py-16 text-sm border-t border-gray-100 dark:border-slate-800 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

                    {/* Column 1: About */}
                    <div>
                        <Link to="/" className="flex items-center gap-3 mb-4 sm:mb-6 group">
                            <img src={IMAGES.logo} alt="Dent O Care" className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110" />
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-gray-800 dark:text-white tracking-tight leading-none">
                                    Dent <span className="text-primary-500">O</span> Care
                                </span>
                                <span className="text-[8px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-[0.2em] leading-none mt-1">
                                    Dental & Implant Center
                                </span>
                            </div>
                        </Link>
                        <p className="mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm">
                            Advanced Multispeciality Dental Clinic & Implant Center. Dedicated to providing world-class dental care with a personal touch.
                        </p>
                        <div className="flex gap-3 sm:gap-4">
                            {/* Social Icons placeholders */}
                            <a href="#" className="bg-white dark:bg-slate-800 p-2 rounded hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-colors text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-slate-700"><ShieldCheck size={16} className="sm:w-[18px] sm:h-[18px]" /></a>
                            <a href="#" className="bg-white dark:bg-slate-800 p-2 rounded hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-colors text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-slate-700"><Calendar size={16} className="sm:w-[18px] sm:h-[18px]" /></a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-gray-900 dark:text-white font-bold text-base sm:text-lg mb-4 sm:mb-6">Patient Center</h4>
                        <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                            <li><Link to="/safety" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Patient Safety</Link></li>
                            <li><Link to="/blogs" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Blogs & News</Link></li>
                            <li><Link to="/careers" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Careers</Link></li>
                            <li><Link to="/contact" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Treatments */}
                    <div>
                        <h4 className="text-gray-900 dark:text-white font-bold text-base sm:text-lg mb-4 sm:mb-6">Treatments</h4>
                        <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                            <li><Link to="/treatments#implants" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Dental Implants</Link></li>
                            <li><Link to="/treatments#rct" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Root Canal Treatment</Link></li>
                            <li><Link to="/treatments#straightening" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Braces & Aligners</Link></li>
                            <li><Link to="/treatments" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Kids Dentistry</Link></li>
                            <li><Link to="/treatments#restoration" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Cosmetic Dentistry</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="text-gray-900 dark:text-white font-bold text-base sm:text-lg mb-4 sm:mb-6">Get in Touch</h4>
                        <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                            <li className="flex gap-2 sm:gap-3">
                                <Phone size={16} className="text-primary-500 shrink-0 sm:w-[18px] sm:h-[18px]" />
                                <span>+91 84017 83154</span>
                            </li>
                            <li className="flex gap-2 sm:gap-3">
                                <Clock size={16} className="text-primary-500 shrink-0 sm:w-[18px] sm:h-[18px]" />
                                <span>Mon - Sat: 9:00 AM - 9:00 PM<br />Sun: By Appointment</span>
                            </li>
                            <li className="flex gap-2 sm:gap-3">
                                <MapPin size={16} className="text-primary-500 shrink-0 sm:w-[18px] sm:h-[18px]" />
                                <span>Shop No. 12, Crystal Plaza,<br />New Adajan Road, Surat.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-slate-800 mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-xs gap-3 sm:gap-0">
                    <p>&copy; {new Date().getFullYear()} Dent O Care. All rights reserved.</p>
                    <div className="flex gap-4 sm:gap-6">
                        <Link to="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacy Policy</Link>
                        <Link to="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
