'use client'

import { motion, useTransform, useScroll,MotionValue } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import TransitionLink from "../Components/TransitionLink";

type Event = {
    id:number,
    title:string,
    description:string,
    event_date:string,
    image:string,
    position:number
}

type EventProps ={
    events:Event[]
}

const Events = ({events}:EventProps) => {

  const wrapperRef = useRef(null);
  // Scroll range for the combined sticky section
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });


  
const topCardRefs = useRef<Record<number, HTMLDivElement | null>>({});

const TopCards = events.filter((items)=> items.position === 1) /// up / left positioned events

const BottomCards = events.filter((items)=>items.position === 2 ) 

console.log(TopCards)
/// down /right positioned events

  // Horizontal movement (adjust percentages if needed)
  const topX = useTransform(scrollYProgress, [0.1, 0.9], ["10%", "-80%"]);
  const bottomX = useTransform(scrollYProgress, [0.1, 0.9], ["10%", "-80%"]);

  return (
    <div className="bg-black h-full">
      <Navbar/>
      {/* This whole block will stick together */}
    <div className="empty h-[150px]"></div>

      <div ref={wrapperRef} className="hidden md:block relative  h-[300vh] w-full mask-x-from-70% mask-x-to-100%">
        
        {/* Combined sticky zone */}
        <div className="sticky top-0 h-screen flex flex-col justify-center gap-[100px] overflow-hidden">

          {/* TOP ROW */}
         <motion.div style={{ x: topX }} className="flex justify-between items-center">
        {TopCards.map(c => (
          <TimelineCard
            key={c.id}
            card={c}
            cardRef={el => (topCardRefs.current[c.id] = el)}
          />
        ))}
      </motion.div>
         
                <StraightLine
          topcards={TopCards} bottomcards={BottomCards}
          scrollX={topX}
        
        />
        
          {/* BOTTOM ROW */}
          <motion.div style={{ x: bottomX }} className="flex  justify-between items-center">
            {BottomCards.map(c => <TimelineCard2 key={c.id} card={c} />)}
          </motion.div>

        </div>
      </div>

       <div className="block md:hidden">
        <MobileEvent topcards={TopCards} bottomcards={BottomCards}/>
       </div>
    <div className="h-40"></div>
    </div>
  );
};



type DesktopEventProps = {
  topcards: Event[];
  bottomcards: Event[];
};

const StraightLine = ({
  topcards,
  bottomcards,
  scrollX,
}: {
  topcards: DesktopEventProps["topcards"];
  bottomcards: DesktopEventProps["bottomcards"];
  scrollX: MotionValue<string>;
}) => {
  const [alignedDate, setAlignedDate] = useState("Today");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Sort top and bottom columns individually like MobileEvent
  const allCardsSortedByColumn = () => {
    const topSorted = topcards
      .map(c => ({ ...c, position: 1 }))
      .sort(
        (a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
      );

    const bottomSorted = bottomcards
      .map(c => ({ ...c, position: 2 }))
      .sort(
        (a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
      );

    return [...topSorted, ...bottomSorted];
  };

  const cards = allCardsSortedByColumn();

  // Track the closest date to the center for "Today" marker
  useEffect(() => {
    const unsubscribe = scrollX.on("change", () => {
      if (!containerRef.current) return;

      const items = Array.from(
        containerRef.current.querySelectorAll("[data-date]")
      ) as HTMLElement[];

      const centerX = window.innerWidth / 2;

      let closest: HTMLElement | null = null;
      let min = Infinity;

      for (const el of items) {
        const rect = el.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const d = Math.abs(x - centerX);

        if (d < min) {
          min = d;
          closest = el;
        }
      }

      const date = closest?.dataset?.date;
      if (!date) return;

      const today = new Date().toLocaleDateString("en-US");
      const formatted = new Date(date).toLocaleDateString("en-US");

      setAlignedDate(formatted === today ? "Today" : formatted);
    });

    return () => unsubscribe();
  }, [scrollX]);

  return (
    <div className="relative w-full h-16">
      {/* BASE LINE */}
      <div className="absolute top-1/2 w-full h-0.5 bg-[#333]" />

      {/* DOTS */}
      <motion.div
        ref={containerRef}
        style={{ x: scrollX }}
        className="flex justify-between items-center px-[140px]"
      >
        {cards.map(card => (
          <div
            key={card.id}
            data-date={card.event_date}
            className={`flex flex-col items-center ${
              card.position === 1 ? "-translate-y-[75%]" : "translate-y-[75%]"
            }`}
          >
            <span className="text-xs text-gray-400">
              {new Date(card.event_date).toLocaleDateString("en-US")}
            </span>
            <div className="w-2 h-2 bg-gray-400 mt-2 -mb-2.5 rounded-full" />
          </div>
        ))}
      </motion.div>

      {/* TODAY MARKER */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="w-2.5 h-2.5 bg-yellow-300 rounded-full" />
        <span className="absolute top-8 text-yellow-300 text-sm whitespace-nowrap">
          {alignedDate}
        </span>
      </div>
    </div>
  );
};


type MobileEventProps = {
    topcards :Event[]
    bottomcards :Event[]
}

const MobileEvent = ({topcards,bottomcards}:MobileEventProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // ScrollY for vertical line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineTransform = useTransform(scrollYProgress, v => `scaleY(${v + 0.1})`);

  // Merge top + bottom, but keep track of original column (1 = top, 2 = bottom)
  const allCards = [
    ...topcards.map(c => ({ ...c, position: 1 })),
    ...bottomcards.map(c => ({ ...c, position: 2 })),
  ];

  // Sort everything by date
  const sortedCards = allCards.sort(
    (a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-screen h-auto flex items-start justify-between p-4"
    >
      {/* Column layout */}
      <div className="flex flex-col gap-[180px]">
        {sortedCards
          .filter(c => c.position === 1) // top column
          .map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <TimelineCard card={c} />
            </motion.div>
          ))}
      </div>

      {/* Vertical line */}
      <motion.div
        className="w-1 self-stretch bg-[#343434] origin-top"
        style={{ transform: lineTransform, transformOrigin: "top" }}
      />

      {/* Bottom column */}
      <div className="flex flex-col gap-[180px]">
        {sortedCards
          .filter(c => c.position === 2) // bottom column
          .map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <TimelineCard card={c} />
            </motion.div>
          ))}
      </div>
    </section>
  );
};


