'use client'
import Image from "next/image";
import { ArrowRightLeft, Trash, CircleOff, ChevronRight,Import,RotateCcw } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import AdminNav from "@/app/Components/AminNav";
import LogoutButton from "@/app/Components/LogoutButton";

type Event = {
  id: number,
  event_date: string,
  title: string,
  description: string,
  image: string,
  column: number,
  position:number
}

const EventEdit = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showEdit, setShowEdit] = useState<number | null>(null)
  const [modal, setModal] = useState(false)
 const [imageFile, setImageFile] = useState<File | null>(null)
const [imagePreview, setImagePreview] = useState<string | null>(null)

  const emptyForm = {
    title: "",
  description: "",
  event_date: "", // IMPORTANT: always a string
  image: "",
  position:1
  }

  const [formData, setFormData] = useState(emptyForm)

  // Fetch events from local JSON
  async function fetchEvents() {
    try {
      setIsFetching(true)
      const res = await fetch("http://localhost:3010/events")
      const data = await res.json()
      setEvents(data)
    } catch (err) {
      console.error("Failed to fetch events", err)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])


  const clickEdit = (event: Event) => {
    setShowEdit(event.id)
    setFormData({
    title: event.title ?? "",
    description: event.description ?? "",
    image: event.image ?? "",
    position:event.position,
    event_date: event.event_date
      ? event.event_date.split("T")[0]
      : ""
  })
     
   setImagePreview(
    event.image ? `http://localhost:3010${event.image}` : null
     )
        
        setImageFile(null)
  }

  const isFormFilled = () => {
    return (
      formData.event_date.trim() !== "" &&
      formData.title.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.position !== 0
    )
  }

const firstColumn = events.filter(
  item => item.position === 1 && item.id !== showEdit
)

const secondColumn = events.filter(
  item => item.position === 2 && item.id !== showEdit
)

const MAX_PER_COLUMN = 7

const isSelectedPositionFull = () => {
  if (formData.position === 1) {
    return firstColumn.length >= MAX_PER_COLUMN
  }

  if (formData.position === 2) {
    return secondColumn.length >= MAX_PER_COLUMN
  }

  return false
}

  console.log(isSelectedPositionFull())

  const resetForm = () => {
    setFormData(emptyForm)
    setImageFile(null)
    setImagePreview(null)
    setShowEdit(null)
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()

  if (!isFormFilled()) return
  
  if (isSelectedPositionFull()) {
    return
  }

  try {
    setIsSaving(true)

    const data = new FormData()
    data.append("title", formData.title)
    data.append("description", formData.description)
    data.append("event_date", formData.event_date)
    data.append('position',String(formData.position))

    // only send image if user selected a new one
    if (imageFile) {
      data.append("image", imageFile)
    }

    const method = showEdit ? "PUT" : "POST"
    const url = showEdit
      ? `http://localhost:3010/events/${showEdit}`
      : "http://localhost:3010/events"

    await fetch(url, {
      method,
      body: data, // 👈 important
    })

    resetForm()
    await fetchEvents()
  } catch (error) {
    console.log("save Failed")
  } finally {
    setIsSaving(false)
  }
}


  async function handleDelete(id: number) {
    try {
      setIsSaving(true)
      await fetch(`http://localhost:3010/inventory/${id}`, {
        method: "DELETE"
      })
      await fetchEvents()
    } catch (err) {
      console.error("delete failed")
    } finally {
      setIsSaving(false)
    }
  }

  const [openMenu, setOpenMenu] = useState(false)

  

  const loadingState = isFetching || isSaving



  if (loadingState) {
    return (
      <div className="fixed flex items-center justify-center bg-black/50 w-full h-full">
        <div className="loader"></div>
      </div>
    )
  }

  return (
    <section className="p-4 pb-8 md:p-8">
      {/* Navbar */}
      <nav className="flex items-center justify-between w-full pb-8">
        <Image alt="logo" src="/neov2.png" width={80} height={80} />
        <LogoutButton />
      </nav>

      {/* Mobile menu */}
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
            <span className={`${openMenu ? 'rotate-90' : 'rotate-0'} transition-all duration-300`}><ChevronRight size={20} /></span>
          </h1>
          {openMenu &&
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <AdminNav />
            </motion.div>
          }
        </motion.div>
      </AnimatePresence>

      <div className="h-15 sm:h-15"></div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr_280px] gap-12 sm:gap-6 w-full p-3 sm:pl-6">

        {/* LEFT – Events list */}
      <aside className="border-0 sm:border-r border-[#343434] pr-4 h-[95vh] flex flex-col">
  {/* Header */}
  <div>
    <h1 className="text-white text-xl sm:text-2xl font-medium mb-2">Current Events</h1>
    <p className="text-white/70 text-xs mt-2 mb-4">Click on an event to edit it</p>
  </div>

  {/* Scrollable Events List */}
  <div className="list mask-b-from-90% mask-b-to-100% relative flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-300 scrollbar-track-transparent ">

    {events.length === 0 ? (
      <div className="flex flex-col items-center mt-10 justify-center h-full">
        <CircleOff color="white" size={35} />
        <h1 className="text-white/80 font-medium text-md mt-4">No Events Added</h1>
      </div>
    ) : (
      events.map((event) => (
        <div
          key={event.id}
          onClick={() => clickEdit(event)}
          className={`p-1.5 rounded-md ${
            showEdit === event.id ? "bg-white/10 " : "hover:bg-white/5"
          } mt-2 group hover:bg-white/5 flex items-center justify-between w-full cursor-pointer transition-all duration-300`}
        >
          {event.title}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowEdit(event.id);
              setModal(true);
            }}
            className="rounded-lg p-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 cursor-pointer bg-red-400 border border-red-900"
          >
            <Trash color="#8C2123" />
          </button>
        </div>
      ))
    )}
  </div>
