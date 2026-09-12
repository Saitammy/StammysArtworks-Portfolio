import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { STEAM_ARTWORK_WIDTHS } from "../data/artworks";

export default function WhatIsSteamArt() {
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
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl w-full mx-auto">
        <div className="relative hidden lg:flex justify-center items-center">
          <div ref={videoRef} className="relative w-full max-w-[480px] flex justify-center">
            <motion.div
              className="w-full rounded-2xl p-1 bg-gradient-to-b from-[#b66cc0]/60 via-[#d33bd3]/30 to-[#760aa8]/60 shadow-[0_0_40px_rgba(211,59,211,0.2)] select-none"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={controls}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <div className="rounded-[14px] bg-gray-950/95 backdrop-blur-md p-6 border border-purple-500/20">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-xs text-gray-400">
                  <span className="font-semibold text-white tracking-wide">Steam Showcase Anatomy</span>
                  <span className="text-purple-300 font-mono">Custom Height</span>
                </div>

                {/* Sizing Badges */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  {STEAM_ARTWORK_WIDTHS.map((width) => (
                    <span
                      key={width}
                      className="px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 font-mono text-xs shadow-inner"
                    >
                      {width}px Width
                    </span>
                  ))}
                </div>

                {/* Steam Split Layout Preview */}
                <div className="flex gap-2 h-64 rounded-lg overflow-hidden p-2 bg-black/60 border border-gray-800">
                  <div className="flex-1 rounded bg-gradient-to-br from-purple-900/40 via-purple-950/20 to-black border border-purple-500/30 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-xs uppercase tracking-widest text-purple-300/90 font-medium">Main Showcase</span>
                    <span className="text-[11px] text-gray-400 mt-1 font-mono">506px (Split) / Full</span>
                  </div>
                  <div className="w-16 rounded bg-gradient-to-br from-purple-900/30 via-purple-950/10 to-black border border-purple-500/30 flex items-center justify-center text-[10px] text-purple-400/80 font-mono">
                    <span className="rotate-90 tracking-wider">SIDEBAR</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-center text-[11px] text-gray-400">
                  <div>Seamless Loop</div>
                  <div>Character Rig</div>
                  <div>Background Sync</div>
                </div>
              </div>
            </motion.div>
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

          <p className="text-gray-300 text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
            Steam Artworks are animated visuals you see on a custom Steam profile.
            They include moving backgrounds, dynamic showcases, and looping visuals that
            bring personality to your profile.
          </p>
          <p className="text-gray-400 text-sm mt-4 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Showcases are designed in standard Steam widths (<span className="text-purple-300 font-mono">614px</span>, <span className="text-purple-300 font-mono">626px</span>, or <span className="text-purple-300 font-mono">630px</span>) with custom, variable heights tailored to each animation and character.
          </p>
        </motion.div>
      </div>
    </section>
  );
}