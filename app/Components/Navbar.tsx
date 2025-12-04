'use client'
import Image from "next/image";
import Link from "next/link";
import { useState,useContext,useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { usePathname } from "next/navigation";
import TransitionLink from "./TransitionLink";
import { motion,AnimatePresence } from "motion/react";
import React from "react";
import {Menu,X} from 'lucide-react'
const Navbar = () => {

  const navbar = [
   {id:1,title:'Home',link:'/'}
  ,{id:2,title:'Who',link:'/who'}
  ,{id:3,title:'What',link:'/what'}
  ,{id:4,title:'Neomag',link:'/neomag'},
   {id:5,title:'Events',link:'/events'}
  ,{id:6,title:'Contact',link:'/contact'}
  ,{id:7,title:'Success stories',link:'/successstories'}
  ,{id:8,title:'Partners',link:'/partners'}
  ]

 const route = usePathname()

  

  const isHome = route === '/'

 const userContext = useContext(LanguageContext);

  if (!userContext) throw new Error("useContext must be used within a UserProvider");

  const { user, setUser } = userContext;
  const {clicked}=userContext

  const switchLanguage =(name:string)=>{
  setUser((prev : any) => (prev === name ? 'english' : name))
  }

  const [modal,setModal]=useState(false)


  useEffect(() => {
  if (!isHome) {
    setModal(false)
  }
  }, [isHome])
  
 


  return ( 
    <section className="flex items-center justify-between  w-full py-5 px-5">
      <motion.div layoutId="main-logo">
  <Image alt="logo" src="/vercel.svg" width={50} height={40}/>
</motion.div>

     {!isHome && 
      <div className="hidden md:flex items-center gap-4 text-white">
      {navbar.map((items)=>(
        <TransitionLink  key={items.id} href={items.link}>
          <p className={`hover:text-amber-300 ${clicked === items.link ? 'text-amber-300':'text-white'} transition-all duration-300`}>
            {items.title}
          </p>
        </TransitionLink>
      ))}
      </div>
     }
     <button className="block md:hidden cursor-pointer" onClick={()=>setModal((prev)=>!prev)}><Menu/></button>
     <label className="hidden md:block toggle-switch">
  <input 
  type="checkbox"
  checked={user === "french"}
  onChange={(e) =>
    switchLanguage(e.target.checked ? "french" : "english")
  }
  />
  <div className="toggle-switch-background">
  <div className="toggle-switch-handle"></div>
  </div>
</label>
   <AnimatePresence>
   {modal  && 
  <>
  <motion.div
  initial={{opacity:0,x:100}}
  animate={{opacity:1,x:-20}}
  exit={{opacity:0,x:100}}
  className="fixed bg-black/100  top-0 flex flex-col items-start p-5 gap-6 z-[1000] text-white w-full h-full "
  >
    <div className="flex items-center justify-between w-full">
      <Image alt="logo" src="/vercel.svg" width={30} height={30}/>
      <button onClick={()=>setModal(false)}><X /></button>
    </div>
      <motion.div 
        className="flex flex-col items-start gap-4 text-white z-[1000] mt-10"
        variants={{
          hidden: { opacity: 0 },
          visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {navbar.map((items)=>(
          <motion.div
        key={items.id}
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }}
          >
        <TransitionLink href={items.link}>
          <p className={`hover:text-amber-300 ${clicked === items.link ? 'text-amber-300':'text-white'} transition-all duration-300`}>
            {items.title}
          </p>
        </TransitionLink>
          </motion.div>
        ))}
      </motion.div>
     
      <label className="block toggle-switch">
  <input 
  type="checkbox"
  checked={user === "french"}
  onChange={(e) =>
    switchLanguage(e.target.checked ? "french" : "english")
  }
  />
  <div className="toggle-switch-background">
  <div className="toggle-switch-handle"></div>
  </div>
</label>
  </motion.div>
  </>
  }
   </AnimatePresence>
    </section>
   );
}

export default React.memo(Navbar);
 