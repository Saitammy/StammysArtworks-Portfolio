import React from 'react';
import { motion } from 'framer-motion';
import { FaBehance, FaDiscord } from 'react-icons/fa';
import { FaSteamSymbol } from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';

const socialLinks = [
  { 
    Icon: FaBehance, 
    label: "Behance", 
    href: "https://www.behance.net/sampreetkishan" 
  },
  { 
    Icon: FaSteamSymbol, 
    label: "Steam", 
    href: "https://steamcommunity.com/id/stemmystummy/" 
  },
  { 
    Icon: FaDiscord, 
    label: "Discord", 
    href: "https://discord.gg/BVcaaRuMXD" 
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Contact() {
  return (
    <section 
      id="contact" 
      className="w-full bg-black px-4 md:px-8 py-24"
    >
      <div className="max-w-3xl mx-auto w-full text-center">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-center mb-4
          bg-clip-text text-transparent bg-gradient-to-r
          from-[#b66cc0] via-[#d33bd3] to-[#760aa8]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Get in Touch
        </motion.h2>

        <motion.p
          className="text-lg text-gray-300 mb-10"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Choose your preferred way to contact me.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {socialLinks.map(({ Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 text-white p-6 rounded-lg flex items-center justify-center gap-3 text-lg font-medium border-2 border-gray-900 transition-colors hover:border-[#d33bd3]"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Icon className="w-6 h-6" />
              <span>{label}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="flex items-center gap-4 my-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex-grow h-px bg-gray-700"></div>
          <span className="text-gray-400 font-medium">OR</span>
          <div className="flex-grow h-px bg-gray-700"></div>
        </motion.div>

        <motion.a
          href="mailto:stammylive@gmail.com"
          className="px-10 py-4 w-full rounded-full font-bold text-xl text-white bg-gradient-to-r from-[#b66cc0] via-[#d33bd3] to-[#760aa8] shadow-lg transition-all hover:scale-105 hover:shadow-[#d33bd3]/50 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <HiOutlineMail className="w-7 h-7" />
          <span>stammylive@gmail.com</span>
        </motion.a>
      </div>
    </section>
  );
}