'use client'

import { motion } from "motion/react";
import Link from "next/link";
import { LogOut,SquarePen } from "lucide-react";
import Image from "next/image";
import React from "react";
import TransitionLink from "@/app/Components/TransitionLink";
import LogoutButton from "@/app/Components/LogoutButton";

const Dashboard = () => {

    const dashboard = [
    {id:1,title:'Who',titlefr:'Oms',link:'/admin/who',img:'https://media.istockphoto.com/id/2187983015/photo/grainy-dark-gradient-carbon-gray-blurred-abstract-noise-texture-black-monochrome-plain.webp?a=1&b=1&s=612x612&w=0&k=20&c=apgvMeLaD4r0qoxkAud1y8vFiscdRiWlH2sBYEGy3D8='}
    ,{id:2,title:'What',titlefr:'Quoi',link:'/admin/what',img:'https://plus.unsplash.com/premium_photo-1728499754017-d4ad4bf54c32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MHx8MHx8fDA%3D'}
    ,{id:3,title:'Neomag',titlefr:'Neomag',link:'/admin/neomag',img:'https://plus.unsplash.com/premium_photo-1728499754017-d4ad4bf54c32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MHx8MHx8fDA%3D'}
    ,{id:4,title:'Events',titlefr:'événements',link:'/admin/event',img:'https://images.unsplash.com/photo-1762545611539-df4e46e7747e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D'},
    {id:5,title:'Where',titlefr:'Où',link:'/admin/where',img:'https://plus.unsplash.com/premium_photo-1728499754017-d4ad4bf54c32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MHx8MHx8fDA%3D'},
    {id:6,title:'Success stories',titlefr:'Histoires de réussite',link:'/admin/sucess',img:'https://images.unsplash.com/photo-1762554941401-f369d8884478?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D'},
    {id:7,title:'Partners',titlefr:'Partenaires',link:'/admin/partners',img:'https://plus.unsplash.com/premium_photo-1728499754017-d4ad4bf54c32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MHx8MHx8fDA%3D'}
]


    return ( 
        <section className="p-4 pb-8 md:p-8">
        <nav className="flex items-center justify-between w-full pb-8">
            <Image alt="logo" src="/neov2.png" width={80} height={80}/>
            <LogoutButton/>
        </nav>
        <section className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center  gap-5 mt-0">
        {dashboard.map((items)=>(
            <TransitionLink 
            className="relative rounded-lg overflow-hidden hover:drop-shadow-[0px_0px_15px_#A6A255]  group w-[140px] h-[180px] sm:w-[320px] sm:h-[350px] md:w-[350px] md:h-[380px]"
            href={items.link}
            key={items.id}>
                <img src={items.img} className="absolute opacity-100 group-hover:opacity-0 inset-0 w-full h-full object-cover hover:opacity-0 z-0 transition-all duration-300 " alt="" />
                <div className="absolute flex flex-col gap-8 rounded-lg hover:border hover:border-yellow-300 items-center justify-center inset-0 opacity-0 group-hover:opacity-100 duration-300 transition-all z-100">
                    <SquarePen size={50} color="yellow"/>
                    <h1 className="text-lg sm:text-xl font-medium">Edit</h1>
                </div>
           <motion.div
             
               initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                transition={{duration:0.2,delay:0.1}}
              className="absolute top-4 left-4 z-10 ">
               
                <motion.h2
               
                className="text-lg sm:text-xl md:text-2xl  opacity-100 group-hover:opacity-0 font-medium text-yellow">{items.title}</motion.h2>
            </motion.div>
            </TransitionLink>
        ))}
        </section>
        </section>
     );
}
 
export default Dashboard;