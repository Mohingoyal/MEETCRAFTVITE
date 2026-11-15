
import {Link,useNavigate,Outlet,useLocation} from 'react-router-dom'
// interface Navbar{
//   signup:number,
//   login:number,
//   home:number
// }
function Index() {
  let Navigate=useNavigate();
  function doOpennewcomponent(url:string)
  {
    Navigate("/"+url);
  };
  let Location=useLocation();
  return (
    <>
    <nav className="w-full border-b border-[#DCE4DC] bg-[#F9FAF6]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo and Brand Name */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#185744] text-white">
            <span className="text-2xl font-bold">M</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#185744]">
              MeetCraft
            </h1>
            <p className="text-xs text-[#78837A]">
              Make every moment special
            </p>
          </div>
        </div>

        {/* Login and Sign Up Buttons */}
    
{/* Home, Login and Sign Up Buttons */}

<div className="flex items-center gap-3">
  {Location.pathname!="/" &&<Link to="/"
    // onClick={() => navigate("/")}
//vapas homepage pe aane ke liye
    className="rounded-lg px-4 py-2.5 text-sm font-semibold text-[#185744] transition hover:bg-[#EAF1EA]"
  >
    Home
  </Link>}

   {Location.pathname!="/login"&&<Link to="/login"
    
    className="rounded-lg px-4 py-2.5 text-sm font-semibold text-[#185744] transition hover:bg-[#EAF1EA]"
  >
    Login
  </Link>
}
 {Location.pathname!="/signup"&& <button
    type="button"
    onClick={()=>doOpennewcomponent("signup")}
    className="rounded-lg bg-[#185744] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#123F35] active:scale-95"
  >
    Sign Up
  </button>}

</div>


      </div>
      
    </nav>
      <Outlet></Outlet>
    </>
  );
}

export default Index;