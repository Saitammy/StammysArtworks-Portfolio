import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBehance, FaDiscord, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaSteamSymbol } from "react-icons/fa6";
import ParticlesBackground from "../components/ParticlesBackground";
import { artworks } from "../data/artworks";

const socials = [
  { Icon: FaBehance, label: "Behance", href: "https://www.behance.net/sampreetkishan" },
  { Icon: FaSteamSymbol, label: "Steam", href: "https://steamcommunity.com/id/stemmystummy/" },
  { Icon: FaDiscord, label: "Discord", href: "https://discord.gg/BVcaaRuMXD" },
];

const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(255, 255, 255, 0.0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter: "drop-shadow(0 0 8px rgba(247, 72, 247, 0.8)) drop-shadow(0 0 18px rgba(87, 20, 87, 0.9))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 50, scale: 0.9 },
};

export default function Home() {
  const roles = useMemo(
    () => ["Motion Designing", "Steam Profiles", "Character Animation"],
    []
  );

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Artwork Showcase Carousel States
  const [artworkIndex, setArtworkIndex] = useState(0);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const currentArtwork = artworks[artworkIndex] || artworks[0];

  const nextRandomArtwork = () => {
    if (artworks.length <= 1) return;
    setVideoError(false);
    setArtworkIndex((prev) => {
      let next;
      do {
        next = Math.floor(Math.random() * artworks.length);
      } while (next === prev);
      return next;
    });
  };

  const prevArtwork = () => {
    setVideoError(false);
    setArtworkIndex((prev) => (prev === 0 ? artworks.length - 1 : prev - 1));
  };

  const nextArtwork = () => {
    setVideoError(false);
    setArtworkIndex((prev) => (prev + 1) % artworks.length);
  };

  // 9-second auto-switch timer (pauses when user hovers over the card)
  useEffect(() => {
    if (isCardHovered || artworks.length <= 1) return;
    const interval = setInterval(() => {
      nextRandomArtwork();
    }, 9000);
    return () => clearInterval(interval);
  }, [isCardHovered, artworkIndex]);

  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) {
        setSubIndex((v) => v + 1);
      } else if (!deleting && subIndex === current.length) {
        setTimeout(() => setDeleting(true), 1200);
      } else if (deleting && subIndex > 0) {
        setSubIndex((v) => v - 1);
      } else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((p) => (p + 1) % roles.length);
      }
    }, deleting ? 40 : 60);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, roles]);

  return (
    <section id="home" className="w-full h-screen relative bg-black overflow-hidden">
      <ParticlesBackground />

      <div className="absolute inset-0">
        <div
          className="absolute -top-16 -left-16
          w-[70vw] sm:w-[50vw] md:w-[40vw]
          h-[70vw] sm:h-[50vw] md:h-[40vw]
          max-w-[500px] max-h-[500px] rounded-full
          bg-gradient-to-r from-[#f748f7] via-[#571457] to-[#ff80ff]
          opacity-30 sm:opacity-20 md:opacity-10
          blur-[100px] sm:blur-[130px] md:blur-[150px]
          animate-pulse"
        />
      </div>

      <div className="relative z-10 h-full w-full max-w-[1440px] mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16 xl:gap-20">
        <div className="flex flex-col justify-center text-center lg:text-left relative">
          <div className="w-full max-w-2xl mx-auto lg:mx-0">
            <motion.div
              className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-wide min-h-[1.5em]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>
              <span
                className="inline-block w-[2px] ml-1 bg-white align-middle blink"
                style={{ height: "1em" }}
              ></span>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#b66cc0] via-[#d33bd3] to-[#760aa8] drop-shadow-lg leading-[1.1]"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Hello! I am
              <br />
              <span className="text-white font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl lg:whitespace-nowrap">
                Stammy
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              I am a motion designer transforming static images into <span className="font-bold font-italic">Steam Artworks</span>.
              Adding movement, depth, and visuals to make your Steam profile stand out.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to="/shop"
                className="w-40 py-3.5 rounded-full font-medium text-lg text-white bg-gradient-to-r from-[#b66cc0] via-[#d33bd3] to-[#760aa8] shadow-lg hover:scale-105 transition-all inline-flex items-center justify-center cursor-pointer"
              >
                Shop
              </Link>
              <Link
                to="/contact"
                className="w-40 py-3.5 rounded-full text-lg font-medium text-black bg-white hover:bg-gray-200 shadow-lg hover:scale-105 transition-all inline-flex items-center justify-center cursor-pointer"
              >
                Contact
              </Link>
            </motion.div>

            <motion.div
              className="mt-12 flex gap-6 text-3xl md:text-4xl justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {socials.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  aria-label={label}
                  rel="noopener noreferrer"
                  variants={glowVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-gray-300"
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Artwork Showcase (Loads Last with Smooth Drift & Fade) */}
        <motion.div
          className="relative hidden lg:flex items-center justify-center"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 1.65,
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div
            className="flex items-center justify-center gap-5 xl:gap-8 select-none"
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
          >
            {/* Left Circular Arrow Button */}
            <button
              type="button"
              onClick={prevArtwork}
              aria-label="Previous Artwork"
              className="w-14 h-14 rounded-full bg-[#272134]/90 hover:bg-[#383049] text-white flex items-center justify-center border border-white/10 hover:border-white/30 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-2xl shrink-0"
            >
              <FaArrowLeft className="text-lg text-gray-200" />
            </button>

            {/* Fixed Invisible Stage (Enlarged for desktop) */}
            <div className="relative w-[360px] sm:w-[400px] xl:w-[440px] 2xl:w-[480px] h-[560px] sm:h-[620px] xl:h-[680px] 2xl:h-[720px] flex items-center justify-center">
              {artworks.map((art, idx) => {
                const isActive = idx === artworkIndex;
                return (
                  <motion.div
                    key={art.id}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      zIndex: isActive ? 10 : 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    style={{
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <video
                      src={art.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="max-w-full max-h-full object-contain rounded-xl shadow-[0_15px_60px_rgba(0,0,0,0.9)]"
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Right Circular Arrow Button */}
            <button
              type="button"
              onClick={nextArtwork}
              aria-label="Next Artwork"
              className="w-14 h-14 rounded-full bg-[#272134]/90 hover:bg-[#383049] text-white flex items-center justify-center border border-white/10 hover:border-white/30 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-2xl shrink-0"
            >
              <FaArrowRight className="text-lg text-gray-200" />
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/70 z-40 cursor-pointer"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            />
            <motion.div
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white p-8 rounded-lg shadow-xl w-full max-w-md"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-4 text-gray-400 hover:text-white text-3xl"
              >
                &times;
              </button>

              <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#b66cc0] via-[#d33bd3] to-[#760aa8]">
                Pricing
              </h2>

              <div className="space-y-4">
                <div className="p-4 border border-gray-700 rounded-lg">
                  <h3 className="text-xl font-semibold text-white">Basic Artwork</h3>
                  <p className="text-gray-300">$50</p>
                </div>
                <div className="p-4 border border-gray-700 rounded-lg">
                  <h3 className="text-xl font-semibold text-white">Standard Animation</h3>
                  <p className="text-gray-300">$100</p>
                </div>
                <div className="p-4 border border-gray-700 rounded-lg">
                  <h3 className="text-xl font-semibold text-white">Premium Character Rig</h3>
                  <p className="text-gray-300">$200+</p>
                </div>
              </div>

              <p className="text-center text-gray-400 mt-6 text-sm">
                Contact me for a detailed quote.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}