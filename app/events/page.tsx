 import EventsClient from "./EventsClient";
 
 async function GetEvents() {
  const res =await fetch ('http://localhost:3010/events')
 
  if (!res.ok) {
  throw new Error("Failed to fetch Events");
 }

  const data = res.json()

  return data
 }

 async function PageEvents() {
 
  const events = await GetEvents()

  return ( 
    <>
    <EventsClient events={events}/>
    </>
   );
 }
  
 export default PageEvents;