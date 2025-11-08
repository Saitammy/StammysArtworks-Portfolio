import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import SukunaRender from "../assets/videos/SukunaRender.mp4";

export default function WhatIsSteamArt() {
  const glows = [];

  const videoRef = useRef(null);
  const inView = useInView(videoRef, { amount: 0.25, once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { delay: 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
      });
    }
  }, [inView, controls]);

  return (
    <section
      id="what-is-steam-art"
      className="w-full relative bg-black text-white overflow-visible px-6 lg:px-16 py-24"
    >
      <div className="absolute inset-0 pointer-events-none">
        {glows.map((c, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-r from-[#b66cc0] via-[#d33bd3] to-[#760aa8] animate-pulse ${c}`}
          />
        ))}
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl w-full mx-auto">
        <div className="relative hidden lg:flex justify-center items-center">
          <div ref={videoRef} className="relative w-full max-w-[780px] flex justify-center">
            <motion.video
              className="rounded-lg object-contain select-none"
              src={SukunaRender}
              autoPlay
              loop
              muted
              playsInline
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={controls}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ width: "min(27vw, 780px)", maxHeight: "100vh" }}
            />
          </div>
        </div>

        <motion.div
          className="flex flex-col text-center lg:text-left justify-center"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#b66cc0] via-[#d33bd3] to-[#760aa8]"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            style={{ originX: 0, originY: 1 }}
          >
            What is a Steam Artwork?
          </motion.h2>

          <p className="text-gray-300 text-2xl leading-relaxed max-w-xl mx-auto lg:mx-0">
            Steam Artworks are animated visuals you see on a custom Steam profile.
            They include moving backgrounds, dynamic showcases, and looping visuals that
            bring personality to your profile.
          </p>
        </motion.div>
      </div>
    </section>
  );
}