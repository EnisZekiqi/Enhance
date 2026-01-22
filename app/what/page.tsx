import What from "./WhatClient";

async function getWhat() {
  const res = await fetch('http://localhost:3010/what',{cache:"no-store"})
  if (!res.ok) {
    throw new Error("Failed to fetch what");
  }
  const data = await res.json()

  return data
}

export default async function WhatPage() {

  const what = await getWhat()


  return(
    <>
    <What what={what}/>
    </>
  )
}