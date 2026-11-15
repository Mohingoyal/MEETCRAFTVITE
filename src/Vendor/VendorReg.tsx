
import axios from "axios";
import React, { useState,useEffect } from "react";
import categories from "./categories";
import type { formobj } from "./interface_vendor";
import { useLocation } from "react-router-dom";
import LoginRequired from "../LoginRequired";
let initial_obj: formobj = {
  emailid: "",
  name: "",
  contact: "",
  business: "",
  area: "",
  address: "",
  city: "",
  estd: "",
  website: "",
  insta: "",
  shoppic: null,
  certpic: null,
  shopicurl: "",
  certpicurl: ""

}
export default function VendorReg() {
  const [form, setForm] = useState<formobj>(initial_obj);
const location = useLocation();

const [authenticated, setAuthenticated] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);//for array of objects
  const [shopPicture, setShopPicture] = useState<File|null>(null);
  const [certificate, setCertificate] = useState<File|null>(null);
  const [shopPreview, setShopPreview] = useState("");
  const [certPreview, setCertPreview] = useState("");
const [isSaving, setIsSaving] = useState(false);
const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState<"success" | "error" | "">("");
const [loading, setLoading] = useState(true);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
 async function fetchdata() {
    let url = "http://www.localhost:2001/vendor/fetch";
    //alert("hi")
    let resp = await axios.post(url, { emailid: form.emailid }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
    // if (resp.data.status == true) {
    //   alert("the search was successful and " + JSON.stringify(resp.data.msg))
    // }
    // else {
    //   alert("failure while search :" + JSON.stringify(resp.data.msg));
    // }
    if(resp.data.msg!=null)
   { resp.data.msg.estd = resp.data.msg.estd.split("T")[0].split("-")[0];//vah
    alert(resp.data.msg.estd);
    setForm(resp.data.msg);
    setSelectedCategories(resp.data.msg.selcate.split(","))
    setShopPreview(resp.data.msg.shoppicurl)//we will get cloudinary link here
    setCertPreview(resp.data.msg.certpicurl)}
    return;
  }

  useEffect(() => {

    async function checkAuth() {
        try {
          

            let token = localStorage.getItem("token");

            if (!token) {
                setAuthenticated(false);
                
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
               
                response.data.utype === "Vendor"
            ) {
                setAuthenticated(true);

                // Fetch complete record immediately after verification
                await fetchdata();
            }
            else {
                setAuthenticated(false);
              
            }

        }
        catch (error) {
            setAuthenticated(false);
         

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

  const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));//value setter for form
  };

  const toggleCategory = (category:string) => {
    
    setSelectedCategories((prev) =>
      prev.includes(category )
        ? prev.filter((item) => item !== category)//agar pehle se hai toh uncheck kar diya box
        : [...prev, category]//array ke andar new fiel add karke de diya
    );
  };

  const handleShopPicture = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files != null&&e.target.files[0]!=null) {
      setShopPicture(e.target.files[0]);
      setForm((form) => { return { ...form, ["shoppic"]: e.target.files[0] } });
    } let urlofshop:string;
    if(e.target.files!=null)
     {urlofshop = URL.createObjectURL(e.target.files[0])
         setShopPreview(urlofshop);
     }
  
   


  };

  let handleCertPicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // if (certPreview) URL.revokeObjectURL(shopPreview);
if(file!=null)
    setCertificate(file);
    setForm((form) => { return { ...form, ["certpic"]: file } });//very important agar sidha certificate use kiya hota toh asynchronous nature ke karan pic pass hone mein gadbad aati
    setCertPreview(URL.createObjectURL(file));
  };



  // async function OnFormSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   let url = "http://www.localhost:2001/vendor/save"
  //   let FrmData = new FormData();
  //   FrmData.append("emailid", form.emailid)
  //   FrmData.append("name", form.name)
  //   FrmData.append("contact", form.contact)
  //   FrmData.append("business", form.business)
  //   FrmData.append("area", form.area)
  //   FrmData.append("address", form.address)
  //   FrmData.append("city", form.city)
  //   FrmData.append("estd", form.estd)
  //   FrmData.append("insta", form.insta)
  //   if (form.shoppic != null)
  //     FrmData.append("shoppic", form.shoppic)
  //   if (form.certpic != null)
  //     FrmData.append("certpic", form.certpic)
  //   FrmData.append("website", form.website)
  //   FrmData.append("selcate", selectedCategories.join(","))
  //   let resp = await axios.post(url, FrmData, { headers: { 'Content-Type': 'multipart/form-data' } })
  //   // const vendorData = {
  //   //   ...form,
  //   //   categories: selectedCategories,
  //   //   shopPicture,
  //   //   certificate
  //   // };
  //   if (resp.data.status == true && resp.data.msg != null) {
  //     alert("Congratulation !! your data has been saved " + JSON.stringify(resp.data.msg))
  //   }
  //   else {
  //     alert("The data couldnt be saved please try again " + resp.data.err);
  //   }
  //   // alert("Vendor data:", vendorData);

  // };

