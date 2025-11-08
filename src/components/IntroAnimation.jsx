import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function IntroAnimation({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = 3000;
    const interval = 30;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((p) => {
        if (p + step >= 100) {
          clearInterval(timer);
          setTimeout(() => setVisible(false), 500);
          return 100;
        }
        return p + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <div className="flex items-end mb-10">
            <motion.h1
              className="text-5xl font-bold mr-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Hello
            </motion.h1>
            <div className="flex space-x-1">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  className="w-2 h-2 bg-white rounded-full inline-block"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 0.1,
                    delay: dot * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="w-[60%] max-w-3xl h-4 bg-gray-800 rounded-full overflow-hidden shadow-lg">
            <motion.div
              className="h-full bg-gradient-to-r from-[#b66cc0] via-[#d33bd3] to-[#760aa8]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{
                ease: [0.2, 0, 0.3, 1],
                duration: 0.4,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
