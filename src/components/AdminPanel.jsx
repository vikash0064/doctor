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
            setUploadForm({...uploadForm, file});
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
        <div className="min-h-screen bg-gray-50">
            {/* Top Header Bar */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h1 className="text-xl font-bold text-gray-900">📊 Admin Dashboard</h1>
                            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircle size={14} className="text-green-500" />
                                <span>Last updated: Today, 11:45 AM</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            {/* Notification */}
                            <button className="p-2 text-gray-600 hover:text-blue-600 relative">
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
                                    className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-64"
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
                                    <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-50 min-w-[200px]">
                                        <div className="p-2">
                                            <button
                                                onClick={() => handleExport('csv')}
                                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2"
                                            >
                                                <FileSpreadsheet size={14} />
                                                Export as CSV
                                            </button>
                                            <button
                                                onClick={() => handleExport('excel')}
                                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2"
                                            >
                                                <FileSpreadsheet size={14} />
                                                Export as Excel
                                            </button>
                                            <button
                                                onClick={() => handleExport('pdf')}
                                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2"
                                            >
                                                <FileText size={14} />
                                                Export as PDF
                                            </button>
                                            <div className="h-px bg-gray-200 my-1"></div>
                                            <button
                                                onClick={() => window.open('https://docs.google.com/spreadsheets', '_blank')}
                                                className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded flex items-center gap-2"
                                            >
                                                <ArrowUpRight size={14} />
                                                Open Google Sheet
                                            </button>
                                            <button
                                                onClick={() => handleExport('backup')}
                                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2"
                                            >
                                                <DownloadCloud size={14} />
                                                Backup All Data
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Upload Media Button */}
                            <button
                                onClick={() => setShowUploadModal(true)}
                                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg"
                            >
                                <Upload size={16} />
                                <span className="hidden sm:inline">Upload Media</span>
                            </button>

                            {/* Appointment Button */}
                            <button
                                onClick={() => setShowAppointmentForm(true)}
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg"
                            >
                                <Calendar size={16} />
                                <span className="hidden sm:inline">Book Appointment</span>
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 mt-4 border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('testimonials')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'testimonials' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Testimonials ({testimonials.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('media')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'media' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Media Library
                        </button>
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'analytics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
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
                        <div key={index} className="stat-card bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                                    <p className="text-xs text-green-600 mt-1">{stat.trend}</p>
                                    <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <stat.icon size={20} className="text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Testimonials Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    {/* Table Header */}
                    <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Patient Testimonials</h2>
                            <p className="text-sm text-gray-500">Showing {filteredTestimonials.length} of {testimonials.length} entries</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            {/* Mobile Search */}
                            <div className="md:hidden relative flex-1">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                            </div>

                            {/* Filters */}
                            <div className="flex items-center gap-2">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="bg-gray-100 border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="all">All Status</option>
                                    <option value="completed">Completed</option>
                                    <option value="in-progress">In Progress</option>
                                </select>
                                
                                <select
                                    value={mediaFilter}
                                    onChange={(e) => setMediaFilter(e.target.value)}
                                    className="bg-gray-100 border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="all">All Media</option>
                                    <option value="video">Video Only</option>
                                    <option value="image">Image Only</option>
                                </select>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => window.print()}
                                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Print"
                                >
                                    <Printer size={18} />
                                </button>
                                <button
                                    onClick={() => setShowUploadModal(true)}
                                    className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                                    title="Upload Media"
                                >
                                    <Upload size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Table Container */}
                    <div className="overflow-x-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <table className="w-full">
                            <thead className="sticky top-0 bg-gray-50 z-10">
                                <tr>
                                    <th className="text-left p-4 text-sm font-medium text-gray-500">Patient</th>
                                    <th className="text-left p-4 text-sm font-medium text-gray-500">Treatment</th>
                                    <th className="text-left p-4 text-sm font-medium text-gray-500">Media</th>
                                    <th className="text-left p-4 text-sm font-medium text-gray-500">Rating</th>
                                    <th className="text-left p-4 text-sm font-medium text-gray-500">Date</th>
                                    <th className="text-left p-4 text-sm font-medium text-gray-500">Revenue</th>
                                    <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                                    <th className="text-left p-4 text-sm font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTestimonials.map((testimonial) => (
                                    <tr key={testimonial.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img 
                                                    src={testimonial.avatar} 
                                                    alt={testimonial.name}
                                                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-900 text-sm">{testimonial.name}</p>
                                                    <p className="text-xs text-gray-500">{testimonial.age} yrs • {testimonial.location}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm font-medium text-gray-700">{testimonial.treatment}</span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                {testimonial.mediaType === 'video' ? (
                                                    <Video size={16} className="text-red-500" />
                                                ) : (
                                                    <Image size={16} className="text-blue-500" />
                                                )}
                                                <span className="text-xs text-gray-600 capitalize">{testimonial.mediaType}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <span key={i} className="text-yellow-400">★</span>
                                                ))}
                                                <span className="text-sm text-gray-600 ml-1">{testimonial.rating}.0</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm text-gray-600">{testimonial.date}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className="font-medium text-green-600">₹{testimonial.revenue.toLocaleString()}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                testimonial.status === 'completed' 
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {testimonial.status === 'completed' ? 'Completed' : 'In Progress'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => setSelectedPatient(testimonial)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => {/* Edit */}}
                                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => {/* Preview media */}}
                                                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                    title="Preview Media"
                                                >
                                                    {testimonial.mediaType === 'video' ? <Play size={16} /> : <Eye size={16} />}
                                                </button>
                                                <button
                                                    onClick={() => {/* Delete */}}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => window.open('https://docs.google.com/spreadsheets', '_blank')}
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                                <FileSpreadsheet size={16} />
                                Open Google Sheet
                            </button>
                            <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                                <DownloadCloud size={14} />
                                Download All
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">
                                Page 1 of 3 • 15 entries per page
                            </span>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
                                    ← Previous
                                </button>
                                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
                                    Next →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Upload Media Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Upload Patient Media</h3>
                                    <p className="text-sm text-gray-500">Add video or photo testimonials</p>
                                </div>
                                <button
                                    onClick={() => setShowUploadModal(false)}
                                    className="p-1 text-gray-400 hover:text-gray-600"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleUploadSubmit} className="p-6">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={uploadForm.patientName}
                                            onChange={(e) => setUploadForm({...uploadForm, patientName: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            placeholder="Patient name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Treatment</label>
                                        <input
                                            type="text"
                                            required
                                            value={uploadForm.treatment}
                                            onChange={(e) => setUploadForm({...uploadForm, treatment: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            placeholder="Treatment type"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Media Type</label>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setUploadForm({...uploadForm, mediaType: 'image'})}
                                            className={`flex-1 py-3 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 ${
                                                uploadForm.mediaType === 'image' 
                                                    ? 'border-blue-500 bg-blue-50 text-blue-600' 
                                                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            <Image size={16} />
                                            Image
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setUploadForm({...uploadForm, mediaType: 'video'})}
                                            className={`flex-1 py-3 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 ${
                                                uploadForm.mediaType === 'video' 
                                                    ? 'border-blue-500 bg-blue-50 text-blue-600' 
                                                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            <Video size={16} />
                                            Video
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Upload {uploadForm.mediaType === 'image' ? 'Image' : 'Video'}
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                                        <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-600 mb-2">
                                            Drag & drop or <span className="text-blue-600 cursor-pointer">browse</span>
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {uploadForm.mediaType === 'image' 
                                                ? 'Supports JPG, PNG up to 5MB' 
                                                : 'Supports MP4, MOV up to 100MB'}
                                        </p>
                                        <input
                                            type="file"
                                            accept={uploadForm.mediaType === 'image' ? 'image/*' : 'video/*'}
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label htmlFor="file-upload" className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 cursor-pointer">
                                            Choose File
                                        </label>
                                        {uploadForm.file && (
                                            <p className="mt-2 text-sm text-green-600">
                                                Selected: {uploadForm.file.name}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient Review</label>
                                    <textarea
                                        value={uploadForm.review}
                                        onChange={(e) => setUploadForm({...uploadForm, review: e.target.value})}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="What did the patient say?"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                        <select
                                            value={uploadForm.rating}
                                            onChange={(e) => setUploadForm({...uploadForm, rating: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        >
                                            <option value="5">★★★★★ (5)</option>
                                            <option value="4">★★★★☆ (4)</option>
                                            <option value="3">★★★☆☆ (3)</option>
                                            <option value="2">★★☆☆☆ (2)</option>
                                            <option value="1">★☆☆☆☆ (1)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <input
                                            type="text"
                                            value={uploadForm.location}
                                            onChange={(e) => setUploadForm({...uploadForm, location: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            placeholder="City, Area"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-medium transition-colors"
                                >
                                    <Upload size={16} className="inline mr-2" />
                                    Upload Media
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowUploadModal(false)}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Patient Detail Modal */}
            {selectedPatient && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Patient Details</h3>
                                    <p className="text-sm text-gray-500">Complete information and media</p>
                                </div>
                                <button
                                    onClick={() => setSelectedPatient(null)}
                                    className="p-1 text-gray-400 hover:text-gray-600"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Left Column - Patient Info */}
                                <div className="lg:col-span-2">
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <div className="flex items-center gap-4 mb-6">
                                            <img 
                                                src={selectedPatient.avatar} 
                                                alt={selectedPatient.name}
                                                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
                                            />
                                            <div>
                                                <h4 className="text-xl font-bold text-gray-900">{selectedPatient.name}</h4>
                                                <p className="text-gray-600">{selectedPatient.age} years • {selectedPatient.location}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <div className="flex">
                                                        {[...Array(selectedPatient.rating)].map((_, i) => (
                                                            <span key={i} className="text-yellow-400">★</span>
                                                        ))}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700">{selectedPatient.rating}.0</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="bg-white p-4 rounded-lg border">
                                                <p className="text-sm text-gray-500">Treatment</p>
                                                <p className="font-medium text-gray-900">{selectedPatient.treatment}</p>
                                            </div>
                                            <div className="bg-white p-4 rounded-lg border">
                                                <p className="text-sm text-gray-500">Date</p>
                                                <p className="font-medium text-gray-900">{selectedPatient.date}</p>
                                            </div>
                                            <div className="bg-white p-4 rounded-lg border">
                                                <p className="text-sm text-gray-500">Status</p>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                    selectedPatient.status === 'completed' 
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {selectedPatient.status === 'completed' ? 'Completed' : 'In Progress'}
                                                </span>
                                            </div>
                                            <div className="bg-white p-4 rounded-lg border">
                                                <p className="text-sm text-gray-500">Revenue</p>
                                                <p className="font-medium text-green-600">₹{selectedPatient.revenue.toLocaleString()}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-2">Patient Review</p>
                                            <blockquote className="text-gray-700 italic border-l-4 border-blue-500 pl-4 py-2 bg-blue-50/50 rounded-r-lg">
                                                "{selectedPatient.text}"
                                            </blockquote>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Media Preview */}
                                <div>
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h4 className="font-bold text-gray-900 mb-4">Media Preview</h4>
                                        
                                        <div className="rounded-lg overflow-hidden border border-gray-200 mb-4">
                                            {selectedPatient.mediaType === 'video' ? (
                                                <div className="relative">
                                                    <video
                                                        className="w-full h-48 object-cover"
                                                        src={selectedPatient.mediaUrl}
                                                        poster={selectedPatient.thumbnail}
                                                        controls
                                                    />
                                                    <div className="absolute top-2 right-2">
                                                        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                                                            VIDEO
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="relative">
                                                    <img
                                                        src={selectedPatient.mediaUrl}
                                                        alt={selectedPatient.name}
                                                        className="w-full h-48 object-cover"
                                                    />
                                                    <div className="absolute top-2 right-2">
                                                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                                                            PHOTO
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
                                                <Download size={16} />
                                                Download Media
                                            </button>
                                            <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                                                <Edit size={16} />
                                                Edit Details
                                            </button>
                                            <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                                                <Share2 size={16} />
                                                Share on Social
                                            </button>
                                            <button className="w-full py-3 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 flex items-center justify-center gap-2">
                                                <Trash2 size={16} />
                                                Delete Entry
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
                .scrollbar-thin::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 3px;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 3px;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                    background: #a1a1a1;
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;