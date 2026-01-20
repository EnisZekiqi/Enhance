import WhoClient from './WhoClient'


async function data() {
  const res = await fetch ('http://localhost:3010/who',{cache:"no-store"})
  if (!res.ok) {
    throw new Error("Failed to fetch Who");
    
  }
  const data = await res.json()
  return data
}

async function Page() {

  const who = await data()

  return ( 
    <>
    <WhoClient who={who}/>
    </>
   );
}
 
export default Page;