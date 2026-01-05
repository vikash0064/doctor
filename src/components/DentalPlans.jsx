import React from 'react';
import { Check } from 'lucide-react';

const DentalPlans = () => {
    return (
        <section className="py-20 bg-primary-50/30">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-12">Dental Health Plans for All</h2>

                <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
                    {/* Plan 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex-1 hover:shadow-lg transition-shadow text-left">
                        <div className="flex justify-center mb-6">
                            <img src="https://em-content.zobj.net/source/microsoft-teams/337/tooth_1f9b7.png" alt="Tooth" className="w-24 h-24" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Super Speciality Dental Health Plan</h3>

                        <ul className="space-y-3 mb-8 text-gray-600 text-sm">
                            <li className="flex items-start gap-2">
                                <div className="mt-1 w-1 h-1 bg-gray-500 rounded-full flex-shrink-0"></div>
                                <span>₹1,800 treatment coupon redeemable against any dental procedure.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="mt-1 w-1 h-1 bg-gray-500 rounded-full flex-shrink-0"></div>
                                <span>₹3500 off on ortho & implants treatment.</span>
                            </li>
                        </ul>

                        <div className="flex items-center justify-between mt-auto">
                            <div>
                                <p className="text-primary-500 text-xs font-semibold">Special Offer</p>
                                <p className="text-2xl font-bold text-gray-900">₹ 750</p>
                            </div>
                            <button className="bg-primary-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-600 transition-colors">
                                Buy Now
                            </button>
                        </div>
                    </div>

                    {/* Plan 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex-1 hover:shadow-lg transition-shadow text-left">
                        <div className="flex justify-center mb-6">
                            <img src="https://em-content.zobj.net/source/microsoft-teams/337/sparkles_2728.png" alt="Sparkle" className="w-24 h-24" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Premium Dental Health Plan</h3>

                        <ul className="space-y-3 mb-8 text-gray-600 text-sm">
                            <li className="flex items-start gap-2">
                                <div className="mt-1 w-1 h-1 bg-gray-500 rounded-full flex-shrink-0"></div>
                                <span>₹1,800 treatment coupon redeemable against any dental procedure.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="mt-1 w-1 h-1 bg-gray-500 rounded-full flex-shrink-0"></div>
                                <span>Free Consultation and X-ray.</span>
                            </li>
                        </ul>

                        <div className="flex items-center justify-between mt-auto">
                            <div>
                                <p className="text-primary-500 text-xs font-semibold">Special Offer</p>
                                <p className="text-2xl font-bold text-gray-900">₹ 590</p>
                            </div>
                            <button className="bg-primary-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-600 transition-colors">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DentalPlans;
