
import { useEffect, useState } from "react";
import axios from "axios";
import LoginRequired from "./LoginRequired";

import { useLocation } from "react-router-dom";
// Replace these paths with your actual component paths
import CitizenRegistration from "./Citizen/CitizenRegistration";
import EventSearch from "./events/EventSearch";
import Fav from "./favourites/Fav";
import VendorReg from "./Vendor/VendorReg";

type Role = "Citizen" | "Vendor";

interface Props {
    role: Role;
}

function DashboardLayout({ role }: Props) {

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [emailid, setEmailid] = useState("");
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState("Profile");
const location=useLocation();
    // Check JWT whenever this dashboard loads
    useEffect(() => {

        async function checkAuth() {

            let token = localStorage.getItem("token");
// alert("the token is supposed to be not null"+token)
            if (!token) {
              //  alert("here comes catch of token")
                setAuthenticated(false);
                setLoading(false);
                return;
            }//token jab hai hi nhi toh verify kyu kare

            try {
// alert("entering try")
                let response = await axios.post(
                    "http://www.localhost:2001/users/checkauth",
                    {},
                  {headers: { "Content-Type": "application/x-www-form-urlencoded",'authorization' : `Bearer ${token}` }}
                );//token bhejo

                // Check whether the authenticated role matches
                // the dashboard being accessed
                if (response.data.utype !== role) {
                    setAuthenticated(false);
                    return;
                }

                setEmailid(response.data.emailid);
                setAuthenticated(true);

            }
            catch (err: any) {
alert("here comes catch")
                    localStorage.removeItem("token");
                    localStorage.removeItem("emailid");
                    localStorage.removeItem("utype");
                

                setAuthenticated(false);

            }
            finally {
                setLoading(false);
            }
            return;
        }

        checkAuth();

    },[location.key]);
    //whenever loaction changes on dashboard this will run 


    const citizenMenu = [
        { name: "Profile", icon: "👤" },
        { name: "Search Events", icon: "🔍" },
        { name: "Favourites", icon: "♥" }
    ];//array of objects

    const vendorMenu = [
        { name: "Profile", icon: "🏪" }
    ];

    const menuItems =
        role === "Citizen" ? citizenMenu : vendorMenu;


    // Display the component selected from the sidebar
    function showComponent() {

        if (role === "Citizen") {

            switch (active) {
                case "Profile":
                    return <CitizenRegistration />;//ye wala component throw ho jayega agar is function ko call karenge

                case "Search Events":
                    return <EventSearch />;

                case "Favourites":
                    return <Fav />;
            }

        } else {

            switch (active) {
                case "Profile":
                    return <VendorReg />;
            }

        }

        return null;
    }


    // Loading screen
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

    // Authentication failed
    if (!authenticated) {
    
        return <LoginRequired />;
    }



return (
    <div className="min-h-screen bg-[#F5F8F3]">

    {/* <div className="h-16 bg-white border-b border-[#E0E5DE]">
        <DashboardNavbar role={role} />
</div> */}

        <div className="flex min-h-[calc(100vh-64px)]">

            {/* LEFT SIDE MENU */}
            <aside
                className={`
                    bg-[#EAF1EA] border-r border-[#B9CEBD]
                    shrink-0 transition-all duration-300
                    ${collapsed ? "w-16" : "w-56"}
                `}
            >

                {/* Collapse arrow */}
                <div className="flex justify-end p-3">

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="text-[#185744] hover:bg-[#B9CEBD]
                        rounded-md p-2 transition"
                        title="Collapse / Expand menu"
                    >
                        {collapsed ? "→" : "←"}
                    </button>

                </div>

                {/* Menu options */}
                <div className="px-3 mt-3 space-y-3">

                    {menuItems.map((item) => (

                        <button
                            key={item.name}
                            title={collapsed ? item.name : ""}
                            onClick={() => {
                                setActive(item.name);
                                setCollapsed(true);
                            }}
                            className={`
                                w-full flex items-center gap-3
                                rounded-md py-3 transition-all duration-200
                                ${collapsed
                                    ? "justify-center px-1"
                                    : "px-4"
                                }
                                ${active === item.name
                                    ? "bg-[#185744] text-white shadow-sm"
                                    : "text-[#31483E] hover:bg-[#B9CEBD]"
                                }
                            `}
                        >

                            <span className="text-lg">
                                {item.icon}
                            </span>

                            {!collapsed && (
                                <span className="text-sm font-medium">
                                    {item.name}
                                </span>
                            )}

                        </button>

                    ))}

                </div>

            </aside>


            {/* RIGHT CONTENT AREA */}
            <main className="flex-1 min-w-0 p-4 md:p-7">

                {/* Greeting */}
                <div className="mb-5">
                    <p className="text-sm text-[#78837A]">
                        Hello, {emailid}
                    </p>

                    <h1 className="text-xl font-semibold text-[#31483E] mt-1">
                        {role === "Citizen"
                            ? "Citizen Dashboard"
                            : "Vendor Dashboard"}
                    </h1>
                </div>

                {/* Component container */}
                <div
                    key={active}
                    className="bg-white border border-[#B9CEBD]
                    rounded-lg min-h-[75vh] p-4 md:p-6
                    shadow-sm animate-[fadeIn_0.3s_ease-out]"
                >
                    {showComponent()}
                </div>

            </main>

        </div>

    </div>
);

                    

                       
                             
                        

                     




}

export default DashboardLayout;
