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
        <main className="bg-white">
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
                <div className="w-full h-96 bg-gray-200 relative">
                    {/* Placeholder for full-width map or keep the previous container-based one if preferred. 
                         Going with screen-width to look modern. */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                        <p className="text-gray-600 font-medium">Google Map Embed Placeholder</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-50 contrast-75 grayscale"
                        alt="Map Location Hint" />
                </div>
            </section>
        </main>
    );
};

export default Home;
