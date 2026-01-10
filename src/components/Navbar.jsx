import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Calendar, Moon, Sun } from 'lucide-react';
import { IMAGES } from '../constants'; // Import IMAGES to access the logo
import { useTheme } from '../context/ThemeContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const navRef = useRef(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Add shadow on scroll effect
    useEffect(() => {
        ScrollTrigger.create({
            start: "top top",
            end: 99999,
            onUpdate: (self) => {
                setScrolled(self.scroll() > 30);
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <header ref={navRef} className={`w-full fixed top-0 left-0 z-50 font-sans transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-1.5' : 'bg-white dark:bg-slate-900 py-2 border-b border-gray-100 dark:border-slate-800'}`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <img src={IMAGES.logo} alt="Dent O Care Logo" className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
                        <div className="hidden md:flex flex-col">
                            <span className="text-2xl font-extrabold text-gray-800 dark:text-white tracking-tight leading-none group-hover:text-primary-600 transition-colors">
                                Dent <span className="text-primary-500">O</span> Care
                            </span>
                            <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-[0.2em] leading-none mt-0.5 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                                Dental & Implant Center
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1 bg-gray-50/50 dark:bg-slate-800/50 p-1.5 rounded-full border border-gray-100 dark:border-slate-700">
                        <NavLink to="/" className={({ isActive }) => `px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-white/50 dark:hover:bg-slate-700/50'}`}>Home</NavLink>

                        <div className="relative group px-2">
                            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors group-hover:bg-white/50 dark:group-hover:bg-slate-700/50">
                                <span>Treatments</span>
                                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 text-gray-400 dark:text-gray-500" />
                            </button>
                            {/* Dropdown Menu */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white dark:bg-slate-800 shadow-xl shadow-primary-500/10 dark:shadow-black/30 rounded-2xl border border-gray-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 p-3 z-50">
                                <div className="space-y-1">
                                    <Link to="/treatments#maxillofacial-prosthetics" className="flex items-center gap-3 px-4 py-3 hover:bg-primary-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 hover:text-primary-700 rounded-xl text-sm transition-all group/item">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-200 dark:bg-slate-500 group-hover/item:bg-primary-500 transition-colors"></div>
                                        Maxillofacial Prosthetics
                                    </Link>
                                    <Link to="/treatments#rct" className="flex items-center gap-3 px-4 py-3 hover:bg-primary-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 hover:text-primary-700 rounded-xl text-sm transition-all group/item">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-200 dark:bg-slate-500 group-hover/item:bg-primary-500 transition-colors"></div>
                                        Root Canal (RCT)
                                    </Link>
                                    <Link to="/treatments#implants" className="flex items-center gap-3 px-4 py-3 hover:bg-primary-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 hover:text-primary-700 rounded-xl text-sm transition-all group/item">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-200 dark:bg-slate-500 group-hover/item:bg-primary-500 transition-colors"></div>
                                        Dental Implants
                                    </Link>
                                    <Link to="/treatments#straightening" className="flex items-center gap-3 px-4 py-3 hover:bg-primary-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 hover:text-primary-700 rounded-xl text-sm transition-all group/item">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-200 dark:bg-slate-500 group-hover/item:bg-primary-500 transition-colors"></div>
                                        Teeth Straightening
                                    </Link>
                                    <div className="h-px bg-gray-100 dark:bg-slate-700 my-2 mx-2"></div>
                                    <Link to="/treatments" className="block px-4 py-2.5 text-center bg-primary-50 dark:bg-slate-700 text-primary-600 dark:text-primary-400 font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-primary-500 hover:text-white transition-all shadow-sm">View All Treatments</Link>
                                </div>
                            </div>
                        </div>

                        <NavLink to="/doctors" className={({ isActive }) => `px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-white/50 dark:hover:bg-slate-700/50'}`}>Doctors</NavLink>
                        <NavLink to="/blogs" className={({ isActive }) => `px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-white/50 dark:hover:bg-slate-700/50'}`}>Blogs</NavLink>
                        <NavLink to="/gallery" className={({ isActive }) => `px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-white/50 dark:hover:bg-slate-700/50'}`}>Gallery</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => `px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-white/50 dark:hover:bg-slate-700/50'}`}>Contact</NavLink>
                    </nav>

                    {/* Right Side: CTA Buttons + Mobile Appointment + Mobile Menu */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Theme Toggle */}
                        {/* <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle Dark Mode"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button> */}

                        {/* CTA Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            <a href="tel:+918401783154" className="hidden xl:flex flex-col items-end text-right mr-2 group">
                                <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider">Emergency? Call Us</span>
                                <span className="text-sm font-bold text-gray-800 dark:text-white group-hover:text-primary-600 transition-colors">+91 84017 83154</span>
                            </a>
                            <Link to="/appointment" className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-primary-500/30 transition-all text-sm transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2">
                                <Calendar size={16} />
                                <span>Book Appointment</span>
                            </Link>
                            <Link to="/admin/testimonials" className="bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 px-4 py-3 rounded-full font-bold hover:bg-gray-200 dark:hover:bg-slate-700 transition-all text-sm">
                                Admin
                            </Link>
                        </div>

                        {/* Mobile Appointment Button - Enhanced */}
                        <Link to="/appointment" className="md:hidden bg-gradient-to-r from-primary-600 to-primary-500 text-white px-4 py-2 rounded-full font-bold shadow-lg shadow-primary-500/20 active:scale-95 transition-all text-xs flex items-center gap-1.5">
                            <Calendar size={14} />
                            <span>Book Now</span>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors bg-gray-50 dark:bg-slate-800 rounded-lg" onClick={toggleMenu}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <MobileMenu toggleMenu={toggleMenu} />
            )}
        </header>
    );
};

const MobileMenu = ({ toggleMenu }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".mobile-nav-item", {
                y: 20,
                opacity: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: "power2.out",
                delay: 0.1
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="lg:hidden absolute top-full left-0 w-full bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border-t border-gray-100 dark:border-slate-800 shadow-2xl rounded-b-[2rem] overflow-hidden z-40 origin-top">
            <div className="container mx-auto px-4 py-6">

                {/* Navigation Grid - Compact & Modern */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <Link to="/" className="mobile-nav-item flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors group" onClick={toggleMenu}>
                        <span className="text-gray-900 dark:text-white font-bold group-hover:text-primary-600">Home</span>
                    </Link>
                    <Link to="/treatments" className="mobile-nav-item flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors group" onClick={toggleMenu}>
                        <span className="text-gray-900 dark:text-white font-bold group-hover:text-primary-600">Treatments</span>
                    </Link>
                    <Link to="/doctors" className="mobile-nav-item flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors group" onClick={toggleMenu}>
                        <span className="text-gray-900 dark:text-white font-bold group-hover:text-primary-600">Doctors</span>
                    </Link>
                    <Link to="/gallery" className="mobile-nav-item flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors group" onClick={toggleMenu}>
                        <span className="text-gray-900 dark:text-white font-bold group-hover:text-primary-600">Gallery</span>
                    </Link>
                    <Link to="/blogs" className="mobile-nav-item flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors group" onClick={toggleMenu}>
                        <span className="text-gray-900 dark:text-white font-bold group-hover:text-primary-600">Blogs</span>
                    </Link>
                    <Link to="/contact" className="mobile-nav-item flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors group" onClick={toggleMenu}>
                        <span className="text-gray-900 dark:text-white font-bold group-hover:text-primary-600">Contact</span>
                    </Link>
                </div>

                {/* Primary Actions - Compact Row */}
                <div className="flex flex-col gap-3">
                    <Link to="/appointment" className="mobile-nav-item w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white text-center py-3.5 rounded-xl font-bold shadow-lg shadow-primary-500/20 active:scale-[0.98] transition-all flex justify-center items-center gap-2" onClick={toggleMenu}>
                        <Calendar size={18} />
                        Book Appointment
                    </Link>

                    <div className="grid grid-cols-2 gap-3">
                        <Link to="/admin" className="mobile-nav-item w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 text-center py-3 rounded-xl font-semibold text-sm" onClick={toggleMenu}>
                            Admin
                        </Link>
                        <a href="https://wa.me/918401783154" className="mobile-nav-item w-full bg-[#25D366] text-white text-center py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5 shadow-md shadow-green-500/10">
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
