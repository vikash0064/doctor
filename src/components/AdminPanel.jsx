import React, { useState, useEffect, useRef } from 'react';
import {
    Calendar, Download, Eye, FileSpreadsheet,
    Users, TrendingUp, Clock, CheckCircle,
    X, ChevronDown, Search, Filter,
    BarChart3, MessageSquare, Phone, Mail,
    ArrowUpRight, Printer, Share2, MoreVertical,
    Upload, Video, Image, Trash2, Edit,
    Play, UserPlus, DollarSign, Award,
    ThumbsUp, DownloadCloud, EyeOff,
    FileText, Settings, Bell, LogOut
} from 'lucide-react';
import gsap from 'gsap';

const AdminDashboard = () => {
    // States
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [mediaFilter, setMediaFilter] = useState('all');
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [showAppointmentForm, setShowAppointmentForm] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [activeTab, setActiveTab] = useState('testimonials');

    // Media upload state
    const [uploadForm, setUploadForm] = useState({
        patientName: '',
        treatment: '',
        mediaType: 'image',
        file: null,
        review: '',
        rating: 5,
        location: '',
        date: new Date().toISOString().split('T')[0]
    });

    // Sample data with 15+ patients
    const testimonials = [
        {
            id: 1,
            name: "Rajesh Kumar",
            age: 35,
            location: "Adajan, Surat",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            text: "I was very afraid of dentists, but Dr. Nimisha made the Root Canal treatment completely painless. The clinic is very clean and the staff is supportive. Highly recommended!",
            rating: 5,
            treatment: "Root Canal",
            date: "2024-01-15",
            status: "completed",
            revenue: 8500,
            mediaType: "video",
            mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-having-a-dental-check-up-40697-large.mp4",
            thumbnail: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            id: 2,
            name: "Priya Patel",
            age: 28,
            location: "Vesu, Surat",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            text: "Best dental clinic in Surat for implants. My mother got full mouth implants here and she can eat everything now. Thank you Dent O Care team for the excellent service.",
            rating: 5,
            treatment: "Dental Implants",
            date: "2024-01-18",
            status: "completed",
            revenue: 55000,
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 3,
            name: "Sneha Gupta",
            age: 32,
            location: "Palanpur, Surat",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            text: "Detailed consultation and transparent pricing. No hidden charges. I went for teeth whitening and the results are amazing. My smile has never looked better!",
            rating: 5,
            treatment: "Teeth Whitening",
            date: "2024-01-20",
            status: "completed",
            revenue: 12000,
            mediaType: "video",
            mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-showing-her-new-smile-40696-large.mp4",
            thumbnail: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            id: 4,
            name: "Amit Shah",
            age: 45,
            location: "Rander, Surat",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            text: "Excellent service for my Invisalign treatment. The process was smooth and results are perfect. Highly professional team!",
            rating: 5,
            treatment: "Invisalign",
            date: "2024-01-22",
            status: "in-progress",
            revenue: 95000,
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 5,
            name: "Neha Mehta",
            age: 29,
            location: "Athwa, Surat",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            text: "Got my dental crowns done here. The color matching is perfect and the fit is excellent. Pain-free experience!",
            rating: 5,
            treatment: "Dental Crowns",
            date: "2024-01-25",
            status: "completed",
            revenue: 25000,
            mediaType: "video",
            mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-dentist-showing-teeth-models-to-patient-40695-large.mp4",
            thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            id: 6,
            name: "Rahul Desai",
            age: 40,
            location: "Varachha, Surat",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            text: "Professional wisdom tooth extraction. Minimal discomfort and quick recovery. Excellent post-op care.",
            rating: 5,
            treatment: "Wisdom Tooth Removal",
            date: "2024-01-28",
            status: "completed",
            revenue: 15000,
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 7,
            name: "Kavita Joshi",
            age: 26,
            location: "Katargam, Surat",
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            text: "Perfect smile makeover for my wedding. The team understood exactly what I wanted. Truly magical!",
            rating: 5,
            treatment: "Smile Makeover",
            date: "2024-01-30",
            status: "completed",
            revenue: 75000,
            mediaType: "video",
            mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-smiling-woman-showing-perfect-teeth-40698-large.mp4",
            thumbnail: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            id: 8,
            name: "Sanjay Verma",
            age: 50,
            location: "Udhna, Surat",
            avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            text: "Full mouth rehabilitation done perfectly. Can eat all foods now. Life changing treatment!",
            rating: 5,
            treatment: "Full Mouth Rehabilitation",
            date: "2024-02-01",
            status: "in-progress",
            revenue: 120000,
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1564420228450-d4c18b6d42ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 9,
            name: "Mona Singh",
            age: 33,
            location: "Sarthana, Surat",
            avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            text: "Teeth alignment treatment gave me confidence. Process was comfortable and results are amazing.",
            rating: 5,
            treatment: "Teeth Alignment",
            date: "2024-02-03",
            status: "completed",
            revenue: 45000,
            mediaType: "video",
            mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-patient-smiling-with-new-braces-40699-large.mp4",
            thumbnail: "https://images.unsplash.com/photo-1629909615186-13d5e28c4de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            id: 10,
            name: "Vikram Reddy",
            age: 38,
            location: "Piplod, Surat",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            text: "Laser gum treatment was painless and effective. Bleeding gums completely cured. Highly recommend!",
            rating: 5,
            treatment: "Laser Gum Treatment",
            date: "2024-02-05",
            status: "completed",
            revenue: 18000,
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 11,
            name: "Anita Sharma",
            age: 42,
            location: "Mota Varachha, Surat",
            avatar: "https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            text: "Dentures fitting was perfect. Can speak and eat comfortably. Very satisfied with the results.",
            rating: 5,
            treatment: "Dentures",
            date: "2024-02-07",
            status: "completed",
            revenue: 35000,
            mediaType: "video",
            mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-senior-man-smiling-with-new-dentures-40700-large.mp4",
            thumbnail: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            id: 12,
            name: "Prakash Nair",
            age: 55,
            location: "Althan, Surat",
            avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            text: "Emergency tooth pain treatment was quick and effective. Available 24/7, truly professional.",
            rating: 5,
            treatment: "Emergency Treatment",
            date: "2024-02-09",
            status: "completed",
            revenue: 8000,
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 13,
            name: "Deepa Iyer",
            age: 31,
            location: "Ghod Dod Road, Surat",
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            text: "Kids dentistry expert. My 5-year-old now loves visiting dentist. Painless procedures.",
            rating: 5,
            treatment: "Kids Dentistry",
            date: "2024-02-11",
            status: "completed",
            revenue: 9500,
            mediaType: "video",
            mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-child-at-dentist-clinic-40701-large.mp4",
            thumbnail: "https://images.unsplash.com/photo-1629909615186-13d5e28c4de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            id: 14,
            name: "Manish Thakkar",
            age: 48,
            location: "City Light, Surat",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            text: "Complete oral health checkup and cleaning. Advanced equipment and thorough examination.",
            rating: 5,
            treatment: "Oral Health Checkup",
            date: "2024-02-13",
            status: "completed",
            revenue: 6500,
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 15,
            name: "Sunita Rao",
            age: 37,
            location: "Dumas Road, Surat",
            avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            text: "Cosmetic dentistry transformed my smile. Confidence boosted. Worth every penny!",
            rating: 5,
            treatment: "Cosmetic Dentistry",
            date: "2024-02-15",
            status: "in-progress",
            revenue: 68000,
            mediaType: "video",
            mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-showing-her-dental-treatment-results-40702-large.mp4",
            thumbnail: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        }
    ];

    // Stats calculation
    const stats = {
        totalPatients: testimonials.length,
        totalRevenue: testimonials.reduce((sum, t) => sum + t.revenue, 0),
        avgRating: 5,
        pendingAppointments: testimonials.filter(t => t.status === 'in-progress').length,
        totalVideos: testimonials.filter(t => t.mediaType === 'video').length,
        totalImages: testimonials.filter(t => t.mediaType === 'image').length,
        monthlyRevenue: 450000,
        successRate: 98
    };

    const filteredTestimonials = testimonials.filter(testimonial => {
        const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            testimonial.treatment.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || testimonial.status === statusFilter;
        const matchesMedia = mediaFilter === 'all' || testimonial.mediaType === mediaFilter;
        return matchesSearch && matchesStatus && matchesMedia;
    });

    const handleExport = (format) => {
        alert(`Exporting ${filteredTestimonials.length} records to ${format}...`);
        setShowExportMenu(false);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadForm({ ...uploadForm, file });
        }
    };

    const handleUploadSubmit = (e) => {
        e.preventDefault();
        alert('Media uploaded successfully!');
        setShowUploadModal(false);
        setUploadForm({
            patientName: '',
            treatment: '',
            mediaType: 'image',
            file: null,
            review: '',
            rating: 5,
            location: '',
            date: new Date().toISOString().split('T')[0]
        });
    };

    const statsData = [
        { label: "Total Patients", value: stats.totalPatients, icon: Users, color: "bg-blue-500", trend: "+12%", description: "Active patients" },
        { label: "Total Revenue", value: `₹${stats.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "bg-green-500", trend: "+18%", description: "Lifetime revenue" },
        { label: "Success Rate", value: `${stats.successRate}%`, icon: Award, color: "bg-yellow-500", trend: "98%", description: "Treatment success" },
        { label: "Monthly Revenue", value: `₹${stats.monthlyRevenue.toLocaleString()}`, icon: DollarSign, color: "bg-purple-500", trend: "+15%", description: "Current month" },
        { label: "Video Testimonials", value: stats.totalVideos, icon: Video, color: "bg-red-500", trend: "+8", description: "Video reviews" },
        { label: "Image Testimonials", value: stats.totalImages, icon: Image, color: "bg-indigo-500", trend: "+12", description: "Photo reviews" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-20 transition-colors duration-300">
            {/* Top Header Bar */}
            <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-slate-800 sticky top-20 z-40">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">📊 Admin Dashboard</h1>
                            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <CheckCircle size={14} className="text-green-500" />
                                <span>Last updated: Today, 11:45 AM</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Notification */}
                            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 relative">
                                <Bell size={20} />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {/* Search Bar */}
                            <div className="hidden md:block relative">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search patients, treatments..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-64 text-gray-900 dark:text-white"
                                />
                            </div>

                            {/* Export Button */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowExportMenu(!showExportMenu)}
                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    <Download size={16} />
                                    <span>Export</span>
                                    <ChevronDown size={16} />
                                </button>

                                {showExportMenu && (
                                    <div className="absolute top-full right-0 mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 z-50 min-w-[200px]">
                                        <div className="p-2">
                                            <button
                                                onClick={() => handleExport('csv')}
                                                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded flex items-center gap-2"
                                            >
                                                <FileSpreadsheet size={14} />
                                                Export as CSV
                                            </button>
                                            <button
                                                onClick={() => handleExport('excel')}
                                                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded flex items-center gap-2"
                                            >
                                                <FileSpreadsheet size={14} />
                                                Export as Excel
                                            </button>
                                            <button
                                                onClick={() => handleExport('pdf')}
                                                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded flex items-center gap-2"
                                            >
                                                <FileText size={14} />
                                                Export as PDF
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <button
                                onClick={() => setShowUploadModal(true)}
                                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md"
                            >
                                <Upload size={16} />
                                <span className="hidden sm:inline">Upload</span>
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 mt-4 border-b border-gray-200 dark:border-slate-800">
                        <button
                            onClick={() => setActiveTab('testimonials')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'testimonials' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                        >
                            Testimonials
                        </button>
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'analytics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                        >
                            Analytics
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
                    {statsData.map((stat, index) => (
                        <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-200 dark:border-slate-800 shadow-sm transition-colors">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">{stat.trend}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <stat.icon size={20} className="text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Testimonials Table */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
                    {/* Table Header Area */}
                    <div className="p-4 border-b border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Patient Testimonials</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Entries: {filteredTestimonials.length}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none"
                            >
                                <option value="all">All Status</option>
                                <option value="completed">Completed</option>
                                <option value="in-progress">In Progress</option>
                            </select>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-slate-800/50">
                                <tr>
                                    <th className="text-left p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Patient</th>
                                    <th className="text-left p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Treatment</th>
                                    <th className="text-left p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Revenue</th>
                                    <th className="text-left p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="text-left p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                {filteredTestimonials.map((testimonial) => (
                                    <tr key={testimonial.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img src={testimonial.avatar} className="w-8 h-8 rounded-full border dark:border-slate-700" alt="" />
                                                <div>
                                                    <p className="font-semibold text-sm text-gray-900 dark:text-white">{testimonial.name}</p>
                                                    <p className="text-[10px] text-gray-500 uppercase">{testimonial.location}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700 dark:text-gray-300">
                                            {testimonial.treatment}
                                        </td>
                                        <td className="p-4 text-sm font-bold text-green-600 dark:text-green-400">
                                            ₹{testimonial.revenue.toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${testimonial.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30'}`}>
                                                {testimonial.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <button className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded">
                                                <Eye size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            {/* Modals Container */}
            <div className="z-50">
                {/* Upload Media Modal */}
                {showUploadModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border dark:border-slate-800">
                            <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Upload Media</h3>
                                    <p className="text-xs text-gray-500">Add new patient testimonial</p>
                                </div>
                                <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>
                            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Patient Name</label>
                                            <input type="text" required value={uploadForm.patientName} onChange={(e) => setUploadForm({ ...uploadForm, patientName: e.target.value })} className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border dark:border-slate-700 rounded-xl text-sm dark:text-white" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Treatment</label>
                                            <input type="text" required value={uploadForm.treatment} onChange={(e) => setUploadForm({ ...uploadForm, treatment: e.target.value })} className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border dark:border-slate-700 rounded-xl text-sm dark:text-white" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Review</label>
                                        <textarea value={uploadForm.review} onChange={(e) => setUploadForm({ ...uploadForm, review: e.target.value })} className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border dark:border-slate-700 rounded-xl text-sm dark:text-white" rows="3"></textarea>
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">Confirm Upload</button>
                                    <button type="button" onClick={() => setShowUploadModal(false)} className="flex-1 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 py-3 rounded-xl font-bold">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Patient Detail Modal */}
                {selectedPatient && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden border dark:border-slate-800 animate-in fade-in zoom-in duration-300">
                            <div className="relative h-32 bg-gradient-to-r from-blue-600 to-indigo-600 font-sans">
                                <button onClick={() => setSelectedPatient(null)} className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-md">
                                    <X size={20} />
                                </button>
                                <div className="absolute -bottom-12 left-8 border-4 border-white dark:border-slate-900 rounded-3xl overflow-hidden bg-white">
                                    <img src={selectedPatient.avatar} className="w-24 h-24 object-cover" alt="" />
                                </div>
                            </div>
                            <div className="px-8 pt-16 pb-8">
                                <h3 className="text-2xl font-bold dark:text-white">{selectedPatient.name}</h3>
                                <p className="text-gray-500 mb-6 font-medium">{selectedPatient.location} • {selectedPatient.treatment}</p>
                                <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border dark:border-slate-700 mb-6">
                                    <p className="text-sm italic dark:text-gray-300 text-gray-600 leading-relaxed">"{selectedPatient.text}"</p>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-xl text-blue-600 dark:text-blue-400">
                                            <TrendingUp size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400">Treatment Cost</p>
                                            <p className="text-lg font-bold dark:text-blue-400 text-gray-900">₹{selectedPatient.revenue.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[...Array(selectedPatient.rating)].map((_, i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;