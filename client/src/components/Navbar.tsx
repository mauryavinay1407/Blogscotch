import logo from "../assets/logo1.svg"
import { Link,useLocation } from "react-router-dom"
import '../App.css'
import { GlowingButton } from "./GlowingButton"

interface childProps{
  items: string[];
  }
  
  export const Navbar:React.FC<childProps>= ({items}) => {
    const location=useLocation();
    return (
      <div className="w-full flex justify-between bg-gradient-to-r from-pink-800 to-slate-800 border-b-2 border-black">
        <div className="flex items-center ">
          <img src={logo} alt="logo" className="h-28 w-56" />
          <span className="text-4xl text-gray-200 font-serif ml-2 ">
            Blog<span className="text-red-4 00">Scotch</span>
          </span>
        </div>
        <div className="ml-80 text-white flex justify-center items-center w-full">
        {items.map((item,index)=>(
          <Link key={index} to={`/${item.toLowerCase()}`} className="navlink">{item}</Link>
          ))
          }
          {
            location.pathname==='/' &&  <GlowingButton>
            <Link to="/signup">Get started</Link>
          </GlowingButton>
          }
         
        </div>
      </div>
    )
  }


