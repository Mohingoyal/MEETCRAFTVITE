// import  { useState,useEffect } from 'react'
// import axios from "axios"
// import ShowCity from './ShowCity';
// import Service from './Service'
// function EventSearch() {

//        let [cityarry,setcity]=useState<string[]>([]);
//          let [services,setservices]=useState<string[]>([]);
//    useEffect(
//      ()=>
//     { let resp;
//         const  call=async ()=>{let url="http://www.localhost:2001/events/cities";
//          resp=await axios.post(url);
//           //  alert(resp.data[0]);
//         setcity(resp.data)
//         }
// call();


//     },[]
//    )//will run on first load
//   //lets now represent the data in 
// async function handlechange(e:React.ChangeEvent<HTMLSelectElement>)
// {
//  let value=e.target.value;
// let url="http://www.localhost:2001/events/getservices";
// let obj={event:value}
// let response=await axios.post(url,obj);
// alert(JSON.stringify(response.data))
// response.data.services=response.data.services.split(",")
// setservices(response.data.services);
// }
//   return (
//     <center>
//       <div className='p-2.5 mt-2.5 '>
//  <select 
//  name='city'
//  onChange={handlechange}
//  >
//   {
//     cityarry.map((resp)=><ShowCity city={resp}></ShowCity>)
//   }
//  </select>
//  </div>
//  <div>
//   <span>Services for the selected event:</span>
//   <label
//   >
//   {
//     services.map((resp)=>
//    <Service service={resp}></Service>
//     )
//   }
//   </label>
//  </div>
//  </center>

//   )
// }

// export default EventSearch;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import ShowCity from "./ShowCity";
// import servicesList from "./ServiceList";
// import Service from "./Service";
// //will run on first load
// //   //lets now represent the data in 

// const inputClass =
//   "w-full border border-[#D8E2DC] bg-[#F9FAF6] px-4 py-3 text-sm text-[#263F34] outline-none transition focus:border-[#185744] focus:ring-2 focus:ring-[#185744]/10";

// export default function EventSearch() {

// const [city,setcityuser]=useState<string>();//selected by user for his event

//   const [event, setEvent] = useState("");//event selected by user

//   const [events, setEvents] = useState<string[]>([]);//the set of all events
//   const [vendors, setVendors] = useState([]);

//   const [hasSearched, setHasSearched] = useState(true);

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//     const [selectedServices, setSelectedServices] = useState([]);
//  let [cityarry,setcity]=useState<string[]>([]);//array of strings
//   // Fetch event options from the backend
//   useEffect(() => {
//     const fetchEvents = async () => {
//      let url="http://www.localhost:2001/events/getevents";
//      let resp=await axios.post(url);
//     //  alert(resp.data)
//      setEvents(resp.data);
//     };

//     fetchEvents();
//   }, []);


//  useEffect(
//      ()=>
//     { let resp;
//         const  call=async ()=>{let url="http://www.localhost:2001/events/cities";
//          resp=await axios.post(url);
//           //  alert(resp.data[0]);
//         setcity(resp.data)
//         }
// call();
//  },[]
//     )

//   // Select or deselect a service
//   const toggleService = (serviceName) => {
//     setSelectedServices((prev) =>
//       prev.includes(serviceName)//nhi hai service toh add karo else drop karo
//         ? prev.filter((item) => item !== serviceName)
//         : [...prev, serviceName]
//     );
//   };

//   // Search for matching vendors
//   const handleSearch = async () => {
//     if (!city || !event || selectedServices.length === 0) {
//       setMessage(
//         "Please select a city, event and at least one service."
//       );
//       return;
//     }

//     setMessage("");
//     setHasSearched(true);
//     setLoading(true);
//     setVendors([]);

//     // try {
//     //   const resp = await axios.post(
//     //     "http://localhost:2001/vendor/search",
//     //     {
//     //       city,
//     //       event,
//     //       services: selectedServices,
//     //     }
//     //   );

//     //   setVendors(
//     //     Array.isArray(resp.data.msg) ? resp.data.msg : []
//     //   );
//     // } catch (error) {
//     //   console.log("Vendor search failed:", error);
//     //   setMessage("Unable to fetch vendors. Please try again.");
//     // } finally {
//     //   setLoading(false);
//     // }
//   };

