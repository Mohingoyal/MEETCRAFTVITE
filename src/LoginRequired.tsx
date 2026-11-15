
import { useNavigate } from "react-router-dom";

function LoginRequired() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F5F8F3] flex items-center justify-center p-5">

            <div className="bg-white rounded-2xl shadow-sm border border-[#E0E5DE]
                max-w-md w-full p-8 text-center">

                <div className="w-16 h-16 rounded-full bg-[#EAF1EA]
                    flex items-center justify-center mx-auto mb-5">
                    <span className="text-3xl">🔒</span>
                </div>

                <h1 className="text-2xl font-semibold text-[#31483E]">
                    Login Required
                </h1>

                <p className="text-[#78837A] mt-3 text-sm leading-6">
                    Your session is not valid. Please log in to access
                    your MeetCraft dashboard.
                </p>

                <button
                    onClick={() => navigate("/login")}
                    className="mt-7 w-full bg-[#185744] text-white
                    py-3 rounded-lg font-medium hover:bg-[#31483E]
                    transition duration-200"
                >
                    Go to Login
                </button>

            </div>

        </div>
    );
}

export default LoginRequired;
