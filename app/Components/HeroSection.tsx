'use client'
import { motion,AnimatePresence } from "motion/react";
import Navbar from "./Navbar";
import { useContext,useState,useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";
import TransitionLink from "./TransitionLink";
import Image from "next/image";
const HeroSection = () => {

     const userContext = useContext(LanguageContext);

    if (!userContext) throw new Error("useContext must be used within a UserProvider");

      const { user } = userContext;



      const navigate = [
    {id:1,title:'Who',titlefr:'Oms',link:'/who',img:'https://media.istockphoto.com/id/2187983015/photo/grainy-dark-gradient-carbon-gray-blurred-abstract-noise-texture-black-monochrome-plain.webp?a=1&b=1&s=612x612&w=0&k=20&c=apgvMeLaD4r0qoxkAud1y8vFiscdRiWlH2sBYEGy3D8='}
    ,{id:2,title:'What',titlefr:'Quoi',link:'/what',img:'https://plus.unsplash.com/premium_photo-1728499754017-d4ad4bf54c32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MHx8MHx8fDA%3D'}
    ,{id:3,title:'Neomag',titlefr:'Neomag',link:'',img:'https://plus.unsplash.com/premium_photo-1728499754017-d4ad4bf54c32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MHx8MHx8fDA%3D'}
    ,{id:4,title:'Events',titlefr:'événements',link:'/events',img:'https://images.unsplash.com/photo-1762545611539-df4e46e7747e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D'},
    {id:5,title:'Where',titlefr:'Où',link:'',img:'https://plus.unsplash.com/premium_photo-1728499754017-d4ad4bf54c32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MHx8MHx8fDA%3D'},
    {id:6,title:'Success stories',titlefr:'Histoires de réussite',link:'',img:'https://images.unsplash.com/photo-1762554941401-f369d8884478?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D'},
    {id:7,title:'Partners',titlefr:'Partenaires',link:'',img:'https://plus.unsplash.com/premium_photo-1728499754017-d4ad4bf54c32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MHx8MHx8fDA%3D'}
]

const [motionLength,setMotionLength]=useState('neo1')
  useEffect(() => {
      if (motionLength === 'neo1') {
        const timer = setTimeout(() => {
        setMotionLength('neo2');
      }, 3000);
      return () => {
        clearTimeout(timer);}
      }
      const timer2 = setTimeout(() => {
        setMotionLength('');
      }, 3000);
  return () => {
        clearTimeout(timer2);}
  },[motionLength])


 if (motionLength) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
    <AnimatePresence mode="wait">
       {motionLength === 'neo1' ?
       <motion.div
      initial={{opacity:0}}
      animate={{opacity:1,transition:{duration:0.5,delay:1}}}
      exit={{opacity:0,transition:{duration:0.5}}}
      layoutId="main-logo">
        <Image alt="logo" src="/neo.png" width={200} height={150}/>
      </motion.div> 
      
      :
        
       <motion.div
       key='neo2'
      initial={{opacity:0}}
      animate={{opacity:1,transition:{duration:0.5,delay:1}}}
      exit={{opacity:0,transition:{duration:0.5}}}
      layoutId="main-logo">
        <Image alt="logo" src="/neov2.png" width={200} height={150}/>
      </motion.div>
      }
    </AnimatePresence>
     
    </motion.div>
  );
}




       


    return ( 
        <section
    
        className="h-full p-0 pb-8 md:p-8 flex flex-col items-center justify-between w-full">
           
        <Navbar/>
        <motion.div
        initial={{opacity:0,y:'40px',filter:'blur(12px)'}}
        animate={{opacity:1,y:'0px',filter:'blur(0px)'}}
        transition={{duration:0.5}}
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center  gap-5 mt-0">
           {navigate.map((items)=>(
         <TransitionLink  
         href={items.link}
        key={items.id} 
        className="relative rounded-lg overflow-hidden group w-[140px] h-[180px] sm:w-[320px] sm:h-[350px] md:w-[350px] md:h-[380px]"
        >
            {/* Background image */}
            <img 
            src={items.img} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover z-0 transition-all
             opacity-100
             grayscale-[60%] brightness-[85%] contrast-[85%]
             group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100"
            />

            {/* Optional hover overlay */}
            <div className="  absolute inset-0 bg-yellow-300 
  opacity-0 group-hover:opacity-60 
  mix-blend-soft-light 
  transition-all z-10"></div>

            {/* Text content */}
            <AnimatePresence>
              <motion.div
              key={user}
               initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                transition={{duration:0.2,delay:0.1}}
              className="absolute top-4 left-4 z-10">
               {user === 'french' ? 
                <motion.h2
               
                className="text-lg sm:text-xl md:text-2xl font-medium text-yellow">{items.titlefr}</motion.h2>: 
                <motion.h2
               
                className="text-lg sm:text-xl md:text-2xl font-medium text-yellow">{items.title}</motion.h2>}
            </motion.div>
            </AnimatePresence>
        </TransitionLink>
           ))}
           
        </motion.div>
        </section>
     );
}
 
export default HeroSection;