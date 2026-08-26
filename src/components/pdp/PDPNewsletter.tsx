import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PDPNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    confetti({
      particleCount: 60,
      spread: 55,
      origin: { y: 0.7 },
      colors: ['#FAEED1', '#4A2417', '#459AB8', '#CC4663'],
    });

    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <section className="w-full bg-[#FFF8EB] py-8 sm:py-12 px-6 md:px-12 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="relative w-full bg-[#4A2417] rounded-[32px] sm:rounded-[44px] overflow-hidden p-6 sm:p-10 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Top Right Cream Drips */}
          <div className="absolute top-0 right-0 w-44 sm:w-60 h-20 pointer-events-none">
            <svg
              viewBox="0 0 240 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M 0 0 
                   L 240 0 
                   L 240 30 
                   C 220 30, 215 65, 200 65 
                   C 185 65, 180 25, 160 25 
                   C 145 25, 140 55, 125 55 
                   C 110 55, 105 20, 85 20 
                   C 70 20, 65 75, 50 75 
                   C 35 75, 30 25, 15 25 
                   C 5 25, 0 40, 0 40 
                   Z"
                fill="#FFF8EB"
              />
            </svg>
          </div>

          {/* Left: Envelope & Copy */}
          <div className="flex items-center gap-4 sm:gap-5 z-10 w-full lg:w-auto">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white flex-shrink-0 shadow-inner">
              <Mail className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h3 className="font-bubble text-2xl sm:text-3xl font-bold text-white leading-tight">
                Stay in the loop
              </h3>
              <p className="text-xs sm:text-sm text-[#F0D5C9] font-medium mt-0.5">
                Get exclusive offers, new flavors and sweet surprises!
              </p>
            </div>
          </div>

          {/* Right: Email Input & Submit */}
          <div className="w-full lg:w-auto z-10">
            {subscribed ? (
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-6 py-3 rounded-full text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>You're in! Check your email for 15% off your first pint.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="w-full max-w-md flex items-center bg-[#34180E]/80 backdrop-blur-md rounded-full p-1.5 border border-white/15 focus-within:border-white/40 transition-all"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-transparent text-white placeholder:text-[#C4AFA5] text-xs sm:text-sm px-4 sm:px-5 py-2 w-full focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#FFF4E4] hover:bg-white text-[#2C1810] font-bold text-xs uppercase tracking-wider px-5 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-200 flex-shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