//   return (
//     <>
//     <nav className="sticky top-0 z-50 border-b border-[#E5E0D5] bg-[#F7F5EF]/95 shadow-sm backdrop-blur-md">
//   <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

//     Logo and brand name
//     <div className="flex items-center gap-3">
//       <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#123F35] text-xl text-[#E8D5A7]">
//         ✦
//       </div>

//       <div>
//         <h1 className="text-xl font-extrabold tracking-tight text-[#123F35]">
//           MeetCraft
//         </h1>
//         <p className="text-xs text-[#78837A]">
//           Every occasion, beautifully planned.
//         </p>
//       </div>
//     </div> 

//     Navigation links
//     <div className="hidden items-center gap-8 md:flex">
//       <a
//         href="#home"
//         className="text-sm font-medium text-[#31483E] transition hover:text-[#26735B]"
//       >
//         Home
//       </a>

//       <a
//         href="#about"
//         className="text-sm font-medium text-[#31483E] transition hover:text-[#26735B]"
//       >
//         About Us
//       </a>
//     </div>


//   </div>
// </nav> 
//     <div className="min-h-screen bg-[#F7F6F0] px-4 py-10 sm:px-8">
//       <div className="mx-auto max-w-7xl">

//         {/* Page heading */}
//         <header className="mb-9">
//           <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#57816A]">
//             MeetCraft 
//           </p>

//           <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#203D32] sm:text-4xl">
//             Plan your event
//           </h1>

//           <p className="mt-3 max-w-2xl text-sm leading-6 text-[#78837A] sm:text-base">
//             Tell us where you're celebrating and what you need.
//             We'll help you discover suitable services for your occasion.
//           </p>
//         </header>

//         {/* Search and service selection */}
//         <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[300px_1fr]">

//           {/* Search panel */}
//           <aside className="border border-[#E0E5DE] bg-white p-6">
//             <div className="mb-6 border-b border-[#E0E5DE] pb-5">
//               <h2 className="text-lg font-semibold text-[#203D32]">
//                 Your requirements
//               </h2>

//               <p className="mt-1 text-sm text-[#78837A]">
//                 Start with the basics.
//               </p>
//             </div>

//             {/* City */}
//             <div className="mb-5">
//               <label className="mb-2 block text-sm font-semibold text-[#31483E]">
//                 Event city
//               </label>

//               <select
//                value={city}
//                 onChange={(e)=>setcityuser(e.target.value)}
//                 className={inputClass}
//               >
//                 <option value="">Choose a city</option>

//                 {cityarry.map((item) => (
//                 <ShowCity city={item}></ShowCity>
//                 ))}

//               </select>
//             </div>

//             {/* Event */}
//             <div className="mb-5">
//               <label className="mb-2 block text-sm font-semibold text-[#31483E]">
//                 Event type
//               </label>

//               <select
//                 value={event}
//                 onChange={(e) => setEvent(e.target.value)}
//                 className={inputClass}
//               >
//                 <option value="">Choose an event</option>

//                 {events.map((item) => (
//                   <option

//                     value={item}
//                   >
//                     {item}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Selected services */}
//             <div className="mb-6">
//               <label className="mb-2 block text-sm font-semibold text-[#31483E]">
//                 Your selections
//               </label>

//               <div className="min-h-20 border border-[#D8E2DC] bg-[#F9FAF6] p-3">
//                 {selectedServices.length === 0 ? (
//                   <p className="text-xs leading-5 text-[#78837A]">
//                    Your Selected services will appear here.
//                   </p>
//                 ) : (
//                   <div className="flex flex-wrap gap-2">
//                     {selectedServices.map((item) => (
//                       <span
//                         key={item}
//                         className="border border-[#C8D8CB] bg-[#EDF3EC] px-2 py-1 text-xs text-[#185744]"
//                       >
//                         {item}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={handleSearch}
//               disabled={loading}
//               className="w-full bg-[#185744] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#123F35] disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loading ? "Searching..." : "Find Services  →"}
//             </button>

