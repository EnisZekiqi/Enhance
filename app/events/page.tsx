'use client'

import { motion, useTransform, useScroll } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import TransitionLink from "../Components/TransitionLink";
import { time } from "console";

type Card = {
  title:string,
  titlefr:string,
  id:number,
  description:string,
  date:string,
  descriptionfr:string,
  img:string,
  margin:string
}

 const date = new Date();
const formattedDate = date.toLocaleString('en-US', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});
  // Example output: "November 19, 2025"

 const dest = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, eligendi dicta itaque eaque necessitatibus quam deserunt doloribus aperiam voluptates mollitia tempora pariatur, nulla rem eos ad sunt assumenda eveniet cum! Quas mollitia amet itaque aperiam enim dolor magni in, voluptatum temporibus beatae ea corporis numquam neque iste facere animi esse nesciunt? Asperiores, pariatur vitae eveniet libero distinctio repellendus! Voluptate, tempore.Odit, veniam eius accusantium voluptates, minus incidunt commodi aspernatur non animi autem ut. Aliquid nisi impedit fugit dolorem doloribus beatae iure corporis! Odit asperiores magni excepturi iusto quasi ipsum molestias?Sunt rerum beatae recusandae laudantium, quis nostrum aspernatur, repellat hic animi repellendus non eaque quod, rem explicabo ipsam dignissimos odit esse earum! Impedit repellat inventore sit esse facere! Quae, libero.Cupiditate, animi, vitae corporis quisquam, illo voluptates cumque distinctio perspiciatis expedita exercitationem temporibus totam iusto dicta eveniet laboriosam magni possimus quaerat! Quisquam sed quidem expedita voluptate at. Qui, blanditiis voluptate?'

console.log(formattedDate);

const topcards = [
  {
    id:1,
    title:'I did improve… yet I still need assistance… that\'s why I\'m feeling down.',
    titlefr:'J\'ai progressé… mais j\'ai encore besoin d\'aide… c\'est pour ça que je suis déprimé.',
    date:'01/9/2025',
    description:dest,
    descriptionfr:'',
    img:'https://images.unsplash.com/photo-1763046287602-7f878927101f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8',margin:'35px'
  },
  {id:2,title:'Innovation Through Collaboration',titlefr:'Innovation Par Collaboration',date:'01/03/2025',description:dest,descriptionfr:'',img:'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnRzfGVufDB8fDB8fHww',margin:'30px'},
  {id:3,title:'Building Tomorrow\'s Solutions',titlefr:'Construire les Solutions de Demain',date:'02/15/2025',description:dest,descriptionfr:'',img:'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.0',margin:'22px'},
  {id:4,title:'Growth and Development',titlefr:'Croissance et Développement',date:'03/22/2025',description:dest,descriptionfr:'',img:'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.0',margin:'-15px'},
{id:10,title:'Success Story',titlefr:'Histoire de Succès',date:'04/30/2025',description:dest,descriptionfr:'',img:'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.0',margin:'20px'},
 {id:5,title:'Breakthrough Moment',titlefr:'Moment de Percée',date:'05/10/2025',description:dest,descriptionfr:'',img:'https://images.unsplash.com/photo-1556125574-d7f27ec36a06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZXZlbnRzfGVufDB8fDB8fHww',margin:'-25px'},
  {id:6,title:'Future Prospects',titlefr:'Perspectives Futures',date:'06/18/2025',description:dest,descriptionfr:'',img:'https://plus.unsplash.com/premium_photo-1664790560123-c5f839457591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZXZlbnRzfGVufDB8fDB8fHww',margin:'-20px'},
]

const bottomcards = [
  
  {id:7,title:'Continuous Improvement',titlefr:'Amélioration Continue',date:'07/25/2025',description:dest,descriptionfr:'',img:'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.0',margin:'15px'},
  {id:8,title:'Success Story',titlefr:'Histoire de Succès',date:'08/30/2025',description:dest,descriptionfr:'',img:'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D',margin:'20px'}

];



const Events = () => {
  const wrapperRef = useRef(null);
  // Scroll range for the combined sticky section
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  
const topCardRefs = useRef<Record<number, HTMLDivElement | null>>({});

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
        {topcards.map(c => (
          <TimelineCard
            key={c.id}
            card={c}
            cardRef={el => (topCardRefs.current[c.id] = el)}
          />
        ))}
      </motion.div>
         
                <StraightLine
          cards={topcards}
          scrollX={topX}
        
        />
        
          {/* BOTTOM ROW */}
          <motion.div style={{ x: bottomX }} className="flex  justify-between items-center">
            {bottomcards.map(c => <TimelineCard2 key={c.id} card={c} />)}
          </motion.div>

        </div>
      </div>

       <div className="block md:hidden">
        <MobileEvent/>
       </div>
    <div className="h-40"></div>
    </div>
  );
};