const TimelineCard = ({
  card,
  cardRef,
}: {
  card: Event;
  cardRef?: (el: HTMLDivElement | null) => void;
}) => (
 
    
  <div ref={cardRef}>
    <TransitionLink
    href={`/events/${card.id}`}
    className="relative flex flex-col items-center group hover:drop-shadow-[0_0_10px_#A6A255] transition-all duration-300 gap-2 flex-shrink-0"
  >

    <div className="w-[120px] h-[180px]  sm:w-[140px] sm:h-[220px] bg-neutral-700 rounded-lg overflow-hidden z-[10] relative">
      <div
        className="h-full w-full  group-hover:scale-110 transition-all duration-300"
        style={{
          backgroundImage: `url(http://localhost:3010${card.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
    <p className="text-white hidden sm:block z-100 text-xs sm:text-sm line-clamp-2 w-[140px] text-start pl-2">{card.title}</p>
    <p className="text-white block sm:hidden z-100 text-xs  sm:text-sm line-clamp-2 w-[140px] text-end">{new Date(card.event_date).toLocaleDateString("en-US")}</p>
    <span className="timeline-line"></span>
  </TransitionLink>
  </div>
);

const TimelineCard2 = ({ card }: { card: Event }) => (
  <TransitionLink
    href={`/events/${card.id}`}
    className={`relative flex flex-col sm:flex-col-reverse group transition-all duration-300 hover:drop-shadow-[0_0_10px_#A6A255] items-center gap-2 flex-shrink-0  sm:mt-0`}
  >
    <div className="w-[120px] h-[180px]  sm:w-[140px] sm:h-[220px] bg-neutral-700 rounded-lg overflow-hidden z-[10] relative">
      <div
        className="h-full w-full group-hover:scale-110 transition-all duration-300"
        style={{
          backgroundImage: `url(${card.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
    <p className="text-white hidden sm:block z-100 text-xs sm:text-sm line-clamp-2 w-[140px] text-start pl-2">{card.title}</p>
    <p className="text-white block sm:hidden z-100 text-xs  sm:text-sm line-clamp-2 w-[140px] text-end">{new Date(card.event_date).toLocaleDateString("en-US")}</p>
    <span className=" w-fit h-[1px] sm:w-[1px] sm:h-[55vh] z-1 left-0 sm:left-35 -translate-x-1/2 bg-gray-300/50 absolute top-0 sm:-top-[100px] pointer-events-none"></span>
  </TransitionLink>
);


export default Events;
