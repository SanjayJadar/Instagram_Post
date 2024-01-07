
import React, { useState } from 'react'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');

  const navigate = useNavigate();

  const onSubmit = async(e) => {
    e.preventDefault();
    await axios.post('https://instagram-post.onrender.com/creator/login', {username, password})
    .then(res=>{  
      if(res.data !== 'invalid'){
          alert('Logedin Successfully'); 
          localStorage.setItem('username', res.data.username)
          navigate('/');
      }
      else{
          alert('In Valid Details');
      }
    })
    .catch(err=>console.log(err))
  }

  return (
    <div>
        <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2" for="username">
                  Username
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" required placeholder="Enter Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-lg font-bold mb-2" for="password">
                  Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" required placeholder="Enter Password" value={password} onChange={(e)=>setpassword(e.target.value)}/> 
            </div> 
            <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Login
            </button> 
            <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline" to={'/signup'}>SignUp</Link>
        </form>
    </div>
  )
}
