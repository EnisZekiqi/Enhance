'use client'
import { useState,useEffect } from "react";
import { motion } from "motion/react";
import Navbar from "../Components/Navbar";
import who from '@/app/who.json'
import React from "react";
type Who = {
   id:number,
   name:string,
   describe:string,
   info:string,
   background:{
    before:string,
    after:string,
   }
}

const Who = () => {
   


  const [active, setActive] = useState<number | null>(null);



    return ( 
        <section className="h-full flex flex-col items-center justify-between w-full ">
        <Navbar/>
        <div className="grid2 ">
      {who.cards.map((items:Who) => {
        const isActive = items.id === active;

        return (
          <motion.div
          key={items.id}
          layoutId={`card-${items.id}`}
          onClick={() => setActive(isActive ? null : items.id)}
          className={`card  ${isActive ? "active" : ""} overflow-hidden flex flex-col sm:flex-row items-start justify-between`}
          transition={{ layout: { duration: 0.45, type: "spring" } }}
        >
          {/* Always visible */}
          <motion.div layout>
            <DefaultContent 
            isActive={isActive} 
            id={items.id} 
            bf={items.background.before} 
            ba={items.background.after} 
            name={items.name}
            />
          </motion.div>

          {/* Only visible when active */}
         {/* Always mounted, just hidden when inactive */}
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
    id={items.id}
    bf={items.background.before}
    ba={items.background.after}
    name={items.name}
    job={items.describe}
    info={items.info}
  />
</motion.div>
        </motion.div>

        );
      })}
    </div>


        </section>
     );
}

type CardProps = {
  id: number;
  isActive?: boolean;
  name?: string;
  job?: string;
  info?: string;
  bf?: string;
  ba?: string;
};



function DefaultContent({ isActive = false, bf = '', ba = '',name }: CardProps) {
  const [hovered, setHovered] = useState(false);

  const bgUrl = isActive ? ba : (hovered ? ba : bf);
  const activeHover = isActive ? true : hovered;

  return (
    <p
      className={`
             opacity-100
              ${activeHover ? 'grayscale-[0%] brightness-[100%] contrast-[100%]':'grayscale-[60%] brightness-[85%] contrast-[85%]'} group-hover:brightness-100 group-hover:contrast-100 w-[330px] h-[350px]  rounded-lg p-2 transition-all duration-200 bg-cover bg-center`}
      style={{ backgroundImage: `url(${bgUrl})` }}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h1 className={`text-xl font-medium opacity-100 z-50 transition-colors duration-200 ${hovered || isActive ? 'text-yellow-300' : 'text-white'}`}>{name}</h1>
    </p>
  );
}


const ExpandedContent = React.memo(function ExpandedContent({ id,job,info,name }:CardProps) {
  return (
    <motion.div
      layoutId={`expanded-${id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
     className="flex flex-col items-start justify-between gap-4 sm:gap-0 w-full h-full"
    >
     <div>
       <h3 className="text-yellow-300 text-lg font-medium">{name}</h3>
      <p className="text-yellow-300 text-md sm:text-lg font-light ">{job}</p>
      <p className="text-white text-sm sm:text-md font-light mt-4">{info}</p>
     </div>
    <button className="p-2 rounded-lg border border-yellow-300 bg-transparent text-yellow-300">
      Contact Me
    </button>
      
    </motion.div>
  );
});


export default Who;