import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Posts() {
  
  const [randomImage, setRandomImage] = useState([]);
  const [dataFetching, setdataFetching] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true); 

  let token = false;      // Login Status
  if(localStorage.getItem('data')){
      token = true;
  }

  useState(()=>{
    // Fetch Api data
    const fetchRandomImage = async()=>{
      const data = await axios.get('https://instagram-post.onrender.com/posts');   
      shuffleArray(data.data);
    }
    fetchRandomImage();  

    // Show data randomly
    const shuffleArray = (data) => {
      // Create a new array by shuffling the initialArr
      const shuffled = data.sort(() => Math.random() - 0.5);
      setRandomImage(shuffled);
    };
  },[]);
  


  return (
    <div>

        
        {/* Page without Login */} 
        {token ?  
            <div className='flex justify-center pt-5'>
                <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2' to={'/profile'}>Profile</Link>
                <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2' to={'/creators'}>Creators</Link> 
            </div> 
            : 
            <div className='flex justify-center pt-5'>
                <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2' to={'/login'}>Login</Link>
                <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2' to={'/signup'}>SignUp</Link> 
            </div>
        }

        {randomImage.length!==0 ? 
          randomImage.map((item, index)=>{
            return (
              <div key={index}>
                  <img className='block ml-auto mr-auto object-cover w-96 mt-16' src={item.image} alt="post" />
                  <h4 className='block ml-auto mr-auto w-80'>{item.tag}</h4>
              </div>
            )
          })
          : 
          <div className='placeholder-box flex flex-col items-center justify-center'>
              {/* Empty box as a placeholder */}
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className='w-96 h-96 bg-gray-300 m-8'></div>
              ))}
              <div className='m-8'>Loading...</div>
          </div>
        }
    </div>
  )
}
