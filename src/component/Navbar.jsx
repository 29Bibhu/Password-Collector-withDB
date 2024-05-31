import React from 'react'


const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white' >
      <div className="mycontainer flex items-center justify-between px-4 py-5 h-14">
        <div className="logo font-bold flex text-white text-2xl">
           <span className='text-green-500'>  &lt; </span>
           <span>PassKeeper</span> 
           <span className='text-green-500'> !/&gt;</span>
            </div>
    {/* <ul>
        <li className='flex gap-4'>
           <a className='hover:font-bold' href="#">Home</a> 
           <a className='hover:font-bold' href="#">About</a> 
           <a className='hover:font-bold' href="#">Contact</a> 
           <a className='hover:font-bold' href="#">Help</a> 
        </li>
    </ul> */}
       <button className='text-white bg-green-700 my-5 flex rounded-full justify-center items-center ring-white ring-1'>
        <div className='invert w-10 p-1'><img src="/icon/github.svg" alt="logo" /></div>
        <span className='font-bold px-2'>Github</span>
        </button>
    </div>
    </nav>
  )
}

export default Navbar
