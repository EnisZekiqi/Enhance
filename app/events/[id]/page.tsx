'use client'
import { useParams } from "next/navigation";
import { motion } from "motion/react";

const DetailEvents = () => {
    const route = useParams()
    const id = Number(route.id)
const date = new Date();
  const formattedDate = date.toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    // Combine both arrays (or move this to a separate file/context)
    const allCards = [
      {
        id:1,
        title:'I did improve… yet I still need assistance… thats why Im feeling down.',
        titlefr:'Jai progressé… mais jai encore besoin daide… cest pour ça que je suis déprimé.',
        date: formattedDate,
        description:'Lorem ipsum dolor sit amet...',
        descriptionfr:'',
        img:'https://images.unsplash.com/photo-1763046287602-7f878927101f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8'
      },
      // ... add more cards
    ]

    // Filter by ID
    const card = allCards.find(c => c.id === id)

    if (!card) {
      return <div>Card not found</div>
    }

    return (
        <motion.div className="p-8 text-white flex flex-col sm:flex-row items-start gap-4 mt-8">
          <img src={card.img} alt={card.title} className="mt- w-full max-w-2xl rounded-lg" />
        <div className="flex flex-col items-start">
          <p className="mb-4 text-sm font-light text-white/70">{card.date}</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium">{card.title}</h1>
          
         
          <p className="mt-8 text-md sm:text-lg font-normal text-white/90">{card.description}</p>
        </div>
        </motion.div>
    );
}

export default DetailEvents;