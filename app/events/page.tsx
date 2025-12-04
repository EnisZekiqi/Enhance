'use client'

import { motion, useTransform, useScroll } from "motion/react";
import { useRef } from "react";
import Navbar from "../Components/Navbar";
import TransitionLink from "../Components/TransitionLink";

type Card = {
  title:string,
  titlefr:string,
  id:number,
  description:string,
  date:string,
  descriptionfr:string,
  img:string
}

const Events = () => {
  const wrapperRef = useRef(null);
  // Scroll range for the combined sticky section
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  

  // Horizontal movement (adjust percentages if needed)
  const topX = useTransform(scrollYProgress, [0.1, 0.9], ["10%", "-80%"]);
  const bottomX = useTransform(scrollYProgress, [0.1, 0.9], ["-10%", "80%"]);

  return (
    <div className="bg-black h-full">
      <Navbar/>
      {/* This whole block will stick together */}
    <div className="empty h-[150px]"></div>

      <div ref={wrapperRef} className="hidden md:block relative h-[300vh] w-full mask-x-from-70% mask-x-to-100%">
        
        {/* Combined sticky zone */}
        <div className="sticky top-0 h-screen flex flex-col justify-center gap-20 overflow-hidden">

          {/* TOP ROW */}
          <motion.div style={{ x: topX }} className="flex gap-10 justify-between items-center">
            {topcards.map(c => <TimelineCard key={c.id} card={c} />)}
          </motion.div>
         
          <StraightLine/>
        
          {/* BOTTOM ROW */}
          <motion.div style={{ x: bottomX }} className="flex gap-10 justify-between items-center">
            {bottomcards.map(c => <TimelineCard key={c.id} card={c} />)}
          </motion.div>

        </div>
      </div>

       <div className="block md:hidden">
        <MobileEvent/>
       </div>

    </div>
  );
};



const StraightLine = ()=>{

 const date = new Date();
  const formattedDate = date.toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });


  return(
     <div className="absolute straightline text-center w-full h-1 bg-[#333] z-[100]">
     <span className="text-yellow-300 absolute -top-5.5 text-lg font-medium"> {formattedDate && 'Today'}</span>
     </div>
  )
}

const MobileEvent = ()=>{

const sectionRef = useRef<HTMLElement | null>(null);

  // When the section top enters the bottom of the viewport -> 0
  // When the section bottom reaches the top of the viewport -> 1
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineTransform = useTransform(scrollYProgress, v => `scaleY(${v})`);

  // Debug: print progress to console while developing

  return(
    <>
    <section  className="min-h-screen h-auto  flex items-start justify-between p-4">
      <div 
        ref={sectionRef}
        className=" flex flex-col gap-[180px]"
      >
        {topcards.map((c, i) => (
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

      {/* The animated vertical line */}
      <motion.div
        className="w-1 self-stretch bg-[#343434] origin-top"
        style={{ transform: lineTransform, transformOrigin: "top" }}
      />
      

      <div 
        ref={sectionRef}
        className=" flex flex-col gap-[180px]"
      >
        {bottomcards.map((c, i) => (
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
    </>
  )
}

const TimelineCard = ({ card }: { card: Card }) => (
  <TransitionLink href={`/events/${card.id}`} className="relative" >
  <div className="w-[140px] h-[220px] sm:h-[350px] sm:w-[300px] bg-neutral-700 rounded-lg overflow-hidden z-[10] relative">
    <div
      className="h-full w-full"
      style={{
        backgroundImage: `url(${card.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
    {/* Text overlay - positioned absolutely inside the card */}
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
      <h1 className="text-white text-md font-medium sm:font-bold sm:text-lg">{card.date}</h1>
      <p className="text-white text-xs sm:text-sm line-clamp-2">{card.title}</p>
    </div>
    
  </div>
  </TransitionLink>
);

  const date = new Date();
  const formattedDate = date.toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  // Example output: "November 19, 2025"

 const dest = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, eligendi dicta itaque eaque necessitatibus quam deserunt doloribus aperiam voluptates mollitia tempora pariatur, nulla rem eos ad sunt assumenda eveniet cum! Quas mollitia amet itaque aperiam enim dolor magni in, voluptatum temporibus beatae ea corporis numquam neque iste facere animi esse nesciunt? Asperiores, pariatur vitae eveniet libero distinctio repellendus! Voluptate, tempore.Odit, veniam eius accusantium voluptates, minus incidunt commodi aspernatur non animi autem ut. Aliquid nisi impedit fugit dolorem doloribus beatae iure corporis! Odit asperiores magni excepturi iusto quasi ipsum molestias?Sunt rerum beatae recusandae laudantium, quis nostrum aspernatur, repellat hic animi repellendus non eaque quod, rem explicabo ipsam dignissimos odit esse earum! Impedit repellat inventore sit esse facere! Quae, libero.Cupiditate, animi, vitae corporis quisquam, illo voluptates cumque distinctio perspiciatis expedita exercitationem temporibus totam iusto dicta eveniet laboriosam magni possimus quaerat! Quisquam sed quidem expedita voluptate at. Qui, blanditiis voluptate?'

const topcards = [
  {
    id:1,
    title:'I did improve… yet I still need assistance… that’s why I’m feeling down.',
    titlefr:'J’ai progressé… mais j’ai encore besoin d’aide… c’est pour ça que je suis déprimé.',
    date:formattedDate,
    description:dest,
    descriptionfr:'',
    img:'https://images.unsplash.com/photo-1763046287602-7f878927101f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8'
  },
  {id:2,title:'',titlefr:'',date:formattedDate,description:'',descriptionfr:'',img:''},
  {id:3,title:'',titlefr:'',date:formattedDate,description:'',descriptionfr:'',img:''},
  {id:4,title:'',titlefr:'',date:formattedDate,description:'',descriptionfr:'',img:''}
]

const bottomcards = [
   {id:1,title:'',titlefr:'',date:'',description:'',descriptionfr:'',img:''},
  {id:2,title:'',titlefr:'',date:'',description:'',descriptionfr:'',img:''},
  {id:3,title:'',titlefr:'',date:'',description:'',descriptionfr:'',img:''},
  {id:4,title:'',titlefr:'',date:'',description:'',descriptionfr:'',img:''}
];

export default Events;
