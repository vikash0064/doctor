import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, Clock, Calendar, BookOpen, Tag } from 'lucide-react';

const blogs = [
    {
        id: 1,
        title: "Invisible Braces with Crowns: What You Need to Know",
        excerpt: "Learn if you can wear clear aligners with existing dental crowns and caps for teeth straightening.",
        date: "Aug 16, 2025",
        readTime: "6 min",
        category: "Braces & Aligners",
        img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        color: "bg-blue-100"
    },
    {
        id: 2,
        title: "Complete Guide to Teeth Braces Cost in India 2025",
        excerpt: "Detailed breakdown of braces cost across different cities and types of braces available.",
        date: "Apr 22, 2025",
        readTime: "8 min",
        category: "Cost Guide",
        img: "https://images.unsplash.com/photo-1564420228450-d4c18b6d42ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        color: "bg-emerald-100"
    },
    {
        id: 3,
        title: "Fix Overbites Without Surgery Using Invisalign",
        excerpt: "Discover how modern aligner technology can correct overbites without invasive surgery.",
        date: "Apr 15, 2025",
        readTime: "5 min",
        category: "Orthodontics",
        img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        color: "bg-purple-100"
    },
    {
        id: 4,
        title: "Pros & Cons of Invisalign: Is It Right For You?",
        excerpt: "Comprehensive comparison of Invisalign vs traditional braces for Indian patients.",
        date: "Apr 12, 2025",
        readTime: "4 min",
        category: "Comparison",
        img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        color: "bg-amber-100"
    },
    {
        id: 5,
        title: "Dental Implants: Procedure, Cost & Recovery",
        excerpt: "Everything you need to know about getting dental implants in India.",
        date: "Mar 28, 2025",
        readTime: "7 min",
        category: "Implants",
        img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        color: "bg-indigo-100"
    },
    {
        id: 6,
        title: "Root Canal Treatment: Myths vs Facts",
        excerpt: "Debunking common misconceptions about RCT and modern pain-free procedures.",
        date: "Mar 15, 2025",
        readTime: "6 min",
        category: "RCT",
        img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        color: "bg-rose-100"
    }
];

const DentalInsights = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(sectionRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 90%",
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Compact Header */}
                <div className="section-header text-center mb-8 md:mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full mb-3">
                        <BookOpen size={14} className="text-blue-600" />
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                            Dental Insights
                        </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                        Latest from Our <span className="text-blue-600">Blog</span>
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
                        Expert articles, tips, and guides for your dental health journey
                    </p>
                </div>

                {/* Blog Grid - Compact Design */}
                <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {blogs.slice(0, 3).map((blog) => (
                        <Link
                            key={blog.id}
                            to={`/blogs/${blog.id}`}
                            className="blog-card group relative bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
                        >
                            {/* Image with Category Badge */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    loading="lazy"
                                    decoding="async"
                                    src={blog.img}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-gray-800 ${blog.color} backdrop-blur-sm`}>
                                        <Tag size={10} />
                                        {blog.category}
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {blog.date}
                                    </span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={12} />
                                        {blog.readTime} read
                                    </span>
                                </div>

                                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm md:text-base">
                                    {blog.title}
                                </h3>

                                <p className="text-gray-600 text-xs md:text-sm mb-3 line-clamp-2">
                                    {blog.excerpt}
                                </p>

                                <div className="flex items-center text-blue-600 text-sm font-medium">
                                    <span>Read Article</span>
                                    <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View More Button */}
                <div className="text-center mt-8">
                    <Link
                        to="/blogs"
                        className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-5 py-3 rounded-lg text-sm font-medium transition-colors border border-gray-200"
                    >
                        <span>View All Articles</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Quick Stats - Compact */}
                <div className="mt-8 md:mt-12 pt-6 border-t border-gray-100">
                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-bold text-blue-600">250+</p>
                            <p className="text-xs md:text-sm text-gray-600">Articles</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-bold text-emerald-600">50K+</p>
                            <p className="text-xs md:text-sm text-gray-600">Monthly Readers</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-bold text-purple-600">4.8/5</p>
                            <p className="text-xs md:text-sm text-gray-600">Rating</p>
                        </div>
                    </div>
                </div>

                {/* Newsletter Signup - Compact */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 text-center border border-blue-100">
                    <h3 className="font-bold text-gray-900 mb-2">Stay Updated</h3>
                    <p className="text-gray-600 text-sm mb-4">Get dental tips & offers in your inbox</p>
                    <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 text-sm"
                        />
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DentalInsights;