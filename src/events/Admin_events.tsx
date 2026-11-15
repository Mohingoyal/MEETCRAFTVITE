
import React, { useState } from 'react'
import axios from "axios"

function Admin_events() {
    const [event, setevent] = useState("");
    const [services, setservices] = useState("");

    async function add_event() {
        // alert("HI")
        let url = "http://www.localhost:2001/events/addservices";
        let obj = { event: event, services: services };
        let resp = await axios.post(url, obj);
        console.log(JSON.stringify(resp.data))
    }

    async function update_event() {
        // alert("HI")
        let url = "http://www.localhost:2001/events/updateservices";
        let obj = { event: event, services: services };
        let resp = await axios.post(url, obj);
        console.log(JSON.stringify(resp.data))
    }

    function handlechangeevent(e: React.ChangeEvent<HTMLInputElement>) {
        setevent(e.target.value);
    }

    function handlechangeservice(e: React.ChangeEvent<HTMLInputElement>) {
        setservices(e.target.value);
    }

    return (
        <>    

             <div className="min-h-screen bg-[#F5F8F3] flex items-center justify-center p-5">

            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-[#E0E5DE] overflow-hidden">

                {/* Header */}
                <div className="bg-[#185744] px-7 py-6">
                    <p className="text-sm text-[#B9CEBD] font-medium mb-2">
                        ADMIN PANEL
                    </p>
                    <h1 className="text-2xl font-bold text-white">
                        Manage Events
                    </h1>
                    <p className="text-sm text-[#EAF1EA] mt-2">
                        Add new events or update their available services.
                    </p>
                </div>

                {/* Form */}
                <div className="p-7 space-y-6">

                    <div>
                        <label className="block text-sm font-semibold text-[#31483E] mb-2">
                            Event Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Birthday, Wedding"
                            value={event}
                            onChange={handlechangeevent}
                            className="w-full rounded-xl border border-[#B9CEBD] bg-[#F9FAF6] px-4 py-3 text-[#31483E] placeholder:text-[#78837A] outline-none transition focus:border-[#185744] focus:ring-2 focus:ring-[#185744]/20"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[#31483E] mb-2">
                            Services
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Catering, Decoration, Photography"
                            value={services}
                            onChange={handlechangeservice}
                            className="w-full rounded-xl border border-[#B9CEBD] bg-[#F9FAF6] px-4 py-3 text-[#31483E] placeholder:text-[#78837A] outline-none transition focus:border-[#185744] focus:ring-2 focus:ring-[#185744]/20"
                        />
                        <p className="text-xs text-[#78837A] mt-2">
                            Separate multiple services with commas.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">

                        <button
                            onClick={add_event}
                            className="flex-1 bg-[#185744] hover:bg-[#123F32] text-white font-semibold py-3 px-5 rounded-xl transition duration-200 shadow-sm"
                        >
                            + Add Event
                        </button>

                        <button
                            onClick={update_event}
                            className="flex-1 border-2 border-[#185744] text-[#185744] hover:bg-[#EAF1EA] font-semibold py-3 px-5 rounded-xl transition duration-200"
                        >
                            Update Services
                        </button>

                    </div>

                </div>
            </div>
        </div>
        </>
    )
}

export default Admin_events;