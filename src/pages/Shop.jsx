import React, { useRef, useState, useEffect, useMemo, useDeferredValue } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaCheck,
  FaTimes,
  FaSearch,
  FaFilter,
  FaUndo,
  FaChevronDown,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { artworks } from "../data/artworks";

function CustomSortDropdown({ sortOption, onSelectSort, isCooldown }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: "default", label: "Default (Featured)" },
    { value: "alpha-asc", label: "Alphabetical: A → Z" },
    { value: "alpha-desc", label: "Alphabetical: Z → A" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  const currentOption = options.find((o) => o.value === sortOption) || options[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Trigger Button with exact matching padding for text and custom arrow */}
      <button
        type="button"
        disabled={isCooldown}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#0d0a17] border text-sm transition-all select-none ${
          isCooldown ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        } ${
          isOpen
            ? "border-[#d33bd3] shadow-[0_0_15px_rgba(211,59,211,0.25)] text-white"
            : "border-white/10 hover:border-white/20 text-gray-200"
        }`}
      >
        <span className="font-medium truncate">{currentOption.label}</span>
        <FaChevronDown
          className={`text-xs text-pink-400 transition-transform duration-200 shrink-0 ml-2 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Custom Dropdown Menu with brand colors and dark glass styling */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#130f20] backdrop-blur-2xl border border-[#d33bd3]/50 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(211,59,211,0.25)] overflow-hidden py-1.5"
          >
            {options.map((opt) => {
              const isSelected = sortOption === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  disabled={isCooldown}
                  onClick={() => {
                    if (isCooldown) return;
                    onSelectSort(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-[#b66cc0]/25 via-[#d33bd3]/25 to-transparent text-white font-medium border-l-2 border-[#d33bd3]"
                      : "text-gray-300 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && (
                    <FaCheck className="text-pink-400 text-xs shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ArtworkCard({ art, onAddToCart }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "250px" } // Preload 250px before card scrolls into viewport
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) observer.unobserve(currentContainer);
    };
  }, []);

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
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col justify-between rounded-2xl bg-[#120f1e]/80 border border-white/10 hover:border-[#d33bd3]/60 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(211,59,211,0.2)] hover:-translate-y-2 p-5"
    >
      {/* Video Preview Frame */}
      <div
        className="relative aspect-[10/15] w-full rounded-xl overflow-hidden bg-black/80 flex items-center justify-center border border-white/5 select-none"
        onContextMenu={(e) => e.preventDefault()}
      >
        {isInView ? (
          <video
            ref={videoRef}
            src={art.video}
            loop
            muted
            playsInline
            preload="metadata"
            controlsList="nodownload"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            className="w-full h-full object-cover pointer-events-none select-none transition-opacity duration-300"
          />
        ) : (
          <div className="w-full h-full bg-[#0d0a17] flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-[#d33bd3]/20 border-t-[#d33bd3] animate-spin" />
          </div>
        )}
        {/* Transparent Protection Shield */}
        <div
          className="absolute inset-0 z-10 select-none"
          onContextMenu={(e) => e.preventDefault()}
        />
        {art.tag && (
          <span className="absolute top-3 left-3 z-20 px-3 py-1 text-[11px] font-medium tracking-wide rounded-full bg-black/70 backdrop-blur-md text-pink-300 border border-pink-500/30 select-none pointer-events-none">
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

  // Search, Category, and Sort Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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

  // Anti-spam cooldown state
  const [isCooldown, setIsCooldown] = useState(false);
  const cooldownTimerRef = useRef(null);

  const triggerCooldown = (duration = 300) => {
    setIsCooldown(true);
    if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    cooldownTimerRef.current = setTimeout(() => {
      setIsCooldown(false);
    }, duration);
  };

  const handleSelectCategory = (catKey) => {
    if (isCooldown || selectedCategory === catKey) return;
    setSelectedCategory(catKey);
    triggerCooldown(300);
  };

  const handleSelectSort = (sortKey) => {
    if (isCooldown || sortOption === sortKey) return;
    setSortOption(sortKey);
    triggerCooldown(300);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
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

  // Helper to match categories flexibly
  const isWorkshop = (cat) => cat && /workshop/i.test(cat);
  const isFeatured = (cat) => cat && /featured/i.test(cat);
  const isRegular = (cat) => cat && /regular/i.test(cat);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: artworks.length,
      workshop: artworks.filter((a) => isWorkshop(a.category)).length,
      featured: artworks.filter((a) => isFeatured(a.category)).length,
      regular: artworks.filter((a) => isRegular(a.category)).length,
    };
  }, []);

  // Deferred search value keeps typing dynamic and responsive without lag
  const deferredSearch = useDeferredValue(searchQuery);

  // Filter and Sort Pipeline
  const filteredArtworks = useMemo(() => {
    let result = [...artworks];

    // Search query filter (matches title, character, category, or tag)
    if (deferredSearch.trim()) {
      const q = deferredSearch.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          (a.character && a.character.toLowerCase().includes(q)) ||
          (a.category && a.category.toLowerCase().includes(q)) ||
          (a.tag && a.tag.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory === "workshop") {
      result = result.filter((a) => isWorkshop(a.category));
    } else if (selectedCategory === "featured") {
      result = result.filter((a) => isFeatured(a.category));
    } else if (selectedCategory === "regular") {
      result = result.filter((a) => isRegular(a.category));
    }

    // Sort order
    if (sortOption === "alpha-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "alpha-desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "price-asc") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return result;
  }, [deferredSearch, selectedCategory, sortOption]);

  // Batch loading & Infinite Scroll configuration
  const BATCH_SIZE = 12;
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const sentinelRef = useRef(null);

  // Reset pagination to first batch whenever filters, search, or sort change
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [deferredSearch, selectedCategory, sortOption]);

  const hasMore = visibleCount < filteredArtworks.length;

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + BATCH_SIZE, filteredArtworks.length)
          );
        }
      },
      {
        root: null,
        rootMargin: "350px", // Preloads next batch before reaching the very bottom
        threshold: 0.1,
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) observer.observe(currentSentinel);

    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
    };
  }, [hasMore, filteredArtworks.length]);

  const displayedArtworks = useMemo(() => {
    return filteredArtworks.slice(0, visibleCount);
  }, [filteredArtworks, visibleCount]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    sortOption !== "default";

  const handleResetFilters = () => {
    if (isCooldown && !hasActiveFilters) return;
    setSearchQuery("");
    setSelectedCategory("all");
    setSortOption("default");
    triggerCooldown(300);
  };

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
                    <div
                      className="relative w-12 h-16 rounded-lg overflow-hidden bg-black/80 shrink-0 border border-white/10 flex items-center justify-center select-none"
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <video
                        src={item.video}
                        muted
                        playsInline
                        controlsList="nodownload"
                        disablePictureInPicture
                        onContextMenu={(e) => e.preventDefault()}
                        className="w-full h-full object-cover pointer-events-none select-none"
                      />
                      <div
                        className="absolute inset-0 z-10 select-none"
                        onContextMenu={(e) => e.preventDefault()}
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
      <header className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 py-8 flex items-center justify-between">
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
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-6 sm:px-10 pb-24">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#b66cc0] via-[#d33bd3] to-[#760aa8]">
            Steam Artworks
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-400 font-light leading-relaxed">
            High-quality animated profile showcases &amp; custom workshops ready for instant delivery.
          </p>
        </div>

        {/* Two-Column Layout: Left Sticky Filter Sidebar + Right Artwork Grid */}
        <div className="flex flex-col lg:flex-row items-start gap-8 xl:gap-10">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden w-full flex items-center justify-between gap-3 bg-[#120f1e]/90 border border-white/10 rounded-xl p-3 backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#b66cc0]/20 to-[#d33bd3]/20 border border-[#d33bd3]/40 text-white text-sm font-medium cursor-pointer"
            >
              <FaFilter className="text-pink-400 text-xs" />
              <span>{mobileFiltersOpen ? "Hide Filters" : "Filters & Search"}</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
              )}
            </button>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-pink-400 hover:text-pink-300 font-medium transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Desktop Left Sticky Filter Panel & Mobile Collapsible Filter Drawer */}
          <aside
            className={`relative z-30 w-full lg:w-72 xl:w-80 shrink-0 lg:sticky lg:top-8 bg-[#120f1e]/90 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all ${
              mobileFiltersOpen ? "block" : "hidden lg:block"
            }`}
          >
            {/* Top Cooldown Loading Bar */}
            <div
              className={`absolute top-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-[#b66cc0] via-[#d33bd3] to-[#f748f7] transition-all duration-300 ${
                isCooldown ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 pointer-events-none"
              }`}
            />

            {/* Panel Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2 text-white font-semibold text-base">
                <FaFilter className="text-pink-400 text-sm" />
                <span>Filters</span>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  disabled={isCooldown}
                  onClick={handleResetFilters}
                  className="text-xs text-pink-400 hover:text-pink-300 flex items-center gap-1.5 font-medium transition-colors cursor-pointer py-1 px-2 rounded-md hover:bg-white/5 disabled:opacity-50"
                >
                  <FaUndo className="text-[10px]" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Search Input */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Search Artworks
              </label>
              <div className="relative">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search character, title..."
                  className="w-full bg-[#0d0a17] border border-white/10 focus:border-[#d33bd3] rounded-xl pl-9 pr-8 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#d33bd3] transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer p-0.5"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2.5">
                Artwork Type
              </label>
              <div className="space-y-1.5 relative">
                {[
                  { key: "all", label: "All Artworks", count: categoryCounts.all },
                  { key: "workshop", label: "Steam Workshops", count: categoryCounts.workshop },
                  { key: "featured", label: "Featured Artworks", count: categoryCounts.featured },
                  { key: "regular", label: "Regular Artworks", count: categoryCounts.regular },
                ].map((cat) => {
                  const isActive = selectedCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      disabled={isCooldown}
                      onClick={() => handleSelectCategory(cat.key)}
                      className={`relative w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-all select-none ${
                        isCooldown && !isActive ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                      } ${
                        isActive
                          ? "text-white font-semibold"
                          : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      {/* Animated pill background that smoothly slides between buttons */}
                      {isActive && (
                        <motion.div
                          layoutId="activeCategoryPill"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#b66cc0]/25 via-[#d33bd3]/25 to-[#760aa8]/25 border border-[#d33bd3]/60 shadow-[0_0_20px_rgba(211,59,211,0.2)] pointer-events-none"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}

                      <span className="relative z-10">{cat.label}</span>
                      <span
                        className={`relative z-10 text-[11px] px-2 py-0.5 rounded-full font-mono font-medium transition-colors ${
                          isActive
                            ? "bg-[#d33bd3]/35 text-pink-200 border border-[#d33bd3]/40"
                            : "bg-white/5 text-gray-400"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2.5">
                Sort By
              </label>
              <CustomSortDropdown
                sortOption={sortOption}
                onSelectSort={handleSelectSort}
                isCooldown={isCooldown}
              />
            </div>
          </aside>

          {/* Right Column: Active Filter Chips + Artwork Grid */}
          <div className="flex-1 min-w-0 w-full">
            {/* Active Filters Bar */}
            {hasActiveFilters && (
              <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-gray-400 font-medium mr-1">Active:</span>

                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d33bd3]/15 border border-[#d33bd3]/30 text-pink-200">
                    <span>"{searchQuery}"</span>
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="hover:text-white transition-colors cursor-pointer ml-0.5"
                    >
                      <FaTimes className="text-[10px]" />
                    </button>
                  </span>
                )}

                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d33bd3]/15 border border-[#d33bd3]/30 text-pink-200">
                    <span>
                      {selectedCategory === "workshop"
                        ? "Steam Workshop"
                        : selectedCategory === "featured"
                        ? "Featured Artwork"
                        : "Regular Artwork"}
                    </span>
                    <button
                      type="button"
                      disabled={isCooldown}
                      onClick={() => handleSelectCategory("all")}
                      className="hover:text-white transition-colors cursor-pointer ml-0.5 disabled:opacity-50"
                    >
                      <FaTimes className="text-[10px]" />
                    </button>
                  </span>
                )}

                {sortOption !== "default" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d33bd3]/15 border border-[#d33bd3]/30 text-pink-200">
                    <span>
                      {sortOption === "alpha-asc"
                        ? "A → Z"
                        : sortOption === "alpha-desc"
                        ? "Z → A"
                        : sortOption === "price-asc"
                        ? "Price: Low to High"
                        : "Price: High to Low"}
                    </span>
                    <button
                      type="button"
                      disabled={isCooldown}
                      onClick={() => handleSelectSort("default")}
                      className="hover:text-white transition-colors cursor-pointer ml-0.5 disabled:opacity-50"
                    >
                      <FaTimes className="text-[10px]" />
                    </button>
                  </span>
                )}

                <button
                  type="button"
                  disabled={isCooldown}
                  onClick={handleResetFilters}
                  className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer ml-2 underline underline-offset-2 disabled:opacity-50"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Grid or Empty State with Infinite Scroll */}
            {filteredArtworks.length > 0 ? (
              <div className="flex flex-col w-full">
                <motion.div
                  key={`${selectedCategory}-${sortOption}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8"
                >
                  {displayedArtworks.map((art) => (
                    <ArtworkCard
                      key={art.id}
                      art={art}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </motion.div>

                {/* Infinite Scroll Sentinel / Subtle Brand Loader */}
                {hasMore && (
                  <div
                    ref={sentinelRef}
                    className="w-full py-12 flex flex-col items-center justify-center gap-3 text-gray-400"
                  >
                    <div className="w-7 h-7 rounded-full border-2 border-[#d33bd3]/20 border-t-[#d33bd3] animate-spin" />
                    <span className="text-xs text-gray-400 font-medium">Loading more artworks...</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full py-20 px-6 rounded-2xl bg-[#120f1e]/50 border border-white/10 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-4">
                  <FaSearch className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Artworks Found</h3>
                <p className="text-sm text-gray-400 max-w-md mb-6 leading-relaxed">
                  No artworks matched your search query or selected filters. Try broadening your criteria or reset your filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-[#b66cc0] via-[#d33bd3] to-[#760aa8] hover:shadow-[0_0_20px_rgba(211,59,211,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <FaUndo className="text-xs" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </motion.div>
  );
}
