import React, { useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function SignUp() {

  const [username, setUsername] = useState('')
  const [image, setImage] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async(e) => {
    e.preventDefault();
    await axios.post('http://localhost:1000/creator/add', {username, image, password})
    .then(res=>{ 
      if(res.data==='Exist'){
          alert('User exist'); 
      }
      else{
          alert('New Account Created Succussfully');
          localStorage.setItem('data', res.data.username)
      }
    })
    .catch(err=>console.log(err))
  }


  return (
    <div>
        <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2" for="username">
                  Create Username
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-lg font-bold mb-2" for="password">
                  Profile Image
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="image" type="text" placeholder="Paste Image URL" value={image} onChange={(e)=>setImage(e.target.value)}/> 
            </div> 
            <div className="mb-6">
                <label className="block text-gray-700 text-lg font-bold mb-2" for="password">
                  Create Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/> 
            </div> 
            <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline">
                Create
            </button> 
            <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline" to={'/login'}>Login</Link>
        </form>
    </div>
  )
}
