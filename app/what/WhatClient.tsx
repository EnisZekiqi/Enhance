'use client'

import Navbar from "../Components/Navbar";
import { motion } from "motion/react";
import { useState,useContext } from "react";
import React from "react";
import { LanguageContext } from "../context/LanguageContext";
type What ={
    id:number,
    title:{
      en:string,
      fr:string,
    }
    description:{
      en:string,
      fr:string
    }
    image:string,
}


type WhatProps = {
    what:What[]
}

const What = ({what}:WhatProps) => {

 const [active, setActive] = useState<number | null>(null);


const userContext = useContext(LanguageContext);

  if (!userContext) throw new Error("useContext must be used within a UserProvider");

  const { user } = userContext;


const lang: "en" | "fr" = user === "fr" ? "fr" : "en";

console.log(active)

    return ( 
        <section className="h-full flex flex-col items-center justify-between w-full ">
        <Navbar/>
        <div className="grid2 ">
            
      {what.map((items: What) => {

  const isActive = items.id === active;


  // 🔹 NORMAL CARD
  return (
    <motion.div
      key={items.id}
      layoutId={`card-${items.id}`}
      onClick={() => setActive(isActive ? null : items.id)}
      className={`card ${isActive ? "active" : ""} overflow-hidden flex flex-col sm:flex-row`}
      transition={{ layout: { duration: 0.45, type: "spring" } }}
    >
      {/* Default */}
      <motion.div layout>
        <DefaultContent
          isActive={isActive}
          id={items.id}
          images={items.image}
         title={items.title[lang]}
        />
      </motion.div>

      {/* Expanded */}
      <motion.div
        layout
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
        style={{
          display: isActive ? "block" : "none",
          pointerEvents: isActive ? "auto" : "none",
        }}
        className="pl-0 pt-4 sm:pl-4 z-20 text-white w-full h-full"
      >
        <ExpandedContent
          id={items.id}
         images={items.image}
          title={items.title[lang]}
          description={items.description[lang]}
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
  title?: string;
  images?: string;
  description?:string;
};



function DefaultContent({ isActive = false,title,images }: CardProps) {
  const [hovered, setHovered] = useState(false);

  const activeHover = isActive ? true : hovered;

 const imgUrl = images?.startsWith("/")
    ? `http://localhost:3010${images}`
    : `http://localhost:3010/${images}`;

  return (
    <div
      className={`
             opacity-100
              ${activeHover ? 'grayscale-[0%] brightness-[100%] contrast-[100%]':'grayscale-[60%] brightness-[85%] contrast-[85%]'} group-hover:brightness-100 group-hover:contrast-100 w-[310px] h-[330px] sm:w-[330px] sm:h-[350px]  rounded-lg p-2 transition-all duration-200 bg-cover bg-center`}
      style={{ backgroundImage: `url(${imgUrl})` }}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h1 className={`text-xl font-medium opacity-100 z-50 transition-colors duration-200 ${hovered || isActive ? 'text-yellow-300' : 'text-white'}`}>{title}</h1>
    </div>
  );
}


const ExpandedContent = React.memo(function ExpandedContent({ id,images,title,description }:CardProps) {
  return (
    <motion.div
      layoutId={`expanded-${id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
     className="flex flex-col items-start justify-between gap-4 sm:gap-0 w-full h-full"
    >
     <div>
       <h3 className="text-yellow-300 text-lg font-medium">{title}</h3>
      <p className="text-white text-sm sm:text-md font-light mt-4">{description}</p>
     </div>
    <button className="p-2 rounded-lg border border-yellow-300 bg-transparent text-yellow-300">
      Contact Me
    </button>
      
    </motion.div>
  );
});

 
export default What;