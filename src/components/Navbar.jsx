import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Calendar, Search } from 'lucide-react';
import { IMAGES } from '../constants'; // Import IMAGES to access the logo

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Add shadow on scroll
    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`w-full fixed top-0 left-0 z-50 font-sans transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-1.5' : 'bg-white py-2 border-b border-gray-100'}`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <img src={IMAGES.logo} alt="Dent O Care Logo" className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
                        <div className="hidden md:flex flex-col">
                            <span className="text-2xl font-extrabold text-gray-800 tracking-tight leading-none group-hover:text-primary-600 transition-colors">
                                Dent <span className="text-primary-500">O</span> Care
                            </span>
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em] leading-none mt-0.5 group-hover:text-gray-600 transition-colors">
                                Dental & Implant Center
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1 bg-gray-50/50 p-1.5 rounded-full border border-gray-100">
                        <NavLink to="/" className={({ isActive }) => `px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600 hover:text-primary-500 hover:bg-white/50'}`}>Home</NavLink>

                        <div className="relative group px-2">
                            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold text-gray-600 hover:text-primary-500 transition-colors group-hover:bg-white/50">
                                <span>Treatments</span>
                                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 text-gray-400" />
                            </button>
                            {/* Dropdown Menu */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white shadow-xl shadow-primary-500/10 rounded-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 p-3 z-50">
                                <div className="space-y-1">
                                    <Link to="/treatments#maxillofacial-prosthetics" className="flex items-center gap-3 px-4 py-3 hover:bg-primary-50 text-gray-700 hover:text-primary-700 rounded-xl text-sm transition-all group/item">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-200 group-hover/item:bg-primary-500 transition-colors"></div>
                                        Maxillofacial Prosthetics
                                    </Link>
                                    <Link to="/treatments#rct" className="flex items-center gap-3 px-4 py-3 hover:bg-primary-50 text-gray-700 hover:text-primary-700 rounded-xl text-sm transition-all group/item">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-200 group-hover/item:bg-primary-500 transition-colors"></div>
                                        Root Canal (RCT)
                                    </Link>
                                    <Link to="/treatments#implants" className="flex items-center gap-3 px-4 py-3 hover:bg-primary-50 text-gray-700 hover:text-primary-700 rounded-xl text-sm transition-all group/item">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-200 group-hover/item:bg-primary-500 transition-colors"></div>
                                        Dental Implants
                                    </Link>
                                    <Link to="/treatments#straightening" className="flex items-center gap-3 px-4 py-3 hover:bg-primary-50 text-gray-700 hover:text-primary-700 rounded-xl text-sm transition-all group/item">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-200 group-hover/item:bg-primary-500 transition-colors"></div>
                                        Teeth Straightening
                                    </Link>
                                    <div className="h-px bg-gray-100 my-2 mx-2"></div>
                                    <Link to="/treatments" className="block px-4 py-2.5 text-center bg-primary-50 text-primary-600 font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-primary-500 hover:text-white transition-all shadow-sm">View All Treatments</Link>
                                </div>
                            </div>
                        </div>

                        <NavLink to="/doctors" className={({ isActive }) => `px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600 hover:text-primary-500 hover:bg-white/50'}`}>Doctors</NavLink>
                        <NavLink to="/blogs" className={({ isActive }) => `px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600 hover:text-primary-500 hover:bg-white/50'}`}>Blogs</NavLink>
                        <NavLink to="/gallery" className={({ isActive }) => `px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600 hover:text-primary-500 hover:bg-white/50'}`}>Gallery</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => `px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600 hover:text-primary-500 hover:bg-white/50'}`}>Contact</NavLink>
                    </nav>

                    {/* Right Side: CTA Buttons + Mobile Appointment + Mobile Menu */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* CTA Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            <a href="tel:+918401783154" className="hidden xl:flex flex-col items-end text-right mr-2 group">
                                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Emergency? Call Us</span>
                                <span className="text-sm font-bold text-gray-800 group-hover:text-primary-600 transition-colors">+91 84017 83154</span>
                            </a>
                            <Link to="/appointment" className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-primary-500/30 transition-all text-sm transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2">
                                <Calendar size={16} />
                                <span>Book Appointment</span>
                            </Link>
                            <Link to="/admin/testimonials" className="bg-gray-100 text-gray-900 border border-gray-200 px-4 py-3 rounded-full font-bold hover:bg-gray-200 transition-all text-sm">
                                Admin
                            </Link>
                        </div>

                        {/* Mobile Appointment Button */}
                        <Link to="/appointment" className="md:hidden bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1.5 rounded-full font-semibold hover:shadow-lg transition-all text-[10px] flex items-center gap-1">
                            <Calendar size={12} />
                            <span>Book Appointment</span>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button className="lg:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors bg-gray-50 rounded-lg" onClick={toggleMenu}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 absolute w-full left-0 shadow-2xl animate-in slide-in-from-top-5 duration-300 z-50 h-[calc(100vh-80px)] overflow-y-auto">
                    <div className="container mx-auto px-6 py-8 flex flex-col space-y-4">
                        <Link to="/" className="text-xl font-semibold text-gray-800 py-3 border-b border-gray-50 flex justify-between items-center" onClick={toggleMenu}>
                            Home <ChevronDown size={16} className="-rotate-90 text-gray-300" />
                        </Link>
                        <Link to="/treatments" className="text-xl font-semibold text-gray-800 py-3 border-b border-gray-50 flex justify-between items-center" onClick={toggleMenu}>
                            Treatments <ChevronDown size={16} className="-rotate-90 text-gray-300" />
                        </Link>
                        <Link to="/doctors" className="text-xl font-semibold text-gray-800 py-3 border-b border-gray-50 flex justify-between items-center" onClick={toggleMenu}>
                            Doctors <ChevronDown size={16} className="-rotate-90 text-gray-300" />
                        </Link>
                        <Link to="/gallery" className="text-xl font-semibold text-gray-800 py-3 border-b border-gray-50 flex justify-between items-center" onClick={toggleMenu}>
                            Gallery <ChevronDown size={16} className="-rotate-90 text-gray-300" />
                        </Link>
                        <Link to="/blogs" className="text-xl font-semibold text-gray-800 py-3 border-b border-gray-50 flex justify-between items-center" onClick={toggleMenu}>
                            Blogs <ChevronDown size={16} className="-rotate-90 text-gray-300" />
                        </Link>
                        <Link to="/contact" className="text-xl font-semibold text-gray-800 py-3 border-b border-gray-50 flex justify-between items-center" onClick={toggleMenu}>
                            Contact <ChevronDown size={16} className="-rotate-90 text-gray-300" />
                        </Link>

                        <div className="pt-6 grid gap-4">
                            <Link to="/appointment" className="bg-primary-500 text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary-200" onClick={toggleMenu}>Book Appointment</Link>
                            <Link to="/admin/testimonials" className="bg-gray-900 text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg" onClick={toggleMenu}>Admin Panel</Link>
                            <a href="https://wa.me/918401783154" className="bg-[#25D366] text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-200 flex items-center justify-center gap-2">
                                <span>WhatsApp Us</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
