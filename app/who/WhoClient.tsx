'use client'
import { useState } from "react";
import { motion } from "motion/react";
import Navbar from "../Components/Navbar";
import React from "react";
type Who = {
   id:number,
   name:string,
   title:string,
   description:string,
    image:string | null
}

type WhoProps = {
    who:Who[]
}

const Who = ({who}:WhoProps) => {
   


  const [active, setActive] = useState<number | null>(null);



    return ( 
        <section className="h-full flex flex-col items-center justify-between w-full ">
        <Navbar/>
        <div className="grid2 ">
      {who.map((items:Who) => {
        const isActive = items.id === active;

        return (
          <motion.div
          key={items.id}
          layoutId={`card-${items.id}`}
          onClick={() => setActive(isActive ? null : items.id)}
          className={`card  ${isActive ? "active" : ""} w-full overflow-hidden flex flex-col sm:flex-row items-start justify-between`}
          transition={{ layout: { duration: 0.45, type: "spring" } }}
        >
          {/* Always visible */}
          <motion.div layout>
            <DefaultContent 
            isActive={isActive} 
            id={items.id} 
            img={items.image}
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
    img={items.image}
    name={items.name}
    title={items.title}
    describe={items.description}
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
  title?:string,
  img?:string | null,
  isActive?: boolean;
  name?: string;
  describe?: string;
  info?: string;
  bf?: string;
  ba?: string;
};



function DefaultContent({ isActive = false, img,name }: CardProps) {
  const [hovered, setHovered] = useState(false);

  const activeHover = isActive ? true : hovered;

  console.log(img)
const imgUrl = img?.startsWith("/") ? `http://localhost:3010${img}` : `http://localhost:3010/${img}`;

  return (
    <p
      className={`
             opacity-100
              ${activeHover ? 'grayscale-[0%] brightness-[100%] contrast-[100%]':'grayscale-[60%] brightness-[85%] contrast-[85%]'} group-hover:brightness-100 group-hover:contrast-100 w-[310px] h-[330px] sm:w-[330px] sm:h-[350px]  rounded-lg p-2 transition-all duration-200 bg-cover bg-center`}
    style={{ backgroundImage: `url(${imgUrl})` }}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h1 className={`text-xl font-medium opacity-100 z-50 transition-colors duration-200 ${hovered || isActive ? 'text-yellow-300' : 'text-white'}`}>{name}</h1>
    </p>
  );
}


const ExpandedContent = React.memo(function ExpandedContent({ id,title,describe,name }:CardProps) {
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
      <p className="text-yellow-300 text-md sm:text-lg font-light ">{title}</p>
      <p className="text-white text-sm sm:text-md font-light mt-4">{describe}</p>
     </div>
    <button className="p-2 rounded-lg border border-yellow-300 bg-transparent text-yellow-300">
      Contact Me
    </button>
      
    </motion.div>
  );
});


export default Who;