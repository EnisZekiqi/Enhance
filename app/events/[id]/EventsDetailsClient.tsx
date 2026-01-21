'use client'

import { motion } from "motion/react";
import Navbar from "@/app/Components/Navbar";

type Event = {
    title:string,
    description:string,
    event_date:string,
    image:string,
}

const EventDetailClient = ({ event }: { event: Event }) => {

    const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25
    }
  }
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 15
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      delay:0.67,
      ease: 'easeOut'as const
    }
  }
}

  return (
    <>
      <Navbar />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-8 text-white flex flex-col sm:flex-row gap-6"
      >
        <motion.img
        variants={itemVariants}
          src={`http://localhost:3010${event.image}`}
          alt={event.title}
          className="w-full max-w-2/4 rounded-lg"
        />

        <div className="flex flex-col items-start max-w-2/4">
          <p className="text-white/60">
            {new Date(event.event_date).toLocaleDateString()}
          </p>

          <h1 className="text-3xl font-bold mt-2">
            {event.title}
          </h1>

          <p className="mt-6 text-lg">
            {event.description}
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default EventDetailClient;
