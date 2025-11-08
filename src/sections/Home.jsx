import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBehance, FaDiscord } from "react-icons/fa";
import { FaSteamSymbol } from "react-icons/fa6";
import ParticlesBackground from "../components/ParticlesBackground";
import Yuzuriha from "../assets/videos/YuzurihaRender.mp4";

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

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center h-full text-center lg:text-left relative">
          <div className="w-full lg:pr-24 mx-auto max-w-[48rem]">
            <motion.div
              className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>
              <span
                className="inline-block w-[2px] ml-1 bg-white align-middle blink"
                style={{ height: "1em" }}
              ></span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#b66cc0] via-[#d33bd3] to-[#760aa8] drop-shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Hello, I am
              <br />
              <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap">
                Stammy
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              I'm a motion designer who transforms static images into <b>Steam Artworks</b>.
              Adding movement, depth, and visuals to make your <b>Steam</b> profile stand out.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <a
                href="#portfolio"
                className="px-6 py-3 rounded-full font-medium text-lg text-white bg-gradient-to-r from-[#b66cc0] via-[#d33bd3] to-[#760aa8] shadow-lg hover:scale-105 transition-all"
              >
                Portfolio
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 rounded-full text-lg font-medium text-black bg-white hover:bg-gray-200 shadow-lg hover:scale-105 transition-all"
              >
                Pricing
              </button>
            </motion.div>

            <motion.div
              className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
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

        <div className="relative hidden lg:block">
          <motion.video
            className="absolute top-1/2 -translate-y-1/2 object-contain select-none rounded-lg"
            src={Yuzuriha}
            autoPlay
            loop
            muted
            playsInline
            style={{ right: "20px", width: "min(27vw, 780px)", maxHeight: "100vh" }}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>
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