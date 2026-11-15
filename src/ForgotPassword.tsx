
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
function ForgotPassword() {
    const [step, setStep] = useState(1);
const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (step === 1) {
        if (!email.trim()) {
            setMessage("Please enter your email address.");
            return;
        }
//ab otp bhejte hain usne email id toh bhej hi di
let url="http://www.localhost:2001/users/forgotpassword"
let resp=await axios.post(url,{emailid:email})
setMessage(resp.data.msg);
        setStep(2);
    }
    else if (step === 2) {
        if (!otp.trim()) {
            setMessage("Please enter the OTP.");
            return;
        }
//otp aa toh gaya par ab verify karo ki dheek hai bhi ya nhi
let url="http://www.localhost:2001/users/verifyotp"
let resp=await axios.post(url,{emailid:email,otp:otp})
setMessage(resp.data.msg);
if(resp.data.status==true)
       {localStorage.setItem("resettoken",resp.data.resettoken) ;
        setStep(3);}
    }
    else {
        if (!password || !confirmPassword) {
            setMessage("Please fill both password fields.");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
//bas hun gal tah ban gayi, now just apply the axios or we can say api endpoint
let url="http://www.localhost:2001/users/resetpassword"
let resp=await axios.post(url,
    {emailid:email,password:password},
    {headers:{"Content-Type":"application/x-www-form-urlencoded",'authorization':`Bearer ${localStorage.getItem("resettoken")}`}}
)
if(resp.data.tokenstatus==false)
{
    setMessage("Your session expired, please re initialise the process")
}
else if(resp.data.status==false)
    setMessage(resp.data.msg)
else{
    setMessage(resp.data.msg)
}
    }
    return;
}

    return (
        <div className="min-h-[85vh] flex items-center justify-center bg-[#F5F8F3] px-5 py-12">

            <div className="w-full max-w-md rounded-2xl border border-[#E0E5DE] bg-white p-8 shadow-sm">

                <div className="mb-7 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF1EA] text-[#185744]">
                        <span className="text-2xl font-bold">M</span>
                    </div>

                    <h1 className="text-2xl font-bold text-[#185744]">
                        {step === 1 && "Forgot Password?"}
                        {step === 2 && "Verify Your Email"}
                        {step === 3 && "Create New Password"}
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-[#78837A]">
                        {step === 1 && "Don't worry. Enter your registered email address and we'll help you recover your account."}
                        {step === 2 && "Enter the verification code sent to your email address."}
                        {step === 3 && "Choose a new password for your MeetCraft account."}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {step === 1 && (
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#31483E]">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your registered email"
                                className="w-full rounded-lg border border-[#DCE4DC] px-4 py-3 text-sm outline-none focus:border-[#185744] focus:ring-2 focus:ring-[#185744]/10"
                                required
                            />
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#31483E]">
                                Verification Code
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter 6-digit OTP"
                                className="w-full rounded-lg border border-[#DCE4DC] px-4 py-3 text-sm tracking-widest outline-none focus:border-[#185744] focus:ring-2 focus:ring-[#185744]/10"
                                required
                            />
                        </div>
                    )}

                    {step === 3 && (
                        <>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#31483E]">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    className="w-full rounded-lg border border-[#DCE4DC] px-4 py-3 text-sm outline-none focus:border-[#185744] focus:ring-2 focus:ring-[#185744]/10"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#31483E]">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                    className="w-full rounded-lg border border-[#DCE4DC] px-4 py-3 text-sm outline-none focus:border-[#185744] focus:ring-2 focus:ring-[#185744]/10"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#185744] py-3 font-semibold text-white transition hover:bg-[#31483E]"
                    >
                        {step === 1 && "Send OTP"}
                        {step === 2 && "Verify OTP"}
                        {step === 3 && "Reset Password"}
                    </button>

                </form>

                <div className="mt-6 text-center">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={() => setStep(step - 1)}
                            className="mb-3 block w-full text-sm text-[#57816A] hover:underline"
                        >
                            Go Back
                        </button>
                    )}
{message && (
    <div className="rounded-lg bg-[#EAF1EA] px-4 py-3 text-sm text-[#185744]">
        {message}
    </div>
)}
                    <Link
                        to="/login"
                        className="text-sm font-medium text-[#185744] hover:underline"
                    >
                        Back to Login
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default ForgotPassword;
