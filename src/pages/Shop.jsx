import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Shop() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-screen bg-black text-white relative"
    >
      <div className="p-6 sm:p-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm sm:text-base font-medium group cursor-pointer"
        >
          <FaArrowLeft className="text-xs transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>
      </div>
    </motion.div>
  );
}
