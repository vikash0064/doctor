import React from 'react';
import Hero from '../components/Hero';
import StatsStrip from '../components/StatsStrip';
import TreatmentGrid from '../components/TreatmentGrid';
import WhyTrust from '../components/WhyTrust';
import DentalInsights from '../components/DentalInsights';
import PatientSpeaks from '../components/PatientSpeaks';
import MeetTheDoctor from '../components/MeetTheDoctor';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <main className="bg-white dark:bg-slate-900 transition-colors duration-300">
            <Hero />
            <StatsStrip />
            {/* Treatment section moved up for better flow, consistent with Clove */}
            <TreatmentGrid />

            <MeetTheDoctor />

            <WhyTrust />

            <DentalInsights />

            <PatientSpeaks />

            {/* Map / Location Placeholder Section */}
            <section className="py-0 relative">
                <div className="w-full h-96 bg-gray-200 dark:bg-slate-800 relative transition-colors duration-300">
                    {/* Placeholder for full-width map or keep the previous container-based one if preferred. 
                         Going with screen-width to look modern. */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-300 dark:bg-slate-700">
                        <p className="text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            Google Map Embed Placeholder
                        </p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-50 dark:opacity-20 contrast-75 grayscale"
                        alt="Map Location Hint" />
                </div>
            </section>
        </main>
    );
};

export default Home;
