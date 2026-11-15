// import React, { useState,useEffect } from 'react'
// import axios from "axios";
// import { useLocation } from 'react-router-dom';
// import type { Vendors } from '../events/vendorsinterface';
// import LoginRequired from '../LoginRequired';
// function Fav() {
//     const [email, setemail] = useState("");
//     const [vendoremails, setvendoremails] = useState<string[]>([])//array of strings
//     const [vendors, setvendors] = useState<Vendors[]>([]);
//     const [ratings, setRatings] = useState({});
  
  
import  { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import type { Vendors } from '../events/vendorsinterface';
import LoginRequired from '../LoginRequired';
const API_URL=import.meta.env.VITE_API_URL;
function Fav() {
    const [loading, setLoading] = useState(true);
    const [vendoremails, setvendoremails] = useState<string[]>([]);
    const [vendors, setvendors] = useState<Vendors[]>([]);
    const [ratings, setRatings] = useState<Record<string, number>>({});//empty ko pehle batana psdega ki kis format mein data aayega
let email=localStorage.getItem("emailid")
    const [authenticated, setAuthenticated] = useState(false);


    const location = useLocation();

    async function getfavs() {//alert("favs enters the chat")
          let token = localStorage.getItem("token");
        //   alert("INTO THE GETFAVS")
        let url = `${API_URL}/citizen/getfavs`
        // alert(email)
        let resp = await axios.post(url, { email: email },{headers: { "Content-Type": "application/x-www-form-urlencoded",'authorization' : `Bearer ${token}` }});//citizen ke router se favs collection se all info aa jayeggi is email ke kya favs the
        if(resp.data!=null)
    {    //alert("THE favs req is sent "+resp.data.vendoremails)
        setvendoremails(resp.data.vendoremails);
        setvendors([]);//taaki vendors wala use state khaali ho jaye
        //alert("KOHLI((((((((")
      //  alert(resp.data.vendoremails)
        let url1 = `${API_URL}/vendor/findvendors`
        //   resp.data.vendoremails.map( (item)=>
        //   {let response;
        //     // alert(item)
        //     async function call(){
        //     await axios.post(url1,{emailid:item}).then((response)=>{
        //     //  alert("hi and "+JSON.stringify(response.data))
        //     setvendors((prev)=>[...prev,response.data])//all the vendors which are favourites, unka pura data, saari janam kundli vendors usestate mein daaldiya
        //    // alert([vendors,response.data])
        //     alert(JSON.stringify(vendors))})

        //     }
        // alert("call will be called")
        // call();


        //}

        const vendorfavs = resp.data.vendoremails.map((item:string) =>
            axios.post(url1, { emailid: item })
        )
        const responses = await Promise.all(vendorfavs)//promise . allse saari axios.post requests asynchronously nhi chalengi
        const allvendors = responses.map((item) => item.data)
        setvendors(allvendors)}

    }
useEffect(() => {

    async function checkAuth() {
        try {
             setLoading(true);
    //    alert("entering the try of favs")
            let token = localStorage.getItem("token");

            if (!token) {
                       alert("here comes catch of token")
                setAuthenticated(false);
                return;
            }
//alert("token hai")
            let response = await axios.post(
                `${API_URL}/users/checkauth`,
                {},{headers: { "Content-Type": "application/x-www-form-urlencoded",'authorization' : `Bearer ${token}` }}
            );
//alert(JSON.stringify(response.data))
            if ( response.data.utype === "Citizen") {
                setAuthenticated(true);
                // alert("calling favs");
                await getfavs();
                // alert("bye bye favs")
            }
            else {
                setAuthenticated(false);
            }

        }
        catch (error) {
            alert("here comes catch of favs")
            setAuthenticated(false);
            setvendors([]);
            setvendoremails([]);

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
async function rateVendor(vendorEmail:string, stars:number) {
         let token = localStorage.getItem("token");
  try {
    const url = `${API_URL}/vendor/rate`;

    const resp = await axios.post(url, {
      emailid: vendorEmail,
    //   Citizenemail: email,
      stars: stars
    },{headers:{"Content-Type":"application/x-www-form-urlencoded",'authorization':`Bearer ${token}`}});

    if (resp.data.status === true) {
      setRatings((prev) =>{
       return {...prev,
        [vendorEmail]: stars}//yahaan par iska yeh matlab hai ki, is wali vendoremail, ko ye user ye rate dena chahta hai, [name]:value pair
      });

      alert("Thank you for rating this vendor!");
    } else {
      alert(resp.data.msg || "Could not submit rating.");
    }
  } catch (error) {
    alert("Something went wrong while submitting your rating.");
  }
}
    // useEffect(()=>
    // // console.log("HI")
    // alert(vendors)
    // ,[vendors])


    async function removefavourites(emailidtoremove:string) {
     let token = localStorage.getItem("token");
        setvendoremails((prev) => prev.filter((item) => item != emailidtoremove))
        // alert("hi")
        // alert(vendoremails);
        let url = `${API_URL}/citizen/removefavs`
        //alert("this shall be the array of vendoremails :-"+vendoremails.filter((item)=>item!=email))//sahi hai
        let obj = { email: email, vendorsemail: vendoremails.filter((item) => item !== emailidtoremove) }//this is A JSON OBJECT convert to string to show for alert
       // alert(JSON.stringify(obj))
        let resp = await axios.post(url, obj,{headers: { "Content-Type": "application/x-www-form-urlencoded",'authorization' : `Bearer ${token}` }});//now i have the favs with updated info about the users preferences
        setvendoremails(resp.data.vendoremails)
        //await getfavs();
        let url1 = `${API_URL}/vendor/findvendors`
        //   resp.data.vendoremails.map( (item)=>
        //   {
        //     // alert(item)
        //     async function call(){
        //     await axios.post(url1,{emailid:item}).then((response)=>{
        //     //  alert("hi and "+JSON.stringify(response.data))
        //     setvendors((prev)=>[...prev,response.data])//all the vendors which are favourites, unka pura data, saari janam kundli vendors usestate mein daaldiya
        //    // alert([vendors,response.data])
        //     alert(JSON.stringify(vendors))})

        //     }
        //    // alert("call will be called")
        // call();


        //   })
        const vendorsfavs = resp.data.vendoremails.map((item:string) =>
            axios.post(url1, { emailid: item })
        )
        const waitforresponsesofvendors = await Promise.all(vendorsfavs);
        const variable = waitforresponsesofvendors.map((item) => item.data)
        setvendors(variable);
    }
    return (
        <>
 
        <div className="min-h-screen bg-[#F5F8F3] px-4 py-8 sm:px-6 lg:px-10">
            {/* <center className='p-2.5'>
        <span className='bg-amber-300'></span>
        <input 
        type='text'
        value={email}
        className='bg-amber-300 border-amber-200'
        onChange={(e)=>setemail(e.target.value)}
        ></input>
<button
className='bg-amber-600 mr-1.5 ml-2'
onClick={getfavs}
>
    Search favourites
</button>
</center> */}

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#123F35] via-[#185744] to-[#57816A] p-6 sm:p-8 shadow-xl">
                <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-white/5" />
                <div className="pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/5" />

                <div className="relative mx-auto max-w-3xl">
                    <div className="mb-6 text-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#DCEBDD] uppercase">
                            <span className="text-amber-300">♥</span>
                            Your saved collection
                        </span>

                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Your Favourite Vendors
                        </h1>

                        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#DCEBDD] sm:text-base">
                            All your favourite businesses, together in one place.
                            Find the right vendor for your next celebration.
                        </p>
                    </div>

              
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 p-3 lg:grid-cols-3">
                {vendors.map((vendor) =>
                    <article
                        key={vendor._id}

                        className="group overflow-hidden rounded-3xl border border-[#DCE5DC] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#91AA94] hover:shadow-xl"

                    >
                        {/* Business image */}
                        <div
                            className="relative h-56 overflow-hidden bg-[#EAF1EA]"
                        >
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
                        <div
                            className="p-5 sm:p-6"
                        >
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

                               <div className="mt-4">
  <p className="mb-2 text-sm font-semibold text-[#31483E]">
    Rate this vendor
  </p>

  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (//traversing through the complete array
      <button
        key={star}
        type="button"
        onClick={() => rateVendor(vendor.emailid, star)}
        className={`text-3xl transition hover:scale-110 ${
          star <= (ratings[vendor.emailid] || 0)
            ? "text-amber-400"
            : "text-gray-300"
        }`}
        aria-label={`Rate ${star} out of 5 stars`}
      >
        ★
      </button>
    ))}
  </div>

  {ratings[vendor.emailid] && (//ratings use state hai for storing the star rating ki kitni uss user ne uss vendor ke liye ki hui hai
    <p className="mt-1 text-sm text-[#57816A]">
      Your rating: {ratings[vendor.emailid]}/5
    </p>
    //idhar square bracket ye mtlab hai ki ratings, ek initially empty object hai, aur jaise jaise isme jaise vendor ki emailid daalenge, vaise key value pairs ban jayenge, with value being the star rating by user
    
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
                                    {/* <button
                              type="button"
                              onClick={() => removefavourites(vendor.emailid)}
                              
                              title={
                                vendor.emailid?"Remove from favourites":"addto favourites"
                                 
                              }
                              className={`flex h-10 w-10 items-center justify-center rounded-full
    border shadow-sm transition-all duration-200
    hover:scale-110 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-[#185744]/30 
    
      (vendor.emailid)
                                  ? "border-pink-200 bg-pink-50 text-pink-600"
                                  : "border-[#D8E2DC] bg-white text-[#78837A] hover:border-pink-200 hover:bg-pink-50 hover:text-pink-500"
                                }
                                  
                                `}
                            >
                              <span className="text-xl leading-none" aria-hidden="true">
                                {"♥" }
                              </span>
                            </button> */}

                                    <button
                                        type="button"
                                        onClick={() => removefavourites(vendor.emailid)}
                                        title="Remove from favourites"
                                        aria-label={`Remove ${vendor.business || "vendor"} from favourites`}
                                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-pink-200 bg-pink-50 text-pink-600 shadow-sm transition-all duration-200 hover:scale-110 hover:border-pink-300 hover:bg-pink-100 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-300"
                                    >
                                        <span className="text-xl leading-none" aria-hidden="true">
                                            ♥
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
                )}</div>
        </div>

        </>

    )
}

export default Fav