'use client'
import Image from "next/image";

import { Import,Trash,CircleOff, ChevronRight } from "lucide-react";
import { useState,useEffect,useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import AdminNav from "@/app/Components/AminNav";
import LogoutButton from "@/app/Components/LogoutButton";
type Users = {
    id:number,
    name:string,
    describe:string,
    job:string,
    info:string,
    background:{
        before:string,
        after:string
    }
}

const WhatEdit = () => {
    
 
    const [users,setUsers]=useState([])
    const [IsFetching,setIsFetching]=useState(false)
    const emptyForm = {
  name: "",
  describe: "",
  job: "",
  info: "",
  background: {
    before: "",
    after: "",
  },
};
const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [formData,setFormData]=useState(emptyForm)
    const [isSaving,setIsSaving]=useState(false)
    const [showEdit, setShowEdit] = useState<number | null>(null)
   const [modal,setModal]=useState(false)



    async function fetchUsers() {
         try {
      setIsFetching(true);
      const res = await fetch("/what.json");
      const data = await res.json();
      setUsers(data.cards);
    } catch (err) {
      console.error("Failed to fetch events", err);
    } finally {
      setIsFetching(false);
    }

    }

    useEffect(() => {
      fetchUsers()
    }, [])
    
    console.log(users)
    
    const clickEdit = (user: any) => {
        setShowEdit(user.id);
        setFormData({
            name: user.name,
            describe: user.describe,
            job: user.job,
            info: user.info,
            background: {
            before: user.background?.before || "",
            after: user.background?.after || "",
            },
        });
        };




const isFormFilled = () => {
  return (
    formData.name.trim() !== "" &&
    formData.describe.trim() !== "" &&
    formData.job.trim() !== "" &&
    formData.info.trim() !== "" &&
    formData.background.before.trim() !== "" &&
    formData.background.after.trim() !== ""
  );
};

console.log(isFormFilled())

 async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!isFormFilled()) {
        return
    }
    
    try {
        setIsSaving(true)
        const method = showEdit ? "PUT" : "POST"
        const url = showEdit   ? `http://localhost:3002/inventory/${showEdit}`
        : "http://localhost:3002/inventory";
  await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      resetForm()
      await fetchUsers()
       
    } catch (error) {
        console.log('save Failed')
    } finally{
        setIsSaving(false)
    }
}


const resetForm = () =>{
    setFormData(emptyForm)
    setShowEdit(null)
}


 async function handleDelete(id:number) {
    try {
        setIsSaving(true)
       await fetch(`http://localhost:3002/inventory/${id}`, {
  method: 'DELETE',
});
        await fetchUsers()
    } catch (err) {
        console.error('delete failed')
    }finally{
        setIsSaving(false)
    }
 }

const [openMenu,setOpenMenu]=useState(false)

const loadingState = IsFetching || isSaving

if (loadingState) {
  return <div className="fixed flex items-center justify-center bg-black/50 w-full h-full top-0 bottom-0 right-0 left-0">
    <div className="loader"></div>
  </div>
}


    return ( 

        <section className="p-4 pb-8 md:p-8">
           
        <nav className="flex items-center justify-between w-full pb-8">
            <Image alt="logo" src="/neov2.png" width={80} height={80}/>
        <LogoutButton/>
        </nav>
      <AnimatePresence mode="wait">
         <motion.div
  initial={{ height: 40 }}
  animate={{ height: openMenu ? 320 : 40 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
  onClick={() => setOpenMenu(prev => !prev)}
  className="sticky top-0 z-50 bg-black flex flex-col items-start sm:hidden border border-[#343434] p-2"
>
  <h1 className="text-sm flex items-center w-full justify-between font-medium text-white mb-8">
    Menu 
    <span className={`${openMenu ? 'rotate-90':'rotate-0'} transition-all duration-300`}><ChevronRight size={20}/></span>
  </h1>
  {openMenu && 
  <motion.div 
  initial={{opacity:0}}
  animate={{opacity:1}}
  transition={{duration:0.4,delay:0.2}}
  >
    <AdminNav/>
  </motion.div>
  }
</motion.div>
      </AnimatePresence>
         <div className="h-15 sm:h-25">
          
         </div>
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr_280px] gap-12 sm:gap-6 w-full p-3 sm:pl-6">
  {/* LEFT – users */}
  <aside className={` border-0 sm:border-r ${users.length === 0 ? 'flex overflow-y-auto flex-col justify-between':''} border-[#343434] pr-4`}>
    <div>
        <h1 className="text-white text-xl sm:text-2xl font-medium mb-2">Current Buldings</h1>
    <p className="text-white/70 text-xs mt-2 mb-4">
      Click on the current buildings to edit them
    </p>
    </div>
    {users.length === 0 ? 
    <div className="flex flex-col items-center mt-10 h-full  justify-center">
        <CircleOff color="white" size={35}/>
        <h1 className="text-white/80 font-medium text-md mt-4">No Agents Added try adding one</h1>
     </div> 
    : users.map((user: Users) => (
      <div
        key={user.id}
        onClick={()=>clickEdit(user)}
        className={`p-1.5 rounded-md ${showEdit === user.id ? 'bg-white/10 ':'hover:bg-white/5'} mt-2 group hover:bg-white/5 flex items-center justify-between w-full cursor-pointer transition-all duration-300`}
      >
        {user.name}
        <button type="button" onClick={(e)=>{
          e.stopPropagation()
          setShowEdit(user.id)
          setModal(prev => !prev)}} className="rounded-lg p-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 cursor-pointer bg-red-400 border border-red-900"> <Trash color='#8C2123'/></button>

      </div>
      
    ))}
  </aside>

  {/* RIGHT – content */}
 <form className="flex flex-col pl-0 sm:pl-6 gap-6 w-full sm:max-w-2xl">
  
  {/* Header */}
  <div className="mb-2">
    <AnimatePresence mode="wait">
        {showEdit !== null && !modal ? 
        <motion.div
        key={showEdit}
        initial={{opacity:0}}
        animate={{opacity:1,transition:{duration:0.3}}}
        exit={{opacity:0,transition:{duration:0.3}}}
        className="flex flex-col sm:flex-row items-center justify-between">
    <div>
    <h1 className="text-2xl font-medium text-white">Edit Building</h1>
    <p className="text-white/70 text-xs mt-2">
      Update the information for the selected agent
    </p>
    </div>
     <button type="button" onClick={resetForm} className="bg-white text-black rounded-lg px-2 hover:bg-white/80 transition-all duration-300 cursor-pointer py-1.5">Reset</button>
    </motion.div> : 
    <motion.div
    className="flex items-center justify-between"
     initial={{opacity:0}}
        animate={{opacity:1,transition:{duration:0.3}}}
        exit={{opacity:0,transition:{duration:0.3}}}
    >
    <div className="">
        <h1 className="text-xl sm:text-2xl font-medium text-white">Edit / Add  / Delete Bulding</h1>
    <p className="text-white/70 text-xs  mt-2">
      Update the information & add new information or delete information of your agents
    </p>
    </div>
   
    </motion.div>
    }
    </AnimatePresence>
  </div>

  {/* Fields */}
 {/* Background BEFORE upload / preview */}
<div
  onClick={() => fileInputRef.current?.click()}
  className="h-40 w-full rounded-lg border border-[#343434]
             flex items-center justify-center cursor-pointer
             bg-cover bg-center relative overflow-hidden"
  style={
    formData.background.before
      ? { backgroundImage: `url(${formData.background.before})` }
      : undefined
  }
>
  {!formData.background.before && (
    <div className="flex flex-col items-center justify-center text-white/50">
      <Import />
      <p className="text-xs sm:text-sm font-light">Import File</p>
    </div>
  )}
</div>

<input
  ref={fileInputRef}
  type="file"
  accept="image/*"
  hidden
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setFormData((p) => ({
      ...p,
      background: {
        ...p.background,
        before: previewUrl,
      },
    }));
  }}
