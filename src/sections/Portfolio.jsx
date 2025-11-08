import { motion, useMotionValue, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Sukuna from "../assets/videos/SukunaRender.mp4";
import Goth from "../assets/videos/GothRender.mp4";
import Lucia from "../assets/videos/LuciaRender.mp4";
import Yuzuriha from "../assets/videos/YuzurihaRender.mp4";
import AmeChan from "../assets/videos/AmeChanRender.mp4";
import Ilumi from "../assets/videos/IlumiRender.mp4";
import Lina from "../assets/videos/LinaRender.mp4";
import Titan from "../assets/videos/TitanRender.mp4";

const ITEM_WIDTH_WITH_GAP = 340;
const RENDER_BUFFER = 2;

export default function Portfolio() {
  const artworks = [
    { src: Sukuna, name: "Sukuna" },
    { src: Goth, name: "Goth Girl" },
    { src: Lucia, name: "Lucia" },
    { src: Yuzuriha, name: "Yuzuriha" },
    { src: AmeChan, name: "Ame Chan" },
    { src: Ilumi, name: "Ilumi" },
    { src: Lina, name: "Lina" },
    { src: Titan, name: "Titan" },
  ];

  const FULL_LENGTH = artworks.length;
  const repeated = [...artworks, ...artworks];
  const [dir, setDir] = useState(-1);
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null);
  const x = useMotionValue(0);

  const [currentX, setCurrentX] = useState(0);

  useEffect(() => {
    const unsubscribe = x.on("change", (latestX) => {
      setCurrentX(latestX);
    });
    return () => unsubscribe();
  }, [x]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
      },
      { threshold: [0.1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;

    const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1);
    const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
    const onTouchMove = (e) => {
      if (touchY.current == null) return;
      const delta = e.touches[0].clientY - touchY.current;
      setDir(delta > 0 ? 1 : -1);
      touchY.current = e.touches[0].clientY;
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [active]);

  useEffect(() => {
    let id;
    let last = performance.now();
    const SPEED = 80;

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      let next = x.get() + SPEED * dir * dt;
      const loop = trackRef.current?.scrollWidth / 2 || 0;

      if (loop) {
        if (next <= -loop) next += loop;
        if (next >= 0) next -= loop;
      }
      x.set(next);
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [dir, x]);

  const isItemVisible = (i) => {
    if (!trackRef.current) return false;

    const loopWidth = FULL_LENGTH * ITEM_WIDTH_WITH_GAP;
    let normalizedX = currentX % loopWidth;
    if (normalizedX > 0) normalizedX -= loopWidth;

    const firstVisibleIndex = Math.floor(
      Math.abs(normalizedX) / ITEM_WIDTH_WITH_GAP
    );
    const lastVisibleIndex =
      firstVisibleIndex +
      Math.ceil(trackRef.current.clientWidth / ITEM_WIDTH_WITH_GAP);

    const minIndex = firstVisibleIndex - RENDER_BUFFER;
    const maxIndex = lastVisibleIndex + RENDER_BUFFER;

    const isVisibleInFirstHalf = i >= minIndex && i <= maxIndex;
    const isVisibleInSecondHalf =
      i >= minIndex + FULL_LENGTH && i <= maxIndex + FULL_LENGTH;

    return isVisibleInFirstHalf || isVisibleInSecondHalf;
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="w-full relative bg-black text-white overflow-hidden py-24"
    >
      <motion.h2
        className="text-4xl mt-5 sm:text-5xl font-bold
        bg-clip-text text-transparent bg-gradient-to-r
        from-[#b66cc0] via-[#d33bd3] to-[#760aa8] 
        z-10 leading-[1.3] text-center mx-auto"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        Portfolio
      </motion.h2>

      <motion.p
        className="mt-2 mb-8 text-white/90 text-base sm:text-lg z-10 text-center mx-auto max-w-lg"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        My personal top projects for clients across the globe!
      </motion.p>

      <div className="relative w-full overflow-visible">
        <motion.div
          ref={trackRef}
          className="flex gap-10 px-10"
          style={{ x, whiteSpace: "nowrap", willChange: "transform" }}
        >
          {repeated.map((s, i) => {
            const isRendered = isItemVisible(i);

            return (
              <div
                key={i}
                className="flex flex-col items-center gap-3 min-w-[340px]"
                aria-label={s.name}
                title={s.name}
              >
                {isRendered ? (
                  <video
                    src={s.src}
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => {
                      trackRef.current
                        ?.querySelectorAll("video")
                        .forEach((video) => {
                          if (video !== e.currentTarget) {
                            video.pause();
                          }
                        });
                      e.currentTarget.play();
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                    }}
                    className="rounded-xl w-[300px] h-[450px] object-cover shadow-lg hover:scale-105 hover:shadow-[#d33bd3]/50 transition-all duration-500"
                  />
                ) : (
                  <div className="rounded-xl w-[300px] h-[450px] bg-gray-900/50 flex items-center justify-center text-gray-500">
                    Loading...
                  </div>
                )}
                <p className="text-sm text-white/80 mt-1">{s.name}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}