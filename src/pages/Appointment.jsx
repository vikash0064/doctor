import React, { useState, useEffect } from 'react';
import { Calendar, User, Phone, FileText, CheckCircle, Clock, MapPin, Shield, Star, ChevronRight, Award, MessageCircle, Sparkles } from 'lucide-react';
import { API_ENDPOINTS } from '../config';

const Appointment = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        treatment: 'General Consultation',
        date: '',
        time: '10:00 AM',
        message: '',
        urgency: 'normal'
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);

    const treatments = [
        { value: "General Consultation", duration: "30 mins", price: "₹500", icon: "👨‍⚕️" },
        { value: "Dental Implants", duration: "2-3 hours", price: "From ₹25,000", icon: "🦷" },
        { value: "Root Canal Treatment", duration: "1-2 hours", price: "From ₹8,500", icon: "🔬" },
        { value: "Teeth Whitening", duration: "1 hour", price: "From ₹12,000", icon: "✨" },
        { value: "Braces / Invisalign", duration: "1 hour", price: "From ₹45,000", icon: "😁" },
        { value: "Kids Dentistry", duration: "45 mins", price: "From ₹1,500", icon: "👶" },
        { value: "Dental Crowns", duration: "1 hour", price: "From ₹15,000", icon: "👑" },
        { value: "Wisdom Tooth Removal", duration: "45 mins", price: "From ₹8,000", icon: "⚡" },
        { value: "Emergency Care", duration: "30 mins", price: "₹1,000", icon: "🚨" }
    ];

    const doctors = [
        { id: 1, name: "Dr. Nimisha Patel", specialization: "Orthodontist", experience: "15 years", rating: 4.9, available: true, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
        { id: 2, name: "Dr. Rajesh Modi", specialization: "Implantologist", experience: "20 years", rating: 4.8, available: true, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
    ];

    const timeSlots = [
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"
    ];

    const urgencyLevels = [
        { value: "emergency", label: "Emergency", color: "bg-red-100 text-red-800 border-red-300", icon: "🚨", desc: "Immediate attention" },
        { value: "urgent", label: "Urgent", color: "bg-orange-100 text-orange-800 border-orange-300", icon: "⚠️", desc: "Within 24 hours" },
        { value: "normal", label: "Normal", color: "bg-blue-100 text-blue-800 border-blue-300", icon: "📅", desc: "Routine checkup" }
    ];

    useEffect(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formattedDate = tomorrow.toISOString().split('T')[0];
        setFormData(prev => ({ ...prev, date: formattedDate }));
        generateAvailableSlots();
    }, []);

    const generateAvailableSlots = () => {
        const slots = timeSlots.filter((_, index) => index % 2 === 0); // Get every other slot
        setAvailableSlots(slots);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            console.log('Attempting to book at:', API_ENDPOINTS.appointments);
            const res = await fetch(API_ENDPOINTS.appointments, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setTimeout(() => {
                    setIsLoading(false);
                    setIsSubmitted(true);
                }, 1500);
            } else {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || errorData.details || 'Booking failed');
            }
        } catch (err) {
            console.error('Booking error:', err);
            alert(`Failed to book: ${err.message}. Ensure your MONGO_URI is set in the Render Dashboard.`);
            setIsLoading(false);
        }
    };

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            phone: '',
            email: '',
            treatment: 'General Consultation',
            date: '',
            time: '10:00 AM',
            message: '',
            urgency: 'normal'
        });
        setSelectedDoctor(null);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4 py-20 transition-colors duration-300">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 text-center max-w-sm w-full animate-fadeIn border border-gray-100 dark:border-slate-700">
                    <div className="relative">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                            <CheckCircle size={40} className="text-green-600 dark:text-green-400" />
                        </div>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">Booking Confirmed!</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">We've sent the details to your email.</p>

                    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4 mb-6 text-left border border-gray-100 dark:border-slate-600">
                        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                            <div className="flex items-center gap-3">
                                <User size={14} className="text-blue-500" />
                                <span className="font-semibold">{formData.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar size={14} className="text-blue-500" />
                                <span>{formData.date} at {formData.time}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Award size={14} className="text-blue-500" />
                                <span>{formData.treatment}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setIsSubmitted(false);
                            resetForm();
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                        Book Another
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20 pb-12 px-4 transition-colors duration-300">
            <div className="container mx-auto max-w-5xl">
                {/* Compact Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Book Your Appointment
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Quick, easy, and secure booking.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-6 items-start">

                    {/* Booking Form (Order 1 on mobile, Col-span-8 on Desktop) */}
                    <div className="lg:col-span-8 order-1 lg:order-1">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
                            {/* Form Header */}
                            <div className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
                                <span className="font-semibold text-lg">Patient Details</span>
                                <span className="text-xs bg-white/20 px-2 py-1 rounded text-blue-50">2 min process</span>
                            </div>

                            <form onSubmit={handleSubmit} className="p-5 md:p-6">
                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm dark:text-white transition-all outline-none"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm dark:text-white transition-all outline-none"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                                            Email (Optional)
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm dark:text-white transition-all outline-none"
                                            placeholder="email@example.com"
                                        />
                                    </div>

                                    {/* Date */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                                            Date
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input
                                                type="date"
                                                name="date"
                                                required
                                                value={formData.date}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm dark:text-white transition-all outline-none"
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Compact Treatment Selection */}
                                <div className="mb-6">
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-3 uppercase tracking-wide">
                                        Select Treatment
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {treatments.map((tr, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, treatment: tr.value })}
                                                className={`p-2.5 rounded-lg border text-left transition-all ${formData.treatment === tr.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
                                            >
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-lg">{tr.icon}</span>
                                                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-1.5 py-0.5 rounded">
                                                        {tr.price}
                                                    </span>
                                                </div>
                                                <div className="text-xs font-medium text-gray-900 dark:text-gray-200 truncate">{tr.value}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Time Selection */}
                                <div className="mb-6">
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-3 uppercase tracking-wide">
                                        Select Time
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {timeSlots.map((time, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, time })}
                                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all border ${formData.time === time ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-gray-300'}`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Urgency (Compact) */}
                                <div className="mb-6">
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        Urgency
                                    </label>
                                    <div className="flex gap-3">
                                        {urgencyLevels.map((level) => (
                                            <button
                                                key={level.value}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, urgency: level.value })}
                                                className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all flex items-center justify-center gap-1.5 ${formData.urgency === level.value ? level.color + ' border-current ring-1 ring-current' : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400'}`}
                                            >
                                                <span>{level.icon}</span>
                                                {level.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="mb-6">
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                                        Note (Optional)
                                    </label>
                                    <textarea
                                        name="message"
                                        rows="2"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm dark:text-white transition-all resize-none outline-none"
                                        placeholder="Any specific dental issue..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full py-3.5 text-sm md:text-base font-bold text-white rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/20'}`}
                                >
                                    {isLoading ? 'Processing...' : 'Confirm Appointment'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Left Info Panel (Order 2 on mobile - Below form, Col-span-4 on Desktop) */}
                    <div className="lg:col-span-4 order-2 lg:order-2 space-y-4">
                        {/* Compact Location Card */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-slate-700">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <MapPin size={18} className="text-blue-500" />
                                Our Location
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">123 Dental Street, Surat</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">Mon-Sat: 9AM - 9PM</p>

                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                                <a href="tel:+918401783154" className="flex items-center justify-between text-sm group">
                                    <span className="text-gray-600 dark:text-gray-400">Emergency 24/7</span>
                                    <span className="font-bold text-blue-600 group-hover:underline">+91 84017 83154</span>
                                </a>
                            </div>
                        </div>

                        {/* Stats - Horizontal Strip on Mobile */}
                        <div className="bg-blue-50 dark:bg-slate-800/50 rounded-xl p-4 border border-blue-100 dark:border-slate-700">
                            <div className="flex justify-between items-center text-center">
                                <div>
                                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">4.9★</div>
                                    <div className="text-[10px] text-gray-500 uppercase font-semibold">Rating</div>
                                </div>
                                <div className="w-px h-8 bg-blue-200 dark:bg-slate-600"></div>
                                <div>
                                    <div className="text-lg font-bold text-green-600 dark:text-green-400">98%</div>
                                    <div className="text-[10px] text-gray-500 uppercase font-semibold">Success</div>
                                </div>
                                <div className="w-px h-8 bg-blue-200 dark:bg-slate-600"></div>
                                <div>
                                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">30K+</div>
                                    <div className="text-[10px] text-gray-500 uppercase font-semibold">Smiles</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointment;