
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const LOADING_MESSAGES = [
    "Initializing autonomous agents...",
    "Scanning atmospheric data...",
    "Analyzing temperature gradients...",
    "Checking wind patterns...",
    "Synthesizing clothing models...",
    "Optimizing activity suggestions...",
    "Generating final report..."
];

const AgenticLoader = () => {
    const [messageIndex, setMessageIndex] = useState(0);
    const circleRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Message cycling
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Text animation on change
        if (textRef.current) {
            gsap.fromTo(textRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
        }
    }, [messageIndex]);

    useEffect(() => {
        // Circle pulses
        if (circleRef.current) {
            gsap.to(circleRef.current, {
                scale: 1.2,
                opacity: 0.5,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

        // Background float
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                backgroundPosition: "200% 200%",
                duration: 20,
                repeat: -1,
                ease: "linear"
            });
        }
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xl">
            <div className="text-center relative">
                {/* Brain/Scanner Visual */}
                <div className="relative w-32 h-32 mx-auto mb-8">
                    <div ref={circleRef} className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl"></div>
                    <div className="relative w-full h-full border-2 border-orange-500/30 rounded-full flex items-center justify-center animate-[spin_4s_linear_infinite]">
                        <div className="w-24 h-24 border-t-2 border-b-2 border-orange-400 rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl">🧠</span>
                    </div>
                </div>

                {/* Status Text */}
                <div className="h-12">
                    <p ref={textRef} className="text-xl font-mono text-orange-400 font-bold tracking-wider">
                        {LOADING_MESSAGES[messageIndex]}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-64 h-1 bg-slate-800 rounded-full mx-auto mt-6 overflow-hidden">
                    <div className="h-full bg-orange-500 animate-[loading_2s_ease-in-out_infinite] w-full origin-left"></div>
                </div>
            </div>
        </div>
    );
};

export default AgenticLoader;
