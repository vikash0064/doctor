import React from 'react';

const PartnersBanner = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Trusted Partners for Oral Care Solutions</h2>
                    <p className="text-gray-600">From advanced aligners to everyday oral care, our trusted partners ensure dentist-recommended solutions for your smile.</p>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-sm">
                    <img
                        src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2000&auto=format&fit=crop"
                        alt="Dental Products"
                        className="w-full h-64 md:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-50/90 via-transparent to-transparent flex items-center">
                        <div className="p-8 md:p-16 max-w-lg">
                            <h3 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">Scientifically customized oralcare solutions</h3>
                            <p className="text-2xl text-gray-600 italic mb-8">"Perfected by dentists"</p>
                            <div className="bg-[#4a3b32] text-white px-6 py-3 inline-block rounded font-semibold mb-8">
                                Tested for Indian Mouths
                            </div>
                            <br />
                            <button className="bg-primary-500 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-600 transition-colors">
                                Know more
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnersBanner;