const StraightLine = ({
  cards,
  scrollX,
}: {
  cards: Card[];
  scrollX: any;
}) => {
  const [alignedDate, setAlignedDate] = useState("Today");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsubscribe = scrollX.on("change", () => {
      if (!containerRef.current) return;

      const items = containerRef.current.querySelectorAll("[data-date]");
      const centerX = window.innerWidth / 2;

      let closest: HTMLElement | null = null;
      let min = Infinity;

      items.forEach(el => {
        const rect = el.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const d = Math.abs(x - centerX);

        if (d < min) {
          min = d;
          closest = el as HTMLElement;
        }
      });

      if (closest) {
        const date = closest.dataset.date!;
        const today = new Date().toLocaleDateString("en-US");
        const formatted = new Date(date).toLocaleDateString("en-US");
        setAlignedDate(formatted === today ? "Today" : formatted);
      }
    });

    return () => unsubscribe();
  }, [scrollX]);


 const today = new Date().toLocaleDateString("en-US");

const workTodayDate = (date:string) => {
  if (date === today) {
    
  }
}

  return (
    <div className="relative w-full h-16">
      {/* BASE LINE */}
      <div className="absolute top-1/2 w-full h-0.5 bg-[#333]" />

      {/* DOTS — SAME STRUCTURE AS TOP CARDS */}
      <motion.div
        ref={containerRef}
        style={{ x: scrollX }}
        className="flex justify-between items-center px-[140px]"
      >
        {cards.map(card => (
          <div
            key={card.id}
            data-date={card.date}
            className="flex flex-col items-center -translate-y-[75%]"
          >
            <span className="text-xs text-gray-400">
              {new Date(card.date).toLocaleDateString("en-US")}
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



const MobileEvent = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // ScrollY for vertical line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineTransform = useTransform(scrollYProgress, v => `scaleY(${v + 0.1})`);

  // Merge top + bottom, but keep track of original column (1 = top, 2 = bottom)
  const allCards = [
    ...topcards.map(c => ({ ...c, column: 1 })),
    ...bottomcards.map(c => ({ ...c, column: 2 })),
  ];

  // Sort everything by date
  const sortedCards = allCards.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-screen h-auto flex items-start justify-between p-4"
    >
      {/* Column layout */}
      <div className="flex flex-col gap-[180px]">
        {sortedCards
          .filter(c => c.column === 1) // top column
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
          .filter(c => c.column === 2) // bottom column
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
  card: Card;
  cardRef?: (el: HTMLDivElement | null) => void;
}) => (
  <TransitionLink
    ref={cardRef}
    href={`/events/${card.id}`}
    className="relative flex flex-col items-center group hover:drop-shadow-[0_0_10px_#A6A255] transition-all duration-300 gap-2 flex-shrink-0"
  >

    <div className="w-[120px] h-[180px]  sm:w-[140px] sm:h-[220px] bg-neutral-700 rounded-lg overflow-hidden z-[10] relative">
      <div
        className="h-full w-full  group-hover:scale-110 transition-all duration-300"
        style={{
          backgroundImage: `url(${card.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
    <p className="text-white hidden sm:block z-100 text-xs sm:text-sm line-clamp-2 w-[140px] text-start pl-2">{card.title}</p>
    <p className="text-white block sm:hidden z-100 text-xs  sm:text-sm line-clamp-2 w-[140px] text-end">{card.date}</p>
    <span className="timeline-line"></span>
  </TransitionLink>
);

const TimelineCard2 = ({ card }: { card: Card }) => (
  <TransitionLink
    href={`/events/${card.id}`}
    className={`relative flex flex-col sm:flex-col-reverse group transition-all duration-300 hover:drop-shadow-[0_0_10px_#A6A255] items-center gap-2 flex-shrink-0 mt-[${card.margin}] sm:mt-0`}
  >
    <div className="w-[120px] h-[180px]  sm:w-[140px] sm:h-[220px] bg-neutral-700 rounded-lg overflow-hidden z-[10] relative">
      <div
        className="h-full w-full group-hover:scale-110 transition-all duration-300"
        style={{
          backgroundImage: `url(${card.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
    <p className="text-white hidden sm:block z-100 text-xs sm:text-sm line-clamp-2 w-[140px] text-start pl-2">{card.title}</p>
    <p className="text-white block sm:hidden z-100 text-xs  sm:text-sm line-clamp-2 w-[140px] text-end">{card.date}</p>
    <span className=" w-fit h-[1px] sm:w-[1px] sm:h-[55vh] z-1 left-0 sm:left-35 -translate-x-1/2 bg-gray-300/50 absolute top-0 sm:-top-[100px] pointer-events-none"></span>
  </TransitionLink>
);


export default Events;
