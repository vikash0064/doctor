import React, { useState, useEffect, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Loader2 } from 'lucide-react';
import { IMAGES } from '../constants'; // Assuming we can use this or just static URLs

// Dynamically import all images from the gallery folder
const galleryImages = import.meta.glob('../assets/gallery/*.(png|jpe?g|svg|webp|avif)', { eager: true, as: 'url' });
const localImages = Object.values(galleryImages);

// Expanded Default Images for "Many Images" Demo
const defaultImages = [
    { url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000", category: "Clinic" },
    { url: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1000", category: "Smiles" },
    { url: "https://images.unsplash.com/photo-1588776814546-1ffcf4722e99?q=80&w=1000", category: "Smiles" },
    { url: "https://media.istockphoto.com/id/1344779917/photo/medical-center-hospital-room-sterilization-concept-blue-tone.jpg?s=2048x2048&w=is&k=20&c=K5xTqCgW3bE8aN-E8u2_yC8qQ8_hB7eT8rB-k8_Q8_Y=", category: "Equipment" },
    { url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000", category: "Clinic" },
    { url: "https://media.istockphoto.com/id/1183181825/photo/dentist-office.jpg?s=2048x2048&w=is&k=20&c=u1x5Q-e5_j4_5hZ8_v8_9Q8_hB7eT8rB-k8_Q8_Y=", category: "Clinic" },
    { url: "https://images.unsplash.com/photo-1584036561566-b93a941cd64e?q=80&w=1000", category: "Equipment" },
    { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000", category: "Smiles" },
    { url: "https://cdn.pixabay.com/photo/2013/02/09/04/30/dentist-80183_1280.jpg", category: "Team" },
    { url: "https://images.unsplash.com/photo-1600170457229-450f63e635fb?q=80&w=1000", category: "Smiles" },
    { url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000", category: "Team" },
    { url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000", category: "Equipment" },
    { url: "https://images.unsplash.com/photo-1628177142898-93e36e4e3b79?q=80&w=1000", category: "Smiles" },
    { url: "https://images.unsplash.com/photo-1598256989330-052973f71c17?q=80&w=1000", category: "Clinic" },
    { url: "https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=1000", category: "Equipment" }
];

const ClinicGallery = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');
    const [visibleCount, setVisibleCount] = useState(9);

    // Combine local and default, giving local standard 'Gallery' category for now
    const allImages = useMemo(() => {
        const localFormatted = localImages.map(url => ({ url, category: 'Uploads' }));
        return localFormatted.length > 0 ? localFormatted : defaultImages;
    }, []);

    // Filter images
    const filteredImages = useMemo(() => {
        if (activeFilter === 'All') return allImages;
        return allImages.filter(img => img.category === activeFilter);
    }, [activeFilter, allImages]);

    // Categories list (dynamic based on current images)
    const categories = useMemo(() => {
        const cats = new Set(allImages.map(img => img.category));
        return ['All', ...Array.from(cats)];
    }, [allImages]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Handlers
    const handleLoadMore = () => setVisibleCount(prev => prev + 6);

    const handleNext = (e) => {
        e.stopPropagation();
        setSelectedImageIndex(prev => (prev + 1) % filteredImages.length);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setSelectedImageIndex(prev => (prev - 1 + filteredImages.length) % filteredImages.length);
    };

    const handleKeyDown = (e) => {
        if (selectedImageIndex === null) return;
        if (e.key === 'ArrowRight') setSelectedImageIndex(prev => (prev + 1) % filteredImages.length);
        if (e.key === 'ArrowLeft') setSelectedImageIndex(prev => (prev - 1 + filteredImages.length) % filteredImages.length);
        if (e.key === 'Escape') setSelectedImageIndex(null);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex]);


    return (
        <section className="py-20 bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-900/50 text-primary-600 dark:text-primary-400 text-xs font-black uppercase tracking-widest mb-4">
                        Our Portfolio
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                        Life at <span className="text-primary-600 dark:text-primary-500">Dent O Care</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                        A visual journey through our clinic, happy smiles, and advanced technology.
                    </p>
                </div>

                {/* Filter Tabs */}
                {categories.length > 2 && (
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => { setActiveFilter(cat); setVisibleCount(9); }}
                                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeFilter === cat
                                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg scale-105'
                                    : 'bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-slate-700 hover:border-gray-900 dark:hover:border-white hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Masonry Grid */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {filteredImages.slice(0, visibleCount).map((img, index) => (
                        <div
                            key={index}
                            className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden shadow-sm bg-gray-200 dark:bg-slate-800"
                            onClick={() => setSelectedImageIndex(index)}
                        >
                            <img
                                src={img.url}
                                alt={`Gallery ${index}`}
                                className="w-full h-auto transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                loading="lazy"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
                                    <ZoomIn size={24} />
                                </span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                <span className="text-white text-xs font-bold uppercase tracking-wider">{img.category}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                {visibleCount < filteredImages.length && (
                    <div className="text-center mt-12">
                        <button
                            onClick={handleLoadMore}
                            className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border-2 border-gray-900 dark:border-white px-8 py-3 rounded-full font-bold hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-all"
                        >
                            Load More Photos <Loader2 size={16} className="animate-spin" />
                        </button>
                    </div>
                )}

                {/* Lightbox */}
                {selectedImageIndex !== null && (
                    <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center backdrop-blur-sm animate-fade-in" onClick={() => setSelectedImageIndex(null)}>

                        <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]" onClick={() => setSelectedImageIndex(null)}>
                            <X size={40} />
                        </button>

                        <button className="absolute left-4 text-white/50 hover:text-white transition-colors p-2 z-[110]" onClick={handlePrev}>
                            <ChevronLeft size={48} />
                        </button>

                        <button className="absolute right-4 text-white/50 hover:text-white transition-colors p-2 z-[110]" onClick={handleNext}>
                            <ChevronRight size={48} />
                        </button>

                        <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                            <img
                                src={filteredImages[selectedImageIndex].url}
                                alt="Full View"
                                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            />
                            <div className="absolute bottom-4 left-0 right-0 text-center text-white/80 text-sm font-medium">
                                {selectedImageIndex + 1} / {filteredImages.length}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .animate-fade-in {
                    animation: fadeIn 0.2s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </section>
    );
};

export default ClinicGallery;
