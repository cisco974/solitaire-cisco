'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Share2, Copy, MessageCircle, Send, X } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2] hover:bg-[#0C63D4]',
      onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')
    },
    {
      name: 'X.com',
      icon: () => (
        <svg width="20" height="20" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor"/>
        </svg>
      ),
      color: 'bg-black hover:bg-gray-800',
      onClick: () => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank')
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366] hover:bg-[#20BD5C]',
      onClick: () => window.open(`https://wa.me/?text=${window.location.href}`, '_blank')
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-[#0088cc] hover:bg-[#0077b3]',
      onClick: () => window.open(`https://t.me/share/url?url=${window.location.href}`, '_blank')
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Share</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={option.onClick}
                  className={`${option.color} text-white rounded-lg p-4 flex items-center justify-center gap-2 transition-colors`}
                >
                  {typeof option.icon === 'function' ? <option.icon /> : <option.icon className="w-5 h-5" />}
                  <span>{option.name}</span>
                </button>
              ))}
            </div>

            <button
              onClick={copyToClipboard}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-gray-200 hover:border-emerald-200 transition-colors"
            >
              <Copy className="w-5 h-5" />
              <span>Copy link to clipboard</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}