import React, { useState, useEffect } from 'react';
import { Calendar, User, Phone, FileText, CheckCircle, Clock, MapPin, Shield, Star, ChevronRight, Award, MessageCircle, Sparkles } from 'lucide-react';

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
                throw new Error('Booking failed');
            }
        } catch (err) {
            console.error(err);
            alert("Failed to book. Ensure backend is running.");
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
            <div className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-blue-50 to-emerald-50 px-4 py-12">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center max-w-md w-full animate-fadeIn">
                    <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                            <CheckCircle size={48} className="text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 animate-ping">
                            <Sparkles size={24} className="text-yellow-400" />
                        </div>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Appointment Booked! 🎉</h2>

                    <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-6 mb-8">
                        <p className="text-lg font-semibold text-gray-800 mb-2">
                            {formData.name}
                        </p>
                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex items-center justify-center gap-2">
                                <Phone size={16} />
                                <span className="font-medium">{formData.phone}</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Calendar size={16} />
                                <span>{formData.date} at {formData.time}</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Award size={16} />
                                <span>{formData.treatment}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        <p className="text-gray-600">
                            Our team will contact you within <strong>30 minutes</strong> to confirm your appointment.
                        </p>

                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg text-left">
                            <p className="text-sm font-medium text-gray-800 flex items-center gap-2 mb-2">
                                <Clock size={16} />
                                <span>What's next:</span>
                            </p>
                            <ul className="text-xs text-gray-600 space-y-1 pl-6 list-disc">
                                <li>Confirmation call within 30 minutes</li>
                                <li>SMS reminder 24 hours before</li>
                                <li>Digital health form via WhatsApp</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => {
                                setIsSubmitted(false);
                                resetForm();
                            }}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                            <Calendar size={18} />
                            Book Another
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                        >
                            <FileText size={18} />
                            Print
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-8 md:py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-bold mb-4">
                        <Sparkles size={16} />
                        Book Your Smile Transformation
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Schedule Your <span className="text-blue-600">Appointment</span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Secure your spot with expert dental care. Easy booking, flexible timing.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Info Panel */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Trust Badges */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Shield size={22} className="text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Safe & Secure</h3>
                                    <p className="text-sm text-gray-600">JCI Accredited Clinic</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Success Rate</span>
                                    <span className="font-bold text-green-600">98%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Patient Satisfaction</span>
                                    <span className="font-bold text-blue-600">4.9/5</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Same Day Slots</span>
                                    <span className="font-bold text-purple-600">Available</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Contact */}
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
                            <h3 className="font-bold text-lg mb-6">Need Help?</h3>
                            <div className="space-y-4">
                                <a href="tel:+918401783154" className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <Phone size={22} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">+91 84017 83154</p>
                                        <p className="text-sm text-blue-100">24/7 Emergency</p>
                                    </div>
                                </a>
                                <a href="https://wa.me/918401783154" className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <MessageCircle size={22} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">WhatsApp</p>
                                        <p className="text-sm text-blue-100">Instant Chat</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Location Info */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <MapPin size={22} className="text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Our Location</h3>
                                    <p className="text-sm text-gray-600">Easy to reach</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p>📍 123 Dental Street</p>
                                <p>🏙️ Surat, Gujarat</p>
                                <p>📅 Mon-Sat: 9AM-9PM</p>
                                <p>☀️ Sun: 10AM-4PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                            {/* Form Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 md:p-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold">Book Appointment</h2>
                                        <p className="text-blue-100 mt-2">Fill your details below</p>
                                    </div>
                                    <div className="hidden md:flex items-center gap-3">
                                        <Clock size={22} />
                                        <div>
                                            <p className="text-sm font-medium">Quick Process</p>
                                            <p className="text-xs text-blue-200">2 minutes max</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Content */}
                            <form onSubmit={handleSubmit} className="p-6 md:p-8">
                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <User size={16} />
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <Phone size={16} />
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            placeholder="email@example.com"
                                        />
                                    </div>

                                    {/* Date */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <Calendar size={16} />
                                            Preferred Date *
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            required
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700"
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                </div>

                                {/* Treatment Selection */}
                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-gray-700 mb-4">
                                        Select Treatment *
                                    </label>
                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                        {treatments.map((treatment, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, treatment: treatment.value })}
                                                className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${formData.treatment === treatment.value ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'}`}
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <span className="text-2xl">{treatment.icon}</span>
                                                    <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                                        {treatment.price}
                                                    </span>
                                                </div>
                                                <p className="font-medium text-gray-900 text-sm">{treatment.value}</p>
                                                <p className="text-xs text-gray-500 mt-1">{treatment.duration}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Time & Urgency */}
                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    {/* Time Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Preferred Time *
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="time"
                                                value={formData.time}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                                            >
                                                {timeSlots.map((time, index) => (
                                                    <option key={index} value={time}>{time}</option>
                                                ))}
                                            </select>
                                            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90" size={18} />
                                        </div>
                                    </div>

                                    {/* Urgency Level */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Urgency Level
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {urgencyLevels.map((level) => (
                                                <button
                                                    key={level.value}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, urgency: level.value })}
                                                    className={`py-3 rounded-xl border-2 text-sm font-medium transition-all flex flex-col items-center ${formData.urgency === level.value ? level.color + ' border-current' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                                                >
                                                    <span className="text-xl mb-1">{level.icon}</span>
                                                    <span>{level.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Message */}
                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <FileText size={16} />
                                        Additional Message (Optional)
                                    </label>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                                        placeholder="Describe your concern or special requirements..."
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full py-4 text-lg font-bold text-white rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-xl hover:from-blue-700 hover:to-cyan-700'}`}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Processing Your Request...
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-3">
                                            <Calendar size={20} />
                                            Confirm Appointment
                                            <ChevronRight size={18} />
                                        </div>
                                    )}
                                </button>

                                {/* Terms */}
                                <p className="text-xs text-gray-500 text-center mt-6">
                                    By booking, you agree to our Terms of Service and Privacy Policy.
                                    <span className="block text-green-600 font-medium mt-1">No advance payment required.</span>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Stats Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { value: "98%", label: "Success Rate", icon: Star, color: "text-blue-600" },
                            { value: "24/7", label: "Emergency Care", icon: Clock, color: "text-emerald-600" },
                            { value: "30K+", label: "Happy Patients", icon: Award, color: "text-purple-600" },
                            { value: "4.9★", label: "Google Rating", icon: Star, color: "text-amber-600" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className={`text-3xl font-bold ${stat.color} flex items-center justify-center gap-2 mb-2`}>
                                    <stat.icon size={24} />
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointment;