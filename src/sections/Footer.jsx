import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-black py-16 px-4 md:px-8 text-center text-white">
      <div className="max-w-7xl mx-auto w-full">
        
        <motion.h2 
          className="text-4xl sm:text-5xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Stammy
        </motion.h2>

        <motion.div 
          className="h-1 w-24 mx-auto my-6 bg-gradient-to-r from-[#b66cc0] via-[#d33bd3] to-[#760aa8] rounded-full"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        />

        <motion.p 
          className="text-lg text-gray-300 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          "Success is when preparation meets opportunity."
        </motion.p>

        <motion.p 
          className="text-sm text-gray-500 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          © 2025 Stammy. All rights reserved.
        </motion.p>

      </div>
    </footer>
  );
}