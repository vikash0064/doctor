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

    const [treatmentOptions] = useState([
        "General Consultation",
        "Dental Implants",
        "Root Canal Treatment",
        "Teeth Whitening",
        "Braces / Invisalign",
        "Kids Dentistry",
        "Dental Crowns",
        "Wisdom Tooth Removal",
        "Emergency Care"
    ]);

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
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                        <CheckCircle size={40} className="text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">Booking Confirmed!</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">We've sent the details to your email.</p>
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
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-12 px-4 transition-colors duration-300 flex items-center justify-center">
            <div className="w-full max-w-lg">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Book Appointment
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Quick, easy, and secure.
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
                    <div className="bg-blue-600 dark:bg-blue-700 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white">
                            <Clock size={18} />
                            <span className="font-medium text-sm">Takes only 2 minutes</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                        {/* Name & Phone Group */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm dark:text-white outline-none"
                                        placeholder="Your Name"
                                    />
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm dark:text-white outline-none"
                                        placeholder="Your Number"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Email (Optional)</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm dark:text-white outline-none"
                                placeholder="email@example.com"
                            />
                        </div>

                        {/* Treatment Dropdown (Replaces Grid) */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Treatment</label>
                            <div className="relative">
                                <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <select
                                    name="treatment"
                                    value={formData.treatment}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm dark:text-white outline-none appearance-none"
                                >
                                    {treatmentOptions.map((opt, i) => (
                                        <option key={i} value={opt}>{opt}</option>
                                    ))}
                                </select>
                                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90" size={16} />
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    required
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm dark:text-white outline-none"
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Time</label>
                                <div className="relative">
                                    <select
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm dark:text-white outline-none appearance-none"
                                    >
                                        {timeSlots.map((time, index) => (
                                            <option key={index} value={time}>{time}</option>
                                        ))}
                                    </select>
                                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90" size={16} />
                                </div>
                            </div>
                        </div>

                        {/* Urgency */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Urgency</label>
                            <div className="flex gap-2">
                                {urgencyLevels.map((level) => (
                                    <button
                                        key={level.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, urgency: level.value })}
                                        className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all flex justify-center items-center gap-1 ${formData.urgency === level.value ? level.color + ' border-current' : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400'}`}
                                    >
                                        {level.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Note (Optional)</label>
                            <textarea
                                name="message"
                                rows="2"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm dark:text-white outline-none resize-none"
                                placeholder="Any specific dental issue..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 text-base font-bold text-white rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${isLoading ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/30'}`}
                        >
                            {isLoading ? 'Processing...' : 'Confirm Appointment'}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Need help?</p>
                    <a href="tel:+918401783154" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full text-sm">
                        <Phone size={16} />
                        +91 84017 83154
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Appointment;