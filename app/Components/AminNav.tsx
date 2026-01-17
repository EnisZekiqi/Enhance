'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
const AdminNav = () => {

    const dashboard = [
    {id:1,title:'Who',titlefr:'Oms',link:'/admin/who',}
    ,{id:2,title:'What',titlefr:'Quoi',link:'/admin/what',}
    ,{id:3,title:'Neomag',titlefr:'Neomag',link:'/admin/neomag',}
    ,{id:4,title:'Events',titlefr:'événements',link:'/admin/event',},
    {id:5,title:'Where',titlefr:'Où',link:'/admin/where',},
    {id:6,title:'Success stories',titlefr:'Histoires de réussite',link:'/admin/sucess',},
    {id:7,title:'Partners',titlefr:'Partenaires',link:'/admin/partners',}
]

const path = usePathname()


    return ( 
        <>
        <nav className="flex flex-col gap-2 items-start">
            <h2 className="text-sm font-medium mb-2 hidden sm:block">Where are we</h2>
            {dashboard.map((items)=>(
                <ul key={items.id} className="">
                    <Link href={items.link} className={`pl-2 pb-3 pt-1.5 -mt-2  ${path === items.link ? 'text-yellow-300 border-l border-yellow-300':' border-0 sm:border-l border-[#343434] hover:border-white/70 text-white/50 hover:text-white '} transition-all duration-300 cursor-pointer  text-sm border-[#343434]`}>
                    {items.title}
                    </Link>
                </ul>
            ))}
        </nav>
        </>
     );
}
 
export default AdminNav;