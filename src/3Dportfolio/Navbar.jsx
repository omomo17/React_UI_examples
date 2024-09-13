// import React, { useEffect, useState } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/kirbyIcon.png";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

const navLinks = [
    {
        title: "Home",
        id: "hero",
    },
]

const Navbar = () => {
    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);

    return (
        <nav className="sm:px-16 px-6 w-full flex items-center py-5 fixed top-0 z-20">
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                <Link to="/" className="flex items-center gap-2" onClick={() => { setActive(""); window.scrollTo(0, 0); }}>
                    <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
                    <p className="text-white text-[18px] font-bold cursor-pointer">momo &nbsp; <span className="sm:block hidden">| Fullstack Engineer</span> </p>
                </Link>
                <ul className="list-none hidden sm:flex flex-row gap-10">
                    {navLinks.map((link, index) => (
                        <li key={index} className={`${active === link.title ? "text-white" : "text-gray-400"} hover:text-white text-[18px] font-medium cursor-pointer`} onClick={() => { setActive(link.title); window.scrollTo(0, 0); }}>
                            <a href={`#${link.id}`}>{link.title}</a>
                        </li>))}
                </ul>
                <div className="sm:hidden flex flex-1 justify-end items-center">
                    <div className="w-[28px] h-[28px] object-contain cursor-pointer" onClick={() => setToggle(!toggle)}>
                        {toggle ? <RxCross1 className="text-gray-600 text-2xl" /> : <IoMdMenu className="text-gray-600 text-2xl" />}
                    </div>
                    <div className={`${!toggle ? "hidden" : "flex"} p-6 bg-gradient-to-r from-gray-950 to-gray-600 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
                        <ul className="list-none flex justify-end items-start flex-col gap-4">
                            {navLinks.map((link, index) => (
                                <li key={index} className={`${active === link.title ? "text-white" : "text-gray-400"} text-[16px] font-medium cursor-pointer`} onClick={() => { setToggle(!toggle); setActive(link.title); window.scrollTo(0, 0); }}>
                                    <a href={`#${link.id}`}>{link.title}</a>
                                </li>))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;