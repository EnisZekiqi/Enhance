import EventDetailClient from "./EventsDetailsClient";

async function getEventDetails(id:number) {
  const res = await fetch (`http://localhost:3010/events/${id}`)
  if (!res.ok) {
    throw new Error("Failed to fetch Event Details");
  }
  const data = res.json()

  return data
}

async function DetailEvents({params}:{params:{id:number}}) {

  const {id} = await params

  const idNumber = Number(id)

     const event = await getEventDetails(idNumber)

    return (
        <>
        <EventDetailClient event={event}/>
        </>
    );
}

export default DetailEvents;