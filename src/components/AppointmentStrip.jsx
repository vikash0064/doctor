import React, { useState, useEffect } from 'react';
import { Calendar, User, Phone, FileText, CheckCircle, Clock, MapPin, Shield, Star, ChevronRight, Award, Heart, MessageCircle, X, Sparkles } from 'lucide-react';

const Appointment = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        treatment: 'General Consultation',
        date: '',
        time: '10:00',
        message: '',
        urgency: 'normal'
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showTimeSlots, setShowTimeSlots] = useState(false);

    const treatments = [
        { value: "General Consultation", duration: "30 mins", price: "₹500" },
        { value: "Dental Implants", duration: "2-3 hours", price: "From ₹25,000" },
        { value: "Root Canal Treatment", duration: "1-2 hours", price: "From ₹8,500" },
        { value: "Teeth Whitening", duration: "1 hour", price: "From ₹12,000" },
        { value: "Braces / Invisalign", duration: "1 hour", price: "From ₹45,000" },
        { value: "Kids Dentistry", duration: "45 mins", price: "From ₹1,500" },
        { value: "Dental Crowns", duration: "1 hour", price: "From ₹15,000" },
        { value: "Wisdom Tooth Removal", duration: "45 mins", price: "From ₹8,000" },
        { value: "Emergency Care", duration: "30 mins", price: "₹1,000" },
        { value: "Other", duration: "30 mins", price: "Consultation" }
    ];

    const doctors = [
        { id: 1, name: "Dr. Nimisha Patel", specialization: "Orthodontist", experience: "15 years", rating: 4.9, available: true, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
        { id: 2, name: "Dr. Rajesh Modi", specialization: "Implantologist", experience: "20 years", rating: 4.8, available: true, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
        { id: 3, name: "Dr. Anjali Sharma", specialization: "Pedodontist", experience: "12 years", rating: 4.9, available: true, image: "https://images.unsplash.com/photo-1594824434340-7e7dfc37cabb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
    ];

    const timeSlots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
    ];

    const urgencyLevels = [
        { value: "emergency", label: "Emergency", color: "bg-red-100 text-red-800", icon: "🚑" },
        { value: "urgent", label: "Urgent", color: "bg-orange-100 text-orange-800", icon: "⚠️" },
        { value: "normal", label: "Normal", color: "bg-blue-100 text-blue-800", icon: "📅" }
    ];

    useEffect(() => {
        // Set default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formattedDate = tomorrow.toISOString().split('T')[0];
        setFormData(prev => ({ ...prev, date: formattedDate }));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1500);
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
            time: '10:00',
            message: '',
            urgency: 'normal'
        });
        setSelectedDoctor(null);
        setShowTimeSlots(false);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 px-4 py-12">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center max-w-md w-full transform transition-all duration-500 scale-100">
                    <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                            <CheckCircle size={48} className="text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 animate-ping">
                            <Sparkles size={24} className="text-yellow-400" />
                        </div>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Appointment Confirmed! 🎉</h2>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-6 mb-8">
                        <p className="text-lg font-semibold text-gray-800 mb-2">
                            {formData.name}
                        </p>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center justify-center gap-2">
                                <Phone size={14} />
                                <span>{formData.phone}</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Calendar size={14} />
                                <span>{formData.date} at {formData.time}</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Award size={14} />
                                <span>{formData.treatment}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-gray-600">
                            Your appointment request has been received. Our team will contact you shortly to confirm.
                        </p>
                        
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg text-left">
                            <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
                                <Clock size={16} />
                                <span>What to expect next:</span>
                            </p>
                            <ul className="text-xs text-gray-600 mt-2 space-y-1 pl-6">
                                <li>• Confirmation call within 30 minutes</li>
                                <li>• SMS reminder before appointment</li>
                                <li>• Digital health form to fill</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button
                            onClick={() => {
                                setIsSubmitted(false);
                                resetForm();
                            }}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                        >
                            Book Another
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                        >
                            Print
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-8 md:py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-bold mb-4">
                        <Sparkles size={14} />
                        Book Your Smile Transformation
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Schedule Your <span className="text-blue-600">Appointment</span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Secure your spot with India's leading dental specialists. Easy booking, flexible timing.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Info Panel */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Trust Badges */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Shield size={20} className="text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">100% Safe & Secure</h3>
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
                                    <span className="text-gray-600">Same Day Appointments</span>
                                    <span className="font-bold text-purple-600">Available</span>
                                </div>
                            </div>
                        </div>

                        {/* Doctors Selection */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4">Select Your Doctor</h3>
                            <div className="space-y-4">
                                {doctors.map(doctor => (
                                    <button
                                        key={doctor.id}
                                        onClick={() => handleDoctorSelect(doctor)}
                                        className={`w-full p-4 rounded-xl border-2 transition-all ${selectedDoctor?.id === doctor.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={doctor.image}
                                                alt={doctor.name}
                                                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                                            />
                                            <div className="text-left flex-1">
                                                <p className="font-bold text-gray-900">{doctor.name}</p>
                                                <p className="text-sm text-gray-600">{doctor.specialization}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                                    <span className="text-xs font-medium">{doctor.rating}</span>
                                                    <span className="text-xs text-gray-500">• {doctor.experience} exp</span>
                                                </div>
                                            </div>
                                            {doctor.available && (
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quick Contact */}
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
                            <h3 className="font-bold text-lg mb-4">Need Immediate Help?</h3>
                            <div className="space-y-4">
                                <a href="tel:+918401783154" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                                    <Phone size={20} />
                                    <div>
                                        <p className="font-bold text-lg">+91 84017 83154</p>
                                        <p className="text-sm text-blue-100">24/7 Emergency Line</p>
                                    </div>
                                </a>
                                <a href="https://wa.me/918401783154" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                                    <MessageCircle size={20} />
                                    <div>
                                        <p className="font-bold text-lg">WhatsApp Chat</p>
                                        <p className="text-sm text-blue-100">Instant Response</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                            {/* Form Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-bold">Book Your Appointment</h2>
                                        <p className="text-blue-100">Fill in your details below</p>
                                    </div>
                                    <div className="hidden md:flex items-center gap-2">
                                        <Clock size={20} />
                                        <span className="text-sm">30 seconds to book</span>
                                    </div>
                                </div>
                            </div>

                            {/* Form Content */}
                            <form onSubmit={handleSubmit} className="p-6 md:p-8">
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">@</div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Preferred Date *
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="date"
                                                name="date"
                                                required
                                                value={formData.date}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700"
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Treatment Selection */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Treatment *
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {treatments.map((treatment, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => setFormData({...formData, treatment: treatment.value})}
                                                className={`p-4 rounded-xl border-2 text-left transition-all ${formData.treatment === treatment.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                                            >
                                                <p className="font-medium text-gray-900">{treatment.value}</p>
                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-xs text-gray-500">{treatment.duration}</span>
                                                    <span className="text-xs font-bold text-blue-600">{treatment.price}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Time & Urgency */}
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                                                    <option key={index} value={time}>{time} AM/PM</option>
                                                ))}
                                            </select>
                                            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90" size={18} />
                                        </div>
                                    </div>

                                    {/* Urgency Level */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Urgency Level
                                        </label>
                                        <div className="flex gap-2">
                                            {urgencyLevels.map((level) => (
                                                <button
                                                    key={level.value}
                                                    type="button"
                                                    onClick={() => setFormData({...formData, urgency: level.value})}
                                                    className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium transition-all ${formData.urgency === level.value ? level.color + ' border-current' : 'border-gray-200 hover:border-gray-300'}`}
                                                >
                                                    <span className="mr-2">{level.icon}</span>
                                                    {level.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Message */}
                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Additional Message (Optional)
                                    </label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
                                        <textarea
                                            name="message"
                                            rows="3"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                                            placeholder="Please describe your concern, symptoms, or any special requirements..."
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full py-4 text-lg font-bold text-white rounded-xl shadow-lg transition-all transform hover:-translate-y-1 active:translate-y-0 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-xl hover:from-blue-700 hover:to-cyan-700'}`}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Processing...
                                        </div>
                                    ) : (
                                        'Confirm Appointment →'
                                    )}
                                </button>

                                {/* Terms */}
                                <p className="text-xs text-gray-500 text-center mt-4">
                                    By booking, you agree to our Terms of Service and Privacy Policy.
                                    No advance payment required.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Stats Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">98%</div>
                            <div className="text-sm text-gray-600">Success Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-emerald-600">24/7</div>
                            <div className="text-sm text-gray-600">Emergency Care</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">30K+</div>
                            <div className="text-sm text-gray-600">Happy Patients</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-amber-600">4.9★</div>
                            <div className="text-sm text-gray-600">Google Rating</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointment;