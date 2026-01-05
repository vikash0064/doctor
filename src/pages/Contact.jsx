import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate sending
        alert('Message sent! We will get back to you soon.');
        setFormState({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white min-h-screen pt-10 pb-20">

            {/* Header */}
            <div className="container mx-auto px-4 mb-16 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Have questions about our treatments or want to schedule a visit? We're here to help!
                </p>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Contact Information & Map */}
                    <div>
                        <div className="grid gap-8 mb-12">
                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-50 text-primary p-4 rounded-xl">
                                    <MapPin size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Clinic Location</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Shop No. 12, Crystal Plaza,<br />
                                        Opp. City Mall, New Adajan Road,<br />
                                        Surat, Gujarat - 395009
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-50 text-primary p-4 rounded-xl">
                                    <Phone size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Phone Number</h3>
                                    <p className="text-gray-600 text-lg font-medium">+91 98765 43210</p>
                                    <p className="text-gray-500 text-sm">Mon-Sat 9am to 9pm</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-50 text-primary p-4 rounded-xl">
                                    <Mail size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Email Address</h3>
                                    <p className="text-gray-600">info@dentocare.com</p>
                                    <p className="text-gray-500 text-sm">We reply within 24 hours</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="h-80 bg-gray-200 rounded-2xl overflow-hidden shadow-inner relative">
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                                <div className="text-center text-gray-500">
                                    <MapPin size={48} className="mx-auto mb-2 opacity-50" />
                                    <p className="font-semibold">Map Embed</p>
                                </div>
                            </div>
                            {/* Pretend map image */}
                            <img
                                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2662&auto=format&fit=crop"
                                className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity"
                                alt="Map view"
                            />
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-50 p-8 md:p-10 rounded-3xl border border-gray-100 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="John Doe"
                                    value={formState.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="john@example.com"
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="Inquiry about implants..."
                                    value={formState.subject}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    rows="5"
                                    name="message"
                                    required
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="How can we help you?"
                                    value={formState.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-800 transition-all flex items-center justify-center space-x-2"
                            >
                                <span>Send Message</span>
                                <Send size={18} />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
