'use client'
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/navigation"
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { usePathname } from "next/navigation";

interface TransitionLinkProps extends LinkProps{
    children:ReactNode,
    href:string
}


function sleep(ms:number):Promise<void> {
    return new Promise((resolve) =>setTimeout(resolve,ms))
}
export default function TransitionLink({ children, href, ...props }: TransitionLinkProps) {

  const router = useRouter();

  const pathname = usePathname();


  const transitionClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Prevent pushing same route
    if (pathname === href) return;


    const body = document.body;
    body.classList.add("page-transition");

    await sleep(400);
    router.push(href);

    // optional cleanup after navigation
    setTimeout(() => {
      body.classList.remove("page-transition");
    }, 400);
  };

    
console.log('this is : ',href)

    return (
        
        <Link href={href} onClick={transitionClick} {...props}>{children}</Link> 
    
    );
}
 