//             {message && (
//               <p className="mt-3 text-sm leading-5 text-[#A04B36]">
//                 {message}
//               </p>
//             )}

//             <button
//               type="button"
//               onClick={() => {
//                 setcityuser("");
//                 setEvent("");
//                 setSelectedServices([]);
//                 setMessage("");
//                 setVendors([]);
//                 setHasSearched(false);
//               }}
//               className="mt-4 w-full text-sm font-medium text-[#57816A] hover:text-[#185744]"
//             >
//               Clear all selections
//             </button>
//           </aside>

//           {/* Services */}
//           <main>
//             <div className="mb-6 border-b border-[#DCE4DC] pb-5">
//               <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#57816A]">
//                 Choose your services
//               </p>

//               <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#203D32]">
//                 What does your event need?
//               </h2>

//               <p className="mt-2 text-sm leading-6 text-[#78837A]">
//                 Select as many services as you need. You can change
//                 your choices at any time.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
//               {servicesList.map((item) => {
//                 const isSelected = selectedServices.includes(item.name);

//              return <Service {...item} isSelected={isSelected} toggleService={toggleService}></Service>
//               })}
//             </div>

//             <div className="mt-5 flex items-center justify-between border-t border-[#DCE4DC] pt-4">
//               <p className="text-sm text-[#78837A]">
//                 {selectedServices.length} services selected
//               </p>

//               <button
//                 type="button"
//                 onClick={() => setSelectedServices([])}
//                 className="text-sm font-medium text-[#57816A] hover:text-[#185744]"
//               >
//                 Clear selection
//               </button>
//             </div>
//           </main>
//         </div>

//         {/* Search results */}
//         {hasSearched && (
//           <section className="mt-12 border-t border-[#DCE4DC] pt-8">
//             <div className="mb-7">
//               <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#57816A]">
//                 Search results
//               </p>

//               <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#203D32]">
//                 Vendors for your event
//               </h2>

//               <p className="mt-2 text-sm text-[#78837A]">
//                 {city} / {event} / {selectedServices.join(", ")}
//               </p>
//             </div>

//             {loading ? (
//               <div className="border border-[#E0E5DE] bg-white px-6 py-12 text-center">
//                 <p className="text-sm text-[#57816A]">
//                   Searching available vendors...
//                 </p>
//               </div>
//             ) : vendors.length === 0 ? (
//               <div className="border border-[#E0E5DE] bg-white px-6 py-12 text-center">
//                 <h3 className="text-lg font-semibold text-[#203D32]">
//                   No matching vendors found
//                 </h3>

//                 <p className="mt-2 text-sm text-[#78837A]">
//                   Try another city or choose different services.
//                 </p>
//               </div>//koi vendor nhi mila toh bas yeh message show kar diya
//             ) : (
//               <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

//               </div>
//             )}
//           </section>
//         )}
//       </div>
//     </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import ShowCity from "./ShowCity";
import Service from "./Service";
import type {Vendors} from "./vendorsinterface"
import { useLocation } from "react-router-dom";
import LoginRequired from "../LoginRequired";
type EventItem = {
  event: string;
  // eventname?: string;
  // name?: string;
  services: string;//jaise hi event select hoga mai usko services bhi bhej dunga
};

const inputClass =
  "w-full border border-[#D8E2DC] bg-[#F9FAF6] px-4 py-3 text-sm text-[#263F34] outline-none transition focus:border-[#185744] focus:ring-2 focus:ring-[#185744]/10";

