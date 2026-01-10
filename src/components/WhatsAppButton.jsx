import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Phone, Facebook, X, MessageCircle, Send, User } from 'lucide-react';

const WhatsAppSVG = ({ size = 22 }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const WhatsAppButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const countryCode = "91";
    const mobileNumber = "8401783154";
    const message = "Hi, I would like to book an appointment.";
    const whatsappUrl = `https://wa.me/${countryCode}${mobileNumber}?text=${encodeURIComponent(message)}`;
    const callUrl = `tel:+${countryCode}${mobileNumber}`;
    const facebookUrl = "https://www.facebook.com/";

    useEffect(() => {
        if (isOpen) {
            // Expansion Animation
            gsap.fromTo(".action-item",
                { scale: 0, opacity: 0, y: 40, x: 20 },
                { scale: 1, opacity: 1, y: 0, x: 0, duration: 0.5, stagger: 0.1, ease: "elastic.out(1, 0.75)" }
            );

            // Labels Animation
            gsap.fromTo(".action-label",
                { opacity: 0, x: 10 },
                { opacity: 1, x: 0, duration: 0.3, delay: 0.3, stagger: 0.1 }
            );
        }
    }, [isOpen]);

    const ActionButton = ({ href, icon: Icon, label, color, isCustomIcon = false }) => (
        <div className="action-item flex items-center justify-end gap-3 group/item">
            <span className="action-label whitespace-nowrap bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 shadow-xl text-[10px] font-black uppercase tracking-widest text-gray-800 dark:text-white pointer-events-none transform origin-right">
                {label}
            </span>
            <a
                href={href}
                target={href.startsWith('http') ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={`w-11 h-11 md:w-14 md:h-14 ${color} text-white rounded-[0.8rem] md:rounded-[1.2rem] shadow-xl flex items-center justify-center border-2 border-white dark:border-slate-800 transition-all duration-300 hover:scale-110 active:scale-95`}
            >
                {isCustomIcon ? <Icon size={18} /> : <Icon size={20} />}
            </a>
        </div>
    );

    return (
        <div ref={menuRef} className="fixed bottom-24 md:bottom-10 right-6 md:right-10 z-[70] flex flex-col items-center">
            {/* Expanded Menu Actions */}
            {isOpen && (
                <div className="flex flex-col gap-4 mb-6 items-end">
                    <ActionButton
                        href={facebookUrl}
                        icon={Facebook}
                        label="Facebook"
                        color="bg-[#1877F2]"
                    />
                    <ActionButton
                        href={callUrl}
                        icon={Phone}
                        label="Talk to Us"
                        color="bg-blue-600"
                    />
                    <ActionButton
                        href={whatsappUrl}
                        icon={WhatsAppSVG}
                        label="WhatsApp"
                        color="bg-[#25D366]"
                        isCustomIcon={true}
                    />
                </div>
            )}

            {/* Main Toggle Button */}
            <div className="relative">
                {/* Background Ring for pulse */}
                {!isOpen && (
                    <div className="absolute inset-x-0 inset-y-0 rounded-[2rem] bg-emerald-500 animate-ping opacity-40 blur-sm"></div>
                )}

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`relative w-14 h-14 md:w-18 md:h-18 rounded-[1.2rem] md:rounded-[1.8rem] shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center justify-center transition-all duration-700 overflow-hidden ${isOpen
                        ? 'bg-gray-100 dark:bg-slate-800 rotate-180 scale-90'
                        : 'bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 group hover:shadow-emerald-500/50 hover:scale-105'
                        }`}
                >
                    {isOpen ? (
                        <X size={24} className="text-gray-800 dark:text-white md:size-[28px]" />
                    ) : (
                        <div className="group-hover:animate-bounce-slight transition-all">
                            <WhatsAppSVG size={20} />
                        </div>
                    )}
                </button>
            </div>

            <style>{`
                @keyframes bounce-slight {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }
                .animate-bounce-slight {
                    animation: bounce-slight 2s infinite;
                }
            `}</style>
        </div>
    );
};

export default WhatsAppButton;