/>


  <input
  className="input"
  placeholder="Background BEFORE image URL"
  value={formData.background.before}
  onChange={(e) =>
    setFormData((p) => ({
      ...p,
      background: { ...p.background, before: e.target.value },
    }))
  }
/>

<input
  className="input"
  placeholder="Background AFTER image URL"
  value={formData.background.after}
  onChange={(e) =>
    setFormData((p) => ({
      ...p,
      background: { ...p.background, after: e.target.value },
    }))
  }
/>

  <div className="flex flex-col gap-1">
  <label>Name</label>
  <input
    className="input"
    value={formData.name}
    onChange={(e) =>
      setFormData((p) => ({ ...p, name: e.target.value }))
    }
  />
</div>

<div className="flex flex-col gap-1">
  <label>Job</label>
  <input
    className="input"
    value={formData.job}
    onChange={(e) =>
      setFormData((p) => ({ ...p, job: e.target.value }))
    }
  />
</div>

<div className="flex flex-col gap-1">
  <label>Description</label>
  <textarea
    className="input"
    value={formData.describe}
    onChange={(e) =>
      setFormData((p) => ({ ...p, describe: e.target.value }))
    }
  />
</div>

<div className="flex flex-col gap-1">
  <label>Info</label>
  <textarea
    className="input"
    value={formData.info}
    onChange={(e) =>
      setFormData((p) => ({ ...p, info: e.target.value }))
    }
  />
</div>

  <button disabled={isSaving} onClick={handleSubmit} className="w-full p-1.5 rounded-lg bg-yellow-400 text-yellow-900 border hover:bg-yellow-500 transition-all duration-300 cursor-pointer border-green-900">
    {showEdit ? 'Update' : 'Create'}
  </button>
  
</form>
<div className="hidden md:block">
  <AdminNav/>
</div>
</div>
<ConfirmModal
  modal={modal}
  setModal={setModal}
  onConfirm={() => {
    if (showEdit !== null) {
      handleDelete(showEdit)
      setModal(false)
      setShowEdit(null)
    }
  }}
  onClose={()=>{
    setModal(false)
    setShowEdit(null)
  }}
/>
        </section>
     );
}

export const ConfirmModal = ({
  modal,
  setModal,
  onConfirm,
  onClose
}: {
  modal: boolean
  setModal: (v: boolean) => void
  onConfirm: () => void
  onClose: () => void
}) => {
  if (!modal) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
      key="modal"
    initial={{opacity:0,y:-10}}
    animate={{opacity:1,y:0}}
    exit={{opacity:0,y:-10}}
    transition={{duration:0.3}}
    className="fixed inset-0 bg-black/65 flex items-center justify-center">
      <div className="bg-[#343434] rounded-lg p-4 border border-black flex flex-col gap-4">
        <div>
          <h1 className="text-white text-xl font-medium">
            Confirm the Delete
          </h1>
          <p className="text-white/50">
            By confirming, the data will be removed forever
          </p>
        </div>

        <div className="flex justify-between w-full">
          <button
            onClick={onConfirm}
            className="rounded-lg px-3 py-1 bg-red-400 text-red-900 border border-red-900 hover:bg-red-500"
          >
            Delete
          </button>

          <button
            onClick={onClose}
            className="text-white font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
    </AnimatePresence>
  )
}

export default WhatEdit;