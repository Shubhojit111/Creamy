import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle2, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Navbar } from '../components/Navbar';
import { PDPFooter } from '../components/pdp/PDPFooter';

interface ContactPageProps {
  onNavigateToHome: () => void;
  onNavigateToCatalog: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  onOpenAbout: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateToHome,
  onNavigateToCatalog,
  cartCount,
  onOpenCart,
  onOpenAccount,
  onOpenAbout,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#4A2818', '#FAEED1', '#459AB8', '#CC4663'],
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 3500);
  };

  return (
    <div className="w-full min-h-screen bg-[#FFF8EB] text-gray-900 overflow-x-hidden font-sans selection:bg-[#4A2417]/20 selection:text-[#4A2417] pt-24 md:pt-28">
      <Navbar
        activeNav="CONTACT"
        forceSolid
        onOrderNow={onNavigateToCatalog}
        onNavClick={(item: string) => {
          if (item === 'HOME') onNavigateToHome();
          else if (item === 'MENU') onNavigateToCatalog();
          else if (item === 'ABOUT') onOpenAbout();
          else if (item === 'CONTACT') {}
        }}
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        onOpenAccount={onOpenAccount}
      />

      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Contact Info & Direct Links */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6">
            <div>
              <span className="inline-block bg-[#F4E3D0] text-[#7A4026] text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-3">
                CUSTOMER CARE
              </span>
              <h1 className="font-bubble text-3xl sm:text-4xl font-bold text-[#2C1810] leading-tight mb-3">
                We'd love to hear from you.
              </h1>
              <p className="text-xs sm:text-sm text-[#7D6B60] leading-relaxed">
                Have questions about our Swedish ingredients, looking for wholesale partnerships, or need assistance with your dry-ice delivery? Our team is here to help.
              </p>
            </div>

            <div className="w-full space-y-3.5">
              <div className="bg-white/85 p-4 rounded-2xl border border-[#ECD9C0] flex items-center gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#7A4026] flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2C1810]">Email Support</h4>
                  <p className="text-xs text-[#7D6B60]">hello@creamy.com</p>
                </div>
              </div>

              <div className="bg-white/85 p-4 rounded-2xl border border-[#ECD9C0] flex items-center gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2C1810]">Phone & SMS</h4>
                  <p className="text-xs text-[#7D6B60]">+1 (800) 555-CREAM</p>
                </div>
              </div>

              <div className="bg-white/85 p-4 rounded-2xl border border-[#ECD9C0] flex items-center gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2C1810]">Support Hours</h4>
                  <p className="text-xs text-[#7D6B60]">Mon–Fri: 8am – 8pm EST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#ECD9C0] shadow-xl text-left">
            {submitted ? (
              <div className="py-14 flex flex-col items-center justify-center text-center space-y-3">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 animate-bounce" />
                <h3 className="font-bubble text-2xl font-bold text-[#2C1810]">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-xs sm:text-sm text-[#7D6B60] max-w-sm">
                  We have received your message and our Creamy customer care specialist will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#381E15] mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Linnea Berg"
                      className="w-full text-xs px-4 py-3 bg-[#FFF8EB] border border-[#ECD9C0] rounded-xl focus:outline-none focus:bg-white focus:border-[#4A2818]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#381E15] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full text-xs px-4 py-3 bg-[#FFF8EB] border border-[#ECD9C0] rounded-xl focus:outline-none focus:bg-white focus:border-[#4A2818]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#381E15] mb-1.5">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full text-xs px-4 py-3 bg-[#FFF8EB] border border-[#ECD9C0] rounded-xl focus:outline-none focus:bg-white focus:border-[#4A2818]"
                  >
                    <option>General Inquiry</option>
                    <option>Order & Delivery Status</option>
                    <option>Wholesale & Retail Stockist</option>
                    <option>Flavor Suggestion</option>
                    <option>Press & Media</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#381E15] mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we make your day creamier?..."
                    className="w-full text-xs px-4 py-3 bg-[#FFF8EB] border border-[#ECD9C0] rounded-xl focus:outline-none focus:bg-white focus:border-[#4A2818] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#4A2417] hover:bg-[#34180E] text-white font-bold text-xs uppercase px-7 py-3.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <PDPFooter
        onOpenMenu={onNavigateToCatalog}
        onOpenAbout={onOpenAbout}
        onOpenContact={() => {}}
      />
    </div>
  );
};