</aside>


        {/* RIGHT – Event form */}
        <form className="flex flex-col pl-0 sm:pl-6 gap-6 w-full sm:max-w-2xl">

          {/* Header */}
          <div className="mb-2">
            <AnimatePresence mode="wait">
              {showEdit !== null && !modal ?
                <motion.div
                  key={showEdit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3 } }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  className="flex flex-row items-start sm:items-center justify-between"
                >
                  <div>
                    <h1 className="text-2xl font-medium text-white">Edit Event</h1>
                    <p className="text-white/70 text-xs mt-2">Update the information for the selected event</p>
                  </div>
                  <button type="button" onClick={resetForm} className="bg-white text-black rounded-lg px-2 hover:bg-white/80 transition-all duration-300 cursor-pointer py-1.5"><RotateCcw size={18}/></button>
                </motion.div> :
                <motion.div
                  className="flex items-center justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3 } }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                >
                  <div>
                    <h1 className="text-xl sm:text-2xl font-medium text-white">Add / Edit / Delete Event</h1>
                    <p className="text-white/70 text-xs mt-2">Manage your events easily</p>
                  </div>
                </motion.div>
              }
            </AnimatePresence>
          </div>
              <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between w-full">
              <label className="text-sm text-white/70">Event Photo</label>
          <input
                type="file"
                accept="image/*"
                id="image-upload"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (!file) return

                  setImageFile(file)
                  setImagePreview(URL.createObjectURL(file))
                }}
                className="hidden "
              />
               <label
                htmlFor="image-upload"
                className="inline-flex items-center gap-1.5 justify-center
                          px-4 py-2 rounded-lg bg-yellow-400 text-black
                          cursor-pointer hover:bg-yellow-300 transition text-sm"
              >
                <Import size={18}/> Upload Image
              </label>
            </div>
            <div className="flex flex-col items-start gap-4">
              <div className="h-40 w-full rounded-lg border border-[#343434] flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    className="w-full h-full object-cover bg-center"
                    alt="Preview"
                  />
                ) : (
                  <span className="text-xs text-white/40">No image</span>
                )}
              </div>
              {imageFile && (
                <p className="text-xs truncate w-1/2 text-white/60 mt-1">
                  Selected: <em className="text-white">{imageFile.name}</em>
                </p>
              )}
            
            </div>
          </div>
          {/* Fields */}
          <div className="flex flex-col gap-1">
              <label className="text-sm text-white/70">Date</label>
              <input
                type="date"
                className="input"
                value={formData.event_date}
                onChange={(e) =>
                  setFormData(p => ({ ...p, event_date: e.target.value }))
                }
              />
            </div>


          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/70">Title</label>
            <input className="input" value={formData.title} onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/70">Description</label>
            <textarea className="input" value={formData.description} onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))} />
          </div>

          <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4 w-full justify-between">
             <div className="flex flex-col items-start gap-1">
               <label className="text-sm text-white/70">Position</label>
            <p className="text-xs font-light flex items-center gap-2 text-white/50">
            <span className="flex items-center gap-1.5">Position 1 = <em className="hidden sm:block">Up</em> <em className="block sm:hidden">Left</em>
            </span>  <ArrowRightLeft size={18}/>
            <span className="flex items-center gap-1.5">Position 1 = <em className="hidden sm:block">Down</em> <em className="block sm:hidden">Right</em></span>
            </p>
             </div>
            {firstColumn.length >= 4 ?
             <>
            <p className="text-xs font-light text-red-300 hidden sm:block mt-1">Up Column is full</p>
            <p className="text-xs font-light text-red-300 block sm:hidden mt-1">Left Column is full</p>
            </>:secondColumn.length >=4 ? <>
             <p className="text-xs font-light text-red-3000 hidden sm:block mt-1">Down Column is full</p>
            <p className="text-xs font-light text-red-300 block sm:hidden mt-1">Right Column is full</p>
              </>:''}
          </div>
            <select
            className="input mt-1"
            value={formData.position}
            onChange={(e) =>
              setFormData(p => ({
                ...p,
                position: Number(e.target.value),
              }))
            }
          >
            <option value={1}>Up / Left</option>
            <option value={2}>Down / Right</option>
          </select>
          </div>

          {/* Image / preview */}
         

          <button disabled={isSaving} onClick={handleSubmit} className="w-full p-1.5 rounded-lg bg-yellow-400 text-yellow-900 border hover:bg-yellow-500 transition-all duration-300 cursor-pointer border-green-900">
            {showEdit ? 'Update' : 'Create'}
          </button>
        </form>

        <div className="hidden md:block">
          <AdminNav />
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
        onClose={() => {
          setModal(false)
          setShowEdit(null)
        }}
      />
    </section>
  )
}

// Confirm modal
 const ConfirmModal = ({
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
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/65 flex items-center justify-center"
      >
        <div className="bg-[#343434] rounded-lg p-4 border border-black flex flex-col gap-4">
          <div>
            <h1 className="text-white text-xl font-medium">Confirm the Delete</h1>
            <p className="text-white/50">By confirming, the data will be removed forever</p>
          </div>

          <div className="flex justify-between w-full">
            <button onClick={onConfirm} className="rounded-lg px-3 py-1 bg-red-400 text-red-900 border border-red-900 hover:bg-red-500">Delete</button>
            <button onClick={onClose} className="text-white font-medium">Cancel</button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default EventEdit
