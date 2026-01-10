import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Check, X } from 'lucide-react';

// Import local treatment images
import dentalCrownsImg from '../assets/treatment/Dental crowns.jpg';
import dentureImg from '../assets/treatment/Denture.jpg';
import alignerImg from '../assets/treatment/clear aligner.jpg';
import fillingImg from '../assets/treatment/dental filling.jpg';
import implantImg from '../assets/treatment/implant.jpg';
import laserImg from '../assets/treatment/laser Densitry.jpg';
import rctImg from '../assets/treatment/root canal.jpg';
import wisdomImg from '../assets/treatment/wisdom teeth.jpg';

const treatmentsList = [
    {
        id: "maxillofacial-prosthetics",
        title: "Maxillofacial Prosthetics",
        image: implantImg,
        description: "Maxillofacial prosthetics is a specialty of dentistry that deals with the rehabilitation of patients with acquired and congenital defects of the head and neck. This ranges from restoring facial features to replacing missing teeth and bone.",
        pros: ["Restores normal function (chewing, speaking)", "Improves aesthetic appearance significantly", "Boosts patient confidence"],
        cons: ["Can be expensive depending on complexity", "May require multiple visits", "Maintenance and cleaning are crucial"]
    },
    {
        id: "restoration",
        title: "Discolored Tooth Restoration",
        image: fillingImg,
        description: "Restores the natural color and function of teeth that have been stained or discolored due to age, medication, or trauma. This often involves crowns, veneers, or composite bonding.",
        pros: ["Immediate aesthetic improvement", "Minimally invasive options available", "Long-lasting results"],
        cons: ["Veneers are irreversible", "Sensitivity may occur temporarily", "Cost varies by material used"]
    },
    {
        id: "extraction",
        title: "Wisdom Tooth Extraction",
        image: wisdomImg,
        description: "The removal of one or more wisdom teeth, the four permanent adult teeth located at the back corners of your mouth. It is often done to prevent future problems or correct an actual problem.",
        pros: ["Prevents overcrowding of teeth", "Relieves pain and discomfort", "Prevents potential cysts and tumors"],
        cons: ["Recovery time of a few days", "Risk of dry socket (rare)", "Temporary swelling"]
    },
    {
        id: "rct",
        title: "RCT (Root Canal Treatment)",
        image: rctImg,
        description: "A treatment used to repair and save a tooth that is badly decayed or becomes infected. The nerve and pulp are removed and the inside of the tooth is cleaned and sealed.",
        pros: ["Saves the natural tooth", "Relieves severe tooth pain", "Restores normal biting force"],
        cons: ["Tooth may become brittle over time", "Requires a crown for full strength", "Multiple sittings might be needed (though we do single sitting too)"]
    },
    {
        id: "straightening",
        title: "Straightening Teeth (Orthodontics)",
        image: alignerImg,
        description: "Correction of crooked or crowded teeth using braces or clear aligners. This improves both the appearance and the function of your teeth.",
        pros: ["Better oral hygiene (easier to clean)", "Improved speech and chewing", "Beautiful smile"],
        cons: ["Treatment takes time (months to years)", "Regular adjustments needed", "Temporary discomfort"]
    },
    {
        id: "implants",
        title: "Dental Implant Fixing",
        image: implantImg,
        description: "A surgical component that interfaces with the bone of the jaw or skull to support a dental prosthesis such as a crown, bridge, denture, or facial prosthesis.",
        pros: ["Permanent solution", "Looks and feels like natural teeth", "Prevents bone loss"],
        cons: ["Surgical procedure required", "Healing time for osseointegration", "Higher initial cost"]
    },
    {
        id: "dentures",
        title: "BPS Dentures Fixing",
        image: dentureImg,
        description: "Biofunctional Prosthetic System (BPS) dentures are high-quality dentures that provide the best fit, comfort, and function, designed to mimic the natural jaw movement.",
        pros: ["Superior fit and comfort", "Highly aesthetic and natural looking", "Durable and strong"],
        cons: ["More expensive than conventional dentures", "Takes time to fabricate", "Regular cleaning required"]
    },
    {
        id: "surgery",
        title: "Oral & Maxillofacial Surgery",
        image: laserImg,
        description: "Surgical treatment of diseases, injuries and defects involving the functional and aesthetic aspects of the hard and soft tissues of the head, mouth, teeth, gums, jaws and neck.",
        pros: ["Resolves complex dental issues", "Corrects structural defects", "Improves long-term health"],
        cons: ["Invasive procedure", "Recovery period needed", "Risk of infection (managed with medication)"]
    }
];

const Treatments = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    return (
        <main className="bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
            {/* Header */}
            <section className="bg-gradient-to-r from-blue-900 to-blue-700 dark:from-slate-800 dark:to-slate-900 pt-24 md:pt-28 pb-16 md:py-20 text-white text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Specialized Treatments</h1>
                <p className="text-xl text-blue-100 dark:text-gray-400 max-w-2xl mx-auto">Comprehensive dental care solutions tailored to your unique needs.</p>
            </section>

            {/* Treatments List */}
            <div className="container mx-auto px-4 py-16 space-y-20">
                {treatmentsList.map((treatment, index) => (
                    <section
                        key={treatment.id}
                        id={treatment.id}
                        className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-start scroll-mt-28`}
                    >
                        {/* Image Side */}
                        <div className="lg:w-1/2 w-full">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                                <img
                                    src={treatment.image}
                                    alt={treatment.title}
                                    className="w-full h-80 md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-2xl font-bold">{treatment.title}</h3>
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="lg:w-1/2 w-full">
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{treatment.title}</h2>
                                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                                    {treatment.description}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Pros */}
                                    <div>
                                        <h4 className="flex items-center gap-2 font-bold text-green-600 dark:text-green-400 mb-4 text-lg">
                                            <span className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full"><Check size={16} /></span>
                                            Pros
                                        </h4>
                                        <ul className="space-y-3">
                                            {treatment.pros.map((pro, i) => (
                                                <li key={i} className="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 shrink-0"></span>
                                                    {pro}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Cons */}
                                    <div>
                                        <h4 className="flex items-center gap-2 font-bold text-red-500 dark:text-red-400 mb-4 text-lg">
                                            <span className="bg-red-100 dark:bg-red-900/30 p-1.5 rounded-full"><X size={16} /></span>
                                            Cons
                                        </h4>
                                        <ul className="space-y-3">
                                            {treatment.cons.map((con, i) => (
                                                <li key={i} className="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 shrink-0"></span>
                                                    {con}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
};

export default Treatments;
