"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdModal({ isOpen, onClose }: AdModalProps) {
  const [countdown, setCountdown] = useState(5);
  const [isWatching, setIsWatching] = useState(false);

  useEffect(() => {
    if (isOpen && !isWatching) {
      setIsWatching(true);
    }
  }, [isOpen, isWatching]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isWatching && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isWatching, countdown]);

  const handleClose = () => {
    if (countdown === 0) {
      setCountdown(5);
      setIsWatching(false);
      onClose();
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
            className="bg-white rounded-xl p-8 max-w-md w-full mx-4 relative"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Need Help?</h2>
              <p className="text-gray-600">
                Watch a short ad to get an extra move credit!
              </p>
            </div>

            <div className="bg-gray-100 rounded-lg p-8 mb-6">
              <div className="w-full h-40 bg-gray-300 rounded flex items-center justify-center">
                <span className="text-gray-500">Ad Space</span>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleClose}
                disabled={countdown > 0}
                className={`
                  px-6 py-3 rounded-lg transition-colors relative
                  ${
                    countdown > 0
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-500 text-white"
                  }
                `}
              >
                <span>Close {countdown > 0 ? `(${countdown})` : ""}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
