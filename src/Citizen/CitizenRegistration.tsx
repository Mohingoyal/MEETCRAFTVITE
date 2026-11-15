import { useState,useEffect } from "react";
import type { CitizenForm } from "./interface_citizen";
import { url1 } from "./url"
import axios from "axios"
import { useLocation } from "react-router-dom";
import LoginRequired from "../LoginRequired";
const API_URL=import.meta.env.VITE_API_URL;
const initialForm: CitizenForm = {
  emailid: "",
  acardno: "",
  name: "",
  dob: "",
  gender: "",
  address: "",
  city: "",
  contact: "",
};

const inputClass =
  "w-full rounded-xl border border-[#D8E2DC] bg-white px-4 py-3 text-sm text-[#243B32] outline-none transition placeholder:text-gray-400 focus:border-[#26735B] focus:ring-4 focus:ring-[#26735B]/10";

const labelClass = "mb-2 block text-sm font-semibold text-[#31483E]";

export default function CitizenRegistration() {
const location = useLocation();

const [authenticated, setAuthenticated] = useState(false);
  const [form, setForm] = useState<CitizenForm>(initialForm);
  const [isExtracting, setIsExtracting] = useState(false);
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
 const [loading, setLoading] = useState(true);
  const [frontPreview, setFrontPreview] = useState("");
  const [backPreview, setBackPreview] = useState("");

  const [message, setMessage] = useState("");
  //================functions

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFetch = async () => {
  //   alert("HI")
  // alert(localStorage.getItem("emailid"))
  if(localStorage.getItem("emailid"))//not null check karne ke liye
      form.emailid = localStorage.getItem("emailid")
    // alert(form.emailid)
    if (!form.emailid) {
      setMessage("Please enter an emailid")
      return;
    }

    let url = `${API_URL}/citizen/fetch`;
    //alert("hi")
    // setisFetching(true);
    await axios.post(url, { emailid: form.emailid }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } }).then((resp) => {

      // if (resp.data.status == true) {
      //    alert("the search was successful and " + JSON.stringify(resp.data.msg))
      // }
     if(resp.data.msg!=null)
{      resp.data.msg.dob = resp.data.msg.dob.split("T")[0]//vah

      setForm(resp.data.msg);}
    });


  };
  useEffect( () => {

  // Fetch complete record immediately after verification
  async function checkAuth() {
        try {
            // setLoading(true);

            let token = localStorage.getItem("token");

            if (!token) {
                    //  alert("here comes catch of token")
                setAuthenticated(false);
                return;
            }//this is not running initially
            // alert("token in citizen reg"+token)
 let response = await axios.post(
               `${API_URL}/users/checkauth`,
                {},{headers: { "Content-Type": "application/x-www-form-urlencoded",'authorization' : `Bearer ${token}` }}
            );
// alert(JSON.stringify(response.data))
            if ( response.data.utype === "Citizen") {
                setAuthenticated(true);
               
   handleFetch();
  }
       else {
                setAuthenticated(false);
            }

        }
        catch (error) {
          alert("here comes catch of citizen reg")
            setAuthenticated(false);
         

            localStorage.removeItem("token");
            localStorage.removeItem("emailid");
            localStorage.removeItem("utype");
        }
     finally {
                setLoading(false);
            }
            return;
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

  //===============================
  const handlefrontPicture = async (
    e: React.ChangeEvent<HTMLInputElement>,

  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image.");
      return;
    }

    const preview = URL.createObjectURL(file);

    // now lets send the picture of front to genai, fetch the data , fill it on screen with loader

    setFrontFile(file);
    let Form = new FormData();
    Form.append("frontSide", file);
    setFrontPreview(preview);
    let url = `${API_URL}/citizen/front_aadhar`;

    setIsExtracting(true);
    await axios.post(url, Form, { headers: { 'Content-Type': 'multipart/form-data' } }).then((result) => {
      result.data.dob = result.data.dob.split("T")[0];
      setForm(result.data);
      setIsExtracting(false);
      setMessage("Extraction of data was successfull!");
    }).catch(() => setMessage("Data extraction failed"))


  };
  //========
  const handlebackPicture = async (
    e: React.ChangeEvent<HTMLInputElement>,

  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image.");
      return;
    }

    const preview = URL.createObjectURL(file);


    setBackFile(file);
    let Form = new FormData();
    Form.append("BackSide", file);//yahaan pe file lena hai not use state
    setBackPreview(preview);
    let url = `${API_URL}/citizen/back_aadhar`;
    setIsExtracting(true);
    await axios.post(url, Form, { headers: { 'Content-Type': 'multipart/form-data' } }).then((result) => {
      //===========================
      setForm((prev) => {
        return { ...prev, address: result.data.address, city: result.data.city }
      });

      setIsExtracting(false);
      alert(form.name + "and. " + form.emailid + " and " + result.data.address + " and " + result.data.city)

      alert(JSON.stringify(form));
      setMessage("Extraction of data was successfull!");
    }).catch(() => setMessage("Data extraction failed"))




  };//==============

  //===============================================
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    // Send form and both image files using FormData.
    e.preventDefault();
    if (!form.emailid || !form.contact) {
      alert("Ji")
      setMessage("Please enter Email ID and please ensure that contact number is correct.");
      return;

    }



    let resp = await axios.post(url1, form, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
    alert(resp.data.msg.dob)
    resp.data.msg.dob = resp.data.msg.dob.split("T")[0]

    alert(resp.data.msg.dob)
    setForm(resp.data.msg);

  };
  //======================================
  const handleModify = async () => {
    alert(form.emailid)
    if (!form.emailid || !frontFile || !backFile) {
      alert(JSON.stringify(form))
      alert(frontFile?.name + " " + backFile?.name)
      setMessage("Please enter an emailid and the front and back pictures of aadhar. ")
      return;
    }
    alert("if condition se bahaar")

    let url = `${API_URL}/citizen/update`;

    let resp = await axios.post(url, form, { headers: { 'Content-Type': 'multipart/form-data' } })
    if (resp.data.status != false)
      setMessage("Update was successfull")
    else
      setMessage("Update failed becuase emailid doesnt exist in the record")
    alert(resp.data.msg.dob)
    resp.data.msg.dob = resp.data.msg.dob.split("T")[0]

    alert(resp.data.msg.dob)
    setForm(resp.data.msg);

  };

  const renderfrontPictureUpload = (//ye function 283 line pe call hua
    title: string,

    preview: string
  ) => (
    <label className="flex min-h-56 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#B9CEBD] bg-[#F5F8F3] p-4 text-center transition hover:border-[#57816A] hover:bg-[#EDF3EC]">
      {preview ? (
        <img
          src={preview}
          alt={`${title} preview`}
          className="h-44 w-full rounded-xl object-contain"
        />
      ) : (
        <>
          <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
            📄
          </span>
          <span className="font-bold text-[#185744]">{title}</span>
          <span className="mt-2 text-xs text-[#78837A]">
            PNG, JPG or JPEG
          </span>
        </>
      )}

      <input
        type="file"
        accept="image/*"
        className="hidden"
        required
        onChange={(e) => handlefrontPicture(e)}
      />
    </label>
  );
  //====================
  const renderbackPictureUpload = (//ye function 283 line pe call hua
    title: string,

    preview: string
  ) => (
    <label className="flex min-h-56 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#B9CEBD] bg-[#F5F8F3] p-4 text-center transition hover:border-[#57816A] hover:bg-[#EDF3EC]">
      {preview ? (
        <img
          src={preview}
          alt={`${title} preview`}
          className="h-44 w-full rounded-xl object-contain"
        />
      ) : (
        <>
          <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
            📄
          </span>
          <span className="font-bold text-[#185744]">{title}</span>
          <span className="mt-2 text-xs text-[#78837A]">
            PNG, JPG or JPEG
          </span>
        </>
      )}

      <input
        type="file"
        accept="image/*"
        className="hidden"
        required
        onChange={(e) => handlebackPicture(e)}
      />
    </label>
  );
  return (
    <>
      <form onSubmit={handleUpload}>

        <div className="min-h-screen bg-[#F7F5EF] px-4 py-8 sm:px-8">
          <div className="mx-auto max-w-6xl">

            {/* Header */}
            <header className="mb-8 rounded-2xl bg-[#123F35] p-6 shadow-lg sm:p-8">
              <div className="flex items-center gap-4">
              
                <div>
                  <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
                    Citizen Registration
                  </h1>
                  <p className="mt-1 text-sm text-[#D9E8DF]">
                    Register or manage an existing account.
                  </p>
                </div>
              </div>
            </header>

            {/* Fetch citizen */}

            {/* <section className="mb-6 rounded-2xl border border-[#E5E0D5] bg-white p-5 shadow-sm sm:p-6"> */}
            {/* <label className={labelClass}>Email ID</label> */}
            {/* <center> */}

            {/* <input
                  className={inputClass}
                  type="email"
                  name="emailid"
                  placeholder="Enter registered email"
                  value={form.emailid}
                  required
                  onChange={handleChange}
                /> */}
            {/* <center>
                <button
                  type="button"
                  onClick={handleFetch}
                  className="rounded-xl bg-[#123F35] px-8 py-3 font-bold text-white transition hover:bg-[#1F5C4B]"
                >
                  Fetch Your Saved Record
                </button>
                </center>
            
              </center>
            </section> */}

            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[0.85fr_1.5fr]">

              {/* Identity document uploads */}
              <section className="rounded-2xl border border-[#E5E0D5] bg-white p-5 shadow-sm sm:p-6">
                <h2 className="mb-5 text-lg font-bold text-[#183F33]">
                  Identity Documents
                </h2>

                <div className="space-y-5">
                  <div>
                    <p className={labelClass}>Aadhaar Front Side</p>
                    {renderfrontPictureUpload("Upload front side", frontPreview)}
                  </div>

                  <div>
                    <p className={labelClass}>Aadhaar Back Side</p>
                    {renderbackPictureUpload("Upload back side", backPreview)}
                  </div>
                </div>

                {isExtracting && (
                  <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#D8E2DC] bg-white p-4">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#D8E2DC] border-t-[#185744]" />

                    <div>
                      <p className="text-sm font-semibold text-[#185744]">
                        Extracting Aadhaar details...
                      </p>

                      <p className="mt-1 text-xs text-[#78837A]">
                        Please wait while we read your information.
                      </p>
                    </div>
                  </div>
                )}
              </section>

              {/* Personal information */}
              <div className="space-y-6">
                <section className="rounded-2xl border border-[#E5E0D5] bg-white p-5 shadow-sm sm:p-6">
                  <h2 className="mb-5 text-lg font-bold text-[#183F33]">
                    Personal Details
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label className={labelClass}>Aadhaar Card Number</label>
                      <input
                        className={inputClass}
                        name="acardno"
                        inputMode="numeric"
                        placeholder="Enter Aadhaar number"
                        value={form.acardno}
                        onChange={handleChange}
                        readOnly
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelClass}>Full Name</label>
                        <input
                          className={inputClass}
                          name="name"
                          placeholder="Enter full name"
                          value={form.name}
                          onChange={handleChange}
                          readOnly
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Date of Birth</label>
                        <input
                          className={inputClass}
                          type="date"
                          name="dob"
                          value={form.dob}
                          onChange={handleChange}
                          readOnly
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Gender</label>
                      <input
                        className={inputClass}
                        name="gender"
                        placeholder="Enter gender"
                        value={form.gender}
                        onChange={handleChange}
                        readOnly
                      />
                    </div>
                  </div>
                </section>

                {/* Address */}
                <section className="rounded-2xl border border-[#E5E0D5] bg-white p-5 shadow-sm sm:p-6">
                  <h2 className="mb-5 text-lg font-bold text-[#183F33]">
                    Address & Contact
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label className={labelClass}>Full Address</label>
                      <textarea
                        className={inputClass}
                        name="address"
                        rows={3}
                        placeholder="House number, street, locality"
                        value={form.address}
                        onChange={handleChange}
                        readOnly
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelClass}>City</label>
                        <input
                          className={inputClass}
                          name="city"
                          placeholder="Enter city"
                          value={form.city}
                          onChange={handleChange}
                          readOnly
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Contact Number</label>
                        <input
                          className={inputClass}
                          type="tel"
                          name="contact"
                          placeholder="Enter contact number"
                          value={form.contact}
                          required
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Actions */}
            <section className="mt-6 rounded-2xl border border-[#E5E0D5] bg-white p-5 shadow-sm sm:p-6">
              {message && (
                <p className="mb-4 rounded-xl bg-[#F5F8F3] p-3 text-sm text-[#185744]">
                  {message}
                </p>
              )}

              <div className="flex flex-col justify-end gap-3 sm:flex-row">
                <button
                  type="submit"

                  className="rounded-xl bg-[#123F35] px-7 py-3 font-bold text-white shadow-sm transition hover:bg-[#1F5C4B]"
                >
                  Upload Data
                </button>

                <button
                  type="button"
                  onClick={handleModify}
                  className="rounded-xl border border-[#D8C58F] bg-[#E8D5A7] px-7 py-3 font-bold text-[#123F35] transition hover:bg-[#DDC58D]"
                >
                  Modify Record
                </button>
              </div>
            </section>

            <p className="mt-6 text-center text-xs text-[#78837A]">
              Keep your personal information secure.
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
