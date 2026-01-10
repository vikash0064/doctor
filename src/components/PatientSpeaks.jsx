import React, { useState, useEffect } from 'react';
import { Play, Star, MapPin, Calendar, Volume2, VolumeX, ChevronLeft, ChevronRight, X, Shield, CheckCircle, Users, Heart } from 'lucide-react';

const PatientSpeaks = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [showAll, setShowAll] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Sample testimonials data
    const sampleTestimonials = [
        {
            id: 1,
            name: "Aarav Patel",
            age: 28,
            location: "Adajan, Surat",
            treatment: "Invisalign Treatment",
            review: "I was hesitant about braces, but the invisible aligners changed everything. Dr. Nimisha made the process so smooth!",
            rating: 5,
            date: "2 Weeks ago",
            mediaType: "video",
            mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-showing-her-new-smile-40696-large.mp4",
            thumbnail: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            isVerified: true
        },
        {
            id: 2,
            name: "Priya Shah",
            age: 32,
            location: "Vesu, Surat",
            treatment: "Dental Implants",
            review: "Finally got my smile back! The implant procedure was painless and the results are incredibly natural.",
            rating: 5,
            date: "1 Month ago",
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            isVerified: true
        },
        {
            id: 3,
            name: "Rahul Mehta",
            age: 45,
            location: "Palanpur, Surat",
            treatment: "Root Canal",
            review: "Hands down the best dental clinic. Zero pain during my RCT. The technology they use is top-notch.",
            rating: 5,
            date: "3 Weeks ago",
            mediaType: "video",
            mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-having-a-dental-check-up-40697-large.mp4",
            thumbnail: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            isVerified: true
        },
        {
            id: 4,
            name: "Anjali Gupta",
            age: 26,
            location: "Rander, Surat",
            treatment: "Smile Makeover",
            review: "My wedding smile design was perfect. Thank you Dr. Modi for your artistic work!",
            rating: 5,
            date: "2 Months ago",
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            isVerified: true
        },
        {
            id: 5,
            name: "Sanjay Kumar",
            age: 38,
            location: "Athwa, Surat",
            treatment: "Teeth Whitening",
            review: "Professional service and amazing results. My confidence has increased tremendously!",
            rating: 5,
            date: "1 Week ago",
            mediaType: "video",
            mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-dentist-showing-teeth-models-to-patient-40695-large.mp4",
            thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            isVerified: true
        },
        {
            id: 6,
            name: "Neha Sharma",
            age: 29,
            location: "Varachha, Surat",
            treatment: "Dental Crowns",
            review: "Excellent work! The crown looks so natural that even my family couldn't tell the difference.",
            rating: 5,
            date: "3 Months ago",
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1564420228450-d4c18b6d42ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            isVerified: true
        }
    ];

    useEffect(() => {
        setTestimonials(sampleTestimonials);
    }, []);

    const openMediaViewer = (testimonial, index) => {
        setSelectedMedia(testimonial);
        setCurrentIndex(index);
        setIsPlaying(false);
    };

    const closeMediaViewer = () => {
        setSelectedMedia(null);
        setIsPlaying(false);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const nextMedia = () => {
        const nextIndex = (currentIndex + 1) % testimonials.length;
        setSelectedMedia(testimonials[nextIndex]);
        setCurrentIndex(nextIndex);
        setIsPlaying(false);
    };

    const prevMedia = () => {
        const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        setSelectedMedia(testimonials[prevIndex]);
        setCurrentIndex(prevIndex);
        setIsPlaying(false);
    };

    const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 3);

    return (
        <section className="py-8 md:py-12 bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Trust Header */}
                <div className="text-center mb-6 md:mb-8">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                            ))}
                        </div>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">4.9/5 • 500+ Reviews</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Real Patients, <span className="text-blue-600 dark:text-blue-400">Real Stories</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm max-w-2xl mx-auto">
                        Hear from our patients about their transformation journey
                    </p>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 flex items-center gap-2">
                        <Shield size={16} className="text-blue-600 dark:text-blue-400" />
                        <div>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-200">Verified</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Patients</p>
                        </div>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 flex items-center gap-2">
                        <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400" />
                        <div>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-200">100%</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Satisfaction</p>
                        </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 flex items-center gap-2">
                        <Users size={16} className="text-purple-600 dark:text-purple-400" />
                        <div>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-200">500+</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Stories</p>
                        </div>
                    </div>
                    <div className="bg-rose-50 dark:bg-rose-900/20 rounded-lg p-3 flex items-center gap-2">
                        <Heart size={16} className="text-rose-600 dark:text-rose-400" />
                        <div>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-200">4.9/5</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
                        </div>
                    </div>
                </div>

                {/* Testimonials Grid - Compact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                    {displayedTestimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className="group relative bg-white dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
                            onClick={() => openMediaViewer(testimonial, index)}
                        >
                            {/* Focused Image Area (70% of card) */}
                            <div className="relative h-40 overflow-hidden">
                                {testimonial.mediaType === 'video' ? (
                                    <>
                                        <video
                                            className="w-full h-full object-cover"
                                            src={testimonial.mediaUrl}
                                            poster={testimonial.thumbnail}
                                            muted={true}
                                            loop
                                            playsInline
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-center justify-center">
                                            <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                <Play size={16} className="text-blue-600 ml-0.5" />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <img
                                            src={testimonial.mediaUrl}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </>
                                )}

                                {/* Verified Badge on Image */}
                                {testimonial.isVerified && (
                                    <div className="absolute top-2 right-2">
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500 text-white rounded-md text-[10px] font-medium">
                                            ✅ Verified
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Compact Info Below Image */}
                            <div className="p-3">
                                <div className="flex items-start justify-between mb-1">
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">{testimonial.name}, {testimonial.age}</h3>
                                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{testimonial.treatment}</p>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{testimonial.rating}.0</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                                    <span className="flex items-center gap-1">
                                        <MapPin size={10} />
                                        {testimonial.location}
                                    </span>
                                    <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                                    <span className="flex items-center gap-1">
                                        <Calendar size={10} />
                                        {testimonial.date}
                                    </span>
                                </div>

                                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 italic">
                                    "{testimonial.review}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More/Less Button */}
                {testimonials.length > 3 && (
                    <div className="text-center mt-6">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="inline-flex items-center gap-2 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-200 dark:border-slate-700"
                        >
                            <span>{showAll ? 'Show Less' : 'View All Stories'}</span>
                            {showAll ? (
                                <span className="text-xs">▲</span>
                            ) : (
                                <span className="text-xs">▼</span>
                            )}
                        </button>
                    </div>
                )}

                {/* Stats Footer */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-800">
                    <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Join <span className="font-bold text-blue-600 dark:text-blue-400">500+</span> satisfied patients who trusted us with their smile
                        </p>
                    </div>
                </div>
            </div>

            {/* Media Viewer Modal */}
            {selectedMedia && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95">
                    <button
                        onClick={closeMediaViewer}
                        className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <div className="relative w-full max-w-4xl max-h-[90vh] bg-black rounded-xl overflow-hidden">
                        {/* Media Display */}
                        <div className="relative h-[60vh] flex items-center justify-center bg-black">
                            {selectedMedia.mediaType === 'video' ? (
                                <video
                                    className="w-full h-full object-contain"
                                    src={selectedMedia.mediaUrl}
                                    controls
                                    autoPlay
                                    muted={isMuted}
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                />
                            ) : (
                                <img
                                    src={selectedMedia.mediaUrl}
                                    alt={selectedMedia.name}
                                    className="w-full h-full object-contain"
                                />
                            )}

                            {/* Custom Controls for Video */}
                            {selectedMedia.mediaType === 'video' && (
                                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4 px-4">
                                    <button
                                        onClick={toggleMute}
                                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-colors"
                                    >
                                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                    </button>
                                </div>
                            )}

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevMedia}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-colors"
                            >
                                <ChevronLeft size={24} />
                            </button>

                            <button
                                onClick={nextMedia}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-colors"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        {/* Testimonial Info Below */}
                        <div className="bg-white p-4 md:p-6">
                            <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 gap-3">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900">{selectedMedia.name}, {selectedMedia.age}</h3>
                                    <p className="text-blue-600 font-medium">{selectedMedia.treatment}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">5.0</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <span className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    {selectedMedia.location}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    {selectedMedia.date}
                                </span>
                            </div>

                            <blockquote className="text-gray-700 text-sm md:text-base italic border-l-4 border-blue-500 pl-4 py-2 bg-blue-50/50 rounded-r-lg">
                                "{selectedMedia.review}"
                            </blockquote>
                        </div>
                    </div>

                    {/* Current Media Indicator */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        {testimonials.map((_, index) => (
                            <div
                                key={index}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentIndex ? 'w-4 bg-white' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default PatientSpeaks;