export default function EventSearch() {
const location = useLocation();

const [authenticated, setAuthenticated] = useState(false);

  const [city, setCity] = useState("");//selected by user to organise
  const [eventchosen, setEvent] = useState("");//choosen by user
  const [events, setEvents] = useState<EventItem[]>([]);//pura hisaaab kitaab aa gaya har event ki har service
  const [cityarry, setCityArr] = useState<string[]>([]);//saari cities jisme service hai
  //================================================
  const [services, setServices] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [vendors, setVendors] = useState<Vendors[]>([]);//pehle array khali hai ya phir ais akeh lo ki vendors mein initially kuch nhi hai
  //==============================================
  const [hasSearched, setHasSearched] = useState(false);
 const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  let email:string;
  if(localStorage && localStorage.getItem("emailid")!=null)
 {email=localStorage.getItem("emailid")}
  //  alert(email)
  const vendorsPerPage = 3;
  const [favs, setfavs] = useState<string[]>([]);
  const totalPages = Math.ceil(vendors.length / vendorsPerPage);

  const currentVendors = vendors.slice(
    (currentPage - 1) * vendorsPerPage,
    currentPage * vendorsPerPage
  );
    async function getfavourites(email:string) {
    let token=localStorage.getItem("token")
    let url = "http://www.localhost:2001/citizen/getfavs"
    // alert("favs")
    let resp = await axios.post(url, { email: email }, {
        headers: {
            authorization: `Bearer ${token}`
        }}
);
if(resp.data!=null)
    {setfavs(resp.data[0].vendoremails);}
    // alert(resp.data[0].vendoremails)
    return;
  }
useEffect(() => {

    async function checkAuth() {
        try {
          

            let token = localStorage.getItem("token");
console.log("EVENT ORIGIN:", window.location.origin);
console.log("EVENT TOKEN:", localStorage.getItem("token"));
            if (!token) {
                     alert("here comes catch of token")
                setAuthenticated(false);
                setfavs([]);
                return;
            }

            let response = await axios.post(
                "http://www.localhost:2001/users/checkauth",
                {},
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            if (
                
                response.data.utype === "Citizen"
            ) {
                setAuthenticated(true);

                // Fetch favourites immediately after verification
                await getfavourites(email);
            }
            else {
                setAuthenticated(false);
                setfavs([]);
            }

        }
        catch (error) {
          alert("here comes catch of event search")
            setAuthenticated(false);
            setfavs([]);

            localStorage.removeItem("token");
            localStorage.removeItem("emailid");
            localStorage.removeItem("utype");
        }
       finally {
    setLoading(false);
}
    }

    checkAuth();

}, [location.key]);

  // Fetch events and their curated services
  useEffect(() => {
    
    // async function fetchEvents() {
    //   setMessage("");
    //   try {
    //     const resp = await axios.post(
    //       "http://localhost:2001/events/geteventsandtheirservices"
    //     );

    //   alert("Events loaded:");
    //     setEvents(resp.data);
    //   } catch (error) {

    //     console.log("Error fetching events:", error);
    //     setMessage("Could not load events. Please refresh the page.");
    //   }
    // }
    async function fetchEvents() {
      setMessage("");
      let token=localStorage.getItem("token")
console.log("The token supposed is "+token)
      try {
        //  alert("A: Before axios");
console.log("TOKEN:", token);
console.log("TOKEN TYPE:", typeof token);
console.log("TOKEN PARTS:", token?.split(".").length);
// alert(token)
        const resp = await axios.post(
          "http://www.localhost:2001/events/geteventsandtheirservices",//for events and services
          {},
          {headers: { "Content-Type": "application/x-www-form-urlencoded",'authorization' : `Bearer ${token}` }}
        );
        // alert("hi")
        // alert(JSON.stringify(resp.data))
console.log(resp.data);
console.log(Array.isArray(resp.data));


        // alert("B: Events loaded successfully");
        setEvents(resp.data);
      } catch (error) {
        console.log("Error fetching events:"+" "+ error);
         alert("C: Catch is running");

        
        setMessage("Could not load events. Please refresh the page.");
      }
    }

    async function fetchCities() {
      try {
        const resp = await axios.post(
          "http://www.localhost:2001/events/cities",

        );
        setCityArr(resp.data);
      } catch (error) {
        console.log("Error fetching cities:", error);
      }
    }
    
     
    fetchEvents();
    fetchCities();

  }, []);
    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F8F3]
                flex items-center justify-center">
                <p className="text-[#185744] font-medium">
                    Verifying your session...
                </p>
            </div>
        );
    }
