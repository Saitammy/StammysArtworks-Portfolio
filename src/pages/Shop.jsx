import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart, FaCheck, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { artworks } from "../data/artworks";

function ArtworkCard({ art, onAddToCart }) {
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
          className="w-full h-full object-cover"
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
            onClick={() => onAddToCart(art)}
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
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const timerRef = useRef(null);

  const startDismissTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsCartOpen(false);
    }, 4500);
  };

  const handleAddToCart = (art) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === art.id);
      if (exists) {
        return prev.map((item) =>
          item.id === art.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...art, quantity: 1 }];
    });

    setIsCartOpen(true);
    startDismissTimer();
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      if (updated.length === 0) {
        setIsCartOpen(false);
      }
      return updated;
    });
    startDismissTimer();
  };

  const handleMouseEnterModal = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleMouseLeaveModal = () => {
    startDismissTimer();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const totalItemsCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-screen bg-black text-white relative flex flex-col"
    >
      {/* Fixed Top-Right Added to Cart Modal Popup */}
      <AnimatePresence>
        {isCartOpen && cartItems.length > 0 && (
          <motion.div
            key="cart-modal"
            initial={{ opacity: 0, y: -20, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, x: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={handleMouseEnterModal}
            onMouseLeave={handleMouseLeaveModal}
            className="fixed top-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm sm:w-96 rounded-2xl bg-[#141021]/95 border border-[#d33bd3]/40 shadow-[0_12px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(211,59,211,0.25)] backdrop-blur-xl p-4 text-white flex flex-col"
          >
            {/* Header with status badge, count, and close button */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                <FaCheck className="text-[10px]" />
                <span>Added to cart</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-medium">
                  {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"}
                </span>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Close notification"
                  className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
            </div>

            {/* List of Cart Items */}
            <div className="max-h-56 overflow-y-auto pr-1.5 my-3 space-y-2.5 divide-y divide-white/5 custom-cart-scrollbar">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-3 pt-2.5 first:pt-0">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    {/* Thumbnail */}
                    <div className="w-12 h-16 rounded-lg overflow-hidden bg-black/80 shrink-0 border border-white/10 flex items-center justify-center">
                      <video
                        src={item.video}
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold text-white truncate">
                        <span>{item.title}</span>
                        {item.quantity > 1 && (
                          <span className="text-pink-400 font-bold ml-1.5">
                            x{item.quantity}
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {item.category}
                      </p>
                      <div className="flex items-center justify-between mt-1 text-xs">
                        <span className="text-pink-300 font-bold text-sm">
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button at Top Right */}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    title="Remove item"
                    className="text-gray-500 hover:text-red-400 p-1 transition-colors text-xs cursor-pointer shrink-0 mt-0.5"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Total Value */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="block text-[11px] text-gray-400 uppercase tracking-wider">
                  Cart Total
                </span>
                <span className="text-2xl font-bold text-white tracking-tight">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-pink-500/10 text-pink-300 border border-pink-500/20">
                {totalItemsCount} {totalItemsCount === 1 ? "Artwork" : "Artworks"}
              </span>
            </div>

            {/* Bottom info row */}
            <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
              <span>Ready for checkout</span>
              <span className="text-pink-400 font-medium">Checkout coming soon</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation Bar */}
      <header className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-8 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors text-sm sm:text-base font-medium group cursor-pointer"
        >
          <FaArrowLeft className="text-xs transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        {/* Cart Toggle in Header */}
        {cartItems.length > 0 && (
          <button
            type="button"
            onClick={() => setIsCartOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#141021] border border-white/10 hover:border-[#d33bd3]/50 text-white text-xs sm:text-sm font-medium transition-all hover:scale-105 cursor-pointer shadow-lg"
          >
            <FaShoppingCart className="text-pink-400 text-xs" />
            <span>Cart</span>
            <span className="px-1.5 py-0.2 rounded-full bg-gradient-to-r from-[#b66cc0] to-[#d33bd3] text-white text-[11px] font-bold">
              {totalItemsCount}
            </span>
          </button>
        )}
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
            <ArtworkCard key={art.id} art={art} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </main>
    </motion.div>
  );
}
