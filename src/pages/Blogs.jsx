import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Calendar,
    Clock,
    Search,
    ArrowRight,
    TrendingUp,
    Sparkles,
    ChevronRight,
    SearchCheck,
    Filter,
    LayoutGrid,
    List
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '../constants';

// Import local images
import crownsImg from '../assets/images/blogs/crowns.png';
import overbiteImg from '../assets/images/blogs/overbite.png';
import prosConsImg from '../assets/images/blogs/pros_cons.png';

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Aligners", "Surgery", "Root Canal", "Implants", "Hygiene", "Lifestyle"];

const blogPosts = [
    {
        id: 1,
        title: "Can You Wear Invisible Braces with Crowns?",
        category: "Aligners & Braces",
        date: "Aug 16, 2025",
        readTime: "6 min",
        img: crownsImg,
    },
    {
        id: 2,
        title: "Teeth Braces Cost in India: 2026 Guide",
        category: "Aligners & Braces",
        date: "Apr 22, 2025",
        readTime: "8 min",
        img: "https://images.unsplash.com/photo-1513412803932-6fe214b7ec04?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Can Invisalign Fix Overbites?",
        category: "Aligners",
        date: "Apr 15, 2025",
        readTime: "3 min",
        img: overbiteImg,
    },
    {
        id: 4,
        title: "The Pros and Cons of Invisalign",
        category: "Lifestyle",
        date: "Apr 12, 2025",
        readTime: "4 min",
        img: prosConsImg,
    },
    {
        id: 5,
        title: "Root Canal: Modern Painless Techniques",
        category: "Root Canal",
        date: "Mar 28, 2025",
        readTime: "5 min",
        img: "https://images.unsplash.com/photo-1606811841660-1b5168c3ef20?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 6,
        title: "Dental Implants vs Bridges: Which is Better?",
        category: "Implants",
        date: "Mar 10, 2025",
        readTime: "7 min",
        img: "https://images.unsplash.com/photo-1598256989330-052973f71c17?q=80&w=600&auto=format&fit=crop",
    }
];

const CategoriesBar = ({ activeFilter, setActiveFilter }) => (
    <div className=" top-[59px] md:top-[71px] z-40 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800 py-2 md:py-3 transition-all duration-300">
        <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
                <Filter size={14} className="text-gray-400 hidden sm:block min-w-max mr-2" />
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`whitespace-nowrap px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${activeFilter === cat
                            ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-500/20 scale-105'
                            : 'bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-slate-600'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    </div>
);

const Blogs = () => {
    const mainRef = useRef(null);
    const [activeFilter, setActiveFilter] = useState("All");

    useEffect(() => {
        window.scrollTo(0, 0);
        let ctx = gsap.context(() => {
            gsap.fromTo(".blog-item",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out"
                }
            );
        }, mainRef);
        return () => ctx.revert();
    }, []);

    const filteredPosts = activeFilter === "All"
        ? blogPosts
        : blogPosts.filter(post =>
            post.category && (post.category.includes(activeFilter) || post.category === activeFilter)
        );

    return (
        <main ref={mainRef} className="bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
            {/* Optimized Header Area */}
            <div className="pt-24 pb-8 md:pt-32 md:pb-12 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 transition-colors">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 md:mb-6">
                        <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
                        <ChevronRight size={10} />
                        <span className="text-primary-600 dark:text-primary-400">Article Hub</span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-4 leading-tight">
                                Dental <span className="text-primary-500">Library</span>
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base font-medium leading-relaxed">
                                A clinical repository of dental wisdom, curated for regular patients and seekers of professional oral care insights.
                            </p>
                        </div>

                        {/* Search & Stats Bar */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 sm:w-64 group">
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl py-3 pl-10 pr-4 text-xs font-bold outline-none focus:border-primary-500 dark:focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 text-gray-900 dark:text-white transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                />
                                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500" />
                            </div>
                            <div className="flex items-center justify-center gap-2 bg-primary-50 dark:bg-primary-900/20 px-4 py-3 rounded-xl border border-primary-100 dark:border-primary-900/50 min-w-max">
                                <span className="text-primary-600 dark:text-primary-400 font-black text-[10px] uppercase tracking-wide">{blogPosts.length} Articles</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CategoriesBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

            <div className="container mx-auto px-4 py-8 md:py-12 pb-32 md:pb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 blogs-grid">
                    {filteredPosts.map((post) => (
                        <Link to="/" key={post.id} className="blog-item group bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary-100 dark:hover:border-slate-600 transition-all flex flex-col h-full transform hover:-translate-y-1 duration-300">
                            {/* Compact Image */}
                            <div className="aspect-[16/10] overflow-hidden relative bg-gray-100 dark:bg-slate-700">
                                <img
                                    loading="lazy"
                                    decoding="async"
                                    src={post.img}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[9px] font-black text-primary-600 dark:text-primary-400 uppercase tracking-widest shadow-sm border border-gray-100 dark:border-slate-700">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            {/* Compact Content */}
                            <div className="p-4 md:p-5 flex flex-col flex-grow">
                                <div className="flex items-center gap-3 text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                                    <span className="flex items-center gap-1"><Calendar size={10} /> {post.date}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                                    <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                                </div>
                                <h3 className="text-base md:text-lg font-bold text-gray-800 dark:text-gray-100 leading-tight mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                <div className="mt-auto pt-4 border-t border-gray-50 dark:border-slate-700 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-100 dark:border-slate-600">
                                            <img loading="lazy" src={IMAGES.doctor} className="w-full h-full object-cover" alt="Doc" />
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400">Dr. Modi</span>
                                    </div>
                                    <div className="w-7 h-7 rounded-lg bg-gray-50 dark:bg-slate-700 flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:bg-primary-500 group-hover:text-white transition-all transform group-hover:rotate-45">
                                        <ArrowRight size={14} strokeWidth={3} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* Placeholder for 'Loading/More' admin view */}
                    <div className="hidden xl:flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl bg-gray-50/50 dark:bg-slate-800/50 p-6 text-center min-h-[300px]">
                        <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm mb-3">
                            <Sparkles size={20} className="text-purple-400" />
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">More Coming Soon</p>
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-12 md:mt-16 flex items-center justify-center gap-2">
                    <button className="w-10 h-10 rounded-xl border border-gray-200 dark:border-slate-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-primary-500 hover:text-primary-500 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm">1</button>
                    <button className="w-10 h-10 rounded-xl bg-primary-500 text-white flex items-center justify-center font-black shadow-lg shadow-primary-500/30 transform hover:-translate-y-0.5 transition-all">2</button>
                    <span className="mx-2 text-gray-300 dark:text-gray-600 font-bold tracking-widest">...</span>
                    <button className="px-6 h-10 rounded-xl border border-gray-200 dark:border-slate-700 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-slate-800 hover:border-primary-500 hover:text-primary-500 hover:shadow-md transition-all">Next Page</button>
                </div>
            </div>

            {/* Admin/Stats Footer Bar */}
            <div className="bg-gray-900 py-12 text-white mt-12">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 text-primary-400">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-black">12k+</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Monthly Readers</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 text-primary-400">
                            <SearchCheck size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-black">100%</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified Content</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-xs font-black uppercase tracking-widest mb-4 text-gray-400">Want specialized advice?</h4>
                        <Link to="/appointment" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary-500/20 transform hover:-translate-y-1">
                            Consult Expert
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Blogs;
