import PartnersClient from "./PartnersClient";

async function getPartners() {
    const res = await fetch('http://localhost:3010/partners')
    if (!res.ok) {
        throw new Error("Failed to fetch partners");
    }
    const data = await res.json()

    return data
}

async function Partners() {

    const partners = await getPartners()

    return ( 
        <>
       <PartnersClient partners={partners}/>
        </>
     );
}
 
export default Partners;