async function OnFormSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  setIsSaving(true);
  setMessage("");
  setMessageType("");

  try {
    const url = "http://www.localhost:2001/vendor/save";
    const FrmData = new FormData();

    FrmData.append("emailid", form.emailid);
    FrmData.append("name", form.name);
    FrmData.append("contact", form.contact);
    FrmData.append("business", form.business);
    FrmData.append("area", form.area);
    FrmData.append("address", form.address);
    FrmData.append("city", form.city);
    FrmData.append("estd", form.estd);
    FrmData.append("insta", form.insta);

    if (form.shoppic != null) {
      FrmData.append("shoppic", form.shoppic);
    }

    if (form.certpic != null) {
      FrmData.append("certpic", form.certpic);
    }

    FrmData.append("website", form.website);
    FrmData.append("selcate", selectedCategories.join(","));

    const resp = await axios.post(url, FrmData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    if (resp.data.status === true && resp.data.msg != null) {
      setMessage("Vendor details saved successfully!");
      setMessageType("success");
    } else {
      setMessage(
        resp.data.err || "Unable to save vendor details. Please try again."
      );
      setMessageType("error");
    }
  } catch (error: any) {
    setMessage(
      error.response?.data?.err ||
      error.response?.data?.msg ||
      "Something went wrong. Please check your connection and try again."
    );
    setMessageType("error");
  } finally {
    setIsSaving(false);
  }
}

  //==========================
  async function UpdateVendor() {
    let url1 = "http://www.localhost:2001/vendor/getdataupdate";
    let resp = await axios.post(url1, { emailid: form.emailid }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });

    // console.log("lets see")
    // alert(JSON.stringify(resp.data));
    if (form.emailid == "")
      form.emailid = resp.data.msg.emailid;

    if (form.name == "")
      form.name = resp.data.msg.name;

    if (form.contact == "")
      form.contact = resp.data.msg.contact;

    if (form.business == "")
      form.business = resp.data.msg.business;

    if (form.area == "")
      form.area = resp.data.msg.area;

    if (form.city == "")
      form.city = resp.data.msg.city;

    if (form.address == "")
      form.address = resp.data.msg.address;

    if (form.estd == "")
      form.estd = resp.data.msg.estd;

    if (form.website == "")
      form.website = resp.data.msg.website;

    if (form.insta == "")
      form.insta = resp.data.msg.insta;

    // if (form.selectedCategories.length == 0)
    //     form.selectedCategories = resp.data.msg.selectedCategories;
    setSelectedCategories(resp.data.msg.selcate.split(","))

    if (form.shoppic == null)
      form.shopicurl = resp.data.msg.shoppicurl;
    if (form.certpic == null)
      form.certpicurl = resp.data.msg.shoppicurl;
    alert(JSON.stringify(form));
    let response;
    let url2 = "http://www.localhost:2001/vendor/update";
    // alert(url2);
    // if(form.profilepic==null)
    if (resp.data.status == true && form.shoppic == null && form.certpic == null)//new pic nhi daali
    {
      alert(JSON.stringify(form));
      response = await axios.post(url2, form)
    }
    else if (resp.data.status == true && form.shoppic == null && form.certpic != null) {
      let FrmData = new FormData();
      FrmData.append("emailid", form.emailid)
      FrmData.append("name", form.name)
      FrmData.append("contact", form.contact)
      FrmData.append("business", form.business)
      FrmData.append("area", form.area)
      FrmData.append("address", form.address)
      FrmData.append("city", form.city)
      FrmData.append("estd", form.estd)
      FrmData.append("insta", form.insta)

      if (form.certpic != null)
        FrmData.append("certpic", form.certpic)
      FrmData.append("website", form.website)
      FrmData.append("selcate", selectedCategories.join(","))
      response = await axios.post(url2, FrmData, { headers: { 'Content-Type': 'multipart/form-data' } })
    }
    else if (resp.data.status == true && form.shoppic != null && form.certpic != null) {
      let FrmData = new FormData();
      FrmData.append("emailid", form.emailid)
      FrmData.append("name", form.name)
      FrmData.append("contact", form.contact)
      FrmData.append("business", form.business)
      FrmData.append("area", form.area)
      FrmData.append("address", form.address)
      FrmData.append("city", form.city)
      FrmData.append("estd", form.estd)
      FrmData.append("insta", form.insta)
      if (form.shoppic != null)
        FrmData.append("shoppic", form.shoppic)
      if (form.certpic != null)
        FrmData.append("certpic", form.certpic)
      FrmData.append("website", form.website)
      FrmData.append("selcate", selectedCategories.join(","))
      response = await axios.post(url2, FrmData, { headers: { 'Content-Type': 'multipart/form-data' } })
    }
    else if (resp.data.status == true && form.shoppic != null && form.certpic == null) {
      let FrmData = new FormData();
      FrmData.append("emailid", form.emailid)
      FrmData.append("name", form.name)
      FrmData.append("contact", form.contact)
      FrmData.append("business", form.business)
      FrmData.append("area", form.area)
      FrmData.append("address", form.address)
      FrmData.append("city", form.city)
      FrmData.append("estd", form.estd)
      FrmData.append("insta", form.insta)

      if (form.shoppic != null)
        FrmData.append("shoppic", form.shoppic)
      FrmData.append("website", form.website)
      FrmData.append("selcate", selectedCategories.join(","))
      response = await axios.post(url2, FrmData, { headers: { 'Content-Type': 'multipart/form-data' } })
    }
    if(response && response.data!=null){
 response.data.msg.estd = response.data.msg.estd.split("T")[0].split("-")[0];
    setForm(response.data.msg)
        setSelectedCategories(resp.data.msg.selcate.split(","))
    setShopPreview(response.data.msg.shoppicurl);
    setCertPreview(response.data.msg.certpicurl)}
  }
  //==========================

 
  const inputClass =
    "w-full rounded-xl border border-[#D8E2DC] bg-white px-4 py-3 text-sm text-[#243B32] placeholder:text-gray-400 outline-none transition duration-200 focus:border-[#26735B] focus:ring-4 focus:ring-[#26735B]/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-[#31483E]";

  const sectionTitleClass =
    "text-lg font-bold tracking-tight text-[#183F33]";

  const sectionNumberClass =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E5EEE7] font-bold text-[#185744]";

  return (
    <>


    <main className="min-h-screen bg-[#F5F5EF] px-4 py-8 sm:px-8 sm:py-12">
      
      <div className="mx-auto max-w-5xl">

        {/* Brand header */}
        {/* <header className="mb-9 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#123F35] text-3xl text-[#E4D2A8] shadow-lg shadow-[#123F35]/20">
            ✳
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-[#123F35] sm:text-5xl">
            EventGuide
          </h1>

          <p className="mt-3 text-base text-[#68766C] sm:text-lg">
            Your talent. Your business. A world of celebrations.
          </p>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#C6AA70]" />
        </header>
         */}

        {/* Main form */}
        <form
          onSubmit={OnFormSubmit}
          className="overflow-hidden rounded-3xl border border-[#E5E7DD] bg-white shadow-xl shadow-[#123F35]/8"
        >
          {/* Form banner */}
          <div className="relative overflow-hidden bg-[#123F35] px-6 py-8 sm:px-10 sm:py-10">
            <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full border border-white/10" />
            <div className="absolute -right-2 -top-12 h-40 w-40 rounded-full border border-[#C6AA70]/30" />

            <div className="relative">
            

              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                Vendor Registration
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-6 text-[#D7E2DA] sm:text-base">
                Tell us about your business and connect with customers
                looking to make their celebrations extraordinary.
              </p>
            </div>
          </div>

          <div className="space-y-9 p-5 sm:p-10">

            {/* 01 — Contact details */}
            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className={sectionNumberClass}>01</div>
                <div>
                  <h3 className={sectionTitleClass}>
                    Account & Contact
                  </h3>
                  <p className="mt-1 text-sm text-[#78837A]">
                    Let customers know how to reach you.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {/* <div>
                  <label className={labelClass}>Email ID *</label>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      className={inputClass}
                      type="email"
                      name="emailid"
                      value={form.emailid}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />

                    <button
                      type="button"
                      onClick={fetchdata}
                      className="shrink-0 rounded-xl border border-[#C6D8CB] bg-[#EAF1EA] px-5 py-3 text-sm font-bold text-[#185744] transition hover:bg-[#DCE9DE] active:scale-[0.98]"
                    >
                      Fetch Data
                    </button>
                  </div>
                </div> */}

                <div>
                  <label className={labelClass}>Owner Name *</label>
                  <input
                    className={inputClass}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>
                    Contact Number *
                  </label>
                  <input
                    className={inputClass}
                    type="tel"
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                    required
                  />
                </div>
              </div>
            </section>

            <div className="h-px bg-[#E8EDE7]" />

            {/* 02 — Business details */}
            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className={sectionNumberClass}>02</div>
                <div>
                  <h3 className={sectionTitleClass}>
                    Business Details
                  </h3>
                  <p className="mt-1 text-sm text-[#78837A]">
                    Give your business its identity.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className={labelClass}>
                    Business Name *
                  </label>
                  <input
                    className={inputClass}
                    name="business"
                    value={form.business}
                    onChange={handleChange}
                    placeholder="e.g. Royal Events & Decor"
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Area / Locality *
                  </label>
                  <input
                    className={inputClass}
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    placeholder="Your neighbourhood"
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>City *</label>
                  <input
                    className={inputClass}
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Your city"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>
                    Full Address *
                  </label>
                  <textarea
                    className={inputClass}
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Shop number, street, landmark..."
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Established In Year:
                  </label>
                  <input
                    className={inputClass}
                    type="number"
                    name="estd"
                    value={form.estd}
                    onChange={handleChange}
                    placeholder="e.g. 2020"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>
            </section>

            <div className="h-px bg-[#E8EDE7]" />

            {/* 03 — Categories */}
            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className={sectionNumberClass}>03</div>

                <div>
                  <h3 className={sectionTitleClass}>
                    Business Categories
                  </h3>
                  <p className="mt-1 text-sm text-[#78837A]">
                    Select all the services your business provides.
                  </p>
                </div>
              </div>

              {/* Dropdown */}
              <label className={labelClass}>
                Select Categories *
              </label>
              <button
                type="button"
                onClick={() =>
                  setCategoryDropdownOpen(!categoryDropdownOpen)//true false condition
                }
                className="w-full rounded-xl border border-[#D8E2DC] bg-white px-4 py-3 text-left text-[#185744] hover:bg-[#F5F8F3]"
              >
                {selectedCategories.length === 0
                  ? "Choose categories"
                  : `${selectedCategories.length} categories selected`}

                <span className="float-right">▼</span>
              </button>
              {categoryDropdownOpen && (//check whether true or false,if true then only ye saara aayega
                <div className="mt-2 rounded-xl border border-[#D8E2DC] bg-white p-3 shadow-md">
                  {categories.map((category) => (//map se hume har category mil jayegi
                    <label
                      key={category}//key is required by react when it duplicates or repeats data, was also used in /MERN-AUGUST/vite_ts/cardsholder
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#31483E] hover:bg-[#EAF1EA]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}//select and unselect karne ke liye
                        className="h-4 w-4 accent-[#185744]"
                      />

                      {category}
                    </label>
                  ))}
                  <button
                    type="button"
                    onClick={() => setCategoryDropdownOpen(false)}
                    className="mt-3 w-full rounded-lg bg-[#123F35] px-4 py-2 text-sm font-bold text-white hover:bg-[#1F5C4B]"
                  >
                    Done
                  </button>
                </div>
              )}

              {/* Selected categories text bar */}
              <div className="mt-5">
                <label className={labelClass}>
                  Selected Categories
                </label>

                <div className="min-h-12 rounded-xl border border-[#D8E2DC] bg-[#F5F8F3] px-4 py-3 text-sm text-[#185744]">
                  {selectedCategories.length === 0
                    ? "Your selected categories will appear here..."
                    : selectedCategories.join(", ")}
                </div>
              </div>
            </section>




            {/* 04 — Online presence */}
            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className={sectionNumberClass}>04</div>
                <div>
                  <h3 className={sectionTitleClass}>
                    Online Presence
                  </h3>
                  <p className="mt-1 text-sm text-[#78837A]">
                    Let customers discover your work online.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Website{" "}
                    <span className="font-normal text-[#8C968D]">
                      (Optional)
                    </span>
                  </label>
                  <input
                    className={inputClass}
                    type="url"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    insta ID{" "}

                  </label>
                  <input
                    className={inputClass}
                    name="insta"
                    value={form.insta}
                    onChange={handleChange}
                    placeholder="@yourbusiness"
                  />
                </div>
              </div>
            </section>

            <div className="h-px bg-[#E8EDE7]" />

            {/* 05 — Uploads */}
            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className={sectionNumberClass}>05</div>
                <div>
                  <h3 className={sectionTitleClass}>
                    Photos & Certification
                  </h3>
                  <p className="mt-1 text-sm text-[#78837A]">
                    Showcase your business and build trust.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Business picture */}
                <div>
                  <label className={labelClass}>
                    Shop / Business Picture (Optional)
                  </label>

                  <label className="flex min-h-52 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#B9CEBD] bg-[#F5F8F3] p-4 text-center transition hover:border-[#57816A] hover:bg-[#EDF3EC]">
                    {shopPreview ? (
                      <img
                        src={shopPreview}
                        alt="Business preview"
                        className="h-48 w-full rounded-xl object-cover"
                      />
                    ) : (
                      <>
                        <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                          📷
                        </span>
                        <span className="font-bold text-[#185744]">
                          Upload business picture
                        </span>
                        <span className="mt-2 text-xs text-[#78837A]">
                          PNG, JPG or JPEG
                        </span>
                      </>
                    )}

                    <input
                      className="hidden"
                      type="file"
                      accept="image/*"

                      onChange={handleShopPicture}
                    />
                    {/**here basicaly label ke andar kahin bhi touch karne se input activate ho jayega */}
                  </label>
{/**<input type="file" name="profilepic" 
          onChange={doShowPrev}
          className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"></input>
          <center>
            <img src={picPrev} alt="" className="w-[100px] h-28 rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
          </center> */}
                  {shopPicture && (
                    <p className="mt-2 break-all text-xs text-[#557362]">
                      
                      Selected: {shopPicture?.name}
                    </p>
                  )}
                </div>

                {/* Certification */}
                <div>
                  <label className={labelClass}>
                    Business Certification{" "}
                    <span className="font-normal text-[#8C968D]">
                      (Optional)
                    </span>
                  </label>

                  <label className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D6C7A0] bg-[#FBF9F1] p-6 text-center transition hover:border-[#B89B5C] hover:bg-[#F7F2E4]">
                    {!certPreview
                      ?
                      (<>  <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                        📄
                      </span>
                        <span className="font-bold text-[#80662E]">
                          Upload certification
                        </span>
                        <span className="mt-2 text-xs text-[#8C8066]">
                          PDF, PNG or JPG
                        </span>
                      </>) :

                      (<img
                        src={certPreview}
                        alt="Certification preview"
                        className="h-48 w-full rounded-xl object-cover"
                      />
                      )
                    }
                    <input
                      className="hidden"
                      type="file"
                      accept=".pdf,image/*"
                      onChange={handleCertPicture}
                    />
                  </label>

                  {certificate && (
                    <p className="mt-2 break-all text-xs text-[#557362]">
                      Selected: {certificate.name}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Feedback */}
            {message && (
  <div
    role={messageType === "error" ? "alert" : "status"}
    className={`rounded-xl border p-4 text-sm font-medium ${
      messageType === "success"
        ? "border-green-200 bg-green-50 text-green-800"
        : "border-red-200 bg-red-50 text-red-800"
    }`}
  >
    {message}
  </div>
)}

            {/* Action buttons */}
            <div className="flex flex-col gap-3 border-t border-[#E8EDE7] pt-7 sm:flex-row sm:justify-end">


              {/* <button
                type="submit"
                className="rounded-xl bg-[#123F35] px-8 py-3.5 font-bold text-white shadow-lg shadow-[#123F35]/15 transition hover:-translate-y-0.5 hover:bg-[#1F5C4B] active:translate-y-0"
              >
                Save Vendor
              </button> */}
              <button
  type="submit"
  disabled={isSaving}
  className="flex items-center justify-center gap-3 rounded-xl bg-[#123F35] px-8 py-3.5 font-bold text-white shadow-lg shadow-[#123F35]/15 transition hover:bg-[#1F5C4B] disabled:cursor-not-allowed disabled:opacity-70"
>
  {isSaving && (
    <span
      className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
      aria-hidden="true"
    />
  )}

  {isSaving ? "Saving Vendor..." : "Save Vendor"}
</button>

              <button
                type="button"
                onClick={UpdateVendor}
                className="rounded-xl border border-[#C6AA70] bg-[#E7D9B8] px-8 py-3.5 font-bold text-[#263D31] transition hover:-translate-y-0.5 hover:bg-[#DCC99C] active:translate-y-0"
              >
                Update Details
              </button>
            </div>
          </div>
        </form>

        <footer className="py-7 text-center text-sm text-[#78837A]">
          Thoughtfully crafted for every celebration.
          <span className="mx-1 font-semibold text-[#185744]">
            MeetCraft
          </span>
          ✦
        </footer>
      </div>
      {/* {JSON.stringify(form)}

      {(selectedCategories.join(","))} */}
{/* {JSON.stringify(selectedCategories)} */}


    </main>
    </>
  );
}
