import { NavLink } from "react-router-dom";
import { logo } from "../assets";
import { links } from "../assets/constants";
import { useState } from "react";
import { HiOutlineMenu } from 'react-icons/hi'
import { RiCloseLine } from 'react-icons/ri'

const NavLinks = ({ handleClick }) => {

  return (
    <div className="mt-10">
      {links.map((link) => (
        <NavLink key={link.name} to={link.to} onClick={() => handleClick && handleClick()}><div className="flex flex-row justify-start my-8 item-center text-gray-400 hover:text-cyan-400 "><link.icon className="w-6 h-6 mr-2" />{link.name}</div></NavLink>
      ))}
    </div>
  )
}
const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobilleMenuOpen] = useState(false)
  return (
    <>
      <div className="hidden md:flex w-[240px] flex-col py-10 px-4 bg-[#191624]">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </div>
      <div className="absolute md:hidden top-6 right-3 block cursor-pointer">
        {isMobileMenuOpen ? (<RiCloseLine className="w-6 h-6 text-white mr-2 cursor-pointer" onClick={() => setIsMobilleMenuOpen(false)} />) : (<HiOutlineMenu className="w-6 h-6 text-white mr-2 cursor-pointer" onClick={() => setIsMobilleMenuOpen(true)} />)}
      </div>
      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden animate-slideleft duration-100 ease-in-out ${isMobileMenuOpen ? ' left-0' : ' -left-full'}`}>
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setIsMobilleMenuOpen(false)} />
      </div>
    </>
  );
}

export default Sidebar;
