'use client'
import Navbar from "../Components/Navbar";
import { Activity,ChessBishop,ChessKing,ChessPawn,ChessQueen,ChessRook } from "lucide-react";
const Partners = () => {

    const partners = [
        {id:1,logo:<ChessKing size={64}/>,name:'Partner 1'},
        {id:2,logo:<ChessQueen size={64}/>,name:'Partner 2'},
        {id:3,logo:<ChessRook size={64}/>,name:'Partner 3'},
        {id:4,logo:<ChessBishop size={64}/>,name:'Partner 4'},
        {id:5,logo:<ChessPawn size={64}/>,name:'Partner 5'},
        {id:6,logo:<Activity size={64}/>,name:'Partner 6'},
    ]

    return ( 
        <>
        <Navbar/>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {partners.map((items)=>(
            <div key={items.id} className="text-white/50 w-[330px] h-[350px]  hover:text-yellow-300 flex flex-col items-center justify-center p-5 border border-white/50 m-2 rounded-lg  transition-all duration-300">
                <div className=" mb-4 w-20">
                    {items.logo}
                </div>
                <h2 className="text-white text-lg font-medium">{items.name}</h2>
            </div>
        ))}
        </div>
        </>
     );
}
 
export default Partners;