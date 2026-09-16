"use client";

import React, { useState } from "react";
import Navbar from "../component/navbar";
import FAQSection from "../component/faq";
import Footer from "../component/footer";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const servicesList = [
    "Content Creation",
    "Social Management",
    "Paid Ads",
  ];

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFullName("");
    setEmail("");
    setBudget("");
    setSelectedServices([]);
    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#0C3852] font-sans selection:bg-[#D2E823] selection:text-black">
      {/* Navigation */}
      <Navbar />

      {/* Main Contact Hero & Form Section */}
      <main className="w-full pt-10 sm:pt-14 md:pt-18 pb-16 sm:pb-24">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Headline & Subtitle */}
            <div className="lg:col-span-5 flex flex-col pt-2 lg:pt-6">
              {/* Section Subtitle / Gochi Badge */}
              <div className="mb-4 sm:mb-6">
                <span className="font-gochi text-[#2B7DA8] text-base sm:text-lg tracking-wider block">
                  / CONTACT US
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] xl:text-[64px] font-medium text-black tracking-tight leading-[1.08] mb-4 sm:mb-6">
                Start the <br />
                Conversation
              </h1>

              {/* Description */}
              <p className="text-[#555555] text-base sm:text-lg md:text-[19px] leading-relaxed max-w-sm">
                We focus on what matters — engagement, leads, and revenue.
              </p>
            </div>

            {/* Right Column: Interactive White Form Card */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-[#0C4568] p-6 sm:p-10 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="fullName"
                        className="text-xs sm:text-sm font-medium text-black"
                      >
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-5 py-3.5 bg-[#FFFFFF] text-black placeholder-[#9CA3AF] text-sm sm:text-base border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0C4568] transition-all"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="email"
                        className="text-xs sm:text-sm font-medium text-black"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="johndoe@gmail.com"
                        className="w-full px-5 py-3.5 bg-[#FFFFFF] text-black placeholder-[#9CA3AF] text-sm sm:text-base border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0C4568] transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Social Budget */}
                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="budget"
                      className="text-xs sm:text-sm font-medium text-black"
                    >
                      Social Budget
                    </label>
                    <div className="relative">
                      <select
                        id="budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full appearance-none px-5 py-3.5 bg-[#FFFFFF] text-black text-sm sm:text-base border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0C4568] transition-all cursor-pointer"
                      >
                        <option value="" disabled className="text-gray-400">
                          Select an amount
                        </option>
                        <option value="1k-3k">$1,000 – $3,000 / month</option>
                        <option value="3k-5k">$3,000 – $5,000 / month</option>
                        <option value="5k-10k">$5,000 – $10,000 / month</option>
                        <option value="10k+">$10,000+ / month</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <svg
                          className="w-4 h-4 fill-none stroke-current stroke-2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Services Selection */}
                  <div className="flex flex-col space-y-2.5">
                    <label className="text-xs sm:text-sm font-medium text-black">
                      What services are you interested in?
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {servicesList.map((service) => {
                        const isSelected = selectedServices.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            className={`inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "bg-[#0C4568] text-white shadow-sm border border-[#0C4568]"
                                : "bg-[#FFFFFF] text-black border border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                                isSelected
                                  ? "border-white bg-white"
                                  : "border-gray-400 bg-white"
                              }`}
                            >
                              {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0C4568]" />
                              )}
                            </span>
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="message"
                      className="text-xs sm:text-sm font-medium text-black"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your business"
                      className="w-full px-5 py-4 bg-[#FFFFFF] text-black placeholder-[#9CA3AF] text-sm sm:text-base border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0C4568] resize-none transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center px-7 py-3.5 sm:py-4 bg-gradient-to-b from-[#125883] via-[#0C4568] to-[#083550] text-white font-medium text-sm sm:text-base border-t border-white/25 border-b border-black/30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-2px_5px_rgba(0,0,0,0.45)] hover:opacity-95 cursor-pointer transition-all duration-200 active:scale-[0.99]"
                    >
                      {submitted ? "Message Sent!" : "Send Message"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
