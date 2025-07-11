'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Header />
      <motion.main
        className="pt-8 px-4 sm:px-6 pb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Settings
          </motion.h1>
          
          {/* Account Section - Authentication Disabled */}
          <motion.div
            className="bg-white/80 dark:bg-gray-800/50 rounded-lg p-4 sm:p-6 backdrop-blur-sm mb-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Account</h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">Authentication is currently disabled</p>
              </motion.div>

              <motion.div
                className="w-full sm:w-auto text-center bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-lg px-4 py-2 cursor-not-allowed transition-colors duration-300"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                Authentication Disabled
              </motion.div>
            </div>
          </motion.div>

          {/* Appearance Section */}
          <motion.div
            className="bg-white/80 dark:bg-gray-800/50 rounded-lg p-4 sm:p-6 backdrop-blur-sm mb-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Appearance</h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">Customize how Emmflix looks on your device</p>
              </motion.div>

              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg px-4 py-2 transition-colors shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {theme === 'dark' ? (
                  <>
                    <motion.svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                    </motion.svg>
                    <span>Switch to Light</span>
                  </>
                ) : (
                  <>
                    <motion.svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </motion.svg>
                    <span>Switch to Dark</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* About Us Section */}
          <motion.div
            className="bg-white/90 dark:bg-gray-800/50 rounded-lg p-4 sm:p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/20 transition-all duration-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">About Us</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">Learn more about Emmflix</p>
              
              <div className="mt-4 space-y-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base transition-colors duration-300">
                <p>
                  Emmflix is your premier destination for streaming movies and TV shows.
                  We're dedicated to bringing you the best entertainment experience possible.
                </p>
                <div className="space-y-2">
                  <h3 className="text-gray-900 dark:text-white font-semibold transition-colors duration-300">Contact Information:</h3>
                  <p>Phone: 09037441641</p>
                  <p>Email: emmanueledobor34@gmail.com</p>
                  <p>Version: 1.0.0</p>
                </div>
                <div className="pt-4 flex flex-wrap gap-2">
                  <Link 
                    href="/terms" 
                    className="text-red-500 hover:text-red-400 transition-colors"
                  >
                    Terms of Service
                  </Link>
                  <span className="text-gray-500 dark:text-gray-600 hidden sm:inline transition-colors duration-300">•</span>
                  <Link 
                    href="/privacy" 
                    className="text-red-500 hover:text-red-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>
    </motion.div>
  );
}





