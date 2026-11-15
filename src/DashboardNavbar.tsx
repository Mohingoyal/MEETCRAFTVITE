
import { useNavigate } from "react-router-dom";
import {Outlet} from 'react-router-dom'

function DashboardNavbar() {

    const navigate = useNavigate();

    function handleSignOut() {

        // Remove authentication and user information
        localStorage.removeItem("token");
        localStorage.removeItem("emailid");
        localStorage.removeItem("utype");

        // Redirect to login page
        navigate("/login");
    }

    return (
<>
        <nav className="h-16 bg-white border-b border-[#E0E5DE]
            flex items-center justify-between px-5 md:px-8 shadow-sm">

            {/* Brand */}
            <div className="flex items-center gap-3">

                <div className="w-10 h-10 bg-[#185744] rounded-lg
                    flex items-center justify-center">

                    <span className="text-white text-xl font-bold">
                        M
                    </span>

                </div>

                <div>
                    <h1 className="text-xl font-bold text-[#185744]">
                        MeetCraft
                    </h1>

                    <p className="text-[10px] tracking-widest
                        text-[#78837A]">
                        PLAN. CELEBRATE. CONNECT.
                    </p>
                </div>

            </div>


            {/* Right side */}
            <div className="flex items-center gap-4">

                {/* <span className="hidden sm:block text-sm
                    text-[#78837A]">
                    {role} Dashboard
                </span> */}

                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2
                        bg-[#185744] text-white
                        px-4 py-2 rounded-lg text-sm font-medium
                        hover:bg-[#31483E]
                        hover:shadow-md transition-all duration-200"
                >

                    <span>↪</span>
                    Sign Out

                </button>

            </div>

        </nav>
       <Outlet></Outlet> 
</>
    );
}

export default DashboardNavbar;
