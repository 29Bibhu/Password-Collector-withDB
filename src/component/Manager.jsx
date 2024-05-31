import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  const getpassword = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setpasswordArray(passwords)
    console.log(passwords)
    
  }


  useEffect(() => {
    getpassword()
    let passwords = localStorage.getItem("passwords")
    if (passwords) {
      setpasswordArray(JSON.parse(passwords))
    }

  }, [])

  const copytext = (text) => {
    toast('🦄 Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
  }






  const showPassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("icon/hide.png")) {
      ref.current.src = "icon/show.png"
      passwordRef.current.type = "password"
    }
    else {
      passwordRef.current.type = "text"
      ref.current.src = "icon/hide.png"
    }
  }


  const savePassword = async() => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

      // If any such id exists in th DB then delete it 
      await fetch("http://localhost:3000/",{ method: "DELETE", headers: {"Content-Type": "application/json"},body: JSON.stringify({id: form.id})})

      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      await fetch("http://localhost:3000/",{ method: "POST", headers: {"Content-Type": "application/json"},body: JSON.stringify({ ...form, id: uuidv4()})})
      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" })
      toast('🦄 Password Saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: null,
        theme: "dark",
      });
    }

    else {
      toast("Error: Invalid Info! Failed To Save.")
    }
  }

  const deletePassword = async (id) => {
    console.log("deleting password with id", id);
    let c = confirm("Do you really wanna this password?")
    if (c) {
      setpasswordArray(passwordArray.filter(item => item.id !== id))
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      let res = await fetch("http://localhost:3000/",{ method: "DELETE", headers: {"Content-Type": "application/json"},body: JSON.stringify({  id})})
      toast('🦄 Password Deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  const editPassword = (id) => {
    
    console.log("editing password with id", id);
    setform({...passwordArray.filter(i => i.id === id)[0], id:id})
    setpasswordArray(passwordArray.filter(item => item.id !== id))

  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }



  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute top-0 -z-10 h-full w-full bg-green-50"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(118,234,118,0.5)] opacity-50 blur-[80px]"></div></div>
      <div className="p-2 pt-4 md:p-0 mycontainer min-h-[88.2vh]:">
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-500'>  &lt; </span>
          PassKeeper
          <span className='text-green-500'> !/&gt;</span>
        </h1>
        <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full  px-4 py-1' type="text" name="site" id="site" />
          <div className="flex flex-col  md:flex-row w-full justify-between gap-8">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full  px-4 py-1' type="text" name="username" id="username" />
            <div className="relative">
              <input value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full  px-4 py-1' type="password" ref={passwordRef} name="password" id="password" />
              <span className='absolute right-[3px] top-[3px] cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='p-1' width={26} src="icon/show.png" alt="show" />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='flex justify-center items-center bg-green-400 px-6 py-2 rounded-full w-fit gap-2 border-2 border-green-950 hover:bg-green-300'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
              {/* // style="width:250px;height:250px"> */}
            </lord-icon>
            Add Password</button>

        </div>
        <div className="container">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div> No Passward Added </div>}
          {passwordArray.length != 0 &&
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className='bg-green-800 text-white'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Action</th>
                </tr>
              </thead>
              <tbody className='bg-green-100'>
                {passwordArray.map((item, index) => {
                  return <tr key={index}>
                    <td className='text-center py-2 border border-white-1'>
                      <div className='flex items-center justify-center'>
                        <a href={item.site} target='_blank'>
                          {item.site}</a>
                        <div className="cursor-pointer size-7" onClick={() => { copytext(item.site) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/vdjwmfqs.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}>
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='text-center py-2 border border-white-1'>
                      <div className='flex items-center justify-center'>
                        <span>{item.username}</span>
                        <div className="cursor-pointer size-7" onClick={() => { copytext(item.username) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/vdjwmfqs.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}>
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='text-center py-2 border border-white-1'>
                      <div className='flex items-center justify-center'>
                        <span>{"*".repeat(item.password.length)}</span>
                        <div className="cursor-pointer size-7" onClick={() => { copytext(item.password) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/vdjwmfqs.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}>
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='text-center py-2 border border-white-1'>
                      <span onClick={() => { editPassword(item.id) }} className='cursor-pointer mx-1'><lord-icon
                        src="https://cdn.lordicon.com/fowixcuo.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                      </span>
                      <span onClick={() => { deletePassword(item.id) }} className='cursor-pointer mx-1'>
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </span>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>}
        </div>
      </div>
    </>
  )
}

export default Manager
