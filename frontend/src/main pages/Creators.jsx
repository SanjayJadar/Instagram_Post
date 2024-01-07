import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

export default function Creators() {

  const [creator, setCreator] = useState([]);
  const [showCreators, setshowCreators] = useState([]);

  const navigate = useNavigate();

  // Fetch Api Data
  const fetchapi = async() =>{
    const apidata = await axios.get('https://instagram-post.onrender.com/creators');
    const values = await apidata.data;
    shuffleArray(values);

  } 

  // Store data randomly 
  const shuffleArray = async(data) => { 
    // Create a new array by shuffling the initialArr
    const shuffled = await data.sort(() => Math.random() - 0.5);
    setshowCreators(shuffled.splice(0,10));
    setCreator(shuffled);
  };   

    // Load More Data 
  const loadmoredata = async()=>{
    const values = creator.splice(0,10);
    setshowCreators((prev)=>[...prev, ...values]); 
  } 
  
  useEffect(()=>{
    fetchapi(); 
  },[])

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

        {showCreators.length!==0 
        ?
        <div>
        {showCreators.map((item, index)=>{
          return(
            <div className='flex justify-center'> 
            <div className='grid grid-cols-2 mt-14 w-60' onClick={()=>{ navigate('/creator/details', {state:{username : item.username}}) }} key={index}>
                <img className='block ml-auto mr-auto object-cover w-16 rounded-full' src={item.image} alt='creator' />
                <h1 style={{fontSize:"24px", cursor:'pointer'}}>{item.username}</h1>
            </div>
            </div>
          )
        })}

                              {/* Load More Data  */}
        {creator.length!==0 
          ?
          <button className='m-16 p-2 rounded-lg text-slate-600 bg-slate-100' onClick={loadmoredata}>Load more</button>
          : 
          <div>
              <p className='mt-16'>No more creators</p>
              <button className='mb-16 mt-2 p-2 rounded-lg text-slate-600 bg-slate-100' onClick={()=>{window.location.reload();}}>Reload Page</button>
          </div>
        } 
        </div>
        :
            <div className='flex flex-col items-center justify-center'>
                      {/* Empty box as a placeholder */}
                {Array.from({ length: 10 }, (_, index) => (
                    <div key={index} className='h-20 w-60 bg-gray-300 mt-14 ml-10'></div>
                ))}
                <div className='m-8'>Loading...</div>
            </div>
        }
    </div>
  )
}
