import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate , Link} from 'react-router-dom';

export default function NewPost() {

  const [image, setImage] = useState('');
  const [tag, setTag] = useState('');
  const username = localStorage.getItem('data');

  const navigate = useNavigate();

  const onSubmit = async(e) =>{
    e.preventDefault();
    await axios.post('https://instagram-post.onrender.com/post/add', {image, tag, username})
    .then(res=>{ 
      if(res.data.message){
        alert(res.data.message)
      }
      else{ 
        alert('Posted Successfully');
        navigate('/')
      }
    })
    .catch(e=>console.log(e.message));
  }

  return (
    <div>
          {/* Home button  */}
        <Link to={'/'} type="button" class="mt-8 bg-blue-400 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-blue-700 hover:text-white px-3 items-start mr-60">
          <div class="flex flex-row align-middle">
            <svg class="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
            </svg>
            <p class="ml-2">Home</p>
          </div>
        </Link>
        
        <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="username">
                  Image
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="text" placeholder="Paste Image URL" onChange={(e)=>setImage(e.target.value)}/>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">
                  Tag
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="tag" type="tag" placeholder="Enter Tag" onChange={(e)=>setTag(e.target.value)}/> 
            </div> 
            <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Post
            </button> 
        </form>
    </div>
  )
}
