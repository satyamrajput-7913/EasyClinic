import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

export const Navbar = () => {

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false)
    
    const {token, setToken, userData} = useContext(AppContext)

    const [dropdownVisible, setDropdownVisible] = useState(false);
    
    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }


  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-500'>
        <img onClick={()=>navigate('/')} className = "w-44 cursor-pointer" src={assets.logo} />
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to = "/">
                <li className='py-1'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden'/>
            </NavLink>

            <NavLink to = '/doctors'>
                <li className='py-1'>ALL DOCTORS</li>
                <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden'/>
            </NavLink>

            <NavLink to = '/about'>
                <li className='py-1'>ABOUT</li>
                <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden'/>
            </NavLink>

            <NavLink to = 'contact'>
                <li className='py-1'>CONTACT</li>
                <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden'/>
            </NavLink>
            </ul>
                {/* <button
                onClick={toggleDarkMode}
                className="text-xl px-2 md:px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                {darkMode ? '🌞' : '🌙'}
                </button> */}
            <div className='flex items-center gap-3'>
                {
                    token && userData
                    ? <div className='flex items-center gap-2 cursor-pointer group relative'
                        onClick={() => setDropdownVisible(!dropdownVisible)}>
                        <img  className = 'w-11 rounded-full' src = {userData.image} />
                        <img className='w-3' src = {assets.dropdown_icon} />

                        {dropdownVisible && (
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 '>
                            <div className='min-w-48 bg-stone-300 rounded flex flex-col gap-4 p-4'>
                                <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                            </div>
                        </div>
                        )} 

                    </div> 
                    : <button onClick={() => navigate('/login')} className='bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-light hidden md:block transform duration-200 hover:scale-95 cursor-pointer'>Create Account</button>
                }
                <img onClick = {() => setShowMenu(true)} className='w-6 md:hidden' src = {assets.menu_icon} />
            {/* --------mobile menu----- */}
            <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-6'>
                    <img src={assets.logo} alt="" className='w-36'/>
                    <img className='w-7' onClick = {() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                </div>
                <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                    <NavLink  onClick = {() => setShowMenu(false)} to = '/'><p className='px-4 py-2 rounded  inline-block'>Home</p></NavLink>
                    <NavLink  onClick = {() => setShowMenu(false)} to = '/doctors'><p className='px-4 py-2 rounded  inline-block'>All Doctors</p></NavLink>
                    <NavLink  onClick = {() => setShowMenu(false)} to = '/about'><p className='px-4 py-2 rounded  inline-block'>About</p></NavLink>
                    <NavLink  onClick = {() => setShowMenu(false)} to = '/contact'><p className='px-4 py-2 rounded  inline-block'>Contact</p></NavLink>
                </ul>
            </div>
            </div>
    </div>
  )
}
