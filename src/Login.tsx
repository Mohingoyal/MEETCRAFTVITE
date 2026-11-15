
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
const API_URL=import.meta.env.VITE_API_URL;
function Login() {
  const navigate = useNavigate();

  const [emailid, setEmailid] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  // const [searchevent, setsearch] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //  setsearch(false);
    setMessage("");
    setMessage2("");
    if (!emailid.trim() || !password) {
      setMessage("Please enter your Email ID and Password.");
      return;
    }
    let url = `${API_URL}/users/login`
    let response = await axios.post(url, { emailid: emailid, password: password })
    if (response.data.found == 0) {
      setMessage("Emailid entered is not in database.")
      return;
    }
    else if (response.data.found == 3) {
      setMessage(`${response.data.msg}`)
    }
    else if (response.data.found == 1)//logged in succesfully
    {console.log("Login response token:", response.data.token);

localStorage.setItem("token", response.data.token);

localStorage.setItem("token", response.data.token);

console.log("LOGIN ORIGIN:", window.location.origin);
      localStorage.setItem("emailid", response.data.msg.emailid)
      localStorage.setItem("utype", response.data.msg.utype)
      setMessage2("Welcome Back !!! " + emailid)
      // alert("token is :"+localStorage.getItem("token"))
      //alert(`The token is ${localStorage.getItem("token")} and the id of person is ${emailid}`)
      //showsearchevent("eventsearch")
      let usertype = localStorage.getItem("utype");
      if (usertype == "Citizen")
        navigate("/DashboardNavbar/Citizendash")
      else if (usertype === "Vendor")
        navigate("/DashboardNavbar/Vendordash")
      return;
    }
    else {
      // localStorage.setItem("token",response.data.token)
      setMessage("Please check your password and try again.")

      return;
    }

  }

  function handleForgotPassword() {
    // if (!emailid.trim()) {
    //   setMessage("Please enter your Email ID first.");
    //   return;
    // }

    // Connect your forgot-password API here.
 navigate("/forgotpassword")
  }

  return (
    <div className="min-h-[calc(100vh-75px)] bg-[#F5F8F3] px-5 py-10 sm:px-8 lg:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-3xl border border-[#DCE4DC] bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">


        {/* Left Side - Elegant Illustration */}
        <div className="flex flex-col items-center text-center">
          <div className="relative flex aspect-square w-full max-w-[340px] items-center justify-center overflow-hidden rounded-[2rem] bg-[#EAF1EA]">

            {/* Background Shapes */}
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-[#B9CEBD]" />
            <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full border border-[#B9CEBD]" />

            {/* Main Visual */}
            <div className="relative z-10 mx-8 flex aspect-square w-full max-w-[250px] flex-col justify-between rounded-2xl border border-white/80 bg-[#F9FAF6] p-7 shadow-lg">

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#57816A]">
                  MEETCRAFT
                </p>

                <div className="mt-5 h-px w-12 bg-[#91AA94]" />

                <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-[#31483E]">
                  Moments
                  <br />
                  worth
                  <br />
                  remembering.
                </h2>
              </div>

              <div className="flex items-end justify-between">
                <p className="max-w-[150px] text-xs leading-5 text-[#78837A]">
                  Thoughtfully planned.
                  <br />
                  Beautifully celebrated.
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#185744] text-lg text-white">
                  M
                </div>
              </div>
            </div>
          </div>

          <h2 className="mt-8 text-2xl font-semibold tracking-tight text-[#31483E]">
            Welcome back.
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-[#78837A]">
            Every great celebration begins with a little planning.
            Let’s make your next one memorable.
          </p>
        </div>



        {/* Right Side - Login Form */}
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#57816A]">
              Welcome to MeetCraft
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#185744] sm:text-4xl">
              Login
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#78837A]">
              Enter your details to access your account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="emailid"
                className="mb-2 block text-sm font-semibold text-[#31483E]"
              >
                Email ID
              </label>

              <input
                id="emailid"
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
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#31483E]"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#B9CEBD] bg-[#F9FAF6] px-4 py-3.5 text-[#31483E] outline-none transition placeholder:text-[#A0AAA0] focus:border-[#185744] focus:ring-2 focus:ring-[#185744]/15"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm font-semibold text-[#185744] underline-offset-4 transition hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Message */}
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

            {/* Login Button */}
            <button
              type="submit"
              //onClick={()=>showsearchevent("eventsearch")}//onclick return mein ek value chahta hai
              className="w-full rounded-xl bg-[#185744] py-3.5 font-semibold text-white shadow-sm transition hover:bg-[#123F35] active:scale-[0.99]"
            >
              Login
            </button>
          </form>

          {/* Signup Link */}
          <p className="mt-7 text-center text-sm text-[#78837A]">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="font-bold text-[#185744] underline-offset-4 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
