import React, { useState } from 'react';
import { MessageCircle, X, Send, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const defaultPhone = '919810800000';
  const whatsappUrl = `https://wa.me/${defaultPhone}?text=${encodeURIComponent(
    userMsg.trim() || 'Hello Marcom Brand Solution, I would like to inquire about advertising and branding campaigns.'
  )}`;

  const quickPrompts = [
    'Need Wall Painting media plan & rates',
    'Inquire about Mobile Van roadshows',
    'Highway Hoardings & Transit branding',
    'Custom BTL or Corporate Event'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover Chat Card */}
      {isOpen && (
        <div className="mb-4 w-[320px] sm:w-[360px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 text-slate-800">
          {/* Header */}
          <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white">
                  MB
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-300 rounded-full border-2 border-emerald-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">Marcom Brand Solution</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  <span>Media Desk • Typically replies in 15 mins</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-emerald-700/60 text-emerald-100 hover:text-white transition-colors cursor-pointer"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-slate-50 space-y-3 max-h-[300px] overflow-y-auto">
            {/* Agency Message Bubble */}
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-xs shadow-xs border border-slate-100 text-xs text-slate-700 space-y-1.5">
              <p className="font-semibold text-slate-900">
                Namaste! Welcome to Marcom Brand Solution.
              </p>
              <p>
                How can we help your brand today? Select a quick option or type your requirement below to chat directly with our media planning head on WhatsApp.
              </p>
              <span className="text-[10px] text-slate-400 block text-right">Just now</span>
            </div>

            {/* Quick Prompt Buttons */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Suggested Inquiries:
              </p>
              <div className="flex flex-col gap-1.5">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setUserMsg(prompt)}
                    className="text-left text-xs bg-white hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 p-2 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                  >
                    💬 {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Input & Send to WhatsApp */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  window.open(whatsappUrl, '_blank');
                }
              }}
            />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors shadow-xs"
              aria-label="Send WhatsApp message"
            >
              <Send className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-slate-100 px-3 py-1.5 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Direct WhatsApp Verified Line: +91 98108 XXXXX</span>
          </div>
        </div>
      )}

      {/* Floating Circular WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl hover:shadow-emerald-600/40 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
        aria-label="Chat with us on WhatsApp"
      >
        {/* Pulsing ring animation */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-30 group-hover:opacity-75 animate-ping pointer-events-none" />

        {isOpen ? (
          <X className="w-7 h-7 transition-transform" />
        ) : (
          <div className="flex items-center justify-center relative">
            {/* WhatsApp Icon */}
            <svg
              className="w-8 h-8 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.277-.1-.478-.15-.68.15-.201.301-.78 1.002-.956 1.203-.176.2-.352.226-.653.075s-1.272-.469-2.423-1.496c-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.352.452-.528.15-.176.2-.301.301-.502.101-.2.05-.377-.025-.528-.075-.15-.68-1.639-.93-2.247-.245-.593-.493-.512-.68-.521l-.578-.01c-.2 0-.528.075-.804.377s-1.055 1.03-1.055 2.512 1.08 2.914 1.231 3.115c.15.201 2.126 3.246 5.15 4.553.719.311 1.28.497 1.718.636.723.23 1.38.197 1.9.12.58-.087 1.782-.728 2.033-1.432.251-.703.251-1.306.176-1.432-.076-.126-.277-.201-.578-.352zm-5.467 7.608h-.005a10.024 10.024 0 01-5.111-1.398l-.367-.218-3.797.996 1.013-3.7-.24-.382a10.046 10.046 0 01-1.542-5.352c0-5.541 4.509-10.05 10.053-10.05 2.684 0 5.208 1.046 7.106 2.946a10.007 10.007 0 012.944 7.104c0 5.543-4.51 10.054-10.051 10.054zm8.528-18.577C18.293 1.173 15.307.003 12.005 0 5.438 0 .084 5.354.082 11.921c0 2.098.549 4.146 1.593 5.952L0 24l6.305-1.654a11.87 11.87 0 005.696 1.448h.005c6.565 0 11.919-5.355 11.922-11.924 0-3.182-1.24-6.173-3.395-8.457z" />
            </svg>

            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white" />
          </div>
        )}
      </button>
    </div>
  );
};
