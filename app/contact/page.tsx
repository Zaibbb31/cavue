"use client";

import React, { useState } from "react";
import Navbar from "../component/navbar";
import FAQSection from "../component/faq";
import Footer from "../component/footer";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only accept characters (letters and spaces)
    const filtered = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setFullName(filtered);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only accept numbers up to 10 digits
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(digitsOnly);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const trimmedName = fullName.trim();
    if (!trimmedName) {
      setErrorMessage("Please enter your name.");
      setIsSubmitting(false);
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      setErrorMessage("Name field only accepts characters.");
      setIsSubmitting(false);
      return;
    }

    if (phone && phone.length !== 10) {
      setErrorMessage("Phone number must be a 10-digit number.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: trimmedName,
          email,
          phone,
          budget,
          services: selectedServices,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit. Please try again.");
      }

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFullName("");
      setEmail("");
      setPhone("");
      setBudget("");
      setSelectedServices([]);
      setMessage("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
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
                Your Next Move Starts Here.
              </h1>

              {/* Description */}
              <p className="text-[#555555] text-base sm:text-lg md:text-[19px] leading-relaxed max-w-sm mb-10">
                Tell us where you’re headed. We’ll help you find the clearest way there.
              </p>

              {/* Contact Details List */}
              <div className="flex flex-col gap-8">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] rounded-full w-[52px] h-[52px] flex items-center justify-center shrink-0 border border-black/[0.04]">
                    <Phone className="w-[22px] h-[22px] text-[#0C3852]" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col pt-0.5">
                    <span className="text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase mb-1">Phone Number</span>
                    <span className="text-[18px] font-medium text-[#111827] mb-0.5">+91 92115 44533</span>
                    <span className="text-[14px] text-[#6B7280]">Monday to Friday, 9:00 AM – 6:00 PM IST</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] rounded-full w-[52px] h-[52px] flex items-center justify-center shrink-0 border border-black/[0.04]">
                    <Mail className="w-[22px] h-[22px] text-[#0C3852]" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col pt-0.5">
                    <span className="text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase mb-1">Email Address</span>
                    <span className="text-[18px] font-medium text-[#111827] mb-0.5">Palak@cavue.in</span>
                    <span className="text-[14px] text-[#6B7280]">We reply within 24 hours on working days</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] rounded-full w-[52px] h-[52px] flex items-center justify-center shrink-0 border border-black/[0.04]">
                    <MapPin className="w-[22px] h-[22px] text-[#0C3852]" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col pt-0.5">
                    <span className="text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase mb-1">Office Location</span>
                    <span className="text-[18px] font-medium text-[#111827] mb-0.5">[Your Office Address]</span>
                    <span className="text-[14px] text-[#6B7280]">[City, State, PIN]</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive White Form Card */}
            <div className="lg:col-span-7 w-full max-w-5xl">
              <div className="pt-2">
                <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-12">
                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                    {/* Full Name */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="fullName"
                        className="text-[11px] sm:text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={fullName}
                        onChange={handleNameChange}
                        pattern="[a-zA-Z\s]+"
                        title="Only characters are allowed"
                        className="w-full bg-transparent border-b border-[#D1D5DB] pb-3 text-[15px] sm:text-[16px] text-black focus:outline-none focus:border-[#AD4567] transition-colors"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="email"
                        className="text-[11px] sm:text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase mb-2"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-b border-[#D1D5DB] pb-3 text-[15px] sm:text-[16px] text-black focus:outline-none focus:border-[#AD4567] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Social Budget */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="budget"
                      className="text-[11px] sm:text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase mb-2"
                    >
                      Social Budget
                    </label>
                    <div className="relative">
                      <select
                        id="budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className={`w-full appearance-none bg-transparent border-b border-[#D1D5DB] pb-3 text-[15px] sm:text-[16px] focus:outline-none focus:border-[#AD4567] transition-colors cursor-pointer ${!budget ? "text-[#9CA3AF]" : "text-black"}`}
                      >
                        <option value="" disabled className="text-gray-400">
                          e.g. $1,000 - $3,000 / month
                        </option>
                        <option value="1k-3k" className="text-black">$1,000 – $3,000 / month</option>
                        <option value="3k-5k" className="text-black">$3,000 – $5,000 / month</option>
                        <option value="5k-10k" className="text-black">$5,000 – $10,000 / month</option>
                        <option value="10k+" className="text-black">$10,000+ / month</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 top-0 bottom-3 flex items-center text-gray-400">
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

                  {/* Row 3: Phone Number */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="phone"
                      className="text-[11px] sm:text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="e.g. 9211544533"
                      className="w-full bg-transparent border-b border-[#D1D5DB] pb-3 text-[15px] sm:text-[16px] text-black placeholder-[#9CA3AF] focus:outline-none focus:border-[#AD4567] transition-colors"
                    />
                  </div>

                  {/* Row 4: Services Selection */}
                  <div className="flex flex-col space-y-4">
                    <label className="text-[11px] sm:text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase">
                      Services Interested In
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
                                ? "bg-[#AD4567] text-white shadow-sm border border-[#AD4567]"
                                : "bg-transparent text-[#4B5563] border border-[#D1D5DB] hover:border-gray-400"
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                                isSelected
                                  ? "border-white bg-white"
                                  : "border-[#9CA3AF] bg-transparent"
                              }`}
                            >
                              {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#AD4567]" />
                              )}
                            </span>
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="message"
                      className="text-[11px] sm:text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase mb-2"
                    >
                      Tell us a little more
                    </label>
                    <textarea
                      id="message"
                      rows={1}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="A sentence or two is enough."
                      className="w-full bg-transparent border-b border-[#D1D5DB] pb-3 pt-1 text-[15px] sm:text-[16px] text-black placeholder-[#9CA3AF] focus:outline-none focus:border-[#AD4567] resize-none transition-colors"
                    />
                  </div>
                  
                  {/* Consent Checkbox */}
                  <div className="flex items-center gap-3 pt-2">
                     <input type="checkbox" id="consent" required className="w-4 h-4 rounded border-gray-300 text-[#AD4567] focus:ring-[#AD4567] cursor-pointer" />
                     <label htmlFor="consent" className="text-[13px] sm:text-[14px] text-[#6B7280] cursor-pointer">
                       I understand that sending this does not create a binding contract.
                     </label>
                  </div>

                  {/* Error & Success Feedback */}
                  {errorMessage && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                      {errorMessage}
                    </div>
                  )}

                  {submitted && (
                    <div className="p-3.5 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Thank you! Your message has been sent successfully. We will get back to you shortly.
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center px-8 py-3.5 bg-[#111827] hover:bg-[#0C3852] disabled:opacity-60 text-white font-medium text-sm sm:text-base rounded-full shadow-sm cursor-pointer transition-all duration-200 active:scale-[0.99]"
                    >
                      {isSubmitting ? "Sending..." : submitted ? "Message Sent!" : "Send this to us"}
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