if (!authenticated) {
    return <LoginRequired />;
}
  // Show services belonging ONLY to the chosen event
  function handleEventChange(selectedEvent: string) {
    setEvent(selectedEvent);
    setSelectedServices([]);
    setServices([]);
    setVendors([]);
    setHasSearched(false);
    setMessage("");

    //USE STATE IS ASYNCHRONOUS WOH FUNCTION PURA HONE KE BAAD HI PURI RENDERING KAREGA, PEHLE NHI!
    const eventobj = events.filter((item) => {
      if (item.event == selectedEvent) {
        return item;
      }//eventobj will get the object according to the selected event
    }
    )

    alert(JSON.stringify(eventobj))
//iss wale step mein. use event ke corros[ponding services bharli]
    if (eventobj[0]?.services) {
      const serviceArray = eventobj[0].services
        .split(",")
        .map((service) => service.trim())//har ek word jo mila uski trimming kardi
        .filter((service) => service.length > 0);

      setServices(serviceArray);
    }
  }

  // Select or deselect a service
  function toggleService(serviceName: string) {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((item) => item !== serviceName)
        : [serviceName]
    );

    setHasSearched(false);
    setVendors([]);
    setMessage("");
  }

  // Search vendors
  async function handleSearch() {
    if (!city || !eventchosen || selectedServices.length === 0) {
      setMessage(
        "Please select a city, event and at least one service."
      );
      return;
    }
    setCurrentPage(1);
    setMessage("");
    setHasSearched(true);
    setLoading(true);
    setVendors([]);

    try {
      // alert(selectedServices);
      const resp = await axios.post(
        "http://www.localhost:2001/vendor/getvendorsforevent",
        {
          city:city,

          service: selectedServices,//yeh toh ho liya jo bhi data bhejna hai

        }
        ,
                  
          {headers:{'authorization':`Bearer ${localStorage.getItem("token")}`}}
      );
    

      // Supports either an array or { vendors: [...] }
      const results = resp.data;
if(results.status!=null)
{
  alert(results.msg)
  return ;
}

      setVendors(results);

      if (results.length === 0) {
        setMessage("No matching vendors found for your selection.");
      }
    } catch (error) {
      console.log("Vendor search error:", error);
      setMessage("Vendor search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  //=======================
  function clearAll() {
    setCity("");
    setEvent("");
    setServices([]);
    setSelectedServices([]);
    setVendors([]);
    setMessage("");
    setHasSearched(false);
    setCurrentPage(1);
  }

  //============delicious============================
  async function addtofavourites(vendormail:string) {

            let token = localStorage.getItem("token");
    let url = "http://www.localhost:2001/citizen/updatefavs"
    let resp;
    //  alert("added")
    setfavs((prev) =>//setfavs apna pura array of string de diya
      prev.includes(vendormail)
        ? prev.filter((item) => item !== vendormail)//will return all items without the vendor email
        : [...prev, vendormail]
    );
    let obj;
    if (favs.includes(vendormail)) {
      let favouritesobj = favs.filter((item) => item !== vendormail)
      obj = { email: email, favourites: favouritesobj }//removal of that object
    }
    else {
      obj = { email: email, favourites: [...favs, vendormail] }
    }
    resp = await axios.post(url, obj,{
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    // alert(favs);
    alert(resp.data)
  }
  //===============================================
  return (
    <>


      <div className="min-h-screen bg-[#F7F6F0] px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-9">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#57816A]">
              MeetCraft
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#203D32] sm:text-4xl">
              Plan your event
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#78837A] sm:text-base">
              Tell us where you're celebrating and what you need.
              We'll help you discover services curated for your event.
            </p>
          </header>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[300px_1fr]">
            {/* Search panel */}
            <aside className="border border-[#E0E5DE] bg-white p-6">
              <div className="mb-6 border-b border-[#E0E5DE] pb-5">
                <h2 className="text-lg font-semibold text-[#203D32]">
                  Your requirements
                </h2>
                <p className="mt-1 text-sm text-[#78837A]">
                  Start with the basics.
                </p>
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-[#31483E]">
                  Event city
                </label>
                <select
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setHasSearched(false);
                    setVendors([]);
                    setMessage("");
                  }}
                  className={inputClass}
                >
                  <option value="">Choose a city</option>
                  {cityarry.map((item) => (
                    <ShowCity key={item} city={item} />
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-[#31483E]">
                  Event type
                </label>
                <select
                  value={eventchosen}
                  onChange={(e) => handleEventChange(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Choose an event</option>
                  {events.map((item) => (
                    <option key={item.event} value={item.event}>
                      {item.event}
                    </option>
                  ))}
                </select>

              </div>
              {/* <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-[#31483E]">
                  Emailid of user
                  <input
                    type="text"
                    className="bg-amber-200"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  ></input>
                </label>
                <button
                  className="bg-amber-200"
                  onClick={() => getfavourites(email)}
                >
                  Get favourites
                </button>
              </div> */}
              {/* <div className="mb-6">
                <label className="mb-2 block text-sm font-semibold text-[#31483E]">
                  Your selections
                </label>
                <div className="min-h-20 border border-[#D8E2DC] bg-[#F9FAF6] p-3">
                  {selectedServices.length === 0 ? (
                    <p className="text-xs leading-5 text-[#78837A]">
                      Your selected services will appear here.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selectedServices.map((item) => (
                        <span
                          key={item}
                          className="border border-[#C8D8CB] bg-[#EDF3EC] px-2 py-1 text-xs text-[#185744]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div> */}

              <div className="mb-6">
                <label className="mb-2 block text-sm font-semibold text-[#31483E]">
                  Your selected service
                </label>

                <div className="min-h-20 border border-[#D8E2DC] bg-[#F9FAF6] p-3">
                  {selectedServices.length === 0 ? (
                    <div className="flex min-h-14 items-center">
                      <p className="text-xs leading-5 text-[#78837A]">
                        Choose a service from the options to see it here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedServices.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 border border-[#C8D8CB] bg-white p-3"
                        >
                          {/* Check icon */}
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#185744] text-sm text-white">
                            ✓
                          </div>

                          {/* Service details */}
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-[#185744]">
                              {item}
                            </p>
                            <p className="mt-1 text-xs text-[#78837A]">
                              Selected for your event
                            </p>
                          </div>

                          {/* Selected badge */}
                          <span className="border border-[#C8D8CB] bg-[#EAF1EA] px-2 py-1 text-xs font-medium text-[#185744]">
                            Selected
                          </span>
                        </div>
                      ))}

                      <p className="text-xs leading-5 text-[#78837A]">
                        Choose a different service to replace this selection.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSearch}
                disabled={loading}
                className="w-full bg-[#185744] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#123F35] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Searching..." : "Find Vendors →"}
              </button>

              {message && (
                <p className="mt-3 text-sm leading-5 text-[#A04B36]">
                  {message}
                </p>
              )}

              <button
                type="button"
                onClick={clearAll}
                className="mt-4 w-full text-sm font-medium text-[#57816A] hover:text-[#185744]"
              >
                Clear all selections
              </button>
              <p className="mt-3 text-sm leading-5 ">
                The results for your search will appear below
              </p>
            </aside>

            {/* Event-specific services */}
            <main className="mt-2">
              <div className="mb-6 border-b border-[#DCE4DC] pb-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#57816A]">
                  Choose your service
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#203D32]">
                  {eventchosen
                    ? `Services for ${eventchosen}`
                    : "What does your event need?"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#78837A]">
                  {eventchosen
                    ? "Select the service you need for this event."
                    : "Choose an event first to see its curated services."}
                </p>
              </div>

              {!eventchosen ? (
                <div className="border border-dashed border-[#C8D8CB] bg-white px-6 py-14 text-center">
                  <h3 className="font-semibold text-[#203D32]">
                    Choose your event to begin
                  </h3>
                  <p className="mt-2 text-sm text-[#78837A]">
                    We'll display only the services relevant to your occasion.
                  </p>
                </div>
              ) : services.length === 0 ? (
                <div className="border border-[#E0E5DE] bg-white px-6 py-10 text-center">
                  <h3 className="font-semibold text-[#203D32]">
                    No services configured
                  </h3>
                  <p className="mt-2 text-sm text-[#78837A]">
                    This event has no services listed yet. Check its services
                    field in your database.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 p-3 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {services.map((service) => {
                    const isSelected = selectedServices.includes(service);
                    let obj = { service: service, isSelected: isSelected };
                    return <Service {...obj} toggleService={toggleService}></Service>

                  }
                  )
                  }
                </div>
              )}

              {eventchosen && services.length > 0 && (
                <div className="mt-5 flex items-center justify-between border-t border-[#DCE4DC] pt-4">
                  <p className="text-sm text-[#78837A]">
                    {selectedServices[0]} service selected
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedServices([]);
                      setVendors([]);
                      setHasSearched(false);
                    }}
                    className="text-sm font-medium text-[#57816A] hover:text-[#185744]"
                  >
                    Clear selection
                  </button>
                </div>
              )}
            </main>
          </div>

          {/* Vendor results */}
          {hasSearched && (
            <section className="mt-12 border-t border-[#DCE4DC] pt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#57816A]">
                Search results
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[#203D32]">
                Vendors for your event
              </h2>
              <p className="mt-2 text-sm text-[#78837A]">
                {[city, eventchosen, selectedServices.join(", ")]
                  .filter(Boolean)//boolean taaki agar koi value ya string khaali ho toh woh na pick kare
                  .join(" / ")}
              </p>

              {loading ? (
                <div className="mt-6 border border-[#E0E5DE] bg-white px-6 py-12 text-center">
                  <p className="text-sm text-[#57816A]">
                    Searching available vendors...
                  </p>
                </div>
              ) : vendors.length === 0 ? (
                <div className="mt-6 border border-[#E0E5DE] bg-white px-6 py-12 text-center">
                  <h3 className="text-lg font-semibold text-[#203D32]">
                    No matching vendors found
                  </h3>
                  <p className="mt-2 text-sm text-[#78837A]">
                    Try another city or choose different service.
                  </p>
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">


                  {currentVendors.map((vendor) => (
                    <article
                      key={vendor._id}
                      className="group overflow-hidden rounded-2xl border border-[#DCE5DC] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#91AA94] hover:shadow-xl"
                    >
                      {/* Business image */}
                      <div className="relative h-56 overflow-hidden bg-[#EAF1EA]">
                        {vendor.shoppicurl ? (
                          <img
                            src={vendor.shoppicurl}
                            alt={vendor.business || "Business"}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full flex-col items-center justify-center">
                            <span className="text-4xl text-[#57816A]">✦</span>
                            <p className="mt-2 text-sm text-[#78837A]">
                              Business profile
                            </p>
                          </div>
                        )}

                        {/* Business category */}
                        {vendor.selcate && (
                          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#185744] shadow-sm">
                            {vendor.selcate}
                          </span>
                        )}

                        {/* Certification indicator */}
                        {vendor.certpicurl && (
                          <span className="absolute right-4 top-4 rounded-full bg-[#185744] px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                            ✓ Certified
                          </span>
                        )}
                      </div>

                      {/* Business details */}
                      <div className="p-5">
                        {/* Name and rating */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="text-xl font-bold text-[#203D32] transition group-hover:text-[#185744]">
                              {vendor.business || "Business name unavailable"}
                            </h3>

                            <p className="mt-1 text-sm text-[#78837A]">
                              Managed by {vendor.name || "Business owner"}
                            </p>
                          </div>

                         <div className="flex items-center gap-2 mt-2">
  <span className="text-yellow-500 text-xl">★</span>

  <span className="font-semibold text-gray-800">
    {vendor.count > 0
      ? (vendor.sumstar / vendor.count).toFixed(1)
      : "No ratings"}
  </span>

  {vendor.count > 0 && (
    <span className="text-sm text-gray-500">
      ({vendor.count} ratings)
    </span>
  )}
</div>
                        </div>

                        {/* Location */}
                        <div className="mt-4 flex items-start gap-3 border-y border-[#EAF0E9] py-4">
                          <span className="text-lg">📍</span>

                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#31483E]">
                              {vendor.area}, {vendor.city}
                            </p>

                            {vendor.address && (
                              <p className="mt-1 text-xs leading-5 text-[#78837A]">
                                {vendor.address}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Contact and establishment details */}
                        <div className="mt-4 space-y-3">
                          <div className="flex items-start gap-3">
                            <span className="text-[#57816A]">✉</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-[#78837A]">Email address</p>
                              {vendor.emailid ? (
                                <a
                                  href={`mailto:${vendor.emailid}`}
                                  className="break-all text-sm font-medium text-[#185744] hover:underline"
                                >
                                  {vendor.emailid}
                                </a>
                              ) : (
                                <p className="text-sm text-[#78837A]">Not provided</p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <span className="text-[#57816A]">☎</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-[#78837A]">Contact number</p>
                              <p className="break-words text-sm font-medium text-[#31483E]">
                                {vendor.contact || "Not provided"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <span className="text-[#57816A]">◷</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-[#78837A]">Established</p>
                              <p className="text-sm font-medium text-[#31483E]">
                                {vendor.estd.split("T")[0].split("-")[0]}
                                {/* &&
              !Number.isNaN(new Date(vendor.estd).getTime())
                ? new Date(vendor.estd).getFullYear()
                : "Not provided"} */}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Website and Instagram */}
                        {(vendor.website || vendor.insta) && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {vendor.website && (
                              <a
                                href={
                                  /^https?:\/\//i.test(vendor.website)
                                    ? vendor.website
                                    : `https://${vendor.website}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg border border-[#C8D8CB] px-3 py-2 text-sm font-medium text-[#185744] transition hover:bg-[#EAF1EA]"
                              >
                                Website ↗
                              </a>
                            )}

                            {vendor.insta && (
                              <a
                                href={`https://www.instagram.com/${vendor.insta
                                  .replace(/^@/, "")
                                  .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
                                  .replace(/\/+$/, "")}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg border  border-[#C8D8CB] px-3 py-2 text-sm font-medium text-[#185744] transition hover:bg-[#EAF1EA]"
                              >
                                Instagram ↗
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => addtofavourites(vendor.emailid)}

                              title={
                                favs.includes(vendor.emailid)
                                  ? "Remove from favourites"
                                  : "Add to favourites"
                              }
                              className={`flex h-10 w-10 items-center justify-center rounded-full
    border shadow-sm transition-all duration-200
    hover:scale-110 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-[#185744]/30
    ${favs.includes(vendor.emailid)
                                  ? "border-pink-200 bg-pink-50 text-pink-600"
                                  : "border-[#D8E2DC] bg-white text-[#78837A] hover:border-pink-200 hover:bg-pink-50 hover:text-pink-500"
                                }`}
                            >
                              <span className="text-xl leading-none" aria-hidden="true">
                                {favs.includes(vendor.emailid) ? "♥" : "♡"}
                              </span>
                            </button>
                          </div>
                        )}

                        {/* Action buttons */}
                        <div className="mt-5 flex gap-3">
                          {vendor.contact ? (
                            <a
                              href={`tel:${vendor.contact}`}
                              className="flex-1 rounded-lg bg-[#185744] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#123F35]"
                            >
                              Contact vendor
                            </a>
                          ) : (
                            <span className="flex-1 rounded-lg bg-[#EAF1EA] px-4 py-3 text-center text-sm font-semibold text-[#78837A]">
                              Contact unavailable
                            </span>
                          )}


                        </div>
                      </div>
                    </article>
                  ))}

                </div>

              )}
              {vendors.length > vendorsPerPage && (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2">

                  <button
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-[#B9CEBD] px-4 py-2 text-sm font-medium text-[#185744] transition hover:bg-[#EAF1EA] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(//the first arguemnt creates an array of totalPages undefined values
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`h-10 min-w-10 rounded-lg px-3 text-sm font-medium transition ${currentPage === page
                          ? "bg-[#185744] text-white"
                          : "border border-[#B9CEBD] text-[#185744] hover:bg-[#EAF1EA]"
                          }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-[#B9CEBD] px-4 py-2 text-sm font-medium text-[#185744] transition hover:bg-[#EAF1EA] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>

                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </>
  );
}
