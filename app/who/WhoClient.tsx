"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Navbar from "../Components/Navbar";
import React from "react";

/* ---------------- TYPES ---------------- */

type Who = {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string | null;
};

type WhoProps = {
  who: Who[]; // expected: 5 cards
};

/* ---------------- GRID CONFIG ---------------- */

const GRID_SLOTS = 8; // 4 cols x 2 rows

// Visual card slots (0-based)
const VISIBLE_SLOT_INDEXES = [0, 1, 3, 4, 6];

// Hidden slots for layout
const HIDDEN_SLOT_INDEXES = [2, 5, 7];

// Map each card slot to the hidden neighbor slot it should hide on expansion
const NEIGHBOR_SLOT_MAP: Record<number, number> = {
  0: 2, // card 1 → hide slot 3
  1: 2, // card 2 → hide slot 3
  3: 2, // card 4 → hide slot 6
  4: 5, // card 5 → hide slot 6
  6: 7, // card 7 → hide slot 8
};

/* ---------------- COMPONENT ---------------- */

const Who = ({ who }: WhoProps) => {
  const [activeSlot, setActiveSlot] = useState<number | null>(null);

  // Helper to get the card for a slot
  const getCardForSlot = (slotIndex: number) => {
    const dataIndex = VISIBLE_SLOT_INDEXES.indexOf(slotIndex);
    return dataIndex !== -1 ? who[dataIndex] : null;
  };

  return (
    <section className="h-full w-full flex flex-col items-center">
      <Navbar />

      <div className="grid2">
        {Array.from({ length: GRID_SLOTS }).map((_, slotIndex) => {
          const card = getCardForSlot(slotIndex);

          // Determine neighbor slot to hide
          const neighborToHide =
            activeSlot !== null ? NEIGHBOR_SLOT_MAP[activeSlot] : null;

          // Completely remove hidden neighbor slot when its card is active
          if (
            HIDDEN_SLOT_INDEXES.includes(slotIndex) &&
            slotIndex === neighborToHide
          ) {
            return null;
          }

          // Render empty placeholder for remaining hidden slots
          if (!card) {
            return (
              <div
                key={`slot-${slotIndex}`}
                className="card-placeholder w-[310px] h-[330px] sm:w-[330px] sm:h-[350px]"
              />
            );
          }

          const isActive = slotIndex === activeSlot;

          return (
            <motion.div
              key={card.id}
              layout
              layoutId={`card-${card.id}`}
              onClick={() =>
                setActiveSlot(isActive ? null : slotIndex)
              }
              transition={{ layout: { duration: 0.45, type: "spring" } }}
              className={`card ${
                isActive ? "active" : ""
              } flex flex-col sm:flex-row`}
            >
              {/* DEFAULT CONTENT */}
              <motion.div  layout >
    <DefaultContent isActive={isActive} img={card.image} name={card.name} />
  </motion.div>

              {/* EXPANDED CONTENT */}
              <motion.div
                layout
                initial={false}
                animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 20,
                }}
                transition={{ duration: 0.30 }}
                style={{
                    display: isActive ? "block" : "none",
                    pointerEvents: isActive ? "auto" : "none",
                }}
                className="inset-0 pl-0 pt-4 sm:pl-4 z-20 text-white w-full h-full"
                >
                <ExpandedContent
                  id={card.id}
                  name={card.name}
                  title={card.title}
                  describe={card.description}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

/* ---------------- DEFAULT CARD ---------------- */

type CardProps = {
  id?: number;
  title?: string;
  img?: string | null;
  isActive?: boolean;
  name?: string;
  describe?: string;
};

function DefaultContent({
  isActive = false,
  img,
  name,
}: CardProps) {
  const [hovered, setHovered] = useState(false);
  const activeHover = isActive || hovered;

  const imgUrl = img?.startsWith("/")
    ? `http://localhost:3010${img}`
    : `http://localhost:3010/${img}`;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        w-[310px] h-[330px] sm:w-[330px] sm:h-[350px]
        rounded-lg p-2 bg-cover bg-center transition-all
        ${activeHover ? "grayscale-0 brightness-100" : "grayscale brightness-90"}
      `}
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      <h1
        className={`text-xl font-medium transition-colors ${
          activeHover ? "text-yellow-300" : "text-white"
        }`}
      >
        {name}
      </h1>
    </div>
  );
}

/* ---------------- EXPANDED CONTENT ---------------- */

const ExpandedContent = React.memo(function ExpandedContent({
  name,
  title,
  describe,
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
     className="flex flex-col items-start justify-between gap-4 sm:gap-0 w-full h-full"
    >
      <div>
        <h3 className="text-yellow-300 text-lg">{name}</h3>
        <p className="text-yellow-300 font-light">{title}</p>
        <p className="text-white mt-4">{describe}</p>
      </div>

      <button className="border border-yellow-300 text-yellow-300 rounded-lg p-2">
        Contact Me
      </button>
    </motion.div>
  );
});

export default Who;
