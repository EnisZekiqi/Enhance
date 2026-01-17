'use client'
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import Navbar from "@/app/Components/Navbar";

const DetailEvents = () => {
    const route = useParams()
    const id = Number(route.id)
const date = new Date();
  const formattedDate = date.toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    
   const dest = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, eligendi dicta itaque eaque necessitatibus quam deserunt doloribus aperiam voluptates mollitia tempora pariatur, nulla rem eos ad sunt assumenda eveniet cum! Quas mollitia amet itaque aperiam enim dolor magni in, voluptatum temporibus beatae ea corporis numquam neque iste facere animi esse nesciunt? Asperiores, pariatur vitae eveniet libero distinctio repellendus! Voluptate, tempore.Odit, veniam eius accusantium voluptates, minus incidunt commodi aspernatur non animi autem ut. Aliquid nisi impedit fugit dolorem doloribus beatae iure corporis! Odit asperiores magni excepturi iusto quasi ipsum molestias?Sunt rerum beatae recusandae laudantium, quis nostrum aspernatur, repellat hic animi repellendus non eaque quod, rem explicabo ipsam dignissimos odit esse earum! Impedit repellat inventore sit esse facere! Quae, libero.Cupiditate, animi, vitae corporis quisquam, illo voluptates cumque distinctio perspiciatis expedita exercitationem temporibus totam iusto dicta eveniet laboriosam magni possimus quaerat! Quisquam sed quidem expedita voluptate at. Qui, blanditiis voluptate?'

  // Combine both arrays (or move this to a separate file/context)
    const allCards = [
      {
        id:1,
        title:'I did improve… yet I still need assistance… thats why Im feeling down.',
        titlefr:'Jai progressé… mais jai encore besoin daide… cest pour ça que je suis déprimé.',
        date: formattedDate,
        description:dest,
        descriptionfr:'',
        img:'https://images.unsplash.com/photo-1763046287602-7f878927101f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8'
      },
      
  {
    id:1,
    title:'I did improve… yet I still need assistance… that\'s why I\'m feeling down.',
    titlefr:'J\'ai progressé… mais j\'ai encore besoin d\'aide… c\'est pour ça que je suis déprimé.',
    date:formattedDate,
    description:dest,
    descriptionfr:'',
    img:'https://images.unsplash.com/photo-1763046287602-7f878927101f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8'
  },
  {id:2,title:'Innovation Through Collaboration',titlefr:'Innovation Par Collaboration',date:'01/03/2025',description:dest,descriptionfr:'',img:'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.0'},
  {id:3,title:'Building Tomorrow\'s Solutions',titlefr:'Construire les Solutions de Demain',date:'02/15/2025',description:dest,descriptionfr:'',img:'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.0'},
  {id:4,title:'Growth and Development',titlefr:'Croissance et Développement',date:'03/22/2025',description:dest,descriptionfr:'',img:'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.0'}
    ,


   {id:5,title:'Breakthrough Moment',titlefr:'Moment de Percée',date:'04/10/2025',description:dest,descriptionfr:'',img:'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.0'},
  {id:6,title:'Future Prospects',titlefr:'Perspectives Futures',date:'05/18/2025',description:dest,descriptionfr:'',img:'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.0'},
  {id:7,title:'Continuous Improvement',titlefr:'Amélioration Continue',date:'06/25/2025',description:dest,descriptionfr:'',img:'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.0'},
  {id:8,title:'Success Story',titlefr:'Histoire de Succès',date:'07/30/2025',description:dest,descriptionfr:'',img:'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.0'}
      // ... add more cards
    ]

    // Filter by ID
    const card = allCards.find(c => c.id === id)

    if (!card) {
      return <div>Card not found</div>
    }

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25
    }
  }
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 15
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      delay:0.67,
      ease: 'easeOut'as const
    }
  }
}
    return (
        <>
        <Navbar/>
        <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-8 text-white flex flex-col sm:flex-row justify-between items-start gap-4 mt-8">
          <motion.img
          variants={itemVariants}
          src={card.img} alt={card.title} className="mt- w-full max-w-2/4 rounded-lg" />
        <div
        
        className="flex flex-col items-start max-w-2/4">
          <motion.p 
          variants={itemVariants}
          className="mb-4 text-sm font-light text-white/70">{card.date}</motion.p>
            <motion.h1 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl fomotion.he font-bold text-white">{card.title}</motion.h1>
          
         
          <motion.p variants={itemVariants} className="mt-8 text-md sm:text-lg font-normal text-whitemotion.description">{card.description}</motion.p>
        </div>
        </motion.div>
        </>
    );
}

export default DetailEvents;