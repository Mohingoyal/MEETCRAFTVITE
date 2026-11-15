
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
const API_URL=import.meta.env.VITE_API_URL;
function Signup() {
  const navigate = useNavigate();

  const [emailid, setEmailid] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
e.preventDefault();
setMessage("");
setMessage2("");
let url=`${API_URL}/users/findusers`
// "http://www.localhost:2001/users/findusers"
let response=await axios.post(url,{emailid:emailid})
if(response.data.found==1)
    setMessage("The inserted emailid already exists, please try a different id.")
else if(response.data.found==-1)
    setMessage("There was an error while submitting your request please try again.")
else if(response.data.found==0)
{
    let url1=`${API_URL}/users/signup`
    let response2=await axios.post(url1,{emailid:emailid,password:password,utype:usertype})
    if(response2.data.status==true)
    {
        setMessage2("Your data was saved successfully, please keep an eye for our email!!");
        setTimeout(() => {
  //console.log("This runs after 2 seconds");
  navigate("/login");
}, 6000);
        //now lets send mail

    }
    else if(response2.data.status==false)
        setMessage2("There was an issue saving your data");
}
  }

  return (
    <div className="min-h-[calc(100vh-75px)] bg-[#F5F8F3] px-5 py-10 sm:px-8 lg:py-14">
      <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-3xl border border-[#DCE4DC] bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">

        {/* Left Side - Brand Panel */}
        <div className="flex flex-col items-center text-center">
          <div className="relative flex min-h-[340px] w-full max-w-[420px] items-center justify-center overflow-hidden rounded-[2rem] bg-[#EAF1EA] p-8 sm:min-h-[420px]">

            {/* Subtle Background Shapes */}
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-[#B9CEBD]" />
            <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full border border-[#B9CEBD]" />

            {/* Brand Card */}
            <div className="relative z-10 flex min-h-[280px] w-full max-w-[300px] flex-col justify-between rounded-2xl border border-white bg-[#F9FAF6] p-7 shadow-md sm:min-h-[320px] sm:p-9">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#57816A]">
                  MEETCRAFT
                </p>

                <div className="mt-6 h-px w-12 bg-[#91AA94]" />

                <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-[#31483E] sm:text-4xl">
                  Good things
                  <br />
                  happen when
                  <br />
                  we gather.
                </h2>
              </div>

              <div>
                <p className="text-sm leading-6 text-[#78837A]">
                  One account. New possibilities.
                  <br />
                  Start planning your next occasion.
                </p>

                <div className="mt-5 h-1 w-16 rounded-full bg-[#185744]" />
              </div>
            </div>
          </div>

          <p className="mt-6 max-w-sm text-sm leading-6 text-[#78837A]">
            Join a community that brings people, event planners,
            and trusted vendors together.
          </p>
        </div>

        {/* Right Side - Signup Form */}
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#57816A]">
              Create an account
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#185744] sm:text-4xl">
              Sign up
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#78837A]">
              Enter your details to get started with MeetCraft.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="signup-email"
                className="mb-2 block text-sm font-semibold text-[#31483E]"
              >
                Email ID
              </label>

              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={emailid}
                onChange={(e) => setEmailid(e.target.value)}
                className="w-full rounded-xl border border-[#B9CEBD] bg-[#F9FAF6] px-4 py-3.5 text-[#31483E] outline-none transition placeholder:text-[#A0AAA0] focus:border-[#185744] focus:ring-2 focus:ring-[#185744]/15"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="signup-password"
                className="mb-2 block text-sm font-semibold text-[#31483E]"
              >
                Password
              </label>

              <input
                id="signup-password"
                type="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#B9CEBD] bg-[#F9FAF6] px-4 py-3.5 text-[#31483E] outline-none transition placeholder:text-[#A0AAA0] focus:border-[#185744] focus:ring-2 focus:ring-[#185744]/15"
              />

              <p className="mt-2 text-xs text-[#78837A]">
                Use at least 8 characters for your password.
              </p>
            </div>

            {/* User Type Dropdown */}
            <div>
              <label
                htmlFor="usertype"
                className="mb-2 block text-sm font-semibold text-[#31483E]"
              >
                I want to join as
              </label>

              <select
                id="usertype"
                value={usertype}
                onChange={(e) => setUsertype(e.target.value)}
                className="w-full appearance-none rounded-xl border border-[#B9CEBD] bg-[#F9FAF6] px-4 py-3.5 text-[#31483E] outline-none transition focus:border-[#185744] focus:ring-2 focus:ring-[#185744]/15"
              >
                <option value="" disabled>
                  Select your account type
                </option>
                <option value="Citizen">Citizen</option>
                <option value="Vendor">Vendor</option>
              </select>

              <p className="mt-2 text-xs leading-5 text-[#78837A]">
                Choose the account type that best describes you.
              </p>
            </div>

            {/* Feedback Message */}
            {message && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {message}
              </p>
            )}
              {message2 && (
              <p
                role="alert"
                className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700"
              >
                {message2}
              </p>
            )}
            {/* Signup Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-[#185744] py-3.5 font-semibold text-white shadow-sm transition hover:bg-[#123F35] active:scale-[0.99]"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-7 text-center text-sm text-[#78837A]">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-bold text-[#185744] underline-offset-4 transition hover:underline"
            >
              Login
            </button>
          </p>

          <p className="mt-6 text-center text-xs leading-5 text-[#9AA39A]">
            By creating an account, you agree to use MeetCraft
            responsibly and respectfully.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
