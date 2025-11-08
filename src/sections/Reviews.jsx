import React from 'react';
import { motion } from 'framer-motion';

const StarIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path
      clipRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.433c1.164.093 1.636 1.545.799 2.318l-4.21 3.621 1.256 5.38c.275 1.17-1.016 2.06-2.028 1.465l-4.89-2.677-4.89 2.677c-1.012.595-2.303-.295-2.028-1.465l1.256-5.38-4.21-3.621c-.837-.773-.366-2.225.799-2.318l5.404-.433 2.082-5.006z"
      fillRule="evenodd"
    />
  </svg>
);

const ReviewCard = ({ title, review, author, rating }) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg flex flex-col h-full p-6">
      <div className="flex items-center mb-2">
        {Array(rating).fill(0).map((_, i) => (
          <StarIcon 
            key={i} 
            className="w-6 h-6 text-[#d33bd3]" 
          />
        ))}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-sm mb-4 flex-grow">{review}</p>
      <p className="text-gray-400 text-xs font-medium">{author}</p>
    </div>
  );
};

const reviewsData = [
  {
    id: 1,
    title: "Absolutely Stunning",
    review: "Do not hesitate to order from Stammy, he is very talented, artworks are really impressive for the price, also he is really kind. :)",
    author: "Asuyiki",
    rating: 5,
  },
  {
    id: 2,
    title: "Insane Quality!",
    review: "Stammy's animation work is next level. He turned my static wallpaper into a masterpiece for my Steam profile. Super fast delivery too!",
    author: "Zahkrii",
    rating: 5,
  },
  {
    id: 3,
    title: "Best Steam Designer",
    review: "My profile has never looked better. The motion effects are subtle but so, so good. Stammy was also great to work with, very patient.",
    author: "Koops",
    rating: 5,
  },
  {
    id: 4,
    title: "Worth Every Penny",
    review: "I'm picky about my Steam profile, but Stammy nailed it. The character animation is flawless. 100% worth the price for this level of talent.",
    author: "Linda",
    rating: 5,
  },
  {
    id: 5,
    title: "Beyond Talented",
    review: "Gave him a complex idea for an artwork and he delivered something even better than I imagined. He's a true motion artist. Highly recommend!",
    author: "ByTark",
    rating: 5,
  },
  {
    id: 6,
    title: "Amazing Communication & Skill",
    review: "If you want your Steam profile to stand out, Stammy is the person to go to. Incredibly skilled and very friendly. The whole process was perfect.",
    author: "Strade",
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <section 
      id="reviews" 
      className="w-full bg-black px-4 md:px-8 py-24"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-center mb-12
          bg-clip-text text-transparent bg-gradient-to-r
          from-[#b66cc0] via-[#d33bd3] to-[#760aa8]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          viewport={{ once: true }}
        >
          What Our Clients Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewsData.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="h-full"
            >
              <ReviewCard {...review} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}