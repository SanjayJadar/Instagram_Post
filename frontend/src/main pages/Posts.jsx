import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Placeholder from '../Components/Placeholder';

export default function Posts() {
  
  const [randomImage, setRandomImage] = useState([]); 
  const [showImages, setshowImages] = useState([]);  
  
  let token = false;      // Login Status
  if(localStorage.getItem('username')){
      token = true;
  } 

  // Fetch Api data 
  const fetchRandomImage = async()=>{
    try{
      const data = await axios.get('https://instagram-post.onrender.com/posts');   
      const values = await data.data;
      shuffleArray(values);    
    }
    catch(err){
      console.error(err);
    }  
  }
  
  // Store data randomly 
  const shuffleArray = async(data) => { 
    // Create a new array by shuffling the initialArr
    const shuffled = await data.sort(() => Math.random() - 0.5);
    setshowImages(shuffled.splice(0,5));   
    setRandomImage(shuffled);   
  };   
  
  // Load More Data 
  const loadmoredata = async()=>{
    const values = randomImage.splice(0,5);
    setshowImages((prev)=>[...prev, ...values]); 
  } 
  
  useEffect(()=>{
    fetchRandomImage();     
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
 
        {showImages.length!==0 ?   
            <div> 
              {/* Posts Display (Display Data)    */}
              {showImages.map((item, index)=>{
                return (
                  <div key={index}>
                      <img className='block ml-auto mr-auto object-cover w-96 mt-16' src={item.image} alt="post" />
                      <h4 className='block ml-auto mr-auto w-80'>{item.tag}</h4>
                  </div>
                )
              })}

                      {/* Load More Data  */}
              {randomImage.length!==0 
                ?
                <button className='m-16 p-2 rounded-lg text-slate-600 bg-slate-100' onClick={loadmoredata}>Load more</button>
                : 
                <div>
                  <p className='mt-16'>No more data</p>
                <button className='mb-16 mt-2 p-2 rounded-lg text-slate-600 bg-slate-100' onClick={()=>{window.scrollTo({ top: 0, behavior: 'auto' }); window.location.reload();}}>Reload Page</button>
                </div>
              } 
            </div>
            : 
                    // Show empty boxes before while loading data 
            <Placeholder/>
        }
    </div>
  )
}
