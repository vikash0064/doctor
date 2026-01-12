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
import { API_ENDPOINTS } from '../config';

const AdminDashboard = () => {
    // States
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [mediaFilter, setMediaFilter] = useState('all');
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [showAppointmentForm, setShowAppointmentForm] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [activeTab, setActiveTab] = useState('appointments');
    const [fetchError, setFetchError] = useState(null);

    const [appointments, setAppointments] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const fetchData = async () => {
        try {
            const [apptsRes, testRes] = await Promise.all([
                fetch(API_ENDPOINTS.appointments),
                fetch(API_ENDPOINTS.testimonials)
            ]);
            const apptsData = await apptsRes.json();
            const testData = await testRes.json();

            // Sort appointments by date (newest first) but handle potential strings safely
            const sortedAppts = Array.isArray(apptsData)
                ? apptsData.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
                : [];

            setAppointments(sortedAppts);
            setTestimonials(Array.isArray(testData) ? testData : []);

            if (!Array.isArray(apptsData) || !Array.isArray(testData)) {
                setFetchError('Invalid data format received from server');
            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
            setFetchError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Poll every 30 seconds to keep dashboard fresh
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    // Stats calculation based on live data
    const stats = {
        totalPatients: testimonials.length,
        totalRevenue: testimonials.reduce((sum, t) => sum + (t.revenue || 0), 0),
        avgRating: 5,
        pendingAppointments: appointments.length,
        totalVideos: testimonials.filter(t => t.mediaType === 'video').length,
        totalImages: testimonials.filter(t => t.mediaType === 'image').length,
        monthlyRevenue: 450000,
        successRate: 98
    };

    const filteredTestimonials = testimonials.filter(testimonial => {
        const patientName = testimonial.patientName || testimonial.name || '';
        const treatment = testimonial.treatment || '';
        const matchesSearch = patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            treatment.toLowerCase().includes(searchTerm.toLowerCase());
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

    const handleUploadSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('patientName', uploadForm.patientName);
            formData.append('location', uploadForm.location);
            formData.append('treatment', uploadForm.treatment);
            formData.append('reviewText', uploadForm.review);
            formData.append('media', uploadForm.file);
            formData.append('rating', uploadForm.rating);

            const res = await fetch(API_ENDPOINTS.testimonials, {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
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
                // Re-fetch testimonials
                const testRes = await fetch(API_ENDPOINTS.testimonials);
                const testData = await testRes.json();
                setTestimonials(testData);
            } else {
                throw new Error('Upload failed');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to upload media. Ensure backend is running.');
        }
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
                            onClick={() => setActiveTab('appointments')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'appointments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                        >
                            Appointments
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
                {fetchError && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-xl mb-6 flex flex-col gap-2">
                        <div className="font-bold flex items-center gap-2">
                            <X size={18} />
                            Connection Error
                        </div>
                        <p className="text-sm">Failed to connect to backend: {fetchError}</p>
                        <p className="text-xs">Ensure your Render backend is running and CORS is enabled.</p>
                    </div>
                )}

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

                {/* Content based on Active Tab */}
                {activeTab === 'testimonials' && (
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
                                        <tr key={testimonial._id || testimonial.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={testimonial.avatar || `https://ui-avatars.com/api/?name=${testimonial.patientName || testimonial.name}`} className="w-8 h-8 rounded-full border dark:border-slate-700" alt="" />
                                                    <div>
                                                        <p className="font-semibold text-sm text-gray-900 dark:text-white">{testimonial.patientName || testimonial.name}</p>
                                                        <p className="text-[10px] text-gray-500 uppercase">{testimonial.location}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-700 dark:text-gray-300">
                                                {testimonial.treatment}
                                            </td>
                                            <td className="p-4 text-sm font-bold text-green-600 dark:text-green-400">
                                                ₹{(testimonial.revenue || 0).toLocaleString()}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${testimonial.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30'}`}>
                                                    {testimonial.status || 'new'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <button onClick={() => setSelectedPatient(testimonial)} className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded">
                                                    <Eye size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'appointments' && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
                        <div className="p-4 border-b border-gray-200 dark:border-slate-800">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Appointments</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Bookings: {appointments.length}</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-slate-800/50">
                                    <tr>
                                        <th className="text-left p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Patient</th>
                                        <th className="text-left p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                                        <th className="text-left p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Treatment</th>
                                        <th className="text-left p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                        <th className="text-left p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Message</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                    {appointments.length > 0 ? (
                                        appointments.map((appt) => (
                                            <tr key={appt._id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                                <td className="p-4 text-sm font-semibold text-gray-900 dark:text-white">{appt.name}</td>
                                                <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{appt.phone}</td>
                                                <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{appt.treatment}</td>
                                                <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{appt.date}</td>
                                                <td className="p-4 text-xs text-gray-500 truncate max-w-[200px]">{appt.message}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="p-8 text-center text-gray-500 dark:text-gray-400">
                                                No appointments found. Try booking one!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
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
                                <h3 className="text-2xl font-bold dark:text-white">{selectedPatient.patientName || selectedPatient.name}</h3>
                                <p className="text-gray-500 mb-6 font-medium">{selectedPatient.location} • {selectedPatient.treatment}</p>
                                <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border dark:border-slate-700 mb-6">
                                    <p className="text-sm italic dark:text-gray-300 text-gray-600 leading-relaxed">"{selectedPatient.reviewText || selectedPatient.text}"</p>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-xl text-blue-600 dark:text-blue-400">
                                            <TrendingUp size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400">Treatment Cost</p>
                                            <p className="text-lg font-bold dark:text-blue-400 text-gray-900">₹{(selectedPatient.revenue || 0).toLocaleString()}</p>
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