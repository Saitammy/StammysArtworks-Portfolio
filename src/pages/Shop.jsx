import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { artworks } from "../data/artworks";

function ArtworkCard({ art }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col justify-between rounded-2xl bg-[#120f1e]/80 border border-white/10 hover:border-[#d33bd3]/60 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(211,59,211,0.2)] hover:-translate-y-2 p-5"
    >
      {/* Video Preview Frame */}
      <div className="relative aspect-[10/15] w-full rounded-xl overflow-hidden bg-black/80 flex items-center justify-center border border-white/5">
        <video
          ref={videoRef}
          src={art.video}
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-contain"
        />
        {art.tag && (
          <span className="absolute top-3 left-3 px-3 py-1 text-[11px] font-medium tracking-wide rounded-full bg-black/70 backdrop-blur-md text-pink-300 border border-pink-500/30">
            {art.tag}
          </span>
        )}
      </div>

      {/* Artwork Details */}
      <div className="mt-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span className="text-gray-400 font-medium">{art.category}</span>
            <span className="font-mono text-gray-400">{art.dimensions}</span>
          </div>
          <h2 className="text-lg font-semibold text-white group-hover:text-[#f748f7] transition-colors leading-snug">
            {art.title}
          </h2>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
          <div>
            <span className="block text-[11px] text-gray-400 uppercase tracking-wider">
              Price
            </span>
            <span className="text-2xl font-bold text-white tracking-tight">
              ${art.price ? art.price.toFixed(2) : "15.00"}
            </span>
          </div>

          <button
            type="button"
            className="flex-1 py-3 px-4 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-[#b66cc0] via-[#d33bd3] to-[#760aa8] hover:shadow-[0_0_20px_rgba(211,59,211,0.4)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <FaShoppingCart className="text-xs" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-screen bg-black text-white relative flex flex-col"
    >
      {/* Top Navigation Bar */}
      <header className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-8 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors text-sm sm:text-base font-medium group cursor-pointer"
        >
          <FaArrowLeft className="text-xs transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-20">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#b66cc0] via-[#d33bd3] to-[#760aa8]">
            Steam Artworks
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-400 font-light leading-relaxed">
            High-quality animated profile showcases &amp; custom workshops ready for instant delivery.
          </p>
        </div>

        {/* Artworks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {artworks.map((art) => (
            <ArtworkCard key={art.id} art={art} />
          ))}
        </div>
      </main>
    </motion.div>
  );
}
